import Link from "next/link";
import { SearchForm } from "@/components/search-form";
import { categories, services } from "@/content/services";

const commonSearches = [
  ["declaração de matrícula", "comprovante de matrícula"],
  ["cadastro facial", "facial"],
  ["renovar livro", "renovar livro"],
];

export default function Home() {
  return <main>
    <section className="home-hero flex min-h-svh flex-col justify-center px-5 pb-24 pt-36 text-white">
      <div className="mx-auto w-full max-w-6xl">
        <p className="hero-eyebrow">Manual de Sobrevivência do Estudante</p>
        <h1 className="hero-title">O que você<br />precisa resolver?</h1>
        <p className="hero-description">Da matrícula ao dia a dia no campus.<br className="hidden sm:block" /> Encontre por onde começar e quem pode ajudar.</p>
        <SearchForm variant="hero" />
        <div className="common-searches"><span>Buscas comuns</span>{commonSearches.map(([label, query]) => <Link key={query} href={`/buscar?q=${encodeURIComponent(query)}`}>{label} <span aria-hidden="true">↗</span></Link>)}</div>
      </div>
      <Link className="hero-explore" href="#necessidades">Explore por necessidade <span aria-hidden="true">↓</span></Link>
    </section>
    <section id="necessidades" className="needs-section bg-white">
      <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <p className="section-eyebrow">Seu próximo passo</p>
        <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-blue md:text-5xl">Explore por necessidade</h2>
        <p className="mt-4 max-w-xl text-sm leading-6 text-ink/75">Não sabe o nome do setor? Escolha o assunto mais próximo do que você quer resolver.</p>
        <ul className="category-list">
          {categories.map((category) => { const count = services.filter((service) => service.category === category.slug).length; return <li key={category.slug}><Link href={`/categorias/${category.slug}`}><span><strong>{category.title}</strong><small>{count} {count === 1 ? "orientação" : "orientações"}</small></span><span aria-hidden="true" className="category-arrow">↗</span></Link></li>; })}
        </ul>
      </div>
    </section>
  </main>;
}
