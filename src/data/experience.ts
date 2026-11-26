import type { ExperienceItem } from '@/types/portfolio'

export const experience: ExperienceItem[] = [
  {
    id: 'sitan-informatique',
    organization: 'SITAN INFORMATIQUE',
    period: { en: '2024 – Present', fr: '2024 – Aujourd’hui' },
    role: {
      en: 'Web and Mobile Application Developer',
      fr: 'Développeur d’applications web et mobiles',
    },
    highlight: true,
  },
  {
    id: 'agetic',
    organization: 'AGETIC',
    period: { en: '2023', fr: '2023' },
    role: {
      en: 'Application Developer',
      fr: 'Développeur d’applications',
    },
    highlight: true,
  },
  {
    id: 'kintech',
    organization: 'KINTECH',
    period: { en: '2022 – 2023', fr: '2022 – 2023' },
    role: {
      en: 'Full-Stack Developer',
      fr: 'Développeur Full-Stack',
    },
    highlight: true,
  },
  {
    id: 'ecmbtp',
    organization: 'ECMBTP',
    period: { en: '2016 – 2018', fr: '2016 – 2018' },
    role: {
      en: 'Accounting Assistant',
      fr: 'Assistant comptable',
    },
    highlight: false,
  },
  {
    id: 'budget-de-kayes',
    organization: 'BUDGET DE KAYES',
    period: { en: '2015 – 2016', fr: '2015 – 2016' },
    role: {
      en: 'Accounting Intern',
      fr: 'Stagiaire en comptabilité',
    },
    highlight: false,
  },
]
