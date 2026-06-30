"use client";

import { ArrowLeft, Check, Copy, Loader2, RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { formatBrlNumber } from "@/lib/money";
import { buildWhatsappUrl } from "@/lib/whatsapp";

type PixPayment = {
  paymentId: string;
  status: string;
  pixCopyPaste?: string | null;
  qrCodeImageUrl?: string | null;
  expiresAt?: string | null;
};

type PixPaymentClientProps = {
  order: {
    id: string;
    orderNumber: string;
    totalCents: number;
    paymentStatus: string;
    paidAt?: string | null;
  };
};

const terminalStatuses = ["PAID", "EXPIRED", "CANCELLED", "FAILED", "REFUNDED"];

export function PixPaymentClient({ order }: PixPaymentClientProps) {
  const router = useRouter();
  const [payment, setPayment] = useState<PixPayment | null>(null);
  const [status, setStatus] = useState(order.paymentStatus);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const purchaseTrackedRef = useRef(false);

  const checkStatus = async () => {
    const response = await fetch(`/api/payments/uaipag/status?orderId=${order.id}`);
    const data = await response.json();

    if (!response.ok) {
      toast.error(data.error || "Não foi possível consultar o pagamento.");
      return;
    }

    setStatus(data.paymentStatus);

    if (data.paymentStatus === "PAID") {
      if (!purchaseTrackedRef.current) {
        purchaseTrackedRef.current = true;
        window.dataLayer?.push?.({
          event: "purchase",
          ecommerce: {
            transaction_id: order.orderNumber,
            currency: "BRL",
            value: order.totalCents / 100,
          },
        });
      }

      router.push(`/pedido/${order.id}/obrigado`);
    }
  };

  useEffect(() => {
    async function createPix() {
      setIsLoading(true);
      const response = await fetch("/api/payments/uaipag/create-pix", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id }),
      });
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || "Não foi possível gerar o Pix.");
        setIsLoading(false);
        return;
      }

      setPayment(data);
      setStatus(data.status);
      setIsLoading(false);
    }

    if (order.paymentStatus === "PAID") {
      router.push(`/pedido/${order.id}/obrigado`);
      return;
    }

    createPix();
  }, [order.id, order.paymentStatus, router]);

  useEffect(() => {
    if (terminalStatuses.includes(status)) {
      return;
    }

    const interval = window.setInterval(checkStatus, 5000);

    return () => window.clearInterval(interval);
  });

  const copyPix = async () => {
    if (!payment?.pixCopyPaste) {
      return;
    }

    await navigator.clipboard.writeText(payment.pixCopyPaste);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
    toast.success("Código Pix copiado.");
  };

  const isPaid = status === "PAID";

  return (
    <div className="mx-auto max-w-[560px] px-[var(--gutter)] py-10">
      <Link href="/checkout" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--t-3)] hover:text-white">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Pagamento Pix
      </Link>

      <div className="flex flex-col gap-4">
        <p className="text-center text-sm leading-[1.5] text-[var(--t-3)]">
          Falta pouco! Escaneie o QR Code ou copie o código Pix.
          <br />
          A confirmação é <span className="font-bold text-white">automática</span> após o pagamento.
        </p>

        <div className="flex items-center justify-between gap-2.5 rounded-[14px] border border-border bg-navy-800 px-4 py-3">
          <span className="text-[12.5px] font-semibold text-[var(--t-4)]">Pedido</span>
          <span className="mono text-sm font-bold text-white">{order.orderNumber}</span>
        </div>

        <div className="flex flex-col items-center gap-3 rounded-[20px] border border-border bg-navy-800 p-5">
          {isLoading ? (
            <div className="flex size-[260px] items-center justify-center">
              <Loader2 className="size-8 animate-spin text-orange-400" aria-hidden="true" />
            </div>
          ) : payment?.qrCodeImageUrl ? (
            <div className="rounded-[14px] bg-white p-3">
              <Image
                src={payment.qrCodeImageUrl}
                alt={`QR Code Pix do pedido ${order.orderNumber}`}
                width={240}
                height={240}
                unoptimized
              />
            </div>
          ) : (
            <div className="flex size-[260px] items-center justify-center text-center text-sm text-[var(--t-4)]">
              QR Code indisponível — use o código copia e cola abaixo.
            </div>
          )}
          <div className="text-center">
            <span className="block text-xs font-semibold text-[var(--t-4)]">Valor total</span>
            <span className="flex items-baseline justify-center gap-1">
              <span className="text-[15px] font-bold text-[var(--t-4)]">R$</span>
              <span className="text-[28px] font-bold tracking-[-0.02em] text-white" style={{ fontFamily: "var(--font-display)" }}>
                {formatBrlNumber(order.totalCents)}
              </span>
            </span>
          </div>
        </div>

        <div>
          <span className="mb-1.5 block text-xs font-bold text-[var(--t-4)]">Pix copia e cola</span>
          <div className="flex items-stretch gap-2">
            <div className="mono flex min-w-0 flex-1 items-center overflow-hidden text-ellipsis whitespace-nowrap rounded-[14px] border border-border bg-navy-950 px-3.5 py-3 text-[11.5px] text-[var(--t-3)]">
              {payment?.pixCopyPaste || "—"}
            </div>
            <button
              type="button"
              onClick={copyPix}
              disabled={!payment?.pixCopyPaste}
              className="btn-brand shrink-0 px-4 text-[13px] disabled:opacity-50"
            >
              {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
              {copied ? "Copiado!" : "Copiar"}
            </button>
          </div>
        </div>

        {isPaid ? (
          <div className="flex items-center gap-2.5 rounded-[14px] border border-[color-mix(in_srgb,var(--green-500)_30%,transparent)] bg-[color-mix(in_srgb,var(--green-500)_14%,transparent)] px-4 py-3">
            <Check className="size-4 text-profit" strokeWidth={2.6} aria-hidden="true" />
            <span className="flex-1 text-[13px] font-bold text-profit">Pagamento confirmado</span>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 rounded-[14px] border border-[color-mix(in_srgb,var(--gold-400)_26%,transparent)] bg-[color-mix(in_srgb,var(--gold-400)_12%,transparent)] px-4 py-3">
            <span className="animate-status size-2.5 shrink-0 rounded-full bg-gold-400" />
            <span className="flex-1 text-[13px] font-bold text-gold-300">Aguardando pagamento</span>
            {payment?.expiresAt ? (
              <span className="mono text-xs text-[var(--t-4)]">
                expira {new Date(payment.expiresAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
              </span>
            ) : null}
          </div>
        )}

        <button
          type="button"
          onClick={checkStatus}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-[1.5px] border-[color-mix(in_srgb,#fff_22%,transparent)] text-[15px] font-bold text-white transition-colors hover:border-orange-400"
        >
          <RefreshCcw className="size-[18px]" aria-hidden="true" />
          Já fiz o pagamento
        </button>

        <p className="text-center text-xs text-[var(--t-4)]">
          Teve algum problema?{" "}
          <a
            href={buildWhatsappUrl(`Olá, preciso de suporte no pedido ${order.orderNumber}.`)}
            target="_blank"
            rel="noreferrer"
            className="font-bold text-orange-400 hover:text-orange-300"
          >
            Fale no WhatsApp
          </a>
        </p>
      </div>
    </div>
  );
}
