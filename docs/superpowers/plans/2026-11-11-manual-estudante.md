# Manual de Sobrevivência do Estudante Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar um protótipo web mobile-first que transforma dúvidas do estudante em orientações rastreáveis aos relatórios do campus Renascença.

**Architecture:** Next.js App Router renderiza início, resultados, categorias e serviços a partir de um catálogo TypeScript local. Uma função pura normaliza e ranqueia termos; o conteúdo mantém referências e lacunas explícitas. Sem backend ou IA.

**Tech Stack:** Next.js, React, TypeScript, Tailwind CSS, shadcn/ui para controles, `node:test` para busca e integridade do catálogo.

---

## Arquivos e responsabilidades

| Arquivo | Responsabilidade |
| --- | --- |
| `package.json`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `next-env.d.ts`, `components.json` | Configuração mínima do Next, Tailwind, lint e shadcn/ui. |
| `src/app/globals.css`, `src/app/layout.tsx` | Tokens visuais, fonte, metadados e cabeçalho comum. |
| `src/content/services.ts` | Catálogo curado, categorias, fontes e estados. |
| `src/lib/search.ts`, `src/lib/search.test.mjs` | Normalização, busca e seus casos importantes. |
| `src/lib/catalog.test.mjs` | Integridade de slugs, fontes, estados e categorias. |
| `src/components/service-list.tsx`, `src/components/search-form.tsx`, `src/components/service-detail.tsx` | UI reutilizada só pelas rotas que precisam dela. |
| `src/app/page.tsx`, `src/app/buscar/page.tsx`, `src/app/categorias/[slug]/page.tsx`, `src/app/servicos/[slug]/page.tsx` | Páginas e URLs navegáveis. |
| `README.md` | Como executar e limites do protótipo. |

## Tarefa 1 — Instalar a base do aplicativo

**Arquivos:** criar `package.json`, `tsconfig.json`, `postcss.config.mjs`, `eslint.config.mjs`, `next-env.d.ts`, `src/app/globals.css`, `src/app/layout.tsx`.

- [ ] Criar `package.json` com `type: "module"` e scripts `dev: "next dev"`, `build: "next build"`, `start: "next start"`, `lint: "eslint ."`, `test: "node --test src/lib/*.test.mjs"`.
- [ ] Executar `npm install next@latest react@latest react-dom@latest` e `npm install -D typescript @types/node @types/react @types/react-dom tailwindcss @tailwindcss/postcss postcss eslint eslint-config-next`.
- [ ] Criar configuração TypeScript estrita com alias `@/*` → `src/*`; PostCSS com `@tailwindcss/postcss`; ESLint com `eslint-config-next` flat config; `next-env.d.ts` padrão do Next.
- [ ] Criar layout com `lang="pt-BR"`, `next/font/google` Poppins e metadados “Manual de Sobrevivência do Estudante”; importar `globals.css`.
- [ ] Criar `globals.css` com `@import "tailwindcss"`, azul `#031D73`, tinta `#292B2C`, fundo branco, foco visível e tipografia responsiva.
- [ ] Executar `npx shadcn@latest init` e `npx shadcn@latest add button input`, escolhendo a configuração Next/Tailwind já existente. Usar os controles gerados sem adicionar Card.
- [ ] Executar `npm run build`; resultado esperado: build concluído sem erro de configuração. Fazer commit da base.

Configuração mínima de PostCSS:

```js
export default { plugins: { '@tailwindcss/postcss': {} } }
```

## Tarefa 2 — Catálogo com conteúdo documentado

**Arquivos:** criar `src/content/services.ts`, `src/lib/catalog.test.mjs`.

- [ ] Escrever teste de integridade que falha enquanto o catálogo não existe:

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { services, categories } from '../content/services.ts'

test('serviços têm identificador, categoria e fonte verificável', () => {
  assert.equal(new Set(services.map(s => s.slug)).size, services.length)
  for (const service of services) {
    assert.ok(categories.some(c => c.slug === service.category))
    assert.ok(service.steps.length > 0)
    assert.ok(service.sources.every(s => s.file && s.page > 0))
    if (service.status !== 'documentado') assert.ok(service.caveat)
  }
})
```

- [ ] Executar `npm test`; resultado esperado: falha por módulo `services.ts` ausente.
- [ ] Definir os tipos `Category` e `Service` no próprio arquivo do catálogo. Campos obrigatórios: `slug`, `title`, `category`, `summary`, `keywords`, `steps`, `status`, `sources`. Campos opcionais: `channel`, `sector`, `requirements`, `location`, `hours`, `contact`, `caveat`, `related`.
- [ ] Preencher as categorias aprovadas e os serviços abaixo, sem acrescentar passo que não conste das páginas indicadas. Cada `step` é uma frase curta; `caveat` descreve exatamente a lacuna ou divergência. Usar a redação detalhada de `docs/analise-documental.md`.

| Serviço (slug) | Primeira ação ou encaminhamento documentado | Fonte |
| --- | --- | --- |
| `declaracao-matricula` | Portal do Aluno; menu, prazo e valor específicos não informados. | Coordenação p. 4; CAA p. 1 |
| `historico-escolar` | Solicitar pelo Portal do Aluno. | CAA p. 1 |
| `ementas` | Solicitar programa de disciplinas pelo Portal do Aluno. | CAA p. 1 |
| `segunda-via-carteira` | Solicitar 2ª via pelo Portal do Aluno. | CAA p. 1 |
| `matricula-ingresso` | Procurar Central de Matrícula para formalizar vínculo. | Central de Matrícula pp. 1–2 |
| `cracha` | Procurar Central de Matrícula para emissão ou entrega. | Central de Matrícula p. 1 |
| `cadastro-facial` | Ir ao Apoio ao Aluno com RA; falha posterior da catraca sem solução registrada. | Apoio ao Aluno pp. 1–2; Entrevista Setor 2 pp. 1–4 |
| `prouni-fies` | Distinguir suporte inicial da Matrícula, aditamento FIES no Portal e dúvidas financeiras; encaminhamento geral divergente. | Central de Matrícula p. 1; Coordenação p. 3; CAA p. 2 |
| `provas` | CAA para entrega/retirada; setor de provas antigas diverge. | CAA p. 1; Coordenação pp. 1, 4 |
| `retificacao-notas-faltas` | Abrir requerimento pelo Portal do Aluno. | CAA p. 1 |
| `acesso-ava` | Suporte de TI ou atendimento da Coordenação conforme modalidade; canal específico ausente. | Coordenação pp. 2–4 |
| `regime-domiciliar` | Protocolo no Portal com atestado; critérios completos não descritos. | Coordenação p. 3; CAA p. 1 |
| `livros-biblioteca` | Atendimento da biblioteca com documento e senha; renovação pelo Meu Pérgamo. | Biblioteca pp. 1–3 |
| `sala-estudo` | Solicitar à biblioteca com uma hora de antecedência e documento; canal de reserva não registrado. | Biblioteca pp. 1–2 |
| `nada-consta` | Pedir à biblioteca; procedimento e prazo ausentes. | Biblioteca pp. 1, 3 |
| `declaracao-financeira` | Solicitar pelo Portal do Aluno. | CAA p. 2 |
| `regularizacao-financeira` | Abrir requerimento pelo Portal do Aluno. | CAA p. 2 |
| `estagio` | Trâmite com Setor de Estágio; requerimentos também listados no Portal. | Coordenação pp. 3–4; CAA p. 1 |
| `tcc` | Consultar regras/ficha na Coordenação; entrega de TCC listada no Portal. | Coordenação p. 3; CAA p. 1 |
| `atividades-complementares` | Coordenação orienta validação; requerimento externo no Portal. | Coordenação p. 3; CAA p. 1 |
| `kit-formando` | Documentação digital para diploma; requerimento no Portal, lista de documentos ausente. | Coordenação pp. 2–3; CAA p. 1 |
| `objetos-perdidos` | Ir ao 4º andar do CEUMA III, descrever objeto; se localizado, informar nome, RA, CPF e assinar retirada. | Achados e Perdidos p. 1 |

- [ ] Executar `npm test`; resultado esperado: integridade aprovada. Fazer commit do catálogo e teste.

## Tarefa 3 — Busca local com sinônimos

**Arquivos:** criar `src/lib/search.ts`, `src/lib/search.test.mjs`.

- [ ] Escrever teste que falha antes da função existir, cobrindo “comprovante de matrícula” → `declaracao-matricula`, “facial” → `cadastro-facial`, “renovar livro” → `livros-biblioteca`, “perdi objeto” → `objetos-perdidos`, acento/caixa, vazio e termo inexistente.

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { services } from '../content/services.ts'
import { searchServices } from './search.ts'

test('sinônimos levam ao serviço certo', () => {
  for (const [query, slug] of [
    ['comprovante de matrícula', 'declaracao-matricula'],
    ['facial', 'cadastro-facial'],
    ['renovar livro', 'livros-biblioteca'],
    ['perdi objeto', 'objetos-perdidos'],
  ]) assert.equal(searchServices(services, query)[0]?.slug, slug)
  assert.deepEqual(searchServices(services, ''), [])
  assert.deepEqual(searchServices(services, 'xylophonie'), [])
})
```

- [ ] Executar `npm test`; resultado esperado: falha por módulo `search.ts` ausente.
- [ ] Implementar `searchServices(services, query)` como função pura: `normalize('NFD')`, remover diacríticos e pontuação, minúsculas, descartar palavras de ligação (`de`, `do`, `da`, `onde`, `como`, `consigo`, `quero`, `preciso`, `um`, `uma`, `o`, `a`), somar 4 por token do título, 2 por palavra-chave e 1 por resumo; ordenar por pontuação decrescente e título como desempate; sem correspondência retorna `[]`.
- [ ] Executar `npm test`; resultado esperado: todos os casos passam. Fazer commit da busca.

## Tarefa 4 — Interface e rotas

**Arquivos:** criar `src/components/search-form.tsx`, `src/components/service-list.tsx`, `src/components/service-detail.tsx`, `src/app/page.tsx`, `src/app/buscar/page.tsx`, `src/app/categorias/[slug]/page.tsx`, `src/app/servicos/[slug]/page.tsx`; modificar `src/app/globals.css` e `src/app/layout.tsx`.

- [ ] Criar cabeçalho com identidade CEUMA, campus e navegação mínima. Aplicar a direção visual da especificação: hero branco, azul, Poppins, categorias em linhas, sem cards.
- [ ] Criar formulário GET acessível para `/buscar` com `name="q"`, rótulo visível/associado, botão shadcn e foco claro. O formulário pode funcionar sem JavaScript.
- [ ] Criar lista de serviços com links para `/servicos/[slug]`, estado em texto e resumo da primeira ação. Usar a mesma lista em busca e categorias.
- [ ] Criar detalhe com fontes e páginas, primeiro passo, campos opcionais somente quando preenchidos, `caveat` para parcial/divergente e serviços relacionados.
- [ ] Criar rotas de resultado/categoria/serviço com `notFound()` para slug ausente e `generateStaticParams()` para slugs conhecidos. Busca vazia mostra instrução de pesquisa; sem resultado mostra sugestões e categorias.
- [ ] Executar `npm run build` e `npm run lint`; resultado esperado: sem erro. Fazer commit da interface.

## Tarefa 5 — Verificação da experiência e entrega

**Arquivos:** criar `README.md`; ajustar apenas arquivos com falha real observada.

- [ ] Iniciar `npm run dev` e verificar no navegador as quatro rotas, busca por teclado, resultado ausente, estados parcial/divergente e viewport 390 px e desktop.
- [ ] Conferir em especial que “comprovante de matrícula” aponta ao Portal sem menu inventado; Achados e Perdidos indica prédio CEUMA III do campus Renascença; provas e PROUNI/FIES preservam divergências; NADD/Pronto Atendimento não aparecem como solução operacional.
- [ ] Escrever `README.md` com comandos `npm install`, `npm run dev`, `npm test`, `npm run lint`, `npm run build`; explicar que dados vêm de entrevistas e requerem validação institucional.
- [ ] Executar `npm test`, `npm run lint`, `npm run build` e `git diff --check`; resultado esperado: todos aprovados. Fazer commit final.

**Execução:** inline nesta conversa, conforme autorização do solicitante para continuar sem nova revisão. Não delegar tarefas.
