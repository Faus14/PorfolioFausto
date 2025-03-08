"use client";
import HeroSection from "./components/homepage/hero-section";
import AboutSection from "./components/homepage/about";
import Experience from "./components/homepage/experience";


export default function ClientPage() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <Experience />
    </div>
  );
}