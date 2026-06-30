import { AdminShell } from "@/components/admin/admin-shell";
import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <AdminShell>
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-normal">Novo produto</h1>
          <p className="mt-2 text-muted-foreground">Cadastre um ASIC para venda no catálogo.</p>
        </div>
        <ProductForm />
      </div>
    </AdminShell>
  );
}
