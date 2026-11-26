import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, test, vi } from 'vitest'
import { ExperienceProvider } from '@/store/experienceStore'
import { AudioToggle } from './AudioToggle'

const audio = vi.hoisted(() => ({
  available: true,
  isEnabled: false,
  enable: vi.fn().mockResolvedValue(undefined),
  disable: vi.fn().mockResolvedValue(undefined),
  playUiTick: vi.fn(),
}))

vi.mock('@/services/audio/AudioController', () => ({ audioController: audio }))
vi.mock('@/i18n/useT', () => ({
  useT: () => ({ t: (key: string) => key }),
}))

beforeEach(() => {
  audio.available = true
  audio.isEnabled = false
  audio.enable.mockReset()
  audio.disable.mockReset()
  audio.enable.mockImplementation(async () => {
    audio.isEnabled = true
  })
  audio.disable.mockImplementation(async () => {
    audio.isEnabled = false
  })
})

test('stays off when enable resolves without enabling (superseded)', async () => {
  audio.enable.mockImplementationOnce(async () => {})
  const user = userEvent.setup()
  render(
    <ExperienceProvider>
      <AudioToggle />
    </ExperienceProvider>,
  )

  await user.click(screen.getByRole('button', { name: 'audio.enable' }))

  expect(audio.enable).toHaveBeenCalledOnce()
  expect(screen.getByRole('button', { name: 'audio.enable' })).toBeInTheDocument()
})

test('syncs state to controller isEnabled after enable and disable', async () => {
  const user = userEvent.setup()
  render(
    <ExperienceProvider>
      <AudioToggle />
    </ExperienceProvider>,
  )

  await user.click(screen.getByRole('button', { name: 'audio.enable' }))
  expect(screen.getByRole('button', { name: 'audio.disable' })).toHaveAttribute(
    'aria-pressed',
    'true',
  )

  // disable that leaves the controller enabled (e.g. a newer enable won) keeps toggle on
  audio.disable.mockImplementationOnce(async () => {})
  await user.click(screen.getByRole('button', { name: 'audio.disable' }))
  expect(screen.getByRole('button', { name: 'audio.disable' })).toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: 'audio.disable' }))
  expect(screen.getByRole('button', { name: 'audio.enable' })).toBeInTheDocument()
})

test('enables audio only after the user clicks the toggle', async () => {
  const user = userEvent.setup()
  render(
    <ExperienceProvider>
      <AudioToggle />
    </ExperienceProvider>,
  )

  expect(audio.enable).not.toHaveBeenCalled()
  await user.click(screen.getByRole('button', { name: 'audio.enable' }))

  expect(audio.enable).toHaveBeenCalledOnce()
  expect(screen.getByRole('button', { name: 'audio.disable' })).toBeInTheDocument()
})

test('hides the toggle when AudioContext construction fails', async () => {
  audio.enable.mockImplementationOnce(async () => {
    audio.available = false
  })
  const user = userEvent.setup()
  render(
    <ExperienceProvider>
      <AudioToggle />
    </ExperienceProvider>,
  )

  await user.click(screen.getByRole('button', { name: 'audio.enable' }))

  expect(screen.queryByRole('button')).not.toBeInTheDocument()
})
