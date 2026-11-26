import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Locale } from '@/types/portfolio'
import { detectLocale } from './detectLocale'
import { en } from './locales/en'
import { fr } from './locales/fr'

const STORAGE_KEY = 'portfolio.locale'
const dictionaries = { en, fr }

export type TranslationKey =
  | 'nav.intro'
  | 'nav.about'
  | 'nav.works'
  | 'nav.skills'
  | 'nav.experience'
  | 'nav.contact'
  | 'nav.skip'
  | 'audio.enable'
  | 'audio.disable'
  | 'locale.switchTo'
  | 'locale.label'
  | 'webgl.unavailable'
  | 'works.open'
  | 'works.close'
  | 'scroll'

export interface I18nContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

export const I18nContext = createContext<I18nContextValue | null>(null)

function translate(locale: Locale, key: TranslationKey): string {
  const value = key.split('.').reduce<unknown>((current, segment) => {
    if (typeof current !== 'object' || current === null) return undefined
    return (current as Record<string, unknown>)[segment]
  }, dictionaries[locale])

  return typeof value === 'string' ? value : key
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() =>
    detectLocale(navigator.language, localStorage.getItem(STORAGE_KEY)),
  )

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale)
    document.documentElement.lang = locale
  }, [locale])

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key) => translate(locale, key),
    }),
    [locale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
