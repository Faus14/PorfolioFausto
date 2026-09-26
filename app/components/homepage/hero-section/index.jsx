"use client";

import { personalData } from "@/utils/data/personal-data";
import { useTranslation } from "@/hooks/useTranslation";
import { FiArrowRight, FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const socialLinks = [
  { label: "GitHub", href: personalData.github, icon: FiGithub, external: true },
  { label: "LinkedIn", href: personalData.linkedIn, icon: FiLinkedin, external: true },
  { label: "Email", href: `mailto:${personalData.email}`, icon: FiMail },
];

// Small YAML-styled card with verified facts only
const FOCUS = ["infrastructure", "automation", "cloud", "observability"];

function ProfileCard() {
  const rows = [
    ["name", `"${personalData.name}"`],
    ["role", `"${personalData.designation}"`],
    ["current", `"${personalData.current.role} @ ${personalData.current.company}"`],
    ["teaching", `"${personalData.teaching}"`],
    ["location", `"${personalData.address}"`],
  ];

  return (
    <div
      className="animate-fade-up rounded-2xl border border-line bg-surface/70 shadow-[0_24px_80px_-32px_rgba(22,242,179,0.18)] [animation-delay:250ms]"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="font-mono text-xs text-ink-muted">~/profile.yaml</span>
        <span className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] uppercase text-ink-faint">
          yaml
        </span>
      </div>
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-7 xl:text-[13px]">
        <code>
          {rows.map(([key, value], i) => (
            <div key={key} className="flex">
              <span className="w-6 shrink-0 select-none text-right text-ink-faint/60">{i + 1}</span>
              <span className="pl-4">
                <span className="text-violet-soft">{key}</span>
                <span className="text-ink-faint">: </span>
                <span className="text-accent">{value}</span>
              </span>
            </div>
          ))}
          <div className="flex">
            <span className="w-6 shrink-0 select-none text-right text-ink-faint/60">{rows.length + 1}</span>
            <span className="pl-4">
              <span className="text-violet-soft">focus</span>
              <span className="text-ink-faint">:</span>
            </span>
          </div>
          {FOCUS.map((item, i) => (
            <div key={item} className="flex">
              <span className="w-6 shrink-0 select-none text-right text-ink-faint/60">{rows.length + 2 + i}</span>
              <span className="pl-8">
                <span className="text-ink-faint">- </span>
                <span className="text-ink">{item}</span>
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}

function HeroSection() {
  const { t, l } = useTranslation();

  return (
    <section className="relative isolate overflow-hidden pb-20 pt-32 sm:pb-24 sm:pt-40 lg:pb-32 lg:pt-44" aria-labelledby="hero-heading">
      <div className="bg-grid pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 left-[-10%] -z-10 h-[520px] w-[720px] rounded-full bg-accent/[0.07] blur-[120px]"
        aria-hidden="true"
      />

      <div className="container-page grid items-center gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] py-1 pl-2 pr-3 text-xs text-ink-muted">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inset-0 rounded-full bg-accent/40 blur-[3px]" />
              <span className="relative h-2 w-2 rounded-full bg-accent" />
            </span>
            {t("currentlyAt")} {personalData.current.role} {t("at")}{" "}
            <span className="text-white">{personalData.current.company}</span>
          </p>

          <h1
            id="hero-heading"
            className="animate-fade-up mt-6 text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.035em] text-white [animation-delay:60ms] sm:text-6xl lg:text-7xl"
          >
            {personalData.name}
          </h1>

          <p className="animate-fade-up mt-4 text-lg font-medium tracking-tight text-ink sm:text-xl [animation-delay:120ms]">
            {personalData.roles[0]}
            <span className="mx-2 text-accent" aria-hidden="true">·</span>
            <span className="sr-only"> and </span>
            {personalData.roles[1]}
          </p>

          <p className="animate-fade-up mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink-muted sm:text-[17px] [animation-delay:180ms]">
            {l(personalData.tagline)}
          </p>

          <div className="animate-fade-up mt-9 flex flex-wrap items-center gap-3 [animation-delay:240ms]">
            <a href="#contact" className="btn-primary group">
              {t("getInTouch")}
              <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a href={personalData.resume} target="_blank" rel="noopener noreferrer" className="btn-secondary group">
              {t("resume")}
              <FiArrowUpRight
                className="text-ink-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                aria-hidden="true"
              />
            </a>
          </div>

          <ul className="animate-fade-up mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 [animation-delay:300ms]">
            {socialLinks.map(({ label, href, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-white"
                >
                  <Icon className="h-4 w-4 text-ink-faint transition-colors group-hover:text-accent" aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:block">
          <ProfileCard />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
