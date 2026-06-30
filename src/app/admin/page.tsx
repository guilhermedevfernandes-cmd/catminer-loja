import { PaymentStatus, ProductStatus } from "@prisma/client";
import Link from "next/link";

import { AdminShell } from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { formatMoney } from "@/lib/money";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const [
    ordersToday,
    paidToday,
    waitingPayment,
    paidOrders,
    productsInStock,
    productsOutOfStock,
    latestOrders,
    lowStockProducts,
  ] = await Promise.all([
    prisma.order.count({ where: { createdAt: { gte: startOfDay } } }),
    prisma.order.aggregate({
      where: { paymentStatus: PaymentStatus.PAID, paidAt: { gte: startOfDay } },
      _sum: { totalCents: true },
    }),
    prisma.order.count({ where: { paymentStatus: PaymentStatus.WAITING_PAYMENT } }),
    prisma.order.count({ where: { paymentStatus: PaymentStatus.PAID } }),
    prisma.product.count({ where: { status: ProductStatus.ACTIVE, stock: { gt: 0 } } }),
    prisma.product.count({ where: { OR: [{ stock: 0 }, { status: ProductStatus.OUT_OF_STOCK }] } }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      include: { customer: true },
    }),
    prisma.product.findMany({
      where: { status: ProductStatus.ACTIVE, stock: { lte: 2 } },
      orderBy: { stock: "asc" },
      take: 6,
    }),
  ]);

  const cards = [
    { label: "Pedidos hoje", value: ordersToday },
    { label: "Faturamento hoje", value: formatMoney(paidToday._sum.totalCents || 0) },
    { label: "Aguardando pagamento", value: waitingPayment },
    { label: "Pedidos pagos", value: paidOrders },
    { label: "Produtos em estoque", value: productsInStock },
    { label: "Produtos sem estoque", value: productsOutOfStock },
  ];

  return (
    <AdminShell>
      <div className="grid gap-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-normal">Dashboard</h1>
            <p className="mt-2 text-muted-foreground">Operação comercial da loja Cat Miner.</p>
          </div>
          <Button asChild>
            <Link href="/admin/produtos/novo">Novo produto</Link>
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <Card key={card.label} className="shadow-none">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">{card.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{card.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Últimos pedidos</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {latestOrders.map((order) => (
                <Link
                  key={order.id}
                  href={`/admin/pedidos/${order.id}`}
                  className="flex items-center justify-between rounded-md border border-border p-3 text-sm hover:bg-muted/50"
                >
                  <div>
                    <p className="font-semibold">{order.orderNumber}</p>
                    <p className="text-muted-foreground">{order.customer.name}</p>
                  </div>
                  <Badge variant="secondary">{order.paymentStatus}</Badge>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card className="shadow-none">
            <CardHeader>
              <CardTitle>Estoque baixo</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {lowStockProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/admin/produtos/${product.id}`}
                  className="flex items-center justify-between rounded-md border border-border p-3 text-sm hover:bg-muted/50"
                >
                  <span className="font-semibold">{product.name}</span>
                  <Badge variant={product.stock === 0 ? "destructive" : "secondary"}>{product.stock}</Badge>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
