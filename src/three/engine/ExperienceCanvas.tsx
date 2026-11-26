import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { paletteColors } from '@/three/materials/paletteMaterials'
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
  const frameloop = hidden ? 'never' : reducedMotion ? 'demand' : 'always'

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={frameloop}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: paletteColors.midnight }}
      >
        <RendererConfig />
        <mesh rotation={[0.4, 0.6, 0]}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial color={paletteColors.navy} roughness={0.6} metalness={0.3} />
        </mesh>
      </Canvas>
    </div>
  )
}
