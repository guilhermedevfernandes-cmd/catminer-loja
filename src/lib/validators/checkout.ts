import { z } from "zod";

export const checkoutItemSchema = z.object({
  productId: z.string().min(1),
  quantity: z.coerce.number().int().min(1).max(10),
});

export const checkoutSchema = z.object({
  items: z.array(checkoutItemSchema).min(1),
  customer: z.object({
    name: z.string().min(3),
    email: z.email(),
    phone: z.string().min(10).max(20),
    document: z.string().min(11).max(18).optional().or(z.literal("")),
  }),
  shipping: z.object({
    zipCode: z.string().min(8),
    address: z.string().min(3),
    number: z.string().min(1),
    complement: z.string().optional().or(z.literal("")),
    district: z.string().min(2),
    city: z.string().min(2),
    state: z.string().min(2).max(2),
  }),
  acceptances: z.object({
    policies: z.boolean().refine((value) => value, "Aceite obrigatório."),
    usedEquipment: z.boolean().refine((value) => value, "Aceite obrigatório."),
    profitabilityDisclaimer: z.boolean().refine((value) => value, "Aceite obrigatório."),
  }),
  notes: z.string().max(500).optional().or(z.literal("")),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type CheckoutFormInput = z.input<typeof checkoutSchema>;
