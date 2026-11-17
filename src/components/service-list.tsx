import Link from "next/link";
import type { Service } from "@/content/services";

const statusLabel = { documentado: "Orientação documentada", parcial: "Orientação parcial", divergente: "Fontes divergentes" };

export function ServiceList({ services }: { services: Service[] }) {
  return (
    <ul className="divide-y divide-line border-y border-line">
      {services.map((service) => (
        <li key={service.slug}>
          <Link href={`/servicos/${service.slug}`} className="group block py-5 focus-visible:outline-blue">
            <span className="flex items-center justify-between gap-4 text-lg font-semibold text-blue">
              {service.title}<span aria-hidden="true" className="text-2xl font-normal transition-transform group-hover:translate-x-1">↗</span>
            </span>
            <span className="mt-1 block text-sm leading-6 text-ink/75">{service.summary}</span>
            <span className="mt-2 block text-xs font-semibold uppercase tracking-wide text-blue-light">{statusLabel[service.status]}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
