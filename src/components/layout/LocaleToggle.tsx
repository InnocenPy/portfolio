import { useT } from '@/i18n/useT'

export function LocaleToggle() {
  const { locale, setLocale, t } = useT()
  return (
    <button
      type="button"
      aria-label={t('locale.label')}
      onClick={() => setLocale(locale === 'en' ? 'fr' : 'en')}
      className="rounded border border-silver/40 px-3 py-1 font-mono text-xs text-pure transition hover:border-cyan hover:text-cyan focus-visible:outline-2 focus-visible:outline-cyan"
    >
      {t('locale.switchTo')}
    </button>
  )
}
