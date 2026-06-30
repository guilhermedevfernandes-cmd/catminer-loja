# Fluxo de Checkout e Pedido

## Visão geral

Fluxo principal:

```txt
Produto -> Carrinho -> Checkout -> Pedido criado -> PIX gerado -> Pagamento confirmado -> Pedido pago -> Estoque baixado
```

## Carrinho

O carrinho pode ficar no client usando localStorage.

Dados do carrinho:

```ts
type CartItem = {
  productId: string
  slug: string
  name: string
  image?: string
  priceCents: number
  quantity: number
}
```

Importante:

O preço no carrinho é apenas visual. No checkout, o backend recalcula tudo.

## Checkout

### Etapa 1: dados do cliente

- Nome completo.
- E-mail.
- WhatsApp.
- CPF/CNPJ.

### Etapa 2: entrega

- CEP.
- Rua.
- Número.
- Complemento.
- Bairro.
- Cidade.
- Estado.

### Etapa 3: revisão

- Produtos.
- Quantidades.
- Subtotal.
- Frete, se houver.
- Total.
- Avisos.

### Etapa 4: pagamento

- Gerar pedido.
- Redirecionar para tela de pagamento.

## Criação de pedido

Endpoint:

```txt
POST /api/checkout
```

Backend deve:

1. Validar schema Zod.
2. Verificar acceptances.
3. Buscar produtos no banco.
4. Verificar status ativo.
5. Verificar estoque.
6. Calcular subtotal.
7. Calcular frete.
8. Calcular total.
9. Criar customer.
10. Criar order.
11. Criar items com snapshot.
12. Retornar `orderId` e `paymentUrl`.

## Geração de pagamento

Na página `/pedido/[orderId]/pagamento`, chamar:

```txt
POST /api/payments/uaipag/create-pix
```

O backend cria ou reutiliza uma cobrança PIX válida.

## Tela de pagamento

Exibir:

- Número do pedido.
- Valor total.
- QR Code.
- Pix Copia e Cola.
- Botão copiar.
- Expiração.
- Status.
- Botão verificar pagamento.
- WhatsApp para suporte.

Polling:

- Consultar status a cada 5 ou 10 segundos.
- Parar quando `paymentStatus` for `PAID`, `EXPIRED`, `CANCELLED` ou `FAILED`.

## Webhook confirmado

Ao receber pagamento confirmado:

1. Atualizar payment.
2. Atualizar order.
3. Baixar estoque.
4. Enviar e-mail.
5. Alertar admin.
6. Frontend detecta status pago.
7. Redireciona para `/pedido/[orderId]/obrigado`.

## Pedido expirado

Se PIX expirar:

- Payment vira `EXPIRED`.
- Order pode continuar `AWAITING_PAYMENT` ou virar `CANCELLED` após rotina interna.
- Tela mostra botão para gerar nova cobrança ou falar com WhatsApp.

## Estoque

Estoque não deve ser reservado no MVP. Apenas validar no checkout e baixar após pagamento.

Risco: dois clientes podem pagar o último item ao mesmo tempo.

Mitigação MVP:

- Antes de criar PIX, verificar estoque.
- No webhook, fazer baixa dentro de transação.
- Se estoque insuficiente no momento do pagamento, marcar pedido para revisão manual e não deixar estoque negativo.

Versão futura:

- Reserva de estoque por tempo de PIX.
