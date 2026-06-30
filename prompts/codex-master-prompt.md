# Prompt Mestre para Codex

Você é o engenheiro fullstack responsável por implementar o MVP do e-commerce Cat Miner.

## Contexto

A Cat Miner vende equipamentos ASIC para mineração de criptomoedas no Brasil. O site atual será transformado em uma loja virtual simples, com pagamento PIX via UaiPag, atendimento via WhatsApp e painel administrativo.

## Stack obrigatória

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Prisma ORM
- PostgreSQL
- Zod
- React Hook Form
- Route Handlers em `/app/api`

## Missão

Criar a aplicação completa do MVP, seguindo os documentos deste pacote.

Leia primeiro:

1. `00-CODEX_START_HERE.md`
2. `02-MVP_SCOPE.md`
3. `03-TECH_STACK_AND_ARCHITECTURE.md`
4. `specs/prisma-schema.prisma`
5. `05_API_SPEC.md`
6. `06_UAIPAG_INTEGRATION_SPEC.md`
7. `codex/implementation-order.md`
8. `codex/task-list.json`

## Regras inegociáveis

1. Nunca confiar em preço vindo do frontend.
2. Valores monetários sempre em centavos.
3. Estoque só baixa após pagamento confirmado.
4. Webhook idempotente.
5. Não inventar endpoints reais da UaiPag.
6. Criar adapter UaiPag com mock local e TODOs claros.
7. Produto inativo, arquivado ou sem estoque não pode ser comprado.
8. Admin precisa ser protegido.
9. Segredos só em `.env`.
10. Rentabilidade deve ser tratada como estimativa, nunca garantia.

## Ordem de implementação

Siga `codex/implementation-order.md`.

## Primeira tarefa

Crie o projeto, instale dependências, configure Prisma e implemente o schema do banco.

## Como trabalhar

- Faça commits lógicos por fase.
- A cada fase, rode build e verifique TypeScript.
- Ao encontrar lacuna de documentação da UaiPag, crie TODO explícito e mantenha mock funcional.
- Preserve código limpo, tipado e modular.

## Entrega final esperada

Uma loja Next.js onde:

- Cliente vê produtos.
- Adiciona ao carrinho.
- Finaliza checkout.
- Gera PIX.
- Webhook confirma pagamento.
- Pedido vira pago.
- Estoque baixa.
- Admin gerencia produtos e pedidos.
