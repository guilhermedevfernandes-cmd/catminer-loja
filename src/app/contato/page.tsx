import { Mail, MessageCircle } from "lucide-react";

import { buildWhatsappUrl } from "@/lib/whatsapp";

const CONTACT_EMAIL = "catminer@support.com.br";

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[860px] px-[var(--gutter)] py-[clamp(32px,5vw,56px)]">
      <span className="eyebrow">Contato</span>
      <h1 className="mt-2 text-[clamp(1.9rem,3.4vw,2.6rem)] font-bold tracking-[-0.025em] text-white" style={{ fontFamily: "var(--font-display)" }}>
        Fale com a equipe Cat Miner
      </h1>
      <p className="mt-4 max-w-[60ch] text-[17px] leading-[1.6] text-[var(--t-3)]">
        Use o WhatsApp para tirar dúvidas sobre tensão, consumo, condição do equipamento, entrega e pagamento Pix.
        Produto de alto ticket merece atendimento humano — estamos por aqui.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a
          href={buildWhatsappUrl()}
          target="_blank"
          rel="noreferrer"
          className="group rounded-[20px] border-[1.5px] border-[rgba(37,211,102,0.4)] bg-[rgba(37,211,102,0.08)] p-6 transition-colors hover:bg-[rgba(37,211,102,0.14)]"
        >
          <span className="inline-flex size-11 items-center justify-center rounded-[12px] bg-[rgba(37,211,102,0.16)] text-[#3ee47e]">
            <MessageCircle className="size-6" aria-hidden="true" />
          </span>
          <p className="mt-4 font-bold text-white">WhatsApp</p>
          <p className="mt-1.5 text-sm text-[var(--t-3)]">Atendimento consultivo para escolher e comprar.</p>
        </a>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="rounded-[20px] border border-border bg-navy-800 p-6 transition-colors hover:border-orange-400"
        >
          <span className="inline-flex size-11 items-center justify-center rounded-[12px] bg-orange-50 text-orange-400">
            <Mail className="size-6" aria-hidden="true" />
          </span>
          <p className="mt-4 font-bold text-white">E-mail</p>
          <p className="mt-1.5 text-sm text-[var(--t-3)]">{CONTACT_EMAIL}</p>
        </a>
      </div>

      <a href={buildWhatsappUrl()} target="_blank" rel="noreferrer" className="btn-brand mt-8 h-[54px] px-7 text-base">
        <MessageCircle className="size-[19px]" aria-hidden="true" />
        Falar no WhatsApp
      </a>
    </div>
  );
}
