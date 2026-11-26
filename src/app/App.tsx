import { useT } from '@/i18n/useT'

export default function App() {
  const { locale, setLocale, t } = useT()

  return (
    <main className="min-h-screen bg-midnight text-pure font-display">
      <button
        type="button"
        aria-label={t('locale.label')}
        onClick={() => setLocale(locale === 'en' ? 'fr' : 'en')}
      >
        {t('locale.switchTo')}
      </button>
      <h1 className="p-8 text-3xl">Seydou DIAKITE</h1>
    </main>
  )
}
