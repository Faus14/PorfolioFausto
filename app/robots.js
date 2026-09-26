import { personalData } from "@/utils/data/personal-data";

export const dynamic = "force-static";

export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${personalData.siteUrl}/sitemap.xml`,
    host: personalData.siteUrl,
  };
}
