import { portfolioConfig } from '@/config/portfolio.config'
import { useT } from '@/i18n/useT'
import { isSocialActive } from '@/utils/social'

const linkClass =
  'rounded border border-silver/40 px-4 py-2 font-mono text-sm text-pure hover:border-cyan hover:text-cyan focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan'

export function ContactSection() {
  const { locale, t } = useT()
  const { identity, social, contactHeadline } = portfolioConfig
  const phoneHref = `tel:${identity.phone.replace(/[^\d+]/g, '')}`
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="flex min-h-screen items-center px-4 py-24 md:px-8"
    >
      <div className="pointer-events-auto max-w-3xl">
        <h2 id="contact-heading" className="text-3xl font-semibold text-pure md:text-5xl">
          {t('contact.heading')}
        </h2>
        <p className="mt-6 text-2xl text-silver md:text-3xl">{contactHeadline[locale]}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={social.email}
            className="rounded bg-cyan px-5 py-2 font-mono text-sm font-semibold text-midnight hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan"
          >
            {t('contact.email')} — {identity.email}
          </a>
          <a href={phoneHref} className={linkClass}>
            {t('contact.phone')} {identity.phone}
          </a>
          {isSocialActive(social.github) && (
            <a href={social.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {t('contact.github')}
            </a>
          )}
          {isSocialActive(social.linkedin) && (
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
              {t('contact.linkedin')}
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
