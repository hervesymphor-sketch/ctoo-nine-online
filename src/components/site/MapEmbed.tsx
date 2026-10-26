import { useEffect, useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import { CONTACT } from "@/lib/site";

const BROWSER_KEY = import.meta.env["VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY"] as string | undefined;

const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.address)}`;

// La clé du navigateur n'est autorisée que sur les domaines Lovable : ailleurs
// (sandbox, domaines personnalisés) on affiche un lien vers Google Maps.
function mapsEmbedAllowed(): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return host.endsWith(".lovable.app") || host.endsWith(".lovableproject.com");
}

export function MapEmbed({ className = "" }: { className?: string }) {
  const [embeddable, setEmbeddable] = useState(false);
  useEffect(() => {
    setEmbeddable(Boolean(BROWSER_KEY) && mapsEmbedAllowed());
  }, []);

  if (embeddable && BROWSER_KEY) {
    return (
      <div className={`overflow-hidden rounded-2xl border-2 border-ink ${className}`}>
        <iframe
          title={`Carte — ${CONTACT.address}`}
          src={`https://www.google.com/maps/embed/v1/place?key=${BROWSER_KEY}&q=${encodeURIComponent(CONTACT.address)}&zoom=15`}
          className="h-56 w-full border-0"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }
  return (
    <a
      href={MAPS_LINK}
      target="_blank"
      rel="noreferrer"
      className={`flex flex-col items-center justify-center gap-1 rounded-2xl border-2 border-ink bg-card p-4 text-center ${className}`}
    >
      <MapPin className="h-5 w-5" aria-hidden />
      <span className="flex items-center gap-1 text-sm font-bold">
        Voir l'atelier sur Google Maps <ExternalLink className="h-3.5 w-3.5" aria-hidden />
      </span>
      <span className="text-xs text-muted-foreground">{CONTACT.address}</span>
    </a>
  );
}
