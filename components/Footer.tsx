import Link from "next/link";

interface FooterProps {
  locale: string;
  t: { tagline: string; rights: string };
  nav: { home: string; deals: string; articles: string; contact: string };
}

export default function Footer({ locale, t, nav }: FooterProps) {
  return (
    <footer className="bg-[#0B1F3A] text-white/60 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="text-white font-bold text-lg mb-2">
            Relay<span className="text-[#C9A850]">State</span>
          </p>
          <p className="text-sm">{t.tagline}</p>
        </div>
        <div>
          <p className="text-white text-sm font-semibold mb-3">Navigation</p>
          <ul className="space-y-2 text-sm">
            {[
              { href: `/${locale}`, label: nav.home },
              { href: `/${locale}/deals`, label: nav.deals },
              { href: `/${locale}/articles`, label: nav.articles },
              { href: `/${locale}/contact`, label: nav.contact },
            ].map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-white transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-white text-sm font-semibold mb-3">Contact</p>
          <p className="text-sm">contact@relaystate.com</p>
          <p className="text-sm mt-1">relaystate.com</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs">
        © {new Date().getFullYear()} RelayState — {t.rights}
      </div>
    </footer>
  );
}
