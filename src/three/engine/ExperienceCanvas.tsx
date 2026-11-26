import { MOBILE_MEDIA_QUERY } from '@/config/breakpoints'
import { useEffect, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useScrollProgress } from '@/hooks/ScrollProgressProvider'
import { useExperienceStore } from '@/store/experienceStore'
import { getFocusCameraState } from '@/three/controllers/cameraPath'
import { ScrollCameraController } from '@/three/controllers/ScrollCameraController'
import { TerraceWorld } from '@/three/world/TerraceWorld'
import { shouldMountMonoliths } from '@/three/world/monolithVisibility'
import { paletteColors } from '@/three/materials/paletteMaterials'
import { getDpr } from './dpr'
import { RendererConfig } from './RendererConfig'

function useDocumentHidden(): boolean {
  const [hidden, setHidden] = useState(() => typeof document !== 'undefined' && document.hidden)

  useEffect(() => {
    const onChange = () => setHidden(document.hidden)
    document.addEventListener('visibilitychange', onChange)
    return () => document.removeEventListener('visibilitychange', onChange)
  }, [])

  return hidden
}

export function ExperienceCanvas() {
  const reducedMotion = usePrefersReducedMotion()
  const hidden = useDocumentHidden()
  const scrollProgress = useScrollProgress()
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY)
  const { selectedProjectId, setSelectedProjectId } = useExperienceStore()
  const focus = useMemo(
    () => (selectedProjectId ? getFocusCameraState(selectedProjectId, isMobile) : null),
    [selectedProjectId, isMobile],
  )
  const showMonoliths = shouldMountMonoliths(scrollProgress, selectedProjectId)
  const frameloop = hidden ? 'never' : reducedMotion ? 'demand' : 'always'

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={getDpr(isMobile)}
        frameloop={frameloop}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: paletteColors.midnight, pointerEvents: 'auto' }}
      >
        <RendererConfig />
        <ScrollCameraController progress={scrollProgress} focus={focus} />
        <TerraceWorld
          showMonoliths={showMonoliths}
          selectedProjectId={selectedProjectId}
          onSelectProject={setSelectedProjectId}
        />
      </Canvas>
    </div>
  )
}
