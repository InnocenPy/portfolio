import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MathUtils, Vector3 } from 'three'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { getCameraState } from './cameraPath'

interface ScrollCameraControllerProps {
  /** Scroll progress 0..1 from useScrollProgress. */
  progress: number
}

export function ScrollCameraController({ progress }: ScrollCameraControllerProps) {
  const reducedMotion = usePrefersReducedMotion()
  const { camera, invalidate } = useThree()
  const lookAt = useRef(new Vector3())

  const apply = (p: number, damping: number | null) => {
    const target = getCameraState(p)
    if (damping === null) {
      camera.position.set(...target.position)
      lookAt.current.set(...target.lookAt)
    } else {
      camera.position.x = MathUtils.lerp(camera.position.x, target.position[0], damping)
      camera.position.y = MathUtils.lerp(camera.position.y, target.position[1], damping)
      camera.position.z = MathUtils.lerp(camera.position.z, target.position[2], damping)
      lookAt.current.x = MathUtils.lerp(lookAt.current.x, target.lookAt[0], damping)
      lookAt.current.y = MathUtils.lerp(lookAt.current.y, target.lookAt[1], damping)
      lookAt.current.z = MathUtils.lerp(lookAt.current.z, target.lookAt[2], damping)
    }
    camera.lookAt(lookAt.current)
  }

  // Reduced motion: snap straight to the scene (frameloop is on demand).
  useEffect(() => {
    if (!reducedMotion) return
    apply(progress, null)
    invalidate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, reducedMotion, camera, invalidate])

  useFrame((_, delta) => {
    if (reducedMotion) return
    apply(progress, 1 - Math.exp(-4 * delta))
  })

  return null
}
