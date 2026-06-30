import { DEFAULT_WHATSAPP_MESSAGE } from "@/lib/constants";

export function getWhatsappNumber() {
  return process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5545998370750";
}

export function buildWhatsappUrl(message = DEFAULT_WHATSAPP_MESSAGE) {
  const number = getWhatsappNumber().replace(/\D/g, "");
  const text = encodeURIComponent(message);

  return `https://wa.me/${number}?text=${text}`;
}
