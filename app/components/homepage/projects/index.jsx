// @flow strict 
'use client';

import { projectsPost } from "@/utils/data/projectsPost"; 
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image"; 
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
  FaCloud
} from "react-icons/fa"; 
import { FiExternalLink, FiGithub, FiEye } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";  
import dynamic from 'next/dynamic';

// Importación dinámica
const GlowCard = dynamic(() => import("../../helper/glow-card"), { 
  ssr: false 
});

function Blog() {   
  const { t, language } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const [visibleItems, setVisibleItems] = useState(6);
  const [isInView, setIsInView] = useState({});
  const sectionRef = useRef(null);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Intersection Observer para animaciones
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-project-id');
            setIsInView(prev => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const cards = document.querySelectorAll('[data-project-id]');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [isClient]);

  // Obtener el icono según el ID del proyecto con más variedad
  const getProjectIcon = (id) => {
    const iconMap = {
      1: <FaCode size={24} className="text-blue-400" />,
      2: <FaDumbbell size={24} className="text-orange-400" />,
      3: <FaTwitter size={24} className="text-cyan-400" />,
      4: <FaPlane size={24} className="text-green-400" />,
      5: <FaStore size={24} className="text-purple-400" />,
      6: <FaRocket size={24} className="text-red-400" />,
      7: <FaMobile size={24} className="text-pink-400" />,
      8: <FaDesktop size={24} className="text-indigo-400" />,
      9: <FaDatabase size={24} className="text-yellow-400" />,
      10: <FaCloud size={24} className="text-teal-400" />
    };
    return iconMap[id] || <FaCode size={24} className="text-gray-400" />;
  };

  // Loading skeleton mejorado
  const LoadingSkeleton = () => (
    <div id="blog" className="relative z-10 border-t my-12 lg:my-20 border-[#25213b]/30">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center my-8 lg:py-12">
          <div className="flex items-center">
            <span className="w-16 sm:w-24 h-[2px] bg-[#1a1443] animate-pulse"></span>
            <span className="bg-[#1a1443]/50 w-fit text-transparent p-2 px-5 text-xl rounded-md animate-pulse">
              Loading Projects...
            </span>
            <span className="w-16 sm:w-24 h-[2px] bg-[#1a1443] animate-pulse"></span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-[#1a1443]/30 rounded-2xl h-80 animate-pulse">
              <div className="p-4 space-y-4">
                <div className="w-12 h-12 bg-[#16f2b3]/20 rounded-lg animate-pulse"></div>
                <div className="h-4 bg-[#16f2b3]/20 rounded animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-700 rounded w-3/4 animate-pulse"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-violet-900/30 rounded animate-pulse"></div>
                  <div className="h-6 w-20 bg-violet-900/30 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (!isClient) {
    return <LoadingSkeleton />;
  }

  const handleLoadMore = () => {
    setVisibleItems(prev => Math.min(prev + 3, projectsPost.length));
  };

  const displayedProjects = projectsPost.slice(0, visibleItems);
  
  return (     
    <section 
      id="blog" 
      ref={sectionRef}
      className="relative z-10 border-t my-12 lg:my-20 border-[#25213b]/30 overflow-hidden"
      aria-labelledby="projects-heading"
    >       
      {/* Background Image - Responsive */}
      <div className="absolute inset-0 -z-10 w-full h-full">
        <Image         
          src="/section.svg"         
          alt=""         
          fill
          className="object-cover object-center opacity-30 sm:opacity-40 lg:opacity-60"       
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d1224]/20 to-[#0d1224]/40"></div>
      </div>

      {/* Decorative gradient line */}
      <div className="flex justify-center -translate-y-[1px]">         
        <div className="w-3/4 sm:w-1/2 lg:w-1/3">           
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />         
        </div>       
      </div>        
      
      {/* Section Header */}
      <div className="flex justify-center my-8 lg:my-12 px-4">         
        <div className="flex items-center">           
          <span className="w-16 sm:w-24 h-[2px] bg-gradient-to-r from-[#1a1443] to-[#16f2b3]"></span>           
          <span 
            id="projects-heading"
            className="bg-gradient-to-r from-[#1a1443] to-[#2d1b69] w-fit text-white p-3 px-6 text-lg sm:text-xl lg:text-2xl rounded-xl font-semibold shadow-lg mx-4"
          >             
            {t('projectsTitle')}           
          </span>           
          <span className="w-16 sm:w-24 h-[2px] bg-gradient-to-l from-[#1a1443] to-[#16f2b3]"></span>         
        </div>       
      </div>        
      
      {/* Projects Grid */}
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">         
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {displayedProjects.map((post, index) => (
            <div
              key={post.id}
              data-project-id={post.id}
              className={`transform transition-all duration-700 ${
                isInView[post.id] 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <GlowCard identifier={`blog-${post.id}`}>
                <article className="group relative text-white h-full flex flex-col bg-gradient-to-br from-[#1a1443]/90 to-[#0d1224]/90 rounded-2xl overflow-hidden border border-[#464c6a]/30 hover:border-[#16f2b3]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-[#16f2b3]/10">
                  
                  {/* Background blur effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <Image
                      src="/blur-23.svg"
                      alt=""
                      width={1080}
                      height={200}
                      className="absolute bottom-0 w-full h-full object-cover opacity-20"
                    />
                  </div>
                  
                  {/* Header with date */}
                  <div className="relative z-10 flex justify-between items-center p-4 pb-2">
                    <span className="text-xs sm:text-sm text-[#16f2b3] font-medium px-2 py-1 bg-[#16f2b3]/10 rounded-full">
                      {typeof post.date === 'object' ? post.date[language] : post.date}
                    </span>
                    <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-violet-900/50 to-pink-900/50 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      {getProjectIcon(post.id)}
                    </div>
                  </div>
                  
                  {/* Project Icon/Image Area */}
                  <div className="relative w-full h-32 sm:h-36 mb-4 mx-4 rounded-xl bg-gradient-to-br from-violet-900/30 to-pink-900/30 border border-[#464c6a]/20 group-hover:border-[#16f2b3]/30 transition-all duration-500 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="transform transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                        {getProjectIcon(post.id)}
                      </div>
                    </div>
                    {/* Floating particles effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-[#16f2b3] rounded-full animate-pulse"
                          style={{
                            top: `${20 + i * 25}%`,
                            left: `${10 + i * 30}%`,
                            animationDelay: `${i * 200}ms`
                          }}
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Content Area */}
                  <div className="relative z-10 px-4 pb-4 flex flex-col flex-grow">
                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-semibold mb-3 text-white group-hover:text-[#16f2b3] transition-colors duration-300 line-clamp-2">
                      {typeof post.title === 'object' ? post.title[language] : post.title}
                    </h3>
                    
                    {/* Description */}
                    <div className="flex-grow mb-4">
                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-3 group-hover:text-gray-200 transition-colors duration-300">
                        {typeof post.excerpt === 'object' ? post.excerpt[language] : post.excerpt}
                      </p>
                    </div>
                    
                    {/* Technologies */}
                    {post.technologies && post.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {post.technologies.slice(0, 4).map((tech, index) => (
                          <span 
                            key={index} 
                            className="text-xs px-2 py-1 bg-gradient-to-r from-violet-900/60 to-pink-900/60 rounded-full text-violet-200 border border-violet-700/50 hover:border-violet-500/80 transition-colors duration-300 hover:scale-105"
                          >
                            {tech}
                          </span>
                        ))}
                        {post.technologies.length > 4 && (
                          <span className="text-xs px-2 py-1 bg-gray-700/50 rounded-full text-gray-400">
                            +{post.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-auto">
                      {post.urlGithub && (
                        <button
                          onClick={() => window.open(post.urlGithub, '_blank')}
                          className="flex-1 text-xs sm:text-sm bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 transition-all duration-300 py-2 px-3 rounded-lg inline-flex items-center justify-center font-medium hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                          aria-label={`View ${post.title} source code on GitHub`}
                        >
                          <FiGithub className="mr-1.5" size={14} /> 
                          {language === 'es' ? 'Código' : 'Code'}
                        </button>
                      )}
                      
                      {post.urlDemo && (
                        <button
                          onClick={() => window.open(post.urlDemo, '_blank')}
                          className="flex-1 text-xs sm:text-sm bg-gradient-to-r from-[#16f2b3] to-[#00d4aa] hover:from-[#00d4aa] hover:to-[#16f2b3] transition-all duration-300 py-2 px-3 rounded-lg inline-flex items-center justify-center font-medium text-[#0d1224] hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#16f2b3]/50"
                          aria-label={`View ${post.title} live demo`}
                        >
                          <FiExternalLink className="mr-1.5" size={14} /> 
                          {language === 'es' ? 'Demo' : 'Live'}
                        </button>
                      )}

                      {!post.urlGithub && !post.urlDemo && (
                        <button
                          disabled
                          className="flex-1 text-xs sm:text-sm bg-gray-600/50 cursor-not-allowed py-2 px-3 rounded-lg inline-flex items-center justify-center font-medium text-gray-400"
                        >
                          <FiEye className="mr-1.5" size={14} /> 
                          {language === 'es' ? 'Próximamente' : 'Coming Soon'}
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              </GlowCard>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleItems < projectsPost.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              className="group px-8 py-3 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-pink-600 hover:to-violet-600 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
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

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-5">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-violet-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-80 sm:h-80 bg-[#16f2b3]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
      `}</style>
    </section>   
  ); 
};  

export default Blog;