import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, expect, test, vi } from 'vitest'
import { LocaleToggle } from './LocaleToggle'

const mocks = vi.hoisted(() => ({
  audioEnabled: false,
  playUiTick: vi.fn(),
  setLocale: vi.fn(),
}))

vi.mock('@/store/experienceStore', () => ({
  useExperienceStore: () => ({ audioEnabled: mocks.audioEnabled }),
}))
vi.mock('@/services/audio/AudioController', () => ({
  audioController: { playUiTick: mocks.playUiTick },
}))
vi.mock('@/i18n/useT', () => ({
  useT: () => ({
    locale: 'en',
    setLocale: mocks.setLocale,
    t: (key: string) => key,
  }),
}))

beforeEach(() => {
  mocks.audioEnabled = false
  mocks.playUiTick.mockClear()
  mocks.setLocale.mockClear()
})

test('plays a tick on locale changes only when audio is enabled', async () => {
  const user = userEvent.setup()
  const { rerender } = render(<LocaleToggle />)

  await user.click(screen.getByRole('button'))
  expect(mocks.playUiTick).not.toHaveBeenCalled()

  mocks.audioEnabled = true
  rerender(<LocaleToggle />)
  await user.click(screen.getByRole('button'))

  expect(mocks.playUiTick).toHaveBeenCalledOnce()
})
