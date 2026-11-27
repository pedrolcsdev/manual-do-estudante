import { services } from "@/content/services";
import { campusDirectory } from "@/content/campus-directory";
import { SearchInput } from "./search-input";

const searchCatalog = services.map(
  ({ slug, title, summary, keywords, sector }) => ({
    slug,
    title,
    summary,
    keywords,
    sector,
  }),
);
const sectors = campusDirectory.map(({ slug, name }) => ({ slug, name }));

export function SearchForm({
  query = "",
  variant = "default",
}: {
  query?: string;
  variant?: "default" | "hero";
}) {
  return (
    <SearchInput
      key={query}
      query={query}
      variant={variant}
      catalog={searchCatalog}
      sectors={sectors}
    />
  );
}
