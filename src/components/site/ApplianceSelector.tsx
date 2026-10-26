import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Home, Store } from "lucide-react";
import { APPLIANCES, getSolution } from "@/lib/site";

export function ApplianceSelector() {
  const [id, setId] = useState("");
  const sol = getSolution(id);
  return (
    <div className="rounded-3xl border-2 border-ink bg-card p-5 shadow-pop md:p-6">
      <label htmlFor="appareil" className="font-display text-2xl font-extrabold">
        Quel appareil est en panne ?
      </label>
      <select id="appareil" className="field mt-3" value={id} onChange={(e) => setId(e.target.value)}>
        <option value="">Choisir un appareil…</option>
        <optgroup label="Gros électroménager">
          {APPLIANCES.filter((a) => a.size === "gros").map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
        </optgroup>
        <optgroup label="Petit électroménager">
          {APPLIANCES.filter((a) => a.size === "petit").map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
        </optgroup>
      </select>
      {sol ? (
        <div className="mt-4 rounded-2xl bg-secondary p-4" aria-live="polite">
          <p className="flex items-center gap-2 font-display text-xl font-bold">
            {sol.mode === "domicile" ? <Home className="h-5 w-5 text-lime-deep" /> : <Store className="h-5 w-5 text-lime-deep" />}
            {sol.title}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">{sol.text}</p>
          <p className="mt-2 text-sm font-bold">Tarif de départ annoncé avant toute intervention · devis gratuit avant réparation</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link to="/demande" search={{ appareil: id }} className="btn btn-primary">
              Faire réparer mon appareil <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to={sol.to} className="btn btn-outline">En savoir plus</Link>
          </div>
        </div>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">On vous indique tout de suite : à domicile ou en atelier.</p>
      )}
    </div>
  );
}
