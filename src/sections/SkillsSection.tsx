import { skills } from '@/data/skills'
import { useT } from '@/i18n/useT'

export function SkillsSection() {
  const { locale, t } = useT()
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="min-h-screen px-4 py-24 md:px-8"
    >
      <h2 id="skills-heading" className="pointer-events-auto text-3xl font-semibold text-pure md:text-5xl">
        {t('skillsSection.heading')}
      </h2>
      <div className="pointer-events-auto mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((category) => (
          <div key={category.id}>
            <h3 className="font-mono text-sm uppercase tracking-widest text-cyan">
              {category.label[locale]}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {category.items.map((item) => (
                <li
                  key={item}
                  tabIndex={0}
                  className="cursor-default rounded border border-silver/30 px-3 py-1 text-sm text-pure transition-colors hover:border-cyan hover:text-cyan focus-visible:border-cyan focus-visible:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
