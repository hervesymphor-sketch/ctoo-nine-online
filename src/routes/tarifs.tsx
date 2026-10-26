import { createFileRoute } from "@tanstack/react-router";
import { Check, X } from "lucide-react";
import { ApplianceSelector } from "@/components/site/ApplianceSelector";
import { CtaBand, PageHero, Prose, Section } from "@/components/site/Layout";

export const Route = createFileRoute("/tarifs")({
  head: () => ({
    meta: [
      { title: "Tarifs et bonus réparation — C'TOO 9 Martinique" },
      { name: "description", content: "Forfaits de réparation électroménager C'TOO 9 : ce qui est inclus, diagnostic déductible, garantie, bonus QualiRépar et moyens de paiement." },
      { property: "og:title", content: "Tarifs et bonus réparation — C'TOO 9" },
      { property: "og:description", content: "Des forfaits clairs, un devis avant réparation et le bonus QualiRépar." },
    ],
  }),
  component: Page,
});

const OFFERS = [
  { t: "Intervention à domicile", sub: "Gros électroménager & encastrable", inc: ["Déplacement du technicien", "Diagnostic de la panne", "Devis détaillé"], exc: ["Pièces détachées", "Main-d'œuvre de réparation (sur devis)"] },
  { t: "Dépôt en atelier", sub: "Petit électroménager", inc: ["Prise en charge et diagnostic", "Devis détaillé", "Frais déduits si réparation"], exc: ["Pièces détachées", "Transport de l'appareil"] },
  { t: "Professionnels", sub: "Restauration, hôtellerie, locations", inc: ["Devis sur mesure", "Rapport d'intervention", "Facturation pro"], exc: ["Contrat d'entretien (en option)"] },
];

function Page() {
  return (
    <>
      <PageHero kicker="Tarifs" title="Tarifs et bonus réparation">
        Pas de mauvaise surprise : le forfait de départ est annoncé avant tout déplacement, et un devis vous est remis avant chaque réparation.
      </PageHero>
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {OFFERS.map((o, i) => (
            <div key={o.t} className={`rounded-3xl border-2 border-ink p-6 ${i === 0 ? "bg-lime shadow-pop" : "bg-card"}`}>
              <h2 className="text-2xl font-extrabold">{o.t}</h2>
              <p className="text-sm font-bold opacity-75">{o.sub}</p>
              <p className="mt-4 font-display text-3xl font-extrabold">Forfait annoncé à l'appel</p>
              <ul className="mt-5 space-y-2">
                {o.inc.map((x) => <li key={x} className="flex gap-2"><Check className="h-5 w-5 shrink-0" /> {x}</li>)}
                {o.exc.map((x) => <li key={x} className="flex gap-2 opacity-70"><X className="h-5 w-5 shrink-0" /> Non inclus : {x}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </Section>
      <section className="bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 lg:grid-cols-[1fr_26rem]">
          <Prose>
            <h2>Le bonus réparation QualiRépar</h2>
            <p>
              Le bonus réparation est une aide de l'État <strong>déduite directement de votre facture</strong> chez un réparateur
              labellisé QualiRépar. Les appareils éligibles et les montants sont <strong>identiques en Martinique et en métropole</strong>.
            </p>
            <p>C'TOO 9 engage sa démarche de labellisation. Cette page sera mise à jour dès l'obtention du label.</p>
            <h2>Garantie</h2>
            <p>Chaque réparation est couverte par une garantie écrite sur la panne traitée, dont la durée figure sur votre facture.</p>
            <h2>Appareil non réparable</h2>
            <p>Si la réparation n'est pas possible ou pas rentable, nous vous le disons. Seuls les frais de diagnostic sont dus, et nous vous conseillons pour le remplacement.</p>
            <h2>Moyens de paiement</h2>
            <p>Carte bancaire, espèces, virement.</p>
          </Prose>
          <div><ApplianceSelector /></div>
        </div>
      </section>
      <CtaBand label="Vérifier mon appareil" />
    </>
  );
}
