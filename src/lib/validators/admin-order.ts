import { OrderStatus } from "@prisma/client";
import { z } from "zod";

export const adminOrderUpdateSchema = z.object({
  status: z.enum(OrderStatus).optional(),
  trackingCode: z.string().max(120).optional().or(z.literal("")),
  internalNotes: z.string().max(2000).optional().or(z.literal("")),
});

export type AdminOrderUpdateInput = z.infer<typeof adminOrderUpdateSchema>;
