import { MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { OrderUpdateForm } from "@/components/admin/order-update-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/money";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

type AdminOrderDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminOrderDetailPage({ params }: AdminOrderDetailPageProps) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      customer: true,
      items: true,
      payment: {
        include: {
          events: { orderBy: { receivedAt: "desc" } },
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <AdminShell>
      <div className="grid gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-normal">{order.orderNumber}</h1>
            <p className="mt-2 text-muted-foreground">{order.customer.name}</p>
          </div>
          <Button asChild variant="outline">
            <a
              href={buildWhatsappUrl(`Olá, falando sobre o pedido ${order.orderNumber}.`)}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </a>
          </Button>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <div className="grid gap-6">
            <Card className="shadow-none">
              <CardHeader>
                <CardTitle>Cliente e entrega</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2 text-sm text-muted-foreground">
                <p className="text-foreground">{order.customer.name}</p>
                <p>{order.customer.email}</p>
                <p>{order.customer.phone}</p>
                <p>
                  {order.shippingAddress}, {order.shippingNumber} {order.shippingComplement}
                </p>
                <p>
                  {order.shippingDistrict} - {order.shippingCity}/{order.shippingState} - {order.shippingZipCode}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-none">
              <CardHeader>
                <CardTitle>Itens</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between rounded-md border border-border p-3 text-sm">
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span>{formatMoney(item.totalCents)}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-none">
              <CardHeader>
                <CardTitle>Eventos de pagamento</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {order.payment?.events.length ? (
                  order.payment.events.map((event) => (
                    <div key={event.id} className="rounded-md border border-border p-3 text-sm">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="font-semibold">{event.eventType || event.eventId || "Evento"}</span>
                        <Badge variant={event.isProcessed ? "secondary" : "outline"}>
                          {event.isProcessed ? "processado" : "registrado"}
                        </Badge>
                      </div>
                      <p className="mt-2 text-muted-foreground">
                        {event.receivedAt.toLocaleString("pt-BR")}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Nenhum evento recebido.</p>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid h-fit gap-6">
            <Card className="shadow-none">
              <CardHeader>
                <CardTitle>Resumo</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm">
                <div className="flex justify-between">
                  <span>Status</span>
                  <Badge variant="outline">{order.status}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Pagamento</span>
                  <Badge variant={order.paymentStatus === "PAID" ? "secondary" : "outline"}>{order.paymentStatus}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Total</span>
                  <span className="font-semibold">{formatMoney(order.totalCents)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pix</span>
                  <span>{order.payment?.status || "Não gerado"}</span>
                </div>
              </CardContent>
            </Card>

            <OrderUpdateForm
              order={{
                id: order.id,
                status: order.status,
                trackingCode: order.trackingCode,
                internalNotes: order.internalNotes,
              }}
            />
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
