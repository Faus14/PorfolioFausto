// @flow strict
"use client";

import { useState, useMemo, useCallback } from "react";
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
  BsBank2,
} from "react-icons/bs";

function Education() {
  const { t, language } = useTranslation();
  const [activeTab, setActiveTab] = useState("formal");
  const [expandedIds, setExpandedIds] = useState(new Set());

  // ✅ Memoizar datos derivados
  const { formalEducation, courses, certifications, allEducations } = useMemo(() => ({
    formalEducation: educations.filter((edu) => edu.id === 1 || edu.type === "formal"),
    courses: educations.filter((edu) => edu.id > 1 && edu.type !== "formal" && edu.type !== "certification"),
    certifications: educations.filter((edu) => edu.type === "certification"),
    allEducations: educations
  }), []);

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

  // ✅ Tabs memoizados
  const tabs = useMemo(() => {
    return [
      {
        id: "formal",
        label: language === "es" ? "Formación Profesional" : "Professional Education",
        count: formalEducation.length,
        icon: <FaUserGraduate size={16} />,
      },
      {
        id: "courses",
        label: language === "es" ? "Cursos" : "Courses",
        count: courses.length,
        icon: <FaBookOpen size={16} />,
      },
      ...(certifications.length > 0 ? [{
        id: "certifications",
        label: language === "es" ? "Certificados" : "Certifications",
        count: certifications.length,
        icon: <FaCertificate size={16} />,
      }] : [])
    ];
  }, [language, formalEducation.length, courses.length, certifications.length]);

  const getCurrentEducations = useCallback(() => {
    switch (activeTab) {
      case "formal":
        return formalEducation;
      case "courses":
        return courses;
      case "certifications":
        return certifications;
      default:
        return formalEducation;
    }
  }, [activeTab, formalEducation, courses, certifications]);

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

  const currentEducations = getCurrentEducations();

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
        {/* Tabs - Más compactos */}
        <div className="flex justify-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 p-1.5 bg-[#0d1224]/90 backdrop-blur-sm rounded-xl border border-violet-500/20">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium transition-all duration-300 text-sm ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-violet-500/30 to-blue-500/30 text-white shadow-lg"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className={activeTab === tab.id ? "text-violet-300" : ""}>
                  {tab.icon}
                </span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className={`px-1.5 py-0.5 text-[10px] rounded-full ${
                  activeTab === tab.id
                    ? "bg-violet-400/30 text-violet-100"
                    : "bg-white/10 text-white/50"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid moderno de cards - centrado cuando hay pocos elementos */}
        <div className={`grid gap-4 sm:gap-5 md:gap-6 ${
          currentEducations.length === 1 
            ? "grid-cols-1 justify-items-center" 
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center"
        }`}>
          {currentEducations.map((education, idx) => {
            const title = typeof education.title === "object" ? education.title[language] : education.title;
            const institution = typeof education.institution === "object" ? education.institution[language] : education.institution;
            const duration = typeof education.duration === "object" ? education.duration[language] : education.duration;
            const description = typeof education.description === "object" ? education.description[language] : education.description;
            const isExpanded = expandedIds.has(education.id);

            return (
              <div
                key={education.id}
                className="group relative bg-gradient-to-br from-[#1a1443]/60 via-[#2a1f5f]/40 to-[#1a1443]/60 backdrop-blur-sm border border-violet-500/20 rounded-2xl p-5 hover:border-violet-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10 hover:-translate-y-1 w-full max-w-md"
              >
                {/* Icon badge */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-violet-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg z-10">
                  {getEducationIcon(education.type, education.level)}
                </div>

                {/* Featured badge */}
                {education.featured && (
                  <div className="absolute -top-2 -left-2 z-10">
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                      <BsStarFill size={10} />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="space-y-3">
                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold bg-gradient-to-r from-violet-300 via-blue-300 to-violet-300 bg-clip-text text-transparent leading-tight pr-8">
                    {title}
                  </h3>

                  {/* Institution & Duration */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <BsBuildingsFill className="text-emerald-400 shrink-0" size={12} />
                      <span className="text-emerald-400 font-semibold truncate">{institution}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-blue-400 shrink-0" size={10} />
                      <span className="text-blue-400 font-medium">{duration}</span>
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
                      <p className={`text-xs text-violet-100/80 leading-relaxed ${!isExpanded ? 'line-clamp-2' : ''}`}>
                        {description}
                      </p>
                      {description.length > 100 && (
                        <button
                          onClick={() => toggleExpanded(education.id)}
                          className="text-[10px] text-violet-400 hover:text-violet-300 mt-1 font-medium"
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
                    <div className="space-y-2 pt-3 border-t border-violet-500/20">
                      <span className="text-white/70 text-[10px] font-medium">
                        {language === "es" ? "Habilidades:" : "Skills:"}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {education.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 text-[10px] font-medium bg-blue-600/20 border border-blue-500/30 rounded text-blue-200"
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
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-violet-500/20 to-blue-500/20 border border-violet-500/30 rounded-lg text-violet-300 hover:from-violet-500/30 hover:to-blue-500/30 transition-colors duration-200 text-[11px] font-medium"
                    >
                      <span>{language === "es" ? "Ver Certificado" : "View Certificate"}</span>
                      <FaExternalLinkAlt size={10} />
                    </a>
                  )}
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Education;