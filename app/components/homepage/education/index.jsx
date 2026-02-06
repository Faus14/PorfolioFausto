// @flow strict
"use client";

import { useState, useCallback } from "react";
import { educations } from "@/utils/data/educations";
import { useTranslation } from "@/hooks/useTranslation";
import {
  FaGraduationCap,
  FaCertificate,
  FaUniversity,
  FaBookOpen,
  FaAward,
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaUserGraduate,
} from "react-icons/fa";
import {
  BsBuildingsFill,
  BsStarFill,
  BsCheckCircleFill,
} from "react-icons/bs";

function Education() {
  const { t, language } = useTranslation();
  const [expandedIds, setExpandedIds] = useState(new Set());

  const getEducationIcon = useCallback((type, level) => {
    switch (type) {
      case "certification":
        return <FaCertificate className="text-amber-400" size={20} />;
      case "course":
        return <FaBookOpen className="text-blue-400" size={20} />;
      case "university":
      case "formal":
        return level === "master" ? (
          <FaAward className="text-purple-400" size={20} />
        ) : (
          <FaUserGraduate className="text-emerald-400" size={20} />
        );
      default:
        return <FaGraduationCap className="text-violet-400" size={20} />;
    }
  }, []);

  const toggleExpanded = useCallback((id) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  return (
    <section
      id="education"
      className="relative z-50 border-t my-10 md:my-16 lg:my-24 border-[#25213b]"
    >
      {/* Title */}
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center group">
          <span className="w-12 sm:w-20 h-[2px] bg-gradient-to-r from-transparent to-[#1a1443] transition-all duration-700 group-hover:to-violet-500/50" />
          <div className="bg-gradient-to-r from-[#1a1443] to-[#2a1f5f] w-fit text-white py-2.5 px-5 sm:py-3 sm:px-6 text-base sm:text-xl rounded-lg mx-3 shadow-lg border border-violet-500/20 transition-all duration-300 hover:shadow-violet-500/25 hover:border-violet-500/40">
            <span className="bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent font-semibold">
              {t("educationTitle")}
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

      <div className="mx-auto max-w-7xl px-3 sm:px-6">
        {/* Grid moderno de cards */}
        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {educations.map((education, idx) => {
            const title = typeof education.title === "object" ? education.title[language] : education.title;
            const institution = typeof education.institution === "object" ? education.institution[language] : education.institution;
            const duration = typeof education.duration === "object" ? education.duration[language] : education.duration;
            const description = typeof education.description === "object" ? education.description[language] : education.description;
            const isExpanded = expandedIds.has(education.id);
            const isFeatured = education.featured;

            return (
              <div
                key={education.id}
                className={`group relative bg-gradient-to-br backdrop-blur-sm border rounded-2xl p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 w-full max-w-md ${isFeatured
                    ? "from-violet-900/40 via-purple-900/30 to-violet-900/40 border-violet-400/50 shadow-violet-500/10"
                    : "from-[#1a1443]/60 via-[#2a1f5f]/40 to-[#1a1443]/60 border-violet-500/20 hover:border-violet-400/40 hover:shadow-violet-500/10"
                  }`}
              >
                {/* Icon badge */}
                <div className={`absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-10 ${isFeatured
                    ? "bg-gradient-to-br from-purple-500 to-pink-500 ring-2 ring-purple-400/30"
                    : "bg-gradient-to-br from-violet-500 to-blue-500"
                  }`}>
                  {getEducationIcon(education.type, education.level)}
                </div>

                {/* Featured badge */}
                {isFeatured && (
                  <div className="absolute -top-2 -left-2 z-10">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                      <BsStarFill size={10} />
                      {language === "es" ? "Destacado" : "Featured"}
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="space-y-3">
                  {/* Title */}
                  <h3 className={`text-base sm:text-lg font-bold bg-clip-text text-transparent leading-tight pr-8 ${isFeatured
                      ? "bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200"
                      : "bg-gradient-to-r from-violet-300 via-blue-300 to-violet-300"
                    }`}>
                    {title}
                  </h3>

                  {/* Institution & Duration */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <BsBuildingsFill className={`${isFeatured ? "text-purple-300" : "text-emerald-400"} shrink-0`} size={12} />
                      <span className={`${isFeatured ? "text-purple-300" : "text-emerald-400"} font-semibold truncate`}>{institution}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className={`${isFeatured ? "text-pink-300" : "text-blue-400"} shrink-0`} size={10} />
                      <span className={`${isFeatured ? "text-pink-300" : "text-blue-400"} font-medium`}>{duration}</span>
                    </div>

                    {/* Status & Grade */}
                    <div className="flex flex-wrap items-center gap-2">
                      {education.status && (
                        <div className="flex items-center gap-1">
                          <BsCheckCircleFill className="text-green-400" size={10} />
                          <span className="text-green-400 text-[10px] font-medium">
                            {education.status === "completed"
                              ? language === "es" ? "Completado" : "Completed"
                              : language === "es" ? "En Curso" : "In Progress"}
                          </span>
                        </div>
                      )}
                      {education.grade && (
                        <div className="flex items-center gap-1">
                          <BsStarFill className="text-yellow-400" size={10} />
                          <span className="text-yellow-400 text-[10px] font-medium">
                            {education.grade}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description - Expandible */}
                  {description && (
                    <div>
                      <p className={`text-xs leading-relaxed ${isFeatured ? "text-purple-100/90" : "text-violet-100/80"} ${!isExpanded ? 'line-clamp-2' : ''}`}>
                        {description}
                      </p>
                      {description.length > 100 && (
                        <button
                          onClick={() => toggleExpanded(education.id)}
                          className={`text-[10px] mt-1 font-medium ${isFeatured ? "text-pink-300 hover:text-pink-200" : "text-violet-400 hover:text-violet-300"}`}
                        >
                          {isExpanded
                            ? (language === "es" ? "Ver menos" : "Show less")
                            : (language === "es" ? "Ver más" : "Read more")
                          }
                        </button>
                      )}
                    </div>
                  )}

                  {/* Skills - Todas mostradas */}
                  {education.skills && education.skills.length > 0 && (
                    <div className={`space-y-2 pt-3 border-t ${isFeatured ? "border-purple-500/30" : "border-violet-500/20"}`}>
                      <span className={`text-[10px] font-medium ${isFeatured ? "text-purple-200/80" : "text-white/70"}`}>
                        {language === "es" ? "Habilidades:" : "Skills:"}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {education.skills.map((skill, i) => (
                          <span
                            key={i}
                            className={`px-2 py-0.5 text-[10px] font-medium border rounded ${isFeatured
                                ? "bg-purple-600/20 border-purple-500/30 text-purple-200"
                                : "bg-blue-600/20 border-blue-500/30 text-blue-200"
                              }`}
                          >
                            {typeof skill === "object" ? skill[language] : skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Link certificado */}
                  {education.link && (
                    <a
                      href={education.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 border rounded-lg transition-colors duration-200 text-[11px] font-medium ${isFeatured
                          ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300 hover:from-purple-500/30 hover:to-pink-500/30"
                          : "bg-gradient-to-r from-violet-500/20 to-blue-500/20 border-violet-500/30 text-violet-300 hover:from-violet-500/30 hover:to-blue-500/30"
                        }`}
                    >
                      <span>{language === "es" ? "Ver Certificado" : "View Certificate"}</span>
                      <FaExternalLinkAlt size={10} />
                    </a>
                  )}
                </div>

                {/* Hover indicator */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isFeatured
                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                    : "bg-gradient-to-r from-violet-500 to-blue-500"
                  }`} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Education;