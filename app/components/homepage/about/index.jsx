"use client";

import Image from "next/image";
import { personalData } from "@/utils/data/personal-data";
import { useTranslation } from "@/hooks/useTranslation";
import SectionHeader from "../../helper/section-header";

function AboutSection() {
  const { t, l } = useTranslation();
  const paragraphs = l(personalData.about);
  const focus = l(personalData.focus);

  return (
    <section id="about" className="section border-t border-line" aria-labelledby="about-heading">
      <div className="container-page">
        <SectionHeader index="01" eyebrow={t("aboutEyebrow")} title={t("aboutTitle")} id="about-heading" />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="reveal space-y-5 text-pretty text-base leading-[1.75] text-ink-muted sm:text-[17px] lg:col-span-7">
            {paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "text-ink" : undefined}>
                {p}
              </p>
            ))}

            <div className="pt-6">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink-faint">{t("focusAreas")}</p>
              <ul className="mt-4 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
                {focus.map((item, i) => (
                  <li key={item} className="flex items-center gap-3 bg-canvas px-4 py-3.5 text-sm text-ink">
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="reveal lg:col-span-5">
            <figure className="group relative mx-auto max-w-sm lg:ml-auto lg:mr-0">
              <div
                className="absolute -inset-px rounded-2xl bg-gradient-to-b from-accent/30 via-white/5 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
              <div className="relative overflow-hidden rounded-2xl bg-surface">
                <Image
                  src={personalData.profile}
                  width={640}
                  height={577}
                  alt={personalData.name}
                  sizes="(max-width: 1024px) 384px, 400px"
                  className="aspect-[4/4.2] w-full object-cover grayscale-[15%] transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.02] group-hover:grayscale-0"
                />
              </div>
              <figcaption className="relative mt-4 flex items-center justify-between font-mono text-xs text-ink-faint">
                <span>{personalData.name}</span>
                <span>{personalData.address}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
