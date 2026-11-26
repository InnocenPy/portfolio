import { renderHook, act } from '@testing-library/react'
import { beforeEach, expect, test, vi } from 'vitest'
import { ExperienceProvider, useExperienceStore } from './experienceStore'

const playUiTick = vi.hoisted(() => vi.fn())

vi.mock('@/services/audio/AudioController', () => ({
  audioController: { playUiTick },
}))

beforeEach(() => playUiTick.mockClear())

test('plays a tick when an enabled user opens a project', () => {
  const { result } = renderHook(() => useExperienceStore(), {
    wrapper: ExperienceProvider,
  })

  act(() => result.current.setSelectedProjectId('project-1'))
  expect(playUiTick).not.toHaveBeenCalled()

  act(() => result.current.setAudioEnabled(true))
  act(() => result.current.setSelectedProjectId('project-2'))

  expect(playUiTick).toHaveBeenCalledOnce()
})
