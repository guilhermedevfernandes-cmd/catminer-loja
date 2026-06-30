"use client";

import { useEffect } from "react";

type PurchaseTrackerProps = {
  orderNumber: string;
  totalCents: number;
};

export function PurchaseTracker({ orderNumber, totalCents }: PurchaseTrackerProps) {
  useEffect(() => {
    const key = `catminer-purchase-${orderNumber}`;

    if (window.sessionStorage.getItem(key)) {
      return;
    }

    window.dataLayer?.push?.({
      event: "purchase",
      ecommerce: {
        transaction_id: orderNumber,
        currency: "BRL",
        value: totalCents / 100,
      },
    });
    window.sessionStorage.setItem(key, "true");
  }, [orderNumber, totalCents]);

  return null;
}
