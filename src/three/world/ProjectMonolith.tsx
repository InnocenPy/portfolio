import { useEffect, useState } from 'react'
import type { ThreeEvent } from '@react-three/fiber'
import { paletteColors } from '@/three/materials/paletteMaterials'
import { monolithFaces, type MonolithFaceKey } from './monolithFaces'

interface ProjectMonolithProps {
  visualKey: string
  position: [number, number, number]
  selected: boolean
  onSelect: () => void
}

const WIDTH = 1.6
const HEIGHT = 2.6
const DEPTH = 0.5

export function ProjectMonolith({ visualKey, position, selected, onSelect }: ProjectMonolithProps) {
  const [hovered, setHovered] = useState(false)
  const Face = monolithFaces[visualKey as MonolithFaceKey]

  useEffect(() => {
    if (!hovered) return
    document.body.style.cursor = 'pointer'
    return () => {
      document.body.style.cursor = ''
    }
  }, [hovered])

  const emissiveIntensity = hovered ? 0.6 : selected ? 0.35 : 0

  return (
    <group position={position}>
      <mesh
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={() => setHovered(false)}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation()
          onSelect()
        }}
      >
        <boxGeometry args={[WIDTH, HEIGHT, DEPTH]} />
        <meshStandardMaterial
          color={paletteColors.navy}
          roughness={0.35}
          metalness={0.6}
          emissive={paletteColors.cyan}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>
      {Face && (
        <group position={[0, 0.2, DEPTH / 2 + 0.015]} scale={1.1}>
          <Face />
        </group>
      )}
    </group>
  )
}
