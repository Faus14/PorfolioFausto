"use client";

import { useEffect, useRef, useState } from "react";
import { experiences } from "@/utils/data/experience";
import { useTranslation } from "@/hooks/useTranslation";
import { BsPersonWorkspace, BsBuildingsFill, BsTools } from "react-icons/bs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dynamic from "next/dynamic";

const GlowCard = dynamic(() => import("../../helper/glow-card"), { ssr: false });

export default function Experience() {
  const { t, language } = useTranslation();

  const viewportRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(1);
  const [mounted, setMounted] = useState(false);
  const itemCount = experiences.length;

  useEffect(() => {
    setMounted(true);
    const calc = () => setItemsPerView(window.innerWidth >= 1024 ? 2 : 1);
    calc();
    let rAF = null;
    const onResize = () => {
      if (rAF) cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(calc);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (rAF) cancelAnimationFrame(rAF);
    };
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onScroll = () => {
      const { scrollLeft, clientWidth } = el;
      const newIndex = Math.round(scrollLeft / clientWidth);
      setIndex(newIndex);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (i) => {
    const el = viewportRef.current;
    if (!el) return;
    const child = el.children[i];
    if (child) child.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  const next = () => scrollTo(Math.min(index + 1, itemCount - 1));
  const prev = () => scrollTo(Math.max(index - 1, 0));

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      e.preventDefault();
      el.scrollBy({ left: e.deltaY, behavior: "smooth" });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [index]);

  const pages = Math.max(1, Math.ceil(itemCount / itemsPerView));

  return (
    <div id="experience" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]" />
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            {t("experienceTitle")}
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]" />
        </div>
      </div>

      <div className="py-8">
        <div className="relative">
          {/* Controles */}
          <div className="absolute -top-14 right-0 flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous"
              className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur px-3 py-2 transition disabled:opacity-40"
              disabled={index === 0}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur px-3 py-2 transition disabled:opacity-40"
              disabled={index >= itemCount - 1}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Viewport: usamos gap entre slides (no padding dentro) */}
          <div
            ref={viewportRef}
            tabIndex={0}
            className="group relative flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-4
                       [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10"
          >
            {experiences.map((exp, idx) => (
              <section
                key={exp.id}
                className="snap-start shrink-0 w-full lg:w-1/2" // sin pr-6
                aria-roledescription="slide"
                aria-label={`${idx + 1} / ${itemCount}`}
              >
                <GlowCard identifier={`experience-${exp.id}`}>
                  {/* SIN padding extra */}
                  <div className="relative p-0">
                    <div className="flex justify-center pt-3">
                      <p className="text-xs sm:text-sm text-[#16f2b3]">
                        {typeof exp.duration === "object" ? exp.duration[language] : exp.duration}
                      </p>
                    </div>

                    <div className="flex items-start gap-x-4 px-4 py-3">
                      <div className="text-violet-500 transition-all duration-300 group-hover:scale-110 mt-1">
                        <BsPersonWorkspace size={28} />
                      </div>

                      <div className="w-full">
                        <div className="mb-2">
                          <p className="text-base sm:text-xl font-medium uppercase bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
                            {typeof exp.title === "object" ? exp.title[language] : exp.title}
                          </p>
                          <div className="flex items-center text-sm sm:text-base mt-1">
                            <BsBuildingsFill className="text-[#16f2b3] mr-2" size={14} />
                            <span className="text-white font-medium">
                              {language === "es" ? "Empresa:" : "Company:"}
                            </span>
                            <span className="ml-2 text-[#16f2b3]">{exp.company}</span>
                          </div>
                        </div>

                        {/* Descripción sin panel ni padding */}
                        <p className="text-sm text-violet-200 leading-relaxed font-light tracking-wide">
                          {typeof exp.description === "object" ? exp.description[language] : exp.description}
                        </p>

                        {/* Chips de herramientas compactos */}
                        {exp.tools && exp.tools.length > 0 && (
                          <div className="mt-3">
                            <div className="flex items-center mb-1">
                              <span className="text-[#16f2b3] mr-2 text-xs">✚</span>
                              <span className="text-white font-medium text-xs">
                                {language === "es" ? "Herramientas y Tecnologías:" : "Tools & Technologies:"}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {exp.tools.map((tool, i) => (
                                <span
                                  key={i}
                                  className="px-2 py-0.5 text-[11px] bg-gradient-to-r from-violet-600/20 to-pink-600/20
                                             border border-violet-500/30 rounded-full text-violet-200
                                             hover:from-violet-600/30 hover:to-pink-600/30 transition-all duration-200"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </GlowCard>
              </section>
            ))}
          </div>

          {/* Dots (post-mount) */}
          {mounted && (
            <div className="mt-4 flex justify-center gap-2">
              {Array.from({ length: pages }).map((_, p) => (
                <button
                  key={p}
                  onClick={() => scrollTo(p * itemsPerView)}
                  aria-label={`Go to slide ${p + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    index === p ? "w-6 bg-white" : "w-2 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
