import { NextResponse } from "next/server";

import { requireAdminApiSession } from "@/lib/admin-api";
import { productDataFromInput } from "@/lib/admin-products";
import { prisma } from "@/lib/db";
import { productSchema } from "@/lib/validators/product";

export async function GET() {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) return unauthorized;

  const products = await prisma.product.findMany({
    include: {
      images: { orderBy: { position: "asc" } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ products });
}

export async function POST(request: Request) {
  const unauthorized = await requireAdminApiSession();
  if (unauthorized) return unauthorized;

  const payload = await request.json().catch(() => null);
  const parsed = productSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Payload inválido.", details: parsed.error.flatten() }, { status: 400 });
  }

  const product = await prisma.product.create({
    data: {
      ...productDataFromInput(parsed.data),
      images: {
        create: parsed.data.images.map((image, position) => ({
          url: image.url,
          alt: image.alt || parsed.data.name,
          position,
        })),
      },
    },
  });

  return NextResponse.json({ product }, { status: 201 });
}
