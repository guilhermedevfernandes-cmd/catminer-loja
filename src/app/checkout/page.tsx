import type { Metadata } from "next";

import { CheckoutPageClient } from "@/components/checkout/checkout-page-client";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Checkout",
  path: "/checkout",
});

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
