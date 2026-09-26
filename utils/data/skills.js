// `level: "familiar"` marks working knowledge (rendered with a dashed chip).
export const skillGroups = [
  {
    id: "infra",
    title: { en: "Infrastructure & Cloud", es: "Infraestructura y Cloud" },
    description: {
      en: "Servers, containers, cloud and infrastructure as code.",
      es: "Servidores, contenedores, cloud e infraestructura como código.",
    },
    items: [
      { name: "Linux", icon: "linux" },
      { name: "Docker", icon: "docker" },
      { name: "GCP", icon: "gcp" },
      { name: "AWS", icon: "aws" },
      { name: "Terraform", icon: "terraform" },
      { name: "Pulumi", icon: "pulumi" },
      { name: "Ansible", icon: "ansible" },
      { name: "Kubernetes", icon: "kubernetes", level: "familiar" },
    ],
  },
  {
    id: "automation",
    title: { en: "Automation & Development", es: "Automatización y Desarrollo" },
    description: {
      en: "Scripts, internal tools and application code.",
      es: "Scripts, herramientas internas y código de aplicación.",
    },
    items: [
      { name: "Python", icon: "python" },
      { name: "Odoo", icon: "odoo" },
      { name: "Bash", icon: "bash" },
      { name: "JavaScript / TypeScript", icon: "typescript" },
    ],
  },
  {
    id: "observability",
    title: { en: "Observability", es: "Observabilidad" },
    description: {
      en: "Metrics, logs, dashboards and uptime monitoring.",
      es: "Métricas, logs, dashboards y monitoreo de disponibilidad.",
    },
    items: [
      { name: "Grafana", icon: "grafana" },
      { name: "Prometheus", icon: "prometheus" },
      { name: "Loki", icon: "logs" },
      { name: "UptimeRobot", icon: "uptime" },
    ],
  },
  {
    id: "systems",
    title: { en: "Systems", es: "Sistemas" },
    description: {
      en: "Databases, web servers and version control.",
      es: "Bases de datos, servidores web y control de versiones.",
    },
    items: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Nginx", icon: "nginx" },
      { name: "Git", icon: "git" },
      { name: "Debian", icon: "debian" },
    ],
  },
  {
    id: "networking",
    title: { en: "Networking", es: "Redes" },
    description: {
      en: "DNS and edge configuration.",
      es: "DNS y configuración de edge.",
    },
    items: [
      { name: "DNS", icon: "dns" },
      { name: "Cloudflare", icon: "cloudflare" },
    ],
  },
];
