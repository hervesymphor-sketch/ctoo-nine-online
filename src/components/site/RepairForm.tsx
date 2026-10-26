import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { ALL_COMMUNES, APPLIANCES, BRANDS, whatsappLink } from "@/lib/site";

type Errors = Record<string, string>;

export function RepairForm({ defaultAppliance = "", defaultProfil = "particulier" }: { defaultAppliance?: string; defaultProfil?: "particulier" | "pro" }) {
  const [profil, setProfil] = useState(defaultProfil);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = (k: string) => String(fd.get(k) ?? "").trim();
    const errs: Errors = {};
    if (!v("appareil")) errs["appareil"] = "Choisissez un appareil.";
    if (v("panne").length < 5) errs["panne"] = "Décrivez la panne en quelques mots.";
    if (!v("commune")) errs["commune"] = "Indiquez votre commune.";
    if (!v("nom")) errs["nom"] = "Indiquez votre nom.";
    if (!/^[+0-9 .]{10,}$/.test(v("tel"))) errs["tel"] = "Numéro de téléphone invalide.";
    if (v("email") && !/^\S+@\S+\.\S+$/.test(v("email"))) errs["email"] = "E-mail invalide.";
    if (!fd.get("rgpd")) errs["rgpd"] = "Votre accord est nécessaire pour traiter la demande.";
    const files = (fd.getAll("photos") as File[]).filter((f) => f.size > 0);
    if (files.length > 3) errs["photos"] = "3 photos maximum.";
    if (files.some((f) => f.size > 10 * 1024 * 1024)) errs["photos"] = "10 Mo maximum par photo.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const app = APPLIANCES.find((a) => a.id === v("appareil"))?.label ?? v("appareil");
    const msg = [
      "Bonjour C'TOO 9, voici ma demande de réparation :",
      `• Profil : ${profil === "pro" ? `Professionnel ${v("societe")}` : "Particulier"}`,
      `• Appareil : ${app} — ${v("marque")} ${v("reference")}`,
      `• Panne : ${v("panne")}`,
      `• Commune : ${v("commune")}`,
      `• Préférence : ${v("preference")}`,
      `• Nom : ${v("nom")} — Tél : ${v("tel")}${v("email") ? ` — ${v("email")}` : ""}`,
    ].join("\n");
    setSent(msg);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (sent) {
    return (
      <div className="rounded-3xl border-2 border-ink bg-card p-6 shadow-pop md:p-8" role="status">
        <CheckCircle2 className="h-12 w-12 text-lime-deep" />
        <h2 className="mt-3 text-3xl font-extrabold">Merci, votre demande est prête !</h2>
        <p className="mt-3 text-muted-foreground">
          Prochaines étapes : un technicien étudie votre demande, vous rappelle pour préciser la panne et fixer
          l'intervention ou le dépôt. Le tarif vous est annoncé avant tout déplacement.
        </p>
        <p className="mt-3 font-bold">Pour nous la transmettre tout de suite (et joindre vos photos), envoyez-la sur WhatsApp :</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={whatsappLink(sent)} target="_blank" rel="noreferrer" className="btn btn-whatsapp">
            <MessageCircle className="h-5 w-5" /> Envoyer sur WhatsApp
          </a>
          <button className="btn btn-outline" onClick={() => setSent(null)}>Modifier ma demande</button>
        </div>
      </div>
    );
  }

  const err = (k: string) => errors[k] && <p className="mt-1 text-sm font-bold text-destructive">{errors[k]}</p>;
  const lbl = "mb-1 block text-sm font-extrabold";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-3xl border-2 border-ink bg-card p-5 shadow-pop md:p-8">
      <fieldset>
        <legend className={lbl}>Vous êtes</legend>
        <div className="grid grid-cols-2 gap-2">
          {(["particulier", "pro"] as const).map((p) => (
            <label key={p} className={`flex min-h-12 cursor-pointer items-center justify-center rounded-xl border-2 font-bold ${profil === p ? "border-ink bg-lime" : "border-input"}`}>
              <input type="radio" name="profil" value={p} checked={profil === p} onChange={() => setProfil(p)} className="sr-only" />
              {p === "pro" ? "Professionnel" : "Particulier"}
            </label>
          ))}
        </div>
      </fieldset>
      {profil === "pro" && (
        <div className="grid gap-4 md:grid-cols-2">
          <div><label htmlFor="societe" className={lbl}>Raison sociale</label><input id="societe" name="societe" className="field" /></div>
          <div><label htmlFor="siret" className={lbl}>SIRET (facultatif)</label><input id="siret" name="siret" className="field" inputMode="numeric" /></div>
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label htmlFor="f-appareil" className={lbl}>Appareil *</label>
          <select id="f-appareil" name="appareil" defaultValue={defaultAppliance} className="field">
            <option value="">Choisir…</option>
            {APPLIANCES.map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
          </select>
          {err("appareil")}
        </div>
        <div>
          <label htmlFor="marque" className={lbl}>Marque</label>
          <select id="marque" name="marque" className="field">
            <option value="">Choisir…</option>
            {BRANDS.map((b) => <option key={b}>{b}</option>)}
          </select>
        </div>
        <div><label htmlFor="reference" className={lbl}>Référence (si connue)</label><input id="reference" name="reference" className="field" /></div>
      </div>
      <div>
        <label htmlFor="panne" className={lbl}>Description de la panne *</label>
        <textarea id="panne" name="panne" rows={3} className="field" placeholder="Symptôme, bruit, code erreur, depuis quand…" />
        {err("panne")}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="commune" className={lbl}>Commune *</label>
          <select id="commune" name="commune" className="field">
            <option value="">Choisir…</option>
            {ALL_COMMUNES.map((c) => <option key={c}>{c}</option>)}
            <option>Autre</option>
          </select>
          {err("commune")}
        </div>
        <div>
          <label htmlFor="preference" className={lbl}>Préférence</label>
          <select id="preference" name="preference" className="field">
            <option>À domicile</option>
            <option>Dépôt en atelier</option>
            <option>Je ne sais pas</option>
          </select>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div><label htmlFor="nom" className={lbl}>Nom et prénom *</label><input id="nom" name="nom" autoComplete="name" className="field" />{err("nom")}</div>
        <div><label htmlFor="tel" className={lbl}>Téléphone *</label><input id="tel" name="tel" type="tel" autoComplete="tel" className="field" />{err("tel")}</div>
        <div><label htmlFor="email" className={lbl}>E-mail</label><input id="email" name="email" type="email" autoComplete="email" className="field" />{err("email")}</div>
      </div>
      <div>
        <label htmlFor="photos" className={lbl}>Photos (1 à 3 : appareil, plaque signalétique, panne)</label>
        <input id="photos" name="photos" type="file" accept="image/*" multiple className="field file:mr-3 file:rounded-full file:border-0 file:bg-secondary file:px-3 file:py-1 file:font-bold" />
        {err("photos")}
      </div>
      <label className="flex gap-3 text-sm">
        <input type="checkbox" name="rgpd" className="mt-1 h-5 w-5 accent-[var(--lime-deep)]" />
        <span>J'accepte que mes données soient utilisées pour traiter ma demande, conformément à la <Link to="/confidentialite" className="font-bold underline">politique de confidentialité</Link>. *</span>
      </label>
      {err("rgpd")}
      <button type="submit" className="btn btn-primary w-full text-lg">Envoyer ma demande</button>
      <p className="text-center text-xs text-muted-foreground">Pas d'adresse complète demandée : nous la fixons ensemble au moment de l'intervention.</p>
    </form>
  );
}

export function CallbackForm() {
  const [done, setDone] = useState<string | null>(null);
  return done ? (
    <div className="rounded-2xl bg-card p-5 text-card-foreground" role="status">
      <p className="font-bold">Merci ! Confirmez votre demande de rappel :</p>
      <a href={whatsappLink(done)} target="_blank" rel="noreferrer" className="btn btn-whatsapp mt-3"><MessageCircle className="h-5 w-5" /> Envoyer</a>
    </div>
  ) : (
    <form
      className="grid gap-3 md:grid-cols-4"
      onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        if (!fd.get("cb-nom") || String(fd.get("cb-tel")).length < 10) return;
        setDone(`Bonjour, merci de me rappeler. ${fd.get("cb-nom")} — ${fd.get("cb-tel")} — créneau : ${fd.get("cb-creneau")}`);
      }}
    >
      <input name="cb-nom" aria-label="Nom" placeholder="Votre nom" required className="field" />
      <input name="cb-tel" aria-label="Téléphone" type="tel" placeholder="Téléphone" required className="field" />
      <select name="cb-creneau" aria-label="Créneau préféré" className="field">
        <option>Matin</option><option>Midi</option><option>Après-midi</option>
      </select>
      <button className="btn btn-primary">Être rappelé</button>
    </form>
  );
}
