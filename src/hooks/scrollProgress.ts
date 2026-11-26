export function getScrollProgress(scrollY: number, maxScroll: number): number {
  if (maxScroll <= 0) return 0
  return Math.min(1, Math.max(0, scrollY / maxScroll))
}
