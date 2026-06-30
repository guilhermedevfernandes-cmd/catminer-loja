# Mapa de Status

## ProductStatus

```txt
DRAFT         Produto em rascunho
ACTIVE        Produto disponível
OUT_OF_STOCK  Produto sem estoque
ARCHIVED      Produto arquivado
```

## ProductCondition

```txt
NEW           Novo
USED          Usado
REFURBISHED   Revisado/recondicionado
```

## OrderStatus

```txt
PENDING            Pedido iniciado
AWAITING_PAYMENT   Pedido aguardando pagamento
PAID               Pedido pago
PROCESSING         Pedido em separação/preparação
SHIPPED            Pedido enviado
DELIVERED          Pedido entregue
CANCELLED          Pedido cancelado
REFUNDED           Pedido reembolsado
MANUAL_REVIEW      Pedido exige revisão manual
```

## PaymentStatus

```txt
WAITING_PAYMENT  Aguardando pagamento
PENDING          Pagamento pendente/processando
PAID             Pago
EXPIRED          Expirado
CANCELLED        Cancelado
FAILED           Falhou
REFUNDED         Devolvido/reembolsado
```

## Mapeamento UaiPag provisório

Ajustar após documentação oficial.

```txt
paid, approved, confirmed, completed -> PAID
pending, waiting, created -> PENDING ou WAITING_PAYMENT
expired -> EXPIRED
cancelled, canceled -> CANCELLED
failed, error, refused -> FAILED
refunded -> REFUNDED
```

## Regra de transição

- `OrderStatus.PAID` só pode ocorrer se `PaymentStatus.PAID`.
- `paidAt` deve ser preenchido ao marcar pagamento como pago.
- Estoque só baixa nessa transição.
