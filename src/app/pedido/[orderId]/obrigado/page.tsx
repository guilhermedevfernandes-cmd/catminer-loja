import { Check, MessageCircle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PurchaseTracker } from "@/components/checkout/purchase-tracker";
import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/money";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

type ThankYouPageProps = {
  params: Promise<{ orderId: string }>;
};

export default async function ThankYouPage({ params }: ThankYouPageProps) {
  const { orderId } = await params;
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });

  if (!order) {
    notFound();
  }

  const paid = order.paymentStatus === "PAID";

  return (
    <div className="mx-auto max-w-[640px] px-[var(--gutter)] py-16">
      {paid ? <PurchaseTracker orderNumber={order.orderNumber} totalCents={order.totalCents} /> : null}

      <div className="flex flex-col items-center rounded-[28px] border border-border bg-navy-800 p-8 text-center sm:p-10">
        <span className="inline-flex size-[74px] items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--green-500)_18%,transparent)] text-profit">
          <Check className="size-10" strokeWidth={2.4} aria-hidden="true" />
        </span>
        <h1 className="mt-4 text-[clamp(1.6rem,3vw,2rem)] font-bold tracking-[-0.02em] text-white" style={{ fontFamily: "var(--font-display)" }}>
          {paid ? "Pagamento confirmado!" : "Pedido recebido"}
        </h1>
        <p className="mt-3 max-w-[40ch] text-[15px] leading-[1.55] text-[var(--t-3)]">
          {paid ? "Recebemos seu pagamento do pedido" : "Registramos seu pedido"}{" "}
          <span className="mono font-bold text-white">{order.orderNumber}</span> no valor de{" "}
          <span className="font-bold text-white">{formatMoney(order.totalCents)}</span>.{" "}
          {paid
            ? "Nossa equipe já está preparando o envio e entrará em contato pelo WhatsApp."
            : "Assim que o pagamento for confirmado, iniciamos a preparação do envio."}
        </p>

        <div className="mt-7 w-full max-w-[420px] rounded-[18px] border border-[color-mix(in_srgb,#fff_7%,transparent)] bg-navy-900 p-4 text-left">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4 py-1.5 text-sm">
              <span className="text-[var(--t-2)]">
                <span className="mono text-[var(--t-4)]">{item.quantity}×</span> {item.name}
              </span>
              <span className="mono font-semibold text-white">{formatMoney(item.totalCents)}</span>
            </div>
          ))}
        </div>

        <div className="mt-7 flex w-full max-w-[420px] flex-col gap-2.5">
          <a
            href={buildWhatsappUrl(`Olá, quero acompanhar o pedido ${order.orderNumber}.`)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-[#25D366] text-[15px] font-bold text-white transition-transform hover:-translate-y-px"
          >
            <MessageCircle className="size-[19px]" aria-hidden="true" />
            Acompanhar no WhatsApp
          </a>
          <Link
            href="/loja"
            className="inline-flex h-12 items-center justify-center rounded-full border-[1.5px] border-[color-mix(in_srgb,#fff_22%,transparent)] text-[15px] font-bold text-white transition-colors hover:border-orange-400"
          >
            Continuar comprando
          </Link>
        </div>
      </div>
    </div>
  );
}
