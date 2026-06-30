import { ArrowLeft, Check, MessageCircle, Shield, TrendingUp, Truck, Zap } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductBuyControls } from "@/components/product/product-buy-controls";
import { ProductCard } from "@/components/product/product-card";
import { PROFITABILITY_DISCLAIMER, USED_EQUIPMENT_NOTICE } from "@/lib/constants";
import { formatBrlNumber, splitRevenue } from "@/lib/money";
import { getConditionLabel } from "@/lib/product-display";
import { getPublicProductBySlug, listPublicProducts } from "@/lib/products";
import { buildMetadata, getSiteUrl } from "@/lib/seo";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublicProductBySlug(slug);

  if (!product) {
    return buildMetadata({ title: "Produto não encontrado", path: `/produto/${slug}` });
  }

  return buildMetadata({
    title: `${product.name} | ASIC Revisado`,
    description: product.shortDescription || undefined,
    path: `/produto/${product.slug}`,
    image: product.images[0]?.url,
  });
}

const trustCards = [
  { icon: Zap, label: "Testado sob carga", color: "var(--orange-400)" },
  { icon: Shield, label: "Garantia 30 dias", color: "var(--gold-400)" },
  { icon: Truck, label: "Entrega Brasil", color: "#5BA8F0" },
];

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getPublicProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const inStock = product.stock > 0;
  const all = await listPublicProducts();
  const related = all
    .filter((p) => p.id !== product.id)
    .sort((a, b) => Number(b.brand === product.brand) - Number(a.brand === product.brand))
    .slice(0, 3);

  const specs = [
    { label: "Hashrate", value: product.hashrate },
    { label: "Consumo", value: product.consumption },
    { label: "Eficiência", value: product.efficiency },
    { label: "Algoritmo", value: product.algorithm },
    { label: "Tensão", value: product.voltage },
    { label: "Garantia", value: product.warrantyDays ? `${product.warrantyDays} dias` : null },
    { label: "Condição", value: getConditionLabel(product.condition) },
    { label: "Marca", value: product.brand },
    { label: "Modelo", value: product.model },
  ].filter((s) => Boolean(s.value));

  const productUrl = new URL(`/produto/${product.slug}`, getSiteUrl()).toString();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription || product.description,
    image: product.images.map((image) => image.url),
    brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined,
    sku: product.model,
    offers: {
      "@type": "Offer",
      url: productUrl,
      priceCurrency: "BRL",
      price: (product.priceCents / 100).toFixed(2),
      availability: product.isPurchasable ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition:
        product.condition === "NEW" ? "https://schema.org/NewCondition" : "https://schema.org/UsedCondition",
    },
  };

  return (
    <div className="mx-auto max-w-[1280px] px-[var(--gutter)] pb-[60px] pt-1.5">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-[9px] py-4 text-[13px] text-[var(--t-4)]">
        <Link href="/loja" className="inline-flex items-center gap-[7px] font-semibold text-[var(--t-3)] hover:text-white">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Loja
        </Link>
        {product.brand ? (
          <>
            <span className="opacity-45">/</span>
            <span className="text-[var(--t-2)]">{product.brand}</span>
          </>
        ) : null}
        <span className="opacity-45">/</span>
        <span className="font-semibold text-white">{product.model || product.name}</span>
      </div>

      <div className="grid grid-cols-1 items-start gap-[clamp(22px,3vw,46px)] lg:grid-cols-[1.05fr_0.95fr]">
        {/* GALLERY */}
        <div className="flex flex-col gap-3 lg:sticky lg:top-[84px]">
          <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[36px] product-surface p-[clamp(28px,4vw,52px)]">
            <div className="absolute left-[18px] top-[18px] z-[2] flex flex-wrap gap-[7px]">
              {inStock ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-profit px-3 py-1.5 text-xs font-bold text-white">
                  <span className="size-1.5 rounded-full bg-white" />
                  Em estoque
                </span>
              ) : null}
              <span className="rounded-full bg-navy-900 px-3 py-1.5 text-xs font-bold text-white">
                {getConditionLabel(product.condition)}
              </span>
            </div>
            <Image
              src={product.images[0].url}
              alt={product.images[0].alt || product.name}
              fill
              priority
              sizes="(min-width: 1024px) 46vw, 100vw"
              className="object-contain p-4"
            />
          </div>

          {product.images.length > 1 ? (
            <div className="grid grid-cols-4 gap-2.5">
              {product.images.slice(1, 5).map((image) => (
                <div key={image.id} className="relative aspect-square overflow-hidden rounded-[14px] product-surface p-2">
                  <Image src={image.url} alt={image.alt || product.name} fill className="object-contain p-1.5" />
                </div>
              ))}
            </div>
          ) : null}

          <div className="grid grid-cols-3 gap-2.5">
            {trustCards.map((card) => (
              <div
                key={card.label}
                className="flex flex-col items-center gap-1.5 rounded-[14px] border border-border bg-navy-800 px-2 py-[13px] text-center"
              >
                <card.icon className="size-5" style={{ color: card.color }} aria-hidden="true" />
                <span className="text-[11.5px] font-semibold leading-tight text-[var(--t-3)]">{card.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="flex flex-col gap-[18px]">
          <div>
            <div className="mb-[13px] flex flex-wrap gap-[7px]">
              {product.brand ? (
                <span className="rounded-full bg-orange-50 px-[11px] py-[5px] text-xs font-bold text-orange-400">
                  {product.brand}
                </span>
              ) : null}
              {product.algorithm ? (
                <span className="rounded-full bg-[color-mix(in_srgb,var(--gold-400)_16%,transparent)] px-[11px] py-[5px] text-xs font-bold text-gold-300">
                  {product.algorithm}
                </span>
              ) : null}
            </div>
            <h1
              className="text-[clamp(1.7rem,3vw,2.3rem)] font-bold leading-[1.08] tracking-[-0.02em] text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {product.name}
            </h1>
            {product.shortDescription ? (
              <p className="mt-3 max-w-[52ch] text-[15px] leading-[1.6] text-[var(--t-3)]">{product.shortDescription}</p>
            ) : null}
          </div>

          {/* PRICE CARD */}
          <div className="flex flex-col gap-4 rounded-[28px] border border-border bg-navy-800 p-5">
            <div className="flex flex-wrap items-end justify-between gap-3.5">
              <div>
                <span className="mono mb-[3px] block text-xs font-semibold text-[var(--t-4)]">à vista no Pix</span>
                <span className="flex items-baseline gap-1.5">
                  <span className="text-lg font-bold text-[var(--t-4)]">R$</span>
                  <span
                    className="text-[clamp(2.2rem,4vw,2.9rem)] font-bold leading-none tracking-[-0.03em] text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {formatBrlNumber(product.priceCents)}
                  </span>
                </span>
              </div>
              <span className="flex items-center gap-1.5 pb-1.5 text-[12.5px] font-bold text-gold-300">
                <Shield className="size-[15px]" aria-hidden="true" />
                Garantia 30 dias
              </span>
            </div>

            {product.dailyRevenueText || product.monthlyRevenueText ? (
              <div className="flex flex-wrap gap-3.5 rounded-[14px] border border-[color-mix(in_srgb,var(--green-500)_24%,transparent)] bg-[color-mix(in_srgb,var(--green-500)_12%,transparent)] px-4 py-3.5">
                {product.dailyRevenueText ? (
                  <div className="min-w-[120px] flex-1">
                    <span className="mb-1 flex items-center gap-1.5 text-xs font-bold text-profit">
                      <TrendingUp className="size-3.5" aria-hidden="true" />
                      Rendimento diário
                    </span>
                    <span className="mono text-[19px] font-bold text-profit">
                      {splitRevenue(product.dailyRevenueText).value}
                      <span className="text-xs text-[#7e9c8e]"> {splitRevenue(product.dailyRevenueText).suffix || "/dia"}</span>
                    </span>
                  </div>
                ) : null}
                {product.monthlyRevenueText ? (
                  <div className="min-w-[120px] flex-1 border-l border-[color-mix(in_srgb,var(--green-500)_22%,transparent)] pl-3.5">
                    <span className="mb-1 block text-xs font-bold text-profit">Rentabilidade mensal</span>
                    <span className="mono text-[19px] font-bold text-profit">
                      {splitRevenue(product.monthlyRevenueText).value}
                      <span className="text-xs text-[#7e9c8e]"> {splitRevenue(product.monthlyRevenueText).suffix || "/mês"}</span>
                    </span>
                  </div>
                ) : null}
              </div>
            ) : null}

            <p className="m-0 text-[11.5px] leading-[1.45] text-[var(--t-5)]">
              Estimativas — não representam rentabilidade garantida. Os valores variam conforme preço do BTC,
              dificuldade da rede, energia e condições de mercado.
            </p>
          </div>

          <ProductBuyControls product={product} />

          <a
            href={buildWhatsappUrl(`Olá, quero tirar uma dúvida sobre ${product.name}.`)}
            target="_blank"
            rel="noreferrer"
            className="btn-wa h-[50px] text-[15px]"
          >
            <MessageCircle className="size-[19px]" aria-hidden="true" />
            Tirar dúvida sobre este equipamento
          </a>

          <div className="flex flex-wrap gap-4 pt-1">
            {["Pagamento seguro via Pix", "Confirmação automática", "Suporte especializado"].map((t) => (
              <span key={t} className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[var(--t-4)]">
                <Check className="size-[15px] text-profit" strokeWidth={2.4} aria-hidden="true" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* DADOS TÉCNICOS */}
      <section className="mt-[clamp(36px,5vw,56px)]">
        <h2 className="mb-4 text-[clamp(1.3rem,2.2vw,1.6rem)] font-bold tracking-[-0.02em] text-white" style={{ fontFamily: "var(--font-display)" }}>
          Dados técnicos
        </h2>
        <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(158px,1fr))]">
          {specs.map((spec) => (
            <div key={spec.label} className="rounded-[14px] border border-border bg-navy-800 px-[15px] py-3.5">
              <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.07em] text-[var(--t-5)]">
                {spec.label}
              </span>
              <span className="mono text-[15.5px] font-bold text-white">{spec.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SOBRE + RENTABILIDADE */}
      <section className="mt-[clamp(30px,4vw,44px)] grid grid-cols-1 gap-[clamp(18px,2.5vw,28px)] lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[28px] border border-border bg-navy-800 p-[clamp(20px,3vw,30px)]">
          <h2 className="mb-3 text-[clamp(1.2rem,2vw,1.45rem)] font-bold tracking-[-0.02em] text-white" style={{ fontFamily: "var(--font-display)" }}>
            Sobre o equipamento
          </h2>
          <p className="mb-3.5 text-[15px] leading-[1.7] text-[var(--t-2)]">
            {product.description ||
              "Equipamento ASIC revisado, com dados técnicos e condições comerciais informadas pela equipe Cat Miner."}
          </p>
          <p className="m-0 rounded-[14px] border border-[color-mix(in_srgb,#fff_7%,transparent)] bg-navy-900 px-[15px] py-[13px] text-[13px] leading-[1.6] text-[var(--t-4)]">
            {USED_EQUIPMENT_NOTICE}
          </p>
        </div>
        <div
          className="flex flex-col rounded-[28px] border border-[color-mix(in_srgb,var(--green-500)_26%,transparent)] p-[clamp(20px,3vw,30px)]"
          style={{ background: "linear-gradient(150deg, color-mix(in srgb, var(--green-500) 16%, var(--navy-800)), var(--navy-800))" }}
        >
          <span className="mb-3.5 inline-flex items-center gap-1.5 text-[13px] font-bold text-profit">
            <TrendingUp className="size-[17px]" aria-hidden="true" />
            Rentabilidade estimada
          </span>
          <div className="mb-4 flex flex-wrap gap-6">
            <div>
              <span className="mb-[3px] block text-xs font-semibold text-[#9fc3b2]">Por dia</span>
              <span className="mono text-[clamp(1.5rem,2.6vw,1.9rem)] font-bold tracking-[-0.01em] text-profit">
                {product.dailyRevenueText || "Sob consulta"}
              </span>
            </div>
            <div>
              <span className="mb-[3px] block text-xs font-semibold text-[#9fc3b2]">Por mês</span>
              <span className="mono text-[clamp(1.5rem,2.6vw,1.9rem)] font-bold tracking-[-0.01em] text-profit">
                {product.monthlyRevenueText || "Sob consulta"}
              </span>
            </div>
          </div>
          <p className="m-0 mt-auto text-[11.5px] leading-[1.5] text-[#8fa89b]">{PROFITABILITY_DISCLAIMER}</p>
        </div>
      </section>

      {/* RELACIONADOS */}
      {related.length ? (
        <section className="mt-[clamp(36px,5vw,56px)]">
          <div className="mb-4 flex items-baseline justify-between gap-3.5">
            <h2 className="text-[clamp(1.3rem,2.2vw,1.6rem)] font-bold tracking-[-0.02em] text-white" style={{ fontFamily: "var(--font-display)" }}>
              Você também pode gostar
            </h2>
            <Link href="/loja" className="text-[13.5px] font-bold text-orange-400 hover:text-orange-300">
              Ver todos →
            </Link>
          </div>
          <div className="grid gap-[18px] [grid-template-columns:repeat(auto-fill,minmax(260px,1fr))]">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
