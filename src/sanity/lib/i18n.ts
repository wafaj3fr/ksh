/**
 * i18n configuration and utilities for Sanity
 */

export const SUPPORTED_LANGUAGES = {
  en: { id: 'en', title: 'English', rtl: false },
  ar: { id: 'ar', title: 'العربية', rtl: true },
} as const

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en'

export function getLanguageConfig(locale: string): (typeof SUPPORTED_LANGUAGES)[SupportedLanguage] {
  return SUPPORTED_LANGUAGES[locale as SupportedLanguage] || SUPPORTED_LANGUAGES.en
}

export function isRTL(locale: string): boolean {
  return getLanguageConfig(locale).rtl
}
