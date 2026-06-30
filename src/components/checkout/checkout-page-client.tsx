"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { PROFITABILITY_DISCLAIMER, USED_EQUIPMENT_NOTICE } from "@/lib/constants";
import { formatMoney } from "@/lib/money";
import {
  checkoutSchema,
  type CheckoutFormInput,
  type CheckoutInput,
} from "@/lib/validators/checkout";
import { useCart } from "@/stores/cart-store";

export function CheckoutPageClient() {
  const router = useRouter();
  const { items, subtotalCents, clearCart } = useCart();

  const form = useForm<CheckoutFormInput, unknown, CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      items: [],
      customer: {
        name: "",
        email: "",
        phone: "",
        document: "",
      },
      shipping: {
        zipCode: "",
        address: "",
        number: "",
        complement: "",
        district: "",
        city: "",
        state: "",
      },
      acceptances: {
        policies: false,
        usedEquipment: false,
        profitabilityDisclaimer: false,
      },
      notes: "",
    },
  });

  const onSubmit = async (values: CheckoutInput) => {
    if (!items.length) {
      toast.error("Seu carrinho está vazio.");
      return;
    }

    const payload: CheckoutInput = {
      ...values,
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    window.dataLayer?.push?.({
      event: "begin_checkout",
      ecommerce: {
        currency: "BRL",
        value: subtotalCents / 100,
        items: items.map((item) => ({
          item_id: item.productId,
          item_name: item.name,
          quantity: item.quantity,
        })),
      },
    });

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.error || "Não foi possível criar o pedido.");
      return;
    }

    clearCart();
    router.push(data.paymentUrl);
  };

  if (!items.length) {
    return (
      <div className="mx-auto w-full max-w-3xl px-[var(--gutter)] py-16 text-center">
        <h1 className="text-3xl font-bold tracking-normal text-white">Checkout</h1>
        <p className="mt-3 text-[var(--t-4)]">Adicione um equipamento ao carrinho antes de continuar.</p>
        <Button asChild variant="brand" size="lg" className="mt-6">
          <Link href="/loja">Ver equipamentos</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_360px] lg:px-8">
      <form className="grid gap-8" onSubmit={form.handleSubmit(onSubmit)}>
        <div>
          <span className="eyebrow">Finalizar compra</span>
          <h1 className="mt-2 text-3xl font-bold tracking-[-0.02em] text-white">Checkout</h1>
          <p className="mt-2 text-[var(--t-4)]">
            Ao finalizar, você será direcionado para o pagamento via Pix.
          </p>
        </div>

        <section className="grid gap-4 rounded-[20px] border border-border bg-card p-5 sm:p-6">
          <h2 className="text-xl font-semibold">Dados pessoais</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nome completo" error={form.formState.errors.customer?.name?.message}>
              <Input {...form.register("customer.name")} autoComplete="name" />
            </Field>
            <Field label="E-mail" error={form.formState.errors.customer?.email?.message}>
              <Input {...form.register("customer.email")} type="email" autoComplete="email" />
            </Field>
            <Field label="WhatsApp" error={form.formState.errors.customer?.phone?.message}>
              <Input {...form.register("customer.phone")} autoComplete="tel" />
            </Field>
            <Field label="CPF/CNPJ" error={form.formState.errors.customer?.document?.message}>
              <Input {...form.register("customer.document")} />
            </Field>
          </div>
        </section>

        <section className="grid gap-4 rounded-[20px] border border-border bg-card p-5 sm:p-6">
          <h2 className="text-xl font-semibold">Entrega</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="CEP" error={form.formState.errors.shipping?.zipCode?.message}>
              <Input {...form.register("shipping.zipCode")} autoComplete="postal-code" />
            </Field>
            <Field label="Rua" error={form.formState.errors.shipping?.address?.message}>
              <Input {...form.register("shipping.address")} autoComplete="address-line1" />
            </Field>
            <Field label="Número" error={form.formState.errors.shipping?.number?.message}>
              <Input {...form.register("shipping.number")} autoComplete="address-line2" />
            </Field>
            <Field label="Complemento" error={form.formState.errors.shipping?.complement?.message}>
              <Input {...form.register("shipping.complement")} />
            </Field>
            <Field label="Bairro" error={form.formState.errors.shipping?.district?.message}>
              <Input {...form.register("shipping.district")} />
            </Field>
            <Field label="Cidade" error={form.formState.errors.shipping?.city?.message}>
              <Input {...form.register("shipping.city")} autoComplete="address-level2" />
            </Field>
            <Field label="Estado" error={form.formState.errors.shipping?.state?.message}>
              <Input {...form.register("shipping.state")} maxLength={2} autoComplete="address-level1" />
            </Field>
          </div>
        </section>

        <section className="grid gap-4 rounded-[20px] border border-border bg-card p-5 sm:p-6">
          <h2 className="text-xl font-semibold">Aceites obrigatórios</h2>
          <Controller
            control={form.control}
            name="acceptances.policies"
            render={({ field }) => (
              <Acceptance
                id="policies"
                label="Li e aceito as políticas da loja."
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
            )}
          />
          <Controller
            control={form.control}
            name="acceptances.usedEquipment"
            render={({ field }) => (
              <Acceptance
                id="usedEquipment"
                label={USED_EQUIPMENT_NOTICE}
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
            )}
          />
          <Controller
            control={form.control}
            name="acceptances.profitabilityDisclaimer"
            render={({ field }) => (
              <Acceptance
                id="profitabilityDisclaimer"
                label={PROFITABILITY_DISCLAIMER}
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked === true)}
              />
            )}
          />
          {form.formState.errors.acceptances ? (
            <p className="text-sm text-destructive">Todos os aceites são obrigatórios.</p>
          ) : null}
          <Field label="Observações" error={form.formState.errors.notes?.message}>
            <Textarea {...form.register("notes")} rows={4} />
          </Field>
        </section>

        <Button type="submit" variant="brand" size="xl" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
          Gerar pagamento Pix
        </Button>
      </form>

      <aside className="h-fit rounded-[28px] border border-border bg-card p-5 lg:sticky lg:top-[84px]">
        <h2 className="text-lg font-semibold">Revisão do pedido</h2>
        <div className="mt-4 grid gap-4">
          {items.map((item) => (
            <div key={item.productId} className="flex justify-between gap-4 text-sm">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-muted-foreground">Qtd. {item.quantity}</p>
              </div>
              <span>{formatMoney(item.priceCents * item.quantity)}</span>
            </div>
          ))}
          <Separator />
          <div className="flex justify-between text-lg font-semibold">
            <span>Total visual</span>
            <span>{formatMoney(subtotalCents)}</span>
          </div>
          <p className="text-xs leading-5 text-muted-foreground">
            O total final é recalculado no backend antes da criação do pedido.
          </p>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium">{label}</span>
      {children}
      {error ? <span className="text-xs text-destructive">{error}</span> : null}
    </label>
  );
}

function Acceptance({
  id,
  label,
  checked,
  onCheckedChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean | "indeterminate") => void;
}) {
  return (
    <div className="flex items-start gap-3 rounded-md border border-border bg-background/60 p-3">
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <Label htmlFor={id} className="text-sm leading-6 text-muted-foreground">
        {label}
      </Label>
    </div>
  );
}
