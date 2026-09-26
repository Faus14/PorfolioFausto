import { Inter, JetBrains_Mono } from "next/font/google";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import ScrollToTop from "./components/helper/scroll-to-top";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { personalData } from "@/utils/data/personal-data";
import "./css/globals.scss";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  // Secondary font: skip preload so it doesn't compete with Inter on first paint
  preload: false,
});

const title = "Fausto Saludas — Systems Engineer & DevOps Engineer";
const description =
  "Systems Engineer and DevOps Engineer working on cloud infrastructure, automation and observability, with a background in software development. University professor at UTN San Nicolás.";

export const metadata = {
  metadataBase: new URL(personalData.siteUrl),
  title,
  description,
  applicationName: "Fausto Saludas",
  authors: [{ name: "Fausto Saludas", url: personalData.siteUrl }],
  creator: "Fausto Saludas",
  keywords: [
    "Fausto Saludas",
    "Systems Engineer",
    "DevOps Engineer",
    "Ingeniero en Sistemas",
    "infrastructure",
    "cloud",
    "automation",
    "observability",
    "Linux",
    "Terraform",
    "Argentina",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: "Fausto Saludas",
    title,
    description,
    locale: "en_US",
    alternateLocale: ["es_AR"],
    firstName: "Fausto",
    lastName: "Saludas",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#0d1224",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalData.name,
  url: personalData.siteUrl,
  image: `${personalData.siteUrl}${personalData.profile}`,
  jobTitle: ["Systems Engineer", "DevOps Engineer"],
  worksFor: { "@type": "Organization", name: "Adhoc" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Universidad Tecnológica Nacional" },
  address: { "@type": "PostalAddress", addressRegion: "Buenos Aires", addressCountry: "AR" },
  sameAs: [personalData.github, personalData.linkedIn],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <LanguageProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:text-canvas"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
