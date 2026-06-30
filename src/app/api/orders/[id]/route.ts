import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: true,
      payment: true,
      customer: {
        select: {
          name: true,
          phone: true,
        },
      },
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Pedido não encontrado." }, { status: 404 });
  }

  return NextResponse.json({
    order: {
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      paymentStatus: order.paymentStatus,
      subtotalCents: order.subtotalCents,
      shippingCents: order.shippingCents,
      totalCents: order.totalCents,
      paidAt: order.paidAt?.toISOString() || null,
      customer: order.customer,
      items: order.items.map((item) => ({
        id: item.id,
        name: item.name,
        slug: item.slug,
        quantity: item.quantity,
        unitPriceCents: item.unitPriceCents,
        totalCents: item.totalCents,
      })),
      payment: order.payment
        ? {
            id: order.payment.id,
            status: order.payment.status,
            pixCopyPaste: order.payment.pixCopyPaste,
            qrCodeImageUrl: order.payment.qrCodeImageUrl,
            expiresAt: order.payment.expiresAt?.toISOString() || null,
            paidAt: order.payment.paidAt?.toISOString() || null,
          }
        : null,
    },
  });
}
