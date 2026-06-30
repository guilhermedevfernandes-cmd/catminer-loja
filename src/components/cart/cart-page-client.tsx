"use client";

import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { formatBrlNumber, formatMoney } from "@/lib/money";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { useCart } from "@/stores/cart-store";

export function CartPageClient() {
  const { items, itemCount, subtotalCents, updateQuantity, removeItem } = useCart();

  if (!items.length) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center px-[var(--gutter)] py-20 text-center">
        <Image src="/brand/about-tall.png" alt="" width={180} height={240} className="h-auto w-[180px] opacity-90" />
        <h1 className="mt-2 text-3xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
          Seu carrinho está vazio
        </h1>
        <p className="mt-3 max-w-[34ch] text-[var(--t-4)]">
          Explore nossos ASICs revisados e adicione um equipamento para começar.
        </p>
        <Link href="/loja" className="btn-brand mt-6 h-12 px-6 text-[15px]">
          Ver equipamentos
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-[var(--gutter)] py-10">
      <span className="eyebrow">Carrinho</span>
      <h1 className="mt-2 text-[clamp(1.8rem,3vw,2.4rem)] font-bold tracking-[-0.02em] text-white" style={{ fontFamily: "var(--font-display)" }}>
        Seu carrinho
      </h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.productId} className="flex gap-3.5 rounded-[20px] border border-border bg-navy-800 p-3">
              <div className="flex size-[84px] shrink-0 items-center justify-center overflow-hidden rounded-[14px] product-surface p-2">
                {item.image ? (
                  <Image src={item.image} alt={item.name} width={84} height={84} className="size-full object-contain" />
                ) : null}
              </div>

              <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                <div className="flex items-start justify-between gap-3">
                  <Link
                    href={`/produto/${item.slug}`}
                    className="text-[15px] font-bold leading-tight text-white hover:text-orange-400"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {item.name}
                  </Link>
                  <button
                    type="button"
                    aria-label="Remover"
                    onClick={() => removeItem(item.productId)}
                    className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg text-[var(--t-6)] transition-colors hover:bg-navy-700 hover:text-white"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-0.5 rounded-full border-[1.5px] border-[color-mix(in_srgb,#fff_22%,transparent)] p-0.5">
                    <button
                      type="button"
                      aria-label="Diminuir"
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="inline-flex size-7 items-center justify-center rounded-full text-white transition-colors hover:bg-navy-700"
                    >
                      <Minus className="size-3.5" aria-hidden="true" />
                    </button>
                    <span className="mono min-w-6 text-center text-sm font-bold text-white">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="Aumentar"
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="inline-flex size-7 items-center justify-center rounded-full text-white transition-colors hover:bg-navy-700"
                    >
                      <Plus className="size-3.5" aria-hidden="true" />
                    </button>
                  </div>
                  <span className="flex items-baseline gap-1">
                    <span className="text-[11px] font-bold text-[var(--t-4)]">R$</span>
                    <span className="mono text-[15px] font-bold text-white">
                      {formatBrlNumber(item.priceCents * item.quantity)}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}

          <a
            href={buildWhatsappUrl()}
            target="_blank"
            rel="noreferrer"
            className="mt-1 flex items-center gap-2.5 rounded-[14px] border border-[rgba(37,211,102,0.28)] bg-[rgba(37,211,102,0.08)] px-3.5 py-3 text-[12.5px] font-semibold text-[#3ee47e]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
            </svg>
            Dúvidas antes de comprar? Fale com um especialista
          </a>
        </section>

        <aside className="h-fit rounded-[28px] border border-border bg-navy-800 p-5">
          <h2 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            Resumo
          </h2>
          <div className="mt-4 flex flex-col gap-3">
            <div className="flex items-center justify-between text-sm text-[var(--t-3)]">
              <span>Subtotal ({itemCount} {itemCount === 1 ? "item" : "itens"})</span>
              <span className="mono font-bold text-white">{formatMoney(subtotalCents)}</span>
            </div>
            <div className="flex items-center justify-between text-[13px] text-[var(--t-4)]">
              <span>Frete</span>
              <span>Calculado no checkout</span>
            </div>
            <div className="flex items-end justify-between border-t border-[color-mix(in_srgb,#fff_7%,transparent)] pt-3">
              <span className="font-bold text-white">Total</span>
              <span className="flex items-baseline gap-1">
                <span className="text-sm font-bold text-[var(--t-4)]">R$</span>
                <span className="text-2xl font-bold tracking-[-0.02em] text-white" style={{ fontFamily: "var(--font-display)" }}>
                  {formatBrlNumber(subtotalCents)}
                </span>
              </span>
            </div>
          </div>
          <Link href="/checkout" className="btn-brand mt-5 h-[54px] w-full text-base">
            <ShoppingCart className="size-[19px]" aria-hidden="true" />
            Ir para o checkout
          </Link>
          <p className="mt-3 text-center text-[11px] leading-[1.4] text-[var(--t-5)]">
            Ao finalizar você será direcionado ao pagamento via Pix. O pedido é confirmado automaticamente após a aprovação.
          </p>
        </aside>
      </div>
    </div>
  );
}
