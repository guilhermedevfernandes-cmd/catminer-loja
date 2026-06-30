# Mapa de Rotas da API

## Produtos públicos

| Método | Rota | Objetivo |
|---|---|---|
| GET | `/api/products` | Listar produtos ativos |
| GET | `/api/products/[slug]` | Buscar produto individual |

## Checkout e pedido

| Método | Rota | Objetivo |
|---|---|---|
| POST | `/api/checkout` | Criar pedido |
| GET | `/api/orders/[id]` | Buscar pedido para tela pública |

## Pagamentos UaiPag

| Método | Rota | Objetivo |
|---|---|---|
| POST | `/api/payments/uaipag/create-pix` | Criar cobrança PIX |
| GET | `/api/payments/uaipag/status` | Consultar status do pagamento |
| POST | `/api/payments/uaipag/webhook` | Receber webhook UaiPag |

## Admin produtos

| Método | Rota | Objetivo |
|---|---|---|
| GET | `/api/admin/products` | Listar produtos admin |
| POST | `/api/admin/products` | Criar produto |
| PATCH | `/api/admin/products/[id]` | Atualizar produto |
| DELETE | `/api/admin/products/[id]` | Arquivar produto |

## Admin pedidos

| Método | Rota | Objetivo |
|---|---|---|
| GET | `/api/admin/orders` | Listar pedidos |
| GET | `/api/admin/orders/[id]` | Detalhe do pedido |
| PATCH | `/api/admin/orders/[id]` | Atualizar status, rastreio e notas |

## Auth admin

| Método | Rota | Objetivo |
|---|---|---|
| POST | `/api/admin/auth/login` | Login admin, se usar auth própria |
| POST | `/api/admin/auth/logout` | Logout admin, se usar auth própria |
| GET | `/api/admin/auth/me` | Sessão atual |
