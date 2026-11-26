import { MeshStandardMaterial } from 'three'

export const paletteColors = {
  midnight: '#080B12',
  navy: '#101827',
  cyan: '#00D4FF',
  pure: '#F5F7FA',
  silver: '#8995A7',
} as const

export function createNavyMaterial(): MeshStandardMaterial {
  return new MeshStandardMaterial({ color: paletteColors.navy, roughness: 0.6, metalness: 0.3 })
}

export function createCyanMaterial(): MeshStandardMaterial {
  return new MeshStandardMaterial({
    color: paletteColors.cyan,
    emissive: paletteColors.cyan,
    emissiveIntensity: 0.6,
    roughness: 0.4,
  })
}
