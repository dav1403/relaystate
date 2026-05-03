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
  const isFr = locale === "fr";

  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0B1F3A 0%, #0d2847 40%, #162d50 70%, #0B1F3A 100%)",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(#C9A850 1px, transparent 1px), linear-gradient(90deg, #C9A850 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#C9A850]/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-32 text-white text-center">
          <span className="inline-block text-xs font-semibold text-[#C9A850] border border-[#C9A850]/40 px-4 py-1.5 rounded-full mb-8 uppercase tracking-widest">
            {t("hero.badge")}
          </span>
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            {t("hero.title")}
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link
              href={`/${locale}/deals`}
              className="gold-gradient text-[#0B1F3A] font-bold px-10 py-4 rounded-full hover:opacity-90 transition-opacity text-sm shadow-lg"
            >
              {t("hero.cta_primary")}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="bg-white/10 border border-white/20 text-white font-semibold px-10 py-4 rounded-full hover:bg-white/20 transition-colors text-sm"
            >
              {t("hero.cta_secondary")}
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { num: "500+", label: isFr ? "Biens analysés/mois" : "Properties/month" },
              { num: "3", label: isFr ? "Villes couvertes" : "Cities covered" },
              { num: "FR·EN", label: isFr ? "Langues" : "Languages" },
              { num: "24/7", label: isFr ? "Veille en direct" : "Live monitoring" },
            ].map((s) => (
              <div key={s.num} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="font-display text-2xl font-bold text-[#C9A850]">{s.num}</p>
                <p className="text-xs text-white/50 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="#F8F4EE" />
          </svg>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#C9A850]">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap justify-center gap-6 text-[#0B1F3A] text-xs font-bold uppercase tracking-wide">
          <span>🏙️ Jérusalem · Tel Aviv · Netanya</span>
          <span>📡 {isFr ? "Veille 24/7" : "24/7 monitoring"}</span>
          <span>🌍 FR · EN · עברית</span>
          <span>⚡ {isFr ? "Alertes en temps réel" : "Real-time alerts"}</span>
        </div>
      </section>

      {/* ── WHY RELAYSTATE ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-[#C9A850] text-xs font-bold uppercase tracking-widest mb-3">
            {isFr ? "Notre approche" : "Our approach"}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0B1F3A]">
            {t("values.title")}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[0, 1, 2].map((i) => (
            <div key={i} className="card-hover bg-white rounded-3xl p-8 shadow-sm border border-gray-100 text-center group">
              <div className="w-16 h-16 rounded-2xl gold-gradient flex items-center justify-center text-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-200">
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

      {/* ── NEIGHBORHOODS BAND ── */}
      <section className="bg-[#0B1F3A] py-16 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <p className="text-[#C9A850] text-xs font-bold uppercase tracking-widest text-center mb-10">
            {isFr ? "Zones couvertes" : "Covered areas"}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Rechavia", emoji: "🌳", desc: isFr ? "Quartier premium" : "Premium district" },
              { name: "Katamon", emoji: "🏛️", desc: isFr ? "Familial & calme" : "Family & quiet" },
              { name: isFr ? "Colonie Allemande" : "German Colony", emoji: "☕", desc: isFr ? "Tendance & vivant" : "Trendy & vibrant" },
              { name: "Baka", emoji: "🌿", desc: isFr ? "Résidentiel prisé" : "Sought-after residential" },
            ].map((q) => (
              <div key={q.name} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-colors">
                <div className="text-3xl mb-3">{q.emoji}</div>
                <p className="font-display text-white font-bold text-sm mb-1">{q.name}</p>
                <p className="text-white/40 text-xs">{q.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEALS ── */}
      {deals.length > 0 && (
        <section className="py-24 px-4 bg-[#F0EBE1]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-[#C9A850] text-xs font-bold uppercase tracking-widest mb-3">
                {isFr ? "Sélection exclusive" : "Exclusive selection"}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0B1F3A] mb-3">
                {t("deals.title")}
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto text-sm">{t("deals.subtitle")}</p>
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
                className="inline-block border-2 border-[#0B1F3A] text-[#0B1F3A] font-semibold px-8 py-3 rounded-full hover:bg-[#0B1F3A] hover:text-white transition-colors text-sm"
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
            <p className="text-[#C9A850] text-xs font-bold uppercase tracking-widest mb-3">
              {isFr ? "Nos guides" : "Our guides"}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0B1F3A] mb-3">
              {t("articles.title")}
            </h2>
            <p className="text-gray-500 text-sm max-w-xl mx-auto">{t("articles.subtitle")}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Featured article */}
            <Link
              href={`/${locale}/articles/${articles[0].slug}`}
              className="card-hover lg:col-span-3 bg-[#0B1F3A] rounded-3xl overflow-hidden group flex flex-col"
            >
              <div className="p-8 flex-1 flex flex-col">
                <span className="text-xs font-bold text-[#C9A850] uppercase tracking-wide mb-4 inline-block">
                  {articles[0].category}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug group-hover:text-[#C9A850] transition-colors flex-1">
                  {articles[0].title}
                </h3>
                <p className="text-white/50 text-sm mb-6 line-clamp-2">{articles[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white/30 text-xs">{articles[0].readTime} {t("articles.min_read")}</span>
                  <span className="text-[#C9A850] text-sm font-semibold">{t("articles.read_more")} →</span>
                </div>
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
      <section className="bg-[#0B1F3A] py-28 px-4 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(#C9A850 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto text-center text-white">
          <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            {t("contact.title")}
          </h2>
          <p className="text-white/60 text-lg mb-10 leading-relaxed">{t("contact.subtitle")}</p>
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
