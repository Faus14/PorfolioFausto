// @flow strict
"use client"; 

import { experiences } from "@/utils/data/experience";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";
import { BsPersonWorkspace, BsBuildingsFill, BsTools } from "react-icons/bs";
import experience from '../../../assets/lottie/code.json';
import dynamic from 'next/dynamic';

// Importaciones dinámicas
const GlowCard = dynamic(() => import("../../helper/glow-card"), { 
  ssr: false 
});

const AnimationLottie = dynamic(() => import("../../helper/animation-lottie"), { 
  ssr: false 
});

function Experience() {
  const { t, language } = useTranslation();

  return (
    <div id="experience" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            {t('experienceTitle')}
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex justify-center items-start">
            <div className="w-full h-full">
              <AnimationLottie animationPath={experience} />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-6">
              {
                experiences.map(experience => (
                  <GlowCard key={experience.id} identifier={`experience-${experience.id}`}>
                    <div className="p-3 relative">
                      <Image
                        src="/blur-23.svg"
                        alt="Hero"
                        width={1080}
                        height={200}
                        className="absolute bottom-0 opacity-80"
                      />
                      <div className="flex justify-center">
                        <p className="text-xs sm:text-sm text-[#16f2b3]">
                          {typeof experience.duration === 'object' ? experience.duration[language] : experience.duration}
                        </p>
                      </div>
                      <div className="flex items-start gap-x-6 px-3 py-5">
                        <div className="text-violet-500 transition-all duration-300 hover:scale-125 mt-1">
                          <BsPersonWorkspace size={32} />
                        </div>
                        <div className="w-full">
                          <div className="mb-3">
                            <p className="text-base sm:text-xl font-medium uppercase bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                              {typeof experience.title === 'object' ? experience.title[language] : experience.title}
                            </p>
                            <div className="flex items-center text-sm sm:text-base mt-1">
                              <BsBuildingsFill className="text-[#16f2b3] mr-2" size={14} />
                              <span className="text-white font-medium">{language === 'es' ? 'Empresa:' : 'Company:'}</span>
                              <span className="ml-2 text-[#16f2b3]">{experience.company}</span>
                            </div>
                          </div>
                          <div className="mt-3 bg-gradient-to-r from-violet-900/40 to-transparent p-3 rounded-lg border-l-2 border-violet-500">
                            <p className="text-sm text-violet-200 leading-relaxed font-light tracking-wide">
                              {typeof experience.description === 'object' ? experience.description[language] : experience.description}
                            </p>
                          </div>
                          
                          {/* Sección de herramientas */}
                          {experience.tools && experience.tools.length > 0 && (
                            <div className="mt-4">
                              <div className="flex items-center mb-2">
                                <BsTools className="text-[#16f2b3] mr-2" size={14} />
                                <span className="text-white font-medium text-sm">
                                  {language === 'es' ? 'Herramientas y Tecnologías:' : 'Tools & Technologies:'}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {experience.tools.map((tool, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 text-xs bg-gradient-to-r from-violet-600/20 to-pink-600/20 
                                             border border-violet-500/30 rounded-full text-violet-200 
                                             hover:from-violet-600/30 hover:to-pink-600/30 
                                             transition-all duration-300 hover:scale-105"
                                  >
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;