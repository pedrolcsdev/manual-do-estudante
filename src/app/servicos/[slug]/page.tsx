import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/service-detail";
import { ServiceList } from "@/components/service-list";
import { relatedServiceSlugs } from "@/content/related-services";
import { categories, services } from "@/content/services";

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  const category = categories.find((item) => item.slug === service.category)!;
  const related = relatedServiceSlugs[service.slug].map((relatedSlug) =>
    services.find((item) => item.slug === relatedSlug)!,
  );

  return (
    <main className="mx-auto min-h-[70vh] max-w-6xl px-5 py-12 md:py-16">
      <Link
        href={`/categorias/${category.slug}`}
        className="text-sm font-semibold text-blue"
      >
        ← {category.title}
      </Link>
      <div className="mt-8">
        <ServiceDetail service={service} />
      </div>
      <section
        aria-labelledby="orientacoes-relacionadas"
        className="mt-12 max-w-3xl rounded-xl bg-[#eef3f9] p-5 sm:p-7"
      >
        <h2
          id="orientacoes-relacionadas"
          className="mb-5 text-xl font-bold tracking-tight text-blue md:text-2xl"
        >
          Orientações relacionadas
        </h2>
        <ServiceList services={related} />
      </section>
    </main>
  );
}
