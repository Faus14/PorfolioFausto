"use client";

import { experiences } from "@/utils/data/experience";
import { useTranslation } from "@/hooks/useTranslation";
import { formatMonth } from "@/utils/format";
import SectionHeader from "../../helper/section-header";

export default function Experience() {
  const { t, l, language } = useTranslation();

  return (
    <section id="experience" className="section border-t border-line" aria-labelledby="experience-heading">
      <div className="container-page">
        <SectionHeader
          index="02"
          eyebrow={t("experienceEyebrow")}
          title={t("experienceTitle")}
          id="experience-heading"
        />

        <ol className="relative">
          {experiences.map((exp, idx) => {
            const isCurrent = !exp.end;
            const highlights = exp.highlights ? l(exp.highlights) : [];
            const period = `${formatMonth(exp.start, language)} — ${
              isCurrent ? t("present") : formatMonth(exp.end, language)
            }`;

            return (
              <li
                key={exp.id}
                className="reveal group relative grid pb-12 last:pb-0 md:grid-cols-[180px_1fr] md:gap-10"
              >
                {/* Period (desktop column) */}
                <div className="hidden pt-0.5 text-right font-mono text-xs leading-6 md:block">
                  <p className={isCurrent ? "text-accent" : "text-ink-muted"}>{period}</p>
                  {exp.duration && <p className="text-ink-faint">{l(exp.duration)}</p>}
                </div>

                <div className="relative pl-8 md:pl-10">
                  {/* Timeline rail + node */}
                  {idx < experiences.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-[calc(-3rem-3px)] left-[5px] top-[22px] w-px bg-line"
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-[6px] h-[11px] w-[11px] rounded-full border transition-colors duration-300 md:top-[8px] ${
                      isCurrent
                        ? "border-accent bg-accent shadow-[0_0_0_4px_rgba(22,242,179,0.15)]"
                        : "border-line-strong bg-canvas group-hover:border-ink-muted"
                    }`}
                  />

                  {/* Period (mobile) */}
                  <p className="mb-2 font-mono text-xs leading-6 md:hidden">
                    <span className={isCurrent ? "text-accent" : "text-ink-muted"}>{period}</span>
                    {exp.duration && <span className="text-ink-faint"> · {l(exp.duration)}</span>}
                  </p>

                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <h3 className="text-lg font-semibold tracking-tight text-white">{exp.title}</h3>
                    <span className="hidden text-ink-faint sm:inline" aria-hidden="true">·</span>
                    <span className="w-full text-base font-medium tracking-tight text-ink-muted sm:w-auto sm:text-lg">
                      <span className="sr-only">— </span>
                      {exp.company}
                    </span>
                    {isCurrent && (
                      <span className="ml-1 rounded-full border border-accent-line bg-accent-soft px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                        {t("current")}
                      </span>
                    )}
                  </div>

                  <p className="mt-2 max-w-2xl text-pretty leading-relaxed text-ink-muted">{l(exp.summary)}</p>

                  {highlights.length > 0 && (
                    <ul className="mt-4 max-w-2xl space-y-2">
                      {highlights.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                          <span className="mt-[0.7em] h-px w-3 shrink-0 bg-ink-faint" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.tools?.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Stack">
                      {exp.tools.map((tool) => (
                        <li key={tool} className="chip">
                          {tool}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
