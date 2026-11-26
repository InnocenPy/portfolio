import { useT } from '@/i18n/useT'
import { audioController } from '@/services/audio/AudioController'
import { useExperienceStore } from '@/store/experienceStore'

export function LocaleToggle() {
  const { locale, setLocale, t } = useT()
  const { audioEnabled } = useExperienceStore()

  const toggleLocale = () => {
    setLocale(locale === 'en' ? 'fr' : 'en')
    if (audioEnabled) audioController.playUiTick()
  }

  return (
    <button
      type="button"
      aria-label={t('locale.label')}
      onClick={toggleLocale}
      className="rounded border border-silver/40 px-3 py-1 font-mono text-xs text-pure transition hover:border-cyan hover:text-cyan focus-visible:outline-2 focus-visible:outline-cyan"
    >
      {t('locale.switchTo')}
    </button>
  )
}
