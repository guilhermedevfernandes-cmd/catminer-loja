import type { MetadataRoute } from "next";

import { listPublicProducts } from "@/lib/products";
import { getSiteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const products = await listPublicProducts();
  const staticPaths = [
    "/",
    "/loja",
    "/sobre",
    "/contato",
    "/politicas/privacidade",
    "/politicas/troca-devolucao",
    "/politicas/entrega",
    "/politicas/termos-compra",
  ];

  return [
    ...staticPaths.map((path) => ({
      url: new URL(path, siteUrl).toString(),
      lastModified: new Date(),
    })),
    ...products.map((product) => ({
      url: new URL(`/produto/${product.slug}`, siteUrl).toString(),
      lastModified: new Date(product.updatedAt),
    })),
  ];
}
