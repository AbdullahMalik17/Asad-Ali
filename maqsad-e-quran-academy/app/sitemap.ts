import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://maqsadquran.com";

  // Base site routes
  const routes = [
    "",
    "#home",
    "#about",
    "#courses",
    "#teachers",
    "#faq",
    "#contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic Course URLs for SEO indexation
  const courseSlugs = [
    "noorani-qaida",
    "quran-with-tajweed",
    "quran-memorization-hifz",
    "quran-translation-tafseer",
    "islamic-studies-duas",
  ];

  const courseRoutes = courseSlugs.map((slug) => ({
    url: `${baseUrl}/courses/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...routes, ...courseRoutes];
}
