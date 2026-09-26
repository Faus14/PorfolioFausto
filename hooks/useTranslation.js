"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/utils/translations";
import { localized } from "@/utils/format";

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key) => translations[language]?.[key] ?? translations.en[key] ?? key;
  // Resolve a { en, es } data field for the current language
  const l = (value) => localized(value, language);

  return { t, l, language };
};
