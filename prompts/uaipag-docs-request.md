# Solicitação de Documentação Técnica para UaiPag

Olá, tudo bem?

Estamos implementando a integração da loja Cat Miner com pagamentos via PIX UaiPag e precisamos da documentação técnica completa para ambiente de homologação e produção.

Poderiam nos enviar, por favor:

1. Base URL de produção.
2. Base URL de sandbox/homologação.
3. Método de autenticação.
4. Como criar uma cobrança PIX.
5. Como consultar uma cobrança PIX.
6. Como cancelar ou expirar uma cobrança PIX.
7. Como configurar webhooks.
8. Como validar a assinatura/autenticidade dos webhooks.
9. Lista oficial de status de cobrança/pagamento.
10. Exemplo de payload para cobrança criada.
11. Exemplo de payload para pagamento confirmado.
12. Exemplo de payload para pagamento expirado.
13. Exemplo de payload para pagamento cancelado ou falhado.
14. Tempo padrão de expiração do PIX.
15. Regras de retentativa de webhook.
16. Headers enviados nos webhooks.
17. IPs de origem dos webhooks, caso exista allowlist.
18. Limites de requisição.
19. Taxas por transação.
20. Como funciona devolução/estorno PIX, se disponível.
21. Se existe ambiente de testes com credenciais próprias.
22. Se existe dashboard para acompanhar cobranças e webhooks.

Também precisamos saber se o QR Code e o Pix Copia e Cola são retornados diretamente pela API ou se devem ser gerados pela aplicação a partir de algum payload.

Obrigado.
