"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = () => {
    // Toggle between en and ar
    const newLocale = locale === "en" ? "ar" : "en";
    // Remove current locale from pathname
    const pathWithoutLocale = pathname.replace(`/${locale}`, "");
    // Navigate to the same page with new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <button
      onClick={switchLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
    >
      <Globe className="w-4 h-4 text-gray-700" />
      <span className="text-sm font-medium text-gray-700">
        {locale === "en" ? "العربية" : "EN"}
      </span>
    </button>
  );
}
