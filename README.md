# Cat Miner E-commerce — Pacote MVP para Codex

Este pacote foi feito para abrir em um ambiente com Codex e transformar o site da Cat Miner em um e-commerce simples com integração PIX via UaiPag.

## Como usar

1. Abra esta pasta no Codex.
2. Leia primeiro `00-CODEX_START_HERE.md`.
3. Em seguida, peça ao Codex para executar a implementação na ordem de `codex/implementation-order.md`.
4. Use `prompts/codex-master-prompt.md` como prompt principal.
5. Use `frontend/` e `prompts/claude-frontend-prompt.md` para repassar a parte visual ao Claude.

## Escopo do MVP

O MVP deve entregar:

- Home premium
- Loja/listagem de ASICs
- Página individual de produto
- Carrinho
- Checkout
- Geração de PIX via UaiPag
- Webhook de confirmação de pagamento
- Tela de pagamento com QR Code e Pix Copia e Cola
- Painel admin simples
- CRUD de produtos
- Visualização de pedidos
- Baixa automática de estoque após pagamento confirmado
- Políticas básicas
- SEO e analytics básicos

## Stack definida

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma ORM
- PostgreSQL
- Zod
- React Hook Form
- Auth.js ou autenticação própria simples para admin
- Resend ou SMTP para e-mails
- Cloudinary, UploadThing, S3 ou Vercel Blob para imagens
- Vercel para deploy

## Premissa importante sobre UaiPag

A integração deve ser feita por adapter genérico em `lib/payments/uaipag.ts`. O Codex não deve inventar endpoints reais. Enquanto a documentação oficial da UaiPag não estiver em mãos, ele deve criar:

- Interface tipada
- Mock local para desenvolvimento
- TODOs claros para payloads oficiais
- Webhook com validação preparada
- Mapeamento interno de status

## Arquivos mais importantes

- `00-CODEX_START_HERE.md`
- `01-PRODUCT_BRIEF.md`
- `02-MVP_SCOPE.md`
- `03-TECH_STACK_AND_ARCHITECTURE.md`
- `specs/prisma-schema.prisma`
- `specs/api-routes-map.md`
- `specs/env.example`
- `specs/status-map.md`
- `prompts/codex-master-prompt.md`
- `codex/implementation-order.md`
- `codex/task-list.json`
