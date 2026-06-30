import type { ProductInput } from "@/lib/validators/product";

function emptyToNull(value?: string | null) {
  return value && value.trim() ? value.trim() : null;
}

export function productDataFromInput(input: ProductInput) {
  return {
    name: input.name,
    slug: input.slug,
    shortDescription: emptyToNull(input.shortDescription),
    description: emptyToNull(input.description),
    priceCents: input.priceCents,
    compareAtPriceCents: input.compareAtPriceCents || null,
    stock: input.stock,
    status: input.status,
    condition: input.condition,
    voltage: emptyToNull(input.voltage),
    warrantyDays: input.warrantyDays || null,
    brand: emptyToNull(input.brand),
    model: emptyToNull(input.model),
    algorithm: emptyToNull(input.algorithm),
    hashrate: emptyToNull(input.hashrate),
    consumption: emptyToNull(input.consumption),
    efficiency: emptyToNull(input.efficiency),
    dailyRevenueText: emptyToNull(input.dailyRevenueText),
    monthlyRevenueText: emptyToNull(input.monthlyRevenueText),
    roiText: emptyToNull(input.roiText),
    isFeatured: input.isFeatured,
  };
}
