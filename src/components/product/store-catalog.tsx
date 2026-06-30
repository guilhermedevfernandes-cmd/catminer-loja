"use client";

import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

import { ProductCard } from "@/components/product/product-card";
import { getConditionLabel, type PublicProduct } from "@/lib/product-display";
import { buildWhatsappUrl } from "@/lib/whatsapp";

type StoreCatalogProps = {
  products: PublicProduct[];
  initialQuery?: string;
};

function parseHash(value: string | null) {
  if (!value) return 0;
  const match = value.replace(",", ".").match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevância" },
  { value: "price-asc", label: "Menor preço" },
  { value: "price-desc", label: "Maior preço" },
  { value: "hash", label: "Maior hashrate" },
];

export function StoreCatalog({ products, initialQuery = "" }: StoreCatalogProps) {
  const priceCeil = useMemo(
    () => Math.ceil(Math.max(0, ...products.map((p) => p.priceCents / 100)) / 500) * 500 || 10000,
    [products],
  );
  const hashCeil = useMemo(
    () => Math.ceil(Math.max(0, ...products.map((p) => parseHash(p.hashrate))) / 5) * 5 || 120,
    [products],
  );

  const [query, setQuery] = useState(initialQuery);
  const [brands, setBrands] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState(priceCeil);
  const [hashMin, setHashMin] = useState(0);
  const [cond, setCond] = useState("all");
  const [stockOnly, setStockOnly] = useState(false);
  const [sort, setSort] = useState("relevance");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const brandOptions = useMemo(() => {
    const map = new Map<string, number>();
    for (const p of products) {
      if (p.brand) map.set(p.brand, (map.get(p.brand) ?? 0) + 1);
    }
    return [...map.entries()].map(([label, count]) => ({ label, count }));
  }, [products]);

  const condOptions = useMemo(() => {
    const set = new Set(products.map((p) => p.condition));
    return [...set];
  }, [products]);

  const hasFilters =
    brands.length > 0 || priceMax < priceCeil || hashMin > 0 || cond !== "all" || stockOnly || query.trim() !== "";

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      if (q) {
        const hay = `${p.name} ${p.brand ?? ""} ${p.model ?? ""} ${p.hashrate ?? ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      if (brands.length && (!p.brand || !brands.includes(p.brand))) return false;
      if (p.priceCents / 100 > priceMax) return false;
      if (parseHash(p.hashrate) < hashMin) return false;
      if (cond !== "all" && p.condition !== cond) return false;
      if (stockOnly && p.stock <= 0) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.priceCents - b.priceCents;
      if (sort === "price-desc") return b.priceCents - a.priceCents;
      if (sort === "hash") return parseHash(b.hashrate) - parseHash(a.hashrate);
      return Number(b.isFeatured) - Number(a.isFeatured);
    });
    return list;
  }, [products, query, brands, priceMax, hashMin, cond, stockOnly, sort]);

  function toggleBrand(brand: string) {
    setBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]));
  }

  function clearFilters() {
    setBrands([]);
    setPriceMax(priceCeil);
    setHashMin(0);
    setCond("all");
    setStockOnly(false);
    setQuery("");
  }

  const sectionClass = "rounded-[20px] border border-border bg-navy-800 p-4";
  const labelClass = "mb-3 text-xs font-bold uppercase tracking-[0.08em] text-[var(--t-5)]";

  return (
    <div className="grid grid-cols-1 items-start gap-[clamp(20px,2.4vw,36px)] lg:grid-cols-[264px_1fr]">
      {/* overlay mobile */}
      {filtersOpen ? (
        <div
          onClick={() => setFiltersOpen(false)}
          className="fixed inset-0 z-[65] bg-[rgba(4,6,13,0.62)] lg:hidden"
        />
      ) : (
        <span className="hidden" />
      )}

      {/* FILTROS */}
      <aside
        className={`flex flex-col gap-[18px] max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-[70] max-lg:w-[310px] max-lg:max-w-[88%] max-lg:overflow-y-auto max-lg:border-r max-lg:border-border max-lg:bg-navy-900 max-lg:p-[18px] max-lg:shadow-[0_0_70px_rgba(0,0,0,0.6)] max-lg:transition-transform lg:sticky lg:top-[84px] ${
          filtersOpen ? "max-lg:translate-x-0" : "max-lg:-translate-x-[112%]"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-base font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            <SlidersHorizontal className="size-[17px] text-orange-400" aria-hidden="true" />
            Filtros
          </span>
          <div className="flex items-center gap-3">
            {hasFilters ? (
              <button onClick={clearFilters} className="text-[12.5px] font-bold text-orange-400 hover:text-orange-300">
                Limpar
              </button>
            ) : null}
            <button
              onClick={() => setFiltersOpen(false)}
              aria-label="Fechar filtros"
              className="inline-flex size-[34px] items-center justify-center rounded-[10px] border border-border bg-navy-700 text-white lg:hidden"
            >
              <X className="size-[17px]" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Marca */}
        {brandOptions.length ? (
          <div className={sectionClass}>
            <div className={labelClass}>Marca</div>
            <div className="flex flex-col gap-[9px]">
              {brandOptions.map((b) => {
                const on = brands.includes(b.label);
                return (
                  <label key={b.label} className="flex cursor-pointer select-none items-center gap-[11px]">
                    <span
                      className="inline-flex size-[21px] items-center justify-center rounded-[7px] border-[1.5px] transition-colors"
                      style={{
                        borderColor: on ? "var(--orange-400)" : "var(--border-strong, color-mix(in srgb,#fff 22%,transparent))",
                        background: on ? "var(--gradient-brand)" : "transparent",
                      }}
                    >
                      {on ? (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      ) : null}
                    </span>
                    <span className={`flex-1 text-sm font-semibold ${on ? "text-white" : "text-[var(--t-2)]"}`}>{b.label}</span>
                    <span className="mono text-xs text-[var(--t-6)]">{b.count}</span>
                    <input type="checkbox" checked={on} onChange={() => toggleBrand(b.label)} className="sr-only" />
                  </label>
                );
              })}
            </div>
          </div>
        ) : null}

        {/* Preço */}
        <div className={sectionClass}>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--t-5)]">Preço máx.</span>
            <span className="mono text-[13px] font-bold text-gold-300">
              R$ {priceMax.toLocaleString("pt-BR")}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={priceCeil}
            step={100}
            value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            className="w-full cursor-pointer accent-[var(--orange-500)]"
          />
          <div className="mono mt-1 flex justify-between text-[11px] text-[var(--t-6)]">
            <span>R$ 0</span>
            <span>R$ {priceCeil.toLocaleString("pt-BR")}</span>
          </div>
        </div>

        {/* Hashrate */}
        <div className={sectionClass}>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--t-5)]">Hashrate mín.</span>
            <span className="mono text-[13px] font-bold text-gold-300">{hashMin} TH</span>
          </div>
          <input
            type="range"
            min={0}
            max={hashCeil}
            step={5}
            value={hashMin}
            onChange={(e) => setHashMin(Number(e.target.value))}
            className="w-full cursor-pointer accent-[var(--orange-500)]"
          />
          <div className="mono mt-1 flex justify-between text-[11px] text-[var(--t-6)]">
            <span>0 TH</span>
            <span>{hashCeil} TH</span>
          </div>
        </div>

        {/* Condição */}
        <div className={sectionClass}>
          <div className={labelClass}>Condição</div>
          <div className="flex flex-col gap-[9px]">
            {[{ value: "all", label: "Todas" }, ...condOptions.map((c) => ({ value: c, label: getConditionLabel(c) }))].map((c) => {
              const on = cond === c.value;
              return (
                <label key={c.value} className="flex cursor-pointer select-none items-center gap-[11px]">
                  <span
                    className="inline-flex size-5 items-center justify-center rounded-full border-[1.5px]"
                    style={{ borderColor: on ? "var(--orange-400)" : "color-mix(in srgb,#fff 22%,transparent)" }}
                  >
                    {on ? <span className="size-2.5 rounded-full bg-brand" /> : null}
                  </span>
                  <span className={`text-sm font-semibold ${on ? "text-white" : "text-[var(--t-2)]"}`}>{c.label}</span>
                  <input type="radio" name="cond" checked={on} onChange={() => setCond(c.value)} className="sr-only" />
                </label>
              );
            })}
          </div>
          <label className="mt-3.5 flex cursor-pointer select-none items-center justify-between gap-[11px] border-t border-[color-mix(in_srgb,#fff_7%,transparent)] pt-3.5">
            <span className="text-sm font-semibold text-[var(--t-2)]">Somente em estoque</span>
            <span
              className="relative h-6 w-[42px] rounded-full transition-colors"
              style={{ background: stockOnly ? "var(--gradient-brand)" : "var(--navy-600)" }}
            >
              <span
                className="absolute top-0.5 size-5 rounded-full bg-white transition-all"
                style={{ left: stockOnly ? "20px" : "2px" }}
              />
            </span>
            <input type="checkbox" checked={stockOnly} onChange={() => setStockOnly((v) => !v)} className="sr-only" />
          </label>
        </div>

        <a
          href={buildWhatsappUrl()}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-[20px] border border-border bg-gradient-to-br from-navy-700 to-navy-800 p-3.5 no-underline"
        >
          <Image src="/brand/feature-suporte.png" alt="" width={46} height={46} className="size-[46px] shrink-0 object-contain" />
          <span>
            <span className="block text-[13.5px] font-bold text-white">Não sabe qual escolher?</span>
            <span className="mt-0.5 block text-[12.5px] text-[var(--t-3)]">Fale com um especialista no WhatsApp</span>
          </span>
        </a>
      </aside>

      {/* GRID */}
      <div>
        <button
          onClick={() => setFiltersOpen(true)}
          className="mb-3.5 flex h-[46px] w-full items-center justify-center gap-2.5 rounded-xl border-[1.5px] border-[color-mix(in_srgb,#fff_22%,transparent)] bg-navy-800 text-sm font-bold text-white lg:hidden"
        >
          <SlidersHorizontal className="size-[17px]" aria-hidden="true" />
          Filtros
        </button>

        <div className="mb-[18px] flex flex-wrap items-center justify-between gap-3.5">
          <div>
            <h2 className="text-[clamp(1.3rem,2.2vw,1.6rem)] font-bold tracking-[-0.02em] text-white" style={{ fontFamily: "var(--font-display)" }}>
              Confira nossos modelos
            </h2>
            <p className="mt-1.5 text-[13.5px] text-[var(--t-4)]">
              <span className="mono font-bold text-[var(--t-2)]">{filtered.length}</span> de {products.length} equipamentos disponíveis
            </p>
          </div>
          <label className="flex items-center gap-2.5 text-[13px] font-semibold text-[var(--t-4)]">
            Ordenar
            <span className="relative inline-flex items-center">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-[42px] cursor-pointer appearance-none rounded-[14px] border-[1.5px] border-border bg-navy-800 pl-[15px] pr-[38px] text-sm font-semibold text-white outline-none"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-[13px] size-[17px] text-[var(--t-4)]" aria-hidden="true" />
            </span>
          </label>
        </div>

        {filtered.length ? (
          <div className="grid gap-[clamp(16px,1.6vw,22px)] [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-[28px] border border-border bg-navy-800 px-5 py-[50px] text-center">
            <Image src="/brand/about-tall.png" alt="" width={150} height={200} className="mb-2 h-auto w-[150px] opacity-90" />
            <h3 className="text-[19px] font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              Nenhum equipamento encontrado
            </h3>
            <p className="my-2 max-w-[34ch] text-sm text-[var(--t-4)]">
              Ajuste os filtros ou fale com a gente — temos mais unidades chegando ao estoque.
            </p>
            <button onClick={clearFilters} className="btn-brand mt-2 h-[46px] px-[22px] text-[14.5px]">
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
