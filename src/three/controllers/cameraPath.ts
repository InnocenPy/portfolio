import { portfolioConfig } from '@/config/portfolio.config'
import { projects } from '@/data/projects'

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

export const MONOLITH_SPACING = 2.4
export const MONOLITH_CENTER_Y = 1.4
export const FOCUS_DISTANCE_DESKTOP = 5
export const FOCUS_DISTANCE_MOBILE_FACTOR = 1.4

const WORKS_INDEX = Math.max(0, portfolioConfig.scenes.indexOf('works'))

/** World position (center) of the monolith at `index` on the Works terrace. */
export function getMonolithPosition(index: number, count: number = projects.length): Vec3 {
  const x = (index - (count - 1) / 2) * MONOLITH_SPACING
  return [x, WORKS_INDEX * TERRACE_SPACING + MONOLITH_CENTER_Y, 0]
}

/**
 * Camera pose focusing a project's monolith, offset in front of it.
 * Mobile uses 1.4x the desktop distance so the mesh is not cropped.
 */
export function getFocusCameraState(projectId: string, isMobile = false): CameraState | null {
  const index = projects.findIndex((p) => p.id === projectId)
  if (index < 0) return null
  const [x, y, z] = getMonolithPosition(index)
  const distance = FOCUS_DISTANCE_DESKTOP * (isMobile ? FOCUS_DISTANCE_MOBILE_FACTOR : 1)
  return {
    position: [x, y + 0.6, z + distance],
    lookAt: [x, y, z],
  }
}
