import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Info, Loader2, Navigation } from "lucide-react";
import { CtaBand, PageHero, Section } from "@/components/site/Layout";
import { ALL_COMMUNES, CONTACT, ZONES, findZone, nearestCommune } from "@/lib/site";

export const Route = createFileRoute("/zones-intervention")({
  head: () => ({
    meta: [
      { title: "Zones d'intervention en Martinique — C'TOO 9 réparation électroménager" },
      { name: "description", content: "Fort-de-France, Le Lamentin, Ducos, Schœlcher… Vérifiez si C'TOO 9 intervient dans votre commune et les frais de déplacement par zone." },
      { property: "og:title", content: "Zones d'intervention — C'TOO 9" },
      { property: "og:description", content: "Les communes de Martinique desservies par C'TOO 9." },
    ],
  }),
  component: Page,
});

function Page() {
  const [c, setC] = useState("");
  const [detected, setDetected] = useState<{ commune: string; distanceKm: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState("");
  const zone = c ? findZone(c) : undefined;

  function locate() {
    if (!("geolocation" in navigator)) {
      setGeoError("La géolocalisation n'est pas disponible sur cet appareil.");
      return;
    }
    setLocating(true);
    setGeoError("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        const n = nearestCommune(pos.coords.latitude, pos.coords.longitude);
        if (n) {
          setDetected({ commune: n.commune, distanceKm: n.distanceKm });
          setC(n.commune);
        } else {
          setGeoError("Position non reconnue : choisissez votre commune dans la liste.");
        }
      },
      () => {
        setLocating(false);
        setGeoError("Impossible d'accéder à votre position : choisissez votre commune dans la liste.");
      },
      { timeout: 10000, maximumAge: 600000 },
    );
  }

  return (
    <>
      <PageHero kicker="Zones" title="Zones d'intervention">
        Nous intervenons à domicile en Martinique, avec des frais de déplacement par zone, annoncés avant le rendez-vous.
      </PageHero>
      <Section className="grid gap-10 lg:grid-cols-[24rem_1fr]">
        <div className="rounded-3xl border-2 border-ink bg-card p-6 shadow-pop">
          <label htmlFor="commune-check" className="font-display text-2xl font-extrabold">Vérifier ma commune</label>
          <select id="commune-check" className="field mt-3" value={c} onChange={(e) => { setC(e.target.value); setDetected(null); setGeoError(""); }}>
            <option value="">Choisir ma commune…</option>
            {ALL_COMMUNES.map((x) => <option key={x}>{x}</option>)}
          </select>
          <button type="button" onClick={locate} disabled={locating} className="btn btn-outline mt-3 w-full">
            {locating ? <Loader2 className="h-5 w-5 animate-spin" /> : <Navigation className="h-5 w-5" />}
            {locating ? "Localisation…" : "Utiliser ma position"}
          </button>
          {detected && (
            <p className="mt-3 text-sm" aria-live="polite">
              Position détectée : <strong>{detected.commune}</strong> (environ {Math.max(1, Math.round(detected.distanceKm))} km du centre de la commune).
            </p>
          )}
          {geoError && <p className="mt-3 text-sm text-destructive" aria-live="polite">{geoError}</p>}
          {zone && (
            <div className="mt-4 rounded-2xl bg-secondary p-4" aria-live="polite">
              {zone.status === "desservie" ? (
                <p className="flex gap-2 font-bold"><CheckCircle2 className="h-5 w-5 text-lime-deep" /> {c} est desservie (zone {zone.name}).</p>
              ) : (
                <p className="flex gap-2 font-bold"><Info className="h-5 w-5" /> {c} : intervention selon planning, frais de déplacement à confirmer.</p>
              )}
              <Link to="/demande" className="btn btn-primary mt-3 w-full">Faire ma demande</Link>
            </div>
          )}
          <p className="mt-4 text-sm text-muted-foreground">
            Hors zone ? Le dépôt en atelier reste possible, ou appelez-nous au {CONTACT.phoneDisplay}.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {ZONES.map((z) => (
            <div key={z.id} className={`rounded-2xl border-2 border-ink p-5 ${z.status === "desservie" ? "bg-lime" : "bg-card"}`}>
              <h2 className="text-2xl font-bold">Zone {z.name}</h2>
              <p className="text-sm font-extrabold">{z.status === "desservie" ? "Desservie en priorité" : "Sur demande"}</p>
              <ul className="mt-3 grid grid-cols-2 gap-1 text-sm">{z.communes.map((x) => <li key={x}>• {x}</li>)}</ul>
            </div>
          ))}
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
