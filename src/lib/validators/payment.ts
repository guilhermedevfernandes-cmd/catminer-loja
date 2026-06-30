import { PaymentStatus } from "@prisma/client";
import { z } from "zod";

export const createPixSchema = z.object({
  orderId: z.string().min(1),
});

export const uaipagWebhookSchema = z
  .object({
    eventId: z.string().optional(),
    eventType: z.string().optional(),
    providerPaymentId: z.string().optional(),
    providerTxid: z.string().optional(),
    status: z.enum(PaymentStatus),
    amountCents: z.coerce.number().int().min(0).optional(),
    paidAt: z.string().datetime().optional(),
  })
  .passthrough();

export type CreatePixInput = z.infer<typeof createPixSchema>;
export type UaiPagWebhookInput = z.infer<typeof uaipagWebhookSchema>;
