// Degree and teaching are the primary entries; courses render as a compact list.
export const primaryEducation = [
  {
    id: "degree",
    kind: { en: "Degree", es: "Título de grado" },
    title: {
      en: "Information Systems Engineer",
      es: "Ingeniero en Sistemas de Información",
    },
    institution: "Universidad Tecnológica Nacional",
    campus: { en: "Rosario Regional Faculty", es: "Facultad Regional Rosario" },
    period: { en: "2019 – 2025", es: "2019 – 2025" },
    description: {
      en: "Engineering degree with a background in software architecture and full-stack development.",
      es: "Carrera de ingeniería con formación en arquitectura de software y desarrollo full stack.",
    },
  },
  {
    id: "teaching",
    kind: { en: "Teaching", es: "Docencia" },
    title: {
      en: "University Professor",
      es: "Profesor universitario",
    },
    institution: "Universidad Tecnológica Nacional",
    campus: { en: "San Nicolás Regional Faculty", es: "Facultad Regional San Nicolás" },
    period: { en: "2026 – Present", es: "2026 – Presente" },
    current: true,
  },
];

export const courses = [
  {
    id: "fullstack",
    title: { en: "Full Stack Developer", es: "Desarrollador Full Stack" },
    institution: "TheLab Technology",
    year: "2025",
    hours: 60,
    detail: { en: "TypeScript, Node.js, Angular", es: "TypeScript, Node.js, Angular" },
  },
  {
    id: "python",
    title: { en: "Python Programming", es: "Programación en Python" },
    institution: "Universidad Tecnológica Nacional",
    year: "2022",
    hours: 52,
  },
  {
    id: "responsive",
    title: { en: "Responsive Web Design — HTML5 & CSS3", es: "Diseño Web Responsive — HTML5 & CSS3" },
    institution: "UTN — Facultad Regional Chaco",
    year: "2020",
    hours: 62,
  },
];
