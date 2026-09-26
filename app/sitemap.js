import { personalData } from "@/utils/data/personal-data";

export const dynamic = "force-static";

export default function sitemap() {
  return [
    {
      url: personalData.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
