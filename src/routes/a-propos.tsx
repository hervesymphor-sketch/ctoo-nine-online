import { createFileRoute } from "@tanstack/react-router";
import { Leaf, UserRound } from "lucide-react";
import atelier from "@/assets/atelier.jpg";
import { CtaBand, PageHero, Prose, Section } from "@/components/site/Layout";

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: "À propos de C'TOO 9 — techniciens électroménager en Martinique" },
      { name: "description", content: "Deux techniciens confirmés, un atelier en Martinique et un engagement : réparer plutôt que jeter." },
      { property: "og:title", content: "À propos — C'TOO 9" },
      { property: "og:description", content: "L'équipe et l'atelier C'TOO 9, réparation d'électroménager en Martinique." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero kicker="À propos" title="Deux techniciens, un engagement : réparer plutôt que jeter" />
      <Section className="grid items-start gap-12 lg:grid-cols-2">
        <Prose>
          <p>
            C'TOO 9 est née d'un constat simple : en Martinique, faire réparer son électroménager devrait être aussi
            simple que d'en acheter un neuf. Nous sommes deux techniciens confirmés, passionnés par le dépannage
            d'appareils toutes marques.
          </p>
          <p>
            Notre méthode : écouter, diagnostiquer honnêtement, annoncer le prix avant d'agir. Et si un appareil ne
            vaut plus la peine d'être réparé, nous vous le disons.
          </p>
          <p>
            Le climat tropical — humidité, air salin, coupures de courant — met les appareils à rude épreuve. Nous
            vous donnons aussi les bons gestes pour les faire durer.
          </p>
        </Prose>
        <img src={atelier} alt="L'atelier C'TOO 9" loading="lazy" width={1408} height={1008} className="rounded-3xl border-2 border-ink shadow-pop" />
      </Section>
      <section className="bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:grid-cols-3">
          {["Technicien 1", "Technicien 2"].map((n) => (
            <div key={n} className="rounded-3xl border-2 border-ink bg-card p-6">
              <UserRound className="h-12 w-12 text-lime-deep" />
              <h2 className="mt-3 text-2xl font-bold">{n}</h2>
              <p className="text-muted-foreground">Années d'expérience et formations à compléter.</p>
            </div>
          ))}
          <div className="rounded-3xl border-2 border-ink bg-lime p-6">
            <Leaf className="h-12 w-12" />
            <h2 className="mt-3 text-2xl font-bold">Notre engagement</h2>
            <p>Moins de déchets, plus d'économies : chaque appareil réparé est un appareil qui ne finit pas à la décharge.</p>
          </div>
        </div>
      </section>
      <CtaBand title="Parlons de votre appareil" label="Contacter C'TOO 9" />
    </>
  );
}
