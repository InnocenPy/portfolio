import { useT } from '@/i18n/useT'

export function SkipLink() {
  const { t } = useT()
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-cyan focus:px-4 focus:py-2 focus:text-midnight"
    >
      {t('nav.skip')}
    </a>
  )
}
