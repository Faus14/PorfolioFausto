"use client";

import { useState, useMemo, useCallback, memo } from "react";
import { experiences } from "@/utils/data/experience";
import { useTranslation } from "@/hooks/useTranslation";
import {
  BsPersonWorkspace,
  BsBuildingsFill,
  BsCalendar3,
  BsChevronDown,
  BsAward,
  BsGear,
  BsLightbulb,
} from "react-icons/bs";
import dynamic from "next/dynamic";

// ✅ OPTIMIZADO: Lazy load del GlowCard con loading state
const GlowCard = dynamic(() => import("../../helper/glow-card"), { 
  ssr: false,
  loading: () => <div className="min-h-[100px]" />
});

// ✅ OPTIMIZADO: Componente memoizado para cada item de experiencia
const ExperienceItem = memo(({ exp, isOpen, toggle, onHeaderKeyDown, getExperienceIcon, formatDuration, language }) => {
  const title = typeof exp.title === "object" ? exp.title[language] : exp.title;
  const description = typeof exp.description === "object" ? exp.description[language] : exp.description;
  const company = exp.company;

  return (
    <div className="relative pl-14 sm:pl-16 experience-card">
      {/* Punto timeline - ✅ OPTIMIZADO: Animación con CSS hover */}
      <div className="absolute left-3.5 sm:left-6 top-5 sm:top-6">
        <div
          className={`w-7 h-7 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r transition-all duration-300 flex items-center justify-center hover:scale-110 ${
            isOpen
              ? "from-violet-400 to-pink-400 shadow-lg shadow-violet-400/30 scale-110"
              : "from-violet-500 to-pink-500 shadow-md shadow-violet-500/20"
          }`}
          style={{ willChange: isOpen ? 'auto' : 'transform' }}
        >
          <div className="w-2 h-2 bg-white rounded-full" />
        </div>
      </div>

      {/* Card - ✅ OPTIMIZADO: Sin prop innecesarios */}
      <GlowCard identifier={`experience-${exp.id}`}>
        <div className="experience-card-content">
          {/* Header - ✅ OPTIMIZADO */}
          <button
            onClick={() => toggle(exp.id)}
            onKeyDown={(e) => onHeaderKeyDown(e, exp.id)}
            className="w-full text-left p-4 sm:p-6 group relative overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 rounded-2xl hover:bg-gradient-to-r hover:from-violet-500/5 hover:to-pink-500/5 transition-colors duration-300"
            aria-expanded={isOpen}
            aria-controls={`exp-panel-${exp.id}`}
            id={`exp-header-${exp.id}`}
          >
            <div className="relative flex items-start gap-3 sm:gap-4">
              {/* Icono - ✅ OPTIMIZADO: hover con CSS puro */}
              <div className="mt-1 shrink-0 p-2 rounded-lg transition-all duration-300 bg-white/5 group-hover:bg-gradient-to-r group-hover:from-violet-500/20 group-hover:to-pink-500/20 group-hover:shadow-lg">
                {getExperienceIcon(exp.type)}
              </div>

              {/* Contenido */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Título */}
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-2">
                      <span className="bg-gradient-to-r from-pink-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
                        {title}
                      </span>
                    </h3>

                    {/* Empresa + duración */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-5 text-xs sm:text-sm">
                      <div className="flex items-center gap-2">
                        <BsBuildingsFill className="text-emerald-400 shrink-0" size={14} />
                        <span className="text-white/70 font-medium">
                          {language === "es" ? "Empresa:" : "Company:"}
                        </span>
                        <span className="text-emerald-400 font-semibold">{company}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <BsCalendar3 className="text-violet-400 shrink-0" size={14} />
                        <span className="text-violet-400 font-medium">
                          {formatDuration(exp)}
                        </span>
                      </div>
                    </div>

                    {/* Insignia destacado */}
                    {exp.featured && (
                      <div className="mt-2 sm:mt-3">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] sm:text-xs font-medium bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30 rounded-full">
                          <BsAward size={12} />
                          {language === "es" ? "Destacado" : "Featured"}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Botón expandir */}
                  <div
                    className={`mt-1.5 sm:mt-2 p-2 rounded-lg border border-white/10 bg-white/5 transition-all duration-300 ${
                      isOpen
                        ? "rotate-180 bg-violet-500/10 border-violet-500/30"
                        : "hover:bg-white/10"
                    }`}
                    aria-hidden="true"
                  >
                    <BsChevronDown className="w-4 h-4 text-white/70" />
                  </div>
                </div>
              </div>
            </div>
          </button>

          {/* Contenido expandible - ✅ SIN LAG: Grid transition optimizado */}
          {/* Contenido expandible - ✅ SIN LAG: Grid transition technique */}
          <div
            id={`exp-panel-${exp.id}`}
            role="region"
            aria-labelledby={`exp-header-${exp.id}`}
            className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
              isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-3 sm:space-y-4">
                {/* Descripción */}
                <div className="p-3 sm:p-4 bg-gradient-to-r from-violet-500/5 to-transparent rounded-lg border-l-2 border-violet-500/30">
                  <p className="text-[13px] sm:text-sm md:text-base text-violet-100/90 leading-relaxed font-light">
                    {description}
                  </p>
                </div>

                {/* Tecnologías */}
                {exp.tools && exp.tools.length > 0 && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-emerald-500/20 rounded-md">
                        <BsGear className="text-emerald-400" size={14} />
                      </div>
                      <span className="text-white font-semibold text-sm">
                        {language === "es" ? "Tecnologías y Herramientas" : "Technologies & Tools"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {exp.tools.map((tool, i) => (
                        <span
                          key={`${exp.id}-tool-${i}`}
                          className="px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-medium bg-gradient-to-r from-violet-600/20 to-pink-600/20 border border-violet-500/30 rounded-lg text-violet-200 hover:from-violet-500/30 hover:to-pink-500/30 hover:border-violet-400/50 transition-all duration-300 cursor-default"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Logros */}
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="space-y-2.5 sm:space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-amber-500/20 rounded-md">
                        <BsAward className="text-amber-400" size={14} />
                      </div>
                      <span className="text-white font-semibold text-sm">
                        {language === "es" ? "Logros Clave" : "Key Achievements"}
                      </span>
                    </div>

                    <ul className="space-y-1.5 sm:space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-[13px] sm:text-sm text-violet-100/80"
                        >
                          <span className="text-emerald-400 mt-1.5">•</span>
                          <span>
                            {typeof achievement === "object" ? achievement[language] : achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </GlowCard>
    </div>
  );
});

ExperienceItem.displayName = 'ExperienceItem';

export default function Experience() {
  const { t, language } = useTranslation();
  const [openId, setOpenId] = useState(experiences?.[0]?.id ?? null);
  
  // ✅ OPTIMIZADO: Removido hover state que causaba re-renders constantes
  // El hover ahora se maneja con CSS puro

  const items = useMemo(() => {
    // no mutar el original
    return [...experiences].sort((a, b) => {
      const dateA = new Date(a.startDate || "1900-01-01");
      const dateB = new Date(b.startDate || "1900-01-01");
      return dateB.getTime() - dateA.getTime();
    });
  }, []);

  // ✅ OPTIMIZADO: useCallback para evitar recrear funciones
  const toggle = useCallback((id) => {
    setOpenId((curr) => (curr === id ? null : id));
  }, []);

  const onHeaderKeyDown = useCallback((e, id) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(id);
    }
  }, [toggle]);

  // ✅ OPTIMIZADO: useCallback para evitar recrear funciones
  const formatDuration = useCallback((exp) => {
    if (typeof exp.duration === "object") {
      return exp.duration[language];
    }
    return exp.duration;
  }, [language]);

  const getExperienceIcon = useCallback((type) => {
    switch (type) {
      case "leadership":
        return <BsAward className="text-amber-400" size={20} />;
      case "technical":
        return <BsGear className="text-blue-400" size={20} />;
      case "creative":
        return <BsLightbulb className="text-yellow-400" size={20} />;
      default:
        return <BsPersonWorkspace className="text-violet-400" size={20} />;
    }
  }, []);

  return (
    <section
      id="experience"
      className="relative z-50 border-t my-10 md:my-16 lg:my-24 border-[#25213b]"
    >

      {/* Título */}
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center group">
          <span className="w-12 sm:w-20 h-[2px] bg-gradient-to-r from-transparent to-[#1a1443] transition-all duration-700 group-hover:to-violet-500/50" />
          <div className="bg-gradient-to-r from-[#1a1443] to-[#2a1f5f] w-fit text-white py-2.5 px-5 sm:py-3 sm:px-6 text-base sm:text-xl rounded-lg mx-3 shadow-lg border border-violet-500/20 transition-all duration-300 hover:shadow-violet-500/25 hover:border-violet-500/40">
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent font-semibold">
              {t("experienceTitle")}
            </span>
          </div>
          <span className="w-12 sm:w-20 h-[2px] bg-gradient-to-l from-transparent to-[#1a1443] transition-all duration-700 group-hover:to-violet-500/50" />
        </div>
      </div>

      {/* Divisor */}
      <div className="flex justify-center -translate-y-[1px] mb-6 md:mb-8">
        <div className="w-11/12 sm:w-4/5 max-w-2xl">
          <div className="h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full opacity-60" />
          <div className="h-[1px] bg-gradient-to-r from-transparent via-pink-400 to-transparent w-full -mt-[1px] opacity-40" />
        </div>
      </div>

      {/* Timeline */}
      <div className="mx-auto max-w-6xl px-3 sm:px-6">
        <div className="relative">
          {/* Línea timeline (ajustada para mobile) */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-[3px] sm:w-0.5 bg-gradient-to-b from-violet-500 via-pink-500 to-violet-500 opacity-30 rounded-full" />
          <div className="absolute left-[26px] sm:left-[31px] top-0 bottom-0 w-px bg-gradient-to-b from-violet-400/60 to-pink-400/60 opacity-20" />

          <div className="space-y-6 md:space-y-8">
            {items.map((exp) => (
              <ExperienceItem
                key={exp.id}
                exp={exp}
                isOpen={openId === exp.id}
                toggle={toggle}
                onHeaderKeyDown={onHeaderKeyDown}
                getExperienceIcon={getExperienceIcon}
                formatDuration={formatDuration}
                language={language}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
