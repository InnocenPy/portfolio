import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { audioController } from '@/services/audio/AudioController'

export interface ExperienceStore {
  selectedProjectId: string | null
  setSelectedProjectId: (id: string | null) => void
  audioEnabled: boolean
  setAudioEnabled: (enabled: boolean) => void
}

const ExperienceContext = createContext<ExperienceStore | null>(null)

export function ExperienceProvider({
  children,
  initialProjectId = null,
}: {
  children: ReactNode
  initialProjectId?: string | null
}) {
  const [selectedProjectId, setSelectedProjectIdState] = useState<string | null>(initialProjectId)
  const [audioEnabled, setAudioEnabled] = useState(false)
  const setSelectedProjectId = useCallback(
    (id: string | null) => {
      setSelectedProjectIdState(id)
      if (id && audioEnabled) audioController.playUiTick()
    },
    [audioEnabled],
  )

  const value = useMemo<ExperienceStore>(
    () => ({ selectedProjectId, setSelectedProjectId, audioEnabled, setAudioEnabled }),
    [selectedProjectId, setSelectedProjectId, audioEnabled],
  )

  return <ExperienceContext.Provider value={value}>{children}</ExperienceContext.Provider>
}

export function useExperienceStore(): ExperienceStore {
  const context = useContext(ExperienceContext)
  if (!context) {
    throw new Error('useExperienceStore must be used within an ExperienceProvider')
  }
  return context
}
