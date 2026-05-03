import { getTranslations } from "next-intl/server";
import Image from "next/image";
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
  const isFr = locale === "fr";

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1584715642381-d2a6e44cf8e7?w=1920&q=85"
          alt="Jerusalem"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A] via-[#0B1F3A]/60 to-[#0B1F3A]/20" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pb-24 pt-40 text-white text-center">
          <span className="inline-block text-xs font-semibold text-[#C9A850] border border-[#C9A850]/50 px-4 py-1.5 rounded-full mb-8 uppercase tracking-widest backdrop-blur-sm bg-black/10">
            {t("hero.badge")}
          </span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 drop-shadow-lg">
            {t("hero.title")}
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/deals`}
              className="gold-gradient text-[#0B1F3A] font-bold px-10 py-4 rounded-full hover:opacity-90 transition-opacity text-sm shadow-lg"
            >
              {t("hero.cta_primary")}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="backdrop-blur-sm bg-white/10 border border-white/30 text-white font-semibold px-10 py-4 rounded-full hover:bg-white/20 transition-colors text-sm"
            >
              {t("hero.cta_secondary")}
            </Link>
          </div>
        </div>

        {/* Stats strip overlapping */}
        <div className="relative z-10 bg-[#C9A850] py-4">
          <div className="max-w-6xl mx-auto px-4 flex flex-wrap justify-center gap-8 text-[#0B1F3A] text-sm font-bold">
            <span>🏙️ Jérusalem · Tel Aviv · Netanya</span>
            <span>📡 {isFr ? "Veille 24/7" : "24/7 monitoring"}</span>
            <span>🌍 FR · EN · עברית</span>
            <span>⚡ {isFr ? "Alertes en temps réel" : "Real-time alerts"}</span>
          </div>
        </div>
      </section>

      {/* ── WHY RELAYSTATE ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-[#C9A850] text-sm font-semibold uppercase tracking-widest mb-3">
            {isFr ? "Notre approche" : "Our approach"}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
            {t("values.title")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="card-hover bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center group"
            >
              <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center text-2xl mx-auto mb-6 group-hover:scale-110 transition-transform">
                {t(`values.items.${i}.icon`)}
              </div>
              <h3 className="font-display text-lg font-bold text-[#0B1F3A] mb-3">
                {t(`values.items.${i}.title`)}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t(`values.items.${i}.text`)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEIGHBORHOOD PHOTO STRIP ── */}
      <section className="relative h-64 sm:h-80 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1552423314-cf29ab68ad73?w=1920&q=80"
          alt="Jerusalem neighborhoods"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0B1F3A]/70 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <p className="font-display text-3xl sm:text-4xl font-bold mb-2">
              {isFr ? "Rechavia · Katamon · La Colonie Allemande" : "Rechavia · Katamon · German Colony"}
            </p>
            <p className="text-white/70 text-sm">
              {isFr ? "Les quartiers les plus recherchés par les acheteurs étrangers" : "The most sought-after neighborhoods by foreign buyers"}
            </p>
          </div>
        </div>
      </section>

      {/* ── DEALS ── */}
      {deals.length > 0 && (
        <section className="bg-[#0B1F3A] py-24 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[#C9A850] text-sm font-semibold uppercase tracking-widest mb-3">
                {isFr ? "Sélection exclusive" : "Exclusive selection"}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
                {t("deals.title")}
              </h2>
              <p className="text-white/60 max-w-xl mx-auto">{t("deals.subtitle")}</p>
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
            <div className="text-center mt-12">
              <Link
                href={`/${locale}/deals`}
                className="inline-block border-2 border-[#C9A850] text-[#C9A850] font-semibold px-8 py-3 rounded-full hover:bg-[#C9A850] hover:text-[#0B1F3A] transition-colors text-sm"
              >
                {t("deals.see_all")} →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── ARTICLES ── */}
      {articles.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center mb-16">
            <p className="text-[#C9A850] text-sm font-semibold uppercase tracking-widest mb-3">
              {isFr ? "Nos guides" : "Our guides"}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0B1F3A] mb-3">
              {t("articles.title")}
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">{t("articles.subtitle")}</p>
          </div>

          {/* Featured article + 2 small */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Featured */}
            <Link
              href={`/${locale}/articles/${articles[0].slug}`}
              className="card-hover lg:col-span-3 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group flex flex-col"
            >
              <div className="relative h-56 bg-gradient-to-br from-[#0B1F3A] to-[#1a3a6b]">
                <Image
                  src="https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=800&q=80"
                  alt={articles[0].title}
                  fill
                  className="object-cover opacity-50 group-hover:opacity-60 transition-opacity"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div className="absolute inset-0 flex items-end p-6">
                  <span className="text-xs font-semibold text-[#C9A850] uppercase tracking-wide bg-[#0B1F3A]/80 px-3 py-1 rounded-full">
                    {articles[0].category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-display text-xl font-bold text-[#0B1F3A] mb-3 group-hover:text-[#C9A850] transition-colors leading-snug">
                  {articles[0].title}
                </h3>
                <p className="text-sm text-gray-500 mb-4 flex-1 line-clamp-2">{articles[0].excerpt}</p>
                <span className="text-xs text-gray-400">{articles[0].readTime} {t("articles.min_read")}</span>
              </div>
            </Link>

            {/* Small cards */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {articles.slice(1, 3).map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  locale={locale}
                  t={{ read_more: t("articles.read_more"), min_read: t("articles.min_read") }}
                />
              ))}
            </div>
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

      {/* ── FINAL CTA ── */}
      <section className="relative py-32 px-4 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1580458072527-d04e5abaf24c?w=1920&q=80"
          alt="Jerusalem at night"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0B1F3A]/80" />
        <div className="relative z-10 max-w-2xl mx-auto text-center text-white">
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
            {t("contact.title")}
          </h2>
          <p className="text-white/70 text-lg mb-10 leading-relaxed">{t("contact.subtitle")}</p>
          <Link
            href={`/${locale}/contact`}
            className="gold-gradient text-[#0B1F3A] font-bold px-12 py-5 rounded-full hover:opacity-90 transition-opacity text-sm shadow-xl inline-block"
          >
            {t("hero.cta_secondary")} →
          </Link>
        </div>
      </section>
    </>
  );
}
