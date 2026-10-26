import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose, Section } from "@/components/site/Layout";
import { CONTACT } from "@/lib/site";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité et cookies — C'TOO 9" },
      { name: "description", content: "Données collectées par C'TOO 9, finalité, durée de conservation et vos droits." },
      { property: "og:title", content: "Confidentialité — C'TOO 9" },
      { property: "og:description", content: "Comment C'TOO 9 protège vos données personnelles." },
    ],
  }),
  component: () => (
    <>
      <PageHero kicker="Légal" title="Confidentialité & cookies" />
      <Section>
        <Prose>
          <h2>Données collectées</h2>
          <p>Nom, téléphone, e-mail, commune, informations sur l'appareil et la panne, photos éventuelles.</p>
          <h2>Finalité</h2>
          <p>Traiter votre demande de réparation, vous recontacter et établir devis et facture.</p>
          <h2>Durée de conservation</h2>
          <p>3 ans après le dernier contact pour un prospect ; durée légale pour les clients (factures).</p>
          <h2>Vos droits</h2>
          <p>Accès, rectification, suppression : écrivez à {CONTACT.email}.</p>
          <h2>Cookies</h2>
          <p>Ce site n'utilise pas de cookies publicitaires. Les éventuels outils de mesure d'audience privilégient des solutions sans cookies.</p>
        </Prose>
      </Section>
    </>
  ),
});
