"use client";

import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import type { PublicProduct } from "@/lib/products";
import { useCart } from "@/stores/cart-store";

type AddToCartButtonProps = {
  product: PublicProduct;
  quantity?: number;
  label?: string;
  className?: string;
};

export function AddToCartButton({
  product,
  quantity = 1,
  label = "Adicionar ao carrinho",
  className,
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  const handleAdd = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0]?.url,
      priceCents: product.priceCents,
      quantity,
      stock: product.stock,
    });

    window.dataLayer?.push?.({
      event: "add_to_cart",
      ecommerce: {
        currency: "BRL",
        value: (product.priceCents / 100) * quantity,
        items: [{ item_id: product.id, item_name: product.name, quantity }],
      },
    });

    toast.success(`${product.name} adicionado ao carrinho.`);
  };

  return (
    <button
      type="button"
      className={cn("btn-brand", className)}
      disabled={!product.isPurchasable}
      onClick={handleAdd}
    >
      <ShoppingCart className="size-[18px]" aria-hidden="true" />
      {product.isPurchasable ? label : "Produto indisponível"}
    </button>
  );
}
