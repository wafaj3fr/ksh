import "./globals.css";
import type { Metadata } from "next";
import { getSettings } from "../../sanity/sanity-utils";
import AOSInit from "./components/AOSInit";
import { Geist, Geist_Mono } from "next/font/google";
import LayoutShell from "./components/LayoutShell"; // تمت الإضافة
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";

import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";

export const metadata: Metadata = {
  title: "Kuwaiti Sudanese Holding Company",
  description: "Official Website for KSHC",
  keywords:
    "KSHC, Kuwaiti Sudanese Holding Company, Sudan, Kuwait, Business, Investment, Holding Company, Technology, Real Estate, Telecommunications, Logistics",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  const settings = await getSettings(locale);
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const dir = locale === "ar" ? "rtl" : "ltr";

  const messages = await getMessages();
  return (
    <html lang={locale} dir={dir}>
      <body className="bg-white text-gray-900">
        <div
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Geist+Sans:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </div>

        <AOSInit />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* التحكم في إظهار الهيدر والفوتر خارج /admin */}
        <NextIntlClientProvider messages={messages}>
          <LayoutShell logo={settings?.logo}>{children}</LayoutShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
