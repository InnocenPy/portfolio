import { describe, expect, it } from 'vitest'
import { getScrollProgress } from '../scrollProgress'

describe('getScrollProgress', () => {
  it('returns 0 at top', () => {
    expect(getScrollProgress(0, 1000)).toBe(0)
  })
  it('returns 1 at bottom', () => {
    expect(getScrollProgress(1000, 1000)).toBe(1)
  })
  it('returns ratio in between', () => {
    expect(getScrollProgress(250, 1000)).toBe(0.25)
  })
  it('clamps above 1 and below 0', () => {
    expect(getScrollProgress(2000, 1000)).toBe(1)
    expect(getScrollProgress(-50, 1000)).toBe(0)
  })
  it('returns 0 when maxScroll is not positive', () => {
    expect(getScrollProgress(100, 0)).toBe(0)
    expect(getScrollProgress(100, -10)).toBe(0)
  })
})
