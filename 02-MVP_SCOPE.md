# Escopo do MVP

## O que entra no MVP

### Site público

- Home.
- Loja.
- Página de produto.
- Carrinho.
- Checkout.
- Tela de pagamento PIX.
- Página de pedido aprovado.
- Sobre.
- Contato.
- Políticas básicas.

### Produto

Cada produto deve ter:

- Nome.
- Slug.
- Preço.
- Estoque.
- Status.
- Marca.
- Modelo.
- Hashrate.
- Consumo.
- Tensão.
- Estado: novo, usado ou revisado.
- Garantia.
- Descrição curta.
- Descrição completa.
- Imagens.
- Estimativa de rentabilidade diária/mensal como texto.
- Aviso de rentabilidade variável.

### Carrinho

- Adicionar produto.
- Remover produto.
- Alterar quantidade.
- Persistir localmente.
- Validar estoque no backend no checkout.

### Checkout

Campos do cliente:

- Nome completo.
- E-mail.
- WhatsApp.
- CPF/CNPJ.

Campos de entrega:

- CEP.
- Rua.
- Número.
- Complemento.
- Bairro.
- Cidade.
- Estado.

Aceites obrigatórios:

- Li e aceito as políticas da loja.
- Estou ciente de que o equipamento pode ser usado/revisado.
- Estou ciente de que a rentabilidade apresentada é estimativa e não garantia.

### Pagamento UaiPag

- Criar cobrança PIX.
- Exibir QR Code.
- Exibir Pix Copia e Cola.
- Consultar status.
- Receber webhook.
- Marcar pedido como pago.
- Baixar estoque.

### Admin

- Login admin.
- Dashboard simples.
- CRUD de produtos.
- Lista de pedidos.
- Detalhe do pedido.
- Atualizar status de entrega.
- Ver status de pagamento.
- Ver eventos de webhook.

### SEO e Analytics

- Metadata por página.
- Sitemap.
- Robots.
- Open Graph.
- Schema Product.
- GA4/GTM preparado.
- Eventos: view_item, add_to_cart, begin_checkout, purchase.

## O que não entra no MVP

- Login do cliente.
- Área do cliente.
- Cupons.
- Programa de afiliados.
- Marketplace.
- Multivendedor.
- Avaliações de clientes.
- Wishlist.
- Comparador de ASICs.
- Simulador dinâmico completo de mineração.
- Integração de nota fiscal.
- Integração de transportadora automática.
- Recuperação automática de carrinho abandonado.
- Chatbot completo.

## Critério de sucesso

O MVP será considerado pronto quando um cliente conseguir:

1. Acessar a loja.
2. Escolher produto.
3. Adicionar ao carrinho.
4. Preencher checkout.
5. Gerar PIX.
6. Pagar.
7. Ter pedido confirmado automaticamente por webhook.
8. Receber confirmação.

E quando o admin conseguir:

1. Cadastrar produto.
2. Editar estoque.
3. Ver pedido.
4. Confirmar envio.
5. Ver histórico do pagamento.
