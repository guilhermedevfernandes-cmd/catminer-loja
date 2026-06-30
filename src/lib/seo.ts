import type { Metadata } from "next";

import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

type SeoInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

export function buildMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  image,
}: SeoInput = {}): Metadata {
  const siteUrl = getSiteUrl();
  const url = new URL(path, siteUrl).toString();
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: "pt_BR",
      type: "website",
      images: image ? [{ url: image }] : undefined,
    },
  };
}
