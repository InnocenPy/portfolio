export const MONOLITH_SCROLL_RANGE: readonly [number, number] = [0.28, 0.55]

/** Monoliths mount only near the Works terrace, or whenever a project is selected. */
export function shouldMountMonoliths(progress: number, selectedProjectId: string | null): boolean {
  if (selectedProjectId) return true
  return progress >= MONOLITH_SCROLL_RANGE[0] && progress <= MONOLITH_SCROLL_RANGE[1]
}
