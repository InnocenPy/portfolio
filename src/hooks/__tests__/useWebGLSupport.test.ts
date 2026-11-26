import { describe, expect, it } from 'vitest'
import { isWebGLAvailable } from '../useWebGLSupport'

const canvasWith = (getContext: (id: string) => unknown) =>
  ({ getContext }) as unknown as HTMLCanvasElement

describe('isWebGLAvailable', () => {
  it('returns true when webgl context exists', () => {
    expect(isWebGLAvailable(() => canvasWith((id) => (id === 'webgl' ? {} : null)))).toBe(true)
  })
  it('falls back to experimental-webgl', () => {
    expect(
      isWebGLAvailable(() => canvasWith((id) => (id === 'experimental-webgl' ? {} : null))),
    ).toBe(true)
  })
  it('returns false when no context is available', () => {
    expect(isWebGLAvailable(() => canvasWith(() => null))).toBe(false)
  })
  it('returns false when getContext throws', () => {
    expect(
      isWebGLAvailable(() =>
        canvasWith(() => {
          throw new Error('boom')
        }),
      ),
    ).toBe(false)
  })
  it('returns false when canvas creation throws', () => {
    expect(
      isWebGLAvailable(() => {
        throw new Error('no canvas')
      }),
    ).toBe(false)
  })
})
