export function formatMoney(cents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(cents / 100);
}

/** Apenas o número no formato pt-BR (ex.: 7.499,00) — para compor "R$" separado do valor. */
export function formatBrlNumber(cents: number) {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

/**
 * Separa um texto de rendimento em valor + sufixo de período.
 * Ex.: "R$ 32,83 /dia" -> { value: "R$ 32,83", suffix: "/dia" }
 * Evita duplicar o sufixo quando o texto já o contém.
 */
export function splitRevenue(text: string) {
  const match = text.match(/^(.*?)(\s*\/\s*\w+)\s*$/);
  if (match) {
    return { value: match[1].trim(), suffix: match[2].replace(/\s+/g, "") };
  }
  return { value: text.trim(), suffix: "" };
}

export function parseMoneyToCents(value: string | number) {
  if (typeof value === "number") {
    return Math.round(value * 100);
  }

  const normalized = value
    .replace(/[^\d,.-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  const parsed = Number(normalized);

  if (Number.isNaN(parsed)) {
    return 0;
  }

  return Math.round(parsed * 100);
}
