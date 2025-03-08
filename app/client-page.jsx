"use client";

import AboutSection from "./components/homepage/about";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import HeroSection from "./components/homepage/hero-section";
import Skills from "./components/homepage/skills";
import Projects from "./components/homepage/projects";

export default function ClientPage() {
  return (
    <div suppressHydrationWarning>
      <HeroSection />
      <AboutSection />
      <Skills />
      <Education />
      <Projects />
      <ContactSection />
    </div>
  );
}