import { ExperienceProvider } from '@/store/experienceStore'
import { DocumentMeta } from '@/components/seo/DocumentMeta'
import { AppShell } from './AppShell'

export default function App() {
  return (
    <ExperienceProvider>
      <DocumentMeta />
      <AppShell />
    </ExperienceProvider>
  )
}
