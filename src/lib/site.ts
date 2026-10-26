// Téléphone et horaires confirmés ; WhatsApp, e-mail et adresse restent provisoires.
export const CONTACT = {
  phoneDisplay: "0596 49 20 21",
  phoneHref: "tel:+596596492021",
  whatsapp: "596696000000",
  email: "contact@ctoo9.fr",
  address: "Zone artisanale, 97224 Ducos, Martinique",
  hours: [
    { d: "Lundi – Vendredi", h: "8h00 – 16h30" },
  ],
};

export const whatsappLink = (text = "Bonjour C'TOO 9, j'ai besoin d'une réparation.") =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;

export type Mode = "domicile" | "atelier";

export type Appliance = { id: string; label: string; size: "gros" | "petit" };

export const APPLIANCES: Appliance[] = [
  { id: "lave-linge", label: "Lave-linge", size: "gros" },
  { id: "seche-linge", label: "Sèche-linge", size: "gros" },
  { id: "refrigerateur", label: "Réfrigérateur / congélateur", size: "gros" },
  { id: "lave-vaisselle", label: "Lave-vaisselle", size: "gros" },
  { id: "four", label: "Four / cuisinière", size: "gros" },
  { id: "plaque", label: "Plaque de cuisson", size: "gros" },
  { id: "encastrable", label: "Appareil encastrable", size: "gros" },
  { id: "micro-ondes", label: "Micro-ondes", size: "petit" },
  { id: "cafetiere", label: "Cafetière / expresso", size: "petit" },
  { id: "aspirateur", label: "Aspirateur", size: "petit" },
  { id: "robot", label: "Robot / mixeur / blender", size: "petit" },
  { id: "petit-autre", label: "Autre petit appareil", size: "petit" },
];

export type Solution = {
  mode: Mode;
  title: string;
  text: string;
  to: "/reparation-domicile" | "/reparation-atelier";
};

/** Règle du cahier des charges : les gros appareils sont orientés d'office vers le domicile. */
export function getSolution(applianceId: string): Solution | null {
  const a = APPLIANCES.find((x) => x.id === applianceId);
  if (!a) return null;
  if (a.size === "gros") {
    return {
      mode: "domicile",
      title: "Intervention à domicile",
      text: "Un technicien se déplace chez vous : déplacement + diagnostic, puis devis avant toute réparation.",
      to: "/reparation-domicile",
    };
  }
  return {
    mode: "atelier",
    title: "Dépôt en atelier",
    text: "Déposez l'appareil à l'atelier : diagnostic sur place, frais de prise en charge déduits si vous faites réparer.",
    to: "/reparation-atelier",
  };
}

export const BRANDS = [
  "Bosch", "Brandt", "Candy", "Electrolux", "Haier", "Hisense", "Hotpoint", "LG",
  "Miele", "Samsung", "Siemens", "Whirlpool", "Beko", "Indesit", "Autre",
];

// Zones provisoires : à valider par C'TOO 9 (communes et frais de déplacement).
export type Zone = { id: string; name: string; status: "desservie" | "sur-demande"; communes: string[] };

export const ZONES: Zone[] = [
  {
    id: "centre",
    name: "Centre",
    status: "desservie",
    communes: ["Fort-de-France", "Le Lamentin", "Schœlcher", "Saint-Joseph", "Ducos", "Rivière-Salée", "Trois-Îlets"],
  },
  {
    id: "atlantique",
    name: "Nord Atlantique",
    status: "sur-demande",
    communes: ["Le Robert", "La Trinité", "Le Gros-Morne", "Sainte-Marie", "Le Marigot", "Le Lorrain", "Basse-Pointe"],
  },
  {
    id: "sud",
    name: "Sud",
    status: "sur-demande",
    communes: ["Le François", "Le Vauclin", "Le Marin", "Sainte-Luce", "Rivière-Pilote", "Saint-Esprit", "Le Diamant", "Sainte-Anne"],
  },
  {
    id: "caraibe",
    name: "Nord Caraïbe",
    status: "sur-demande",
    communes: ["Case-Pilote", "Bellefontaine", "Le Carbet", "Saint-Pierre", "Le Prêcheur", "Le Morne-Rouge"],
  },
];

export const ALL_COMMUNES = ZONES.flatMap((z) => z.communes).sort((a, b) => a.localeCompare(b, "fr"));

export function findZone(commune: string): Zone | undefined {
  return ZONES.find((z) => z.communes.includes(commune));
}

export const FAQ = [
  { q: "Quels appareils réparez-vous ?", a: "Le gros électroménager (lave-linge, sèche-linge, réfrigérateur, congélateur, lave-vaisselle, four, plaque, encastrable) et le petit électroménager (micro-ondes, cafetière, aspirateur, robot…), toutes marques." },
  { q: "Venez-vous à domicile ?", a: "Oui pour le gros électroménager et l'encastrable, dans les communes desservies. Le petit électroménager se dépose à l'atelier." },
  { q: "Combien coûte une intervention ?", a: "Le forfait de départ (déplacement + diagnostic) est annoncé avant toute intervention. Un devis vous est remis avant réparation : vous restez libre d'accepter ou non." },
  { q: "Le diagnostic est-il déduit de la réparation ?", a: "Oui : si vous acceptez le devis, les frais de diagnostic sont déduits du montant de la réparation." },
  { q: "Quel est le délai d'intervention ?", a: "Il dépend de la commune, de la panne et de la disponibilité des pièces. Nous vous donnons une estimation honnête au moment du rendez-vous, sans promesse intenable." },
  { q: "Y a-t-il une garantie ?", a: "Oui, chaque réparation fait l'objet d'une garantie écrite sur la panne traitée, précisée sur votre facture." },
  { q: "Et si mon appareil n'est pas réparable ?", a: "Nous vous le disons clairement. Seuls les frais de diagnostic sont dus, et nous vous conseillons sur le remplacement le plus adapté." },
  { q: "Les pièces sont-elles disponibles en Martinique ?", a: "Certaines pièces sont en stock local, d'autres sont commandées. Le délai de livraison est indiqué sur le devis." },
  { q: "Qu'est-ce que le bonus réparation QualiRépar ?", a: "Une aide de l'État déduite directement de votre facture chez un réparateur labellisé, avec les mêmes montants qu'en métropole. C'TOO 9 engage la démarche de labellisation : l'information sera mise à jour dès l'obtention." },
  { q: "Quels moyens de paiement acceptez-vous ?", a: "Carte bancaire, espèces et virement (à confirmer au moment du devis)." },
  { q: "Où trouver la référence de mon appareil ?", a: "Sur la plaque signalétique : à l'intérieur de la porte (lave-linge, lave-vaisselle), sur la paroi intérieure (frigo), ou à l'arrière / sous l'appareil. Une photo de cette plaque nous fait gagner beaucoup de temps." },
  { q: "Que vérifier avant d'appeler ?", a: "Testez la prise avec une lampe, vérifiez le disjoncteur, le robinet d'arrivée d'eau et le filtre de vidange. Après une coupure de courant, débranchez l'appareil 5 minutes puis rebranchez-le." },
];
