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
    deal.score >= 80 ? "#22c55e" : deal.score >= 60 ? "#f59e0b" : "#9ca3af";

  return (
    <div className="card-hover bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group">
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#0B1F3A] to-[#163660]">
        {deal.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={deal.imageUrl}
            alt=""
            className="w-full h-full object-cover blur-md opacity-30 scale-110"
          />
        )}
        {/* Score badge */}
        <div
          className="absolute top-4 right-4 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg"
          style={{ backgroundColor: scoreColor }}
        >
          <span className="text-base">★</span> {deal.score}/100
        </div>
        {/* Type badge */}
        <div className="absolute top-4 left-4">
          <span className="text-xs font-semibold bg-[#C9A850] text-[#0B1F3A] px-3 py-1.5 rounded-full">
            {deal.sellerType === "private" ? t.tag_private : t.tag_agency}
          </span>
        </div>
        {/* Price overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <p className="text-3xl font-bold drop-shadow-lg">
            {deal.price ? `${(deal.price / 1_000_000).toFixed(1)}M ₪` : t.hidden_price}
          </p>
          {deal.rooms && (
            <p className="text-sm mt-2 text-white/80 bg-black/20 px-3 py-1 rounded-full">
              {deal.rooms} {t.rooms}{deal.area ? ` · ${deal.area} ${t.sqm}` : ""}
            </p>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-gray-400 text-xs mb-4">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{t.hidden_address}</span>
        </div>

        <ul className="space-y-1.5 mb-5 flex-1">
          {deal.reasons.map((r, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-gray-500">
              <span className="text-[#C9A850] font-bold">✓</span> {r}
            </li>
          ))}
        </ul>

        <a
          href={contactHref}
          className="block text-center bg-[#0B1F3A] text-white text-sm font-semibold py-3.5 rounded-2xl group-hover:bg-[#C9A850] group-hover:text-[#0B1F3A] transition-colors"
        >
          {t.cta}
        </a>
      </div>
    </div>
  );
}
