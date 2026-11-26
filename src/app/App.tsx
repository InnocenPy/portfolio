import { ExperienceProvider } from '@/store/experienceStore'
import { ScrollProgressProvider } from '@/hooks/ScrollProgressProvider'
import { DocumentMeta } from '@/components/seo/DocumentMeta'
import { AppShell } from './AppShell'

export default function App() {
  return (
    <ExperienceProvider>
      <ScrollProgressProvider>
        <DocumentMeta />
        <AppShell />
      </ScrollProgressProvider>
    </ExperienceProvider>
  )
}
