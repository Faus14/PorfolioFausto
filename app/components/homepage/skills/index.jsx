"use client";

import {
  SiAmazonaws,
  SiAnsible,
  SiCloudflare,
  SiDebian,
  SiDocker,
  SiGit,
  SiGnubash,
  SiGooglecloud,
  SiGrafana,
  SiKubernetes,
  SiLinux,
  SiNginx,
  SiPostgresql,
  SiPrometheus,
  SiPulumi,
  SiPython,
  SiTerraform,
  SiTypescript,
} from "react-icons/si";
import { FiActivity, FiBox, FiFileText, FiGlobe } from "react-icons/fi";
import { skillGroups } from "@/utils/data/skills";
import { useTranslation } from "@/hooks/useTranslation";
import SectionHeader from "../../helper/section-header";

const ICONS = {
  linux: SiLinux,
  docker: SiDocker,
  gcp: SiGooglecloud,
  aws: SiAmazonaws,
  terraform: SiTerraform,
  pulumi: SiPulumi,
  ansible: SiAnsible,
  kubernetes: SiKubernetes,
  python: SiPython,
  odoo: FiBox,
  bash: SiGnubash,
  typescript: SiTypescript,
  grafana: SiGrafana,
  prometheus: SiPrometheus,
  logs: FiFileText,
  uptime: FiActivity,
  postgresql: SiPostgresql,
  nginx: SiNginx,
  git: SiGit,
  debian: SiDebian,
  dns: FiGlobe,
  cloudflare: SiCloudflare,
};

// Grid placement for 5 groups on a 6-column desktop grid:
// row 1 → Infra (wide) + Automation, row 2 → Observability, Systems, Networking
const LAYOUT = {
  infra: "lg:col-span-4",
  automation: "lg:col-span-2",
  observability: "lg:col-span-2",
  systems: "lg:col-span-2",
  networking: "lg:col-span-2",
};

function SkillChip({ item }) {
  const Icon = ICONS[item.icon];
  return (
    <li className="group/chip inline-flex items-center gap-2 rounded-lg border border-line bg-white/[0.02] px-3 py-2 text-sm text-ink transition-colors duration-200 hover:border-line-strong hover:bg-white/[0.05]">
      {Icon && (
        <Icon
          className="h-3.5 w-3.5 shrink-0 text-ink-faint transition-colors duration-200 group-hover/chip:text-accent"
          aria-hidden="true"
        />
      )}
      {item.name}
    </li>
  );
}

export default function Skills() {
  const { t, l } = useTranslation();

  return (
    <section id="skills" className="section border-t border-line" aria-labelledby="skills-heading">
      <div className="container-page">
        <SectionHeader
          index="03"
          eyebrow={t("skillsEyebrow")}
          title={t("skillsTitle")}
          description={t("skillsDescription")}
          id="skills-heading"
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          {skillGroups.map((group, i) => (
            <article
              key={group.id}
              className={`card reveal flex flex-col p-6 transition-colors duration-300 hover:border-line-strong ${
                LAYOUT[group.id] ?? "lg:col-span-2"
              } ${group.id === "infra" ? "md:col-span-2" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold tracking-tight text-white">{l(group.title)}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{l(group.description)}</p>
                </div>
                <span className="font-mono text-xs text-ink-faint">0{i + 1}</span>
              </div>
              <ul className="mt-6 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <SkillChip key={item.name} item={item} />
                ))}
              </ul>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
