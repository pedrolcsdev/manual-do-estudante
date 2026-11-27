import test from "node:test";
import assert from "node:assert/strict";
import { services, categories } from "../content/services.ts";
import { campusBoundary, campusPoints, campusUnlocatedSectors } from "../content/campus.ts";
import { relatedServiceSlugs } from "../content/related-services.ts";

test("serviços têm slug único, categoria e referência de fonte", () => {
  assert.equal(new Set(services.map((service) => service.slug)).size, services.length);
  for (const service of services) {
    assert.ok(categories.some((category) => category.slug === service.category), service.slug);
    assert.ok(service.steps.length > 0, service.slug);
    assert.ok(service.sources.length > 0 && service.sources.every((source) => source.file && source.page > 0), service.slug);
    if (service.status !== "documentado") assert.ok(service.caveat, service.slug);
  }
});

test("pontos do mapa têm slug único e orientação com referência de localização", () => {
  assert.ok(campusBoundary.length >= 3);
  assert.equal(new Set(campusPoints.map(({ slug }) => slug)).size, campusPoints.length);
  for (const { orientation, position } of campusPoints) {
    const service = services.find(({ slug }) => slug === orientation);
    assert.ok(service?.sector && service.location, orientation);
    assert.ok(position.every((coordinate, index) => {
      const limits = campusBoundary.map((vertex) => vertex[index]);
      return coordinate >= Math.min(...limits) && coordinate <= Math.max(...limits);
    }), orientation);
  }
});

test("os setores do diretório têm pinos distintos e preservam as ressalvas de localização", () => {
  const sectors = [...campusPoints, ...campusUnlocatedSectors];
  assert.equal(new Set(sectors.map(({ slug }) => slug)).size, sectors.length);
  assert.equal(new Set(sectors.map(({ position }) => position.join(","))).size, sectors.length);
  for (const { location, orientation } of campusUnlocatedSectors) {
    assert.match(location, /a confirmar/);
    if (orientation) assert.ok(services.some(({ slug }) => slug === orientation), orientation);
  }
});

test("cada orientação indica três outras orientações válidas e distintas", () => {
  const slugs = new Set(services.map(({ slug }) => slug));
  assert.deepEqual(new Set(Object.keys(relatedServiceSlugs)), slugs);
  for (const [slug, suggestions] of Object.entries(relatedServiceSlugs)) {
    assert.equal(suggestions.length, 3, slug);
    assert.equal(new Set(suggestions).size, 3, slug);
    assert.ok(suggestions.every((suggestion) => suggestion !== slug && slugs.has(suggestion)), slug);
  }
});
