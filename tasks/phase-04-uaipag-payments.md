# Fase 4 — Pagamentos UaiPag

## Objetivo

Preparar e implementar o fluxo de pagamento PIX via UaiPag.

## Tarefas

- [ ] Criar `src/lib/payments/payment-types.ts`.
- [ ] Criar `src/lib/payments/uaipag.ts`.
- [ ] Implementar mock local de criação PIX.
- [ ] Criar endpoint `POST /api/payments/uaipag/create-pix`.
- [ ] Criar endpoint `GET /api/payments/uaipag/status`.
- [ ] Criar endpoint `POST /api/payments/uaipag/webhook`.
- [ ] Ler raw body no webhook.
- [ ] Preparar validação de assinatura.
- [ ] Criar Payment.
- [ ] Criar PaymentEvent.
- [ ] Implementar idempotência.
- [ ] Atualizar Order ao confirmar pagamento.
- [ ] Baixar estoque em transação.
- [ ] Criar tela `/pedido/[orderId]/pagamento`.
- [ ] Criar tela `/pedido/[orderId]/obrigado`.
- [ ] Criar polling de status.

## Entregáveis

- PIX mock funcionando localmente.
- Webhook mock confirmando pedido.
- Estrutura pronta para plugar UaiPag real.

## Observação crítica

Não inventar endpoints UaiPag. Deixar TODOs claros para implementação com documentação oficial.
