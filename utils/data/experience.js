// Ordered newest first. `end: null` means current role.
export const experiences = [
  {
    id: "adhoc",
    title: "DevOps Engineer",
    company: "Adhoc",
    start: "2026-04",
    end: null,
    summary: {
      en: "Working on cloud infrastructure, automation, observability and DevOps operations.",
      es: "Trabajo en infraestructura cloud, automatización, observabilidad y operaciones DevOps.",
    },
  },
  {
    id: "utn-teaching",
    title: { en: "University Professor", es: "Profesor universitario" },
    company: "UTN San Nicolás",
    start: "2026",
    end: null,
    summary: {
      en: "Teaching at the Universidad Tecnológica Nacional, San Nicolás Regional Faculty.",
      es: "Docente en la Universidad Tecnológica Nacional, Facultad Regional San Nicolás.",
    },
  },
  {
    id: "seed-latam",
    title: "DevOps Blockchain Engineer",
    company: "SEED Latam",
    start: "2025-08",
    end: "2026-01",
    duration: { en: "6 mos", es: "6 meses" },
    summary: {
      en: "Operated blockchain validator nodes on self-managed Linux servers.",
      es: "Operación de nodos validadores blockchain sobre servidores Linux autogestionados.",
    },
    highlights: {
      en: [
        "Ran and maintained validator nodes on Ethereum and the Aztec testnet.",
        "Set up VPS servers from scratch: hardening, SSH access, VPN and encrypted tunnels.",
        "Implemented monitoring and observability with Prometheus and Grafana.",
        "Built Python bots for alerting and automation, integrated with Discord and Telegram.",
      ],
      es: [
        "Operé y mantuve nodos validadores en Ethereum y en la testnet de Aztec.",
        "Configuré servidores VPS desde cero: hardening, acceso por SSH, VPN y túneles cifrados.",
        "Implementé monitoreo y observabilidad con Prometheus y Grafana.",
        "Desarrollé bots en Python para alertas y automatización, integrados con Discord y Telegram.",
      ],
    },
    tools: ["Linux", "VPS", "SSH", "VPN", "Ethereum", "Aztec", "Python", "Prometheus", "Grafana"],
  },
  {
    id: "lb-finanzas",
    title: "DevOps Support Analyst",
    company: "LB Finanzas",
    start: "2024-06",
    end: "2025-08",
    duration: { en: "1 yr 3 mos", es: "1 año 3 meses" },
    summary: {
      en: "Observability and operational automation for business teams.",
      es: "Observabilidad y automatización operativa para equipos de negocio.",
    },
    highlights: {
      en: [
        "Built Grafana and Metabase dashboards used by business teams.",
        "Developed internal back-office tools in JavaScript.",
        "Integrated systems such as Jira and Intercom to automate operational workflows.",
        "Reorganized and standardized Jira workflows across the organization.",
      ],
      es: [
        "Implementé dashboards en Grafana y Metabase utilizados por equipos de negocio.",
        "Desarrollé herramientas internas de backoffice en JavaScript.",
        "Integré sistemas como Jira e Intercom para automatizar flujos operativos.",
        "Reorganicé y estandaricé los workflows de Jira a nivel organizacional.",
      ],
    },
    tools: ["JavaScript", "Grafana", "Metabase", "Jira", "Intercom"],
  },
  {
    id: "chatealo",
    title: "DevOps Engineer",
    company: "Chatealo",
    start: "2023-07",
    end: "2024-06",
    duration: { en: "1 yr", es: "1 año" },
    summary: {
      en: "Modernized production infrastructure toward containers and the cloud.",
      es: "Modernización de la infraestructura productiva hacia contenedores y cloud.",
    },
    highlights: {
      en: [
        "Migrated production services from traditional Hetzner servers to a Docker-based setup.",
        "Managed AWS infrastructure as code with Terraform.",
        "Designed and implemented CI/CD pipelines to automate deployments.",
        "Administered production databases and backups, with monitoring on Grafana, Prometheus and Loki.",
      ],
      es: [
        "Migré servicios productivos desde servidores tradicionales en Hetzner a una arquitectura basada en Docker.",
        "Gestioné infraestructura en AWS como código con Terraform.",
        "Diseñé e implementé pipelines de CI/CD para automatizar despliegues.",
        "Administré bases de datos productivas y backups, con monitoreo en Grafana, Prometheus y Loki.",
      ],
    },
    tools: ["AWS", "Terraform", "Docker", "CI/CD", "Hetzner", "Linux", "Grafana", "Prometheus", "Loki"],
  },
];
