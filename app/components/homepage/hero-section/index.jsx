// @flow strict
"use client";

import { personalData } from "@/utils/data/personal-data";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";


function HeroSection() {
  const { t, language } = useTranslation();

  return (
    <section className="relative flex flex-col items-center justify-center py-4 lg:py-12 min-h-[80vh]">
      <Image
        src="/hero.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute -top-[98px] -z-10"
      />

      <div className="w-full flex flex-col items-center justify-center">
        <div className="max-w-3xl flex flex-col items-center justify-center p-2 text-center">
          <h1 className="text-3xl font-bold leading-10 text-white md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem]">
            {language === 'es' ? 'Hola, soy' : t('greeting')} {' '}
            <span className="text-pink-500">{personalData.name}</span>
            {language === 'es' 
              ? ', Ingeniero en Sistemas ' 
              : ', a Systems Engineer '
            }
            <span className="text-[#16f2b3]">
              {language === 'es' 
                ? 'apasionado por la infraestructura de TI y el desarrollo de software'
                : 'passionate about IT infrastructure and software development'
              }
            </span>
            .
          </h1>

          <div className="my-8 md:my-12 flex items-center gap-4 md:gap-5 justify-center">
            <Link
              href={personalData.github}
              target='_blank'
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <BsGithub size={24} className="md:w-8 md:h-8" />
            </Link>
            <Link
              href={personalData.linkedIn}
              target='_blank'
              className="transition-all text-pink-500 hover:scale-125 duration-300"
            >
              <BsLinkedin size={24} className="md:w-8 md:h-8" />
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
            <Link href="#contact" className="bg-gradient-to-r to-pink-500 from-violet-600 p-[1px] rounded-full transition-all duration-300 hover:from-pink-500 hover:to-violet-600 w-full sm:w-auto">
              <button className="w-full sm:w-auto px-4 text-xs md:px-8 py-3 md:py-4 bg-[#0d1224] rounded-full border-none text-center md:text-sm font-medium uppercase tracking-wider text-[#ffff] no-underline transition-all duration-200 ease-out md:font-semibold flex items-center justify-center gap-1 hover:gap-3">
                <span>{language === 'es' ? 'Contáctame' : 'Contact me'}</span>
                <RiContactsFill size={16} />
              </button>
            </Link>

            <Link className="w-full sm:w-auto flex items-center justify-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-4 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold" role="button" target="_blank" href={personalData.resume}
            >
              <span>{language === 'es' ? 'Descargar CV' : 'Get Resume'}</span>
              <MdDownload size={16} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;