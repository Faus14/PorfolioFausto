// @flow strict 
'use client';

import { projectsPost } from "@/utils/data/projectsPost";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import {
  FaCode,
  FaDumbbell,
  FaTwitter,
  FaPlane,
  FaStore,
  FaRocket,
  FaMobile,
  FaDesktop,
  FaDatabase,
  FaCloud,
  FaShieldAlt,
  FaUniversity,
  FaCube,
  FaBriefcase,
  FaTimes
} from "react-icons/fa";
import { FiExternalLink, FiGithub, FiEye, FiFilter, FiMaximize2, FiX } from "react-icons/fi";
import { useState, useMemo, useEffect } from "react";

function Projects() {
  const { t, language } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('products');
  const [visibleItems, setVisibleItems] = useState(6);
  const [expandedIds, setExpandedIds] = useState(new Set());
  const [isMounted, setIsMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle Esc key to close modal
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedImage]);

  const categories = [
    { id: 'products', label: t('projectsProducts'), icon: <FaBriefcase size={16} /> },
    { id: 'blockchain', label: t('projectsBlockchain'), icon: <FaCube size={16} /> },
    { id: 'academic', label: t('projectsAcademic'), icon: <FaUniversity size={16} /> },
  ];

  const getProjectIcon = (id) => {
    const iconMap = {
      1: <FaCode size={28} className="text-blue-400" />,
      2: <FaDumbbell size={28} className="text-orange-400" />,
      3: <FaTwitter size={28} className="text-cyan-400" />,
      4: <FaPlane size={28} className="text-green-400" />,
      5: <FaStore size={28} className="text-purple-400" />,
      6: <FaRocket size={28} className="text-red-400" />,
      7: <FaShieldAlt size={28} className="text-blue-500" />,
      8: <FaMobile size={28} className="text-pink-400" />,
      9: <FaDesktop size={28} className="text-indigo-400" />,
      10: <FaDatabase size={28} className="text-yellow-400" />,
      11: <FaCloud size={28} className="text-teal-400" />
    };
    return iconMap[id] || <FaCode size={28} className="text-gray-400" />;
  };

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projectsPost;
    return projectsPost.filter(project => project.category === activeCategory);
  }, [activeCategory]);

  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleItems);
  }, [filteredProjects, visibleItems]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setVisibleItems(6); // Reset visible items when switching tabs
    setExpandedIds(new Set()); // Reset expanded state
  };

  const handleLoadMore = () => {
    setVisibleItems(prev => Math.min(prev + 3, filteredProjects.length));
  };

  const toggleExpanded = (id) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  if (!isMounted) return null;

  return (
    <section
      id="projects"
      className="relative z-10 border-t my-12 lg:my-20 border-[#25213b]/30 scroll-mt-24"
    >
      {/* Section Header */}
      <div className="flex justify-center my-8 lg:my-12 px-4">
        <div className="flex items-center">
          <span className="w-16 sm:w-24 h-[2px] bg-gradient-to-r from-[#1a1443] to-[#16f2b3]"></span>
          <span
            className="bg-gradient-to-r from-[#1a1443] to-[#2d1b69] w-fit text-white p-3 px-6 text-lg sm:text-xl lg:text-2xl rounded-xl font-semibold shadow-lg mx-4"
          >
            {t('projectsTitle')}
          </span>
          <span className="w-16 sm:w-24 h-[2px] bg-gradient-to-l from-[#1a1443] to-[#16f2b3]"></span>
        </div>
      </div>

      {/* Categories Tabs */}
      <div className="container mx-auto px-4 mb-8 sm:mb-12">
        <div className="flex justify-center">
          <div className="flex items-center gap-1 p-1 bg-[#1a1443]/50 border border-[#464c6a]/30 rounded-2xl overflow-x-auto no-scrollbar max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap
                  ${activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#16f2b3] to-[#00d4aa] text-[#0d1224] shadow-lg shadow-[#16f2b3]/20'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {cat.icon}
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto py-4 px-4 sm:px-6 lg:px-8">
        {/* Hint para móvil */}
        <div className="md:hidden flex items-center justify-center gap-2 mb-6 text-xs text-gray-400 animate-pulse">
          <span>{language === 'es' ? '← Desliza para ver más proyectos →' : '← Swipe to see more projects →'}</span>
        </div>

        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-x-visible pb-8 md:pb-0 snap-x snap-mandatory md:snap-none scroll-smooth">
          {displayedProjects.map((post) => {
            const isExpanded = expandedIds.has(post.id);
            const title = typeof post.title === 'object' ? post.title[language] : post.title;
            const excerpt = typeof post.excerpt === 'object' ? post.excerpt[language] : post.excerpt;
            const date = typeof post.date === 'object' ? post.date[language] : post.date;

            return (
              <article
                key={`${post.id}-${activeCategory}`}
                className="flex-shrink-0 w-[85vw] sm:w-[400px] md:w-auto snap-center group relative bg-gradient-to-br from-[#1a1443]/90 to-[#0d1224]/90 rounded-2xl border border-[#464c6a]/30 hover:border-[#16f2b3]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#16f2b3]/10 hover:-translate-y-2 overflow-hidden flex flex-col"
              >
                {/* Header con fecha y badge de categoría (solo en 'All') */}
                <div className="flex justify-between items-center p-5 pb-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#16f2b3] font-bold px-2.5 py-1 bg-[#16f2b3]/10 rounded-lg">
                    {date}
                  </span>
                </div>

                {/* Visual Area */}
                <div className="relative w-full h-48 sm:h-56 mb-4 px-5">
                  <div
                    onClick={() => post.image && setSelectedImage({ src: post.image, title })}
                    className={`w-full h-full rounded-xl bg-[#0d1224] border border-[#464c6a]/20 group-hover:border-[#16f2b3]/30 transition-all duration-500 flex items-center justify-center overflow-hidden ${post.image ? 'cursor-zoom-in' : ''}`}
                  >
                    {post.image ? (
                      <div className="relative w-full h-full overflow-hidden">
                        <img
                          src={post.image}
                          alt={title}
                          loading="eager"
                          className="w-full h-full object-cover object-top group-hover:scale-110 group-hover:brightness-110 transition-all duration-700"
                        />
                        {/* Expand Icon Hover */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <FiMaximize2 className="text-white" size={24} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                        {getProjectIcon(post.id)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="px-5 pb-6 flex flex-col flex-grow">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 text-white group-hover:text-[#16f2b3] transition-colors duration-300 line-clamp-2">
                    {title}
                  </h3>

                  <div className="mb-4 flex-grow">
                    <p className={`text-sm text-gray-300 leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
                      {excerpt}
                    </p>
                    {excerpt.length > 130 && (
                      <button
                        onClick={() => toggleExpanded(post.id)}
                        className="text-[11px] text-[#16f2b3] hover:text-[#00d4aa] mt-2 font-semibold flex items-center gap-1"
                      >
                        {isExpanded
                          ? (language === "es" ? "[-] Ver menos" : "[-] Show less")
                          : (language === "es" ? "[+] Leer más" : "[+] Read more")
                        }
                      </button>
                    )}
                  </div>

                  {/* Technologies */}
                  {post.technologies && post.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.technologies.slice(0, 5).map((tech, i) => (
                        <span
                          key={i}
                          className="text-[10px] sm:text-[11px] px-2.5 py-1 bg-white/5 rounded-md text-gray-300 border border-white/10 hover:border-[#16f2b3]/30 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex gap-3 mt-auto">
                    {post.demoUrl && post.demoUrl !== '#' && (
                      <Link
                        href={post.demoUrl}
                        target="_blank"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#16f2b3] to-[#00d4aa] hover:from-[#00d4aa] hover:to-[#16f2b3] rounded-xl text-xs sm:text-sm font-bold text-[#0d1224] transition-all duration-300 hover:shadow-lg hover:shadow-[#16f2b3]/20"
                      >
                        <FiEye size={16} />
                        {t('liveDemo')}
                      </Link>
                    )}
                    {post.urlGithub && (
                      <Link
                        href={post.urlGithub}
                        target="_blank"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1a1443] hover:bg-[#2d1b69] border border-[#464c6a]/30 rounded-xl text-xs sm:text-sm font-bold text-white transition-all duration-300 hover:shadow-lg"
                      >
                        <FiGithub size={16} />
                        {t('sourceCode')}
                      </Link>
                    )}
                    {!post.urlGithub && (!post.demoUrl || post.demoUrl === '#') && (
                      <div
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs sm:text-sm font-bold text-gray-500"
                      >
                        <FiFilter size={16} />
                        {language === 'es' ? 'Próximamente' : 'Coming Soon'}
                      </div>
                    )}
                  </div>
                </div>

                {/* Decorative bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#16f2b3] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </article>
            );
          })}
        </div>

        {/* Empty State */}
        {displayedProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="p-6 bg-[#1a1443]/50 rounded-full mb-4 border border-[#464c6a]/30">
              <FiFilter size={40} className="text-gray-500" />
            </div>
            <p className="text-gray-400 text-lg">
              {language === 'es' ? 'No se encontraron proyectos en esta categoría.' : 'No projects found in this category.'}
            </p>
          </div>
        )}

        {/* Load More Button */}
        {visibleItems < filteredProjects.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              className="group relative px-8 py-3 bg-[#1a1443] overflow-hidden rounded-full transition-all duration-300 hover:shadow-2xl hover:shadow-[#16f2b3]/20"
            >
              <div className="absolute inset-0 w-0 bg-gradient-to-r from-[#16f2b3] to-[#00d4aa] transition-all duration-500 ease-out group-hover:w-full opacity-100" />
              <span className="relative flex items-center gap-2 font-bold text-sm text-white group-hover:text-[#0d1224] transition-colors duration-300">
                {language === 'es' ? 'Explorar más proyectos' : 'Explore more projects'}
                <FiExternalLink className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" size={18} />
              </span>
            </button>
          </div>
        )}

        {/* Projects Counter */}
        {filteredProjects.length > 0 && (
          <div className="flex justify-center mt-10">
            <div className="px-4 py-1.5 bg-[#1a1443]/30 border border-[#464c6a]/20 rounded-full">
              <span className="text-[11px] uppercase tracking-widest text-[#16f2b3] font-bold">
                {language === 'es'
                  ? `${visibleItems > filteredProjects.length ? filteredProjects.length : visibleItems} / ${filteredProjects.length} Proyectos`
                  : `${visibleItems > filteredProjects.length ? filteredProjects.length : visibleItems} / ${filteredProjects.length} Projects`
                }
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300"
          onClick={() => setSelectedImage(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-[#0d1224]/95 backdrop-blur-xl" />

          {/* Modal Content */}
          <div
            className="relative max-w-6xl w-full max-h-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header info */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-20 pointer-events-none">
              <h3 className="text-white font-bold text-lg sm:text-xl md:text-2xl drop-shadow-lg opacity-0 animate-in fade-in slide-in-from-top-4 duration-500 delay-150 fill-mode-forwards">
                {selectedImage.title}
              </h3>
              <button
                onClick={() => setSelectedImage(null)}
                className="p-2 sm:p-3 bg-white/10 hover:bg-[#16f2b3] text-white hover:text-[#0d1224] rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 pointer-events-auto shadow-2xl"
              >
                <FiX size={24} />
              </button>
            </div>

            {/* Main Image */}
            <div className="relative w-full bg-[#1a1443]/50 rounded-2xl border border-[#464c6a]/30 overflow-hidden shadow-2xl overflow-y-auto no-scrollbar max-h-[85vh]">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-auto block"
              />
            </div>

            {/* Hint to close */}
            <p className="mt-4 text-gray-400 text-xs sm:text-sm font-medium opacity-0 animate-in fade-in duration-500 delay-300 fill-mode-forwards">
              {language === 'es' ? 'Presioná ESC o hacé click fuera para cerrar' : 'Press ESC or click outside to close'}
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Custom scrollbar for mobile horizontal scroll */
        @media (max-width: 767px) {
          .overflow-x-auto::-webkit-scrollbar {
            height: 4px;
          }

          .overflow-x-auto::-webkit-scrollbar-track {
            background: rgba(26, 20, 67, 0.3);
            border-radius: 10px;
          }

          .overflow-x-auto::-webkit-scrollbar-thumb {
            background: linear-gradient(to right, #16f2b3, transparent);
            border-radius: 10px;
          }
        }
      `}</style>
    </section>
  );
};

export default Projects;