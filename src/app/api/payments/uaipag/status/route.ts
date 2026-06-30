import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get("orderId");

  if (!orderId) {
    return NextResponse.json({ error: "orderId obrigatório." }, { status: 400 });
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      payment: true,
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Pedido não encontrado." }, { status: 404 });
  }

  return NextResponse.json({
    orderId: order.id,
    orderStatus: order.status,
    paymentStatus: order.paymentStatus,
    paidAt: order.paidAt?.toISOString() || null,
    payment: order.payment
      ? {
          status: order.payment.status,
          expiresAt: order.payment.expiresAt?.toISOString() || null,
        }
      : null,
  });
}
