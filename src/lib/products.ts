import { ProductStatus, type Prisma } from "@prisma/client";

import { DEFAULT_PRODUCT_IMAGE } from "@/lib/constants";
import { prisma } from "@/lib/db";

export { getConditionLabel } from "@/lib/product-display";

export const productInclude = {
  images: {
    orderBy: {
      position: "asc",
    },
  },
} satisfies Prisma.ProductInclude;

type ProductWithImages = Prisma.ProductGetPayload<{
  include: typeof productInclude;
}>;

export function serializeProduct(product: ProductWithImages) {
  const images = product.images.length
    ? product.images
    : [
        {
          id: "default",
          productId: product.id,
          url: DEFAULT_PRODUCT_IMAGE,
          alt: product.name,
          position: 0,
        },
      ];

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    shortDescription: product.shortDescription,
    description: product.description,
    priceCents: product.priceCents,
    compareAtPriceCents: product.compareAtPriceCents,
    stock: product.stock,
    status: product.status,
    condition: product.condition,
    voltage: product.voltage,
    warrantyDays: product.warrantyDays,
    brand: product.brand,
    model: product.model,
    algorithm: product.algorithm,
    hashrate: product.hashrate,
    consumption: product.consumption,
    efficiency: product.efficiency,
    dailyRevenueText: product.dailyRevenueText,
    monthlyRevenueText: product.monthlyRevenueText,
    roiText: product.roiText,
    isFeatured: product.isFeatured,
    images,
    isPurchasable:
      product.status === ProductStatus.ACTIVE && product.stock > 0,
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
  };
}

export type PublicProduct = ReturnType<typeof serializeProduct>;

export function getProductStatusLabel(status: ProductStatus) {
  const labels: Record<ProductStatus, string> = {
    DRAFT: "Rascunho",
    ACTIVE: "Ativo",
    OUT_OF_STOCK: "Sem estoque",
    ARCHIVED: "Arquivado",
  };

  return labels[status];
}

export async function listPublicProducts(filters?: {
  featured?: boolean;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}) {
  const orderBy: Prisma.ProductOrderByWithRelationInput =
    filters?.sort === "price_asc"
      ? { priceCents: "asc" }
      : filters?.sort === "price_desc"
        ? { priceCents: "desc" }
        : { createdAt: "desc" };

  const products = await prisma.product.findMany({
    where: {
      status: ProductStatus.ACTIVE,
      ...(filters?.featured === undefined
        ? {}
        : { isFeatured: filters.featured }),
      ...(filters?.brand ? { brand: filters.brand } : {}),
      ...(filters?.minPrice || filters?.maxPrice
        ? {
            priceCents: {
              gte: filters.minPrice,
              lte: filters.maxPrice,
            },
          }
        : {}),
    },
    include: productInclude,
    orderBy,
  });

  return products.map(serializeProduct);
}

export async function getPublicProductBySlug(slug: string) {
  const product = await prisma.product.findFirst({
    where: {
      slug,
      status: {
        not: ProductStatus.ARCHIVED,
      },
    },
    include: productInclude,
  });

  return product ? serializeProduct(product) : null;
}
