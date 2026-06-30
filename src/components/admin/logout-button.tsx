"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    toast.success("Sessão encerrada.");
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <Button type="button" variant="outline" size="sm" onClick={logout}>
      <LogOut className="size-4" aria-hidden="true" />
      Sair
    </Button>
  );
}
