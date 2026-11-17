import type { Service } from "@/content/services";

const statusLabel = { documentado: "Orientação documentada", parcial: "Orientação parcial", divergente: "Fontes divergentes" };

export function ServiceDetail({ service }: { service: Service }) {
  return (
    <article className="min-w-0 [overflow-wrap:anywhere]">
      <p className="text-xs font-bold uppercase tracking-wider text-blue-light">{statusLabel[service.status]}</p>
      <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-blue md:text-6xl">{service.title}</h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-ink/80">{service.summary}</p>

      <div className="mt-9 border-t-2 border-blue pt-6">
        <p className="text-xs font-bold uppercase tracking-wide text-blue">Próxima ação</p>
        <ol className="mt-4 space-y-6">
          {service.steps.map((step, index) => <li key={step} className="flex gap-4"><span className="shrink-0 text-sm font-bold text-blue">{String(index + 1).padStart(2, "0")}</span><span className="min-w-0 max-w-2xl text-base leading-7">{step}</span></li>)}
        </ol>
      </div>

      <dl className="mt-10 grid gap-x-10 border-t border-line md:grid-cols-2">
        {[
          ["Canal", service.channel], ["Setor", service.sector], ["O que levar", service.requirements?.join(", ")], ["Localização", service.location], ["Horário", service.hours], ["Contato", service.contact?.join(" · ")],
        ].filter((item): item is [string, string] => Boolean(item[1])).map(([label, value]) => <div key={label} className="border-b border-line py-4"><dt className="text-xs font-bold uppercase tracking-wide text-blue">{label}</dt><dd className="mt-1 text-sm leading-6">{value}</dd></div>)}
      </dl>

      {service.caveat && <aside className="mt-8 max-w-3xl border-l-4 border-blue-light pl-4" aria-label="Informação a confirmar"><h2 className="font-bold text-blue">O que ainda precisa ser confirmado</h2><p className="mt-1 text-sm leading-6 text-ink/80">{service.caveat}</p></aside>}
      <p className="mt-8 text-xs leading-5 text-ink/60">Fontes: {service.sources.map(({ file, page }) => `${file}, p. ${page}`).join(" · ")}</p>
    </article>
  );
}
