# SEO, Analytics e Conversões

## SEO técnico

Implementar:

- Metadata por página.
- Sitemap.xml.
- Robots.txt.
- Canonical URL.
- Open Graph.
- Imagem social.
- Schema Product.
- Schema Organization.
- URLs amigáveis.
- Alt text nas imagens.

## Rotas SEO principais

```txt
/
/loja
/produto/bitmain-antminer-s19j-pro-plus-120th
/produto/bitmain-s19j-pro-95th
/produto/whatsminer-m50-120th
/sobre
/contato
/politicas/privacidade
/politicas/troca-devolucao
/politicas/entrega
```

## Titles sugeridos

Home:

> ASICs para Mineração de Criptomoedas no Brasil | Cat Miner

Loja:

> Comprar ASIC Miner no Brasil | Cat Miner

Produto:

> [Nome do Produto] | ASIC Revisado | Cat Miner

## Meta descriptions sugeridas

Home:

> Compre ASICs revisados para mineração de criptomoedas no Brasil. Equipamentos testados, suporte especializado, garantia e pagamento seguro via Pix.

Loja:

> Veja ASICs disponíveis para mineração de criptomoedas. Compare hashrate, consumo, preço e garantia. Pagamento via Pix e suporte especializado.

## Schema Product

Adicionar nos produtos:

- name.
- description.
- image.
- brand.
- sku/model.
- offers.price.
- offers.priceCurrency = BRL.
- offers.availability.
- itemCondition.

## Analytics

Instalar via GTM preferencialmente.

Eventos:

### view_item

Quando abrir página de produto.

### add_to_cart

Quando adicionar ao carrinho.

### begin_checkout

Quando iniciar checkout.

### purchase

Somente quando pagamento for confirmado como `PAID` por webhook ou status server-side confiável.

Nunca disparar purchase apenas ao gerar Pix.

## Conversão WhatsApp

Eventos para botões:

- whatsapp_click_home.
- whatsapp_click_product.
- whatsapp_click_checkout.
- whatsapp_click_payment_support.

## Performance

Metas:

- Home leve.
- Imagens otimizadas.
- Lazy loading onde fizer sentido.
- Evitar scripts excessivos.
- Mobile rápido.

## Preservação do site atual

Se a URL antiga mudar, criar redirects.

Priorizar preservar:

- `/loja`
- páginas de produto, se já existirem
- `/noticias`, se houver blog no site atual
