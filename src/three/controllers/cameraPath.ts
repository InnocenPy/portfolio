import { portfolioConfig } from '@/config/portfolio.config'

export type Vec3 = [number, number, number]
export interface CameraState {
  position: Vec3
  lookAt: Vec3
}

export const TERRACE_SPACING = 8
export const TERRACE_COUNT = portfolioConfig.scenes.length

const CAMERA_OFFSET: Vec3 = [0, 2.5, 9]

/** Camera stop for each terrace (index → state). */
export function getSceneCameraState(index: number): CameraState {
  const y = index * TERRACE_SPACING
  const sway = index % 2 === 0 ? -1.2 : 1.2
  return {
    position: [CAMERA_OFFSET[0] + sway, y + CAMERA_OFFSET[1], CAMERA_OFFSET[2]],
    lookAt: [0, y, 0],
  }
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const lerpVec = (a: Vec3, b: Vec3, t: number): Vec3 => [
  lerp(a[0], b[0], t),
  lerp(a[1], b[1], t),
  lerp(a[2], b[2], t),
]

/** Maps scroll progress (0..1) to a camera pose along the terraces. */
export function getCameraState(progress: number): CameraState {
  const p = Number.isFinite(progress) ? Math.min(1, Math.max(0, progress)) : 0
  const scaled = p * (TERRACE_COUNT - 1)
  const i = Math.min(TERRACE_COUNT - 2, Math.floor(scaled))
  const t = scaled - i
  const a = getSceneCameraState(i)
  const b = getSceneCameraState(i + 1)
  return {
    position: lerpVec(a.position, b.position, t),
    lookAt: lerpVec(a.lookAt, b.lookAt, t),
  }
}
