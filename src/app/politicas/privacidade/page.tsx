import { PolicyContent } from "@/components/site/policy-content";

export default function PrivacyPolicyPage() {
  return (
    <PolicyContent
      title="Política de Privacidade"
      sections={[
        {
          title: "Dados coletados",
          body: [
            "A Cat Miner poderá coletar nome, e-mail, WhatsApp, CPF ou CNPJ, endereço de entrega, dados do pedido e informações de pagamento retornadas pelo provedor.",
          ],
        },
        {
          title: "Finalidade",
          body: [
            "Os dados são usados para processar pedidos, gerar cobrança Pix, confirmar pagamento, organizar entrega, prestar suporte e cumprir obrigações legais.",
          ],
        },
        {
          title: "Compartilhamento",
          body: [
            "Os dados podem ser compartilhados com prestadores necessários à operação, como provedor de pagamento, e-mail, hospedagem e logística.",
          ],
        },
        {
          title: "Direitos do titular",
          body: [
            "O cliente pode solicitar informações, correção ou exclusão de dados pelo canal oficial de contato da Cat Miner.",
          ],
        },
      ]}
    />
  );
}
