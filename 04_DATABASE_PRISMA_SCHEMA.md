# Banco de Dados — Modelo Prisma

O schema completo está em `specs/prisma-schema.prisma`.

## Entidades principais

### Product

Representa um ASIC vendido na loja.

Campos críticos:

- `priceCents`: preço em centavos.
- `stock`: estoque disponível.
- `status`: rascunho, ativo, sem estoque ou arquivado.
- `condition`: novo, usado ou revisado.
- `hashrate`, `consumption`, `voltage`, `warrantyDays`: dados técnicos.
- `dailyRevenueText`, `monthlyRevenueText`, `roiText`: textos de estimativa.

### Customer

Dados do comprador.

### Order

Pedido criado no checkout.

Campos críticos:

- `orderNumber`: número amigável, exemplo `CM-000001`.
- `status`: status operacional do pedido.
- `paymentStatus`: status do pagamento.
- `totalCents`: total final calculado no backend.
- `paidAt`: data de pagamento.

### OrderItem

Snapshot do produto no momento da compra. Importante manter nome e preço mesmo que o produto mude depois.

### Payment

Representa a cobrança criada na UaiPag.

Campos críticos:

- `providerPaymentId`.
- `providerTxid`.
- `pixCopyPaste`.
- `qrCodeImageUrl`.
- `expiresAt`.
- `rawResponse`.

### PaymentEvent

Armazena todos os webhooks recebidos. Serve para auditoria e idempotência.

### AdminUser

Usuário do painel administrativo.

## Regras transacionais

### Criação de pedido

1. Validar payload.
2. Buscar produtos ativos.
3. Recalcular preços.
4. Validar estoque.
5. Criar customer.
6. Criar order.
7. Criar orderItems.
8. Retornar URL de pagamento.

### Pagamento confirmado

1. Receber webhook.
2. Validar assinatura.
3. Salvar evento.
4. Verificar se já foi processado.
5. Encontrar pagamento.
6. Atualizar payment para PAID.
7. Atualizar order para PAID.
8. Baixar estoque em transação.
9. Marcar evento como processado.
10. Enviar notificações.

## Regra de baixa de estoque

Não baixar estoque quando pedido for criado. Baixar apenas quando pagamento estiver confirmado.

## Regra de preço

Nunca aceitar preço vindo do frontend. O frontend envia apenas `productId` e `quantity`. O backend busca o preço atual no banco e calcula o total.
