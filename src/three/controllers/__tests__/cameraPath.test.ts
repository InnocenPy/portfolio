import { describe, expect, it } from 'vitest'
import { getCameraState, TERRACE_SPACING } from '../cameraPath'

describe('getCameraState', () => {
  it('starts at intro height and ends near contact', () => {
    const a = getCameraState(0)
    const b = getCameraState(1)
    expect(b.position[1]).toBeGreaterThan(a.position[1])
    expect(a.lookAt[1]).toBeCloseTo(0, 5)
    expect(b.lookAt[1]).toBeCloseTo(5 * TERRACE_SPACING, 5)
  })

  it('increases Y monotonically with progress', () => {
    let prev = -Infinity
    for (let i = 0; i <= 20; i++) {
      const y = getCameraState(i / 20).position[1]
      expect(y).toBeGreaterThanOrEqual(prev)
      prev = y
    }
  })

  it('clamps out-of-range progress', () => {
    expect(getCameraState(-1)).toEqual(getCameraState(0))
    expect(getCameraState(2)).toEqual(getCameraState(1))
  })
})
