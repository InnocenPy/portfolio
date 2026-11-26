import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { portfolioConfig } from '@/config/portfolio.config'
import { I18nProvider } from '@/i18n/I18nProvider'
import { useT } from '@/i18n/useT'
import { DocumentMeta } from './DocumentMeta'

function LocaleControl() {
  const { setLocale } = useT()

  return <button onClick={() => setLocale('fr')}>Français</button>
}

function metaContent(selector: string) {
  return document.head.querySelector<HTMLMetaElement>(selector)?.content
}

describe('DocumentMeta', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.lang = 'en'
    document.head
      .querySelectorAll('meta[name="description"], meta[property^="og:"]')
      .forEach((element) => element.remove())
  })

  it('synchronise la description et les métadonnées Open Graph avec la langue', () => {
    render(
      <I18nProvider>
        <DocumentMeta />
        <LocaleControl />
      </I18nProvider>,
    )

    expect(metaContent('meta[name="description"]')).toBe(
      portfolioConfig.seo.description.en,
    )
    expect(metaContent('meta[property="og:title"]')).toBe(portfolioConfig.seo.title)
    expect(metaContent('meta[property="og:description"]')).toBe(
      portfolioConfig.seo.description.en,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Français' }))

    expect(metaContent('meta[name="description"]')).toBe(
      portfolioConfig.seo.description.fr,
    )
    expect(metaContent('meta[property="og:description"]')).toBe(
      portfolioConfig.seo.description.fr,
    )
  })
})
