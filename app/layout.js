import { GoogleTagManager } from "@next/third-parties/google";
import { Inter } from "next/font/google";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import LanguageToggle from "./components/language-toggle";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LayoutClient from "./layout-client";
import "./css/card.scss";
import "./css/globals.scss";
import "./css/mobile-optimizations.css"; // ✅ Optimizaciones para móvil

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // ✅ Font display optimizado
  preload: true
});

export const metadata = {
  title: "Portfolio of Fausto Saludas - Systems Engineer",
  description: "Systems Engineer with experience in system administration and software development",
  keywords: "portfolio, systems engineer, software development, devops",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Preload critical resources */}
        <link rel="preload" href="/profile.jpeg" as="image" type="image/jpeg" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body 
        className={inter.className}
        suppressHydrationWarning={true}
      >
        <LanguageProvider>
          <LayoutClient />
          <LanguageToggle />
          <main className="min-h-screen relative mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] text-white">
            <Navbar />
            {children}
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}