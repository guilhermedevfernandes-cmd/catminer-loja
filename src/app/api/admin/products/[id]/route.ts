import { ProductStatus } from "@prisma/client";
import { NextResponse } from "next/server";

import { requireAdminApiSession } from "@/lib/admin-api";
import { productDataFromInput } from "@/lib/admin-products";
import { prisma } from "@/lib/db";
import { productSchema } from "@/lib/validators/product";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, { params }: Params) {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const payload = await request.json().catch(() => null);
  const parsed = productSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Payload inválido.", details: parsed.error.flatten() }, { status: 400 });
  }

  const product = await prisma.product.update({
    where: { id },
    data: {
      ...productDataFromInput(parsed.data),
      images: {
        deleteMany: {},
        create: parsed.data.images.map((image, position) => ({
          url: image.url,
          alt: image.alt || parsed.data.name,
          position,
        })),
      },
    },
  });

  return NextResponse.json({ product });
}

export async function DELETE(_request: Request, { params }: Params) {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const product = await prisma.product.update({
    where: { id },
    data: {
      status: ProductStatus.ARCHIVED,
    },
  });

  return NextResponse.json({ product });
}
