import Link from "next/link";
import { CampusMap } from "@/components/campus-map";
import { SearchForm } from "@/components/search-form";
import { campusDirectory } from "@/content/campus-directory";
import { categories, services } from "@/content/services";

const shortcuts = [
  ["Tirar declaração", "/servicos/declaracao-matricula"],
  ["Cadastrar facial", "/servicos/cadastro-facial"],
  ["Renovar livro", "/servicos/livros-biblioteca"],
  ["Perdi um objeto", "/servicos/objetos-perdidos"],
];

export default function Home() {
  return (
    <main>
      <section className="home-hero text-white md:flex md:min-h-[640px] md:flex-col md:justify-center md:pb-16 md:pt-36">
        <div className="home-intro">
          <div className="mx-auto w-full max-w-6xl px-6 md:px-5">
            <p className="hero-eyebrow">Manual de Sobrevivência do Estudante</p>
            <h1 className="hero-title">
              O que você
              <br />
              precisa resolver?
            </h1>
            <p className="hero-description">
              Encontre orientações para o dia a dia no campus.
            </p>
            <SearchForm variant="hero" />
          </div>
        </div>
        <div className="home-shortcuts-panel">
          <div className="mx-auto w-full max-w-6xl px-6 md:px-5">
            <h2 id="atalhos" className="text-xl font-bold text-blue md:sr-only">
              Acesso rápido
            </h2>
            <ul className="home-shortcuts" aria-labelledby="atalhos">
              {shortcuts.map(([label, href]) => (
                <li key={href}>
                  <Link href={href}>
                    {label} <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section
        className="hidden border-b border-line bg-white lg:block"
        aria-labelledby="atalhos-setores"
      >
        <div className="mx-auto max-w-6xl px-5 py-18">
          <h2
            id="atalhos-setores"
            className="text-5xl font-extrabold leading-tight tracking-tight text-blue"
          >
            Setores do campus
          </h2>
          <ul className="category-list" aria-labelledby="atalhos-setores">
            {campusDirectory.map(({ slug, name, location }) => (
              <li key={slug}>
                <Link href={`/setores/${slug}`}>
                  <span>
                    <strong>{name}</strong>
                    <small>{location}</small>
                  </span>
                  <span aria-hidden="true" className="category-arrow">
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section
        id="mapa-do-campus"
        className="bg-white py-12 md:py-20"
        aria-labelledby="mapa-titulo"
      >
        <div className="mx-auto max-w-6xl px-6 md:px-5">
          <h2
            id="mapa-titulo"
            className="text-2xl font-extrabold leading-tight tracking-tight text-blue sm:text-3xl md:text-5xl"
          >
            Mapa do campus
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-ink/80">
            Selecione um setor no mapa ou na lista. Os pinos são ilustrativos.
            Confira a referência de localização antes de ir.
          </p>
          <CampusMap points={campusDirectory} lazy />
        </div>
      </section>
      <section
        id="necessidades"
        className="needs-section border-t border-line bg-white"
      >
        <div className="mx-auto max-w-6xl px-6 py-11 md:px-5 md:py-18">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2">
            <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-blue sm:text-3xl md:text-5xl">
              Explore por necessidade
            </h2>
          </div>
          <ul className="category-list">
            {categories.map((category) => {
              const count = services.filter(
                (service) => service.category === category.slug,
              ).length;
              return (
                <li key={category.slug}>
                  <Link href={`/categorias/${category.slug}`}>
                    <span>
                      <strong>{category.title}</strong>
                      <small>
                        {count} {count === 1 ? "orientação" : "orientações"}
                      </small>
                    </span>
                    <span aria-hidden="true" className="category-arrow">
                      ↗
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </main>
  );
}
