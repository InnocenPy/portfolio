import { portfolioConfig } from '@/config/portfolio.config'
import { useT } from '@/i18n/useT'

export function AboutSection() {
  const { locale, t } = useT()
  const { identity, seo } = portfolioConfig
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="flex min-h-screen items-center px-4 py-24 md:px-8"
    >
      <div className="pointer-events-auto max-w-3xl">
        <h2 id="about-heading" className="text-3xl font-semibold text-pure md:text-5xl">
          {t('about.heading')}
        </h2>
        <p className="mt-2 font-mono text-sm text-cyan">
          {identity.title[locale]} · {identity.location[locale]}
        </p>
        <p className="mt-8 text-lg leading-relaxed text-pure">{seo.description[locale]}</p>
        <p className="mt-6 text-lg leading-relaxed text-silver">{t('about.philosophy')}</p>
      </div>
    </section>
  )
}
