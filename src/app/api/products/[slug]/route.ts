import { NextResponse } from "next/server";

import { getPublicProductBySlug } from "@/lib/products";

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_request: Request, { params }: Params) {
  const { slug } = await params;
  const product = await getPublicProductBySlug(slug);

  if (!product) {
    return NextResponse.json({ error: "Produto não encontrado." }, { status: 404 });
  }

  return NextResponse.json({ product });
}
