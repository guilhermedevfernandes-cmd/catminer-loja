"use client";

import { Loader2, Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/slug";

type AdminProduct = {
  id: string;
  name: string;
  slug: string;
  shortDescription?: string | null;
  description?: string | null;
  priceCents: number;
  compareAtPriceCents?: number | null;
  stock: number;
  status: string;
  condition: string;
  voltage?: string | null;
  warrantyDays?: number | null;
  brand?: string | null;
  model?: string | null;
  algorithm?: string | null;
  hashrate?: string | null;
  consumption?: string | null;
  efficiency?: string | null;
  dailyRevenueText?: string | null;
  monthlyRevenueText?: string | null;
  roiText?: string | null;
  isFeatured: boolean;
  images?: Array<{ url: string; alt?: string | null }>;
};

type ProductFormProps = {
  product?: AdminProduct;
};

export function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured ?? false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const imageUrl = String(formData.get("imageUrl") || "").trim();

    const payload = {
      name: String(formData.get("name") || ""),
      slug: String(formData.get("slug") || ""),
      shortDescription: String(formData.get("shortDescription") || ""),
      description: String(formData.get("description") || ""),
      priceCents: Number(formData.get("priceCents") || 0),
      compareAtPriceCents: Number(formData.get("compareAtPriceCents") || 0) || null,
      stock: Number(formData.get("stock") || 0),
      status: String(formData.get("status") || "DRAFT"),
      condition: String(formData.get("condition") || "USED"),
      voltage: String(formData.get("voltage") || ""),
      warrantyDays: Number(formData.get("warrantyDays") || 0) || null,
      brand: String(formData.get("brand") || ""),
      model: String(formData.get("model") || ""),
      algorithm: String(formData.get("algorithm") || ""),
      hashrate: String(formData.get("hashrate") || ""),
      consumption: String(formData.get("consumption") || ""),
      efficiency: String(formData.get("efficiency") || ""),
      dailyRevenueText: String(formData.get("dailyRevenueText") || ""),
      monthlyRevenueText: String(formData.get("monthlyRevenueText") || ""),
      roiText: String(formData.get("roiText") || ""),
      isFeatured,
      images: imageUrl ? [{ url: imageUrl, alt: String(formData.get("name") || "") }] : [],
    };

    const response = await fetch(product ? `/api/admin/products/${product.id}` : "/api/admin/products", {
      method: product ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();

    setIsSubmitting(false);

    if (!response.ok) {
      toast.error(data.error || "Não foi possível salvar o produto.");
      return;
    }

    toast.success("Produto salvo.");
    router.push("/admin/produtos");
    router.refresh();
  };

  const archiveProduct = async () => {
    if (!product) {
      return;
    }

    const response = await fetch(`/api/admin/products/${product.id}`, { method: "DELETE" });

    if (!response.ok) {
      toast.error("Não foi possível arquivar.");
      return;
    }

    toast.success("Produto arquivado.");
    router.push("/admin/produtos");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 rounded-md border border-border bg-card p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nome">
          <Input
            name="name"
            defaultValue={product?.name}
            required
            onBlur={(event) => {
              const form = event.currentTarget.form;
              const slugInput = form?.elements.namedItem("slug") as HTMLInputElement | null;

              if (slugInput && !slugInput.value) {
                slugInput.value = slugify(event.currentTarget.value);
              }
            }}
          />
        </Field>
        <Field label="Slug">
          <Input name="slug" defaultValue={product?.slug} required />
        </Field>
        <Field label="Preço em centavos">
          <Input name="priceCents" type="number" min={1} defaultValue={product?.priceCents ?? 0} required />
        </Field>
        <Field label="Preço comparativo em centavos">
          <Input name="compareAtPriceCents" type="number" min={0} defaultValue={product?.compareAtPriceCents ?? ""} />
        </Field>
        <Field label="Estoque">
          <Input name="stock" type="number" min={0} defaultValue={product?.stock ?? 0} required />
        </Field>
        <Field label="Garantia em dias">
          <Input name="warrantyDays" type="number" min={0} defaultValue={product?.warrantyDays ?? 30} />
        </Field>
        <Field label="Status">
          <select name="status" defaultValue={product?.status || "DRAFT"} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
            {["DRAFT", "ACTIVE", "OUT_OF_STOCK", "ARCHIVED"].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Condição">
          <select name="condition" defaultValue={product?.condition || "USED"} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
            {["NEW", "USED", "REFURBISHED"].map((condition) => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Marca">
          <Input name="brand" defaultValue={product?.brand ?? ""} />
        </Field>
        <Field label="Modelo">
          <Input name="model" defaultValue={product?.model ?? ""} />
        </Field>
        <Field label="Algoritmo">
          <Input name="algorithm" defaultValue={product?.algorithm ?? "SHA-256"} />
        </Field>
        <Field label="Hashrate">
          <Input name="hashrate" defaultValue={product?.hashrate ?? ""} />
        </Field>
        <Field label="Consumo">
          <Input name="consumption" defaultValue={product?.consumption ?? ""} />
        </Field>
        <Field label="Eficiência">
          <Input name="efficiency" defaultValue={product?.efficiency ?? ""} />
        </Field>
        <Field label="Tensão">
          <Input name="voltage" defaultValue={product?.voltage ?? "220v"} />
        </Field>
        <Field label="Imagem principal URL">
          <Input name="imageUrl" type="url" defaultValue={product?.images?.[0]?.url ?? ""} />
        </Field>
      </div>

      <Field label="Descrição curta">
        <Textarea name="shortDescription" rows={3} defaultValue={product?.shortDescription ?? ""} />
      </Field>
      <Field label="Descrição completa">
        <Textarea name="description" rows={6} defaultValue={product?.description ?? ""} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Rentabilidade diária">
          <Input name="dailyRevenueText" defaultValue={product?.dailyRevenueText ?? ""} />
        </Field>
        <Field label="Rentabilidade mensal">
          <Input name="monthlyRevenueText" defaultValue={product?.monthlyRevenueText ?? ""} />
        </Field>
        <Field label="ROI">
          <Input name="roiText" defaultValue={product?.roiText ?? ""} />
        </Field>
      </div>

      <div className="flex items-center gap-3 rounded-md border border-border bg-background/60 p-3">
        <Checkbox id="featured" checked={isFeatured} onCheckedChange={(checked) => setIsFeatured(checked === true)} />
        <Label htmlFor="featured">Produto em destaque</Label>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Save className="size-4" aria-hidden="true" />}
          Salvar produto
        </Button>
        {product ? (
          <Button type="button" variant="destructive" onClick={archiveProduct}>
            <Trash2 className="size-4" aria-hidden="true" />
            Arquivar
          </Button>
        ) : null}
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium">{label}</span>
      {children}
    </label>
  );
}
