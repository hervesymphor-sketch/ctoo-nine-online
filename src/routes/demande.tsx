import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero, Section } from "@/components/site/Layout";
import { RepairForm } from "@/components/site/RepairForm";
import { CONTACT, whatsappLink } from "@/lib/site";

type Search = { appareil?: string | undefined; profil?: "pro" | undefined };

export const Route = createFileRoute("/demande")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    appareil: typeof s["appareil"] === "string" ? s["appareil"] : undefined,
    profil: s["profil"] === "pro" ? "pro" : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Demande de réparation — C'TOO 9 Martinique" },
      { name: "description", content: "Décrivez votre panne en 2 minutes : appareil, marque, commune. C'TOO 9 vous rappelle avec un tarif clair." },
      { property: "og:title", content: "Demande de réparation — C'TOO 9" },
      { property: "og:description", content: "Formulaire, téléphone ou WhatsApp : faites réparer votre électroménager en Martinique." },
    ],
  }),
  component: Demande,
});

function Demande() {
  const { appareil, profil } = Route.useSearch();
  return (
    <>
      <PageHero kicker="Contact" title="Demande de réparation">
        Remplissez ce formulaire en moins de 2 minutes, ou contactez-nous directement.
      </PageHero>
      <Section className="grid gap-10 lg:grid-cols-[1fr_22rem]">
        <RepairForm defaultAppliance={appareil ?? ""} defaultProfil={profil ?? "particulier"} />
        <aside className="space-y-4">
          <a href={CONTACT.phoneHref} className="btn btn-ink w-full"><Phone className="h-5 w-5" /> {CONTACT.phoneDisplay}</a>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn btn-whatsapp w-full"><MessageCircle className="h-5 w-5" /> WhatsApp</a>
          <div className="rounded-2xl border-2 border-ink bg-card p-5 text-sm">
            <p className="flex gap-2"><Mail className="h-4 w-4" /> <a className="underline underline-offset-2" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
            <p className="mt-2 flex gap-2"><MapPin className="h-4 w-4" /> {CONTACT.address}</p>
            <div className="mt-3 border-t pt-3">
              {CONTACT.hours.map((h) => <p key={h.d} className="flex gap-2"><Clock className="h-4 w-4" /> {h.d} : {h.h}</p>)}
            </div>
          </div>
        </aside>
      </Section>
    </>
  );
}
