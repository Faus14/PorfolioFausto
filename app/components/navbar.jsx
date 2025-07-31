// @flow strict
"use client";
import { useTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { useState } from "react";


function Navbar() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-transparent">
      <div className="flex items-center justify-between py-5">
        <div className="flex flex-shrink-0 items-center">
          <Link
            href="/"
            className="text-[#16f2b3] text-2xl md:text-3xl font-bold">
            Fausto Saludas
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-pink-600 focus:outline-none focus:text-pink-600"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Navigation menu */}
        <ul className={`${
          isMenuOpen 
            ? 'flex flex-col absolute top-16 left-0 right-0 bg-[#0d1224] bg-opacity-95 backdrop-blur-sm p-4 space-y-2 shadow-lg border-t border-[#464c6a]' 
            : 'hidden'
        } md:flex md:flex-row md:space-x-1 md:space-y-0 md:relative md:top-0 md:bg-transparent md:p-0 md:shadow-none md:border-none`}>
          <li>
            <Link 
              className="block px-4 py-2 no-underline outline-none hover:no-underline" 
              href="/#about"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">{t('about').toUpperCase()}</div>
            </Link>
          </li>
          <li>
            <Link 
              className="block px-4 py-2 no-underline outline-none hover:no-underline" 
              href="/#experience"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">{t('experience').toUpperCase()}</div>
            </Link>
          </li>
          <li>
            <Link 
              className="block px-4 py-2 no-underline outline-none hover:no-underline" 
              href="/#skills"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">{t('skills').toUpperCase()}</div>
            </Link>
          </li>
          <li>
            <Link 
              className="block px-4 py-2 no-underline outline-none hover:no-underline" 
              href="/#education"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">{t('education').toUpperCase()}</div>
            </Link>
          </li>
          <li>
            <Link 
              className="block px-4 py-2 no-underline outline-none hover:no-underline" 
              href="/#blog"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600">{t('projects').toUpperCase()}</div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;