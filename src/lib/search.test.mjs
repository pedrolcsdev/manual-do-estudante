import test from "node:test";
import assert from "node:assert/strict";
import { services } from "../content/services.ts";
import { searchServices } from "./search.ts";

test("sinônimos comuns levam ao serviço certo", () => {
  for (const [query, slug] of [
    ["comprovante de matrícula", "declaracao-matricula"],
    ["facial", "cadastro-facial"],
    ["renovar livro", "livros-biblioteca"],
    ["perdi objeto", "objetos-perdidos"],
    ["COMPROVANTE DE MATRICULA", "declaracao-matricula"],
    ["renov", "livros-biblioteca"],
  ]) assert.equal(searchServices(services, query)[0]?.slug, slug);
  assert.deepEqual(searchServices(services, ""), []);
  assert.deepEqual(searchServices(services, "xylophonie"), []);
});
