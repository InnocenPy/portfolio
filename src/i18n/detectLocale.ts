import type { Locale } from '@/types/portfolio'

const LOCALES: Locale[] = ['en', 'fr']

export function detectLocale(language: string, stored: string | null): Locale {
  if (stored && LOCALES.includes(stored as Locale)) {
    return stored as Locale
  }

  const base = language.toLowerCase().split('-')[0]
  return base === 'fr' ? 'fr' : 'en'
}
