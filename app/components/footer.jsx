"use client";

import { FiArrowUpRight } from "react-icons/fi";
import { personalData } from "@/utils/data/personal-data";
import { useTranslation } from "@/hooks/useTranslation";

const SECTIONS = ["about", "experience", "skills", "education", "projects", "contact"];

function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const external = [
    { label: "GitHub", href: personalData.github },
    { label: "LinkedIn", href: personalData.linkedIn },
    { label: t("resume"), href: personalData.resume },
    { label: "Email", href: `mailto:${personalData.email}`, internal: true },
  ];

  return (
    <footer className="border-t border-line">
      <div className="container-page grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <a href="/#main" className="inline-flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg border border-accent-line bg-accent-soft font-mono text-xs font-medium text-accent">
              FS
            </span>
            <span className="font-semibold tracking-tight text-white">{personalData.name}</span>
          </a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">{personalData.designation}</p>
          <p className="mt-1 text-sm text-ink-faint">{personalData.address}</p>
        </div>

        <nav aria-label={t("navigation")} className="lg:col-span-3">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">{t("navigation")}</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm sm:grid-cols-1">
            {SECTIONS.map((id) => (
              <li key={id}>
                <a href={`/#${id}`} className="text-ink-muted transition-colors hover:text-white">
                  {t(id)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">{t("elsewhere")}</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm sm:grid-cols-1">
            {external.map(({ label, href, internal }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  className="group inline-flex items-center gap-1 text-ink-muted transition-colors hover:text-white"
                >
                  {label}
                  {!internal && (
                    <FiArrowUpRight
                      className="h-3.5 w-3.5 text-ink-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 font-mono text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {personalData.name}</p>
          <p>{t("footerNote")}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
