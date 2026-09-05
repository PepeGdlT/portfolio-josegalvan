"use client";

import { ArrowLeft, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { PortfolioCopy } from "@/data/portfolio";
import LanguageSwitcher from "./language-switcher";

type SiteHeaderProps = {
  content: PortfolioCopy;
  caseStudy?: boolean;
};

export default function SiteHeader({ content, caseStudy = false }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    if (caseStudy) return;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: "-15% 0px -60% 0px" });
    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [caseStudy]);
  useEffect(() => {
    if (!open) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); menuButton.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", escape);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", escape);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);
  const items = [
    ["experience", content.nav.experience],
    ["projects", content.nav.projects],
    ["research", content.nav.research],
    ["stack", "Stack"],
    ["background", content.nav.background],
    ["contact", content.nav.contact],
  ] as const;

  return (
    <header className="site-header" ref={header}>
      <div className="header-inner">
        <Link className="wordmark" href={caseStudy ? "/" : "#home"} aria-label="José Galván — home">
          <span>JG</span>
          <span className="wordmark-name">José Galván</span>
        </Link>

        {caseStudy ? (
          <div className="header-actions">
            <Link className="back-link" href="/#projects">
              <ArrowLeft aria-hidden="true" size={17} />
              {content.common.backHome}
            </Link>
            <LanguageSwitcher />
          </div>
        ) : (
          <>
            <nav id="primary-nav" className={`site-nav ${open ? "is-open" : ""}`} aria-label={content.languageName === "Español" ? "Navegación principal" : "Primary navigation"}>
              {items.map(([id, label]) => (
                <a key={id} href={`#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => setOpen(false)}>
                  {label}
                </a>
              ))}
              <div className="mobile-language"><LanguageSwitcher /></div>
            </nav>
            <div className="header-actions desktop-actions">
              <LanguageSwitcher />
              <a className="header-contact" href="#contact">{content.nav.contact}</a>
            </div>
            <button
              className="menu-toggle"
              ref={menuButton}
              type="button"
              aria-label={content.languageName === "Español" ? (open ? "Cerrar menú" : "Abrir menú") : (open ? "Close navigation" : "Open navigation")}
              aria-expanded={open}
              aria-controls="primary-nav"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </button>
          </>
        )}
      </div>
    </header>
  );
}
