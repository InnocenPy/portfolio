import { useT } from '@/i18n/useT'

export function WebGLFallbackNotice() {
  const { t } = useT()
  return (
    <p
      role="status"
      className="fixed bottom-4 left-4 z-40 max-w-xs rounded border border-silver/30 bg-navy/90 px-3 py-2 text-xs text-silver"
    >
      {t('webgl.unavailable')}
    </p>
  )
}
