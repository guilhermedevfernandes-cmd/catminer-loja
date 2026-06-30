import { OrderStatus } from "@prisma/client";
import { NextResponse } from "next/server";

import { requireAdminApiSession } from "@/lib/admin-api";
import { prisma } from "@/lib/db";
import { adminOrderUpdateSchema } from "@/lib/validators/admin-order";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: Params) {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      customer: true,
      items: true,
      payment: {
        include: {
          events: { orderBy: { receivedAt: "desc" } },
        },
      },
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Pedido não encontrado." }, { status: 404 });
  }

  return NextResponse.json({ order });
}

export async function PATCH(request: Request, { params }: Params) {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const payload = await request.json().catch(() => null);
  const parsed = adminOrderUpdateSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Payload inválido.", details: parsed.error.flatten() }, { status: 400 });
  }

  const statusDates =
    parsed.data.status === OrderStatus.SHIPPED
      ? { shippedAt: new Date() }
      : parsed.data.status === OrderStatus.DELIVERED
        ? { deliveredAt: new Date() }
        : parsed.data.status === OrderStatus.CANCELLED
          ? { cancelledAt: new Date() }
          : {};

  const order = await prisma.order.update({
    where: { id },
    data: {
      ...(parsed.data.status ? { status: parsed.data.status } : {}),
      trackingCode: parsed.data.trackingCode || null,
      internalNotes: parsed.data.internalNotes || null,
      ...statusDates,
    },
  });

  return NextResponse.json({ order });
}
