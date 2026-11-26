import type { SceneId } from '@/types/portfolio'

export const portfolioConfig = {
  siteUrl: 'https://portfolio.local',
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
