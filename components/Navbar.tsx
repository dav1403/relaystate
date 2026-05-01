"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavbarProps {
  locale: string;
  t: {
    home: string;
    deals: string;
    articles: string;
    contact: string;
    lang: string;
  };
}

export default function Navbar({ locale, t }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const otherLocale = locale === "fr" ? "en" : "fr";
  const otherPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const links = [
    { href: `/${locale}`, label: t.home },
    { href: `/${locale}/deals`, label: t.deals },
    { href: `/${locale}/articles`, label: t.articles },
    { href: `/${locale}/contact`, label: t.contact },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0B1F3A]/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <Link href={`/${locale}`} className="text-xl font-bold text-white tracking-tight">
          Relay<span className="text-[#C9A850]">State</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={otherPath}
            className="text-xs font-semibold text-[#C9A850] border border-[#C9A850]/40 px-3 py-1 rounded-full hover:bg-[#C9A850]/10 transition-colors"
          >
            {t.lang}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white p-2"
          aria-label="Menu"
        >
          <div className="w-5 h-0.5 bg-white mb-1" />
          <div className="w-5 h-0.5 bg-white mb-1" />
          <div className="w-5 h-0.5 bg-white" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#0B1F3A] border-t border-white/10 px-4 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white text-sm"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={otherPath}
            className="text-[#C9A850] text-xs font-semibold w-fit border border-[#C9A850]/40 px-3 py-1 rounded-full"
          >
            {t.lang}
          </Link>
        </div>
      )}
    </nav>
  );
}
