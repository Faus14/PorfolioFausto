// @flow strict
"use client";
import { useLanguage } from '@/contexts/LanguageContext';
import { BiGlobe } from 'react-icons/bi';

const LanguageToggle = () => {
  const { language, changeLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'es' : 'en';
    changeLanguage(newLanguage);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="fixed top-4 right-4 z-50 bg-[#16f2b3] hover:bg-[#0dd999] text-gray-900 p-2 md:p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl flex items-center gap-1 md:gap-2"
      title={language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
    >
      <BiGlobe size={16} className="md:w-5 md:h-5" />
      <span className="font-semibold text-xs md:text-sm">
        {language === 'en' ? 'ES' : 'EN'}
      </span>
    </button>
  );
};

export default LanguageToggle;
