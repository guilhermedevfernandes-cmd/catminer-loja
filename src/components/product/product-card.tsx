import { ArrowRight, Gauge, LineChart, Star, TrendingUp, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { formatBrlNumber, splitRevenue } from "@/lib/money";
import { getConditionShort, type PublicProduct } from "@/lib/product-display";

type ProductCardProps = {
  product: PublicProduct;
};

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images[0];
  const href = `/produto/${product.slug}`;
  const inStock = product.stock > 0;

  const specs = [
    { icon: Gauge, label: "Hashrate", value: product.hashrate },
    { icon: Zap, label: "Consumo", value: product.consumption },
    { icon: LineChart, label: "Eficiência", value: product.efficiency },
  ].filter((s) => Boolean(s.value));

  return (
    <article className="card-lift flex flex-col overflow-hidden rounded-[28px] border border-border bg-navy-800">
      <Link href={href} className="group relative block aspect-[4/3] overflow-hidden p-[18px] product-surface">
        <div className="absolute left-3 top-3 z-[2] flex flex-wrap gap-1.5">
          {inStock ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-profit px-2.5 py-[5px] text-[11.5px] font-bold text-white">
              <span className="size-1.5 rounded-full bg-white" />
              Em estoque
            </span>
          ) : (
            <span className="rounded-full bg-navy-900 px-2.5 py-[5px] text-[11.5px] font-bold text-[var(--t-3)]">
              Sob consulta
            </span>
          )}
          <span className="rounded-full bg-navy-900/90 px-2.5 py-[5px] text-[11.5px] font-bold text-white">
            {getConditionShort(product.condition)}
          </span>
        </div>
        {product.isFeatured ? (
          <span className="absolute right-3 top-3 z-[2] inline-flex items-center gap-1 rounded-full bg-brand px-2.5 py-[5px] text-[11px] font-bold text-white shadow-glow-orange-sm">
            <Star className="size-3 fill-current" aria-hidden="true" />
            Destaque
          </span>
        ) : null}
        <Image
          src={image.url}
          alt={image.alt || product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="card-zoom object-contain p-2"
        />
      </Link>

      <div className="flex flex-col gap-[13px] p-[17px]">
        <Link
          href={href}
          className="text-[17.5px] font-bold leading-[1.18] tracking-[-0.01em] text-white transition-colors hover:text-orange-400"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {product.name}
        </Link>

        {specs.length ? (
          <div className="flex flex-col">
            {specs.map((spec, i) => (
              <div
                key={spec.label}
                className={`flex items-center justify-between py-[7px] ${
                  i < specs.length - 1 ? "border-b border-[color-mix(in_srgb,#fff_7%,transparent)]" : ""
                }`}
              >
                <span className="flex items-center gap-[7px] text-[12.5px] font-semibold text-[var(--t-4)]">
                  <spec.icon className="size-[15px] text-[var(--t-6)]" aria-hidden="true" />
                  {spec.label}
                </span>
                <span className="mono text-[13.5px] font-bold text-white">{spec.value}</span>
              </div>
            ))}
          </div>
        ) : null}

        {product.dailyRevenueText ? (
          <div className="flex flex-col gap-[5px] rounded-[14px] border border-[color-mix(in_srgb,var(--green-500)_22%,transparent)] bg-[color-mix(in_srgb,var(--green-500)_12%,transparent)] px-[13px] py-[11px]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[12.5px] font-bold text-profit">
                <TrendingUp className="size-[15px]" aria-hidden="true" />
                Rendimento estimado
              </span>
              <span className="mono text-[14px] font-bold text-profit">
                {splitRevenue(product.dailyRevenueText).value}
                {splitRevenue(product.dailyRevenueText).suffix ? (
                  <span className="text-[10.5px] font-semibold text-[#7fb79e]">
                    {" "}
                    {splitRevenue(product.dailyRevenueText).suffix}
                  </span>
                ) : null}
              </span>
            </div>
            <span className="text-[10.5px] leading-[1.3] text-[#7e9c8e]">
              Estimativa — não é rentabilidade garantida.
            </span>
          </div>
        ) : null}

        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <div className="flex flex-col">
            <span className="mono text-[11px] font-semibold text-[var(--t-4)]">à vista no Pix</span>
            <span className="flex items-baseline gap-1">
              <span className="text-[13px] font-bold text-[var(--t-4)]">R$</span>
              <span
                className="text-[26px] font-bold leading-none tracking-[-0.02em] text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {formatBrlNumber(product.priceCents)}
              </span>
            </span>
          </div>
        </div>

        <div className="mt-px flex gap-[9px]">
          <AddToCartButton product={product} label="Adicionar" className="h-[46px] flex-1 text-[14.5px]" />
          <Link
            href={href}
            aria-label="Ver detalhes"
            className="inline-flex size-[46px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-[color-mix(in_srgb,#fff_22%,transparent)] text-[var(--t-3)] transition-colors hover:border-orange-400 hover:text-white"
          >
            <ArrowRight className="size-[19px]" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
