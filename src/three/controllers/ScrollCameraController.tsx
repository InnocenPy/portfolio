import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { MathUtils, Vector3 } from 'three'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { getCameraState, type CameraState } from './cameraPath'

export const FOCUS_TRANSITION_SECONDS = 0.8

interface ScrollCameraControllerProps {
  /** Scroll progress 0..1 from ScrollProgressProvider. */
  progress: number
  /** When set, overrides the scroll path (selected project focus). */
  focus?: CameraState | null
}

export function ScrollCameraController({ progress, focus = null }: ScrollCameraControllerProps) {
  const reducedMotion = usePrefersReducedMotion()
  const { camera, invalidate } = useThree()
  const lookAt = useRef(new Vector3())

  const apply = (target: CameraState, damping: number | null) => {
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

  // Focus on a project: GSAP 0.8s transition, or an instant snap with reduced motion.
  useEffect(() => {
    if (!focus) return
    const pos = camera.position
    const look = lookAt.current
    if (reducedMotion) {
      apply(focus, null)
      invalidate()
      return
    }
    const onUpdate = () => {
      camera.lookAt(look)
      invalidate()
    }
    const options = { duration: FOCUS_TRANSITION_SECONDS, ease: 'power2.inOut', onUpdate }
    gsap.to(pos, { x: focus.position[0], y: focus.position[1], z: focus.position[2], ...options })
    gsap.to(look, { x: focus.lookAt[0], y: focus.lookAt[1], z: focus.lookAt[2], ...options })
    return () => {
      gsap.killTweensOf(pos)
      gsap.killTweensOf(look)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focus, reducedMotion, camera, invalidate])

  // Reduced motion: snap straight to the scene path (frameloop is on demand).
  useEffect(() => {
    if (!reducedMotion || focus) return
    apply(getCameraState(progress), null)
    invalidate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, focus, reducedMotion, camera, invalidate])

  useFrame((_, delta) => {
    // While a project is focused, the GSAP tween owns the camera.
    if (reducedMotion || focus) return
    apply(getCameraState(progress), 1 - Math.exp(-4 * delta))
  })

  return null
}
