import { Suspense, lazy } from 'react'
import { WebGLFallbackNotice } from '@/components/ui/WebGLFallbackNotice'
import { useWebGLSupport } from '@/hooks/useWebGLSupport'
import { SkipLink } from '@/components/layout/SkipLink'
import { SiteNav } from '@/components/layout/SiteNav'
import { ScrollProgress } from '@/components/layout/ScrollProgress'
import { ProjectDetailPanel } from '@/components/ui/ProjectDetailPanel'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { HeroSection } from '@/sections/HeroSection'
import { AboutSection } from '@/sections/AboutSection'
import { WorksSection } from '@/sections/WorksSection'
import { SkillsSection } from '@/sections/SkillsSection'
import { ExperienceSection } from '@/sections/ExperienceSection'
import { ContactSection } from '@/sections/ContactSection'

const ExperienceCanvas = lazy(() =>
  import('@/three/engine/ExperienceCanvas').then((m) => ({ default: m.ExperienceCanvas })),
)

export function AppShell() {
  const progress = useScrollProgress()
  const webglSupported = useWebGLSupport()
  return (
    <div className="min-h-screen bg-midnight font-display text-pure">
      {webglSupported ? (
        <Suspense fallback={null}>
          <ExperienceCanvas />
        </Suspense>
      ) : (
        <WebGLFallbackNotice />
      )}
      <SkipLink />
      <ScrollProgress progress={progress} />
      <SiteNav />
      <main id="main-content" tabIndex={-1} className="relative z-10">
        <HeroSection />
        <AboutSection />
        <WorksSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <ProjectDetailPanel />
    </div>
  )
}
