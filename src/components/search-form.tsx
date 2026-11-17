import { services } from "@/content/services";
import { SearchInput } from "./search-input";

const searchCatalog = services.map(({ slug, title, summary, keywords }) => ({ slug, title, summary, keywords }));

export function SearchForm({ query = "", variant = "default" }: { query?: string; variant?: "default" | "hero" }) {
  return <SearchInput key={query} query={query} variant={variant} catalog={searchCatalog} />;
}
