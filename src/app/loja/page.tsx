import type { Metadata } from "next";

import { StoreCatalog } from "@/components/product/store-catalog";
import { TrustBadges } from "@/components/site/trust-badges";
import { buildMetadata } from "@/lib/seo";
import { listPublicProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = buildMetadata({
  title: "Comprar ASIC Miner no Brasil",
  description:
    "Veja ASICs disponíveis para mineração de criptomoedas. Compare hashrate, consumo, preço e garantia. Pagamento via Pix e suporte especializado.",
  path: "/loja",
});

type StorePageProps = {
  searchParams: Promise<{ q?: string }>;
};

export default async function StorePage({ searchParams }: StorePageProps) {
  const [products, { q }] = await Promise.all([listPublicProducts(), searchParams]);

  return (
    <div>
      {/* HERO compacto */}
      <section className="relative overflow-hidden border-b border-[color-mix(in_srgb,#fff_7%,transparent)]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 120% at 85% -20%, color-mix(in srgb, var(--orange-500) 24%, transparent) 0%, transparent 55%), var(--gradient-night)",
          }}
        />
        <div className="relative mx-auto max-w-[1280px] px-[var(--gutter)] pb-7 pt-[clamp(28px,4vw,48px)]">
          <span className="eyebrow rounded-full border border-[color-mix(in_srgb,#fff_16%,transparent)] bg-[color-mix(in_srgb,#fff_8%,transparent)] px-[13px] py-1.5">
            Loja · ASICs revisados
          </span>
          <h1
            className="mt-4 text-[clamp(1.9rem,4vw,2.8rem)] font-bold leading-[1.06] tracking-[-0.025em] text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Os melhores equipamentos para sua <span className="text-brand-gradient">mineração</span>
          </h1>
          <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.6] text-[var(--t-3)]">
            Equipamentos testados, suporte especializado e pagamento seguro via Pix.
            Garantia de 30 dias e entrega para todo o Brasil.
          </p>
        </div>
        <div className="relative border-t border-[color-mix(in_srgb,#fff_7%,transparent)] bg-[color-mix(in_srgb,var(--navy-900)_70%,transparent)]">
          <div className="mx-auto max-w-[1280px] px-[var(--gutter)] py-[14px]">
            <TrustBadges />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-[var(--gutter)] pb-16 pt-[clamp(26px,3.5vw,44px)]">
        <StoreCatalog products={products} initialQuery={q ?? ""} />
      </section>
    </div>
  );
}
