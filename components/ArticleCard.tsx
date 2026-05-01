import Link from "next/link";
import { Article } from "@/lib/articles";

interface ArticleCardProps {
  article: Article;
  locale: string;
  t: { read_more: string; min_read: string };
}

export default function ArticleCard({ article, locale, t }: ArticleCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col">
      <span className="text-xs font-semibold text-[#C9A850] uppercase tracking-wide mb-2">
        {article.category}
      </span>
      <h3 className="text-base font-semibold text-[#0B1F3A] mb-2 flex-1 leading-snug">
        {article.title}
      </h3>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{article.excerpt}</p>
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>{article.readTime} {t.min_read}</span>
        <Link
          href={`/${locale}/articles/${article.slug}`}
          className="text-[#0B1F3A] font-semibold hover:text-[#C9A850] transition-colors"
        >
          {t.read_more} →
        </Link>
      </div>
    </div>
  );
}
