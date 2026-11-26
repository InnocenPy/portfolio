# SEYDOU DIAKITE — Digital Portfolio Design Spec

**Date:** 2026-11-26  
**Status:** Approved (brainstorm) — pending user review of written spec  
**Concept:** The Digital Architect  
**Reference (interaction principles only):** https://www.igloo.inc/portfolio/overpass  

Do **not** copy proprietary code, 3D models, textures, sounds, or assets from the reference. Inspiration is limited to creative approach and interaction principles. Original visual identity required.

---

## 1. Goals & audience

- **Primary audiences:** recruiters/employers **and** clients/freelance opportunities (balanced).
- **Success:** memorable immersive experience; clear professional identity; discoverable work and stack; usable contact path.
- **Languages:** bilingual FR/EN with browser language detection and manual toggle (persisted).
- **Out of scope (v1):** education history, spoken languages section, invented metrics/URLs/deploy stats, copying reference assets.

---

## 2. Chosen approach

**Approach A — Single continuous 3D world + semantic HTML overlay**

- Fixed full-viewport React Three Fiber canvas.
- Scroll drives cinematic camera along terrace levels.
- All readable content lives in the DOM (SEO, a11y, i18n).
- Project click → camera focus + cinematic detail panel.
- Mobile: same narrative, simplified 3D, touch-friendly project sheet.

Rejected: full-Canvas UI (B), 2.5D chapter split with 3D only on hero/works (C).

---

## 3. Visual identity

| Token | Value |
|-------|--------|
| Midnight Black | `#080B12` |
| Deep Navy | `#101827` |
| Electric Cyan | `#00D4FF` |
| Pure White | `#F5F7FA` |
| Metallic Silver | `#8995A7` |

- **Headings:** Space Grotesk  
- **Technical labels / metadata:** IBM Plex Mono  
- **Feel:** premium, minimal, futuristic, technical, elegant, immersive  
- **Avoid:** generic templates, excessive gradients, purple-AI clichés, cluttered card grids in hero

### Hero composition (approved)

**Split editorial:** identity block left; dominant 3D volume right; continuous scene (not a detached card). Brand name is the strongest text signal. One title line, baseline, scroll affordance, minimal nav.

### World layout (approved)

**Terraced digital building:** stacked architectural platforms mapped to narrative scenes. Camera ascends / advances with scroll.

### Project objects (approved)

**Metallic monoliths:** shared prism language; unique procedural face illustration per project via `visualKey`. Hover cyan glow; click focuses camera and opens detail panel.

---

## 4. Narrative structure (6 scenes)

1. **Intro / Hero** — SEYDOU DIAKITE · Full-Stack Developer · “Turning ideas into digital experiences.” · 3D signature · scroll indicator · minimal nav  
2. **About** — professional description, approach, philosophy (cinematic terrace transition)  
3. **Selected Works** — six monoliths; detail panel (title, category, short + long description, technologies); no fake external links  
4. **Tech Stack** — interactive category groups; subtle 3D / floating labels  
5. **Experience** — interactive timeline; emphasize software work from 2022+ (KINTECH, AGETIC, SITAN); earlier accounting roles present but secondary  
6. **Contact** — “Have an idea? Let's build something meaningful.” · email · phone · LinkedIn/GitHub placeholders · functional `mailto:` CTA  

**Persistent chrome:** section nav, FR/EN toggle, audio mute/unmute, skip-to-content, discreet scroll progress.

---

## 5. Content model

### Identity

- Name: Seydou DIAKITE  
- Title: Full-Stack Developer | Web & Mobile Application Developer  
- Baseline: Turning ideas into digital experiences.  
- Location: Bamako, Mali  
- Email: dktseydou@gmail.com  
- Phone: +223 83 38 20 44  

### Experience (timeline)

| Org | Period | Role |
|-----|--------|------|
| SITAN INFORMATIQUE | 2024 – Present | Web and Mobile Application Developer |
| AGETIC | 2023 | Application Developer |
| KINTECH | 2022 – 2023 | Full-Stack Developer |
| ECMBTP | 2016 – 2018 | Accounting Assistant |
| BUDGET DE KAYES | 2015 – 2016 | Accounting Intern |

### Skills (no proficiency levels or certifications invented)

- **Frontend:** Angular, React, HTML5, CSS3, JavaScript, TypeScript  
- **Backend:** Node.js, NestJS, Java, Spring Boot  
- **Mobile:** React Native, Flutter  
- **Database:** PostgreSQL, MySQL  
- **DevOps:** Docker  
- **Software Engineering:** Clean Architecture, REST API, JWT Authentication, Database Design, Full-Stack Development  

### Projects (data-driven)

Each project: `id`, `visualKey`, category, short description, long description, technologies[], bilingual fields. Central config — adding a project must not require rewriting the 3D engine.

| ID | Name | Category | Tech notes | Visual direction |
|----|------|----------|------------|------------------|
| flex-audit | FLEX-AUDIT | Enterprise / Accounting | Angular, NestJS, TypeScript, PostgreSQL | Financial dashboard motifs |
| base-oise | BASE-OISE | Government / Public Admin | (as available; no invented stack) | Map / territorial structures |
| gtp | GTP | Business / Time Tracking | (as available) | Timeline / clock motifs |
| diakite-service | DIAKITE SERVICE | Real Estate | Angular, Spring Boot | Minimal architectural building |
| diak-shop | DIAK-SHOP | E-commerce | JavaScript, Node.js | Digital shopping environment |
| beka-bara | BEKA-BARA | Mobile / Marketplace | React Native, NestJS, PostgreSQL, PostGIS | Geolocation / provider network |

Do not invent statistics, production URLs, or user counts. Detail view replaces missing public links.

### Social

Configurable GitHub, LinkedIn, Email. **v1:** placeholders until real URLs provided. Empty/`#` links are non-interactive or omitted.

### Audio

Default silent. Optional subtle ambient + interaction sounds after **explicit** user enable. Never autoplay without gesture. Toggle in chrome; hide toggle if audio subsystem fails.

---

## 6. Technical architecture

### Stack (greenfield)

React, TypeScript, Vite, Three.js, React Three Fiber, Drei, GSAP (+ ScrollTrigger), Tailwind CSS. Install only what is necessary. Lightweight i18n (dictionaries + detection + persistence) — no heavy i18n framework unless justified later.

### Suggested structure

```
src/
  app/
  components/layout|navigation|sections|ui/
  config/portfolio.config.ts|projects.config.ts
  data/projects.ts|experience.ts|skills.ts
  features/about|projects|contact|experience|skills/
  three/engine|scenes|objects|animations|materials|controllers/
  hooks/ services/ styles/ types/ utils/
```

### Subsystems

1. **Core 3D engine** — Canvas, DPR caps, dispose, WebGL detect  
2. **Scene management** — terraced world zones ↔ narrative scenes  
3. **Camera / scroll controller** — scroll progress → camera path; project focus overrides  
4. **Animation system** — UI entrance, focus transitions; respects `prefers-reduced-motion`  
5. **Project data configuration** — content independent of engine  
6. **UI components** — overlays, panel, nav, toggles  
7. **Assets** — procedural/low-poly original geometry & materials  
8. **SEO / metadata** — title, description, OG, favicon, sitemap, robots.txt  

**Invariant:** 3D engine consumes waypoints + project `id`/`visualKey` only — not copywriting.

### SEO

- Title: `Seydou Diakite | Full-Stack Developer`  
- Description: Full-Stack Developer specializing in modern web and mobile applications, software architecture and scalable digital solutions.  

---

## 7. Interaction design

1. Camera movement synchronized with scroll across terraces.  
2. Smooth transitions between narrative zones.  
3. Pointer parallax / hover where appropriate (desktop).  
4. Monolith hover feedback.  
5. Click → camera focus + cinematic detail panel; close returns to scroll path.  
6. Progressive reveal sequences per terrace.  
7. 3D never blocks readability; DOM text remains source of truth.  
8. Mobile: no desktop-only gestures required; simplified rendering; bottom-sheet project UI.  

---

## 8. Error handling & degradation

| Condition | Behavior |
|-----------|----------|
| No WebGL | Full 2D experience; discreet notice |
| `prefers-reduced-motion` | Static or minimal camera; no particles; CSS/GSAP reduced |
| Asset/load failure | Primitive monolith fallback |
| Missing social URLs | Hide or disable controls |
| Audio failure | Silence; hide audio toggle |
| Slow device | Lower DPR, fewer lights/particles, defer off-terrace detail |

---

## 9. Performance requirements

- Lazy-load terrace/project detail beyond near field  
- Efficient geometries; reusable materials; dispose GPU resources  
- Avoid unnecessary React re-renders into the Canvas tree  
- Adaptive pixel ratio; pause rendering when tab hidden  
- Graceful WebGL fallback  
- Usable on mobile and slower connections  

---

## 10. Accessibility

- Semantic HTML for all professional content  
- Keyboard navigation for sections, language, audio, project panel  
- Accessible buttons and focus states  
- Sufficient contrast on text/UI chrome  
- Text alternatives summarizing 3D/project visuals  
- Skip link to main content  

---

## 11. Delivery phases

1. Repository bootstrap + architecture skeleton  
2. Visual identity + responsive UI shell (no full 3D yet)  
3. 3D engine + terrace camera/scroll controller  
4. Project monoliths, focus camera, detail panel  
5. Wire all professional content + i18n  
6. Performance, a11y, SEO, audio  
7. Testing + production build  

After each phase: TypeScript clean, console clean, responsive check, interaction check, fix regressions before next phase.

---

## 12. Decisions log

| Topic | Decision |
|-------|----------|
| Language | Bilingual FR/EN; detect browser; manual toggle persisted |
| Audience | Recruiters and clients equally |
| Education / languages | Out of scope v1 |
| 3D ambition | Immersive mastered (unified world, 6 structures, readable UI, mobile simplify) |
| Project open | Camera focus + cinematic detail panel |
| Audio | Ambient + UI sounds; muted until explicit enable |
| Social URLs | Placeholders in config |
| Architecture | Continuous 3D + HTML overlay |
| World | Terraces |
| Project objects | Monoliths |
| Hero | Split left text / right 3D |

---

## 13. Non-goals

- Cloning Overpass assets or implementation  
- Fake case-study metrics or live demo URLs  
- Desktop-only portfolio  
- Autoplaying audio  
- Invented skill levels or certifications  
- Education / language scenes in v1
