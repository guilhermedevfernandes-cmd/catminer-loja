"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  image?: string;
  priceCents: number;
  quantity: number;
  stock: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotalCents: number;
  addItem: (item: CartItem) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

const CART_STORAGE_KEY = "catminer-cart";

const CartContext = createContext<CartContextValue | null>(null);

function sanitizeItems(items: CartItem[]) {
  return items
    .map((item) => ({
      ...item,
      quantity: Math.max(1, Math.min(item.quantity, item.stock || item.quantity)),
    }))
    .filter((item) => item.quantity > 0);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY);

      if (stored) {
        try {
          setItems(sanitizeItems(JSON.parse(stored)));
        } catch {
          window.localStorage.removeItem(CART_STORAGE_KEY);
        }
      }

      setHydrated(true);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (hydrated) {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [hydrated, items]);

  const addItem = useCallback((item: CartItem) => {
    setItems((currentItems) => {
      const existing = currentItems.find((current) => current.productId === item.productId);

      if (!existing) {
        return sanitizeItems([...currentItems, item]);
      }

      return sanitizeItems(
        currentItems.map((current) =>
          current.productId === item.productId
            ? {
                ...current,
                quantity: Math.min(current.quantity + item.quantity, item.stock),
                stock: item.stock,
                priceCents: item.priceCents,
              }
            : current,
        ),
      );
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((currentItems) =>
      sanitizeItems(
        currentItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) }
            : item,
        ),
      ),
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.productId !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotalCents = items.reduce(
      (total, item) => total + item.priceCents * item.quantity,
      0,
    );

    return {
      items,
      itemCount,
      subtotalCents,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    };
  }, [addItem, clearCart, items, removeItem, updateQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart deve ser usado dentro de CartProvider.");
  }

  return context;
}
