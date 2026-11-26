import { describe, expect, it } from 'vitest'
import { projects } from '@/data/projects'
import { monolithFaceKeys, monolithFaces } from '../monolithFaces'

describe('monolithFaces', () => {
  it('defines a face for every project visualKey', () => {
    for (const p of projects) {
      expect(monolithFaceKeys).toContain(p.visualKey)
      expect(monolithFaces[p.visualKey as keyof typeof monolithFaces]).toBeTypeOf('function')
    }
  })

  it('covers the six expected keys', () => {
    expect([...monolithFaceKeys].sort()).toEqual(
      ['architecture', 'finance', 'map', 'network', 'shop', 'time'],
    )
  })
})
