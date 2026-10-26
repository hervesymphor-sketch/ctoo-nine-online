import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Prose, Section } from "@/components/site/Layout";
import { CONTACT } from "@/lib/site";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — C'TOO 9" },
      { name: "description", content: "Mentions légales du site C'TOO 9, réparation d'électroménager en Martinique." },
      { property: "og:title", content: "Mentions légales — C'TOO 9" },
      { property: "og:description", content: "Éditeur, hébergeur et médiateur de la consommation." },
    ],
  }),
  component: () => (
    <>
      <PageHero kicker="Légal" title="Mentions légales" />
      <Section>
        <Prose>
          <h2>Éditeur</h2>
          <p>C'TOO 9 — forme juridique et SIRET à compléter — {CONTACT.address} — {CONTACT.email} — {CONTACT.phoneDisplay}.</p>
          <p>Directeur de la publication : à compléter.</p>
          <h2>Hébergement</h2>
          <p>Site hébergé par Lovable / Cloudflare.</p>
          <h2>Médiateur de la consommation</h2>
          <p>Conformément au Code de la consommation, le client particulier peut recourir gratuitement au médiateur : coordonnées à compléter.</p>
          <h2>Propriété intellectuelle</h2>
          <p>Les contenus de ce site sont la propriété de C'TOO 9. Les marques citées appartiennent à leurs propriétaires et sont mentionnées à titre informatif.</p>
        </Prose>
      </Section>
    </>
  ),
});
