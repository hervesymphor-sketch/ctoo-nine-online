import { createFileRoute } from "@tanstack/react-router";
import atelier from "@/assets/atelier.jpg";
import { CtaBand, PageHero, Prose, Section } from "@/components/site/Layout";
import { CONTACT } from "@/lib/site";

export const Route = createFileRoute("/reparation-atelier")({
  head: () => ({
    meta: [
      { title: "Réparation de petit électroménager en atelier — C'TOO 9 Martinique" },
      { name: "description", content: "Micro-ondes, cafetière, aspirateur, robot : déposez votre appareil à l'atelier C'TOO 9. Frais de prise en charge déduits si vous faites réparer." },
      { property: "og:title", content: "Réparation en atelier — C'TOO 9" },
      { property: "og:description", content: "Le petit électroménager réparé à l'atelier, en Martinique." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero kicker="Faire réparer" title="Réparation en atelier">
        Le petit électroménager se répare à l'atelier : déposez-le, nous vous appelons avec le diagnostic.
      </PageHero>
      <Section className="grid gap-12 lg:grid-cols-[1fr_26rem]">
        <Prose>
          <h2>Les appareils concernés</h2>
          <ul>
            <li>Micro-ondes, mini-four</li>
            <li>Cafetière, machine expresso</li>
            <li>Aspirateur</li>
            <li>Robot, mixeur, blender et autres petits appareils</li>
          </ul>
          <h2>Déposer votre appareil</h2>
          <p>
            Vous pouvez venir <strong>sans rendez-vous</strong> pendant les horaires d'ouverture, ou prévenir avant
            votre passage pour être accueilli directement par un technicien.
          </p>
          <h2>Frais de prise en charge déductibles</h2>
          <p>
            Des frais de prise en charge couvrent le diagnostic. Ils sont <strong>déduits du montant de la réparation</strong> si
            vous acceptez le devis. En dessous d'un certain montant, nous réparons sans devis préalable pour aller plus
            vite : ce seuil vous est indiqué au dépôt et vous pouvez toujours demander un devis.
          </p>
          <h2>Récupérer votre appareil</h2>
          <p>Nous vous prévenons dès que l'appareil est prêt. Pensez à le récupérer rapidement (voir nos conditions de prise en charge).</p>
        </Prose>
        <aside className="space-y-6">
          <img src={atelier} alt="Atelier C'TOO 9" loading="lazy" width={1408} height={1008} className="rounded-3xl border-2 border-ink object-cover shadow-pop" />
          <div className="rounded-2xl border-2 border-ink bg-card p-5">
            <h3 className="text-xl font-bold">Adresse & horaires</h3>
            <p className="mt-2 text-muted-foreground">{CONTACT.address}</p>
            <ul className="mt-3 text-sm">{CONTACT.hours.map((h) => <li key={h.d}><strong>{h.d}</strong> : {h.h}</li>)}</ul>
          </div>
        </aside>
      </Section>
      <CtaBand label="Préparer mon dépôt" />
    </>
  );
}
