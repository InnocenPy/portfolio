import { useEffect, useRef } from 'react'
import { getProjectById } from '@/features/projects/getProjectById'
import { useT } from '@/i18n/useT'
import { useExperienceStore } from '@/store/experienceStore'
import { isSocialActive } from '@/utils/social'

export function ProjectDetailPanel() {
  const { locale, t } = useT()
  const { selectedProjectId, setSelectedProjectId } = useExperienceStore()
  const closeRef = useRef<HTMLButtonElement>(null)
  const project = selectedProjectId ? getProjectById(selectedProjectId) : undefined
  const projectId = project?.id

  useEffect(() => {
    if (!projectId) return
    // Remember what opened the panel (e.g. the "Open" button) to restore focus on close.
    const trigger = document.activeElement
    closeRef.current?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedProjectId(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      if (trigger instanceof HTMLElement && trigger !== document.body && trigger.isConnected) {
        trigger.focus()
      }
    }
  }, [projectId, setSelectedProjectId])

  if (!project) return null

  return (
    <aside
      role="dialog"
      aria-modal="false"
      aria-labelledby="project-panel-title"
      data-testid="project-detail-panel"
      className="fixed inset-x-0 bottom-0 z-40 max-h-[75vh] overflow-y-auto rounded-t-xl border-t border-cyan/40 bg-navy p-6 shadow-2xl md:inset-x-auto md:bottom-auto md:right-0 md:top-0 md:h-full md:max-h-none md:w-[28rem] md:rounded-none md:border-l md:border-t-0"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-cyan">
            {project.category[locale]}
          </p>
          <h2 id="project-panel-title" className="mt-2 text-2xl font-semibold text-pure">
            {project.name}
          </h2>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={() => setSelectedProjectId(null)}
          className="rounded border border-silver/40 px-3 py-1 font-mono text-xs text-pure hover:border-cyan hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
        >
          {t('works.close')}
        </button>
      </div>
      <p className="mt-4 text-pure">{project.shortDescription[locale]}</p>
      <p className="mt-3 text-silver">{project.longDescription[locale]}</p>
      {project.technologies.length > 0 && (
        <div className="mt-6">
          <h3 className="font-mono text-xs uppercase tracking-widest text-silver">
            {t('worksSection.technologies')}
          </h3>
          <ul className="mt-2 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <li key={tech} className="rounded border border-cyan/40 px-3 py-1 text-sm text-cyan">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      )}
      {isSocialActive(project.externalUrl) && (
        <a
          href={project.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded bg-cyan px-4 py-2 font-mono text-sm font-semibold text-midnight"
        >
          {project.name} ↗
        </a>
      )}
    </aside>
  )
}
