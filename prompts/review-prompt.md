# Prompt de Revisão para Codex

Revise a implementação atual do e-commerce Cat Miner com foco em riscos de produção.

Verifique:

1. Preço é sempre recalculado no backend?
2. Valores monetários estão em centavos?
3. Estoque só baixa após pagamento confirmado?
4. Webhook é idempotente?
5. Webhook valida assinatura?
6. Produto inativo ou sem estoque pode ser comprado por erro?
7. Admin está protegido?
8. Segredos estão fora do frontend?
9. Build passa?
10. TypeScript passa?
11. Checkout mobile está funcional?
12. PIX não dispara purchase antes do pagamento?
13. Rentabilidade é apresentada como estimativa?
14. Dados pessoais não estão expostos em tela pública?
15. Erros de API são tratados?

Depois gere:

- Lista de bugs encontrados.
- Riscos críticos.
- Correções prioritárias.
- Checklist do que ainda falta para produção.
