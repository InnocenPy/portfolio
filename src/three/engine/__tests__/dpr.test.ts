import { expect, it } from 'vitest'
import { getDpr } from '../dpr'

it('caps DPR at 1.5 on desktop and 1.0 on mobile', () => {
  expect(getDpr(false)).toEqual([1, 1.5])
  expect(getDpr(true)).toBe(1)
})
