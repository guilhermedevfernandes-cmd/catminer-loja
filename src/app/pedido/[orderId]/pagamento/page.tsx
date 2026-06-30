import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PixPaymentClient } from "@/components/checkout/pix-payment-client";
import { prisma } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type PaymentPageProps = {
  params: Promise<{
    orderId: string;
  }>;
};

export const metadata: Metadata = buildMetadata({
  title: "Pagamento Pix",
});

export default async function PaymentPage({ params }: PaymentPageProps) {
  const { orderId } = await params;
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: {
      id: true,
      orderNumber: true,
      totalCents: true,
      paymentStatus: true,
      paidAt: true,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <PixPaymentClient
      order={{
        ...order,
        paidAt: order.paidAt?.toISOString() || null,
      }}
    />
  );
}
