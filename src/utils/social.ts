export function isSocialActive(url: string | undefined): boolean {
  if (!url) return false

  const trimmed = url.trim()
  return trimmed !== '' && trimmed !== '#'
}
