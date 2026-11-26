import { describe, expect, it } from 'vitest'
import { projects } from '@/data/projects'
import { getProjectById } from '../getProjectById'

describe('getProjectById', () => {
  it('returns flex-audit', () => {
    expect(getProjectById('flex-audit')?.name).toBe('FLEX-AUDIT')
  })

  it('returns undefined for unknown id', () => {
    expect(getProjectById('nope')).toBeUndefined()
  })

  it('exposes six projects', () => {
    expect(projects).toHaveLength(6)
  })
})
