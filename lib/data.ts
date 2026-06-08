import { Project, SkillGroup } from './types'

export const projects: Project[] = [
  {
    id: 'cyberwatch',
    number: '01',
    title: 'CyberWatch::AI',
    description:
      'Real-time cybersecurity threat classification dashboard. ML model on Flask classifies network traffic as it comes in — not a demo, actual live classification.',
    stack: ['React', 'Flask', 'TensorFlow', 'Python'],
    url: 'https://kranklee.github.io/CyberWatch-AI',
  },
  {
    id: 'rental',
    number: '02',
    title: 'Canada Rental System',
    description:
      'Full-stack rental management platform built with a group. Property listings, tenant applications, auth, full CRUD. Got into some interesting ASP.NET routing edge cases.',
    stack: ['C#', 'ASP.NET', 'jQuery', 'SQL Server'],
  },
  {
    id: 'mqtt-solar',
    number: '03',
    title: 'MQTT Solar Panel IoT',
    description:
      'Sensor monitoring for solar panels. Data streams over MQTT, visualized in a tkinter GUI. Multithreaded so the UI stays responsive while reading sensor data.',
    stack: ['Python', 'MQTT', 'tkinter'],
  },
  {
    id: 'ai-engineering',
    number: '04',
    title: 'AI Engineering Path',
    description:
      'This repo. Working through FastAPI, RAG pipelines, and LLM API integrations. Python foundations first, then APIs, then vector databases.',
    stack: ['Python', 'FastAPI', 'RAG', 'Anthropic API'],
    url: 'https://github.com/kranklee/AI-ENGINEERING-V2',
  },
]

export const skillGroups: SkillGroup[] = [
  { category: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', skills: ['Python', 'Flask', 'FastAPI', 'Node.js', 'C#', 'ASP.NET'] },
  { category: 'AI / ML', skills: ['TensorFlow', 'scikit-learn', 'LLM APIs', 'RAG Systems'] },
  { category: 'Database', skills: ['PostgreSQL', 'MongoDB', 'Supabase', 'SQL'] },
  { category: 'Tools', skills: ['Git', 'Docker', 'Linux', 'Claude Code', 'MQTT', 'Vercel'] },
]
