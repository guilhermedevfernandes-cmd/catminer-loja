import { OrderStatus, PaymentStatus, type Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import { requireAdminApiSession } from "@/lib/admin-api";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) return unauthorized;

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search");
  const statusParam = searchParams.get("status");
  const paymentStatusParam = searchParams.get("paymentStatus");
  const status = Object.values(OrderStatus).includes(statusParam as OrderStatus)
    ? (statusParam as OrderStatus)
    : undefined;
  const paymentStatus = Object.values(PaymentStatus).includes(paymentStatusParam as PaymentStatus)
    ? (paymentStatusParam as PaymentStatus)
    : undefined;
  const where: Prisma.OrderWhereInput = {
    ...(status ? { status } : {}),
    ...(paymentStatus ? { paymentStatus } : {}),
    ...(search
      ? {
          OR: [
            { orderNumber: { contains: search, mode: "insensitive" } },
            { customer: { name: { contains: search, mode: "insensitive" } } },
            { customer: { email: { contains: search, mode: "insensitive" } } },
            { customer: { phone: { contains: search, mode: "insensitive" } } },
          ],
        }
      : {}),
  };

  const orders = await prisma.order.findMany({
    where,
    include: {
      customer: true,
      items: true,
      payment: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ orders });
}
