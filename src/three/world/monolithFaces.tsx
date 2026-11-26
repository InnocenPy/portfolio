import type { ComponentType } from 'react'
import { paletteColors } from '@/three/materials/paletteMaterials'

/** Abstract procedural faces (no external or brand assets), drawn in the XY plane. */
type FaceComponent = ComponentType

const { cyan, pure, silver } = paletteColors

function Bar({ x, y, w, h, color = cyan }: { x: number; y: number; w: number; h: number; color?: string }) {
  return (
    <mesh position={[x, y, 0]}>
      <boxGeometry args={[w, h, 0.02]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}

function FinanceFace() {
  const heights = [0.4, 0.75, 0.55, 1.1, 1.45]
  return (
    <group>
      {heights.map((h, i) => (
        <Bar key={i} x={-0.5 + i * 0.25} y={-0.6 + h / 2} w={0.14} h={h} color={i === 4 ? cyan : silver} />
      ))}
      <Bar x={0} y={-0.62} w={1.2} h={0.02} color={pure} />
    </group>
  )
}

function MapFace() {
  return (
    <group>
      {[-0.4, 0, 0.4].map((v) => (
        <Bar key={`v${v}`} x={v} y={0} w={0.015} h={1.4} color={silver} />
      ))}
      {[-0.5, 0, 0.5].map((h) => (
        <Bar key={`h${h}`} x={0} y={h} w={1.2} h={0.015} color={silver} />
      ))}
      <mesh position={[0.2, 0.15, 0.02]}>
        <circleGeometry args={[0.14, 24]} />
        <meshBasicMaterial color={cyan} />
      </mesh>
      <mesh position={[0.2, -0.05, 0.02]} rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.1, 0.3, 3]} />
        <meshBasicMaterial color={cyan} />
      </mesh>
    </group>
  )
}

function TimeFace() {
  return (
    <group>
      <mesh>
        <torusGeometry args={[0.5, 0.03, 8, 40]} />
        <meshBasicMaterial color={cyan} />
      </mesh>
      <Bar x={0} y={0.18} w={0.04} h={0.36} color={pure} />
      <mesh position={[0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.04, 0.28, 0.02]} />
        <meshBasicMaterial color={silver} />
      </mesh>
    </group>
  )
}

function ArchitectureFace() {
  const blocks: Array<[number, number, number]> = [
    [-0.4, 0.5, 0.3],
    [-0.1, 0.9, 0.3],
    [0.2, 0.7, 0.3],
    [0.45, 1.2, 0.2],
  ]
  return (
    <group>
      {blocks.map(([x, h, w], i) => (
        <Bar key={i} x={x} y={-0.6 + h / 2} w={w} h={h} color={i % 2 ? silver : cyan} />
      ))}
      <Bar x={0} y={-0.62} w={1.3} h={0.02} color={pure} />
    </group>
  )
}

function ShopFace() {
  return (
    <group position={[0, -0.1, 0]}>
      <Bar x={0} y={0} w={0.8} h={0.7} color={cyan} />
      <mesh position={[0, 0.4, 0]}>
        <torusGeometry args={[0.2, 0.025, 8, 24, Math.PI]} />
        <meshBasicMaterial color={pure} />
      </mesh>
    </group>
  )
}

function NetworkFace() {
  const nodes: Array<[number, number]> = [
    [0, 0],
    [-0.45, 0.45],
    [0.45, 0.45],
    [-0.45, -0.45],
    [0.45, -0.45],
  ]
  return (
    <group>
      {nodes.slice(1).map(([x, y], i) => {
        const len = Math.hypot(x, y)
        return (
          <mesh key={i} position={[x / 2, y / 2, -0.01]} rotation={[0, 0, Math.atan2(y, x)]}>
            <boxGeometry args={[len, 0.015, 0.01]} />
            <meshBasicMaterial color={silver} />
          </mesh>
        )
      })}
      {nodes.map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.02]}>
          <circleGeometry args={[i === 0 ? 0.14 : 0.09, 20]} />
          <meshBasicMaterial color={i === 0 ? cyan : pure} />
        </mesh>
      ))}
    </group>
  )
}

export const monolithFaces = {
  finance: FinanceFace,
  map: MapFace,
  time: TimeFace,
  architecture: ArchitectureFace,
  shop: ShopFace,
  network: NetworkFace,
} satisfies Record<string, FaceComponent>

export type MonolithFaceKey = keyof typeof monolithFaces

export const monolithFaceKeys = Object.keys(monolithFaces) as MonolithFaceKey[]
