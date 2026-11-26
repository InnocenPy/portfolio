import { experience } from '@/data/experience'
import { useT } from '@/i18n/useT'
import { cn } from '@/utils/cn'

export function ExperienceSection() {
  const { locale, t } = useT()
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="min-h-screen px-4 py-24 md:px-8"
    >
      <h2 id="experience-heading" className="text-3xl font-semibold text-pure md:text-5xl">
        {t('experienceSection.heading')}
      </h2>
      <ol className="mt-10 max-w-2xl border-l border-silver/30">
        {experience.map((item) => (
          <li
            key={item.id}
            data-highlight={item.highlight}
            className={cn(
              'relative pb-10 pl-6 last:pb-0',
              item.highlight ? 'text-pure' : 'text-silver',
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                'absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full',
                item.highlight ? 'bg-cyan shadow-[0_0_10px_var(--color-cyan)]' : 'bg-silver/50',
              )}
            />
            <p className={cn('font-mono text-xs', item.highlight ? 'text-cyan' : 'text-silver')}>
              {item.period[locale]}
            </p>
            <h3 className={cn('mt-1 font-semibold', item.highlight ? 'text-xl' : 'text-lg')}>
              {item.organization}
            </h3>
            <p className="mt-1">{item.role[locale]}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
