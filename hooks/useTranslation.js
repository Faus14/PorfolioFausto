// @flow strict
"use client";
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/utils/translations';

export const useTranslation = () => {
  const { language } = useLanguage();
  
  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return { t, language };
};
