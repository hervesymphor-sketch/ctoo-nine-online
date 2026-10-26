import { createFileRoute, Link } from "@tanstack/react-router";
import { BedDouble, Building2, ChefHat, FileText, Hotel, Repeat, Receipt } from "lucide-react";
import { PageHero, Section } from "@/components/site/Layout";

export const Route = createFileRoute("/professionnels")({
  head: () => ({
    meta: [
      { title: "Réparation électroménager pour professionnels en Martinique — C'TOO 9" },
      { name: "description", content: "Restauration, hôtellerie, locations saisonnières, syndics : devis, facturation pro, rapport d'intervention et contrat d'entretien avec C'TOO 9." },
      { property: "og:title", content: "Offre professionnelle — C'TOO 9" },
      { property: "og:description", content: "Un partenaire réactif pour l'électroménager de votre activité en Martinique." },
    ],
  }),
  component: Page,
});

const TARGETS = [
  { icon: ChefHat, t: "Restauration", d: "Fours, réfrigération, lave-vaisselle : limiter l'arrêt de votre cuisine." },
  { icon: Hotel, t: "Hôtellerie", d: "Équipements des chambres et de la buanderie." },
  { icon: BedDouble, t: "Locations saisonnières", d: "Intervention entre deux locataires, avec photos et rapport." },
  { icon: Building2, t: "Syndics & bailleurs", d: "Un interlocuteur unique pour vos logements équipés." },
];
const SERVICES = [
  { icon: FileText, t: "Devis détaillé", d: "Avant chaque intervention." },
  { icon: Receipt, t: "Facturation pro", d: "Facture avec raison sociale et SIRET." },
  { icon: FileText, t: "Rapport d'intervention", d: "Constat, travaux réalisés, préconisations." },
  { icon: Repeat, t: "Contrat d'entretien", d: "Visites préventives pour éviter les pannes, en climat tropical." },
];

function Page() {
  return (
    <>
      <PageHero kicker="Professionnels" title="Votre électroménager pro entre de bonnes mains">
        Une panne coûte cher à votre activité. C'TOO 9 vous propose un suivi clair et documenté.
      </PageHero>
      <Section>
        <div className="grid gap-5 md:grid-cols-4">
          {TARGETS.map((x) => (
            <div key={x.t} className="rounded-3xl border-2 border-ink bg-card p-6">
              <x.icon className="h-9 w-9 text-lime-deep" />
              <h2 className="mt-3 text-2xl font-bold">{x.t}</h2>
              <p className="mt-1 text-muted-foreground">{x.d}</p>
            </div>
          ))}
        </div>
      </Section>
      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-4xl font-extrabold">Ce que nous vous apportons</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {SERVICES.map((s) => (
              <div key={s.t}>
                <s.icon className="h-8 w-8 text-lime" />
                <h3 className="mt-2 text-xl font-bold">{s.t}</h3>
                <p className="text-ink-muted">{s.d}</p>
              </div>
            ))}
          </div>
          <Link to="/demande" search={{ profil: "pro" }} className="btn btn-primary mt-10">Demander un devis pro</Link>
        </div>
      </section>
    </>
  );
}
