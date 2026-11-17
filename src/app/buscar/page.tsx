import Link from "next/link";
import { SearchForm } from "@/components/search-form";
import { ServiceList } from "@/components/service-list";
import { categories, services } from "@/content/services";
import { searchServices } from "@/lib/search";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const query = (await searchParams).q?.trim() ?? "";
  const results = searchServices(services, query);

  return <main className="[overflow-wrap:anywhere] mx-auto min-h-[70vh] max-w-6xl px-5 py-12 md:py-16">
    <Link href="/" className="text-sm font-semibold text-blue">← Início</Link>
    <h1 className="mt-7 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-blue md:text-6xl">Encontre sua orientação</h1>
    <SearchForm query={query} />
    {query && results.length > 0 && <section className="mt-12"><p className="mb-5 text-sm text-ink/70">{results.length} {results.length === 1 ? "orientação" : "orientações"} para “{query}”</p><ServiceList services={results} /></section>}
    {query && results.length === 0 && <section className="mt-12"><h2 className="text-2xl font-bold text-blue">Não encontramos uma orientação para “{query}”.</h2><p className="mt-2 text-sm">Tente buscar por “declaração de matrícula”, “cadastro facial” ou “renovar livro”, ou escolha uma necessidade abaixo.</p><ul className="mt-8 divide-y divide-line border-y border-line">{categories.map((category) => <li key={category.slug}><Link className="block py-4 font-semibold text-blue" href={`/categorias/${category.slug}`}>{category.title} ↗</Link></li>)}</ul></section>}
    {!query && <p className="mt-10 text-sm text-ink/70">Escreva o que você precisa resolver ou explore uma categoria na página inicial.</p>}
  </main>;
}
