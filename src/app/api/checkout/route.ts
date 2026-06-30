import { OrderStatus, ProductStatus } from "@prisma/client";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { generateFallbackOrderNumber } from "@/lib/order-number";
import { checkoutSchema } from "@/lib/validators/checkout";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = checkoutSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Payload inválido.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const input = parsed.data;
  const quantities = new Map<string, number>();

  for (const item of input.items) {
    quantities.set(item.productId, (quantities.get(item.productId) || 0) + item.quantity);
  }

  const productIds = Array.from(quantities.keys());

  try {
    const order = await prisma.$transaction(async (tx) => {
      const products = await tx.product.findMany({
        where: {
          id: { in: productIds },
        },
      });

      if (products.length !== productIds.length) {
        throw new CheckoutError("Produto não encontrado.", 409);
      }

      const items = products.map((product) => {
        const quantity = quantities.get(product.id) || 0;

        if (product.status !== ProductStatus.ACTIVE) {
          throw new CheckoutError("Produto inativo ou arquivado.", 409);
        }

        if (product.stock <= 0 || product.stock < quantity) {
          throw new CheckoutError(`Estoque insuficiente para ${product.name}.`, 409);
        }

        return {
          product,
          quantity,
          totalCents: product.priceCents * quantity,
        };
      });

      const subtotalCents = items.reduce((total, item) => total + item.totalCents, 0);
      const shippingCents = 0;
      const discountCents = 0;
      const totalCents = subtotalCents + shippingCents - discountCents;

      const customer = await tx.customer.create({
        data: {
          name: input.customer.name,
          email: input.customer.email.toLowerCase(),
          phone: input.customer.phone,
          document: input.customer.document || null,
        },
      });

      return tx.order.create({
        data: {
          orderNumber: generateFallbackOrderNumber(),
          customerId: customer.id,
          status: OrderStatus.AWAITING_PAYMENT,
          paymentStatus: "WAITING_PAYMENT",
          subtotalCents,
          shippingCents,
          discountCents,
          totalCents,
          notes: input.notes || null,
          shippingName: input.customer.name,
          shippingPhone: input.customer.phone,
          shippingZipCode: input.shipping.zipCode,
          shippingAddress: input.shipping.address,
          shippingNumber: input.shipping.number,
          shippingComplement: input.shipping.complement || null,
          shippingDistrict: input.shipping.district,
          shippingCity: input.shipping.city,
          shippingState: input.shipping.state.toUpperCase(),
          items: {
            create: items.map((item) => ({
              productId: item.product.id,
              name: item.product.name,
              slug: item.product.slug,
              quantity: item.quantity,
              unitPriceCents: item.product.priceCents,
              totalCents: item.totalCents,
            })),
          },
        },
        select: {
          id: true,
          orderNumber: true,
        },
      });
    });

    return NextResponse.json({
      orderId: order.id,
      orderNumber: order.orderNumber,
      paymentUrl: `/pedido/${order.id}/pagamento`,
    });
  } catch (error) {
    if (error instanceof CheckoutError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    console.error("checkout_error", error);
    return NextResponse.json({ error: "Erro interno ao criar pedido." }, { status: 500 });
  }
}

class CheckoutError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
  }
}
