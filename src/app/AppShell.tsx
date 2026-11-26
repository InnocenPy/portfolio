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

export function AppShell() {
  const progress = useScrollProgress()
  return (
    <div className="min-h-screen bg-midnight font-display text-pure">
      <SkipLink />
      <ScrollProgress progress={progress} />
      <SiteNav />
      <main id="main-content" tabIndex={-1}>
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
