import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { ExperienceProvider } from '@/store/experienceStore'
import { ProjectDetailPanel } from './ProjectDetailPanel'

vi.mock('@/i18n/useT', () => ({
  useT: () => ({
    locale: 'en',
    setLocale: vi.fn(),
    t: (key: string) => key,
  }),
}))

function renderPanel(id: string | null) {
  return render(
    <ExperienceProvider initialProjectId={id}>
      <ProjectDetailPanel />
    </ExperienceProvider>,
  )
}

test('renders nothing when no project is selected', () => {
  renderPanel(null)
  expect(screen.queryByTestId('project-detail-panel')).not.toBeInTheDocument()
})

test('shows project details, tech chips, and focuses the close button', () => {
  renderPanel('flex-audit')
  expect(screen.getByText('FLEX-AUDIT')).toBeInTheDocument()
  expect(screen.getByText('Enterprise / Accounting')).toBeInTheDocument()
  expect(screen.getByText(/enterprise application for accounting/i)).toBeInTheDocument()
  expect(screen.getByText(/full-stack platform designed to support/i)).toBeInTheDocument()
  expect(screen.getByText('NestJS')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'works.close' })).toHaveFocus()
  expect(screen.queryByRole('link')).not.toBeInTheDocument()
  expect(screen.queryByText(/visit site/i)).not.toBeInTheDocument()
})

test('closes on Escape', async () => {
  const user = userEvent.setup()
  renderPanel('flex-audit')
  await user.keyboard('{Escape}')
  expect(screen.queryByTestId('project-detail-panel')).not.toBeInTheDocument()
})

test('closes on Close click', async () => {
  const user = userEvent.setup()
  renderPanel('gtp')
  await user.click(screen.getByRole('button', { name: 'works.close' }))
  expect(screen.queryByTestId('project-detail-panel')).not.toBeInTheDocument()
})
