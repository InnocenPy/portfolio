import { describe, expect, it, vi } from 'vitest'
import { AudioController } from '../AudioController'

function createAudioContext() {
  const ambient = {
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    frequency: { setValueAtTime: vi.fn() },
    type: 'sine',
  }
  const tick = {
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    frequency: { setValueAtTime: vi.fn() },
    type: 'sine',
  }
  const gains = [
    { connect: vi.fn(), gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() } },
    { connect: vi.fn(), gain: { setValueAtTime: vi.fn(), exponentialRampToValueAtTime: vi.fn() } },
  ]
  const context = {
    currentTime: 0,
    destination: {},
    state: 'suspended',
    resume: vi.fn().mockResolvedValue(undefined),
    close: vi.fn().mockResolvedValue(undefined),
    createOscillator: vi.fn().mockReturnValueOnce(ambient).mockReturnValueOnce(tick),
    createGain: vi.fn().mockReturnValueOnce(gains[0]).mockReturnValueOnce(gains[1]),
  }

  return { context, ambient, tick, gains }
}

describe('AudioController', () => {
  it('starts disabled', () => {
    const audio = new AudioController()

    expect(audio.isEnabled).toBe(false)
  })

  it('enables procedural ambience at a safe gain', async () => {
    const { context, ambient, gains } = createAudioContext()
    const audio = new AudioController({
      createContext: () => context,
      now: () => 0,
    })

    await audio.enable()

    expect(audio.isEnabled).toBe(true)
    expect(context.resume).toHaveBeenCalledOnce()
    expect(gains[0].gain.setValueAtTime).toHaveBeenCalledWith(0.03, 0)
    expect(ambient.start).toHaveBeenCalledOnce()
  })

  it('stops ambience and closes the context when disabled', async () => {
    const { context, ambient } = createAudioContext()
    const audio = new AudioController({ createContext: () => context })
    await audio.enable()

    await audio.disable()

    expect(audio.isEnabled).toBe(false)
    expect(ambient.stop).toHaveBeenCalledOnce()
    expect(context.close).toHaveBeenCalledOnce()
  })

  it('plays a short procedural tick only while enabled', async () => {
    const { context, tick, gains } = createAudioContext()
    const audio = new AudioController({ createContext: () => context })

    audio.playUiTick()
    expect(context.createOscillator).not.toHaveBeenCalled()

    await audio.enable()
    audio.playUiTick()

    expect(tick.start).toHaveBeenCalledOnce()
    expect(tick.stop).toHaveBeenCalledWith(0.04)
    expect(gains[1].gain.setValueAtTime).toHaveBeenCalledWith(0.02, 0)
  })

  it('becomes unavailable when AudioContext construction fails', async () => {
    const audio = new AudioController({
      createContext: () => {
        throw new Error('AudioContext unavailable')
      },
    })

    await audio.enable()

    expect(audio.available).toBe(false)
    expect(audio.isEnabled).toBe(false)
  })
})
