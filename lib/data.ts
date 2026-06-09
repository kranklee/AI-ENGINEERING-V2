import type { Project, FocusCard, JourneyNode, Repo } from './types'

export const projects: Project[] = [
  {
    id: '01',
    title: 'CyberWatch::AI',
    hook: 'Real-time threat classification for teams without a SOC.',
    problem: 'Small security teams had no lightweight tool to classify network threats live — everything was enterprise-grade and overkill.',
    solution: 'React dashboard pulling from a Flask API that runs a TensorFlow model on incoming traffic. Classification happens in real time, not on a batch schedule.',
    stack: ['React', 'Flask', 'TensorFlow', 'Python'],
    outcome: 'Deployed and live at kranklee.github.io/CyberWatch-AI. Actual classification, not a mock.',
    url: 'https://kranklee.github.io/CyberWatch-AI',
  },
  {
    id: '02',
    title: 'Canada Rental System',
    hook: 'Full rental management platform, built from scratch.',
    problem: 'Group project needed a working rental platform — property listings, tenant auth, full CRUD — not a mockup.',
    solution: 'C# ASP.NET backend with jQuery on the front, SQL Server underneath. Found and resolved some genuine edge cases in ASP.NET routing along the way.',
    stack: ['C#', 'ASP.NET', 'jQuery', 'SQL Server'],
    outcome: 'Working platform. Learned more about ASP.NET routing than the course intended.',
  },
  {
    id: '03',
    title: 'MQTT Solar Panel IoT',
    hook: 'Sensor data streaming without freezing the UI.',
    problem: 'Reading continuous sensor data over MQTT in Python while keeping a GUI responsive — naive approaches block the main thread and the interface dies.',
    solution: 'Multithreaded Python app separating the MQTT subscriber from the tkinter event loop. Data flows continuously, UI stays alive.',
    stack: ['Python', 'MQTT', 'tkinter', 'threading'],
    outcome: 'Live dashboard that stays responsive under continuous data streams.',
  },
  {
    id: '04',
    title: 'AI Engineering Path',
    hook: 'Structured path from Python basics to production AI systems.',
    problem: 'No clear, honest progression from writing Python scripts to shipping production AI pipelines. Most guides skip the hard middle parts.',
    solution: 'Progressive build: Python fundamentals, FastAPI for APIs, RAG for retrieval, then LLM API integration. Each step ships something real.',
    stack: ['Python', 'FastAPI', 'RAG', 'Anthropic API'],
    outcome: 'In progress. Building toward production-grade AI pipelines.',
    url: 'https://github.com/kranklee/AI-ENGINEERING-V2',
  },
]

export const focusCards: FocusCard[] = [
  { icon: 'terminal', name: 'Linux', description: 'System administration, shell scripting, process management.', intensity: 90 },
  { icon: 'box', name: 'Docker', description: 'Containerization, compose, multi-service architecture.', intensity: 80 },
  { icon: 'database', name: 'PostgreSQL', description: 'Relational design, indexing, query optimization.', intensity: 78 },
  { icon: 'zap', name: 'FastAPI', description: 'Async Python APIs, OpenAPI docs, dependency injection.', intensity: 70 },
  { icon: 'cpu', name: 'LLM APIs', description: 'Anthropic, RAG systems, AI-assisted engineering workflows.', intensity: 68 },
  { icon: 'globe', name: 'German', description: 'Working toward B2. Daily practice.', intensity: 45 },
]

export const journeyNodes: JourneyNode[] = [
  {
    emoji: '🇹🇷',
    label: 'Istanbul, Turkey',
    lines: ['Where it started.'],
  },
  {
    emoji: '🇨🇦',
    label: 'Ontario, Canada',
    lines: [
      'Centennial College — Software Engineering Technology',
      'Data Analyst @ Rogers · CATSA · A&W · Walmart',
    ],
  },
  {
    emoji: '💻',
    label: 'The Build',
    lines: [
      'Backend systems. APIs. Databases. Linux. Docker.',
      'Learning how things actually work, not just how they look.',
    ],
  },
  {
    emoji: '🤖',
    label: 'AI Layer',
    lines: [
      'LLM APIs. RAG systems. AI-assisted engineering.',
      'Claude Code. FastAPI. Production pipelines.',
    ],
  },
  {
    emoji: '🇩🇪',
    label: 'Cologne, Germany',
    lines: ['The destination. Backend Developer role.', 'In progress.'],
  },
]

export const githubStats = {
  repos: 12,
  commits: 847,
  languages: 8,
  stars: 23,
}

export const recentRepos: Repo[] = [
  {
    name: 'ai-engineering-v2',
    description: 'AI engineering learning path — Python to production pipelines',
    language: 'Python',
    stars: 2,
    updatedAt: '2 days ago',
  },
  {
    name: 'CyberWatch-AI',
    description: 'Cybersecurity threat classifier dashboard',
    language: 'TypeScript',
    stars: 5,
    updatedAt: '1 week ago',
  },
  {
    name: 'canada-rental-system',
    description: 'Full-stack rental management platform',
    language: 'C#',
    stars: 1,
    updatedAt: '3 weeks ago',
  },
]

// 365 mock contribution values (0-4)
function generateContributions(): number[] {
  const data: number[] = []
  for (let i = 0; i < 365; i++) {
    const r = Math.random()
    if (r < 0.35) data.push(0)
    else if (r < 0.55) data.push(1)
    else if (r < 0.75) data.push(2)
    else if (r < 0.90) data.push(3)
    else data.push(4)
  }
  return data
}

export const contributions = generateContributions()

export const terminalCommands = [
  {
    cmd: 'whoami',
    output: ['Cem Besli / Software Engineering Technology Student'],
  },
  {
    cmd: 'cat current_focus.txt',
    output: [
      'Backend Engineering',
      'Docker & containerization',
      'PostgreSQL & database design',
      'Linux system administration',
      'API architecture',
      'AI-assisted development workflows',
    ],
  },
  {
    cmd: 'echo $LOCATION',
    output: ['Ontario, Canada → Cologne, Germany'],
  },
  {
    cmd: 'cat next_goal.txt',
    output: [
      'Backend Developer role in Germany',
      'Target: 2025-2026',
      'Status: actively building',
    ],
  },
  {
    cmd: 'ls projects/',
    output: ['CyberWatch-AI/  canada-rental-system/  mqtt-solar-iot/  ai-engineering/'],
  },
  {
    cmd: 'git log --oneline -3',
    output: [
      'a3f9c2b feat: RAG pipeline integration',
      '7d1e8a1 fix: PostgreSQL connection pooling',
      '2c4b903 add: Docker compose for dev environment',
    ],
  },
]
