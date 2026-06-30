"use client";

import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type OrderUpdateFormProps = {
  order: {
    id: string;
    status: string;
    trackingCode?: string | null;
    internalNotes?: string | null;
  };
};

export function OrderUpdateForm({ order }: OrderUpdateFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const response = await fetch(`/api/admin/orders/${order.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: formData.get("status"),
        trackingCode: formData.get("trackingCode"),
        internalNotes: formData.get("internalNotes"),
      }),
    });
    const data = await response.json();
    setIsSubmitting(false);

    if (!response.ok) {
      toast.error(data.error || "Não foi possível atualizar o pedido.");
      return;
    }

    toast.success("Pedido atualizado.");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 rounded-md border border-border bg-card p-5">
      <div className="grid gap-2 text-sm">
        <Label htmlFor="status">Status operacional</Label>
        <select id="status" name="status" defaultValue={order.status} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
          {["AWAITING_PAYMENT", "PAID", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED", "MANUAL_REVIEW"].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="trackingCode">Código de rastreio</Label>
        <Input id="trackingCode" name="trackingCode" defaultValue={order.trackingCode ?? ""} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="internalNotes">Observações internas</Label>
        <Textarea id="internalNotes" name="internalNotes" rows={5} defaultValue={order.internalNotes ?? ""} />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Save className="size-4" aria-hidden="true" />}
        Salvar pedido
      </Button>
    </form>
  );
}
