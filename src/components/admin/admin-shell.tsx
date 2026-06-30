import { BarChart3, Boxes, ClipboardList, Settings } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

import { LogoutButton } from "@/components/admin/logout-button";
import { Button } from "@/components/ui/button";
import { getAdminSession } from "@/lib/auth";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/produtos", label: "Produtos", icon: Boxes },
  { href: "/admin/pedidos", label: "Pedidos", icon: ClipboardList },
  { href: "/admin/configuracoes", label: "Configurações", icon: Settings },
];

export async function AdminShell({ children }: { children: ReactNode }) {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[250px_1fr] lg:px-8">
      <aside className="h-fit rounded-md border border-border bg-card p-4">
        <div>
          <p className="text-sm text-muted-foreground">Logado como</p>
          <p className="font-semibold">{session.name}</p>
        </div>
        <nav className="mt-6 grid gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <Button key={item.href} asChild variant="ghost" className="justify-start">
                <Link href={item.href}>
                  <Icon className="size-4" aria-hidden="true" />
                  {item.label}
                </Link>
              </Button>
            );
          })}
        </nav>
        <div className="mt-6">
          <LogoutButton />
        </div>
      </aside>
      <section>{children}</section>
    </div>
  );
}
