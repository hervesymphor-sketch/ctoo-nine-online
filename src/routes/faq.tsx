import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { CtaBand, PageHero, Section } from "@/components/site/Layout";
import { FAQ } from "@/lib/site";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Questions fréquentes — C'TOO 9 réparation électroménager Martinique" },
      { name: "description", content: "Délai, garantie, pièces, appareil non réparable, paiement, bonus QualiRépar, premiers gestes avant d'appeler : toutes les réponses de C'TOO 9." },
      { property: "og:title", content: "FAQ — C'TOO 9" },
      { property: "og:description", content: "Les réponses à vos questions sur la réparation d'électroménager en Martinique." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }),
      },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero kicker="Conseils & FAQ" title="Questions fréquentes" />
      <Section>
        <div className="mx-auto max-w-3xl space-y-3">
          {FAQ.map((f) => (
            <details key={f.q} className="group rounded-2xl border-2 border-ink bg-card p-5 open:bg-secondary">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl font-bold">
                {f.q}
                <ChevronDown className="h-5 w-5 shrink-0 transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>
      <CtaBand title="Une autre question ?" label="Poser une question" />
    </>
  );
}
