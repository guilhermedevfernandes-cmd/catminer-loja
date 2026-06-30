import { ProductCondition, ProductStatus } from "@prisma/client";
import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3),
  slug: z.string().min(3),
  shortDescription: z.string().max(240).optional().or(z.literal("")),
  description: z.string().max(4000).optional().or(z.literal("")),
  priceCents: z.coerce.number().int().min(1),
  compareAtPriceCents: z.coerce.number().int().min(0).optional().nullable(),
  stock: z.coerce.number().int().min(0),
  status: z.enum(ProductStatus),
  condition: z.enum(ProductCondition),
  voltage: z.string().optional().or(z.literal("")),
  warrantyDays: z.coerce.number().int().min(0).optional().nullable(),
  brand: z.string().optional().or(z.literal("")),
  model: z.string().optional().or(z.literal("")),
  algorithm: z.string().optional().or(z.literal("")),
  hashrate: z.string().optional().or(z.literal("")),
  consumption: z.string().optional().or(z.literal("")),
  efficiency: z.string().optional().or(z.literal("")),
  dailyRevenueText: z.string().optional().or(z.literal("")),
  monthlyRevenueText: z.string().optional().or(z.literal("")),
  roiText: z.string().optional().or(z.literal("")),
  isFeatured: z.coerce.boolean().default(false),
  images: z
    .array(
      z.object({
        url: z.url(),
        alt: z.string().optional().or(z.literal("")),
      }),
    )
    .default([]),
});

export type ProductInput = z.infer<typeof productSchema>;
