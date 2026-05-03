import Link from "next/link";
import { Article } from "@/lib/articles";

interface ArticleCardProps {
  article: Article;
  locale: string;
  t: { read_more: string; min_read: string };
}

export default function ArticleCard({ article, locale, t }: ArticleCardProps) {
  return (
    <Link
      href={`/${locale}/articles/${article.slug}`}
      className="card-hover bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col group h-full"
    >
      <span className="text-xs font-semibold text-[#C9A850] uppercase tracking-wide mb-3 inline-block">
        {article.category}
      </span>
      <h3 className="font-display text-base font-bold text-[#0B1F3A] mb-3 flex-1 leading-snug group-hover:text-[#C9A850] transition-colors line-clamp-3">
        {article.title}
      </h3>
      <p className="text-xs text-gray-400 mb-4 line-clamp-2 leading-relaxed">{article.excerpt}</p>
      <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100">
        <span>{article.readTime} {t.min_read}</span>
        <span className="text-[#0B1F3A] font-semibold group-hover:text-[#C9A850] transition-colors">
          {t.read_more} →
        </span>
      </div>
    </Link>
  );
}
