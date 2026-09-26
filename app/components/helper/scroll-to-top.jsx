"use client";

import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { useTranslation } from "@/hooks/useTranslation";

const SCROLL_THRESHOLD = 800;

const ScrollToTop = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label={t("backToTop")}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 grid h-10 w-10 place-items-center rounded-full border border-line-strong bg-surface/90 text-ink-muted shadow-lg backdrop-blur transition-[opacity,transform,color] duration-300 hover:text-white sm:bottom-8 sm:right-8 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <FiArrowUp className="h-4 w-4" aria-hidden="true" />
    </button>
  );
};

export default ScrollToTop;
