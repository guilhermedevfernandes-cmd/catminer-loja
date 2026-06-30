import { PolicyContent } from "@/components/site/policy-content";

export default function DeliveryPolicyPage() {
  return (
    <PolicyContent
      title="Política de Entrega"
      sections={[
        {
          title: "Regiões atendidas",
          body: [
            "A Cat Miner poderá realizar entregas para diferentes regiões do Brasil, conforme disponibilidade logística e confirmação do pedido.",
          ],
        },
        {
          title: "Prazo",
          body: [
            "O prazo pode variar conforme localidade, disponibilidade do produto, confirmação do pagamento e modalidade de envio.",
          ],
        },
        {
          title: "Confirmação de pagamento",
          body: [
            "O envio ou preparação do pedido ocorrerá após confirmação do pagamento.",
          ],
        },
        {
          title: "Produto de alto valor",
          body: [
            "Por se tratar de equipamento sensível e de alto valor, a equipe poderá confirmar dados de entrega antes do envio.",
          ],
        },
      ]}
    />
  );
}
