import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MobileNav } from "@/components/mobile-nav";
import { campusDirectory } from "@/content/campus-directory";
import "@fontsource/poppins/latin.css";
import "@fontsource/poppins/latin-ext.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manual de Sobrevivência do Estudante | CEUMA",
  description: "Encontre orientações para resolver necessidades no campus Renascença.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="site-header">
      <div className="header-inner mx-auto max-w-6xl px-6 md:px-5">
        <Link href="/" aria-label="Universidade CEUMA — início"><Image src="/images/ceuma-logo-white.png" alt="Universidade CEUMA" width={151} height={34} priority /></Link>
        <nav className="desktop-nav" aria-label="Navegação principal"><Link href="/">Início</Link><Link href="/#necessidades">Explorar serviços</Link><Link href="/mapa">Mapa do campus</Link><Link href="/buscar" className="header-search">Buscar orientação <span aria-hidden="true">↗</span></Link></nav>
        <span className="campus-label">Campus<br /><strong>Renascença</strong></span>
        <MobileNav sectors={campusDirectory.map(({ slug, name }) => ({ slug, name }))} />
      </div>
    </header>
    <div id="conteudo" tabIndex={-1}>{children}</div>
    <footer className="site-footer"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 md:px-5"><p>Manual de Sobrevivência do Estudante<span>Universidade CEUMA · Campus Renascença</span></p><Link href="/#necessidades">Encontrar uma orientação ↑</Link></div></footer>
  </body></html>;
}
