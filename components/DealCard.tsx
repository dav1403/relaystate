import { Lead } from "@/lib/deals";

interface DealCardProps {
  deal: Lead;
  t: {
    hidden_price: string;
    hidden_address: string;
    rooms: string;
    sqm: string;
    score: string;
    cta: string;
    tag_private: string;
    tag_agency: string;
  };
  contactHref: string;
}

export default function DealCard({ deal, t, contactHref }: DealCardProps) {
  const scoreColor =
    deal.score >= 80 ? "bg-green-500" : deal.score >= 60 ? "bg-yellow-500" : "bg-gray-400";

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
      {/* Image placeholder with blur overlay */}
      <div className="relative h-48 bg-gradient-to-br from-[#0B1F3A] to-[#1a3a6b] flex items-center justify-center overflow-hidden">
        {deal.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={deal.imageUrl}
            alt=""
            className="w-full h-full object-cover blur-sm opacity-40"
          />
        ) : null}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <p className="text-2xl font-bold">
            {deal.price ? `${(deal.price / 1_000_000).toFixed(1)}M ₪` : t.hidden_price}
          </p>
          {deal.rooms && (
            <p className="text-sm mt-1 text-white/80">
              {deal.rooms} {t.rooms} {deal.area ? `· ${deal.area} ${t.sqm}` : ""}
            </p>
          )}
        </div>
        <div className={`absolute top-3 right-3 ${scoreColor} text-white text-xs font-bold px-2 py-1 rounded-full`}>
          {t.score} {deal.score}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-[#C9A850] font-semibold uppercase tracking-wide mb-1">
          {deal.sellerType === "private" ? t.tag_private : t.tag_agency}
        </p>
        <p className="text-sm text-gray-500 mb-3">📍 {t.hidden_address}</p>
        <ul className="text-xs text-gray-400 space-y-0.5 mb-4 flex-1">
          {deal.reasons.map((r, i) => (
            <li key={i}>✓ {r}</li>
          ))}
        </ul>
        <a
          href={contactHref}
          className="block text-center bg-[#0B1F3A] text-white text-sm font-semibold py-3 rounded-xl hover:bg-[#C9A850] transition-colors"
        >
          {t.cta}
        </a>
      </div>
    </div>
  );
}
