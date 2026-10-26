import { describe, expect, it } from "vitest";
import { getSolution } from "./site";

describe("sélecteur d'appareil", () => {
  it("oriente un gros appareil (lave-linge) vers le domicile", () => {
    expect(getSolution("lave-linge")?.mode).toBe("domicile");
  });
  it("oriente un petit appareil (micro-ondes) vers l'atelier", () => {
    expect(getSolution("micro-ondes")?.mode).toBe("atelier");
  });
});
