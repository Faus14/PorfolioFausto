"use client";

import { useMemo, useState } from "react";
import { experiences } from "@/utils/data/experience";
import { useTranslation } from "@/hooks/useTranslation";
import {
  BsPersonWorkspace,
  BsBuildingsFill,
  BsCalendar3,
  BsAward,
  BsGear,
  BsLightbulb,
} from "react-icons/bs";

export default function Experience() {
  const { t, language } = useTranslation();

  const items = useMemo(() => {
    return [...experiences].sort((a, b) => {
      const dateA = new Date(a.startDate || "1900-01-01");
      const dateB = new Date(b.startDate || "1900-01-01");
      return dateB.getTime() - dateA.getTime();
    });
  }, []);

  const getExperienceIcon = (type) => {
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
  };

  const formatDuration = (exp) => {
    if (typeof exp.duration === "object") {
      return exp.duration[language];
    }
    return exp.duration;
  };

  return (
    <section
      id="experience"
      className="relative z-50 border-t my-10 md:my-16 lg:my-24 border-[#25213b]"
    >
      {/* Title */}
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

      {/* Divider */}
      <div className="flex justify-center -translate-y-[1px] mb-8 md:mb-12">
        <div className="w-11/12 sm:w-4/5 max-w-2xl">
          <div className="h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full opacity-60" />
          <div className="h-[1px] bg-gradient-to-r from-transparent via-pink-400 to-transparent w-full -mt-[1px] opacity-40" />
        </div>
      </div>

      {/* Timeline horizontal */}
      <div className="mx-auto max-w-[95%] 2xl:max-w-[90%] px-3 sm:px-6">
        {/* Línea horizontal del timeline */}
        <div className="relative mb-8 sm:mb-12">
          <div className="absolute left-0 right-0 top-6 h-[3px] bg-gradient-to-r from-violet-500 via-pink-500 to-violet-500 opacity-30 rounded-full" />
          <div className="absolute left-0 right-0 top-[25px] h-px bg-gradient-to-r from-violet-400/60 to-pink-400/60 opacity-20" />
          
          {/* Cards en fila - Scroll manual suave */}
          <div className="relative flex gap-4 sm:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth">
            <style jsx>{`
              div::-webkit-scrollbar {
                height: 8px;
              }
              div::-webkit-scrollbar-track {
                background: transparent;
              }
              div::-webkit-scrollbar-thumb {
                background: rgba(139, 92, 246, 0.3);
                border-radius: 4px;
              }
              div::-webkit-scrollbar-thumb:hover {
                background: rgba(139, 92, 246, 0.5);
              }
            `}</style>
            {items.map((exp, idx) => {
              const title = typeof exp.title === "object" ? exp.title[language] : exp.title;
              const description = typeof exp.description === "object" ? exp.description[language] : exp.description;
              const company = exp.company;
              const [isExpanded, setIsExpanded] = useState(false);

              return (
                <div key={exp.id} className="relative flex-shrink-0 w-[320px] sm:w-[380px] pt-20 snap-center">
                  {/* Punto en timeline */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-3 z-10">
                    <div
                      className={`w-10 h-10 rounded-full bg-gradient-to-br transition-all duration-300 flex items-center justify-center shadow-lg ${
                        idx === 0
                          ? "from-violet-400 to-pink-400 shadow-violet-400/30 scale-110"
                          : "from-violet-500 to-pink-500 shadow-violet-500/20"
                      }`}
                    >
                      <span className="text-sm">{getExperienceIcon(exp.type)}</span>
                    </div>
                    {idx === 0 && (
                      <div className="absolute inset-0 w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 opacity-20 animate-ping" />
                    )}
                  </div>

                  {/* Línea vertical que conecta punto con card */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-12 w-0.5 h-8 bg-gradient-to-b from-violet-500/50 to-transparent" />

                  {/* Card */}
                  <div className="group relative bg-gradient-to-br from-[#0d1224]/90 to-[#0a0d1a]/90 border border-[#1b2c68a0] rounded-2xl p-5 hover:border-violet-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1 h-full">
                    {/* Badge si es featured */}
                    {exp.featured && (
                      <div className="absolute -top-2 -right-2 z-20">
                        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 whitespace-nowrap">
                          <BsAward size={12} />
                          {language === "es" ? "Destacado" : "Featured"}
                        </div>
                      </div>
                    )}

                    {/* Header */}
                    <div className="mb-3">
                      <h3 className="text-lg font-bold mb-2 bg-gradient-to-r from-pink-400 via-violet-400 to-pink-400 bg-clip-text text-transparent leading-tight">
                        {title}
                      </h3>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-1.5">
                          <BsBuildingsFill className="text-emerald-400 shrink-0" size={12} />
                          <span className="text-emerald-400 font-semibold truncate">{company}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <BsCalendar3 className="text-violet-400 shrink-0" size={12} />
                          <span className="text-violet-400 font-medium">
                            {formatDuration(exp)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description - Expandible */}
                    <div 
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="cursor-pointer mb-3"
                    >
                      <p className={`text-xs text-violet-100/80 leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
                        {description}
                      </p>
                      {description.length > 150 && (
                        <button className="text-[10px] text-violet-400 hover:text-violet-300 mt-1 font-medium">
                          {isExpanded 
                            ? (language === "es" ? "Ver menos" : "Show less")
                            : (language === "es" ? "Ver más" : "Read more")
                          }
                        </button>
                      )}
                    </div>

                    {/* Technologies - TODAS mostradas */}
                    {exp.tools && exp.tools.length > 0 && (
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-1.5">
                          <BsGear className="text-emerald-400" size={11} />
                          <span className="text-white/70 text-[10px] font-medium">
                            {language === "es" ? "Stack:" : "Stack:"}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {exp.tools.map((tool, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 text-[10px] font-medium bg-violet-600/20 border border-violet-500/30 rounded text-violet-200"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Achievements */}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="pt-3 border-t border-violet-500/20">
                        <div className="flex items-center gap-1.5 mb-2">
                          <BsAward className="text-amber-400" size={11} />
                          <span className="text-white/70 text-[10px] font-medium">
                            {language === "es" ? "Logros:" : "Results:"}
                          </span>
                        </div>
                        <ul className="space-y-1">
                          {exp.achievements.slice(0, 2).map((achievement, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-1.5 text-[10px] text-violet-100/70"
                            >
                              <span className="text-emerald-400 mt-0.5">•</span>
                              <span className="line-clamp-2">
                                {typeof achievement === "object" ? achievement[language] : achievement}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Hover indicator */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Indicador de scroll en móvil */}
        <div className="flex sm:hidden justify-center mb-6 text-white/50 text-xs">
          <div className="flex items-center gap-2">
            <span>←</span>
            <span>{language === "es" ? "Desliza para ver más" : "Swipe to see more"}</span>
            <span>→</span>
          </div>
        </div>
      </div>

      {/* Stats section */}
      <div className="mt-12 md:mt-16 mx-auto max-w-3xl px-3 sm:px-6">
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-violet-500/10 to-transparent rounded-xl border border-violet-500/20">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
              {items.length}
            </div>
            <div className="text-xs text-white/70">
              {language === "es" ? "Experiencias" : "Experiences"}
            </div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-transparent rounded-xl border border-blue-500/20">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
              {new Date().getFullYear() - new Date(items[items.length - 1]?.startDate || "2023-01-01").getFullYear()}+
            </div>
            <div className="text-xs text-white/70">
              {language === "es" ? "Años" : "Years"}
            </div>
          </div>

          <div className="text-center p-4 bg-gradient-to-br from-pink-500/10 to-transparent rounded-xl border border-pink-500/20">
            <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
              {items.filter(exp => !exp.endDate).length}
            </div>
            <div className="text-xs text-white/70">
              {language === "es" ? "Actual" : "Current"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}