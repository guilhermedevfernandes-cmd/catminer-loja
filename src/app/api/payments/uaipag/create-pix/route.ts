import { OrderStatus, PaymentStatus, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { createUaiPagPixCharge } from "@/lib/payments/uaipag";
import { createPixSchema } from "@/lib/validators/payment";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = createPixSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Payload inválido." }, { status: 400 });
  }

  const order = await prisma.order.findUnique({
    where: { id: parsed.data.orderId },
    include: {
      customer: true,
      items: {
        include: {
          product: true,
        },
      },
      payment: true,
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Pedido não encontrado." }, { status: 404 });
  }

  if (order.paymentStatus === PaymentStatus.PAID || order.status === OrderStatus.PAID) {
    return NextResponse.json({ error: "Pedido ja esta pago." }, { status: 409 });
  }

  if (
    order.payment &&
    order.payment.status === PaymentStatus.WAITING_PAYMENT &&
    (!order.payment.expiresAt || order.payment.expiresAt > new Date())
  ) {
    return NextResponse.json({
      paymentId: order.payment.id,
      status: order.payment.status,
      pixCopyPaste: order.payment.pixCopyPaste,
      qrCodeImageUrl: order.payment.qrCodeImageUrl,
      expiresAt: order.payment.expiresAt?.toISOString() || null,
    });
  }

  for (const item of order.items) {
    if (item.product.stock < item.quantity || item.product.status !== "ACTIVE") {
      return NextResponse.json(
        { error: `Produto indisponível para pagamento: ${item.product.name}.` },
        { status: 409 },
      );
    }
  }

  const charge = await createUaiPagPixCharge({
    orderId: order.id,
    orderNumber: order.orderNumber,
    amountCents: order.totalCents,
    customer: {
      name: order.customer.name,
      email: order.customer.email,
      phone: order.customer.phone,
      document: order.customer.document,
    },
    expiresInMinutes: 30,
  });

  const payment = await prisma.payment.upsert({
    where: { orderId: order.id },
    update: {
      providerPaymentId: charge.providerPaymentId,
      providerTxid: charge.providerTxid,
      status: charge.status,
      amountCents: charge.amountCents,
      pixCopyPaste: charge.pixCopyPaste,
      qrCodeImageUrl: charge.qrCodeImageUrl,
      expiresAt: charge.expiresAt,
      rawResponse: charge.rawResponse as Prisma.InputJsonValue,
    },
    create: {
      orderId: order.id,
      providerPaymentId: charge.providerPaymentId,
      providerTxid: charge.providerTxid,
      status: charge.status,
      amountCents: charge.amountCents,
      pixCopyPaste: charge.pixCopyPaste,
      qrCodeImageUrl: charge.qrCodeImageUrl,
      expiresAt: charge.expiresAt,
      rawResponse: charge.rawResponse as Prisma.InputJsonValue,
    },
  });

  return NextResponse.json({
    paymentId: payment.id,
    status: payment.status,
    pixCopyPaste: payment.pixCopyPaste,
    qrCodeImageUrl: payment.qrCodeImageUrl,
    expiresAt: payment.expiresAt?.toISOString() || null,
  });
}
