import type { Metadata } from "next";
import { Manrope, Space_Grotesk, Space_Mono } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { AnalyticsScripts } from "@/components/site/analytics-scripts";
import { SiteFooter } from "@/components/site/footer";
import { SiteHeader } from "@/components/site/header";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import { CartProvider } from "@/stores/cart-store";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: `${SITE_NAME} | ASICs para mineração de criptomoedas`,
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`dark ${manrope.variable} ${spaceGrotesk.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <CartProvider>
          <AnalyticsScripts />
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <Toaster richColors position="top-right" />
        </CartProvider>
      </body>
    </html>
  );
}
