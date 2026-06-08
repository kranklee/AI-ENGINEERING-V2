export interface Project {
  id: string
  number: string
  title: string
  description: string
  stack: string[]
  url?: string
  highlight: string
}

export interface SkillGroup {
  category: string
  skills: string[]
}
