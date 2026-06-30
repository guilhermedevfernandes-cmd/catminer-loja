# Issues Iniciais para GitHub

## Issue 1 — Setup do projeto Next.js

Criar o projeto Next.js com TypeScript, Tailwind, App Router e shadcn/ui.

Critérios:

- Projeto roda localmente.
- Build passa.
- Estrutura de pastas criada.

## Issue 2 — Banco de dados e Prisma

Implementar schema Prisma com entidades do MVP.

Critérios:

- Migration criada.
- Prisma Client gerado.
- Seed executado.

## Issue 3 — Catálogo público

Criar loja e página individual de produto.

Critérios:

- Produtos ativos aparecem na loja.
- Produto abre pelo slug.
- Dados técnicos aparecem.

## Issue 4 — Carrinho

Criar carrinho persistente no navegador.

Critérios:

- Adicionar, remover e atualizar quantidade.
- Carrinho persiste após reload.

## Issue 5 — Checkout

Criar formulário de checkout e endpoint de pedido.

Critérios:

- Valida campos.
- Recalcula preço no backend.
- Cria pedido e orderItems.

## Issue 6 — Adapter UaiPag

Criar adapter com mock local e estrutura para integração real.

Critérios:

- Mock gera Pix fake.
- TODOs dos endpoints reais claros.

## Issue 7 — Webhook UaiPag

Criar endpoint de webhook com idempotência.

Critérios:

- Webhook pago confirma pedido.
- Webhook duplicado não baixa estoque de novo.

## Issue 8 — Painel admin

Criar login, dashboard, produtos e pedidos.

Critérios:

- Admin autenticado acessa.
- CRUD de produto funciona.
- Pedidos aparecem.

## Issue 9 — Políticas e SEO

Criar páginas institucionais, políticas, sitemap e metadata.

Critérios:

- Páginas acessíveis.
- Metadata configurada.

## Issue 10 — QA final

Testar fluxo completo e corrigir bugs.

Critérios:

- Build passa.
- Fluxo compra PIX mock funciona.
- Mobile validado.
