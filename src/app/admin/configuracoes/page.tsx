import { AdminShell } from "@/components/admin/admin-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWhatsappNumber } from "@/lib/whatsapp";

export default function AdminSettingsPage() {
  return (
    <AdminShell>
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-normal">Configurações</h1>
          <p className="mt-2 text-muted-foreground">Parâmetros operacionais do MVP.</p>
        </div>

        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Ambiente</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm text-muted-foreground">
            <p>WhatsApp principal: {getWhatsappNumber()}</p>
            <p>UaiPag: {process.env.UAIPAG_MOCK === "true" ? "mock local" : "integração real pendente"}</p>
            <p>Analytics GTM: {process.env.NEXT_PUBLIC_GTM_ID || "não configurado"}</p>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
