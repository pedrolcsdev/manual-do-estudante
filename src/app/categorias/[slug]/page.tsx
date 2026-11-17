import Link from "next/link";
import { notFound } from "next/navigation";
import { ServiceList } from "@/components/service-list";
import { categories, services } from "@/content/services";

export function generateStaticParams() { return categories.map(({ slug }) => ({ slug })); }

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  const items = services.filter((service) => service.category === slug);
  return <main className="mx-auto min-h-[70vh] max-w-6xl px-5 py-12 md:py-16"><Link href="/" className="text-sm font-semibold text-blue">← Início</Link><h1 className="mt-7 text-4xl font-extrabold tracking-tight text-blue md:text-6xl">{category.title}</h1><p className="mb-8 mt-3 text-sm text-ink/70">Orientações disponíveis para esta necessidade.</p><ServiceList services={items} /></main>;
}
