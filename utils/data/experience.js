// @flow strict
// @/utils/data/experience.js

export const experiences = [
  {
    id: 1,
    title: { en: "DevOps Blockchain Engineer", es: "DevOps Blockchain Engineer" },
    company: "SEED Latam",
    duration: { en: "(Aug 2025 - Jan 2026 · 6 mos)", es: "(Ago 2025 - Ene 2026 · 6 meses)" },
    startDate: "2025-08-01",
    endDate: "2026-01-31",
    description: {
      en: "Operation and maintenance of validator nodes in blockchain networks (Ethereum and Aztec testnet). Infrastructure management on VPS servers configured from scratch (hardening, secure access via SSH, VPN, and encrypted tunnels). Developed automations and alert systems using Python bots integrated with Discord and Telegram. Implemented monitoring and observability systems using Prometheus and Grafana.",
      es: "Operación y mantenimiento de nodos validadores en redes blockchain (Ethereum y Aztec testnet). Gestión de infraestructura sobre servidores VPS configurados desde cero (hardening, acceso seguro mediante SSH, VPN y túneles cifrados). Desarrollé automatizaciones y sistemas de alertas mediante bots en Python integrados con Discord y Telegram. Implementé sistemas de monitoreo y observabilidad utilizando Prometheus y Grafana."
    },
    tools: [
      "Blockchain",
      "Ethereum",
      "Aztec",
      "VPS",
      "SSH",
      "VPN",
      "Python",
      "Discord API",
      "Telegram API",
      "Prometheus",
      "Grafana"
    ]
  },
  {
    id: 2,
    title: { en: "DevOps Support Analyst", es: "DevOps Support Analyst" },
    company: "LB Finanzas",
    duration: { en: "(Jun 2024 - Aug 2025 · 1 yr 3 mos)", es: "(Jun 2024 – Ago 2025 · 1 año 3 meses)" },
    startDate: "2024-06-01",
    endDate: "2025-08-31",
    description: {
      en: "Implementation of observability and operational automation for business teams. Development of internal backoffice tools in JavaScript. Implementation of dashboards with Grafana and Metabase used by business teams. System integrations (Jira, Intercom and others) automating operational flows. Reorganization and standardization of Jira workflows at the organizational level.",
      es: "Implementación de observabilidad y automatización operativa para equipos de negocio. Desarrollo de herramientas internas de backoffice en JavaScript. Implementación de dashboards con Grafana y Metabase utilizados por equipos de negocio. Integración de sistemas (Jira, Intercom y otros) automatizando flujos operativos. Reorganización y estandarización de workflows en Jira a nivel organizacional."
    },
    tools: [
      "JavaScript",
      "Grafana",
      "Metabase",
      "Jira",
      "Intercom",
      "Automation",
      "Workflows",
      "Observability"
    ]
  },
  {
    id: 3,
    title: { en: "DevOps Engineer", es: "DevOps Engineer" },
    company: "Chatealo",
    duration: { en: "(Jul 2023 - Jun 2024 · 1 yr)", es: "(Jul 2023 – Jun 2024 · 1 año)" },
    startDate: "2023-07-01",
    endDate: "2024-06-30",
    description: {
      en: "Modernization and standardization of production infrastructure towards containers and cloud architecture. Migration of multiple production services from traditional servers in Hetzner to Docker and Kubernetes based architecture. Design and implementation of CI/CD pipelines automating deployment processes. Managed cloud infrastructure in AWS using Terraform, enabling greater scalability. Administration of production databases, backups and monitoring. Implemented monitoring with Grafana, Prometheus and Loki.",
      es: "Modernización y estandarización de infraestructura productiva hacia contenedores y arquitectura cloud. Migración de múltiples servicios productivos desde servidores tradicionales en Hetzner hacia arquitectura basada en Docker y Kubernetes. Diseño e implementación de pipelines CI/CD automatizando procesos de despliegue. Gestioné infraestructura cloud en AWS utilizando Terraform, permitiendo una mayor escalabilidad. Administración de bases de datos productivas, backups y monitoreo. Implementé monitoreo con Grafana, Prometheus y Loki."
    },
    tools: [
      "AWS",
      "Terraform",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Hetzner",
      "Grafana",
      "Prometheus",
      "Loki",
      "Linux",
      "Databases"
    ]
  }
];
