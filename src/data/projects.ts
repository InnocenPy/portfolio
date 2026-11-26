import type { Project } from '@/types/portfolio'

export const projects: Project[] = [
  {
    id: 'flex-audit',
    visualKey: 'finance',
    name: 'FLEX-AUDIT',
    category: {
      en: 'Enterprise / Accounting',
      fr: 'Entreprise / Comptabilité',
    },
    shortDescription: {
      en: 'An enterprise application for accounting and financial audits.',
      fr: 'Une application d’entreprise dédiée à la comptabilité et aux audits financiers.',
    },
    longDescription: {
      en: 'A full-stack platform designed to support accounting and financial audit workflows.',
      fr: 'Une plateforme full-stack conçue pour accompagner les processus de comptabilité et d’audit financier.',
    },
    technologies: ['Angular', 'NestJS', 'TypeScript', 'PostgreSQL'],
  },
  {
    id: 'base-oise',
    visualKey: 'map',
    name: 'BASE-OISE',
    category: {
      en: 'Government / Public Admin',
      fr: 'Gouvernement / Administration publique',
    },
    shortDescription: {
      en: 'A public administration application for territorial structures.',
      fr: 'Une application d’administration publique consacrée aux structures territoriales.',
    },
    longDescription: {
      en: 'A government-focused platform for organizing and managing territorial structure data.',
      fr: 'Une plateforme destinée au secteur public pour organiser et gérer les données des structures territoriales.',
    },
    technologies: [],
  },
  {
    id: 'gtp',
    visualKey: 'time',
    name: 'GTP',
    category: {
      en: 'Business / Time Tracking',
      fr: 'Entreprise / Suivi du temps',
    },
    shortDescription: {
      en: 'A business application for time tracking.',
      fr: 'Une application professionnelle de suivi du temps.',
    },
    longDescription: {
      en: 'A business platform designed to organize and monitor time-tracking activities.',
      fr: 'Une plateforme professionnelle conçue pour organiser et suivre les activités de gestion du temps.',
    },
    technologies: [],
  },
  {
    id: 'diakite-service',
    visualKey: 'architecture',
    name: 'DIAKITE SERVICE',
    category: {
      en: 'Real Estate',
      fr: 'Immobilier',
    },
    shortDescription: {
      en: 'A web application for real estate services.',
      fr: 'Une application web dédiée aux services immobiliers.',
    },
    longDescription: {
      en: 'A full-stack platform designed to present and manage real estate services.',
      fr: 'Une plateforme full-stack conçue pour présenter et gérer des services immobiliers.',
    },
    technologies: ['Angular', 'Spring Boot'],
  },
  {
    id: 'diak-shop',
    visualKey: 'shop',
    name: 'DIAK-SHOP',
    category: {
      en: 'E-commerce',
      fr: 'Commerce électronique',
    },
    shortDescription: {
      en: 'A digital shopping application.',
      fr: 'Une application d’achat en ligne.',
    },
    longDescription: {
      en: 'An e-commerce platform designed to deliver a clear digital shopping experience.',
      fr: 'Une plateforme de commerce électronique conçue pour offrir une expérience d’achat en ligne claire.',
    },
    technologies: ['JavaScript', 'Node.js'],
  },
  {
    id: 'beka-bara',
    visualKey: 'network',
    name: 'BEKA-BARA',
    category: {
      en: 'Mobile / Marketplace',
      fr: 'Mobile / Place de marché',
    },
    shortDescription: {
      en: 'A mobile marketplace connecting users with service providers.',
      fr: 'Une place de marché mobile mettant en relation les utilisateurs et les prestataires de services.',
    },
    longDescription: {
      en: 'A geolocation-enabled mobile marketplace designed to connect users with nearby service providers.',
      fr: 'Une place de marché mobile avec géolocalisation conçue pour mettre en relation les utilisateurs et les prestataires de services à proximité.',
    },
    technologies: ['React Native', 'NestJS', 'PostgreSQL', 'PostGIS'],
  },
]
