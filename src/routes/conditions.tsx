import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose, Section } from "@/components/site/Layout";

export const Route = createFileRoute("/conditions")({
  head: () => ({
    meta: [
      { title: "Conditions de prise en charge — C'TOO 9" },
      { name: "description", content: "Diagnostic, devis, garantie, garde et récupération des appareils chez C'TOO 9." },
      { property: "og:title", content: "Conditions de prise en charge — C'TOO 9" },
      { property: "og:description", content: "Les règles claires de prise en charge de vos appareils." },
    ],
  }),
  component: () => (
    <>
      <PageHero kicker="Légal" title="Conditions de prise en charge" />
      <Section>
        <Prose>
          <h2>Diagnostic</h2>
          <p>Le diagnostic est facturé selon le forfait annoncé. Il est déduit du montant de la réparation si le devis est accepté.</p>
          <h2>Devis</h2>
          <p>Un devis est remis avant toute réparation (sauf en dessous du seuil indiqué au dépôt). Il est valable 30 jours.</p>
          <h2>Appareil non réparable</h2>
          <p>Seuls les frais de diagnostic sont dus. Un conseil de remplacement vous est donné.</p>
          <h2>Garantie</h2>
          <p>La réparation est garantie sur la panne traitée, pour la durée indiquée sur la facture.</p>
          <h2>Récupération des appareils</h2>
          <p>Les appareils réparés ou refusés doivent être récupérés dans le délai indiqué au dépôt. Au-delà, des frais de garde peuvent s'appliquer et l'appareil peut être considéré comme abandonné, conformément à la loi.</p>
        </Prose>
      </Section>
    </>
  ),
});
