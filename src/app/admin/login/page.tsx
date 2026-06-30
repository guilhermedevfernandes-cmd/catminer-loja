import { Suspense } from "react";

import { AdminLoginForm } from "@/components/admin/login-form";
import { BrandLogo } from "@/components/site/brand-logo";

export default function AdminLoginPage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-md items-center px-[var(--gutter)] py-12">
      <div className="w-full rounded-[28px] border border-border bg-navy-800 p-7">
        <BrandLogo size={34} />
        <span className="eyebrow mt-6 block">Painel Cat Miner</span>
        <h1 className="mt-2 text-3xl font-bold tracking-[-0.02em] text-white" style={{ fontFamily: "var(--font-display)" }}>
          Login admin
        </h1>
        <p className="mt-2 text-sm text-[var(--t-4)]">Acesso restrito à operação da loja.</p>
        <div className="mt-6">
          <Suspense>
            <AdminLoginForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
