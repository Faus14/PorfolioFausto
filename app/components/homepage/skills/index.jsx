// @flow strict
"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import Marquee from "react-fast-marquee";

/** =========================
 *  SELECCIÓN INICIAL (EDITÁ TRANQUI DESPUÉS)
 *  ========================= */
const DEV_SKILLS = [
  "Php",
  "laravel",
  "Python",
  "Django",
  "Angular",
  "JavaScript",
  "TypeScript",
  "HTML",
  "CSS",
];

const OPS_SKILLS = [
  "Docker",
  "Kubernetes",
  "Linux",
  "Nginx",
  "AWS",
  "MySQL",
  "postgresql",
  "Git",

];

function SkillCard({ label }) {
  const img = skillsImage(label);
  return (
    <div
      className="w-36 sm:w-40 md:w-44 min-w-[9rem] h-fit flex flex-col items-center justify-center transition-all duration-500 m-2.5 sm:m-3 rounded-xl group relative hover:scale-[1.06] focus-within:scale-[1.06] cursor-default outline-none"
      role="listitem"
      aria-label={label}
      tabIndex={0}
    >
      <div className="h-full w-full rounded-xl border border-[#1f223c] bg-gradient-to-br from-[#11152c]/95 to-[#0d1224]/95 group-hover:border-violet-500/60 group-focus:border-violet-500/60 transition-all duration-500">
        {/* Línea superior fina */}
        <div className="flex -translate-y-[1px] justify-center">
          <div className="w-3/4">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 p-4 sm:p-5">
          <div className="h-9 sm:h-10 md:h-11">
            <Image
              src={img?.src || "/icons/placeholder.svg"}
              alt={label}
              width={44}
              height={44}
              className="h-full w-auto rounded-lg"
              loading="lazy"
              quality={85}
              decoding="async"
            />
          </div>
          <p className="text-white text-sm sm:text-base md:text-lg font-medium tracking-tight">
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div id="skills" className="relative z-50 border-t my-10 md:my-16 lg:my-24 border-[#25213b]/30">
      <div className="flex justify-center -translate-y-[1px] mb-6">
        <div className="w-11/12 sm:w-4/5 max-w-3xl">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full animate-pulse" />
        </div>
      </div>

      <div className="flex justify-center my-6 sm:my-8">
        <div className="flex items-center">
          <span className="w-16 sm:w-24 h-[2px] bg-[#1a1443] animate-pulse" />
          <span className="bg-[#1a1443]/60 w-fit text-transparent p-2 px-5 text-lg sm:text-xl rounded-md mx-3 animate-pulse">
            Loading skills...
          </span>
          <span className="w-16 sm:w-24 h-[2px] bg-[#1a1443] animate-pulse" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-[#1f223c] bg-[#11152c] h-28 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const { t, language } = useTranslation();
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  // ✅ OPTIMIZADO: Sin skeleton loading, renderiza inmediatamente

  const devTitle = language === "es" ? "Developer" : "Developer";
  const opsTitle = language === "es" ? "DevOps & Infra" : "DevOps & Infra";

  return (
    <section
      id="skills"
      className="relative z-50 border-t my-10 md:my-16 lg:my-24 border-[#25213b]"
    >

      {/* Título */}
      <div className="flex justify-center my-6 md:my-8 lg:py-8">
        <div className="flex items-center group">
          <span className="w-16 sm:w-24 h-[2px] bg-gradient-to-r from-transparent to-[#1a1443] transition-colors duration-700 group-hover:to-violet-500/50" />
          <span className="bg-gradient-to-r from-[#1a1443] to-[#2a1f5f] w-fit text-white py-2.5 px-5 sm:py-3 sm:px-6 text-base sm:text-xl rounded-lg mx-3 shadow-lg border border-violet-500/20 font-semibold">
            {t("skillsTitle")}
          </span>
          <span className="w-16 sm:w-24 h-[2px] bg-gradient-to-l from-transparent to-[#1a1443] transition-colors duration-700 group-hover:to-violet-500/50" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        {/* ======= Developer row ======= */}
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-violet-200">
            {devTitle}
          </h3>
          <span className="text-[11px] sm:text-xs text-white/50">
            {DEV_SKILLS.length} skills
          </span>
        </div>

        {reducedMotion ? (
          <div role="list" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5 mb-6">
            {DEV_SKILLS.map((label) => (
              <SkillCard key={`dev-${label}`} label={label} />
            ))}
          </div>
        ) : (
          <div role="list" aria-label="Developer skills" className="w-full my-4">
            <Marquee
              gradient={false}
              speed={60}
              pauseOnHover
              pauseOnClick
              delay={0}
              play={!reducedMotion}
              direction="left"
            >
              {DEV_SKILLS.map((label) => (
                <SkillCard key={`dev-${label}`} label={label} />
              ))}
            </Marquee>
          </div>
        )}

        {/* ======= DevOps & Infra row ======= */}
        <div className="flex items-center justify-between mt-6 mb-2 sm:mb-3">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-violet-200">
            {opsTitle}
          </h3>
          <span className="text-[11px] sm:text-xs text-white/50">
            {OPS_SKILLS.length} skills
          </span>
        </div>

        {reducedMotion ? (
          <div role="list" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
            {OPS_SKILLS.map((label) => (
              <SkillCard key={`ops-${label}`} label={label} />
            ))}
          </div>
        ) : (
          <div role="list" aria-label="DevOps & Infra skills" className="w-full my-2 sm:my-3 md:my-4">
            <Marquee
              gradient={false}
              speed={55}
              pauseOnHover
              pauseOnClick
              delay={0}
              play={!reducedMotion}
              direction="right"
            >
              {OPS_SKILLS.map((label) => (
                <SkillCard key={`ops-${label}`} label={label} />
              ))}
            </Marquee>
          </div>
        )}

        {/* Contador global */}
        <div className="flex justify-center mt-8">
          <span className="text-xs sm:text-sm text-gray-400">
            {`Total: ${DEV_SKILLS.length + OPS_SKILLS.length} skills`}
          </span>
        </div>
      </div>
    </section>
  );
}
