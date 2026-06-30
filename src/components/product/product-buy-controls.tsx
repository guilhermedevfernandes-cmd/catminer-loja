"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import type { PublicProduct } from "@/lib/product-display";

type ProductBuyControlsProps = {
  product: PublicProduct;
};

export function ProductBuyControls({ product }: ProductBuyControlsProps) {
  const max = Math.max(1, product.stock || 1);
  const [qty, setQty] = useState(1);

  return (
    <div className="flex flex-wrap items-stretch gap-3">
      <div className="flex items-center gap-0.5 rounded-full border-[1.5px] border-[color-mix(in_srgb,#fff_22%,transparent)] bg-navy-800 p-1">
        <button
          type="button"
          aria-label="Diminuir"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          disabled={qty <= 1}
          className="inline-flex size-10 items-center justify-center rounded-full text-white transition-colors hover:bg-navy-700 disabled:opacity-40"
        >
          <Minus className="size-4" aria-hidden="true" />
        </button>
        <span className="mono min-w-[34px] text-center text-[17px] font-bold text-white">{qty}</span>
        <button
          type="button"
          aria-label="Aumentar"
          onClick={() => setQty((q) => Math.min(max, q + 1))}
          disabled={qty >= max}
          className="inline-flex size-10 items-center justify-center rounded-full text-white transition-colors hover:bg-navy-700 disabled:opacity-40"
        >
          <Plus className="size-4" aria-hidden="true" />
        </button>
      </div>
      <AddToCartButton
        product={product}
        quantity={qty}
        label="Adicionar ao carrinho"
        className="h-[54px] min-w-[200px] flex-1 text-base"
      />
    </div>
  );
}
