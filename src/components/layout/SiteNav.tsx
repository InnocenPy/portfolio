import { portfolioConfig } from '@/config/portfolio.config'
import { useT } from '@/i18n/useT'
import { LocaleToggle } from './LocaleToggle'
import { AudioToggle } from './AudioToggle'

export function SiteNav() {
  const { t } = useT()
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-silver/10 bg-midnight/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
        <a href="#intro" className="shrink-0 font-semibold tracking-tight text-pure">
          {portfolioConfig.identity.name}
        </a>
        <nav aria-label="Main" className="min-w-0 flex-1 overflow-x-auto">
          <ul className="flex items-center justify-start gap-4 whitespace-nowrap font-mono text-xs text-silver md:gap-6">
            {portfolioConfig.scenes.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className="transition hover:text-cyan focus-visible:text-cyan">
                  {t(`nav.${id}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <LocaleToggle />
          <AudioToggle />
        </div>
      </div>
    </header>
  )
}
