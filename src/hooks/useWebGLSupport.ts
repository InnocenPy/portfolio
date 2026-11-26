import { useState } from 'react'

export function isWebGLAvailable(
  createCanvas: () => HTMLCanvasElement = () => document.createElement('canvas'),
): boolean {
  try {
    const canvas = createCanvas()
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
  } catch {
    return false
  }
}

export function useWebGLSupport(): boolean {
  const [supported] = useState(() => (typeof document === 'undefined' ? false : isWebGLAvailable()))
  return supported
}
