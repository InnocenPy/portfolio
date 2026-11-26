/** Device-pixel-ratio range for the Canvas: 1.5 max on desktop, fixed 1.0 on mobile. */
export const DESKTOP_DPR: [number, number] = [1, 1.5]
export const MOBILE_DPR = 1

export function getDpr(isMobile: boolean): number | [number, number] {
  return isMobile ? MOBILE_DPR : DESKTOP_DPR
}
