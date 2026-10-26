import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero-technicien.jpg";
import { CtaBand, PageHero, Prose, Section } from "@/components/site/Layout";

export const Route = createFileRoute("/reparation-domicile")({
  head: () => ({
    meta: [
      { title: "Réparation électroménager à domicile en Martinique — C'TOO 9" },
      { name: "description", content: "Lave-linge, réfrigérateur, lave-vaisselle, four, encastrable : un technicien C'TOO 9 se déplace chez vous en Martinique. Forfait déplacement + diagnostic." },
      { property: "og:title", content: "Réparation à domicile — C'TOO 9" },
      { property: "og:description", content: "Le gros électroménager réparé chez vous, en Martinique." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero kicker="Faire réparer" title="Réparation à domicile">
        Pour le gros électroménager et l'encastrable, inutile de déplacer l'appareil : nous venons chez vous.
      </PageHero>
      <Section className="grid gap-12 lg:grid-cols-[1fr_24rem]">
        <Prose>
          <h2>Les appareils concernés</h2>
          <ul>
            <li>Lave-linge et sèche-linge</li>
            <li>Réfrigérateur, congélateur, américain</li>
            <li>Lave-vaisselle</li>
            <li>Four, cuisinière, plaque de cuisson</li>
            <li>Tout appareil encastrable</li>
          </ul>
          <h2>Le forfait déplacement + diagnostic</h2>
          <p>
            Le forfait couvre le déplacement du technicien et le diagnostic de la panne. Son montant vous est
            <strong> annoncé avant le rendez-vous</strong> et dépend de votre zone. Si vous acceptez le devis, il est
            <strong> déduit de la réparation</strong>.
          </p>
          <h2>Comment se déroule la visite</h2>
          <p>
            Le technicien arrive au créneau convenu, écoute vos explications, teste l'appareil et identifie la panne.
            Il vous remet un devis clair : pièces, main-d'œuvre, délai. Si la pièce est disponible, la réparation peut
            être faite sur place ; sinon, nous la commandons et revenons pour l'installer.
          </p>
          <h2>Ce qu'il faut préparer</h2>
          <ul>
            <li>Un accès dégagé à l'appareil (et à la prise, au robinet d'eau)</li>
            <li>La référence, ou une photo de la plaque signalétique</li>
            <li>Si possible, une photo de la panne ou du code erreur</li>
          </ul>
          <p>
            Vous ne trouvez pas la plaque ? Consultez notre <Link to="/faq" className="font-bold underline">FAQ</Link>.
          </p>
        </Prose>
        <img src={hero} alt="Technicien réparant un lave-linge chez un client" loading="lazy" width={1600} height={1104} className="rounded-3xl border-2 border-ink object-cover shadow-pop" />
      </Section>
      <CtaBand label="Demander une intervention" />
    </>
  );
}
