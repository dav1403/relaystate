import { getTranslations } from "next-intl/server";
import ArticleCard from "@/components/ArticleCard";
import { getArticles } from "@/lib/articles";

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const articles = getArticles(locale);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] mb-3">
          {t("articles.title")}
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">{t("articles.subtitle")}</p>
      </div>

      {articles.length === 0 ? (
        <p className="text-center text-gray-400 py-20">
          {locale === "fr" ? "Aucun article pour le moment." : "No articles yet."}
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard
              key={article.slug}
              article={article}
              locale={locale}
              t={{
                read_more: t("articles.read_more"),
                min_read: t("articles.min_read"),
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
