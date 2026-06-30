import Link from "next/link";

import { BrandLogo } from "@/components/site/brand-logo";
import { buildWhatsappUrl } from "@/lib/whatsapp";

const svgProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const IcoFb = () => (
  <svg {...svgProps}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const IcoIg = () => (
  <svg {...svgProps}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const IcoWa = () => (
  <svg {...svgProps}>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z" />
  </svg>
);

const FACEBOOK_HREF = "https://web.facebook.com/profile.php?id=61577801548690";
const INSTAGRAM_HREF = "https://www.instagram.com/catminerr/";
const CONTACT_EMAIL = "catminer@support.com.br";

const columns = [
  {
    title: "Loja",
    links: [
      { href: "/loja", label: "Equipamentos" },
      { href: "/sobre", label: "Sobre" },
      { href: "/contato", label: "Contato" },
    ],
  },
  {
    title: "Atendimento",
    links: [
      { href: "/politicas/entrega", label: "Entrega" },
      { href: "/politicas/troca-devolucao", label: "Trocas e devoluções" },
      { href: "/politicas/termos-compra", label: "Termos de compra" },
      { href: "/politicas/privacidade", label: "Privacidade" },
    ],
  },
];

const socialClass =
  "inline-flex size-9 items-center justify-center rounded-full border border-border bg-navy-700 text-[var(--t-2)] transition-colors hover:border-orange-400 hover:text-orange-500";

export function SiteFooter() {
  return (
    <footer className="bg-navy-950 px-[var(--gutter)] pb-[26px] pt-12 text-[var(--t-2)]">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-start justify-between gap-x-9 gap-y-8">
        <div className="flex max-w-[340px] flex-col gap-[13px]">
          <BrandLogo size={40} />
          <p className="m-0 text-sm leading-[1.55] text-[var(--t-4)]">
            A maior fornecedora de máquinas ASICs usadas do Brasil. Equipamentos
            testados, revisados e prontos para minerar.
          </p>
          <div className="mt-0.5 flex gap-2.5">
            <a href={FACEBOOK_HREF} target="_blank" rel="noreferrer" aria-label="Facebook" className={socialClass}>
              <IcoFb />
            </a>
            <a href={INSTAGRAM_HREF} target="_blank" rel="noreferrer" aria-label="Instagram" className={socialClass}>
              <IcoIg />
            </a>
            <a
              href={buildWhatsappUrl()}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="inline-flex size-9 items-center justify-center rounded-full bg-brand text-white shadow-glow-orange-sm transition-transform hover:-translate-y-px"
            >
              <IcoWa />
            </a>
          </div>
        </div>

        {columns.map((col) => (
          <nav key={col.title} className="flex flex-col gap-2.5">
            <h5 className="m-0 mb-1 text-xs font-bold uppercase tracking-[0.1em] text-[var(--t-6)]">
              {col.title}
            </h5>
            {col.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[var(--t-2)] transition-colors hover:text-orange-500"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ))}
      </div>

      <div className="mx-auto mt-[26px] flex max-w-[1280px] flex-wrap justify-between gap-2.5 border-t border-[rgba(255,255,255,0.08)] pt-5 text-[13px] text-[var(--t-5)]">
        <span>© 2025 Cat Miner</span>
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-[var(--t-5)] transition-colors hover:text-orange-500">
          {CONTACT_EMAIL}
        </a>
      </div>
    </footer>
  );
}
