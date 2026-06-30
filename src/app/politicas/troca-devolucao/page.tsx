import { PolicyContent } from "@/components/site/policy-content";

export default function ReturnsPolicyPage() {
  return (
    <PolicyContent
      title="Política de Troca e Devolução"
      sections={[
        {
          title: "Condição dos produtos",
          body: [
            "A Cat Miner pode comercializar equipamentos novos, usados, revisados ou recondicionados, conforme indicado na página de cada produto.",
            "Produtos usados ou revisados podem apresentar marcas estéticas de uso, sem prejuízo das condições funcionais informadas.",
          ],
        },
        {
          title: "Garantia",
          body: [
            "A garantia será informada em cada produto. Quando aplicável, a garantia de 30 dias cobre problemas funcionais não decorrentes de mau uso ou instalação inadequada.",
          ],
        },
        {
          title: "Itens não cobertos",
          body: [
            "Não são cobertos danos por instalação elétrica inadequada, tensão incompatível, superaquecimento, alteração técnica não autorizada, mau uso ou variação de rentabilidade.",
          ],
        },
      ]}
    />
  );
}
