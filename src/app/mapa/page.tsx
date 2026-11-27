import type { Metadata } from "next";
import { CampusMap } from "@/components/campus-map";
import { campusMapUrl } from "@/content/campus";
import { campusDirectory } from "@/content/campus-directory";

export const metadata: Metadata = {
  title: "Mapa do campus Renascença | Manual do Estudante",
  description:
    "Encontre a biblioteca, o Apoio ao Aluno e outros pontos de referência no campus Renascença.",
};

export default async function MapPage({
  searchParams,
}: {
  searchParams: Promise<{ ponto?: string }>;
}) {
  const { ponto } = await searchParams;
  const selected = campusDirectory.find(({ slug }) => slug === ponto)?.slug;

  return (
    <main className="mx-auto min-h-[70vh] max-w-6xl px-5 py-9 md:py-13">
      <p className="section-eyebrow">Campus Renascença · São Luís</p>
      <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-blue md:text-5xl">
        Mapa do campus
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-ink/80">
        Selecione um setor para ver o andar ou a referência de localização
        disponível.
      </p>
      <p className="mt-3 inline-block rounded-md bg-amber-50 px-3 py-2 text-sm leading-6 text-amber-950">
        Protótipo com marcadores ilustrativos. Use as referências de localização
        para chegar ao setor.
      </p>
      <CampusMap
        key={selected ?? "campus"}
        points={campusDirectory}
        initialPoint={selected}
      />
      <a
        href={campusMapUrl}
        className="mt-5 inline-flex min-h-11 items-center text-sm font-semibold text-blue underline underline-offset-4"
      >
        Ver campus no OpenStreetMap{" "}
        <span aria-hidden="true" className="ml-2">
          ↗
        </span>
      </a>
    </main>
  );
}
