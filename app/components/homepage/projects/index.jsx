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
  FaShieldAlt
} from "react-icons/fa"; 
import { FiExternalLink, FiGithub, FiEye } from "react-icons/fi";
import { useState } from "react";

function Blog() {   
  const { t, language } = useTranslation();
  const [visibleItems, setVisibleItems] = useState(6);
  const [expandedIds, setExpandedIds] = useState(new Set());

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

  const handleLoadMore = () => {
    setVisibleItems(prev => Math.min(prev + 3, projectsPost.length));
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

  // Ya están ordenados del más nuevo al más viejo en projectsPost
  const displayedProjects = projectsPost.slice(0, visibleItems);
  
  return (     
    <section 
      id="blog" 
      className="relative z-10 border-t my-12 lg:my-20 border-[#25213b]/30"
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
      
      {/* Projects Grid - Cards uniformes */}
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Hint para móvil */}
        <div className="md:hidden flex items-center justify-center gap-2 mb-4 text-sm text-gray-400">
          <span>👉</span>
          <span>{language === 'es' ? 'Desliza para ver más proyectos' : 'Swipe to see more projects'}</span>
          <span>👈</span>
        </div>
        
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 snap-x snap-mandatory md:snap-none scroll-smooth">
          {displayedProjects.map((post) => {
            const isExpanded = expandedIds.has(post.id);
            const title = typeof post.title === 'object' ? post.title[language] : post.title;
            const excerpt = typeof post.excerpt === 'object' ? post.excerpt[language] : post.excerpt;
            const date = typeof post.date === 'object' ? post.date[language] : post.date;

            return (
              <article
                key={post.id}
                className="flex-shrink-0 w-[320px] sm:w-[360px] md:w-auto snap-center group relative bg-gradient-to-br from-[#1a1443]/90 to-[#0d1224]/90 rounded-2xl border border-[#464c6a]/30 hover:border-[#16f2b3]/40 transition-all duration-300 hover:shadow-xl hover:shadow-[#16f2b3]/10 hover:-translate-y-1 overflow-hidden flex flex-col"
              >
                {/* Header con fecha e icono */}
                <div className="flex justify-between items-center p-4 pb-2">
                  <span className="text-xs text-[#16f2b3] font-medium px-2.5 py-1 bg-[#16f2b3]/10 rounded-full">
                    {date}
                  </span>
                  <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-violet-900/50 to-pink-900/50 rounded-lg group-hover:scale-110 transition-transform duration-300">
                    {getProjectIcon(post.id)}
                  </div>
                </div>
                
                {/* Icono grande central */}
                <div className="relative w-full h-36 mb-4 px-4">
                  <div className="w-full h-full rounded-xl bg-gradient-to-br from-violet-900/30 to-pink-900/30 border border-[#464c6a]/20 group-hover:border-[#16f2b3]/30 transition-all duration-500 flex items-center justify-center overflow-hidden">
                    <div className="transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                      {getProjectIcon(post.id)}
                    </div>
                  </div>
                </div>
                
                {/* Contenido - flex-grow para altura uniforme */}
                <div className="px-4 pb-4 flex flex-col flex-grow">
                  {/* Título */}
                  <h3 className="text-base sm:text-lg font-semibold mb-2 text-white group-hover:text-[#16f2b3] transition-colors duration-300 line-clamp-2">
                    {title}
                  </h3>
                  
                  {/* Descripción expandible */}
                  <div className="mb-3 flex-grow">
                    <p className={`text-xs sm:text-sm text-gray-300 leading-relaxed ${!isExpanded ? 'line-clamp-3' : ''}`}>
                      {excerpt}
                    </p>
                    {excerpt.length > 120 && (
                      <button
                        onClick={() => toggleExpanded(post.id)}
                        className="text-[10px] text-[#16f2b3] hover:text-[#00d4aa] mt-1 font-medium"
                      >
                        {isExpanded 
                          ? (language === "es" ? "Ver menos" : "Show less")
                          : (language === "es" ? "Leer más" : "Read more")
                        }
                      </button>
                    )}
                  </div>
                  
                  {/* Tecnologías */}
                  {post.technologies && post.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.technologies.map((tech, i) => (
                        <span 
                          key={i}
                          className="text-[10px] px-2 py-1 bg-gradient-to-r from-violet-900/60 to-pink-900/60 rounded-full text-violet-200 border border-violet-700/50 hover:border-violet-500/80 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Botones - Siempre al final */}
                  <div className="flex gap-2 mt-auto">
                    {post.demoUrl && post.demoUrl !== '#' && (
                      <Link
                        href={post.demoUrl}
                        target="_blank"
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-[#16f2b3] to-[#00d4aa] hover:from-[#00d4aa] hover:to-[#16f2b3] rounded-lg text-xs font-medium text-[#0d1224] transition-all duration-300 hover:shadow-lg hover:scale-105"
                      >
                        <FiEye size={14} />
                        {t('liveDemo')}
                      </Link>
                    )}
                    {post.urlGithub && (
                      <Link
                        href={post.urlGithub}
                        target="_blank"
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 rounded-lg text-xs font-medium text-white transition-all duration-300 hover:shadow-lg hover:scale-105"
                      >
                        <FiGithub size={14} />
                        {t('sourceCode')}
                      </Link>
                    )}
                    {!post.urlGithub && (!post.demoUrl || post.demoUrl === '#') && (
                      <button
                        disabled
                        className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-600/50 cursor-not-allowed rounded-lg text-xs font-medium text-gray-400"
                      >
                        <FiEye size={14} />
                        {language === 'es' ? 'Próximamente' : 'Coming Soon'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </article>
            );
          })}
        </div>

        {/* Load More Button */}
        {visibleItems < projectsPost.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              className="group px-8 py-3 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-pink-600 hover:to-violet-600 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 hover:scale-105"
            >
              <span className="flex items-center gap-2">
                {language === 'es' ? 'Ver más proyectos' : 'Load More Projects'}
                <FiExternalLink className="group-hover:translate-x-1 transition-transform duration-300" size={16} />
              </span>
            </button>
          </div>
        )}

        {/* Projects Counter */}
        <div className="flex justify-center mt-8">
          <span className="text-sm text-gray-400">
            {language === 'es' 
              ? `Mostrando ${visibleItems} de ${projectsPost.length} proyectos`
              : `Showing ${visibleItems} of ${projectsPost.length} projects`
            }
          </span>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
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
        @media (max-width: 768px) {
          .overflow-x-auto::-webkit-scrollbar {
            height: 6px;
          }

          .overflow-x-auto::-webkit-scrollbar-track {
            background: #1a1443;
            border-radius: 10px;
          }

          .overflow-x-auto::-webkit-scrollbar-thumb {
            background: linear-gradient(to right, #16f2b3, #1a1443);
            border-radius: 10px;
          }

          .overflow-x-auto::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to right, #16f2b3, #16f2b3);
          }
        }
      `}</style>
    </section>   
  ); 
};  

export default Blog;