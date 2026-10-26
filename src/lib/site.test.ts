import { describe, expect, it } from "vitest";
import { CONTACT, getSolution, nearestCommune, whatsappLink } from "./site";

describe("coordonnées confirmées", () => {
  it("utilise le téléphone +596596492021", () => {
    expect(CONTACT.phoneHref).toBe("tel:+596596492021");
    expect(CONTACT.phoneDisplay).toBe("0596 49 20 21");
  });
  it("indique les horaires du lundi au vendredi de 8h00 à 16h30", () => {
    expect(CONTACT.hours).toEqual([
      { d: "Lundi – Vendredi", h: "8h00 – 16h30" },
    ]);
  });
  it("utilise l'e-mail contact.mq@ctoo.fr", () => {
    expect(CONTACT.email).toBe("contact.mq@ctoo.fr");
  });
  it("indique l'adresse de la ZI de Champigny à Ducos", () => {
    expect(CONTACT.address).toBe("Zone Industrielle de Champigny, Immeuble Laguerre, 97224 Ducos, Martinique");
  });
  it("envoie la demande WhatsApp au +596596492021", () => {
    expect(CONTACT.whatsapp).toBe("596596492021");
    expect(whatsappLink("Bonjour").startsWith("https://wa.me/596596492021?text=")).toBe(true);
  });
});

describe("sélecteur d'appareil", () => {
  it("oriente un gros appareil (lave-linge) vers le domicile", () => {
    expect(getSolution("lave-linge")?.mode).toBe("domicile");
  });
  it("oriente un petit appareil (micro-ondes) vers l'atelier", () => {
    expect(getSolution("micro-ondes")?.mode).toBe("atelier");
  });
});

describe("détection GPS de la commune", () => {
  it("reconnaît Ducos depuis la position de l'atelier", () => {
    const n = nearestCommune(14.5747, -60.9711);
    expect(n?.commune).toBe("Ducos");
    expect(n?.zone.name).toBe("Centre");
    expect(n?.zone.status).toBe("desservie");
  });
  it("reconnaît Saint-Pierre dans le nord caraïbe", () => {
    expect(nearestCommune(14.7417, -61.1756)?.commune).toBe("Saint-Pierre");
  });
  it("reconnaît Le Marin dans le sud", () => {
    expect(nearestCommune(14.4717, -60.8686)?.commune).toBe("Le Marin");
  });
  it("renvoie toujours une commune de la liste", () => {
    const n = nearestCommune(14.5, -61.0);
    expect(n).not.toBeNull();
    expect(n?.commune.length).toBeGreaterThan(0);
  });
});
