import { SkipLink } from '@/components/layout/SkipLink'
import { SiteNav } from '@/components/layout/SiteNav'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { HeroSection } from '@/sections/HeroSection'
import { PlaceholderSection } from '@/sections/PlaceholderSection'

export function AppShell() {
  const progress = useScrollProgress()
  return (
    <div className="min-h-screen bg-midnight font-display text-pure">
      <SkipLink />
      <ScrollProgress progress={progress} />
      <SiteNav />
      <main id="main-content" tabIndex={-1}>
        <HeroSection />
        <PlaceholderSection id="about" />
        <PlaceholderSection id="works" />
        <PlaceholderSection id="skills" />
        <PlaceholderSection id="experience" />
        <PlaceholderSection id="contact" />
      </main>
    </div>
  )
}
