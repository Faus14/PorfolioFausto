// Fixed month names keep server and client output identical (no Intl locale drift).
const MONTHS = {
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
};

// "2026-04" -> "Apr 2026"
export function formatMonth(yearMonth, language = "en") {
  const [year, month] = yearMonth.split("-").map(Number);
  return `${MONTHS[language]?.[month - 1] ?? MONTHS.en[month - 1]} ${year}`;
}

export function yearOf(yearMonth) {
  return yearMonth.split("-")[0];
}

// Picks the right language from a { en, es } object, or returns plain values as-is.
export function localized(value, language) {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value[language] ?? value.en;
  }
  return value;
}
