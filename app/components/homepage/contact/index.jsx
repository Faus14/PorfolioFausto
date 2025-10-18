// @flow strict
"use client";

import { useState, useEffect } from "react";
import { personalData } from "@/utils/data/personal-data";
import Link from "next/link";
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import { BsCalendar2Event } from "react-icons/bs";
import { useTranslation } from "@/hooks/useTranslation";
import dynamic from "next/dynamic";
import ContactForm from "./contact-form";

const GlowCard = dynamic(() => import("../../helper/glow-card"), { ssr: false });

export default function ContactSection() {
  const { t } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const [copied, setCopied] = useState(null); // "email" | "phone" | null

  useEffect(() => setIsClient(true), []);

  const copy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(null), 1200);
    } catch {
      // noop
    }
  };

  return (
    <section id="contact" className="relative z-50 border-t my-10 md:my-16 lg:my-24 border-[#25213b] text-white">

      {/* Título flotante lateral en desktop */}
      <div className="hidden lg:flex flex-col items-center absolute top-24 -right-8">
        <span className="bg-gradient-to-r from-[#1a1443] to-[#2a1f5f] w-fit text-white rotate-90 py-2 px-5 text-lg rounded-lg border border-violet-500/20 shadow-lg">
          {t("contactTitle")}
        </span>
        <span className="h-36 w-[2px] bg-gradient-to-b from-[#1a1443] to-[#2a1f5f]" />
      </div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start max-w-7xl mx-auto px-4 sm:px-6">
        {/* Columna izquierda: Formulario */}
        <GlowCard identifier="contact-form" className="rounded-2xl">
          <div className="p-4 sm:p-6 md:p-8">
            <ContactForm />
          </div>
        </GlowCard>

        {/* Columna derecha: Info + CTA + Social */}
        <div className="w-full">
          <div className="space-y-6 md:space-y-8">
            {/* Tarjeta: Datos de contacto */}
            <GlowCard identifier="contact-info" className="rounded-2xl">
              <div className="p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-violet-200 mb-4">
                  {t("contactTitle")}
                </h3>

                <div className="space-y-4 sm:space-y-5">
                  {/* Email */}
                  <div className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="p-2 rounded-lg bg-white/10 group-hover:bg-violet-500/20 transition-colors">
                        <MdAlternateEmail size={20} className="text-violet-300" />
                      </span>
                      <Link
                        href={`mailto:${personalData.email}`}
                        className="truncate text-sm sm:text-base hover:underline"
                      >
                        {personalData.email}
                      </Link>
                    </div>
                  </div>

                  {/* Teléfono */}
                  <div className="group flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="p-2 rounded-lg bg-white/10 group-hover:bg-violet-500/20 transition-colors">
                        <IoMdCall size={20} className="text-emerald-300" />
                      </span>
                      <Link href={`tel:${personalData.phone}`} className="truncate text-sm sm:text-base hover:underline">
                        {personalData.phone}
                      </Link>
                    </div>
                  </div>

                  {/* Dirección */}
                  <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition-all duration-300">
                    <span className="p-2 rounded-lg bg-white/10 group-hover:bg-violet-500/20 transition-colors">
                      <CiLocationOn size={22} className="text-cyan-300" />
                    </span>
                    <p className="text-sm sm:text-base text-white/90">{personalData.address}</p>
                  </div>
                </div>
              </div>
            </GlowCard>

            {/* Tarjeta: Agendar reunión */}
            <GlowCard identifier="contact-cta" className="rounded-2xl">
              <div className="p-5 sm:p-6">
                <div className="flex items-start sm:items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-violet-600/20 to-blue-600/20 border border-violet-500/20">
                    <BsCalendar2Event className="text-[#16f2b3]" size={22} />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold">
                    {t("lookingForDeveloper")}
                  </h3>
                </div>
                <p className="text-sm md:text-base text-white/80 mb-5">
                  {t("scheduleConsultation")}
                </p>

                <Link
                  target="_blank"
                  href="https://calendly.com/fausaludas14/30min"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-[#16f2b3] to-[#00d4aa] hover:from-[#00d4aa] hover:to-[#16f2b3] text-gray-900 font-semibold py-2.5 md:py-3 px-5 md:px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#16f2b3]/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16f2b3]/50"
                >
                  <BsCalendar2Event size={18} />
                  <span>{t("scheduleButton")}</span>
                </Link>
              </div>
            </GlowCard>

            {/* Social */}
            <div className="flex items-center gap-5 sm:gap-6">
              <Link target="_blank" href={personalData.github} rel="noopener noreferrer" aria-label="GitHub">
                <div className="p-3 rounded-full bg-white/10 hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-900">
                  <IoLogoGithub size={28} className="text-white group-hover:text-gray-900" />
                </div>
              </Link>
              <Link target="_blank" href={personalData.linkedIn} rel="noopener noreferrer" aria-label="LinkedIn">
                <div className="p-3 rounded-full bg-white/10 hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 text-gray-900">
                  <BiLogoLinkedin size={28} className="text-white group-hover:text-gray-900" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      </section>
  );
}
