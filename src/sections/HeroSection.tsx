import { portfolioConfig } from '@/config/portfolio.config'
import { useT } from '@/i18n/useT'

export function HeroSection() {
  const { locale, t } = useT()
  const { identity, portrait } = portfolioConfig
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
      <div className="pointer-events-none relative mx-auto w-full max-w-md md:mx-0 md:max-w-none">
        <div className="relative aspect-[4/5] overflow-hidden md:aspect-[3/4] md:min-h-[60vh]">
          <img
            src={portrait.src}
            alt={portrait.alt[locale]}
            width={900}
            height={1125}
            decoding="async"
            fetchPriority="high"
            className="h-full w-full object-cover object-center"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-midnight/80 via-transparent to-transparent md:from-midnight/60"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-midnight/20"
          />
        </div>
      </div>
    </section>
  )
}
