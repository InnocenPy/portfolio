import { paletteColors } from '@/three/materials/paletteMaterials'

interface TerracePlatformProps {
  y: number
}

export function TerracePlatform({ y }: TerracePlatformProps) {
  return (
    <group position={[0, y - 0.15, 0]}>
      <mesh>
        <boxGeometry args={[14, 0.3, 10]} />
        <meshStandardMaterial color={paletteColors.navy} roughness={0.6} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.16, 4.95]}>
        <boxGeometry args={[14, 0.04, 0.1]} />
        <meshStandardMaterial color={paletteColors.silver} roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.16, -4.95]}>
        <boxGeometry args={[14, 0.04, 0.1]} />
        <meshStandardMaterial color={paletteColors.silver} roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[6.95, 0.16, 0]}>
        <boxGeometry args={[0.1, 0.04, 10]} />
        <meshStandardMaterial color={paletteColors.silver} roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh position={[-6.95, 0.16, 0]}>
        <boxGeometry args={[0.1, 0.04, 10]} />
        <meshStandardMaterial color={paletteColors.silver} roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  )
}
