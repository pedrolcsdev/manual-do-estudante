import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceDetail } from "@/components/service-detail";
import { categories, services } from "@/content/services";

export function generateStaticParams() { return services.map(({ slug }) => ({ slug })); }

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  const category = categories.find((item) => item.slug === service.category)!;
  return <main className="mx-auto min-h-[70vh] max-w-6xl px-5 py-12 md:py-16"><Link href={`/categorias/${category.slug}`} className="text-sm font-semibold text-blue">← {category.title}</Link><div className="mt-8"><ServiceDetail service={service} /></div></main>;
}
