# Prompt Backend para Codex

Implemente o backend do e-commerce Cat Miner em Next.js, TypeScript, Prisma e PostgreSQL.

## Entidades obrigatórias

- Product
- ProductImage
- Customer
- Order
- OrderItem
- Payment
- PaymentEvent
- AdminUser

Use o schema em `specs/prisma-schema.prisma`.

## Endpoints obrigatórios

Públicos:

- `GET /api/products`
- `GET /api/products/[slug]`
- `POST /api/checkout`
- `GET /api/orders/[id]`

Pagamentos:

- `POST /api/payments/uaipag/create-pix`
- `GET /api/payments/uaipag/status`
- `POST /api/payments/uaipag/webhook`

Admin:

- `GET /api/admin/products`
- `POST /api/admin/products`
- `PATCH /api/admin/products/[id]`
- `DELETE /api/admin/products/[id]`
- `GET /api/admin/orders`
- `GET /api/admin/orders/[id]`
- `PATCH /api/admin/orders/[id]`

## Validação

Use Zod em todos os payloads.

## Pagamento

Crie adapter em:

```txt
src/lib/payments/uaipag.ts
```

Não invente endpoint real da UaiPag. Use mock em desenvolvimento e deixe TODOs.

## Regras de negócio

- O frontend envia somente productId e quantity.
- Backend recalcula preço.
- Backend valida estoque.
- Pedido nasce `AWAITING_PAYMENT`.
- Pagamento nasce `WAITING_PAYMENT`.
- Webhook confirmado muda pagamento para `PAID`.
- Pedido pago muda status para `PAID`.
- Estoque baixa somente no evento de pagamento confirmado.
- Webhook duplicado não pode processar novamente.

## Admin

- Criar login protegido.
- Criar seed de admin.
- Senha com bcrypt.
- Cookies httpOnly.
