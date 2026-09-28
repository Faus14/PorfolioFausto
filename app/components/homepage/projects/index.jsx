"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiArrowUpRight, FiGithub, FiImage, FiMaximize2, FiX } from "react-icons/fi";
import { projectsPost } from "@/utils/data/projectsPost";
import { useTranslation } from "@/hooks/useTranslation";
import { formatMonth, yearOf } from "@/utils/format";
import SectionHeader from "../../helper/section-header";

const CATEGORY_KEY = {
  products: "projectsProducts",
  blockchain: "projectsBlockchain",
  academic: "projectsAcademic",
};

function ProjectLinks({ project, t, l, compact = false }) {
  const base = compact
    ? "inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink-muted transition-colors hover:border-line-strong hover:text-white"
    : "group/link inline-flex items-center gap-1.5 py-2.5 text-sm text-ink-muted transition-colors hover:text-white";
  const demoText = project.demoLabel === "prototype" ? t("viewPrototype") : t("visitSite");

  return (
    <>
      {project.demoUrl && (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={base}
          aria-label={compact ? `${demoText}: ${l(project.title)}` : undefined}
          title={compact ? demoText : undefined}
        >
          {!compact && demoText}
          <FiArrowUpRight
            className={compact ? "h-4 w-4" : "h-4 w-4 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"}
            aria-hidden="true"
          />
        </a>
      )}
      {project.urlGithub && (
        <a
          href={project.urlGithub}
          target="_blank"
          rel="noopener noreferrer"
          className={base}
          aria-label={compact ? `${t("sourceCode")} (GitHub): ${l(project.title)}` : undefined}
          title={compact ? t("sourceCode") : undefined}
        >
          <FiGithub className="h-4 w-4" aria-hidden="true" />
          {!compact && t("sourceCode")}
        </a>
      )}
    </>
  );
}

function FeaturedCard({ project, onPreview, t, l, language }) {
  const title = l(project.title);
  return (
    <article className="card reveal group flex flex-col overflow-hidden transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-line-strong">
      <button
        type="button"
        onClick={() => onPreview(project)}
        className="relative block aspect-[16/9] w-full overflow-hidden border-b border-line bg-canvas text-left"
        aria-label={`${t("enlargeScreenshot")}: ${title}`}
      >
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 560px"
          className="object-cover object-left-top transition-transform duration-700 ease-out group-hover:scale-[1.025]"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-canvas/60 via-transparent to-transparent" aria-hidden="true" />
        <span
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-md border border-white/15 bg-canvas/70 text-ink opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        >
          <FiMaximize2 className="h-3.5 w-3.5" />
        </span>
      </button>

      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-xs text-ink-faint">
          <span className="text-ink-muted">{t(CATEGORY_KEY[project.category])}</span>
          <span className="mx-2" aria-hidden="true">/</span>
          {formatMonth(project.date, language)}
        </p>
        <h3 className="mt-3 text-xl font-semibold tracking-tight text-white">
          {title}
          {project.subtitle && (
            <span className="font-normal text-ink-muted"> — {l(project.subtitle)}</span>
          )}
        </h3>
        <p className="mt-3 flex-1 text-pretty text-sm leading-relaxed text-ink-muted">{l(project.excerpt)}</p>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Stack">
          {project.technologies.map((tech) => (
            <li key={l(tech)} className="chip">
              {l(tech)}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-5 border-t border-line pt-1.5 -mb-2.5">
          <ProjectLinks project={project} t={t} l={l} />
        </div>
      </div>
    </article>
  );
}

function Projects() {
  const { t, l, language } = useTranslation();
  const [filter, setFilter] = useState("all");
  const [preview, setPreview] = useState(null);
  const dialogRef = useRef(null);

  const featured = useMemo(() => projectsPost.filter((p) => p.featured), []);
  const archive = useMemo(() => projectsPost.filter((p) => !p.featured), []);
  const archiveCategories = useMemo(
    () => ["all", ...new Set(archive.map((p) => p.category))],
    [archive]
  );
  const visibleArchive = filter === "all" ? archive : archive.filter((p) => p.category === filter);

  // Open after the content renders so autoFocus lands on the close button
  useEffect(() => {
    if (preview && !dialogRef.current?.open) dialogRef.current?.showModal();
  }, [preview]);

  const openPreview = (project) => setPreview(project);
  const closePreview = () => dialogRef.current?.close();

  return (
    <section id="projects" className="section border-t border-line" aria-labelledby="projects-heading">
      <div className="container-page">
        <SectionHeader
          index="05"
          eyebrow={t("projectsEyebrow")}
          title={t("projectsTitle")}
          description={t("projectsDescription")}
          id="projects-heading"
        />

        <div className="grid gap-5 md:grid-cols-2">
          {featured.map((project) => (
            <FeaturedCard
              key={project.id}
              project={project}
              onPreview={openPreview}
              t={t}
              l={l}
              language={language}
            />
          ))}
        </div>

        {/* Archive */}
        <div className="reveal mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="text-xl font-semibold tracking-tight text-white">{t("moreProjects")}</h3>
            <div role="group" aria-label={t("moreProjects")} className="flex gap-1 rounded-lg border border-line p-1">
              {archiveCategories.map((cat) => {
                const count = cat === "all" ? archive.length : archive.filter((p) => p.category === cat).length;
                const active = filter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(cat)}
                    className={`rounded-md px-3 py-2 text-xs transition-colors duration-200 ${
                      active ? "bg-white/10 text-white" : "text-ink-muted hover:text-white"
                    }`}
                  >
                    {cat === "all" ? t("all") : t(CATEGORY_KEY[cat])}
                    <span className="ml-1.5 font-mono text-[10px] text-ink-faint">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <ul className="mt-6 divide-y divide-line border-y border-line">
            {visibleArchive.map((project) => (
              <li
                key={project.id}
                className="group grid grid-cols-[3rem_1fr] gap-x-4 gap-y-3 py-5 transition-colors sm:grid-cols-[4rem_1fr_auto] sm:items-start"
              >
                <span className="pt-0.5 font-mono text-xs text-ink-faint">{yearOf(project.date)}</span>

                <div className="min-w-0">
                  <p className="font-medium text-ink transition-colors group-hover:text-white">
                    {l(project.title)}
                    {project.subtitle && <span className="font-normal text-ink-muted"> — {l(project.subtitle)}</span>}
                  </p>
                  <p className="mt-1 max-w-2xl text-pretty text-sm leading-relaxed text-ink-muted">
                    {l(project.excerpt)}
                  </p>
                  <p className="mt-2 font-mono text-[11px] text-ink-faint">{project.technologies.map(l).join(" · ")}</p>
                </div>

                <div className="col-start-2 flex items-center gap-2 sm:col-start-auto">
                  {project.image && (
                    <button
                      type="button"
                      onClick={() => openPreview(project)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line text-ink-muted transition-colors hover:border-line-strong hover:text-white"
                      aria-label={`${t("preview")}: ${l(project.title)}`}
                      title={t("preview")}
                    >
                      <FiImage className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )}
                  <ProjectLinks project={project} t={t} l={l} compact />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Screenshot preview */}
      <dialog
        ref={dialogRef}
        onClose={() => setPreview(null)}
        onClick={(e) => e.target === dialogRef.current && closePreview()}
        className="m-auto w-[min(1100px,calc(100vw-2rem))] max-w-none rounded-2xl border border-line bg-surface p-0 text-ink backdrop:bg-canvas/85 backdrop:backdrop-blur-sm open:animate-fade-in"
        aria-label={preview ? l(preview.title) : t("preview")}
      >
        {preview && (
          <div>
            <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
              <p className="truncate text-sm font-medium text-white">{l(preview.title)}</p>
              <button
                type="button"
                onClick={closePreview}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-line text-ink-muted transition-colors hover:text-white"
                aria-label={t("closePreview")}
                autoFocus
              >
                <FiX className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="max-h-[80vh] overflow-y-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview.image} alt={l(preview.title)} className="block h-auto w-full" />
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}

export default Projects;
