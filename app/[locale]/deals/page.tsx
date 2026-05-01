import { getTranslations } from "next-intl/server";
import Link from "next/link";
import DealCard from "@/components/DealCard";
import { getDeals } from "@/lib/deals";

export default async function DealsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const deals = getDeals();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <span className="inline-block text-xs font-semibold text-[#C9A850] border border-[#C9A850]/40 px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
          {t("hero.badge")}
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] mb-3">
          {t("deals.title")}
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">{t("deals.subtitle")}</p>
      </div>

      {deals.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          {locale === "fr"
            ? "Aucune opportunité pour le moment. Revenez bientôt."
            : "No opportunities at the moment. Check back soon."}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      )}

      <div className="mt-16 bg-[#0B1F3A] rounded-2xl p-8 text-white text-center">
        <h2 className="text-xl font-bold mb-3">
          {locale === "fr"
            ? "Vous cherchez quelque chose de précis ?"
            : "Looking for something specific?"}
        </h2>
        <p className="text-white/70 text-sm mb-6">
          {locale === "fr"
            ? "Dites-nous vos critères et nous scrutions le marché pour vous en priorité."
            : "Tell us your criteria and we'll monitor the market for you on priority."}
        </p>
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
