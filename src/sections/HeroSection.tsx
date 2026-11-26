import { portfolioConfig } from '@/config/portfolio.config'
import { useT } from '@/i18n/useT'

export function HeroSection() {
  const { locale, t } = useT()
  const { identity } = portfolioConfig
  return (
    <section
      id="intro"
      aria-labelledby="intro-heading"
      className="grid min-h-screen items-center gap-8 px-4 pb-16 pt-24 md:grid-cols-2 md:px-8"
    >
      <div className="pointer-events-auto mx-auto w-full max-w-xl md:mx-0 md:max-w-none">
        <h1
          id="intro-heading"
          className="text-5xl font-bold tracking-tight text-pure md:text-7xl"
        >
          {identity.name}
        </h1>
        <p className="mt-4 font-mono text-sm text-cyan md:text-base">{identity.title[locale]}</p>
        <p className="mt-6 max-w-md text-lg text-silver">{identity.baseline[locale]}</p>
        <p className="mt-16 font-mono text-xs uppercase tracking-widest text-silver">
          {t('scroll')} ↓
        </p>
      </div>
      <div aria-hidden="true" data-testid="hero-3d-placeholder" className="hidden min-h-[50vh] md:block" />
    </section>
  )
}
