/**
 * Tailwind `md` starts at min-width 768px, so "mobile" is strictly below it.
 * Use 767.98px to avoid a 1px overlap where both md styles and mobile camera apply.
 */
export const MD_BREAKPOINT_PX = 768
export const MOBILE_MEDIA_QUERY = `(max-width: ${MD_BREAKPOINT_PX - 0.02}px)`
