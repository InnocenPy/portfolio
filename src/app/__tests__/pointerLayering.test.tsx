import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { I18nProvider } from '@/i18n/I18nProvider'
import { ExperienceProvider } from '@/store/experienceStore'
import { WorksSection } from '@/sections/WorksSection'
import { MOBILE_MEDIA_QUERY, MD_BREAKPOINT_PX } from '@/config/breakpoints'
import appShellSrc from '../AppShell.tsx?raw'
import monolithSrc from '@/three/world/ProjectMonolith.tsx?raw'

describe('pointer layering', () => {
  it('main chrome is click-through so the Canvas can receive pointer events', () => {
    expect(appShellSrc).toMatch(/<main[^>]*className="[^"]*pointer-events-none/)
  })

  it('Works section is click-through; only heading and cards capture events', () => {
    const { container } = render(
      <I18nProvider>
        <ExperienceProvider>
          <WorksSection />
        </ExperienceProvider>
      </I18nProvider>,
    )
    const section = container.querySelector('section#works')!
    expect(section.className).toContain('pointer-events-none')
    expect(section.querySelector('h2')!.className).toContain('pointer-events-auto')
    const items = section.querySelectorAll('li')
    expect(items.length).toBeGreaterThan(0)
    items.forEach((li) => expect(li.className).toContain('pointer-events-auto'))
  })

  it('mobile query ends just before the Tailwind md (768px) breakpoint', () => {
    expect(MD_BREAKPOINT_PX).toBe(768)
    expect(MOBILE_MEDIA_QUERY).toBe('(max-width: 767.98px)')
  })

  it('monolith pointer handlers are attached to the mesh, not only the group', () => {
    expect(monolithSrc).toMatch(/<mesh\s+onPointerOver/)
    expect(monolithSrc).not.toMatch(/<group\s+position=\{position\}\s+onPointer/)
  })
})
