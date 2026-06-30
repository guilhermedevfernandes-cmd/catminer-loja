# Ordem de Implementação para Codex

## 1. Criar projeto

Criar app Next.js com TypeScript, Tailwind e App Router.

## 2. Instalar dependências

Instalar Prisma, Zod, React Hook Form, bcrypt, jose, date-fns, lucide-react e shadcn/ui.

## 3. Configurar banco

- Copiar schema de `specs/prisma-schema.prisma`.
- Criar migration.
- Gerar client.
- Criar `src/lib/db.ts`.

## 4. Criar seed

- Criar admin inicial.
- Criar 3 produtos iniciais.

## 5. Criar utilitários

- `money.ts`
- `slug.ts`
- `order-number.ts`
- `whatsapp.ts`
- `seo.ts`

## 6. Criar validators Zod

- checkout validator.
- product validator.
- admin order validator.
- payment validator.

## 7. Produtos públicos

- API products.
- Página loja.
- Página produto.
- Componentes principais.

## 8. Carrinho

- Provider/store.
- localStorage.
- Página carrinho.

## 9. Checkout

- Form.
- API checkout.
- Criação de Customer, Order e OrderItems.
- Redirecionamento.

## 10. Pagamento

- Adapter UaiPag.
- Mock local.
- Criar PIX.
- Tela PIX.
- Status polling.

## 11. Webhook

- Raw body.
- Validação de assinatura preparada.
- PaymentEvent.
- Idempotência.
- Transação de pagamento e estoque.

## 12. Admin auth

- AdminUser.
- Login.
- Middleware/proteção.

## 13. Admin produtos

- Listar.
- Criar.
- Editar.
- Arquivar.

## 14. Admin pedidos

- Listar.
- Detalhar.
- Atualizar status.
- Ver eventos de pagamento.

## 15. Conteúdo

- Sobre.
- Contato.
- Políticas.
- Termos.
- Disclaimers.

## 16. SEO e analytics

- Metadata.
- Sitemap.
- Robots.
- Schema.
- GTM/GA4.
- Eventos.

## 17. QA final

- Rodar build.
- Testar fluxo completo.
- Corrigir bugs.
