import { OrderStatus, PaymentStatus, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import {
  buildWebhookFingerprint,
  parseUaiPagWebhook,
  verifyUaiPagWebhookSignature,
} from "@/lib/payments/uaipag";

export async function POST(request: Request) {
  const rawBody = await request.text();
  const isValidSignature = await verifyUaiPagWebhookSignature(request, rawBody);

  if (!isValidSignature) {
    return NextResponse.json({ error: "Assinatura invalida." }, { status: 401 });
  }

  const payload = JSON.parse(rawBody || "{}") as unknown;
  const normalized = await parseUaiPagWebhook(payload);
  const eventId = normalized.eventId || buildWebhookFingerprint(normalized);

  await prisma.$transaction(async (tx) => {
    const paymentLookup = [
      normalized.providerPaymentId
        ? { providerPaymentId: normalized.providerPaymentId }
        : undefined,
      normalized.providerTxid ? { providerTxid: normalized.providerTxid } : undefined,
    ].filter(Boolean) as Prisma.PaymentWhereInput[];

    const payment = paymentLookup.length
      ? await tx.payment.findFirst({
          where: {
            OR: paymentLookup,
          },
          include: {
            order: {
              include: {
                items: true,
              },
            },
          },
        })
      : null;

    const duplicate = await tx.paymentEvent.findFirst({
      where: {
        eventId,
        isProcessed: true,
      },
    });

    const event = await tx.paymentEvent.create({
      data: {
        paymentId: payment?.id,
        provider: "UAIPAG",
        eventId,
        eventType: normalized.eventType,
        payload: normalized.rawPayload as Prisma.InputJsonValue,
        isProcessed: false,
      },
    });

    if (!payment || duplicate) {
      return;
    }

    if (normalized.status !== PaymentStatus.PAID) {
      await tx.payment.update({
        where: { id: payment.id },
        data: { status: normalized.status },
      });
      await tx.order.update({
        where: { id: payment.orderId },
        data: { paymentStatus: normalized.status },
      });
      await tx.paymentEvent.update({
        where: { id: event.id },
        data: { isProcessed: true, processedAt: new Date() },
      });
      return;
    }

    if (payment.status === PaymentStatus.PAID || payment.order.paymentStatus === PaymentStatus.PAID) {
      return;
    }

    const paidAt = normalized.paidAt || new Date();

    if (normalized.amountCents && normalized.amountCents !== payment.amountCents) {
      await tx.payment.update({
        where: { id: payment.id },
        data: { status: PaymentStatus.PAID, paidAt },
      });
      await tx.order.update({
        where: { id: payment.orderId },
        data: {
          status: OrderStatus.MANUAL_REVIEW,
          paymentStatus: PaymentStatus.PAID,
          paidAt,
          internalNotes: "Pagamento recebido com valor diferente do pedido. Revisao manual necessaria.",
        },
      });
      await tx.paymentEvent.update({
        where: { id: event.id },
        data: { isProcessed: true, processedAt: new Date() },
      });
      return;
    }

    for (const item of payment.order.items) {
      const product = await tx.product.findUnique({
        where: { id: item.productId },
      });

      if (!product || product.stock < item.quantity) {
        await tx.payment.update({
          where: { id: payment.id },
          data: { status: PaymentStatus.PAID, paidAt },
        });
        await tx.order.update({
          where: { id: payment.orderId },
          data: {
            status: OrderStatus.MANUAL_REVIEW,
            paymentStatus: PaymentStatus.PAID,
            paidAt,
            internalNotes: "Pagamento recebido, mas estoque insuficiente no momento da confirmação.",
          },
        });
        await tx.paymentEvent.update({
          where: { id: event.id },
          data: { isProcessed: true, processedAt: new Date() },
        });
        return;
      }
    }

    for (const item of payment.order.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    await tx.payment.update({
      where: { id: payment.id },
      data: { status: PaymentStatus.PAID, paidAt },
    });
    await tx.order.update({
      where: { id: payment.orderId },
      data: {
        status: OrderStatus.PAID,
        paymentStatus: PaymentStatus.PAID,
        paidAt,
      },
    });
    await tx.paymentEvent.update({
      where: { id: event.id },
      data: { isProcessed: true, processedAt: new Date() },
    });
  });

  return NextResponse.json({ ok: true });
}
