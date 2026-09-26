"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";
import { personalData } from "@/utils/data/personal-data";

const SECTIONS = ["about", "experience", "skills", "education", "projects", "contact"];

function LanguageSwitch({ className = "" }) {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <div
      role="group"
      aria-label={t("switchLanguage")}
      className={`inline-flex items-center rounded-lg border border-line p-0.5 font-mono text-[11px] ${className}`}
    >
      {["en", "es"].map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => changeLanguage(lang)}
          aria-pressed={language === lang}
          className={`rounded-md px-2 py-1 uppercase transition-colors duration-200 ${
            language === lang ? "bg-white/10 text-white" : "text-ink-faint hover:text-ink"
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  );
}

function Navbar() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section crossing the upper part of the viewport
  useEffect(() => {
    const elements = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -65% 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e) => e.key === "Escape" && setIsMenuOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isMenuOpen]);

  const navItems = SECTIONS.filter((id) => id !== "contact").map((id) => ({
    id,
    href: `/#${id}`,
    label: t(id),
  }));

  const solid = isScrolled || isMenuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        isMenuOpen
          ? "border-b border-line bg-canvas"
          : solid
            ? "border-b border-line bg-canvas/80 backdrop-blur-md supports-[backdrop-filter]:bg-canvas/70"
            : "border-b border-transparent"
      }`}
    >
      <nav className="container-page flex h-16 items-center justify-between" aria-label="Main">
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="group flex items-center gap-2.5"
        >
          <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-lg border border-accent-line bg-accent-soft font-mono text-xs font-medium text-accent transition-colors duration-200 group-hover:bg-accent group-hover:text-canvas">
            FS
          </span>
          <span className="text-[15px] font-semibold tracking-tight text-white">Fausto Saludas</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          <ul className="flex items-center">
            {navItems.map((item) => {
              const active = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={active ? "true" : undefined}
                    className={`relative rounded-md px-3 py-2 text-sm transition-colors duration-200 ${
                      active ? "text-white" : "text-ink-muted hover:text-white"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-3 -bottom-px h-px bg-accent transition-opacity duration-300 ${
                        active ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
          <span className="mx-3 h-5 w-px bg-line" aria-hidden="true" />
          <LanguageSwitch />
          <a href="/#contact" className="btn-secondary ml-2 py-1.5">
            {t("contact")}
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitch />
          <button
            type="button"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-ink transition-colors hover:bg-white/5"
          >
            <span className="relative block h-3 w-4" aria-hidden="true">
              <span
                className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-300 ${
                  isMenuOpen ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 block h-px w-4 bg-current transition-opacity duration-200 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-4 bg-current transition-transform duration-300 ${
                  isMenuOpen ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`h-[calc(100svh-4rem)] overflow-y-auto border-line bg-canvas transition-[max-height,opacity] duration-300 ease-out lg:hidden ${
          isMenuOpen ? "max-h-[100svh] border-t opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
        inert={!isMenuOpen}
      >
        <ul className="container-page flex flex-col py-3">
          {SECTIONS.map((id, i) => (
            <li key={id}>
              <a
                href={`/#${id}`}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center justify-between border-b border-line py-4 text-lg transition-colors ${
                  activeSection === id ? "text-white" : "text-ink-muted"
                }`}
              >
                <span>{t(id)}</span>
                <span className="font-mono text-xs text-ink-faint">0{i + 1}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="container-page flex items-center gap-6 pb-8 pt-4 text-sm text-ink-muted">
          <a href={personalData.github} target="_blank" rel="noopener noreferrer" className="hover:text-white">
            GitHub
          </a>
          <a href={personalData.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-white">
            LinkedIn
          </a>
          <a href={`mailto:${personalData.email}`} className="hover:text-white">
            Email
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
