import type { ProductCondition } from "@prisma/client";

// Reexport de tipo (apagado em runtime) — seguro para Client Components.
export type { PublicProduct } from "./products";

/** Rótulo de condição — client-safe (sem dependência de Prisma/DB em runtime). */
export function getConditionLabel(condition: ProductCondition) {
  const labels: Record<ProductCondition, string> = {
    NEW: "Novo",
    USED: "Usado revisado",
    REFURBISHED: "Revisado",
  };

  return labels[condition];
}

/** Versão curta para badges em cards estreitos. */
export function getConditionShort(condition: ProductCondition) {
  const labels: Record<ProductCondition, string> = {
    NEW: "Novo",
    USED: "Usado",
    REFURBISHED: "Revisado",
  };

  return labels[condition];
}
