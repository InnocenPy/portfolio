import { useEffect, useMemo } from 'react'
import { BoxGeometry, MeshStandardMaterial } from 'three'
import { paletteColors } from '@/three/materials/paletteMaterials'

interface TerracePlatformProps {
  y: number
}

const RAILS: ReadonlyArray<{ position: [number, number, number]; size: [number, number, number] }> = [
  { position: [0, 0.16, 4.95], size: [14, 0.04, 0.1] },
  { position: [0, 0.16, -4.95], size: [14, 0.04, 0.1] },
  { position: [6.95, 0.16, 0], size: [0.1, 0.04, 10] },
  { position: [-6.95, 0.16, 0], size: [0.1, 0.04, 10] },
]

export function TerracePlatform({ y }: TerracePlatformProps) {
  // Created once per platform and disposed on unmount (objects passed as props are not
  // auto-disposed by R3F); the two materials are shared by the slab and all rails.
  const resources = useMemo(
    () => ({
      slab: new BoxGeometry(14, 0.3, 10),
      rails: RAILS.map((rail) => new BoxGeometry(...rail.size)),
      slabMaterial: new MeshStandardMaterial({
        color: paletteColors.navy,
        roughness: 0.6,
        metalness: 0.3,
      }),
      railMaterial: new MeshStandardMaterial({
        color: paletteColors.silver,
        roughness: 0.3,
        metalness: 0.8,
      }),
    }),
    [],
  )

  useEffect(
    () => () => {
      resources.slab.dispose()
      resources.rails.forEach((geometry) => geometry.dispose())
      resources.slabMaterial.dispose()
      resources.railMaterial.dispose()
    },
    [resources],
  )

  return (
    <group position={[0, y - 0.15, 0]}>
      <mesh geometry={resources.slab} material={resources.slabMaterial} />
      {RAILS.map((rail, index) => (
        <mesh
          key={index}
          position={rail.position}
          geometry={resources.rails[index]}
          material={resources.railMaterial}
        />
      ))}
    </group>
  )
}
