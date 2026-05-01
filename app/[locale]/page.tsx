import { getTranslations } from "next-intl/server";
import Link from "next/link";
import DealCard from "@/components/DealCard";
import ArticleCard from "@/components/ArticleCard";
import { getTopDeals } from "@/lib/deals";
import { getArticles } from "@/lib/articles";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const deals = getTopDeals(3);
  const articles = getArticles(locale).slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0B1F3A] text-white py-28 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-semibold text-[#C9A850] border border-[#C9A850]/40 px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest">
            {t("hero.badge")}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            {t("hero.title")}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto mb-10">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/deals`}
              className="bg-[#C9A850] text-[#0B1F3A] font-bold px-8 py-4 rounded-full hover:bg-[#e0bb5e] transition-colors text-sm"
            >
              {t("hero.cta_primary")}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="border border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-colors text-sm"
            >
              {t("hero.cta_secondary")}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-[#C9A850] py-4">
        <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-[#0B1F3A] text-sm font-semibold">
          <span>🏙️ Jérusalem · Tel Aviv · Netanya</span>
          <span>📡 {locale === "fr" ? "Veille 24/7" : "24/7 monitoring"}</span>
          <span>🌍 {locale === "fr" ? "FR · EN · Hébreu" : "FR · EN · Hebrew"}</span>
          <span>⚡ {locale === "fr" ? "Alertes en temps réel" : "Real-time alerts"}</span>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] text-center mb-12">
          {t("values.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="text-4xl mb-4">
                {t(`values.items.${i}.icon`)}
              </div>
              <h3 className="font-bold text-[#0B1F3A] mb-3">
                {t(`values.items.${i}.title`)}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t(`values.items.${i}.text`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Deals teaser */}
      {deals.length > 0 && (
        <section className="bg-white py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] mb-3">
                {t("deals.title")}
              </h2>
              <p className="text-gray-500">{t("deals.subtitle")}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {deals.map((deal) => (
                <DealCard
                  key={deal.id}
                  deal={deal}
                  t={{
                    hidden_price: t("deals.hidden_price"),
                    hidden_address: t("deals.hidden_address"),
                    rooms: t("deals.rooms"),
                    sqm: t("deals.sqm"),
                    score: t("deals.score"),
                    cta: t("deals.cta"),
                    tag_private: t("deals.tag_private"),
                    tag_agency: t("deals.tag_agency"),
                  }}
                  contactHref={`/${locale}/contact`}
                />
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href={`/${locale}/deals`}
                className="inline-block border-2 border-[#0B1F3A] text-[#0B1F3A] font-semibold px-8 py-3 rounded-full hover:bg-[#0B1F3A] hover:text-white transition-colors text-sm"
              >
                {t("deals.see_all")} →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Articles */}
      {articles.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1F3A] mb-3">
              {t("articles.title")}
            </h2>
            <p className="text-gray-500">{t("articles.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <div className="text-center mt-10">
            <Link
              href={`/${locale}/articles`}
              className="inline-block border-2 border-[#0B1F3A] text-[#0B1F3A] font-semibold px-8 py-3 rounded-full hover:bg-[#0B1F3A] hover:text-white transition-colors text-sm"
            >
              {t("articles.see_all")} →
            </Link>
          </div>
        </section>
      )}

      {/* CTA Contact */}
      <section className="bg-[#0B1F3A] text-white py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-white/70 mb-8">{t("contact.subtitle")}</p>
          <Link
            href={`/${locale}/contact`}
            className="bg-[#C9A850] text-[#0B1F3A] font-bold px-10 py-4 rounded-full hover:bg-[#e0bb5e] transition-colors text-sm"
          >
            {t("hero.cta_secondary")}
          </Link>
        </div>
      </section>
    </>
  );
}
