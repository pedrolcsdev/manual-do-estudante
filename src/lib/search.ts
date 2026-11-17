import type { Service } from "@/content/services";

export type SearchableService = Pick<Service, "slug" | "title" | "keywords" | "summary">;

const stopWords = new Set(["de", "do", "da", "dos", "das", "onde", "como", "consigo", "quero", "preciso", "um", "uma", "o", "a", "e", "para", "no", "na"]);

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function searchServices<T extends SearchableService>(services: T[], query: string): T[] {
  const terms = normalize(query).split(/\s+/).filter((term) => term && !stopWords.has(term));
  if (!terms.length) return [];

  return services
    .map((service) => {
      const title = normalize(service.title);
      const keywords = normalize(service.keywords.join(" "));
      const summary = normalize(service.summary);
      const score = terms.reduce((total, term) => total + (title.includes(term) ? 4 : 0) + (keywords.includes(term) ? 2 : 0) + (summary.includes(term) ? 1 : 0), 0);
      return { service, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.service.title.localeCompare(b.service.title, "pt-BR"))
    .map(({ service }) => service);
}
