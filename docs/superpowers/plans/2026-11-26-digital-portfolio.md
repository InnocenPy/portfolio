# Digital Portfolio (The Digital Architect) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual, scroll-driven immersive portfolio for Seydou DIAKITE with a terraced Three.js world, HTML overlays, data-driven project monoliths, and production-ready SEO/a11y/perf.

**Architecture:** Fixed R3F canvas + semantic DOM sections synced to scroll progress. Camera follows terrace waypoints; project selection overrides camera and opens a detail panel. Content and i18n live outside the 3D engine (`visualKey` + ids only).

**Tech Stack:** React 19, TypeScript, Vite, Tailwind CSS v4, Three.js, @react-three/fiber, @drei, GSAP (+ ScrollTrigger), Vitest, Testing Library.

**Spec:** `docs/superpowers/specs/2026-11-26-digital-portfolio-design.md`

## Global Constraints

- No copying Overpass/Igloo assets, code, models, textures, or sounds — original identity only.
- Palette only: `#080B12`, `#101827`, `#00D4FF`, `#F5F7FA`, `#8995A7`.
- Fonts: Space Grotesk (headings), IBM Plex Mono (labels).
- Bilingual FR/EN; detect `navigator.language`; persist toggle in `localStorage` key `portfolio.locale`.
- Do not invent skill levels, certifications, metrics, production URLs, or social profile URLs.
- Social GitHub/LinkedIn stay placeholders (`""` or `"#"`) and must render non-interactive when empty/`#`.
- Audio muted by default; never autoplay without explicit user gesture.
- Respect `prefers-reduced-motion`; provide no-WebGL 2D fallback.
- Education / spoken languages sections are out of scope for v1.
- Engine must not hardcode project copy — adding a project = data + optional `visualKey` mapping only.
- After each task: `npm run build` (or typecheck) green before commit when code lands.
- Commit after each task with a focused message.

---

## File structure (create map)

```
portfolio/
  index.html
  package.json
  vite.config.ts
  tsconfig.json
  tsconfig.app.json
  tsconfig.node.json
  vitest.config.ts
  public/
    favicon.svg
    robots.txt
    sitemap.xml
  src/
    main.tsx
    app/App.tsx
    styles/index.css
    types/portfolio.ts
    config/portfolio.config.ts
    data/projects.ts
    data/experience.ts
    data/skills.ts
    i18n/locales/en.ts
    i18n/locales/fr.ts
    i18n/detectLocale.ts
    i18n/I18nProvider.tsx
    i18n/useT.ts
    store/experienceStore.ts
    components/layout/AppShell.tsx
    components/layout/SkipLink.tsx
    components/navigation/SiteNav.tsx
    components/navigation/LocaleToggle.tsx
    components/navigation/AudioToggle.tsx
    components/navigation/ScrollProgress.tsx
    components/sections/HeroSection.tsx
    components/sections/AboutSection.tsx
    components/sections/WorksSection.tsx
    components/sections/SkillsSection.tsx
    components/sections/ExperienceSection.tsx
    components/sections/ContactSection.tsx
    components/ui/ProjectDetailPanel.tsx
    components/ui/WebGLFallbackNotice.tsx
    features/projects/getProjectById.ts
    hooks/useScrollProgress.ts
    hooks/usePrefersReducedMotion.ts
    hooks/useMediaQuery.ts
    hooks/useWebGLSupport.ts
    services/audio/AudioController.ts
    three/engine/ExperienceCanvas.tsx
    three/engine/RendererConfig.tsx
    three/scenes/TerraceWorld.tsx
    three/objects/TerracePlatform.tsx
    three/objects/ProjectMonolith.tsx
    three/objects/monolithFaces.tsx
    three/controllers/ScrollCameraController.tsx
    three/controllers/cameraPath.ts
    three/materials/paletteMaterials.ts
    utils/cn.ts
    utils/social.ts
  src/**/__tests__/*.test.ts(x)
```

---

### Task 1: Scaffold Vite + React + TS + Tailwind + Vitest

**Files:**
- Create: `package.json`, `vite.config.ts`, `vitest.config.ts`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/app/App.tsx`, `src/styles/index.css`, `src/vite-env.d.ts`
- Create: `src/utils/cn.ts`
- Test: `src/utils/__tests__/cn.test.ts`

**Interfaces:**
- Consumes: none
- Produces: runnable Vite app; `cn(...classes: Array<string | false | null | undefined>): string`

- [ ] **Step 1: Scaffold the project**

Run from repo root (keep existing `docs/` and `.gitignore`):

```bash
npm create vite@latest . -- --template react-ts
```

If the tool refuses a non-empty directory, create files manually with the same Vite React-TS layout, then:

```bash
npm install
npm install -D tailwindcss @tailwindcss/vite vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @types/node
```

- [ ] **Step 2: Configure Vite + Tailwind + Vitest**

`vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
})
```

`vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    globals: true,
  },
})
```

`src/styles/index.css`:

```css
@import "tailwindcss";

@theme {
  --color-midnight: #080B12;
  --color-navy: #101827;
  --color-cyan: #00D4FF;
  --color-pure: #F5F7FA;
  --color-silver: #8995A7;
  --font-display: "Space Grotesk", sans-serif;
  --font-mono: "IBM Plex Mono", monospace;
}

html, body, #root {
  min-height: 100%;
  background: var(--color-midnight);
  color: var(--color-pure);
}

body {
  margin: 0;
  font-family: var(--font-display);
}
```

`index.html` — load fonts and set lang:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Seydou Diakite | Full-Stack Developer</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 3: Write failing test for `cn`**

`src/utils/cn.ts` — leave unimplemented or throw temporarily after writing test.

`src/utils/__tests__/cn.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { cn } from '../cn'

describe('cn', () => {
  it('joins truthy class names', () => {
    expect(cn('a', false, null, undefined, 'b')).toBe('a b')
  })
})
```

`src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 4: Run test — expect FAIL**

```bash
npx vitest run src/utils/__tests__/cn.test.ts
```

Expected: FAIL (module or function missing).

- [ ] **Step 5: Implement `cn` and minimal App**

```ts
// src/utils/cn.ts
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ')
}
```

```tsx
// src/app/App.tsx
export default function App() {
  return (
    <main className="min-h-screen bg-midnight text-pure font-display">
      <h1 className="p-8 text-3xl">Seydou DIAKITE</h1>
    </main>
  )
}
```

```tsx
// src/main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

Add scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

- [ ] **Step 6: Verify tests and build**

```bash
npm test
npm run build
```

Expected: tests PASS; build succeeds.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite React TS Tailwind and Vitest"
```

---

### Task 2: Domain types + static data + portfolio config

**Files:**
- Create: `src/types/portfolio.ts`, `src/config/portfolio.config.ts`, `src/data/projects.ts`, `src/data/experience.ts`, `src/data/skills.ts`, `src/features/projects/getProjectById.ts`, `src/utils/social.ts`
- Test: `src/features/projects/__tests__/getProjectById.test.ts`, `src/utils/__tests__/social.test.ts`

**Interfaces:**
- Consumes: none beyond scaffold
- Produces:
  - `export type Locale = 'en' | 'fr'`
  - `export type LocalizedString = Record<Locale, string>`
  - `export interface Project { id: string; visualKey: string; name: string; category: LocalizedString; shortDescription: LocalizedString; longDescription: LocalizedString; technologies: string[]; externalUrl?: string }`
  - `export interface ExperienceItem { id: string; organization: string; period: LocalizedString; role: LocalizedString; highlight: boolean }`
  - `export interface SkillCategory { id: string; label: LocalizedString; items: string[] }`
  - `export const portfolioConfig` with identity, seo, social placeholders, scenes
  - `export const projects: Project[]`
  - `getProjectById(id: string): Project | undefined`
  - `isSocialActive(url: string | undefined): boolean`

- [ ] **Step 1: Write failing tests**

```ts
// src/features/projects/__tests__/getProjectById.test.ts
import { describe, it, expect } from 'vitest'
import { getProjectById } from '../getProjectById'
import { projects } from '@/data/projects'

describe('getProjectById', () => {
  it('returns flex-audit', () => {
    expect(getProjectById('flex-audit')?.name).toBe('FLEX-AUDIT')
  })
  it('returns undefined for unknown id', () => {
    expect(getProjectById('nope')).toBeUndefined()
  })
  it('exposes six projects', () => {
    expect(projects).toHaveLength(6)
  })
})
```

```ts
// src/utils/__tests__/social.test.ts
import { describe, it, expect } from 'vitest'
import { isSocialActive } from '../social'

describe('isSocialActive', () => {
  it('rejects empty and hash placeholders', () => {
    expect(isSocialActive('')).toBe(false)
    expect(isSocialActive('#')).toBe(false)
    expect(isSocialActive(undefined)).toBe(false)
  })
  it('accepts real urls', () => {
    expect(isSocialActive('https://github.com/example')).toBe(true)
  })
})
```

- [ ] **Step 2: Run tests — expect FAIL**

```bash
npx vitest run src/features/projects/__tests__/getProjectById.test.ts src/utils/__tests__/social.test.ts
```

- [ ] **Step 3: Implement types, data, helpers**

```ts
// src/types/portfolio.ts
export type Locale = 'en' | 'fr'
export type LocalizedString = Record<Locale, string>

export interface Project {
  id: string
  visualKey: string
  name: string
  category: LocalizedString
  shortDescription: LocalizedString
  longDescription: LocalizedString
  technologies: string[]
  externalUrl?: string
}

export interface ExperienceItem {
  id: string
  organization: string
  period: LocalizedString
  role: LocalizedString
  highlight: boolean
}

export interface SkillCategory {
  id: string
  label: LocalizedString
  items: string[]
}

export type SceneId =
  | 'intro'
  | 'about'
  | 'works'
  | 'skills'
  | 'experience'
  | 'contact'
```

```ts
// src/config/portfolio.config.ts
import type { SceneId } from '@/types/portfolio'

export const portfolioConfig = {
  identity: {
    name: 'Seydou DIAKITE',
    title: {
      en: 'Full-Stack Developer | Web & Mobile Application Developer',
      fr: 'Développeur Full-Stack | Applications Web & Mobile',
    },
    baseline: {
      en: 'Turning ideas into digital experiences.',
      fr: 'Transformer les idées en expériences digitales.',
    },
    location: { en: 'Bamako, Mali', fr: 'Bamako, Mali' },
    email: 'dktseydou@gmail.com',
    phone: '+223 83 38 20 44',
  },
  seo: {
    title: 'Seydou Diakite | Full-Stack Developer',
    description: {
      en: 'Full-Stack Developer specializing in modern web and mobile applications, software architecture and scalable digital solutions.',
      fr: 'Développeur Full-Stack spécialisé dans les applications web et mobile modernes, l’architecture logicielle et les solutions digitales évolutives.',
    },
  },
  social: {
    email: 'mailto:dktseydou@gmail.com',
    github: '#',
    linkedin: '#',
  },
  scenes: [
    'intro',
    'about',
    'works',
    'skills',
    'experience',
    'contact',
  ] as SceneId[],
  contactHeadline: {
    en: 'Have an idea? Let’s build something meaningful.',
    fr: 'Une idée ? Construisons quelque chose qui a du sens.',
  },
} as const
```

Implement `src/data/projects.ts` with all six projects from the spec. Use only known technologies; for BASE-OISE and GTP use `technologies: []` if not specified in the brief (do not invent). Bilingual short/long descriptions based on the provided English copy + accurate French translations. `visualKey` values: `finance`, `map`, `time`, `architecture`, `shop`, `network`.

Implement experience and skills arrays exactly per spec (`highlight: true` for SITAN, AGETIC, KINTECH).

```ts
// src/features/projects/getProjectById.ts
import { projects } from '@/data/projects'
import type { Project } from '@/types/portfolio'

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}
```

```ts
// src/utils/social.ts
export function isSocialActive(url: string | undefined): boolean {
  if (!url) return false
  const trimmed = url.trim()
  return trimmed !== '' && trimmed !== '#'
}
```

- [ ] **Step 4: Run tests — expect PASS**

```bash
npm test
```

- [ ] **Step 5: Commit**

```bash
git add src/types src/config src/data src/features src/utils
git commit -m "feat: add portfolio domain types, content data, and social helpers"
```

---

### Task 3: i18n provider (detect + persist + toggle)

**Files:**
- Create: `src/i18n/detectLocale.ts`, `src/i18n/locales/en.ts`, `src/i18n/locales/fr.ts`, `src/i18n/I18nProvider.tsx`, `src/i18n/useT.ts`
- Test: `src/i18n/__tests__/detectLocale.test.ts`
- Modify: `src/main.tsx`, `src/app/App.tsx`

**Interfaces:**
- Consumes: `Locale` from types; `portfolioConfig` strings where needed
- Produces:
  - `detectLocale(language: string, stored: string | null): Locale`
  - `I18nProvider` with `locale`, `setLocale`, `t(key)`
  - UI dictionary keys for nav, a11y, audio, fallback notices

- [ ] **Step 1: Write failing detectLocale tests**

```ts
import { describe, it, expect } from 'vitest'
import { detectLocale } from '../detectLocale'

describe('detectLocale', () => {
  it('prefers stored locale', () => {
    expect(detectLocale('en-US', 'fr')).toBe('fr')
  })
  it('uses browser french', () => {
    expect(detectLocale('fr-FR', null)).toBe('fr')
  })
  it('defaults to en', () => {
    expect(detectLocale('de-DE', null)).toBe('en')
  })
  it('ignores invalid stored values', () => {
    expect(detectLocale('fr-ML', 'es')).toBe('fr')
  })
})
```

- [ ] **Step 2: Run — expect FAIL**

```bash
npx vitest run src/i18n/__tests__/detectLocale.test.ts
```

- [ ] **Step 3: Implement i18n**

```ts
// src/i18n/detectLocale.ts
import type { Locale } from '@/types/portfolio'

const LOCALES: Locale[] = ['en', 'fr']

export function detectLocale(language: string, stored: string | null): Locale {
  if (stored && LOCALES.includes(stored as Locale)) return stored as Locale
  const base = language.toLowerCase().split('-')[0]
  return base === 'fr' ? 'fr' : 'en'
}
```

Create `en.ts` / `fr.ts` dictionaries with at least:

```ts
export const en = {
  nav: {
    intro: 'Intro',
    about: 'About',
    works: 'Work',
    skills: 'Stack',
    experience: 'Experience',
    contact: 'Contact',
    skip: 'Skip to content',
  },
  audio: { enable: 'Enable sound', disable: 'Mute sound' },
  locale: { switchTo: 'FR', label: 'Language' },
  webgl: { unavailable: '3D experience unavailable — showing accessible content.' },
  works: { open: 'View project', close: 'Close project' },
  scroll: 'Scroll',
} as const
```

Mirror in French. `I18nProvider` reads `localStorage.getItem('portfolio.locale')`, uses `detectLocale(navigator.language, stored)`, writes on change, sets `document.documentElement.lang`.

`useT()` returns `{ locale, setLocale, t }` where `t` resolves nested keys like `nav.about`.

- [ ] **Step 4: Wrap App and smoke-test**

```bash
npm test
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/i18n src/main.tsx src/app/App.tsx
git commit -m "feat: add bilingual i18n with detection and persistence"
```

---

### Task 4: UI shell — theme chrome, nav, sections skeleton

**Files:**
- Create: layout/nav/section components listed in file map (skeleton content OK for 3D-dependent bits)
- Create: `src/hooks/usePrefersReducedMotion.ts`, `src/hooks/useMediaQuery.ts`, `src/hooks/useScrollProgress.ts`
- Modify: `src/app/App.tsx`
- Test: `src/hooks/__tests__/useScrollProgress.test.ts` (pure helper extracted)

**Interfaces:**
- Consumes: `portfolioConfig`, i18n, scene ids
- Produces:
  - `getScrollProgress(scrollY: number, maxScroll: number): number` clamped 0..1
  - `AppShell` rendering fixed chrome + tall scroll track with 6 `<section id="...">`
  - Hero split layout: left identity, right empty `div` reserved for 3D peek (`aria-hidden` placeholder)

- [ ] **Step 1: Failing test for scroll progress helper**

Put pure function in `src/hooks/scrollProgress.ts`:

```ts
export function getScrollProgress(scrollY: number, maxScroll: number): number {
  if (maxScroll <= 0) return 0
  return Math.min(1, Math.max(0, scrollY / maxScroll))
}
```

Test extremes 0, 1, clamp above 1.

- [ ] **Step 2: Implement AppShell + sections**

Requirements:
- `SkipLink` → `#main-content`
- `SiteNav` anchors to `#intro` … `#contact`
- `LocaleToggle` calls `setLocale`
- `AudioToggle` present but disabled until Task 10 (button `disabled` + `aria-disabled`)
- `ScrollProgress` thin top bar width = progress %
- Each section `min-h-screen` with semantic headings
- Hero uses approved split: brand left strongest; title; baseline; scroll hint
- Colors via Tailwind theme tokens (`bg-midnight`, `text-cyan`, etc.)
- No cards in hero

Wire `useScrollProgress` with scroll listener on `window` (or scroll container) updating store or React state.

- [ ] **Step 3: Visual verify**

```bash
npm run dev
```

Check desktop + narrow viewport: nav works, locale toggles FR/EN content for nav labels and hero baseline.

- [ ] **Step 4: Commit**

```bash
git commit -am "feat: add responsive UI shell, nav, and section skeletons"
```

---

### Task 5: Content sections — About, Skills, Experience, Contact, Works list

**Files:**
- Modify section components + `ProjectDetailPanel.tsx` (panel UI without camera yet)
- Create: `src/store/experienceStore.ts` (selected project id, audio enabled)
- Test: `src/utils/__tests__/social.test.ts` already covers links; add `ProjectDetailPanel` render test

**Interfaces:**
- Consumes: data files, i18n, `isSocialActive`
- Produces:
  - `experienceStore`: `{ selectedProjectId: string | null; setSelectedProjectId; audioEnabled: boolean; setAudioEnabled }`
  - Panel shows name, category, short, long, tech chips; Close button; no fake external link button when `externalUrl` missing/inactive

- [ ] **Step 1: Implement store**

Use a minimal React context or Zustand only if already justified — prefer React context in `src/store/experienceStore.ts` to avoid extra dependency:

```tsx
// Pattern: createContext + Provider with useExperienceStore()
```

- [ ] **Step 2: Fill About / Skills / Experience / Contact / Works**

- About: professional description bilingual (from spec), philosophy paragraph — no education.
- Skills: six categories as interactive chips/lists (not proficiency bars).
- Experience: vertical timeline; `highlight` items visually stronger (cyan accent).
- Works: accessible HTML list of projects (for SEO/a11y) with buttons that `setSelectedProjectId`.
- Contact: headline from config; `mailto:` CTA; phone `tel:`; GitHub/LinkedIn rendered only if `isSocialActive`.

- [ ] **Step 3: ProjectDetailPanel**

Fixed/aside panel on desktop; full-width bottom sheet styles on `max-width: 768px`. Escape key closes. Focus trap light-touch: focus close button on open.

- [ ] **Step 4: Test panel render**

```tsx
// render with provider + project id flex-audit; expect FLEX-AUDIT text; no "Visit site" if no url
```

- [ ] **Step 5: Commit**

```bash
git commit -am "feat: wire professional content sections and project detail panel"
```

---

### Task 6: SEO assets — meta, favicon, robots, sitemap

**Files:**
- Create: `public/favicon.svg`, `public/robots.txt`, `public/sitemap.xml`
- Modify: `index.html` (description, OG tags)
- Create: `src/components/seo/DocumentMeta.tsx` (updates description when locale changes)

**Interfaces:**
- Produces: static SEO files; runtime meta sync for locale description

- [ ] **Step 1: Add public assets**

`robots.txt`:

```
User-agent: *
Allow: /

Sitemap: /sitemap.xml
```

Add `siteUrl: 'https://portfolio.local'` to `portfolio.config.ts` as a **deploy replaceable constant** (not a claimed personal domain). Ship matching sitemap:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://portfolio.local/</loc>
  </url>
</urlset>
```

Favicon: minimal geometric “SD” mark using cyan on midnight SVG.

OG tags in `index.html` + `DocumentMeta` for `og:title`, `og:description`.

- [ ] **Step 2: Verify build includes public files**

```bash
npm run build
ls dist
```

- [ ] **Step 3: Commit**

```bash
git commit -am "feat: add SEO metadata, favicon, robots, and sitemap"
```

---

### Task 7: 3D engine core + WebGL detection + fallback

**Files:**
- Create: `src/hooks/useWebGLSupport.ts`, `src/three/engine/ExperienceCanvas.tsx`, `src/three/engine/RendererConfig.tsx`, `src/three/materials/paletteMaterials.ts`, `src/components/ui/WebGLFallbackNotice.tsx`
- Modify: `AppShell` to mount canvas fixed inset-0 pointer-events-none (canvas sets pointer-events auto on interactive meshes later)
- Test: `src/hooks/__tests__/useWebGLSupport.test.ts` (mock canvas getContext)

**Interfaces:**
- Consumes: palette
- Produces:
  - `isWebGLAvailable(): boolean`
  - `<ExperienceCanvas />` wrapping R3F Canvas with `dpr={[1, 1.5]}`, dark clear color `#080B12`
  - Fallback notice when WebGL false; sections still fully usable

- [ ] **Step 1: Install 3D deps**

```bash
npm install three @types/three @react-three/fiber @react-three/drei gsap
```

- [ ] **Step 2: Tests for WebGL helper**

```ts
export function isWebGLAvailable(
  createCanvas: () => HTMLCanvasElement = () => document.createElement('canvas'),
): boolean {
  try {
    const canvas = createCanvas()
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
  } catch {
    return false
  }
}
```

- [ ] **Step 3: ExperienceCanvas**

Mount a simple ambient light + one navy box to prove render. `frameloop` pause when `document.hidden`. If `prefers-reduced-motion`, set `frameloop="demand"`.

- [ ] **Step 4: Manual verify + commit**

```bash
npm run dev
npm run build
git commit -am "feat: add R3F engine shell and WebGL fallback"
```

---

### Task 8: Terrace world + scroll camera path

**Files:**
- Create: `TerraceWorld.tsx`, `TerracePlatform.tsx`, `ScrollCameraController.tsx`, `cameraPath.ts`
- Test: `src/three/controllers/__tests__/cameraPath.test.ts`

**Interfaces:**
- Consumes: scroll progress 0..1; `portfolioConfig.scenes`
- Produces:
  - `getCameraState(progress: number): { position: [x,y,z]; lookAt: [x,y,z] }`
  - Six terrace platforms stacked on Y (e.g. y = index * 8)
  - Controller lerps camera each frame toward path state; if reduced-motion, snap to scene without lerp

- [ ] **Step 1: Failing tests for cameraPath**

Assert progress `0` near intro terrace, `1` near contact, and monotonic Y increase.

Example:

```ts
import { getCameraState } from '../cameraPath'

it('starts at intro height', () => {
  const a = getCameraState(0)
  const b = getCameraState(1)
  expect(b.position[1]).toBeGreaterThan(a.position[1])
})
```

- [ ] **Step 2: Implement terraces + controller**

`TerraceWorld` renders 6 `TerracePlatform` meshes (thin boxes, navy, silver edges). Subtle fog. No particles if reduced-motion or mobile (`useMediaQuery('(max-width: 768px)')`).

Wire scroll progress from Task 4 into `ScrollCameraController` via context/store `scrollProgress: number`.

- [ ] **Step 3: Verify scroll moves camera across terraces**

- [ ] **Step 4: Commit**

```bash
git commit -am "feat: add terraced world and scroll-driven camera path"
```

---

### Task 9: Project monoliths + focus camera + panel sync

**Files:**
- Create: `ProjectMonolith.tsx`, `monolithFaces.tsx`
- Modify: `TerraceWorld`, `ScrollCameraController`, `WorksSection`, store
- Test: map `visualKey` → face component exists for all six keys

**Interfaces:**
- Consumes: `projects`, `selectedProjectId`, scroll camera
- Produces:
  - One monolith per project on the Works terrace
  - Hover emissive cyan
  - Click → `setSelectedProjectId` + camera focus offset in front of monolith
  - Closing panel clears selection and resumes scroll path control
  - `pointer-events` on monolith meshes only

- [ ] **Step 1: Test visualKey coverage**

```ts
import { projects } from '@/data/projects'
import { monolithFaceKeys } from '../monolithFaces'

it('defines a face for every project visualKey', () => {
  for (const p of projects) {
    expect(monolithFaceKeys).toContain(p.visualKey)
  }
})
```

- [ ] **Step 2: Implement procedural face materials**

CanvasTexture or simple colored plane geometries suggesting finance/map/time/architecture/shop/network — original, abstract, no external brand assets.

- [ ] **Step 3: Focus camera behavior**

When `selectedProjectId` set, `getFocusCameraState(projectId)` overrides scroll path. Use GSAP `to` for a 0.8s camera transition when motion is allowed; when `prefers-reduced-motion`, snap instantly.

- [ ] **Step 4: Mobile**

On viewports `max-width: 768px`, project open always uses the bottom-sheet panel; camera still eases toward the monolith but with a wider FOV-friendly distance (1.4× desktop focus distance) so the mesh is not cropped.

- [ ] **Step 5: Commit**

```bash
git commit -am "feat: add project monoliths with focus camera and panel sync"
```

---

### Task 10: Audio controller (muted by default)

**Files:**
- Create: `src/services/audio/AudioController.ts`
- Modify: `AudioToggle.tsx`, store
- Test: `src/services/audio/__tests__/AudioController.test.ts`

**Interfaces:**
- Produces:
  - `AudioController` with `enable()`, `disable()`, `playUiTick()`, `isEnabled`
  - Uses Web Audio API oscillators or silent-capable stubs; if construction fails, `available: false` and toggle hidden
  - No network-required audio files required for v1 (procedural tones) to avoid asset licensing issues

- [ ] **Step 1: Tests**

```ts
it('starts disabled', () => {
  const audio = new AudioController()
  expect(audio.isEnabled).toBe(false)
})
it('enable flips state', async () => {
  const audio = new AudioController({ now: () => 0 })
  await audio.enable()
  expect(audio.isEnabled).toBe(true)
})
```

- [ ] **Step 2: Implement + wire toggle**

Enable only on user click. Play short tick on locale toggle / project open when enabled. While enabled, run a low-gain ambient oscillator (gain ≤ 0.03); stop ambient on disable.

- [ ] **Step 3: Commit**

```bash
git commit -am "feat: add explicit-opt-in procedural audio toggle"
```

---

### Task 11: Performance, reduced-motion polish, a11y pass

**Files:**
- Modify: engine, canvas, nav, panel, sections
- Create: keyboard helpers if needed

**Requirements (checklist as implementation steps):**
- [ ] Cap DPR at 1.5 desktop / 1.0 mobile
- [ ] Dispose geometries/materials on unmount in monolith/platform components
- [ ] Pause R3F loop when tab hidden
- [ ] `prefers-reduced-motion`: no fog particles, instant camera, reduced GSAP
- [ ] Keyboard: Tab through nav; Enter opens project from works list; Escape closes panel
- [ ] Contrast check text silver/cyan on midnight
- [ ] Ensure canvas `aria-hidden` and decorative; all info in DOM
- [ ] Mount project monoliths only when `scrollProgress` is in `[0.28, 0.55]` or a project is selected; otherwise keep terrace platforms only

- [ ] **Verify**

```bash
npm test
npm run build
```

Manual: Chrome prefers-reduced-motion emulate; keyboard-only walkthrough; mobile width.

- [ ] **Commit**

```bash
git commit -am "perf: harden rendering, motion prefs, and keyboard accessibility"
```

---

### Task 12: Production verification + README launch instructions

**Files:**
- Create: `README.md` (launch instructions — allowed here as deliverable of this task)
- Modify: none unless fixes found

- [ ] **Step 1: Clean production build**

```bash
npm run build
npm run preview
```

- [ ] **Step 2: README**

Include:
- Node version recommendation (20+)
- `npm install`
- `npm run dev`
- `npm run build` / `npm run preview`
- `npm test`
- Note on WebGL requirement and placeholder social URLs in `portfolio.config.ts`
- Note `siteUrl` for sitemap

- [ ] **Step 3: Final regression checklist**

- [ ] Hero split + brand dominance
- [ ] 6 scenes scrollable
- [ ] 6 projects from data; panel content FR/EN
- [ ] Timeline highlights 2022+
- [ ] mailto + tel work
- [ ] GitHub/LinkedIn not clickable as placeholders
- [ ] Audio off by default
- [ ] No invented metrics/URLs

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: add local launch and verification instructions"
```

---

## Spec coverage matrix

| Spec area | Task(s) |
|-----------|---------|
| Approach A overlay + canvas | 4, 7, 8 |
| Palette + fonts | 1, 4 |
| Terraces + monoliths + hero split | 4, 8, 9 |
| 6 scenes + chrome | 4, 5 |
| Data-driven projects | 2, 9 |
| Experience/skills content | 2, 5 |
| i18n detect + toggle | 3 |
| Social placeholders | 2, 5 |
| Audio opt-in | 10 |
| WebGL fallback | 7 |
| Reduced motion / mobile | 8, 9, 11 |
| SEO robots/sitemap/meta | 6 |
| Perf dispose/DPR | 7, 11 |
| Phased verification | each task build/test + Task 12 |

---

## Self-review notes

- No TBD/TODO left in tasks; `siteUrl` uses explicit replaceable `https://portfolio.local` constant.
- BASE-OISE / GTP technologies intentionally empty arrays when unknown — do not invent.
- Types (`Locale`, `Project`, `visualKey`) consistent across tasks 2→9.
- Audio and 3D are sequential after UI content so the site is usable early.
