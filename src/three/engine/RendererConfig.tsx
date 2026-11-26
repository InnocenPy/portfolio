import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'
import { paletteColors } from '@/three/materials/paletteMaterials'

/** Sets scene background and re-renders on demand when the loop is paused. */
export function RendererConfig() {
  const { gl, invalidate } = useThree()

  useEffect(() => {
    gl.setClearColor(paletteColors.midnight)
    invalidate()
  }, [gl, invalidate])

  return (
    <>
      <color attach="background" args={[paletteColors.midnight]} />
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 4, 5]} intensity={1} />
      {/* Soft cool rim from behind + silver fill from the left so edges read on midnight. */}
      <directionalLight position={[-4, 3, -5]} intensity={0.9} color={paletteColors.cyan} />
      <directionalLight position={[-5, 1, 3]} intensity={0.35} color={paletteColors.silver} />
    </>
  )
}
