import test from "node:test";
import assert from "node:assert/strict";
import { services, categories } from "../content/services.ts";

test("serviços têm slug único, categoria e referência de fonte", () => {
  assert.equal(new Set(services.map((service) => service.slug)).size, services.length);
  for (const service of services) {
    assert.ok(categories.some((category) => category.slug === service.category), service.slug);
    assert.ok(service.steps.length > 0, service.slug);
    assert.ok(service.sources.length > 0 && service.sources.every((source) => source.file && source.page > 0), service.slug);
    if (service.status !== "documentado") assert.ok(service.caveat, service.slug);
  }
});
