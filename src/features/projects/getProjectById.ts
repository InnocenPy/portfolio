import { projects } from '@/data/projects'
import type { Project } from '@/types/portfolio'

export function getProjectById(id: string): Project | undefined {
  return projects.find((project) => project.id === id)
}
