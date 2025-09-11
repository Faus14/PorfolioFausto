// @flow strict
"use client";

import { useState, useEffect, useRef } from "react";
import { educations } from "@/utils/data/educations";
import { useTranslation } from "@/hooks/useTranslation";
import {
  FaGraduationCap,
  FaCertificate,
  FaUniversity,
  FaBookOpen,
  FaAward,
  FaCalendarAlt,
  FaChevronDown,
  FaExternalLinkAlt,
} from "react-icons/fa";
import {
  BsBuildingsFill,
  BsStarFill,
  BsCheckCircleFill,
  BsLightbulb,
} from "react-icons/bs";

function Education() {
  const { t, language } = useTranslation();
  const [activeTab, setActiveTab] = useState("formal");
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [mounted, setMounted] = useState(false);
  const tabsRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Data derivada
  const formalEducation = educations.filter((edu) => edu.id === 1 || edu.type === "formal");
  const courses = educations.filter((edu) => edu.id > 1 && edu.type !== "formal" && edu.type !== "certification");
  const certifications = educations.filter((edu) => edu.type === "certification");

  // Accesibilidad: navegación por teclado en pestañas (izq/der)
  const onTabsKeyDown = (e) => {
    const order = ["formal", "courses", ...(certifications.length ? ["certifications"] : [])];
    const currentIdx = order.indexOf(activeTab);
    if (e.key === "ArrowRight") {
      const next = order[(currentIdx + 1) % order.length];
      setActiveTab(next);
    }
    if (e.key === "ArrowLeft") {
      const prev = order[(currentIdx - 1 + order.length) % order.length];
      setActiveTab(prev);
    }
  };

  const toggleExpanded = (id) => {
    setExpandedItems((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const getEducationIcon = (type, level) => {
    switch (type) {
      case "certification":
        return <FaCertificate className="text-amber-400" size={18} />;
      case "course":
        return <FaBookOpen className="text-blue-400" size={18} />;
      case "university":
      case "formal":
        return level === "master" ? (
          <FaAward className="text-purple-400" size={18} />
        ) : (
          <FaGraduationCap className="text-emerald-400" size={18} />
        );
      default:
        return <FaGraduationCap className="text-violet-400" size={18} />;
    }
  };

  let tabs = [
    {
      id: "formal",
      label: language === "es" ? "Educación Formal" : "Formal Education",
      count: formalEducation.length,
      icon: <FaUniversity size={16} />,
    },
    {
      id: "courses",
      label: language === "es" ? "Cursos" : "Courses",
      count: courses.length,
      icon: <FaBookOpen size={16} />,
    },
  ];
  if (certifications.length > 0) {
    tabs.push({
      id: "certifications",
      label: language === "es" ? "Certificaciones" : "Certifications",
      count: certifications.length,
      icon: <FaCertificate size={16} />,
    });
  }

  const getCurrentEducations = () => {
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
  };

  return (
    <section
      id="education"
      className="relative z-50 border-t my-10 md:my-16 lg:my-24 border-[#25213b] overflow-hidden"
    >
      {/* Fondos decorativos */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-purple-900/5 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-64 md:w-80 lg:w-96 h-64 md:h-80 lg:h-96 bg-blue-500/5 rounded-full blur-2xl md:blur-3xl pointer-events-none motion-reduce:animate-none hidden sm:block" />
      <div className="absolute bottom-1/4 left-0 w-64 md:w-80 lg:w-96 h-64 md:h-80 lg:h-96 bg-purple-500/5 rounded-full blur-2xl md:blur-3xl pointer-events-none motion-reduce:animate-none hidden sm:block" />

      {/* Divisor superior */}
      <div className="flex justify-center -translate-y-[1px] mb-6 md:mb-8">
        <div className="w-11/12 sm:w-4/5 max-w-3xl relative">
          <div className="h-[2px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full opacity-60" />
          <div className="h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent w-full -mt-[1px] opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent h-[1px] animate-pulse motion-reduce:animate-none" />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
        {/* Tabs responsivas */}
        <div className="flex justify-center mb-6 md:mb-12">
          <div
            ref={tabsRef}
            role="tablist"
            aria-label={language === "es" ? "Secciones de educación" : "Education sections"}
            onKeyDown={onTabsKeyDown}
            className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full px-2 py-2 bg-gradient-to-r from-[#1a1443]/80 via-[#2a1f5f]/80 to-[#1a1443]/80 backdrop-blur-sm rounded-2xl border border-violet-500/20 shadow-2xl snap-x"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`panel-${tab.id}`}
                tabIndex={activeTab === tab.id ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold transition-all duration-300 snap-start min-w-max focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-0 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-violet-500/30 to-blue-500/30 text-white shadow-lg shadow-violet-500/25 scale-[1.02]"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className={`${activeTab === tab.id ? "text-violet-300" : "text-white/60"}`}>
                  {tab.icon}
                </span>
                <span className="text-sm sm:text-base">{tab.label}</span>
                <span
                  className={`px-2 py-0.5 text-xs rounded-full transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-violet-400/30 text-violet-100 border border-violet-400/30"
                      : "bg-white/10 text-white/70 border border-white/10"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-[3px] sm:w-1 bg-gradient-to-b from-violet-500 via-blue-500 to-violet-500 opacity-30 rounded-full" />
          <div className="absolute left-[26px] sm:left-[33px] top-0 bottom-0 w-px bg-gradient-to-b from-violet-400/60 to-blue-400/60 opacity-20" />

          <div
            id={`panel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="space-y-6 md:space-y-8"
          >
            {getCurrentEducations().map((education, index) => {
              const isExpanded = expandedItems.has(education.id);
              const title = typeof education.title === "object" ? education.title[language] : education.title;
              const institution = typeof education.institution === "object" ? education.institution[language] : education.institution;
              const duration = typeof education.duration === "object" ? education.duration[language] : education.duration;
              const description = typeof education.description === "object" ? education.description[language] : education.description;

              return (
                <div key={education.id} className="relative pl-14 sm:pl-20 group">
                  {/* Punto de la línea */}
                  <div className="absolute left-2.5 sm:left-4 top-7">
                    <div
                      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br transition-all duration-500 flex items-center justify-center shadow-lg ${
                        index === 0
                          ? "from-violet-400 to-blue-400 shadow-violet-400/30 scale-110"
                          : "from-violet-500 to-blue-500 shadow-violet-500/20 group-hover:scale-105"
                      }`}
                    >
                      {getEducationIcon(education.type, education.level)}
                    </div>
                    {index === 0 && (
                      <div className="absolute inset-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-violet-400 to-blue-400 opacity-20 animate-ping motion-reduce:animate-none" />
                    )}
                  </div>

                  {/* Card */}
                  <div
                    className={`bg-gradient-to-br from-[#1a1443]/60 via-[#2a1f5f]/40 to-[#1a1443]/60 backdrop-blur-sm rounded-2xl border transition-all duration-500 overflow-hidden ${
                      index === 0
                        ? "border-violet-400/30 shadow-2xl shadow-violet-500/10 ring-1 ring-violet-400/20"
                        : "border-violet-500/20 shadow-xl hover:border-violet-400/40 hover:shadow-violet-500/5"
                    }`}
                  >
                    {/* Header */}
                    <div className="p-4 sm:p-6 pb-3 sm:pb-4">
                      <div className="flex items-start justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="flex-1 min-w-0">
                          {education.featured && (
                            <div className="inline-flex items-center gap-1.5 mb-2 sm:mb-3 px-2.5 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full">
                              <BsStarFill className="text-amber-400" size={12} />
                              <span className="text-amber-300 text-[11px] sm:text-xs font-medium">
                                {language === "es" ? "Destacado" : "Featured"}
                              </span>
                            </div>
                          )}
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 leading-tight">
                            <span className="bg-gradient-to-r from-violet-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                              {title}
                            </span>
                          </h3>
                          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <div className="p-1.5 sm:p-2 bg-emerald-500/20 rounded-lg">
                              <BsBuildingsFill className="text-emerald-400" size={14} />
                            </div>
                            <div className="min-w-0">
                              <span className="text-white/70 text-xs sm:text-sm font-medium">
                                {language === "es" ? "Institución:" : "Institution:"}
                              </span>
                              <span className="ml-2 text-emerald-400 font-semibold text-sm sm:text-base truncate">
                                {institution}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                            <div className="flex items-center gap-1.5 sm:gap-2">
                              <FaCalendarAlt className="text-blue-400" size={12} />
                              <span className="text-blue-400 font-medium">{duration}</span>
                            </div>
                            {education.status && (
                              <div className="flex items-center gap-1.5 sm:gap-2">
                                <BsCheckCircleFill className="text-green-400" size={12} />
                                <span className="text-green-400 text-[11px] sm:text-xs font-medium">
                                  {education.status === "completed"
                                    ? language === "es"
                                      ? "Completado"
                                      : "Completed"
                                    : language === "es"
                                    ? "En Curso"
                                    : "In Progress"}
                                </span>
                              </div>
                            )}
                            {education.grade && (
                              <div className="flex items-center gap-1.5 sm:gap-2">
                                <BsStarFill className="text-yellow-400" size={12} />
                                <span className="text-yellow-400 text-[11px] sm:text-xs font-medium">
                                  {education.grade}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        {description && (
                          <button
                            onClick={() => toggleExpanded(education.id)}
                            className={`p-1.5 sm:p-2 rounded-lg border border-white/10 bg-white/5 transition-all duration-300 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 ${
                              isExpanded ? "rotate-180 bg-violet-500/10 border-violet-500/30" : ""
                            }`}
                            aria-label={
                              isExpanded
                                ? language === "es"
                                  ? "Ocultar detalles"
                                  : "Collapse details"
                                : language === "es"
                                ? "Ver detalles"
                                : "Expand details"
                            }
                            aria-expanded={isExpanded}
                          >
                            <FaChevronDown className="w-4 h-4 text-white/80" />
                          </button>
                        )}
                      </div>
                    </div>

                    {description && (
                      <div
                        className={`grid transition-all duration-500 ease-out ${
                          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                            <div className="p-3 sm:p-4 bg-gradient-to-r from-violet-500/10 to-blue-500/10 rounded-xl border border-violet-500/20">
                              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                <BsLightbulb className="text-violet-400" size={14} />
                                <span className="text-white font-semibold text-sm">
                                  {language === "es" ? "Detalles del Programa" : "Program Details"}
                                </span>
                              </div>
                              <p className="text-[13px] sm:text-sm text-violet-100/90 leading-relaxed">
                                {description}
                              </p>
                            </div>

                            {education.skills && education.skills.length > 0 && (
                              <div className="mt-3 sm:mt-4">
                                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                                  <div className="p-1.5 bg-blue-500/20 rounded-md">
                                    <BsCheckCircleFill className="text-blue-400" size={12} />
                                  </div>
                                  <span className="text-white font-semibold text-sm">
                                    {language === "es" ? "Habilidades Adquiridas" : "Skills Acquired"}
                                  </span>
                                </div>
                                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                  {education.skills.map((skill, i) => (
                                    <span
                                      key={i}
                                      className="px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-medium bg-gradient-to-r from-blue-600/20 to-violet-600/20 border border-blue-500/30 rounded-lg text-blue-200 hover:from-blue-500/30 hover:to-violet-500/30 hover:border-blue-400/50 transition-all duration-300"
                                    >
                                      {typeof skill === "object" ? skill[language] : skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {education.link && (
                              <div className="mt-3 sm:mt-4">
                                <a
                                  href={education.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-violet-500/20 to-blue-500/20 border border-violet-500/30 rounded-lg text-violet-300 hover:from-violet-500/30 hover:to-blue-500/30 hover:border-violet-400/50 transition-all duration-300 text-xs sm:text-sm font-medium"
                                >
                                  <span>{language === "es" ? "Ver Certificado" : "View Certificate"}</span>
                                  <FaExternalLinkAlt size={12} />
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats: 2 bloques, siempre centrados y fluidos */}
        {mounted && (
          <div className="mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
            <div className="text-center p-5 sm:p-6 bg-gradient-to-br from-violet-500/10 to-transparent rounded-2xl border border-violet-500/20">
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-violet-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FaGraduationCap className="text-white" size={22} />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white mb-1">{formalEducation.length}</div>
              <div className="text-xs sm:text-sm text-white/70">
                {language === "es" ? "Educación Formal" : "Formal Education"}
              </div>
            </div>

            <div className="text-center p-5 sm:p-6 bg-gradient-to-br from-blue-500/10 to-transparent rounded-2xl border border-blue-500/20">
              <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <FaBookOpen className="text-white" size={22} />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white mb-1">{courses.length}</div>
              <div className="text-xs sm:text-sm text-white/70">
                {language === "es" ? "Cursos Completados" : "Courses Completed"}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fade inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-[#0d1224] to-transparent pointer-events-none" />
    </section>
  );
}

export default Education;
