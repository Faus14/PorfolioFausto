// @flow strict
"use client";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { useState, useEffect } from "react";

function Navbar() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const HEADER_OFFSET = 80; // compensar altura del navbar

  // Handle scroll effect + detectar sección activa (incluye contact)
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);

      const sections = ["about", "experience", "skills", "education", "blog", "contact"];
      const pos = y + HEADER_OFFSET + 10; // un poco más abajo del header fijo
      let current = "";

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (pos >= top && pos < bottom) {
          current = id;
          break;
        }
      }

      // Fallback: si estoy al fondo, marcar "contact" si existe
      const atBottom =
        window.innerHeight + y >= (document.documentElement.scrollHeight - 2);

      if (atBottom && document.getElementById("contact")) {
        current = "contact";
      }

      if (current) setActiveSection(current);
    };

    handleScroll(); // set inicial por si aterrizamos con hash
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest("nav")) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((v) => !v);
  const closeMenu = () => setIsMenuOpen(false);

  const normalizeId = (href) => {
    // acepta "/#contact", "#contact" o "contact"
    return href.replace(/^\/?#/, "");
  };

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const targetId = normalizeId(href);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offsetTop = targetElement.offsetTop - HEADER_OFFSET;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
    closeMenu();
  };

  const navItems = [
    { href: "/#about", label: t("about"), id: "about" },
    { href: "/#experience", label: t("experience"), id: "experience" },
    { href: "/#skills", label: t("skills"), id: "skills" },
    { href: "/#education", label: t("education"), id: "education" },
    { href: "/#blog", label: t("projects"), id: "blog" },
    { href: "/#contact", label: t("contact"), id: "contact" }, // <- ya estaba, lo dejamos igual
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0d1224]/95 backdrop-blur-md shadow-lg border-b border-[#464c6a]/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 lg:py-6">
            {/* Logo */}
            <div className="flex flex-shrink-0 items-center z-50">
              <Link href="/" className="group relative" aria-label="Navigate to home page">
                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#16f2b3] via-[#00d4aa] to-[#16f2b3] bg-clip-text text-transparent bg-size-200 animate-gradient-x group-hover:animate-pulse transition-all duration-300">
                  Fausto Saludas
                </span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#16f2b3] to-[#00d4aa] group-hover:w-full transition-all duration-300" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex">
              <ul className="flex items-center space-x-2">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleSmoothScroll(e, item.href)}
                      className={`group relative px-4 py-2 rounded-lg transition-all duration-300 ${
                        activeSection === item.id
                          ? "text-[#16f2b3] bg-[#16f2b3]/10"
                          : "text-white hover:text-[#16f2b3]"
                      }`}
                      aria-label={`Navigate to ${item.label} section`}
                    >
                      <span className="relative z-10 text-sm font-medium tracking-wider uppercase">
                        {item.label}
                      </span>
                      <div
                        className={`absolute inset-0 rounded-lg bg-gradient-to-r from-[#16f2b3]/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                          activeSection === item.id ? "opacity-100" : ""
                        }`}
                      />
                      <div
                        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#16f2b3] to-pink-500 group-hover:w-full transition-all duration-300 ${
                          activeSection === item.id ? "w-full" : ""
                        }`}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden z-50">
              <button
                onClick={toggleMenu}
                className={`relative p-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#16f2b3]/50 ${
                  isMenuOpen
                    ? "text-[#16f2b3] bg-[#16f2b3]/10"
                    : "text-white hover:text-[#16f2b3] hover:bg-white/5"
                }`}
                aria-label="Toggle mobile menu"
                aria-expanded={isMenuOpen}
              >
                <div className="w-6 h-6 relative">
                  <span
                    className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 ${
                      isMenuOpen ? "rotate-45 top-3" : "top-1"
                    }`}
                  />
                  <span
                    className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 top-3 ${
                      isMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute block w-full h-0.5 bg-current transform transition-all duration-300 ${
                      isMenuOpen ? "-rotate-45 top-3" : "top-5"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-[#0d1224]/90 backdrop-blur-md transition-opacity duration-300 ${
              isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeMenu}
          />
          {/* Menu Content */}
          <div
            className={`absolute top-0 right-0 h-full w-full max-w-sm bg-[#0d1224]/95 backdrop-blur-lg border-l border-[#464c6a]/30 shadow-2xl transform transition-transform duration-300 ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex flex-col h-full pt-24 pb-8 px-6">
              <ul className="flex-1 space-y-2">
                {navItems.map((item, index) => (
                  <li key={item.id} className="opacity-0 animate-slideInRight" style={{ animationDelay: `${index * 100}ms` }}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleSmoothScroll(e, item.href)}
                      className={`group flex items-center px-4 py-4 rounded-xl transition-all duration-300 ${
                        activeSection === item.id
                          ? "text-[#16f2b3] bg-gradient-to-r from-[#16f2b3]/20 to-pink-500/20 border-l-4 border-[#16f2b3]"
                          : "text-white hover:text-[#16f2b3] hover:bg-white/5 hover:border-l-4 hover:border-[#16f2b3]/50"
                      }`}
                    >
                      <span className="text-lg font-medium tracking-wider uppercase">
                        {item.label}
                      </span>
                      <div className="ml-auto transform transition-transform duration-300 group-hover:translate-x-1">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Contact button in mobile menu */}
              <div className="mt-8 pt-6 border-t border-[#464c6a]/30">
                <Link
                  href="/#contact"
                  onClick={(e) => handleSmoothScroll(e, "/#contact")}
                  className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#16f2b3] to-pink-500 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  Contact Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-20 lg:h-24" />

      {/* Custom styles */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-gradient-x { animation: gradient-x 3s ease infinite; }
        .animate-slideInRight { animation: slideInRight 0.5s ease-out forwards; }
        .bg-size-200 { background-size: 200% 200%; }
      `}</style>
    </>
  );
}

export default Navbar;
