interface AudioParamLike {
  setValueAtTime(value: number, startTime: number): void
  exponentialRampToValueAtTime(value: number, endTime: number): void
}

interface AudioNodeLike {
  connect(destination: unknown): unknown
}

interface OscillatorLike extends AudioNodeLike {
  frequency: AudioParamLike
  type: string
  start(when?: number): void
  stop(when?: number): void
}

interface GainLike extends AudioNodeLike {
  gain: AudioParamLike
}

interface AudioContextLike {
  currentTime: number
  destination: unknown
  state: string
  resume(): Promise<void>
  close(): Promise<void>
  createOscillator(): OscillatorLike
  createGain(): GainLike
}

interface AudioControllerOptions {
  createContext?: () => AudioContextLike
  now?: () => number
}

const AMBIENT_GAIN = 0.03
const TICK_GAIN = 0.02
const TICK_DURATION = 0.04

function getBrowserAudioContext(): AudioContextLike {
  const AudioContextConstructor =
    globalThis.AudioContext ??
    (globalThis as typeof globalThis & { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext

  if (!AudioContextConstructor) {
    throw new Error('Web Audio API is unavailable')
  }

  return new AudioContextConstructor()
}

export class AudioController {
  private readonly createContext: () => AudioContextLike
  private readonly now: () => number
  private context: AudioContextLike | null = null
  private ambientOscillator: OscillatorLike | null = null

  public isEnabled = false
  public available: boolean

  constructor(options: AudioControllerOptions = {}) {
    this.createContext = options.createContext ?? getBrowserAudioContext
    this.now = options.now ?? (() => this.context?.currentTime ?? 0)
    this.available =
      options.createContext !== undefined ||
      typeof globalThis.AudioContext !== 'undefined' ||
      'webkitAudioContext' in globalThis
  }

  async enable(): Promise<void> {
    if (this.isEnabled || !this.available) return

    try {
      const context = this.createContext()
      this.context = context
      if (context.state === 'suspended') await context.resume()

      const oscillator = context.createOscillator()
      const gain = context.createGain()
      const startTime = this.now()
      oscillator.type = 'sine'
      oscillator.frequency.setValueAtTime(55, startTime)
      gain.gain.setValueAtTime(AMBIENT_GAIN, startTime)
      oscillator.connect(gain)
      gain.connect(context.destination)
      oscillator.start()
      this.ambientOscillator = oscillator
      this.isEnabled = true
    } catch {
      this.context = null
      this.ambientOscillator = null
      this.isEnabled = false
      this.available = false
    }
  }

  async disable(): Promise<void> {
    this.ambientOscillator?.stop()
    this.ambientOscillator = null
    const context = this.context
    this.context = null
    this.isEnabled = false
    if (context) await context.close()
  }

  playUiTick(): void {
    if (!this.isEnabled || !this.context) return

    const startTime = this.context.currentTime
    const oscillator = this.context.createOscillator()
    const gain = this.context.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(880, startTime)
    gain.gain.setValueAtTime(TICK_GAIN, startTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + TICK_DURATION)
    oscillator.connect(gain)
    gain.connect(this.context.destination)
    oscillator.start(startTime)
    oscillator.stop(startTime + TICK_DURATION)
  }
}

export const audioController = new AudioController()
