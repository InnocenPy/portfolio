import type { SkillCategory } from '@/types/portfolio'

export const skills: SkillCategory[] = [
  {
    id: 'frontend',
    label: { en: 'Frontend', fr: 'Frontend' },
    items: ['Angular', 'React', 'HTML5', 'CSS3', 'JavaScript', 'TypeScript'],
  },
  {
    id: 'backend',
    label: { en: 'Backend', fr: 'Backend' },
    items: ['Node.js', 'NestJS', 'Java', 'Spring Boot'],
  },
  {
    id: 'mobile',
    label: { en: 'Mobile', fr: 'Mobile' },
    items: ['React Native', 'Flutter'],
  },
  {
    id: 'database',
    label: { en: 'Database', fr: 'Base de données' },
    items: ['PostgreSQL', 'MySQL'],
  },
  {
    id: 'devops',
    label: { en: 'DevOps', fr: 'DevOps' },
    items: ['Docker'],
  },
  {
    id: 'software-engineering',
    label: {
      en: 'Software Engineering',
      fr: 'Génie logiciel',
    },
    items: [
      'Clean Architecture',
      'REST API',
      'JWT Authentication',
      'Database Design',
      'Full-Stack Development',
    ],
  },
]
