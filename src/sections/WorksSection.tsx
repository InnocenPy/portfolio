import { projects } from '@/data/projects'
import { useT } from '@/i18n/useT'
import { useExperienceStore } from '@/store/experienceStore'

export function WorksSection() {
  const { locale, t } = useT()
  const { setSelectedProjectId } = useExperienceStore()
  return (
    <section
      id="works"
      aria-labelledby="works-heading"
      className="min-h-screen px-4 py-24 md:px-8"
    >
      <h2 id="works-heading" className="text-3xl font-semibold text-pure md:text-5xl">
        {t('worksSection.heading')}
      </h2>
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <li key={project.id} className="rounded border border-silver/20 bg-navy p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-cyan">
              {project.category[locale]}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-pure">{project.name}</h3>
            <p className="mt-2 text-silver">{project.shortDescription[locale]}</p>
            <button
              type="button"
              onClick={() => setSelectedProjectId(project.id)}
              aria-label={`${t('works.open')} — ${project.name}`}
              className="mt-4 rounded border border-cyan/60 px-3 py-1 font-mono text-xs text-cyan hover:bg-cyan/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
            >
              {t('works.open')}
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
