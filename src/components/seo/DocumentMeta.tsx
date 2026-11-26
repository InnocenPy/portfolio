import { useEffect } from 'react'
import { portfolioConfig } from '@/config/portfolio.config'
import { useT } from '@/i18n/useT'

function setMetaContent(selector: string, attributes: Record<string, string>, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)

  if (!element) {
    element = document.createElement('meta')
    Object.entries(attributes).forEach(([name, value]) => element?.setAttribute(name, value))
    document.head.append(element)
  }

  element.content = content
}

export function DocumentMeta() {
  const { locale } = useT()

  useEffect(() => {
    const { seo } = portfolioConfig
    const description = seo.description[locale]

    setMetaContent('meta[name="description"]', { name: 'description' }, description)
    setMetaContent('meta[property="og:title"]', { property: 'og:title' }, seo.title)
    setMetaContent(
      'meta[property="og:description"]',
      { property: 'og:description' },
      description,
    )
  }, [locale])

  return null
}
