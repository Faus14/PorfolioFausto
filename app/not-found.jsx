"use client";

import { FiArrowLeft } from "react-icons/fi";
import { useTranslation } from "@/hooks/useTranslation";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <section className="container-page flex min-h-[80svh] flex-col items-start justify-center pt-24">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">{t("notFoundTitle")}</h1>
      <p className="mt-4 max-w-md text-ink-muted">{t("notFoundText")}</p>
      <a href="/" className="btn-secondary group mt-8">
        <FiArrowLeft className="transition-transform duration-200 group-hover:-translate-x-0.5" aria-hidden="true" />
        {t("goHome")}
      </a>
    </section>
  );
}
