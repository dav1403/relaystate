import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import Script from "next/script";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "../globals.css";

const GA_ID = "G-CVXHR3Q09P";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  return {
    title: `RelayState — ${t("title")}`,
    description: t("subtitle"),
    metadataBase: new URL("https://relaystate.com"),
    alternates: {
      canonical: `https://relaystate.com/${locale}`,
      languages: { fr: "/fr", en: "/en" },
    },
    openGraph: {
      title: `RelayState — ${t("title")}`,
      description: t("subtitle"),
      siteName: "RelayState",
      locale,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();
  const navT = (messages as Record<string, Record<string, string>>).nav;
  const footerT = (messages as Record<string, Record<string, string>>).footer;

  return (
    <html lang={locale} className={`${geist.variable} ${playfair.variable}`}>
      <head>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}</Script>
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8F6F0]">
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} t={navT as Parameters<typeof Navbar>[0]["t"]} />
          <main className="flex-1 pt-16">{children}</main>
          <Footer locale={locale} t={footerT as Parameters<typeof Footer>[0]["t"]} nav={navT as Parameters<typeof Footer>[0]["nav"]} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
