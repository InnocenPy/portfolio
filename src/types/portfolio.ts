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
