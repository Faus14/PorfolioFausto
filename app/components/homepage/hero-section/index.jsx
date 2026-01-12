// @flow strict
"use client";

import { personalData } from "@/utils/data/personal-data";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { FaArrowDown } from "react-icons/fa";

function HeroSection() {
  const { t, language } = useTranslation();

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      className="relative flex flex-col items-center justify-start sm:justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-4 sm:py-16 lg:py-20 sm:min-h-screen overflow-hidden bg-[#0d1224]"
      aria-labelledby="hero-heading"
    >

      <div className="relative z-10 w-full flex flex-col items-center justify-start sm:justify-center max-w-7xl mx-auto">
        <div className="max-w-5xl flex flex-col items-center justify-center text-center space-y-6 sm:space-y-12 lg:space-y-16">
          
          {/* Main Heading */}
          <div className="space-y-4 sm:space-y-6">
            <div className="inline-block">
              <span className="inline-block bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent font-semibold text-sm sm:text-base lg:text-lg tracking-wider uppercase opacity-90">
                {language === 'es' ? 'Bienvenido a mi portafolio' : 'Welcome to my portfolio'}
              </span>
            </div>
            
            <h1 
              id="hero-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight sm:leading-tight md:leading-tight lg:leading-tight text-white"
            >
              {language === 'es' ? 'Hola, soy' : t('greeting')} {' '}
              <span className="inline-block bg-gradient-to-r from-pink-500 via-pink-400 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
                {personalData.name}
              </span>
              <br className="hidden sm:block" />
              <span className="block mt-2 sm:mt-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
                {language === 'es' 
                  ? 'Ingeniero en Sistemas' 
                  : 'Systems Engineer'
                }
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              <span className="inline-block bg-gradient-to-r from-[#16f2b3] via-[#00d4aa] to-[#16f2b3] bg-clip-text text-transparent font-medium">
                {language === 'es' 
                  ? 'Apasionado por la infraestructura de TI y el desarrollo de software'
                  : 'Passionate about IT infrastructure and software development'
                }
              </span>
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 sm:gap-8 justify-center">
            <Link
              href={personalData.github}
              target='_blank'
              className="group relative p-3 sm:p-4"
              aria-label={`Visit ${personalData.name}'s GitHub profile`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              <div className="relative bg-[#0d1224] p-2 sm:p-3 rounded-full border border-pink-500/30 group-hover:border-pink-500/60 transition-all duration-300 group-hover:scale-110">
                <BsGithub className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-pink-500 group-hover:text-white transition-colors duration-300" />
              </div>
            </Link>
            
            <Link
              href={personalData.linkedIn}
              target='_blank'
              className="group relative p-3 sm:p-4"
              aria-label={`Visit ${personalData.name}'s LinkedIn profile`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              <div className="relative bg-[#0d1224] p-2 sm:p-3 rounded-full border border-pink-500/30 group-hover:border-pink-500/60 transition-all duration-300 group-hover:scale-110">
                <BsLinkedin className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-pink-500 group-hover:text-white transition-colors duration-300" />
              </div>
            </Link>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center w-full max-w-md sm:max-w-none">
            <Link 
              href="#contact" 
              className="group relative w-full sm:w-auto"
              aria-label="Navigate to contact section"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full blur-sm opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <button className="relative w-full sm:w-auto px-6 sm:px-8 lg:px-10 py-3 sm:py-4 bg-[#0d1224] rounded-full border border-transparent text-center text-sm sm:text-base lg:text-lg font-semibold uppercase tracking-wider text-white transition-all duration-300 ease-out flex items-center justify-center gap-2 group-hover:gap-4 group-hover:scale-105 group-hover:shadow-2xl">
                <span>{language === 'es' ? 'Contáctame' : 'Contact me'}</span>
                <RiContactsFill className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:rotate-12" />
              </button>
            </Link>

            <Link 
              href={personalData.resume}
              target="_blank"
              className="group w-full sm:w-auto flex items-center justify-center gap-2 group-hover:gap-4 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-center text-sm sm:text-base lg:text-lg font-semibold uppercase tracking-wider text-white transition-all duration-300 ease-out hover:shadow-2xl hover:scale-105 hover:from-violet-600 hover:to-pink-500"
              aria-label="Download resume/CV"
            >
              <span>{language === 'es' ? 'Descargar CV' : 'Get Resume'}</span>
              <MdDownload className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-y-1" />
            </Link>
          </div>

        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
        
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-900 {
          animation-delay: 0.9s;
        }
        
        .animation-delay-1200 {
          animation-delay: 1.2s;
        }
        
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
      `}</style>
    </section>
  );
}

export default HeroSection;