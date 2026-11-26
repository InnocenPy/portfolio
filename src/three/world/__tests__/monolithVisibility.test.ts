import { describe, expect, it } from 'vitest'
import { shouldMountMonoliths } from '../monolithVisibility'

describe('shouldMountMonoliths', () => {
  it('mounts only inside the works scroll range', () => {
    expect(shouldMountMonoliths(0.1, null)).toBe(false)
    expect(shouldMountMonoliths(0.28, null)).toBe(true)
    expect(shouldMountMonoliths(0.4, null)).toBe(true)
    expect(shouldMountMonoliths(0.55, null)).toBe(true)
    expect(shouldMountMonoliths(0.8, null)).toBe(false)
  })

  it('stays mounted while a project is selected', () => {
    expect(shouldMountMonoliths(0.9, 'gtp')).toBe(true)
  })
})
