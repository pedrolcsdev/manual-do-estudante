import test from "node:test";
import assert from "node:assert/strict";
import { services } from "../content/services.ts";
import { searchSectors, searchServices } from "./search.ts";
import { campusPoints } from "../content/campus.ts";

test("sinônimos comuns levam ao serviço certo", () => {
  for (const [query, slug] of [
    ["comprovante de matrícula", "declaracao-matricula"],
    ["facial", "cadastro-facial"],
    ["renovar livro", "livros-biblioteca"],
    ["perdi objeto", "objetos-perdidos"],
    ["COMPROVANTE DE MATRICULA", "declaracao-matricula"],
    ["renov", "livros-biblioteca"],
  ])
    assert.equal(searchServices(services, query)[0]?.slug, slug);
  assert.deepEqual(searchServices(services, ""), []);
  assert.deepEqual(searchServices(services, "xylophonie"), []);
});

test("busca por nome do setor com acentos, termos incompletos e ordem livre", () => {
  const sectors = campusPoints.map((point) => ({
    ...point,
    name: services.find(({ slug }) => slug === point.orientation).sector,
  }));
  for (const [query, slug] of [
    ["central de matricula", "central-matricula"],
    ["BIBLIO", "biblioteca"],
    ["perdidos e achados", "achados-e-perdidos"],
  ]) {
    assert.deepEqual(
      searchSectors(sectors, query).map((sector) => sector.slug),
      [slug],
    );
  }
  assert.deepEqual(searchSectors(sectors, "de e"), []);
});
