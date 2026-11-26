import { describe, expect, it } from 'vitest'
import { isSocialActive } from '../social'

describe('isSocialActive', () => {
  it('rejects empty and hash placeholders', () => {
    expect(isSocialActive('')).toBe(false)
    expect(isSocialActive('#')).toBe(false)
    expect(isSocialActive(undefined)).toBe(false)
  })

  it('accepts real urls', () => {
    expect(isSocialActive('https://github.com/example')).toBe(true)
  })
})
