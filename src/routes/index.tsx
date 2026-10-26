import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, ClipboardList, Home, MapPin, MessageCircle, Phone, Receipt, ShieldCheck, Store, Wrench, Leaf } from "lucide-react";
import hero from "@/assets/hero-technicien.jpg";
import atelier from "@/assets/atelier.jpg";
import { ApplianceSelector } from "@/components/site/ApplianceSelector";
import { CallbackForm } from "@/components/site/RepairForm";
import { Section } from "@/components/site/Layout";
import { CONTACT, ZONES, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "C'TOO 9 — Réparation électroménager en Martinique, à domicile ou en atelier" },
      { name: "description", content: "Lave-linge, frigo, lave-vaisselle, four… C'TOO 9 répare votre électroménager toutes marques en Martinique. Devis avant réparation, diagnostic déductible." },
      { property: "og:title", content: "C'TOO 9 — Réparation électroménager en Martinique" },
      { property: "og:description", content: "Votre électroménager réparé en Martinique, à domicile ou en atelier. Toutes marques, devis avant réparation." },
    ],
  }),
  component: Index,
});

const STEPS = [
  { icon: ClipboardList, t: "Vous décrivez la panne", d: "Par téléphone, WhatsApp ou formulaire, en 2 minutes." },
  { icon: Wrench, t: "On diagnostique", d: "À domicile ou à l'atelier, avec un devis clair avant toute réparation." },
  { icon: BadgeCheck, t: "On répare, c'est garanti", d: "Réparation garantie par écrit, diagnostic déduit de la facture." },
];

const PROMISES = [
  { icon: Receipt, t: "Devis avant réparation", d: "Vous savez ce que vous payez avant qu'on commence." },
  { icon: ShieldCheck, t: "Garantie écrite", d: "Sur la panne réparée, mentionnée sur la facture." },
  { icon: BadgeCheck, t: "Toutes marques", d: "Gros et petit électroménager, encastrable compris." },
  { icon: Leaf, t: "Réparer plutôt que jeter", d: "Conseil honnête : réparable ou non, et pour combien." },
];

function Index() {
  return (
    <>
      {/* Accueil */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:py-20 lg:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-lime/50 px-3 py-1 text-sm font-bold text-lime">
              <MapPin className="h-4 w-4" /> Partout en Martinique
            </p>
            <h1 className="mt-5 text-5xl font-extrabold md:text-7xl">
              Votre électroménager <span className="text-lime">réparé</span>, à domicile ou en atelier.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-muted">
              Lave-linge, frigo, lave-vaisselle, four, micro-ondes… toutes marques. Deux techniciens confirmés,
              un devis avant chaque réparation et un diagnostic déduit si vous faites réparer.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/demande" className="btn btn-primary text-lg">Faire réparer mon appareil</Link>
              <a href={CONTACT.phoneHref} className="btn btn-outline"><Phone className="h-4 w-4" /> {CONTACT.phoneDisplay}</a>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="btn btn-whatsapp"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
            </div>
          </div>
          <div className="relative">
            <img src={hero} alt="Technicien C'TOO 9 réparant un lave-linge à domicile en Martinique" width={1600} height={1104} className="aspect-[4/3] w-full rounded-3xl border-2 border-lime object-cover" />
            <div className="absolute -bottom-6 left-4 right-4 md:-left-8 md:right-auto md:w-[26rem]">
              <div className="text-foreground"><ApplianceSelector /></div>
            </div>
          </div>
        </div>
        <div className="h-48 lg:h-6" />
      </section>

      {/* Bandeau infos clés */}
      <section className="border-y-2 border-ink bg-lime">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 text-ink md:grid-cols-3">
          <p className="flex items-center gap-3 font-bold"><Home className="h-6 w-6" /> Gros électroménager : on vient chez vous</p>
          <p className="flex items-center gap-3 font-bold"><Store className="h-6 w-6" /> Petit électroménager : dépôt à l'atelier</p>
          <p className="flex items-center gap-3 font-bold"><Receipt className="h-6 w-6" /> Tarif annoncé avant tout déplacement</p>
        </div>
      </section>

      <Section>
        <h2 className="text-4xl font-extrabold md:text-5xl">Comment ça marche ?</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <div key={s.t} className="relative rounded-3xl border-2 border-ink bg-card p-6">
              <span className="absolute -top-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-lime font-display text-xl font-extrabold">{i + 1}</span>
              <s.icon className="h-9 w-9 text-lime-deep" />
              <h3 className="mt-4 text-2xl font-bold">{s.t}</h3>
              <p className="mt-2 text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-secondary">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:py-20 lg:grid-cols-2">
          <img src={atelier} alt="Atelier de réparation C'TOO 9" loading="lazy" width={1408} height={1008} className="rounded-3xl border-2 border-ink object-cover shadow-pop" />
          <div>
            <h2 className="text-4xl font-extrabold md:text-5xl">Pourquoi C'TOO 9 ?</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {PROMISES.map((p) => (
                <div key={p.t}>
                  <p.icon className="h-8 w-8 text-lime-deep" />
                  <h3 className="mt-2 text-xl font-bold">{p.t}</h3>
                  <p className="text-muted-foreground">{p.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-2xl border-2 border-dashed border-lime-deep bg-card p-4">
              <p className="font-bold">Bonus réparation QualiRépar</p>
              <p className="text-sm text-muted-foreground">Labellisation en cours : dès son obtention, l'aide de l'État sera déduite directement de votre facture.</p>
              <Link to="/tarifs" className="mt-2 inline-block text-sm font-extrabold underline">Voir les tarifs et le bonus</Link>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="text-4xl font-extrabold md:text-5xl">Où intervenons-nous ?</h2>
          <Link to="/zones-intervention" className="btn btn-outline">Vérifier ma commune</Link>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {ZONES.map((z) => (
            <div key={z.id} className="rounded-2xl border-2 border-ink bg-card p-5">
              <h3 className="text-xl font-bold">{z.name}</h3>
              <p className={`mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-extrabold ${z.status === "desservie" ? "bg-lime text-ink" : "bg-muted text-muted-foreground"}`}>
                {z.status === "desservie" ? "Zone desservie" : "Sur demande"}
              </p>
              <p className="mt-3 text-sm text-muted-foreground">{z.communes.join(", ")}</p>
            </div>
          ))}
        </div>
      </Section>

      <section className="bg-ink text-ink-foreground">
        <div className="mx-auto max-w-7xl px-4 py-14">
          <h2 className="text-3xl font-extrabold">Vous hésitez ? <span className="text-lime">On vous rappelle.</span></h2>
          <p className="mt-2 text-ink-muted">Laissez votre numéro, un technicien vous rappelle au créneau de votre choix.</p>
          <div className="mt-6 text-foreground"><CallbackForm /></div>
        </div>
      </section>
    </>
  );
}
