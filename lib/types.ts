export interface Project {
  id: string
  title: string
  hook: string
  problem: string
  solution: string
  stack: string[]
  outcome: string
  url?: string
}

export interface FocusCard {
  icon: string
  name: string
  description: string
  intensity: number // 0-100
}

export interface JourneyNode {
  emoji: string
  label: string
  lines: string[]
}

export interface Repo {
  name: string
  description: string
  language: string
  stars: number
  updatedAt: string
}
