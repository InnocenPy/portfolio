import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { getScrollProgress } from './scrollProgress'

const ScrollProgressContext = createContext<number | null>(null)

/** Single scroll/resize + rAF subscriber; consumers read the shared progress (0..1). */
export function ScrollProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setProgress(getScrollProgress(window.scrollY, maxScroll))
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return <ScrollProgressContext.Provider value={progress}>{children}</ScrollProgressContext.Provider>
}

export function useScrollProgress(): number {
  const value = useContext(ScrollProgressContext)
  if (value === null) {
    throw new Error('useScrollProgress must be used within ScrollProgressProvider')
  }
  return value
}
