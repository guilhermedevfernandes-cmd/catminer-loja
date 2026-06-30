import { NextResponse } from "next/server";

import { listPublicProducts } from "@/lib/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  const products = await listPublicProducts({
    brand: searchParams.get("brand") || undefined,
    featured:
      searchParams.get("featured") === null
        ? undefined
        : searchParams.get("featured") === "true",
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    sort: searchParams.get("sort") || undefined,
  });

  return NextResponse.json({ products });
}
