import { describe, expect, it } from "vitest";
import { CONTACT, getSolution } from "./site";

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
});

describe("sélecteur d'appareil", () => {
  it("oriente un gros appareil (lave-linge) vers le domicile", () => {
    expect(getSolution("lave-linge")?.mode).toBe("domicile");
  });
  it("oriente un petit appareil (micro-ondes) vers l'atelier", () => {
    expect(getSolution("micro-ondes")?.mode).toBe("atelier");
  });
});
