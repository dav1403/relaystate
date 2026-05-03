import { MetadataRoute } from "next";
import { getArticles } from "@/lib/articles";

const BASE_URL = "https://www.relaystate.com";
const locales = ["fr", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/deals", "/articles", "/contact"];

  const staticRoutes = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === "" ? ("weekly" as const) : ("monthly" as const),
      priority: page === "" ? 1 : 0.8,
    }))
  );

  const articleRoutes = locales.flatMap((locale) =>
    getArticles(locale).map((article) => ({
      url: `${BASE_URL}/${locale}/articles/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...staticRoutes, ...articleRoutes];
}
