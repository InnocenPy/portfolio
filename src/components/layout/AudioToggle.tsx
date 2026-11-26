import { useState } from 'react'
import { useT } from '@/i18n/useT'
import { audioController } from '@/services/audio/AudioController'
import { useExperienceStore } from '@/store/experienceStore'

export function AudioToggle() {
  const { t } = useT()
  const { audioEnabled, setAudioEnabled } = useExperienceStore()
  const [available, setAvailable] = useState(audioController.available)

  if (!available) return null

  const toggleAudio = async () => {
    if (audioEnabled) {
      await audioController.disable()
      setAudioEnabled(audioController.isEnabled)
      return
    }

    await audioController.enable()
    setAvailable(audioController.available)
    setAudioEnabled(audioController.isEnabled)
  }

  return (
    <button
      type="button"
      aria-pressed={audioEnabled}
      aria-label={t(audioEnabled ? 'audio.disable' : 'audio.enable')}
      onClick={toggleAudio}
      className="rounded border border-silver/40 px-3 py-1 font-mono text-xs text-pure transition hover:border-cyan hover:text-cyan focus-visible:outline-2 focus-visible:outline-cyan"
    >
      ♪
    </button>
  )
}
