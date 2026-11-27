"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const navigation = [
  ["Início", "/"],
  ["Pesquisar", "/buscar"],
  ["Mapa do campus", "/#mapa-do-campus"],
  ["Explorar serviços", "/#necessidades"],
];

function Chevron() {
  return (
    <svg
      aria-hidden="true"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

export function MobileNav({
  sectors,
}: {
  sectors: { slug: string; name: string }[];
}) {
  const menu = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => {
      if (desktop.matches) menu.current?.close();
    };
    desktop.addEventListener("change", onResize);
    return () => desktop.removeEventListener("change", onResize);
  }, []);

  return (
    <div className="mobile-nav">
      <button
        type="button"
        className="mobile-menu-toggle"
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-controls="menu-mobile"
        onClick={() => {
          menu.current?.showModal();
          setOpen(true);
        }}
      >
        Menu <span aria-hidden="true">☰</span>
      </button>
      <dialog
        id="menu-mobile"
        ref={menu}
        aria-label="Menu do Manual do Estudante"
        onClose={() => setOpen(false)}
      >
        <div className="mobile-menu-header">
          <Link
            href="/"
            aria-label="Universidade CEUMA — início"
            onNavigate={() => menu.current?.close()}
          >
            <Image
              src="/images/ceuma-logo-white.png"
              alt="Universidade CEUMA"
              width={151}
              height={34}
            />
          </Link>
          <button
            type="button"
            autoFocus
            className="mobile-menu-close"
            aria-label="Fechar menu"
            onClick={() => menu.current?.close()}
          >
            <svg
              aria-hidden="true"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <nav aria-label="Navegação principal" className="mobile-menu-content">
          <ul className="mobile-menu-links">
            {navigation.map(([label, href]) => (
              <li key={href}>
                <Link href={href} onNavigate={() => menu.current?.close()}>
                  {label}
                  <Chevron />
                </Link>
              </li>
            ))}
          </ul>
          <section
            aria-labelledby="menu-setores"
            className="mobile-menu-sectors"
          >
            <h2 id="menu-setores">Setores do campus</h2>
            <ul>
              {sectors.map(({ slug, name }) => (
                <li key={slug}>
                  <Link
                    href={`/setores/${slug}`}
                    onNavigate={() => menu.current?.close()}
                  >
                    {name}
                    <Chevron />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </nav>
      </dialog>
    </div>
  );
}
