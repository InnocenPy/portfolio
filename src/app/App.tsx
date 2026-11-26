import { ExperienceProvider } from '@/store/experienceStore'
import { AppShell } from './AppShell'

export default function App() {
  return (
    <ExperienceProvider>
      <AppShell />
    </ExperienceProvider>
  )
}
