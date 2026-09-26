"use client";

import { useEffect, useRef, useState } from "react";
import {
  FiArrowUpRight,
  FiCalendar,
  FiCheck,
  FiCopy,
  FiGithub,
  FiLinkedin,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { personalData } from "@/utils/data/personal-data";
import { useTranslation } from "@/hooks/useTranslation";
import SectionHeader from "../../helper/section-header";
import ContactForm from "./contact-form";

export default function ContactSection() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalData.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard unavailable: the mailto link still works
    }
  };

  const links = [
    { label: t("scheduleCall"), href: personalData.calendly, icon: FiCalendar },
    { label: "LinkedIn", href: personalData.linkedIn, icon: FiLinkedin },
    { label: "GitHub", href: personalData.github, icon: FiGithub },
  ];

  return (
    <section id="contact" className="section border-t border-line" aria-labelledby="contact-heading">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeader
              index="06"
              eyebrow={t("contactEyebrow")}
              title={t("contactTitle")}
              description={t("contactDescription")}
              id="contact-heading"
            />

            <div className="reveal -mt-4 space-y-8">
              {/* Email */}
              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${personalData.email}`}
                  className="link-underline min-w-0 truncate text-lg font-medium text-white sm:text-xl"
                >
                  {personalData.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-line px-2 text-xs text-ink-muted transition-colors hover:border-line-strong hover:text-white"
                  aria-label={copied ? t("copied") : `${t("copy")} email`}
                >
                  {copied ? (
                    <FiCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  ) : (
                    <FiCopy className="h-3.5 w-3.5" aria-hidden="true" />
                  )}
                  <span aria-live="polite">{copied ? t("copied") : t("copy")}</span>
                </button>
              </div>

              <ul className="divide-y divide-line border-y border-line">
                {links.map(({ label, href, icon: Icon }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between py-4 text-sm text-ink-muted transition-colors hover:text-white"
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-ink-faint transition-colors group-hover:text-accent" aria-hidden="true" />
                        {label}
                      </span>
                      <FiArrowUpRight
                        className="h-4 w-4 text-ink-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>

              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="flex items-center gap-2 font-mono text-xs text-ink-faint">
                    <FiMapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {t("location")}
                  </dt>
                  <dd className="mt-1 text-ink">{personalData.address}</dd>
                </div>
                <div>
                  <dt className="flex items-center gap-2 font-mono text-xs text-ink-faint">
                    <FiPhone className="h-3.5 w-3.5" aria-hidden="true" />
                    Tel
                  </dt>
                  <dd className="mt-1">
                    <a href={`tel:${personalData.phone.replace(/\s/g, "")}`} className="text-ink transition-colors hover:text-white">
                      {personalData.phone}
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="reveal lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
