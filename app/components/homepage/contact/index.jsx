// @flow strict
"use client";
import { personalData } from '@/utils/data/personal-data';
import Link from 'next/link';
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import { BsCalendar2Event } from "react-icons/bs";
import { useTranslation } from '@/hooks/useTranslation';
import ContactForm from './contact-form';

function ContactSection() {
  const { t } = useTranslation();
  
  return (
    <div id="contact" className="my-12 lg:my-16 relative mt-24 text-white">
      <div className="hidden lg:flex flex-col items-center absolute top-24 -right-8">
        <span className="bg-[#1a1443] w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md">
          {t('contactTitle')}
        </span>
        <span className="h-36 w-[2px] bg-[#1a1443]"></span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <ContactForm />
        <div className="lg:w-3/4 ">
          <div className="flex flex-col gap-5 lg:gap-9">
            <p className="text-sm md:text-xl flex items-center gap-3">
              <MdAlternateEmail
                className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={36}
              />
              <span>{personalData.email}</span>
            </p>
            <p className="text-sm md:text-xl flex items-center gap-3">
              <IoMdCall
                className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={36}
              />
              <span>
                {personalData.phone}
              </span>
            </p>
            <p className="text-sm md:text-xl flex items-center gap-3">
              <CiLocationOn
                className="bg-[#8b98a5] p-2 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={36}
              />
              <span>
                {personalData.address}
              </span>
            </p>
          </div>
          
          {/* Sección de Agendar Reunión */}
          <div className="mt-8 lg:mt-12 p-6 bg-gradient-to-r from-[#1a1443] to-[#16213e] rounded-xl border border-[#16f2b3]/20 hover:border-[#16f2b3]/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <BsCalendar2Event
                className="text-[#16f2b3]"
                size={24}
              />
              <h3 className="text-lg md:text-xl font-semibold text-white">
                {t('lookingForDeveloper')}
              </h3>
            </div>
            <p className="text-sm md:text-base text-gray-300 mb-6">
              {t('scheduleConsultation')}
            </p>
            <Link 
              target="_blank" 
              href="https://calendly.com/fausaludas14/30min"
              className="inline-flex items-center gap-3 bg-[#16f2b3] hover:bg-[#0dd999] text-gray-900 font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#16f2b3]/25"
            >
              <BsCalendar2Event size={20} />
              <span>{t('scheduleButton')}</span>
            </Link>
          </div>

          <div className="mt-8 lg:mt-16 flex items-center gap-5 lg:gap-10">
            <Link target="_blank" href={personalData.github}>
              <IoLogoGithub
                className="bg-[#8b98a5] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={48}
              />
            </Link>
            <Link target="_blank" href={personalData.linkedIn}>
              <BiLogoLinkedin
                className="bg-[#8b98a5] p-3 rounded-full hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-800 cursor-pointer"
                size={48}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;