// @flow strict
"use client";

import { useState, useEffect, useRef, useMemo, useCallback, memo } from "react";
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

// ✅ Card simplificado (sin animaciones pesadas)
const SimpleCard = memo(({ children, isFirst }) => (
  <div
    className={`bg-gradient-to-br from-[#1a1443]/60 via-[#2a1f5f]/40 to-[#1a1443]/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border transition-all duration-300 overflow-hidden ${
      isFirst
        ? "border-violet-400/30 shadow-2xl shadow-violet-500/10 ring-1 ring-violet-400/20"
        : "border-violet-500/20 shadow-xl hover:border-violet-400/40 hover:shadow-violet-500/5"
    }`}
  >
    {children}
  </div>
));

SimpleCard.displayName = 'SimpleCard';

// ✅ Item individual memoizado
const EducationItem = memo(({ 
  education, 
  index, 
  isExpanded, 
  toggleExpanded, 
  getEducationIcon, 
  language 
}) => {
  const title = typeof education.title === "object" ? education.title[language] : education.title;
  const institution = typeof education.institution === "object" ? education.institution[language] : education.institution;
  const duration = typeof education.duration === "object" ? education.duration[language] : education.duration;
  const description = typeof education.description === "object" ? education.description[language] : education.description;

  return (
    <div className="relative pl-10 sm:pl-14 md:pl-20 group">
      {/* Timeline dot - CSS puro */}
      <div className="absolute left-1 sm:left-2.5 md:left-4 top-5 sm:top-7">
        <div
          className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br transition-transform duration-300 flex items-center justify-center shadow-lg ${
            index === 0
              ? "from-violet-400 to-blue-400 shadow-violet-400/30 scale-110"
              : "from-violet-500 to-blue-500 shadow-violet-500/20 group-hover:scale-105"
          }`}
        >
          <span className="text-xs sm:text-sm md:text-base">
            {getEducationIcon(education.type, education.level)}
          </span>
        </div>
        {index === 0 && (
          <div className="absolute inset-0 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-violet-400 to-blue-400 opacity-20 animate-ping motion-reduce:animate-none" />
        )}
      </div>

      <SimpleCard isFirst={index === 0}>
        {/* Header */}
        <div className="p-3 sm:p-4 md:p-6 pb-2 sm:pb-3 md:pb-4">
          <div className="flex items-start justify-between gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
            <div className="flex-1 min-w-0">
              {education.featured && (
                <div className="inline-flex items-center gap-1 sm:gap-1.5 mb-1.5 sm:mb-2 md:mb-3 px-2 sm:px-2.5 py-0.5 sm:py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full">
                  <BsStarFill className="text-amber-400" size={10} />
                  <span className="text-amber-300 text-[10px] sm:text-[11px] md:text-xs font-medium">
                    {language === "es" ? "Destacado" : "Featured"}
                  </span>
                </div>
              )}
              <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold mb-1.5 sm:mb-2 md:mb-3 leading-tight">
                <span className="bg-gradient-to-r from-violet-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                  {title}
                </span>
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 md:gap-3 mb-1.5 sm:mb-2 md:mb-3">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="p-1 sm:p-1.5 md:p-2 bg-emerald-500/20 rounded-lg">
                    <BsBuildingsFill className="text-emerald-400" size={12} />
                  </div>
                  <div className="min-w-0 flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1">
                    <span className="text-white/70 text-[10px] sm:text-xs md:text-sm font-medium">
                      {language === "es" ? "Institución:" : "Institution:"}
                    </span>
                    <span className="text-emerald-400 font-semibold text-xs sm:text-sm md:text-base truncate">
                      {institution}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 text-[10px] sm:text-xs md:text-sm">
                <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
                  <FaCalendarAlt className="text-blue-400" size={10} />
                  <span className="text-blue-400 font-medium">{duration}</span>
                </div>
                {education.status && (
                  <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2">
                    <BsCheckCircleFill className="text-green-400" size={10} />
                    <span className="text-green-400 text-[10px] sm:text-[11px] md:text-xs font-medium">
                      {education.status === "completed"
                        ? language === "es" ? "Completado" : "Completed"
                        : language === "es" ? "En Curso" : "In Progress"}
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
                className={`p-1.5 sm:p-2 rounded-lg border border-white/10 bg-white/5 transition-all duration-300 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 shrink-0 ${
                  isExpanded ? "rotate-180 bg-violet-500/10 border-violet-500/30" : ""
                }`}
                aria-label={
                  isExpanded
                    ? language === "es" ? "Ocultar detalles" : "Collapse details"
                    : language === "es" ? "Ver detalles" : "Expand details"
                }
                aria-expanded={isExpanded}
              >
                <FaChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-white/80" />
              </button>
            )}
          </div>
        </div>

        {/* ✅ Contenido expandible con max-height */}
        {description && (
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
            }`}
            style={{ 
              transitionProperty: 'max-height, opacity',
              willChange: isExpanded ? 'auto' : 'max-height, opacity'
            }}
          >
            <div className="px-3 sm:px-4 md:px-6 pb-3 sm:pb-4 md:pb-6">
              <div className="p-2.5 sm:p-3 md:p-4 bg-gradient-to-r from-violet-500/10 to-blue-500/10 rounded-lg sm:rounded-xl border border-violet-500/20">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                  <BsLightbulb className="text-violet-400" size={12} />
                  <span className="text-white font-semibold text-xs sm:text-sm">
                    {language === "es" ? "Detalles del Programa" : "Program Details"}
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] md:text-sm text-violet-100/90 leading-relaxed">
                  {description}
                </p>
              </div>

              {education.skills && education.skills.length > 0 && (
                <div className="mt-2.5 sm:mt-3 md:mt-4">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                    <div className="p-1 sm:p-1.5 bg-blue-500/20 rounded-md">
                      <BsCheckCircleFill className="text-blue-400" size={10} />
                    </div>
                    <span className="text-white font-semibold text-xs sm:text-sm">
                      {language === "es" ? "Habilidades Adquiridas" : "Skills Acquired"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {education.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 sm:px-2.5 md:px-3 py-1 sm:py-1.5 text-[10px] sm:text-[11px] md:text-xs font-medium bg-gradient-to-r from-blue-600/20 to-violet-600/20 border border-blue-500/30 rounded-lg text-blue-200 hover:from-blue-500/30 hover:to-violet-500/30 hover:border-blue-400/50 transition-colors duration-200"
                      >
                        {typeof skill === "object" ? skill[language] : skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {education.link && (
                <div className="mt-2.5 sm:mt-3 md:mt-4">
                  <a
                    href={education.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-violet-500/20 to-blue-500/20 border border-violet-500/30 rounded-lg text-violet-300 hover:from-violet-500/30 hover:to-blue-500/30 hover:border-violet-400/50 transition-colors duration-200 text-[11px] sm:text-xs md:text-sm font-medium"
                  >
                    <span>{language === "es" ? "Ver Certificado" : "View Certificate"}</span>
                    <FaExternalLinkAlt size={10} />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </SimpleCard>
    </div>
  );
});

EducationItem.displayName = 'EducationItem';

function Education() {
  const { t, language } = useTranslation();
  const [activeTab, setActiveTab] = useState("formal");
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [mounted, setMounted] = useState(false);
  const tabsRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ Memoizar datos derivados
  const { formalEducation, courses, certifications } = useMemo(() => ({
    formalEducation: educations.filter((edu) => edu.id === 1 || edu.type === "formal"),
    courses: educations.filter((edu) => edu.id > 1 && edu.type !== "formal" && edu.type !== "certification"),
    certifications: educations.filter((edu) => edu.type === "certification")
  }), []);

  // ✅ useCallback para funciones
  const onTabsKeyDown = useCallback((e) => {
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
  }, [activeTab, certifications.length]);

  const toggleExpanded = useCallback((id) => {
    setExpandedItems((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }, []);

  const getEducationIcon = useCallback((type, level) => {
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
  }, []);

  // ✅ Tabs memoizados
  const tabs = useMemo(() => {
    const baseTabs = [
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
      baseTabs.push({
        id: "certifications",
        label: language === "es" ? "Certificaciones" : "Certifications",
        count: certifications.length,
        icon: <FaCertificate size={16} />,
      });
    }
    return baseTabs;
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

  const currentEducations = getCurrentEducations();

  return (
    <section
      id="education"
      className="relative z-50 border-t my-10 md:my-16 lg:my-24 border-[#25213b]"
    >
      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex justify-center mb-6 md:mb-12">
          <div
            ref={tabsRef}
            role="tablist"
            aria-label={language === "es" ? "Secciones de educación" : "Education sections"}
            onKeyDown={onTabsKeyDown}
            className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide max-w-full px-1.5 sm:px-2 py-1.5 sm:py-2 bg-gradient-to-r from-[#1a1443]/80 via-[#2a1f5f]/80 to-[#1a1443]/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-violet-500/20 shadow-2xl"
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
                className={`flex items-center gap-1.5 sm:gap-3 px-2.5 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-0 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-violet-500/30 to-blue-500/30 text-white shadow-lg shadow-violet-500/25 scale-[1.02]"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className={`text-sm sm:text-base ${activeTab === tab.id ? "text-violet-300" : "text-white/60"}`}>
                  {tab.icon}
                </span>
                <span className="text-xs sm:text-sm md:text-base">{tab.label}</span>
                <span
                  className={`px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs rounded-full transition-all duration-300 ${
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
            {currentEducations.map((education, index) => (
              <EducationItem
                key={education.id}
                education={education}
                index={index}
                isExpanded={expandedItems.has(education.id)}
                toggleExpanded={toggleExpanded}
                getEducationIcon={getEducationIcon}
                language={language}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="hidden sm:grid mt-8 sm:mt-10 md:mt-16 grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-w-2xl mx-auto px-4">
          <div className="text-center p-4 sm:p-5 md:p-6 bg-gradient-to-br from-violet-500/10 to-transparent rounded-xl sm:rounded-2xl border border-violet-500/20">
            <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-gradient-to-br from-violet-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
              <FaGraduationCap className="text-white" size={18} />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white mb-1">{formalEducation.length}</div>
            <div className="text-xs sm:text-sm text-white/70">
              {language === "es" ? "Educación Formal" : "Formal Education"}
            </div>
          </div>

          <div className="text-center p-4 sm:p-5 md:p-6 bg-gradient-to-br from-blue-500/10 to-transparent rounded-xl sm:rounded-2xl border border-blue-500/20">
            <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 md:mb-4">
              <FaBookOpen className="text-white" size={18} />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white mb-1">{courses.length}</div>
            <div className="text-xs sm:text-sm text-white/70">
              {language === "es" ? "Cursos Completados" : "Courses Completed"}
            </div>
          </div>
        </div>
      </div>

      {/* Fade inferior */}
      <div className="hidden sm:block absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-[#0d1224] to-transparent pointer-events-none" />
    </section>
  );
}

export default Education;