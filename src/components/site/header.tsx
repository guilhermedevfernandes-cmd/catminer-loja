"use client";

import { Menu, MessageCircle, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { BrandLogo } from "@/components/site/brand-logo";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { useCart } from "@/stores/cart-store";

const navItems = [
  { href: "/loja", label: "Loja" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
  { href: "/politicas/entrega", label: "Entrega" },
];

function isActive(pathname: string, href: string) {
  if (href === "/loja") return pathname === "/" || pathname.startsWith("/loja") || pathname.startsWith("/produto");
  return pathname.startsWith(href);
}

export function SiteHeader() {
  const { itemCount } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100] border-b border-[color-mix(in_srgb,#fff_7%,transparent)] bg-[color-mix(in_srgb,var(--navy-950)_82%,transparent)] backdrop-blur-[16px]">
      <div className="container-xl flex items-center justify-between gap-5 py-[13px]">
        <Link href="/" aria-label="Cat Miner — início">
          <BrandLogo priority />
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                data-active={active}
                className="navlink rounded-full px-[14px] py-[9px] text-sm font-semibold text-[var(--t-2)] transition-colors hover:text-white data-[active=true]:text-white"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={buildWhatsappUrl()}
            target="_blank"
            rel="noreferrer"
            className="hidden h-10 items-center gap-2 rounded-full border-[1.5px] border-[rgba(37,211,102,0.4)] bg-[rgba(37,211,102,0.12)] px-4 text-[13.5px] font-bold text-[#3ee47e] transition-colors hover:bg-[rgba(37,211,102,0.18)] sm:inline-flex"
          >
            <MessageCircle className="size-[17px]" aria-hidden="true" />
            Especialista
          </a>

          <Link
            href="/carrinho"
            aria-label="Carrinho"
            className="relative inline-flex size-11 items-center justify-center rounded-[14px] border-[1.5px] border-border bg-navy-700 text-white transition-colors hover:border-orange-400"
          >
            <ShoppingCart className="size-[21px]" aria-hidden="true" />
            {itemCount > 0 ? (
              <span
                key={itemCount}
                className="animate-pop mono absolute -right-1.5 -top-1.5 flex h-[21px] min-w-[21px] items-center justify-center rounded-full bg-brand px-[5px] text-[11px] font-bold text-white shadow-[0_0_0_2px_var(--navy-950)]"
              >
                {itemCount}
              </span>
            ) : null}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menu"
            className="inline-flex size-11 items-center justify-center rounded-[14px] border-[1.5px] border-border bg-navy-700 text-white md:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav className="border-t border-[color-mix(in_srgb,#fff_7%,transparent)] bg-navy-900 px-[var(--gutter)] py-4 md:hidden">
          <div className="container-xl flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-semibold text-[var(--t-2)] hover:bg-navy-800 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={buildWhatsappUrl()}
              target="_blank"
              rel="noreferrer"
              className="btn-wa mt-1 h-12 text-[15px]"
            >
              <MessageCircle className="size-5" aria-hidden="true" />
              Falar com especialista
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
