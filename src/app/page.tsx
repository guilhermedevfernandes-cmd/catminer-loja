import { ArrowRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ProductCard } from "@/components/product/product-card";
import { TrustBadges } from "@/components/site/trust-badges";
import { PROFITABILITY_DISCLAIMER } from "@/lib/constants";
import { listPublicProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const featured = await listPublicProducts({ featured: true });
  const products = featured.length ? featured : await listPublicProducts();

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[color-mix(in_srgb,#fff_7%,transparent)]">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: "url('/brand/warehouse.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(90% 130% at 88% -10%, color-mix(in srgb, var(--orange-500) 34%, transparent) 0%, transparent 52%), linear-gradient(180deg, color-mix(in srgb, var(--navy-950) 55%, transparent) 0%, var(--navy-950) 96%)",
          }}
        />
        <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-end gap-6 px-[var(--gutter)] pt-[clamp(34px,5vw,64px)] lg:grid-cols-[1.5fr_0.9fr]">
          <div className="pb-[clamp(28px,4vw,52px)]">
            <span className="eyebrow rounded-full border border-[color-mix(in_srgb,#fff_16%,transparent)] bg-[color-mix(in_srgb,#fff_8%,transparent)] px-[13px] py-1.5">
              Loja · ASICs revisados
            </span>
            <h1
              className="mt-[18px] text-[clamp(2.1rem,4.8vw,3.4rem)] font-bold leading-[1.04] tracking-[-0.025em] text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Os melhores equipamentos
              <br />
              para sua <span className="text-brand-gradient">mineração</span>
            </h1>
            <p className="mt-4 max-w-[46ch] text-[clamp(15px,1.6vw,17px)] leading-[1.6] text-[var(--t-3)]">
              Equipamentos testados, suporte especializado e pagamento seguro via Pix.
              Garantia de 30 dias e entrega para todo o Brasil.
            </p>
            <form
              action="/loja"
              className="mt-[26px] flex flex-wrap items-center gap-[14px]"
            >
              <div className="flex h-[52px] min-w-[280px] max-w-[420px] flex-1 items-center gap-2.5 rounded-full border-[1.5px] border-border bg-navy-800 pl-[18px] pr-4">
                <Search className="size-[19px] text-[var(--t-5)]" aria-hidden="true" />
                <input
                  name="q"
                  placeholder="Buscar por modelo, marca ou hashrate…"
                  className="min-w-0 flex-1 bg-transparent text-[15px] font-medium text-white outline-none placeholder:text-[var(--t-5)]"
                />
              </div>
              <Link
                href="/loja"
                className="btn-brand h-[52px] whitespace-nowrap px-6 text-[15px]"
              >
                Ver equipamentos
                <ArrowRight className="size-[18px]" aria-hidden="true" />
              </Link>
            </form>
          </div>

          <div className="relative hidden self-end justify-self-center lg:block">
            <Image
              src="/brand/about-tall.png"
              alt="Mascote Cat Miner segurando um ASIC"
              width={330}
              height={440}
              priority
              className="h-auto w-[min(330px,28vw)] drop-shadow-[0_30px_50px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>

        {/* SELOS */}
        <div className="relative border-t border-[color-mix(in_srgb,#fff_7%,transparent)] bg-[color-mix(in_srgb,var(--navy-900)_70%,transparent)]">
          <div className="mx-auto max-w-[1280px] px-[var(--gutter)] py-[14px]">
            <TrustBadges />
          </div>
        </div>
      </section>

      {/* MODELOS */}
      <section className="mx-auto max-w-[1280px] px-[var(--gutter)] pb-16 pt-[clamp(26px,3.5vw,44px)]">
        <div className="mb-[18px] flex flex-wrap items-end justify-between gap-3.5">
          <div>
            <h2
              className="text-[clamp(1.3rem,2.2vw,1.6rem)] font-bold tracking-[-0.02em] text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Confira nossos modelos
            </h2>
            <p className="mt-1.5 text-[13.5px] text-[var(--t-4)]">
              Compare hashrate, consumo, preço e garantia antes de finalizar.
            </p>
          </div>
          <Link
            href="/loja"
            className="text-[13.5px] font-bold text-orange-400 transition-colors hover:text-orange-300"
          >
            Ver loja completa →
          </Link>
        </div>

        {products.length ? (
          <div className="grid gap-[clamp(16px,1.6vw,22px)] sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-border bg-navy-800 p-12 text-center">
            <p className="text-lg font-semibold text-white">Nenhum equipamento disponível agora.</p>
            <p className="mt-2 text-sm text-[var(--t-4)]">Fale com a equipe para consultar a chegada de novos ASICs.</p>
          </div>
        )}
      </section>

      {/* DISCLAIMER */}
      <section className="border-y border-[color-mix(in_srgb,#fff_7%,transparent)] bg-navy-900/40">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-2 px-[var(--gutter)] py-8 text-[13px] text-[var(--t-4)]">
          <p className="font-bold text-[var(--t-2)]">Aviso sobre rentabilidade</p>
          <p className="leading-[1.6]">{PROFITABILITY_DISCLAIMER}</p>
        </div>
      </section>
    </div>
  );
}
