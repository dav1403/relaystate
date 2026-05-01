import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, getArticles } from "@/lib/articles";

export async function generateStaticParams({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  return getArticles(locale).map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = getArticleBySlug(locale, slug);
  if (!article) notFound();

  const t = await getTranslations({ locale });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      <Link
        href={`/${locale}/articles`}
        className="text-sm text-[#C9A850] hover:underline mb-8 inline-block"
      >
        ← {t("articles.see_all")}
      </Link>

      <span className="text-xs font-semibold text-[#C9A850] uppercase tracking-wide">
        {article.category}
      </span>
      <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] mt-3 mb-4 leading-tight">
        {article.title}
      </h1>
      <div className="flex items-center gap-4 text-sm text-gray-400 mb-8 pb-8 border-b border-gray-200">
        <span>{article.date}</span>
        <span>·</span>
        <span>{article.readTime} {t("articles.min_read")}</span>
      </div>

      <div
        className="prose prose-lg prose-headings:text-[#0B1F3A] prose-a:text-[#C9A850] max-w-none"
        dangerouslySetInnerHTML={{ __html: markdownToHtml(article.content) }}
      />

      <div className="mt-16 bg-[#0B1F3A] rounded-2xl p-8 text-white text-center">
        <h2 className="text-xl font-bold mb-3">
          {t("contact.title")}
        </h2>
        <p className="text-white/70 text-sm mb-6">{t("contact.subtitle")}</p>
        <Link
          href={`/${locale}/contact`}
          className="bg-[#C9A850] text-[#0B1F3A] font-bold px-8 py-3 rounded-full text-sm hover:bg-[#e0bb5e] transition-colors"
        >
          {t("hero.cta_secondary")}
        </Link>
      </div>
    </div>
  );
}

function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[h|u|l])/gm, "<p>")
    .replace(/(?<![>])$/gm, "</p>")
    .replace(/<p><\/p>/g, "");
}
