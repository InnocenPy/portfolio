import { describe, expect, it } from 'vitest'
import { projects } from '@/data/projects'
import {
  FOCUS_DISTANCE_DESKTOP,
  getFocusCameraState,
  getMonolithPosition,
} from '../cameraPath'

describe('getFocusCameraState', () => {
  it('returns null for unknown projects', () => {
    expect(getFocusCameraState('nope')).toBeNull()
  })

  it('places the camera in front of the monolith', () => {
    const state = getFocusCameraState(projects[2].id)!
    const mono = getMonolithPosition(2)
    expect(state.lookAt).toEqual(mono)
    expect(state.position[0]).toBeCloseTo(mono[0], 5)
    expect(state.position[2] - mono[2]).toBeCloseTo(FOCUS_DISTANCE_DESKTOP, 5)
  })

  it('uses 1.4x the desktop distance on mobile', () => {
    const id = projects[0].id
    const d = getFocusCameraState(id)!
    const m = getFocusCameraState(id, true)!
    expect(m.position[2] - m.lookAt[2]).toBeCloseTo((d.position[2] - d.lookAt[2]) * 1.4, 5)
  })
})
