import { useMemo } from 'react'
import { portfolioConfig } from '@/config/portfolio.config'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { projects } from '@/data/projects'
import { getMonolithPosition, TERRACE_SPACING } from '@/three/controllers/cameraPath'
import { paletteColors } from '@/three/materials/paletteMaterials'
import { ProjectMonolith } from './ProjectMonolith'
import { TerracePlatform } from './TerracePlatform'

function Particles() {
  const positions = useMemo(() => {
    const count = 120
    const arr = new Float32Array(count * 3)
    const height = (portfolioConfig.scenes.length - 1) * TERRACE_SPACING
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 24
      arr[i * 3 + 1] = Math.random() * (height + 6) - 3
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return arr
  }, [])

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={paletteColors.cyan} size={0.05} transparent opacity={0.5} sizeAttenuation />
    </points>
  )
}

interface TerraceWorldProps {
  showMonoliths?: boolean
  selectedProjectId?: string | null
  onSelectProject?: (id: string) => void
}

export function TerraceWorld({
  showMonoliths = false,
  selectedProjectId = null,
  onSelectProject,
}: TerraceWorldProps) {
  const reducedMotion = usePrefersReducedMotion()
  const isMobile = useMediaQuery('(max-width: 768px)')
  const showParticles = !reducedMotion && !isMobile

  return (
    <>
      <fog attach="fog" args={[paletteColors.midnight, 14, 48]} />
      {portfolioConfig.scenes.map((scene, index) => (
        <TerracePlatform key={scene} y={index * TERRACE_SPACING} />
      ))}
      {showMonoliths &&
        projects.map((project, index) => (
          <ProjectMonolith
            key={project.id}
            visualKey={project.visualKey}
            position={getMonolithPosition(index)}
            selected={project.id === selectedProjectId}
            onSelect={() => onSelectProject?.(project.id)}
          />
        ))}
      {showParticles && <Particles />}
    </>
  )
}
