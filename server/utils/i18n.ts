import { Request } from "express";
import path from "path";
import fs from "fs";

export type Locale = "en" | "ar";

interface Translations {
  errors: Record<string, string>;
  success: Record<string, string>;
}

// Cache for loaded translations
const translationsCache: Record<Locale, Translations> = {} as Record<
  Locale,
  Translations
>;

/**
 * Load translations for a specific locale
 */
function loadTranslations(locale: Locale): Translations {
  if (translationsCache[locale]) {
    return translationsCache[locale];
  }

  const filePath = path.join(__dirname, "..", "locales", `${locale}.json`);

  try {
    const data = fs.readFileSync(filePath, "utf-8");
    translationsCache[locale] = JSON.parse(data);
    return translationsCache[locale];
  } catch (error) {
    console.error(`Failed to load translations for locale: ${locale}`, error);
    // Fallback to English if the locale file is not found
    if (locale !== "en") {
      return loadTranslations("en");
    }
    throw new Error("Failed to load default translations");
  }
}

/**
 * Get a translated message by key
 * @param key - Translation key in format "category.messageKey" (e.g., "errors.invalidEmail")
 * @param locale - The locale to use ('en' or 'ar')
 * @returns The translated message
 */
export function translate(key: string, locale: Locale = "en"): string {
  const translations = loadTranslations(locale);
  const [category, messageKey] = key.split(".");

  if (category && messageKey && translations[category as keyof Translations]) {
    const message = translations[category as keyof Translations][messageKey];
    if (message) {
      return message;
    }
  }

  console.warn(`Translation not found for key: ${key} in locale: ${locale}`);

  // Fallback to English if translation not found and not already in English
  if (locale !== "en") {
    return translate(key, "en");
  }

  return key; // Return the key itself as last resort
}

/**
 * Extract locale from Express request body (frontend will send it)
 */
export function getLocaleFromRequest(req: Request): Locale {
  const locale = req.body?.locale as string;
  return locale === "en" || locale === "ar" ? locale : "ar";
}
