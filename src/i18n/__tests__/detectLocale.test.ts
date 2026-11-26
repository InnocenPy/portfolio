import { describe, expect, it } from 'vitest'
import { detectLocale } from '../detectLocale'

describe('detectLocale', () => {
  it('prefers stored locale', () => {
    expect(detectLocale('en-US', 'fr')).toBe('fr')
  })

  it('uses browser french', () => {
    expect(detectLocale('fr-FR', null)).toBe('fr')
  })

  it('defaults to en', () => {
    expect(detectLocale('de-DE', null)).toBe('en')
  })

  it('ignores invalid stored values', () => {
    expect(detectLocale('fr-ML', 'es')).toBe('fr')
  })
})
