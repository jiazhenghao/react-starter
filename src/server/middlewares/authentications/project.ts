import data from '@/server/mock/data'
const { ROLE } = data

type User = {
  id: number
  name: string
  role: string
}

type Project = {
  id: number
  name: string
  userId: number
}

export function canViewProject(user: User, project: Project) {
  return user.role === ROLE.ADMIN || project.userId === user.id
}

export function scopedProjects(user: User, projects: Project[]) {
  if (user.role === ROLE.ADMIN) return projects
  return projects.filter(project => project.userId === user.id)
}

export function canDeleteProject(user: User, project: Project) {
  return project.userId === user.id
}
