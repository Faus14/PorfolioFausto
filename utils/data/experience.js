// @flow strict
// @/utils/data/experience.js

export const experiences = [
  {
    id: 5,
    title: { en: "Blockchain DevOps Engineer", es: "DevOps Engineer Blockchain" },
    company: "SEED",
    duration: { en: "(Aug 2025 - Present)", es: "(Ago 2025 - Presente)" },
    startDate: "2025-08-01",
    // endDate ausente => actual
    description: {
      en: "Operate and automate Ethereum infrastructure: spin up and maintain full/archival nodes, validator operations, and L2 sequencer components. Build bots and automation for monitoring, alerting, and on-call tasks. Optimize performance and reliability on Linux, containerize services, and harden networking and security.",
      es: "Operación y automatización de infraestructura Ethereum: despliegue y mantenimiento de nodos full/archival, operaciones de validadores y componentes de sequencer en L2. Desarrollo de bots y automatizaciones para monitoreo, alertas y tareas de on-call. Optimización de rendimiento y confiabilidad en Linux, conteinerización de servicios y endurecimiento de red y seguridad."
    },
    tools: [
      "Linux",
      "Docker",
      "Kubernetes",
      "Nginx",
      "Python",
      "Bash",
      "Prometheus",
      "Grafana",
      "Ethereum",
      "Validator Operations",
      "Sequencer",
      "Bots",
      "Automation"
    ]
  },
  {
    id: 4,
    title: { en: "Full Stack Developer", es: "Desarrollador Full Stack" },
    company: "Kainet",
    duration: { en: "(Aug 2025 - Present)", es: "(Ago 2025 - Presente)" },
    startDate: "2025-08-01",
    description: {
      en: "Design and build full-stack web apps with Angular (SPA) and Laravel (REST APIs).",
      es: "Diseño y desarrollo de aplicaciones web full-stack con Angular (SPA) y Laravel (APIs REST)."
    },
    tools: [
      "Angular",
      "Laravel",
      "PHP",
      "TypeScript",
      "MySQL",
      "PostgreSQL",
      "Git",
      "Postman"
    ]
  },
  {
    id: 3,
    title: { en: "IT Analyst", es: "Analista de TI" },
    company: "LB Finanzas",
    duration: { en: "(Jun 2024 - Jul 2025)", es: "(Jun 2024 - Jul 2025)" },
    startDate: "2024-06-01",
    endDate: "2025-07-31",
    description: {
      en: "Maintain detailed incident logs and solution documentation. Perform in-depth log analysis to identify and resolve system issues. Use Grafana for monitoring and data visualization. Experience with Jira for ticketing, workflow organization, and project tracking.",
      es: "Mantenimiento de registros de incidentes y documentación de soluciones. Análisis profundo de logs para identificar y resolver problemas. Uso de Grafana para monitoreo y visualización. Experiencia con Jira para tickets, organización de flujos y seguimiento de proyectos."
    },
    tools: [
      "Grafana",
      "Jira",
      "Log Analysis",
      "Data Visualization",
      "Incident Management",
      "Documentation",
      "System Monitoring",
      "Ticket Management",
      "Knowledge Management",
      "Performance Optimization"
    ]
  },
  {
    id: 2,
    title: { en: "Sysadmin", es: "Administrador de Sistemas" },
    company: "Chatealo",
    duration: { en: "(Jul 2023 - Jun 2024)", es: "(Jul 2023 - Jun 2024)" },
    startDate: "2023-07-01",
    endDate: "2024-06-30",
    description: {
      en: "Implemented Docker containers to improve system management and scalability. Authored project documentation, resolved technical issues, and collaborated with cross-functional teams. Managed system and application configurations for performance and reliability.",
      es: "Implementación de contenedores Docker para mejorar la gestión y la escalabilidad. Documentación de proyectos, resolución de incidencias y colaboración con equipos multifuncionales. Gestión de configuraciones de sistemas y aplicaciones para maximizar rendimiento y confiabilidad."
    },
    tools: [
      "Docker",
      "Kubernetes",
      "Linux",
      "Aws",
      "System Administration",
      "Shell Scripting",
      "Network Configuration",
      "Server Management",
      "Monitoring Tools"
    ]
  },
  {
    id: 1,
    title: { en: "Full Stack Developer", es: "Desarrollador Full Stack" },
    company: "Freelancer",
    duration: { en: "(Jan 2023 - Mar 2024)", es: "(Ene 2023 - Mar 2024)" },
    startDate: "2023-01-01",
    endDate: "2024-03-31",
    description: {
      en: "Developed and maintained web apps with JavaScript, TypeScript, and Node.js. Designed RESTful APIs and integrated third-party services. Implemented PostgreSQL solutions for efficient storage and retrieval. Optimized performance and collaborated with UI/UX to improve user experience.",
      es: "Desarrollé y mantuve apps web con JavaScript, TypeScript y Node.js. Diseñé APIs REST e integré servicios de terceros. Implementé soluciones con PostgreSQL para almacenamiento y consulta eficientes. Optimicé el rendimiento y colaboré con UI/UX para mejorar la experiencia."
    },
    tools: [
      "TypeScript",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Angular",
      "React",
      "Git",
      "Postman"
    ]
  }
];
