import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { ExperienceProvider } from '@/store/experienceStore'
import { SiteNav } from './SiteNav'

vi.mock('@/i18n/useT', () => ({
  useT: () => ({
    locale: 'en',
    setLocale: vi.fn(),
    t: (key: string) => key,
  }),
}))

test('starts the scrollable section links at Intro on narrow viewports', () => {
  render(
    <ExperienceProvider>
      <SiteNav />
    </ExperienceProvider>,
  )

  const linkList = screen.getByRole('list')

  expect(linkList).toHaveClass('justify-start')
  expect(linkList).not.toHaveClass('justify-end')
  expect(screen.getByRole('link', { name: 'nav.intro' })).toHaveAttribute('href', '#intro')
})
