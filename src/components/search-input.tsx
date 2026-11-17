"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { searchServices, type SearchableService } from "@/lib/search";

export function SearchInput({ query, variant, catalog }: { query: string; variant: "default" | "hero"; catalog: SearchableService[] }) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [value, setValue] = useState(query);
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(-1);
  const matches = value.trim().length >= 2 ? searchServices(catalog, value) : [];
  const suggestions = matches.slice(0, 5);
  const open = focused && value.trim().length >= 2;

  return <div className={`search-component ${variant === "hero" ? "search-component--hero" : ""}`} onBlur={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) { setFocused(false); setActive(-1); }
  }}>
    <form action="/buscar" role="search" className="search-bar">
      <label htmlFor={id} className="sr-only">O que você precisa resolver?</label>
      <svg className="search-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" strokeLinecap="round" /></svg>
      <input ref={input} id={id} name="q" value={value} placeholder="Ex.: matrícula" enterKeyHint="search" autoComplete="off" role="combobox" aria-autocomplete="list" aria-expanded={open} aria-controls={open ? `${id}-results` : undefined} aria-activedescendant={open && active >= 0 ? `${id}-option-${active}` : undefined}
        onFocus={() => setFocused(true)}
        onChange={(event) => { setValue(event.target.value); setFocused(true); setActive(-1); }}
        onKeyDown={(event) => {
          if (event.key === "Escape") { setFocused(false); setActive(-1); }
          if ((event.key === "ArrowDown" || event.key === "ArrowUp") && suggestions.length) {
            event.preventDefault(); setFocused(true);
            setActive((previous) => event.key === "ArrowDown" ? (previous + 1) % suggestions.length : (previous <= 0 ? suggestions.length - 1 : previous - 1));
          }
          if (event.key === "Enter" && open && active >= 0) {
            event.preventDefault(); setFocused(false); router.push(`/servicos/${suggestions[active].slug}`);
          }
        }} />
      {value ? <button className="search-clear" type="button" aria-label="Limpar busca" onClick={() => { setValue(""); setActive(-1); input.current?.focus(); }}>×</button> : null}
      <button className="search-submit" type="submit" aria-label="Buscar"><span className="search-submit-label">Buscar</span><span className="search-submit-arrow" aria-hidden="true">→</span></button>
    </form>
    {open ? <div className="search-suggestions">
      <p className="suggestions-label" aria-live="polite">{matches.length ? "Orientações encontradas" : "Nenhuma orientação encontrada"}</p>
      <ul id={`${id}-results`} role="listbox" aria-label="Sugestões de serviços">
        {suggestions.map((service, index) => <li key={service.slug} id={`${id}-option-${index}`} role="option" aria-selected={active === index}>
          <Link href={`/servicos/${service.slug}`} tabIndex={-1} className={active === index ? "is-active" : ""} onClick={() => setFocused(false)}>
            <span>{service.title}</span><span aria-hidden="true">↗</span>
          </Link>
        </li>)}
      </ul>
      {matches.length ? <Link className="search-all" href={`/buscar?q=${encodeURIComponent(value.trim())}`} onClick={() => setFocused(false)}>Ver {matches.length === 1 ? "a orientação" : `todas as ${matches.length} orientações`} <span aria-hidden="true">→</span></Link> : <p className="search-empty">Tente palavras como “matrícula”, “livro” ou “facial”, ou <Link href="/#necessidades" onClick={() => setFocused(false)}>explore as necessidades</Link>.</p>}
    </div> : null}
  </div>;
}
