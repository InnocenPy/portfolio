import { useT } from '@/i18n/useT'
import type { SceneId } from '@/types/portfolio'

export function PlaceholderSection({ id }: { id: Exclude<SceneId, 'intro'> }) {
  const { t } = useT()
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="flex min-h-screen items-center px-4 py-24 md:px-8"
    >
      <h2 id={`${id}-heading`} className="text-3xl font-semibold text-pure md:text-5xl">
        {t(`nav.${id}`)}
      </h2>
    </section>
  )
}
