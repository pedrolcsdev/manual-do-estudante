import Link from "next/link";
import { campusPoints } from "@/content/campus";
import type { Service } from "@/content/services";

const statusLabel = {
  documentado: "Orientação documentada",
  parcial: "Orientação parcial",
  divergente: "Fontes divergentes",
};

export function ServiceDetail({ service }: { service: Service }) {
  const [firstStep, ...remainingSteps] = service.steps;
  const point = campusPoints.find(
    ({ orientation }) => orientation === service.slug,
  );
  const portal = service.channel === "Portal do Aluno";
  const library = service.slug === "livros-biblioteca";

  return (
    <article className="min-w-0 [overflow-wrap:anywhere]">
      <p className="text-xs font-bold uppercase tracking-wider text-blue-light">
        {statusLabel[service.status]}
      </p>
      <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-blue md:text-6xl">
        {service.title}
      </h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-ink/80">
        {service.summary}
      </p>

      <section
        aria-labelledby="proxima-acao"
        className="mt-7 max-w-3xl rounded-lg border border-blue/15 bg-blue/5 p-5 sm:p-6"
      >
        <h2 id="proxima-acao" className="text-sm font-bold text-blue">
          Por onde começar
        </h2>
        <p className="mt-2 text-base leading-7">{firstStep}</p>
        {(service.location || service.requirements?.length) && (
          <dl className="mt-4 grid gap-3 text-sm leading-6 sm:grid-cols-2">
            {service.location && (
              <div>
                <dt className="font-semibold text-blue">Onde ir</dt>
                <dd>{service.location}</dd>
              </div>
            )}
            {!!service.requirements?.length && (
              <div>
                <dt className="font-semibold text-blue">O que levar</dt>
                <dd>{service.requirements.join(" · ")}</dd>
              </div>
            )}
          </dl>
        )}
        {remainingSteps.length > 0 && (
          <ol
            start={2}
            className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6"
          >
            {remainingSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        )}
        {(portal || library || point) && (
          <div className="mt-4 flex flex-wrap gap-3">
            {portal && (
              <a
                className="inline-flex min-h-11 items-center rounded-md bg-blue px-4 text-sm font-semibold text-white hover:bg-blue-light"
                href="https://portaldoaluno.grupoceuma.com.br/FrameHTML/web/app/edu/portaleducacional/login/"
              >
                Abrir Portal do Aluno{" "}
                <span aria-hidden="true" className="ml-2">
                  ↗
                </span>
              </a>
            )}
            {library && (
              <a
                className="inline-flex min-h-11 items-center rounded-md bg-blue px-4 text-sm font-semibold text-white hover:bg-blue-light"
                href="https://aluno.ceuma.br/"
              >
                Abrir acessos da CEUMA{" "}
                <span aria-hidden="true" className="ml-2">
                  ↗
                </span>
              </a>
            )}
            {point && (
              <Link
                className="inline-flex min-h-11 items-center rounded-md border border-blue/30 px-4 text-sm font-semibold text-blue hover:bg-blue/10"
                href={`/mapa?ponto=${point.slug}`}
              >
                Ver no mapa{" "}
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </Link>
            )}
          </div>
        )}
      </section>

      <dl className="mt-10 grid gap-x-10 border-t border-line md:grid-cols-2">
        {[
          ["Canal", service.channel],
          ["Setor", service.sector],
          ["Horário", service.hours],
          ["Contato", service.contact?.join(" · ")],
        ]
          .filter((item): item is [string, string] => Boolean(item[1]))
          .map(([label, value]) => (
            <div key={label} className="border-b border-line py-4">
              <dt className="text-xs font-bold uppercase tracking-wide text-blue">
                {label}
              </dt>
              <dd className="mt-1 text-sm leading-6">{value}</dd>
            </div>
          ))}
      </dl>

      {service.caveat && (
        <aside
          className="mt-8 max-w-3xl border-l-4 border-blue-light pl-4"
          aria-label="Informação a confirmar"
        >
          <h2 className="font-bold text-blue">
            O que ainda precisa ser confirmado
          </h2>
          <p className="mt-1 text-sm leading-6 text-ink/80">{service.caveat}</p>
        </aside>
      )}
      <p className="mt-8 text-xs leading-5 text-ink/60">
        Fontes:{" "}
        {service.sources
          .map(({ file, page }) => `${file}, p. ${page}`)
          .join(" · ")}
      </p>
    </article>
  );
}
