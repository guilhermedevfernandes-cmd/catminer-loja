# Especificação do Painel Admin

## Objetivo

Permitir que a equipe da Cat Miner opere a loja sem mexer em código.

## Rotas

```txt
/admin/login
/admin
/admin/produtos
/admin/produtos/novo
/admin/produtos/[id]
/admin/pedidos
/admin/pedidos/[id]
/admin/configuracoes
```

## Autenticação

MVP pode usar:

- Auth.js Credentials; ou
- sessão própria com cookie httpOnly, senha com bcrypt e middleware de proteção.

Requisitos:

- Senha nunca em texto puro.
- Rotas `/admin` protegidas.
- Rate limit no login.
- Logout.
- Roles: ADMIN e OPERATOR.

## Dashboard

Cards:

- Pedidos hoje.
- Faturamento hoje.
- Pedidos aguardando pagamento.
- Pedidos pagos.
- Produtos em estoque.
- Produtos sem estoque.

Listas:

- Últimos pedidos.
- Produtos com estoque baixo.

## Produtos

### Lista de produtos

Colunas:

- Imagem.
- Nome.
- Marca/modelo.
- Preço.
- Estoque.
- Status.
- Destaque.
- Ações.

### Formulário de produto

Campos:

- Nome.
- Slug.
- Preço.
- Preço comparativo, se houver.
- Estoque.
- Status.
- Condição.
- Marca.
- Modelo.
- Algoritmo.
- Hashrate.
- Consumo.
- Eficiência.
- Tensão.
- Garantia em dias.
- Descrição curta.
- Descrição completa.
- Rentabilidade diária como texto.
- Rentabilidade mensal como texto.
- ROI como texto.
- Produto em destaque.
- Imagens.

## Pedidos

### Lista de pedidos

Colunas:

- Número.
- Cliente.
- WhatsApp.
- Total.
- Status do pedido.
- Status do pagamento.
- Data.
- Ações.

Filtros:

- Busca por cliente, e-mail, WhatsApp ou número do pedido.
- Status do pedido.
- Status de pagamento.
- Período.

### Detalhe do pedido

Mostrar:

- Número do pedido.
- Dados do cliente.
- Endereço de entrega.
- Itens.
- Valores.
- Status do pagamento.
- Dados do PIX.
- Eventos de webhook.
- Observações internas.
- Código de rastreio.
- Botão para WhatsApp.

Ações:

- Marcar como em processamento.
- Marcar como enviado.
- Marcar como entregue.
- Cancelar pedido, se permitido.
- Inserir rastreio.
- Adicionar observação interna.

## Configurações MVP

Configurações simples:

- WhatsApp principal.
- E-mail de notificação.
- Texto padrão do aviso de rentabilidade.
- Frete fixo por estado, se implementado no MVP.

## Auditoria

MVP mínimo:

- Ver data de criação e atualização.
- Ver eventos de pagamento.
- Não precisa criar log completo de todas as ações no MVP.
