import { useT } from '@/i18n/useT'

// Disabled until audio is wired in Task 10.
export function AudioToggle() {
  const { t } = useT()
  return (
    <button
      type="button"
      disabled
      aria-disabled="true"
      aria-label={t('audio.enable')}
      className="rounded border border-silver/20 px-3 py-1 font-mono text-xs text-silver/50 disabled:cursor-not-allowed"
    >
      ♪
    </button>
  )
}
