# COMEÇAR AQUI — Instruções para o Codex

Você é o engenheiro responsável por implementar o e-commerce MVP da Cat Miner.

A Cat Miner vende equipamentos ASIC para mineração de criptomoedas. O site atual é uma vitrine e será transformado em uma loja virtual simples, com foco em conversão, confiança, PIX e atendimento humano via WhatsApp.

## Objetivo imediato

Criar um projeto Next.js completo, pronto para evoluir para produção, com:

1. Catálogo de produtos.
2. Carrinho.
3. Checkout.
4. Criação de pedido.
5. Pagamento PIX via UaiPag.
6. Webhook de confirmação de pagamento.
7. Painel administrativo.
8. Controle de estoque.
9. Políticas mínimas e SEO.

## Comando sugerido para criar o projeto

```bash
npx create-next-app@latest catminer-ecommerce \
  --ts \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

Depois instale:

```bash
npm install @prisma/client prisma zod react-hook-form @hookform/resolvers bcryptjs jose date-fns lucide-react
npm install -D tsx
```

shadcn/ui:

```bash
npx shadcn@latest init
npx shadcn@latest add button card input label textarea select badge table dialog dropdown-menu separator sheet toast form
```

## Ordem de execução

Siga exatamente esta ordem:

1. Fundação do projeto.
2. Banco de dados e Prisma.
3. Seed inicial de produtos.
4. APIs públicas de produtos.
5. Home, loja e página de produto.
6. Carrinho.
7. Checkout e criação de pedido.
8. Adapter UaiPag com mock.
9. Tela de pagamento PIX.
10. Webhook UaiPag.
11. Admin login.
12. Admin produtos.
13. Admin pedidos.
14. E-mails e WhatsApp.
15. SEO, analytics e políticas.
16. QA final.

Use `codex/implementation-order.md` para a ordem detalhada e `codex/task-list.json` como lista operacional.

## Regras críticas

- Nunca confiar em preço enviado pelo frontend.
- Todo valor monetário deve ser salvo em centavos.
- Estoque só baixa depois de pagamento confirmado.
- Webhook deve ser idempotente.
- Não inventar endpoint real da UaiPag.
- Criar adapter com TODOs claros para documentação oficial.
- Produto arquivado, sem estoque ou inativo não pode ser comprado.
- Compra não deve prometer rentabilidade garantida.
- Rentabilidade deve ser apresentada como estimativa variável.
- Admin precisa de autenticação.
- Segredos devem ficar apenas no `.env`.
- PIX deve ser criado server-side.
- Evento de purchase no analytics só dispara quando pagamento estiver confirmado.

## Primeira entrega esperada

Criar o projeto Next.js e deixar rodando localmente com:

- Prisma configurado.
- PostgreSQL conectado.
- Produtos seedados.
- `/loja` exibindo produtos.
- `/produto/[slug]` funcionando.
- `/api/products` funcionando.

Depois avance fase a fase.
