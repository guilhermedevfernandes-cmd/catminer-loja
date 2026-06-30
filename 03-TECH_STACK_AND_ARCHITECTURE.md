# Stack e Arquitetura

## Stack definida

- Next.js com App Router.
- TypeScript.
- Tailwind CSS.
- shadcn/ui.
- Prisma ORM.
- PostgreSQL.
- Zod.
- React Hook Form.
- Auth.js ou sessão própria com cookies httpOnly.
- Resend ou SMTP para e-mails.
- Serviço de imagem: Cloudinary, UploadThing, S3 ou Vercel Blob.
- Deploy na Vercel.

## Arquitetura

O MVP deve ser um monólito fullstack em Next.js. Não criar backend separado no início.

Motivo:

- Menos infraestrutura.
- Menos custo.
- Mais velocidade.
- Next.js já suporta rotas de API.
- Facilita deploy na Vercel.

## Estrutura sugerida

```txt
src/
  app/
    (site)/
      page.tsx
      loja/page.tsx
      produto/[slug]/page.tsx
      carrinho/page.tsx
      checkout/page.tsx
      pedido/[orderId]/pagamento/page.tsx
      pedido/[orderId]/obrigado/page.tsx
      sobre/page.tsx
      contato/page.tsx
      politicas/privacidade/page.tsx
      politicas/troca-devolucao/page.tsx
      politicas/entrega/page.tsx
    admin/
      layout.tsx
      page.tsx
      login/page.tsx
      produtos/page.tsx
      produtos/novo/page.tsx
      produtos/[id]/page.tsx
      pedidos/page.tsx
      pedidos/[id]/page.tsx
    api/
      products/route.ts
      products/[slug]/route.ts
      checkout/route.ts
      orders/[id]/route.ts
      payments/uaipag/create-pix/route.ts
      payments/uaipag/status/route.ts
      payments/uaipag/webhook/route.ts
      admin/products/route.ts
      admin/products/[id]/route.ts
      admin/orders/route.ts
      admin/orders/[id]/route.ts
  components/
    site/
    product/
    cart/
    checkout/
    admin/
    ui/
  lib/
    db.ts
    auth.ts
    validators/
    payments/
      uaipag.ts
      payment-types.ts
    email/
    whatsapp.ts
    money.ts
    slug.ts
    seo.ts
  hooks/
  stores/
  styles/
prisma/
  schema.prisma
  seed.ts
```

## Princípios técnicos

1. Server-first sempre que possível.
2. Preço e estoque validados no backend.
3. Client Components apenas onde houver interação real.
4. Formulários com Zod e React Hook Form.
5. Banco transacional para criar pedido e baixar estoque.
6. Webhook idempotente.
7. Segredos nunca enviados ao frontend.
8. Logs úteis, mas sem vazar dados sensíveis.

## Serviços externos

### UaiPag

Responsável por:

- Criar cobrança PIX.
- Gerar QR Code.
- Gerar Pix Copia e Cola.
- Enviar webhook de pagamento.

### Banco PostgreSQL

Opções:

- Supabase.
- Neon.
- Railway.
- Render.

### E-mail

Opções:

- Resend.
- SMTP Hostinger.
- SMTP Gmail empresarial.

### Imagens

Opções:

- Cloudinary.
- UploadThing.
- S3.
- Vercel Blob.

## Ambientes

```txt
local
staging
production
```

Cada ambiente deve ter `.env` próprio.

## Branches sugeridas

```txt
main
staging
develop
feature/catalog
feature/checkout
feature/uaipag
feature/admin
```
