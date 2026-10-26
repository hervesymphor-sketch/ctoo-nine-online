import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, Phone, MessageCircle, Wrench, X, MapPin, Clock, Mail } from "lucide-react";
import logo from "@/assets/logo-ctoo9.png.asset.json";
import { CONTACT, whatsappLink } from "@/lib/site";

const NAV = [
  { to: "/reparation-domicile", label: "À domicile" },
  { to: "/reparation-atelier", label: "En atelier" },
  { to: "/tarifs", label: "Tarifs & bonus" },
  { to: "/professionnels", label: "Professionnels" },
  { to: "/zones-intervention", label: "Zones" },
  { to: "/faq", label: "FAQ" },
  { to: "/a-propos", label: "À propos" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-ink text-ink-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link to="/" aria-label="C'TOO 9 — accueil" className="shrink-0">
          <img src={logo.url} alt="C'TOO 9" className="h-10 w-auto md:h-12" width={1666} height={516} />
        </Link>
        <nav className="hidden items-center gap-1 xl:flex" aria-label="Navigation principale">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-full px-3 py-2 text-sm font-bold text-ink-muted transition hover:text-ink-foreground"
              activeProps={{ className: "!text-lime" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={CONTACT.phoneHref} className="hidden items-center gap-2 font-bold md:inline-flex">
            <Phone className="h-4 w-4 text-lime" /> {CONTACT.phoneDisplay}
          </a>
          <Link to="/demande" className="btn btn-primary hidden !min-h-11 text-sm sm:inline-flex">
            Demande de réparation
          </Link>
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink-muted xl:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-ink-muted/30 px-4 pb-5 xl:hidden" aria-label="Menu mobile">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="block border-b border-ink-muted/20 py-3 font-display text-xl font-bold"
            >
              {n.label}
            </Link>
          ))}
          <Link to="/demande" onClick={() => setOpen(false)} className="btn btn-primary mt-4 w-full">
            Demande de réparation
          </Link>
        </nav>
      )}
    </header>
  );
}

export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t-2 border-ink bg-ink text-ink-foreground md:hidden">
      <a href={CONTACT.phoneHref} className="flex min-h-14 flex-col items-center justify-center text-xs font-bold">
        <Phone className="h-5 w-5 text-lime" /> Appeler
      </a>
      <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex min-h-14 flex-col items-center justify-center text-xs font-bold">
        <MessageCircle className="h-5 w-5 text-whatsapp" /> WhatsApp
      </a>
      <Link to="/demande" className="flex min-h-14 flex-col items-center justify-center bg-lime text-xs font-extrabold text-ink">
        <Wrench className="h-5 w-5" /> Demande
      </Link>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-ink pb-24 text-ink-foreground md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <img src={logo.url} alt="C'TOO 9" className="h-12 w-auto" loading="lazy" width={1666} height={516} />
          <p className="mt-4 text-sm text-ink-muted">
            Réparation d'électroménager toutes marques en Martinique, à domicile ou en atelier.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-lime">Faire réparer</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li><Link to="/reparation-domicile" className="hover:text-ink-foreground">Réparation à domicile</Link></li>
            <li><Link to="/reparation-atelier" className="hover:text-ink-foreground">Réparation en atelier</Link></li>
            <li><Link to="/tarifs" className="hover:text-ink-foreground">Tarifs & bonus réparation</Link></li>
            <li><Link to="/professionnels" className="hover:text-ink-foreground">Demander un devis pro</Link></li>
            <li><Link to="/zones-intervention" className="hover:text-ink-foreground">Zones d'intervention</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold text-lime">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0" /><a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a></li>
            <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0" /><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0" />{CONTACT.address}</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold text-lime">Horaires</h3>
          <ul className="mt-3 space-y-2 text-sm text-ink-muted">
            {CONTACT.hours.map((h) => (
              <li key={h.d} className="flex gap-2"><Clock className="h-4 w-4 shrink-0" />{h.d} : {h.h}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-muted/20">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-x-6 gap-y-2 px-4 py-5 text-xs text-ink-muted">
          <span>© {new Date().getFullYear()} C'TOO 9</span>
          <Link to="/mentions-legales" className="hover:text-ink-foreground">Mentions légales</Link>
          <Link to="/confidentialite" className="hover:text-ink-foreground">Confidentialité & cookies</Link>
          <Link to="/conditions" className="hover:text-ink-foreground">Conditions de prise en charge</Link>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({ kicker, title, children }: { kicker: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="border-b-2 border-ink bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-14 md:py-20">
        <p className="inline-block rounded-full border-2 border-ink bg-lime px-3 py-1 text-xs font-extrabold uppercase tracking-wider">
          {kicker}
        </p>
        <h1 className="mt-5 max-w-4xl text-4xl font-extrabold md:text-6xl">{title}</h1>
        {children && <div className="mt-5 max-w-2xl text-lg text-muted-foreground">{children}</div>}
      </div>
    </section>
  );
}

export function CtaBand({ title = "Une panne ? On s'en occupe.", label = "Faire réparer mon appareil" }: { title?: string; label?: string }) {
  return (
    <section className="bg-lime">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-12 md:flex-row md:items-center">
        <h2 className="text-3xl font-extrabold text-ink md:text-4xl">{title}</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/demande" className="btn btn-ink">{label}</Link>
          <a href={CONTACT.phoneHref} className="btn btn-outline text-ink"><Phone className="h-4 w-4" /> Appeler</a>
        </div>
      </div>
    </section>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-7xl px-4 py-16 md:py-20 ${className}`}>{children}</section>;
}

export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground [&_h2]:mt-10 [&_h2]:text-3xl [&_h2]:font-extrabold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-foreground">
      {children}
    </div>
  );
}
