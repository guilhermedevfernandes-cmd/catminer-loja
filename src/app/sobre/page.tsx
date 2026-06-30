import { Cpu, ShieldCheck, Wrench } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { TrustBadges } from "@/components/site/trust-badges";
import { buildWhatsappUrl } from "@/lib/whatsapp";

const features = [
  { icon: Cpu, title: "Dados técnicos", text: "Hashrate, consumo, tensão e condição aparecem antes da compra." },
  { icon: Wrench, title: "Revisão clara", text: "Produtos usados ou revisados são indicados com aviso visível." },
  { icon: ShieldCheck, title: "Compra assistida", text: "WhatsApp permanece disponível durante escolha, pagamento e entrega." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-[color-mix(in_srgb,#fff_7%,transparent)]">
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(80% 120% at 85% -20%, color-mix(in srgb, var(--orange-500) 22%, transparent) 0%, transparent 55%), var(--gradient-night)" }}
        />
        <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-end gap-8 px-[var(--gutter)] pb-2 pt-[clamp(34px,5vw,64px)] lg:grid-cols-[1.5fr_0.8fr]">
          <div className="pb-[clamp(20px,4vw,40px)]">
            <span className="eyebrow rounded-full border border-[color-mix(in_srgb,#fff_16%,transparent)] bg-[color-mix(in_srgb,#fff_8%,transparent)] px-[13px] py-1.5">
              Sobre a Cat Miner
            </span>
            <h1 className="mt-4 text-[clamp(2rem,4.4vw,3.1rem)] font-bold leading-[1.05] tracking-[-0.025em] text-white" style={{ fontFamily: "var(--font-display)" }}>
              A maior fornecedora de <span className="text-brand-gradient">ASICs usados</span> do Brasil
            </h1>
            <p className="mt-4 max-w-[54ch] text-[clamp(15px,1.6vw,17px)] leading-[1.6] text-[var(--t-3)]">
              Ajudamos compradores no Brasil a escolher ASICs com dados claros de hashrate, consumo, condição e garantia.
              Foco em compra simples via Pix, estoque controlado e suporte direto para equipamentos de alto ticket.
              As máquinas são usadas, porém em ótimo estado de conservação — testadas e revisadas antes do envio.
            </p>
          </div>
          <div className="hidden self-end justify-self-center lg:block">
            <Image src="/brand/about-tall.png" alt="Mascote Cat Miner" width={300} height={400} className="h-auto w-[min(300px,24vw)] drop-shadow-[0_30px_50px_rgba(0,0,0,0.5)]" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-[var(--gutter)] py-[clamp(32px,5vw,56px)]">
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((item) => (
            <div key={item.title} className="rounded-[20px] border border-border bg-navy-800 p-6">
              <span className="inline-flex size-11 items-center justify-center rounded-[12px] bg-orange-50 text-orange-400">
                <item.icon className="size-6" aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-lg font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-[var(--t-3)]">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-[20px] border border-border bg-navy-800 px-6 py-5">
          <TrustBadges />
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-[28px] border border-border bg-gradient-to-br from-navy-700 to-navy-800 p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              Pronto para começar a minerar?
            </h2>
            <p className="mt-1.5 text-[var(--t-3)]">Veja o estoque disponível ou fale com um especialista.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/loja" className="btn-brand h-12 px-6 text-[15px]">
              Ver equipamentos
            </Link>
            <a href={buildWhatsappUrl()} target="_blank" rel="noreferrer" className="btn-wa h-12 px-6 text-[15px]">
              Falar com especialista
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
