export function ScrollProgress({ progress }: { progress: number }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 bg-transparent" aria-hidden="true">
      <div className="h-full bg-cyan" style={{ width: `${progress * 100}%` }} />
    </div>
  )
}
