# Especificação de APIs

## APIs públicas

### GET `/api/products`

Retorna produtos ativos.

Query params opcionais:

```txt
brand
minPrice
maxPrice
status
sort
featured
```

Resposta:

```json
{
  "products": [
    {
      "id": "string",
      "name": "string",
      "slug": "string",
      "priceCents": 749900,
      "stock": 2,
      "brand": "Bitmain",
      "model": "Antminer S19j Pro+",
      "hashrate": "120 TH/s",
      "consumption": "3.360 W",
      "condition": "USED",
      "warrantyDays": 30,
      "images": []
    }
  ]
}
```

### GET `/api/products/[slug]`

Retorna produto individual.

### POST `/api/checkout`

Cria pedido.

Payload:

```json
{
  "items": [
    {
      "productId": "string",
      "quantity": 1
    }
  ],
  "customer": {
    "name": "Nome do Cliente",
    "email": "cliente@email.com",
    "phone": "21999999999",
    "document": "00000000000"
  },
  "shipping": {
    "zipCode": "00000000",
    "address": "Rua Exemplo",
    "number": "123",
    "complement": "Apto 1",
    "district": "Centro",
    "city": "Rio de Janeiro",
    "state": "RJ"
  },
  "acceptances": {
    "policies": true,
    "usedEquipment": true,
    "profitabilityDisclaimer": true
  },
  "notes": "string"
}
```

Resposta:

```json
{
  "orderId": "string",
  "orderNumber": "CM-000001",
  "paymentUrl": "/pedido/string/pagamento"
}
```

Erros:

```txt
400 payload inválido
409 produto sem estoque
409 produto inativo
500 erro interno
```

### GET `/api/orders/[id]`

Retorna dados públicos do pedido para tela de pagamento/status.

Não retornar dados sensíveis além do necessário.

## APIs de pagamento

### POST `/api/payments/uaipag/create-pix`

Cria cobrança PIX para um pedido.

Payload:

```json
{
  "orderId": "string"
}
```

Resposta:

```json
{
  "paymentId": "string",
  "status": "WAITING_PAYMENT",
  "pixCopyPaste": "string",
  "qrCodeImageUrl": "string",
  "expiresAt": "2026-06-30T13:00:00.000Z"
}
```

### GET `/api/payments/uaipag/status?orderId=...`

Retorna status do pagamento.

Resposta:

```json
{
  "orderId": "string",
  "orderStatus": "AWAITING_PAYMENT",
  "paymentStatus": "WAITING_PAYMENT",
  "paidAt": null
}
```

### POST `/api/payments/uaipag/webhook`

Recebe eventos da UaiPag.

Requisitos:

- Ler raw body.
- Validar assinatura.
- Salvar payload em `PaymentEvent`.
- Processar idempotentemente.
- Retornar 200 rapidamente.

## APIs admin

Todas devem exigir autenticação.

### GET `/api/admin/products`

Lista produtos, inclusive rascunhos e arquivados.

### POST `/api/admin/products`

Cria produto.

### PATCH `/api/admin/products/[id]`

Atualiza produto.

### DELETE `/api/admin/products/[id]`

Preferencialmente arquiva produto, não apaga fisicamente se já tiver pedido relacionado.

### GET `/api/admin/orders`

Lista pedidos.

Filtros:

```txt
status
paymentStatus
from
to
search
```

### GET `/api/admin/orders/[id]`

Detalhe do pedido.

### PATCH `/api/admin/orders/[id]`

Atualiza status operacional, código de rastreio e observações.
