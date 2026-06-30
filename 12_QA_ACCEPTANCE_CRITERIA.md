# QA e Critérios de Aceite

## Critérios funcionais

### Catálogo

- Home carrega corretamente.
- Loja lista produtos ativos.
- Produto sem estoque mostra aviso.
- Produto arquivado não aparece na loja.
- Página de produto abre pelo slug.
- Imagens carregam corretamente.

### Carrinho

- Adiciona produto.
- Remove produto.
- Altera quantidade.
- Não permite quantidade inválida.
- Total visual é atualizado.
- Carrinho persiste ao recarregar página.

### Checkout

- Campos obrigatórios são validados.
- E-mail inválido é recusado.
- Produto sem estoque é recusado.
- Produto inativo é recusado.
- Total é recalculado no backend.
- Pedido é criado com número único.
- Usuário é redirecionado para pagamento.

### Pagamento

- PIX é criado para pedido válido.
- QR Code aparece.
- Pix Copia e Cola aparece.
- Botão copiar funciona.
- Status é consultado.
- Webhook pago atualiza pedido.
- Pedido pago redireciona para obrigado.
- Webhook duplicado não baixa estoque duas vezes.

### Admin

- Login funciona.
- Rotas admin exigem autenticação.
- Admin cria produto.
- Admin edita produto.
- Admin arquiva produto.
- Admin lista pedidos.
- Admin abre detalhe do pedido.
- Admin altera status operacional.

## Testes de risco

1. Tentar alterar preço pelo frontend.
2. Tentar comprar produto sem estoque.
3. Enviar webhook duplicado.
4. Enviar webhook com assinatura inválida.
5. Gerar PIX para pedido já pago.
6. Acessar admin sem login.
7. Checkout sem aceitar políticas.
8. Produto arquivado no carrinho.
9. Estoque 1 com dois checkouts simultâneos.

## Critérios de pronto para produção

- Build passa.
- TypeScript sem erros.
- Lint sem erros críticos.
- Banco migrado.
- Seed funcionando.
- Variáveis de ambiente configuradas.
- Webhook testado em staging.
- Checkout testado em mobile.
- Políticas publicadas.
- Botão WhatsApp funcionando.
- Analytics básico instalado.
- Admin protegido.
- Backup do banco definido.

## Definition of Done do MVP

O MVP está pronto quando:

- Cliente compra com PIX de ponta a ponta.
- Pedido pago é confirmado automaticamente.
- Admin consegue operar produtos e pedidos.
- Loja está visualmente aceitável em desktop e mobile.
- Não há promessa de rentabilidade garantida.
- Dados sensíveis não estão expostos.
