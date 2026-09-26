"use client";

import { FiBookOpen, FiAward } from "react-icons/fi";
import { courses, primaryEducation } from "@/utils/data/educations";
import { useTranslation } from "@/hooks/useTranslation";
import SectionHeader from "../../helper/section-header";

const KIND_ICON = { degree: FiAward, teaching: FiBookOpen };

function Education() {
  const { t, l } = useTranslation();

  return (
    <section id="education" className="section border-t border-line" aria-labelledby="education-heading">
      <div className="container-page">
        <SectionHeader
          index="04"
          eyebrow={t("educationEyebrow")}
          title={t("educationTitle")}
          id="education-heading"
        />

        <div className="grid gap-4 md:grid-cols-2">
          {primaryEducation.map((item) => {
            const Icon = KIND_ICON[item.id] ?? FiAward;
            return (
              <article
                key={item.id}
                className="card reveal group relative flex flex-col overflow-hidden p-6 transition-colors duration-300 hover:border-line-strong sm:p-8"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">
                    <Icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    {l(item.kind)}
                  </span>
                  <span
                    className={`font-mono text-xs ${item.current ? "text-accent" : "text-ink-muted"}`}
                  >
                    {l(item.period)}
                  </span>
                </div>

                <h3 className="mt-6 text-balance text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {l(item.title)}
                </h3>
                <p className="mt-2 text-ink">{item.institution}</p>
                <p className="text-sm text-ink-muted">{l(item.campus)}</p>

                {item.description && (
                  <p className="mt-5 border-t border-line pt-5 text-sm leading-relaxed text-ink-muted">
                    {l(item.description)}
                  </p>
                )}
              </article>
            );
          })}
        </div>

        <div className="reveal mt-12">
          <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">{t("courses")}</h3>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {courses.map((course) => (
              <li
                key={course.id}
                className="grid grid-cols-[3.5rem_1fr] items-baseline gap-x-4 gap-y-1 py-4 sm:grid-cols-[4rem_1fr_auto]"
              >
                <span className="font-mono text-xs text-ink-faint">{course.year}</span>
                <div>
                  <p className="text-sm font-medium text-ink">{l(course.title)}</p>
                  <p className="text-sm text-ink-muted">
                    {course.institution}
                    {course.detail && <span className="text-ink-faint"> · {l(course.detail)}</span>}
                  </p>
                </div>
                <span className="col-start-2 font-mono text-xs text-ink-faint sm:col-start-auto">
                  {course.hours}
                  {t("hours")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Education;
