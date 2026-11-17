"use client";

import Link from "next/link";
import { useRef } from "react";

export function MobileNav() {
  const menu = useRef<HTMLDetailsElement>(null);
  return <details ref={menu} className="mobile-nav" onKeyDown={(event) => {
    if (event.key === "Escape" && menu.current) { menu.current.open = false; menu.current.querySelector("summary")?.focus(); }
  }}>
    <summary>Menu <span aria-hidden="true">☰</span></summary>
    <nav aria-label="Navegação principal" onClick={(event) => {
      if ((event.target as Element).closest("a") && menu.current) menu.current.open = false;
    }}>
      <Link href="/">Início</Link><Link href="/#necessidades">Explorar serviços</Link><Link href="/buscar">Buscar orientação ↗</Link><p>Campus Renascença</p>
    </nav>
  </details>;
}
