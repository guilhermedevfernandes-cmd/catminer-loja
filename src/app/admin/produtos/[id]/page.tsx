import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { ProductForm } from "@/components/admin/product-form";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      images: { orderBy: { position: "asc" } },
    },
  });

  if (!product) {
    notFound();
  }

  const formProduct = {
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
    images: product.images,
  };

  return (
    <AdminShell>
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-normal">Editar produto</h1>
          <p className="mt-2 text-muted-foreground">{product.name}</p>
        </div>
        <ProductForm product={formProduct} />
      </div>
    </AdminShell>
  );
}
