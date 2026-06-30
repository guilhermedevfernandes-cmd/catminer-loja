import crypto from "node:crypto";

import type {
  CreatePixChargeInput,
  CreatePixChargeOutput,
  InternalPaymentStatus,
  UaiPagWebhookResult,
} from "@/lib/payments/payment-types";

function isMockEnabled() {
  return process.env.UAIPAG_MOCK === "true";
}

export async function createUaiPagPixCharge(
  input: CreatePixChargeInput,
): Promise<CreatePixChargeOutput> {
  if (isMockEnabled()) {
    const providerPaymentId = `mock_pay_${input.orderId}`;
    const providerTxid = `mock_txid_${input.orderId}`;
    const expiresAt = new Date(Date.now() + (input.expiresInMinutes || 30) * 60 * 1000);
    const pixCopyPaste = [
      "000201",
      "010212",
      `520400005303986540${(input.amountCents / 100).toFixed(2)}`,
      `62290525${providerTxid.slice(0, 25)}`,
      "6304MOCK",
    ].join("");

    return {
      providerPaymentId,
      providerTxid,
      status: "WAITING_PAYMENT",
      amountCents: input.amountCents,
      pixCopyPaste,
      qrCodeImageUrl: buildMockQrCodeDataUrl(input.orderNumber, input.amountCents),
      expiresAt,
      rawResponse: {
        mock: true,
        providerPaymentId,
        providerTxid,
        pixCopyPaste,
        expiresAt: expiresAt.toISOString(),
      },
    };
  }

  // TODO UaiPag: substituir pelo endpoint oficial de criacao de cobranca Pix.
  // Dados pendentes: base URL, autenticacao, payload, contrato de status e expiracao.
  throw new Error("Integração UaiPag real ainda não configurada.");
}

export async function getUaiPagPaymentStatus(
  providerPaymentId: string,
): Promise<UaiPagWebhookResult> {
  if (isMockEnabled()) {
    return {
      providerPaymentId,
      status: "WAITING_PAYMENT",
      rawPayload: { mock: true, providerPaymentId },
    };
  }

  // TODO UaiPag: substituir pelo endpoint oficial de consulta de cobranca.
  throw new Error("Consulta UaiPag real ainda não configurada.");
}

export async function verifyUaiPagWebhookSignature(
  request: Request,
  rawBody: string,
): Promise<boolean> {
  if (isMockEnabled()) {
    return true;
  }

  const secret = process.env.UAIPAG_WEBHOOK_SECRET;
  const signature = request.headers.get("x-uaipag-signature");

  if (!secret || !signature) {
    return false;
  }

  // TODO UaiPag: ajustar nome do header e algoritmo conforme documentacao oficial.
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");

  if (signature.length !== expected.length) {
    return false;
  }

  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
}

export async function parseUaiPagWebhook(payload: unknown): Promise<UaiPagWebhookResult> {
  const data = payload as Record<string, unknown>;
  const rawStatus = String(data.status || data.paymentStatus || "").toLowerCase();

  return {
    eventId: stringOrUndefined(data.eventId || data.id),
    eventType: stringOrUndefined(data.eventType || data.type),
    providerPaymentId: stringOrUndefined(data.providerPaymentId || data.paymentId),
    providerTxid: stringOrUndefined(data.providerTxid || data.txid),
    status: mapUaiPagStatus(rawStatus),
    amountCents: numberOrUndefined(data.amountCents),
    paidAt: data.paidAt ? new Date(String(data.paidAt)) : undefined,
    rawPayload: payload,
  };
}

export function mapUaiPagStatus(status: string): InternalPaymentStatus {
  const normalized = status.toLowerCase();

  if (["paid", "approved", "confirmed", "completed", "paido"].includes(normalized)) {
    return "PAID";
  }

  if (["pending", "processing"].includes(normalized)) {
    return "PENDING";
  }

  if (["created", "waiting", "waiting_payment", "awaiting_payment"].includes(normalized)) {
    return "WAITING_PAYMENT";
  }

  if (normalized === "expired") {
    return "EXPIRED";
  }

  if (["cancelled", "canceled"].includes(normalized)) {
    return "CANCELLED";
  }

  if (["failed", "error", "refused"].includes(normalized)) {
    return "FAILED";
  }

  if (normalized === "refunded") {
    return "REFUNDED";
  }

  return "PENDING";
}

export function buildWebhookFingerprint(result: UaiPagWebhookResult) {
  const base = [
    result.providerPaymentId,
    result.providerTxid,
    result.eventType,
    result.status,
    result.amountCents,
  ].join("|");

  return crypto.createHash("sha256").update(base || JSON.stringify(result.rawPayload)).digest("hex");
}

function buildMockQrCodeDataUrl(orderNumber: string, amountCents: number) {
  const amount = (amountCents / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320"><rect width="320" height="320" fill="#fff"/><rect x="24" y="24" width="76" height="76" fill="#111827"/><rect x="220" y="24" width="76" height="76" fill="#111827"/><rect x="24" y="220" width="76" height="76" fill="#111827"/><g fill="#111827">${Array.from({ length: 80 }, (_, index) => {
    const x = 118 + ((index * 37) % 150);
    const y = 118 + ((index * 53) % 150);
    const size = 8 + ((index * 7) % 16);
    return `<rect x="${x}" y="${y}" width="${size}" height="${size}"/>`;
  }).join("")}</g><text x="160" y="154" fill="#111827" text-anchor="middle" font-family="Arial" font-size="14" font-weight="700">${orderNumber}</text><text x="160" y="176" fill="#111827" text-anchor="middle" font-family="Arial" font-size="13">${amount}</text></svg>`;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

function stringOrUndefined(value: unknown) {
  return typeof value === "string" && value.length ? value : undefined;
}

function numberOrUndefined(value: unknown) {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : undefined;
}
