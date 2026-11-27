import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceList } from "@/components/service-list";
import { campusDirectory } from "@/content/campus-directory";
import { services } from "@/content/services";

const serviceSectors: Record<string, string[]> = {
  "central-matricula": ["central de matricula"],
  "apoio-ao-aluno": ["apoio ao aluno"],
  biblioteca: ["biblioteca"],
  "achados-e-perdidos": ["achados e perdidos"],
  "central-atendimento-ao-aluno": [
    "central de atendimento ao aluno",
    "atendimento academico",
    "atendimento financeiro",
  ],
  nadd: ["nadd"],
  "setor-de-estagio": ["setor de estagio"],
  "suporte-de-ti": ["suporte de ti", "help desk"],
  "coordenacoes-de-curso": ["coordenacao de curso", "coordenacoes de curso"],
  "secretaria-academica": ["secretaria academica"],
  "pronto-atendimento": ["pronto atendimento"],
};

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function generateStaticParams() {
  return campusDirectory.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sector = campusDirectory.find((item) => item.slug === slug);
  return {
    title: sector
      ? `${sector.name} | Manual do Estudante`
      : "Setor | Manual do Estudante",
  };
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sector = campusDirectory.find((item) => item.slug === slug);
  if (!sector) notFound();

  const terms = serviceSectors[slug] ?? [normalize(sector.name)];
  const topics = services.filter(
    ({ sector: serviceSector }) =>
      serviceSector &&
      terms.some((term) => normalize(serviceSector).includes(term)),
  );

  return (
    <main className="mx-auto min-h-[70vh] max-w-6xl px-5 py-10 md:py-16">
      <Link href="/" className="text-sm font-semibold text-blue">
        ← Início
      </Link>
      <div className="mt-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <p className="section-eyebrow">Setor do campus</p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-blue md:text-5xl">
            {sector.name}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/80">
            {sector.location}
          </p>
          {sector.locationPending && (
            <p className="mt-2 text-xs text-amber-800">
              Referência de localização a confirmar.
            </p>
          )}
        </div>
        <Link
          href={`/mapa?ponto=${sector.slug}`}
          className="inline-flex min-h-11 items-center rounded-md border border-blue/30 px-4 text-sm font-semibold text-blue hover:bg-blue/10"
        >
          Ver no mapa{" "}
          <span aria-hidden="true" className="ml-2">
            →
          </span>
        </Link>
      </div>
      <section className="mt-10" aria-labelledby="topicos-setor">
        <h2 id="topicos-setor" className="mb-4 text-2xl font-bold text-blue">
          Orientações deste setor
        </h2>
        {topics.length ? (
          <ServiceList services={topics} />
        ) : (
          <p className="rounded-lg border border-line bg-slate-50 p-5 text-sm leading-6 text-ink/80">
            Ainda não há orientações cadastradas para este setor.
          </p>
        )}
      </section>
    </main>
  );
}
