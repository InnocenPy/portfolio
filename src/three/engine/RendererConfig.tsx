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
    </>
  )
}
