# Segurança, LGPD e Cuidados Comerciais

## Segurança técnica

Checklist mínimo:

- Secrets apenas no `.env`.
- API key da UaiPag nunca no frontend.
- Webhook com assinatura validada.
- Admin protegido.
- Senha com bcrypt.
- Cookies httpOnly e secure em produção.
- Rate limit no login.
- Rate limit no checkout.
- Zod em todos os payloads.
- Preço calculado no backend.
- Estoque validado no backend.
- Logs sem dados sensíveis completos.
- HTTPS obrigatório.
- Backups do banco.

## LGPD

A loja coleta:

- Nome.
- E-mail.
- WhatsApp.
- CPF/CNPJ.
- Endereço.
- Dados de pedido.
- Eventos de pagamento.

Requisitos práticos:

- Política de privacidade publicada.
- Informar finalidade do tratamento.
- Não coletar dado desnecessário.
- Proteger acesso admin.
- Não expor dados pessoais em URLs públicas.
- Permitir canal de contato para solicitações de titulares.

## Comércio eletrônico

Páginas recomendadas:

- Política de privacidade.
- Política de troca/devolução.
- Política de entrega.
- Termos de compra.
- Contato.
- Dados da empresa, se disponíveis.

## Equipamento usado/revisado

Na página de produto e checkout, usar aviso:

> Este produto pode ser usado ou revisado, podendo conter marcas estéticas de uso, sem prejuízo das condições funcionais informadas na descrição.

## Rentabilidade

Aviso obrigatório:

> Os valores de rentabilidade são estimativas e podem variar conforme preço do BTC, dificuldade da rede, pool utilizada, tarifa de energia, uptime do equipamento, taxas operacionais e condições de mercado. A Cat Miner não garante rentabilidade futura.

## Garantia

Se a garantia for 30 dias, deixar claro:

- O que cobre.
- O que não cobre.
- Prazo.
- Como acionar.
- Condições de perda de garantia.

## Linguagem a evitar

Evitar:

- Retorno garantido.
- Lucro certo.
- Ganhe X por mês.
- Investimento sem risco.
- ROI garantido.

Preferir:

- Estimativa.
- Simulação.
- Pode variar.
- Depende de condições de mercado e operação.
