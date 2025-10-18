// @flow strict
"use client";

import { personalData } from "@/utils/data/personal-data";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";

function AboutSection() {
  const { t, language } = useTranslation();

  return (
    <section 
      id="about" 
      className="py-8 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Decorative element - hidden on mobile for cleaner look */}
      <div className="hidden xl:flex flex-col items-center absolute top-20 -right-4 2xl:-right-8 z-10">
        <span className="bg-gradient-to-r from-[#1a1443] to-[#2d1b69] w-fit text-white rotate-90 p-3 px-6 text-lg font-semibold rounded-lg shadow-lg backdrop-blur-sm">
          {language === 'es' ? 'SOBRE MÍ' : 'ABOUT ME'}
        </span>
        <span className="h-32 w-[3px] bg-gradient-to-b from-[#1a1443] to-transparent mt-2"></span>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
          
          {/* Content Section */}
          <div className="order-2 lg:order-1 space-y-6">
            <div className="space-y-4">
              {/* Mobile title for better hierarchy */}
              <div className="block xl:hidden">
                <span className="inline-block bg-gradient-to-r from-[#16f2b3] to-[#00d4aa] bg-clip-text text-transparent font-bold text-sm tracking-wider uppercase">
                  {language === 'es' ? 'SOBRE MÍ' : 'ABOUT ME'}
                </span>
              </div>
              
              <h2 
                id="about-heading"
                className="font-bold mb-6 text-[#16f2b3] text-xl sm:text-2xl lg:text-3xl uppercase tracking-wide"
              >
                {t('aboutTitle')}
              </h2>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-200 text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-relaxed lg:leading-loose">
                {typeof personalData.description === 'object' 
                  ? personalData.description[language] 
                  : personalData.description
                }
              </p>
            </div>

            {/* Optional: Add some stats or highlights */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6">
              {/* You can add stats here if needed */}
            </div>
          </div>

          {/* Image Section */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Background decorative element */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#16f2b3]/20 to-[#1a1443]/20 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              
              {/* Image container */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <Image
                  src={personalData.profile}
                  width={320}
                  height={320}
                  alt={`${personalData.name || 'Profile'} - ${language === 'es' ? 'Foto de perfil' : 'Profile picture'}`}
                  className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-cover transition-all duration-700 group-hover:scale-110 cursor-pointer"
                  priority
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;