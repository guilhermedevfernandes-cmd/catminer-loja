export type InternalPaymentStatus =
  | "WAITING_PAYMENT"
  | "PENDING"
  | "PAID"
  | "EXPIRED"
  | "CANCELLED"
  | "FAILED"
  | "REFUNDED";

export type CreatePixChargeInput = {
  orderId: string;
  orderNumber: string;
  amountCents: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    document?: string | null;
  };
  expiresInMinutes?: number;
};

export type CreatePixChargeOutput = {
  providerPaymentId: string;
  providerTxid?: string;
  status: "WAITING_PAYMENT" | "PENDING" | "PAID" | "FAILED";
  amountCents: number;
  pixCopyPaste?: string;
  qrCodeImageUrl?: string;
  expiresAt?: Date;
  rawResponse: unknown;
};

export type UaiPagWebhookResult = {
  eventId?: string;
  eventType?: string;
  providerPaymentId?: string;
  providerTxid?: string;
  status: InternalPaymentStatus;
  amountCents?: number;
  paidAt?: Date;
  rawPayload: unknown;
};
