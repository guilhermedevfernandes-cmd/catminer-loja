import { PolicyContent } from "@/components/site/policy-content";

export default function PurchaseTermsPage() {
  return (
    <PolicyContent
      title="Termos de Compra"
      sections={[
        {
          title: "Produtos",
          body: [
            "As características de cada produto, incluindo preço, condição, garantia, tensão, consumo e hashrate, são informadas na página do produto.",
          ],
        },
        {
          title: "Pagamento",
          body: [
            "O pagamento poderá ser realizado via Pix por meio do provedor integrado à loja. O pedido será considerado confirmado após confirmação do pagamento.",
          ],
        },
        {
          title: "Rentabilidade",
          body: [
            "Valores de rentabilidade, ROI ou retorno são estimativas e podem variar por fatores externos. A Cat Miner não garante rentabilidade futura.",
          ],
        },
        {
          title: "Atendimento",
          body: [
            "O cliente poderá entrar em contato pelos canais oficiais informados no site para dúvidas sobre compra, entrega e garantia.",
          ],
        },
      ]}
    />
  );
}
