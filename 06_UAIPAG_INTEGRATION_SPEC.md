# Especificação da Integração UaiPag

## Princípio

A integração UaiPag deve ser isolada em um adapter:

```txt
src/lib/payments/uaipag.ts
```

O restante do sistema não deve conhecer detalhes dos endpoints da UaiPag. O sistema chama funções internas como `createUaiPagPixCharge`, `getUaiPagPaymentStatus` e `parseUaiPagWebhook`.

## Importante

Não inventar endpoints reais da UaiPag. Enquanto a documentação oficial não estiver disponível, implementar mock local e TODOs explícitos.

## Variáveis de ambiente

Ver `specs/env.example`.

Variáveis principais:

```txt
UAIPAG_BASE_URL=
UAIPAG_API_KEY=
UAIPAG_CLIENT_ID=
UAIPAG_CLIENT_SECRET=
UAIPAG_WEBHOOK_SECRET=
UAIPAG_PIX_KEY=
UAIPAG_ENV=sandbox
```

## Interface de criação de cobrança PIX

```ts
export type CreatePixChargeInput = {
  orderId: string
  orderNumber: string
  amountCents: number
  customer: {
    name: string
    email: string
    phone: string
    document?: string
  }
  expiresInMinutes?: number
}

export type CreatePixChargeOutput = {
  providerPaymentId: string
  providerTxid?: string
  status: "WAITING_PAYMENT" | "PENDING" | "PAID" | "FAILED"
  amountCents: number
  pixCopyPaste?: string
  qrCodeImageUrl?: string
  expiresAt?: Date
  rawResponse: unknown
}
```

## Interface de webhook normalizado

```ts
export type UaiPagWebhookResult = {
  eventId?: string
  eventType?: string
  providerPaymentId?: string
  providerTxid?: string
  status: "WAITING_PAYMENT" | "PENDING" | "PAID" | "EXPIRED" | "CANCELLED" | "FAILED" | "REFUNDED"
  amountCents?: number
  paidAt?: Date
  rawPayload: unknown
}
```

## Funções obrigatórias

```ts
export async function createUaiPagPixCharge(input: CreatePixChargeInput): Promise<CreatePixChargeOutput>

export async function getUaiPagPaymentStatus(providerPaymentId: string): Promise<UaiPagWebhookResult>

export async function verifyUaiPagWebhookSignature(request: Request, rawBody: string): Promise<boolean>

export async function parseUaiPagWebhook(payload: unknown): Promise<UaiPagWebhookResult>
```

## Fluxo de geração PIX

1. Cliente cria pedido no checkout.
2. Sistema redireciona para `/pedido/[orderId]/pagamento`.
3. Tela chama endpoint `POST /api/payments/uaipag/create-pix`.
4. Backend busca pedido.
5. Backend verifica se ainda não está pago.
6. Backend chama `createUaiPagPixCharge`.
7. Backend salva `Payment`.
8. Frontend exibe QR Code e Pix Copia e Cola.

## Fluxo de webhook

1. UaiPag envia webhook.
2. Endpoint lê raw body.
3. Valida assinatura.
4. Salva payload em `PaymentEvent`.
5. Normaliza status.
6. Localiza Payment pelo `providerPaymentId` ou `txid`.
7. Se status for pago e pedido ainda não estiver pago:
   - Payment vira `PAID`.
   - Order vira `PAID`.
   - `paidAt` é preenchido.
   - Estoque baixa.
   - E-mail/alerta interno são enviados.
8. Retorna 200.

## Idempotência

O webhook pode chegar duplicado. O sistema deve evitar processamento duplicado.

Regras:

- Se `eventId` vier no webhook, usar como chave de idempotência.
- Se não vier, usar hash do payload ou combinação `providerPaymentId + eventType + status`.
- Se pedido já estiver `PAID`, não baixar estoque novamente.
- Salvar todos os eventos, inclusive duplicados, mas marcar como não processados se forem repetidos.

## Mock local

Enquanto a integração real não existe, criar comportamento mock:

- `createUaiPagPixCharge` retorna QR Code placeholder e Pix Copia e Cola fake.
- Endpoint de webhook aceita payload local com `status: "PAID"` somente em ambiente de desenvolvimento.
- Nunca habilitar mock em produção.

Payload local para teste:

```json
{
  "providerPaymentId": "mock_pay_123",
  "providerTxid": "mock_txid_123",
  "status": "PAID",
  "paidAt": "2026-06-30T12:00:00.000Z",
  "amountCents": 749900
}
```

## Dados a solicitar para a UaiPag

Enviar o conteúdo de `prompts/uaipag-docs-request.md` para obter:

- Base URL produção.
- Base URL sandbox.
- Autenticação.
- Endpoint criar cobrança.
- Endpoint consultar cobrança.
- Endpoint cancelar/expirar cobrança.
- Payloads de exemplo.
- Validação de assinatura.
- Lista oficial de status.
- Regras de retentativa.
- Limites de requisição.
- Taxas.
- Devolução Pix.
