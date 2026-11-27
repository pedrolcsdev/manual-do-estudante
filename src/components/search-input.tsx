"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  searchSectors,
  searchServices,
  type SearchableService,
} from "@/lib/search";

export function SearchInput({
  query,
  variant,
  catalog,
  sectors,
}: {
  query: string;
  variant: "default" | "hero";
  catalog: SearchableService[];
  sectors: { slug: string; name: string }[];
}) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [value, setValue] = useState(query);
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(-1);
  const open = focused && value.trim().length >= 2;
  const matches = open
    ? [
        ...searchSectors(sectors, value).map(({ slug, name }) => ({
          title: name,
          href: `/setores/${slug}`,
          label: "Setor",
        })),
        ...searchServices(catalog, value).map(({ slug, title }) => ({
          title,
          href: `/servicos/${slug}`,
          label: "Orientação",
        })),
      ]
    : [];
  const suggestions = matches.slice(0, 5);

  return (
    <div
      className={`search-component ${variant === "hero" ? "search-component--hero" : ""}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocused(false);
          setActive(-1);
        }
      }}
    >
      <form action="/buscar" role="search" className="search-bar">
        <label htmlFor={id} className="sr-only">
          Buscar orientações ou setores
        </label>
        <svg
          className="search-icon"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          aria-hidden="true"
        >
          <circle cx="10.8" cy="10.8" r="6.8" />
          <path d="m16 16 4.5 4.5" strokeLinecap="round" />
        </svg>
        <input
          ref={input}
          id={id}
          name="q"
          value={value}
          placeholder="Ex.: biblioteca"
          enterKeyHint="search"
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={open ? `${id}-results` : undefined}
          aria-activedescendant={
            open && active >= 0 ? `${id}-option-${active}` : undefined
          }
          onFocus={() => setFocused(true)}
          onChange={(event) => {
            setValue(event.target.value);
            setFocused(true);
            setActive(-1);
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setFocused(false);
              setActive(-1);
            }
            if (
              (event.key === "ArrowDown" || event.key === "ArrowUp") &&
              suggestions.length
            ) {
              event.preventDefault();
              setFocused(true);
              setActive((previous) =>
                event.key === "ArrowDown"
                  ? (previous + 1) % suggestions.length
                  : previous <= 0
                    ? suggestions.length - 1
                    : previous - 1,
              );
            }
            if (event.key === "Enter" && open && active >= 0) {
              event.preventDefault();
              setFocused(false);
              router.push(suggestions[active].href);
            }
          }}
        />
        {value ? (
          <button
            className="search-clear"
            type="button"
            aria-label="Limpar busca"
            onClick={() => {
              setValue("");
              setActive(-1);
              input.current?.focus();
            }}
          >
            ×
          </button>
        ) : null}
        <button className="search-submit" type="submit" aria-label="Buscar">
          <span className="search-submit-label">Buscar</span>
          <span className="search-submit-arrow" aria-hidden="true">
            →
          </span>
        </button>
      </form>
      {open ? (
        <div className="search-suggestions">
          <p className="suggestions-label" aria-live="polite">
            {matches.length
              ? "Resultados encontrados"
              : "Nenhum resultado encontrado"}
          </p>
          <ul
            id={`${id}-results`}
            role="listbox"
            aria-label="Sugestões de orientações e setores"
          >
            {suggestions.map(({ href, label, title }, index) => (
              <li
                key={href}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={active === index}
              >
                <Link
                  href={href}
                  tabIndex={-1}
                  className={active === index ? "is-active" : ""}
                  onClick={() => setFocused(false)}
                >
                  <span>
                    {title}
                    <small className="block text-[11px] text-ink/65">
                      {label}
                    </small>
                  </span>
                  <span aria-hidden="true">↗</span>
                </Link>
              </li>
            ))}
          </ul>
          {matches.length ? (
            <Link
              className="search-all"
              href={`/buscar?q=${encodeURIComponent(value.trim())}`}
              onClick={() => setFocused(false)}
            >
              Ver{" "}
              {matches.length === 1
                ? "o resultado"
                : `todos os ${matches.length} resultados`}{" "}
              <span aria-hidden="true">→</span>
            </Link>
          ) : (
            <p className="search-empty">
              Tente palavras como “biblioteca”, “matrícula” ou “facial”, ou{" "}
              <Link href="/#necessidades" onClick={() => setFocused(false)}>
                explore as necessidades
              </Link>
              .
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
