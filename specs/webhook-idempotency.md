# Idempotência do Webhook

## Problema

Gateways de pagamento podem enviar o mesmo webhook mais de uma vez. Se o sistema processar duplicado, pode:

- Baixar estoque duas vezes.
- Enviar e-mail duplicado.
- Marcar eventos incorretamente.
- Gerar inconsistência financeira.

## Solução MVP

1. Salvar todos os webhooks em `PaymentEvent`.
2. Identificar duplicidade por `eventId` quando existir.
3. Se não existir `eventId`, criar fingerprint com:
   - providerPaymentId
   - providerTxid
   - eventType
   - status
   - amountCents
4. Antes de baixar estoque, verificar se order já está `PAID`.
5. Rodar atualização crítica em transação.

## Pseudocódigo

```ts
await db.$transaction(async (tx) => {
  const payment = await tx.payment.findFirst({
    where: {
      OR: [
        { providerPaymentId },
        { providerTxid },
      ],
    },
    include: { order: { include: { items: true } } },
  })

  if (!payment) {
    await tx.paymentEvent.create({ data: { payload, provider: 'UAIPAG', isProcessed: false } })
    return
  }

  await tx.paymentEvent.create({ data: { paymentId: payment.id, payload, provider: 'UAIPAG' } })

  if (payment.status === 'PAID' || payment.order.paymentStatus === 'PAID') {
    return
  }

  if (normalized.status !== 'PAID') {
    await tx.payment.update({ where: { id: payment.id }, data: { status: normalized.status } })
    await tx.order.update({ where: { id: payment.orderId }, data: { paymentStatus: normalized.status } })
    return
  }

  for (const item of payment.order.items) {
    const product = await tx.product.findUnique({ where: { id: item.productId } })

    if (!product || product.stock < item.quantity) {
      await tx.order.update({
        where: { id: payment.orderId },
        data: { status: 'MANUAL_REVIEW', paymentStatus: 'PAID', paidAt: normalized.paidAt ?? new Date() },
      })
      await tx.payment.update({ where: { id: payment.id }, data: { status: 'PAID', paidAt: normalized.paidAt ?? new Date() } })
      return
    }
  }

  for (const item of payment.order.items) {
    await tx.product.update({
      where: { id: item.productId },
      data: { stock: { decrement: item.quantity } },
    })
  }

  await tx.payment.update({ where: { id: payment.id }, data: { status: 'PAID', paidAt: normalized.paidAt ?? new Date() } })
  await tx.order.update({ where: { id: payment.orderId }, data: { status: 'PAID', paymentStatus: 'PAID', paidAt: normalized.paidAt ?? new Date() } })
})
```

## Testes obrigatórios

- Webhook pago uma vez.
- Webhook pago duplicado.
- Webhook com payment inexistente.
- Webhook com assinatura inválida.
- Webhook pago com estoque insuficiente.
