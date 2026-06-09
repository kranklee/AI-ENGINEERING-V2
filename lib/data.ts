export interface Project {
  id: number;
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  stack: string[];
  outcome: string;
  url: string;
  color: string;
}

export interface FocusCard {
  label: string;
  icon: string;
  level: number; // 0-100
  description: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Linux Server Automation',
    tagline: 'Ansible-driven provisioning pipeline',
    problem: 'Manually spinning up VMs wasted hours and introduced config drift across environments.',
    solution: 'Built an Ansible playbook suite that provisions a fresh Ubuntu server — users, SSH hardening, Nginx, SSL, firewall rules — in under 3 minutes.',
    stack: ['Ansible', 'Bash', 'Nginx', 'UFW', 'Let\'s Encrypt'],
    outcome: 'Provisioning time cut from ~45 min to 3 min. Zero drift between staging and production.',
    url: 'https://github.com/kranklee',
    color: '#6366f1',
  },
  {
    id: 2,
    title: 'FastAPI Microservice',
    tagline: 'High-throughput REST + async workers',
    problem: 'A monolith was bottlenecking on CPU-bound image processing tasks mixed with I/O.',
    solution: 'Extracted processing into a FastAPI service with background task queues (Celery + Redis), PostgreSQL for job state, Docker Compose for local dev.',
    stack: ['FastAPI', 'PostgreSQL', 'Celery', 'Redis', 'Docker'],
    outcome: 'p95 latency dropped 60%. Service handles 800 req/s on a single 2-core VM.',
    url: 'https://github.com/kranklee',
    color: '#8b5cf6',
  },
  {
    id: 3,
    title: 'Containerized Dev Platform',
    tagline: 'Docker Compose full-stack environment',
    problem: '"Works on my machine" problems across a 4-person team killed velocity.',
    solution: 'Designed a Docker Compose stack with hot-reload for frontend, backend, Postgres, and Redis. Pre-built health checks and migration scripts ran on container start.',
    stack: ['Docker', 'Docker Compose', 'PostgreSQL', 'Redis', 'Make'],
    outcome: 'Onboarding time went from a half-day to 12 minutes. Zero "works on my machine" since.',
    url: 'https://github.com/kranklee',
    color: '#06b6d4',
  },
  {
    id: 4,
    title: 'LLM Integrations SDK',
    tagline: 'Unified wrapper for multiple AI providers',
    problem: 'Switching between OpenAI, Anthropic, and local models required constant API-specific glue code.',
    solution: 'Built a Python SDK with a uniform interface, retry/backoff, streaming support, and a cost-estimator. Config-driven provider switching with zero code changes.',
    stack: ['Python', 'Anthropic', 'OpenAI', 'LiteLLM', 'Pydantic'],
    outcome: 'Cut AI integration time from days to hours. Adopted by 2 other projects in the cohort.',
    url: 'https://github.com/kranklee',
    color: '#f59e0b',
  },
];

export const focusCards: FocusCard[] = [
  { label: 'Linux', icon: '🐧', level: 95, description: 'Server admin, bash scripting, systemd, cron, networking' },
  { label: 'Docker', icon: '🐳', level: 80, description: 'Containers, Compose, multi-stage builds, health checks' },
  { label: 'PostgreSQL', icon: '🐘', level: 75, description: 'Schema design, indexing, query optimization, migrations' },
  { label: 'FastAPI', icon: '⚡', level: 70, description: 'REST APIs, async workers, dependency injection, OpenAPI' },
  { label: 'LLM APIs', icon: '🤖', level: 65, description: 'Anthropic, OpenAI, streaming, prompt engineering, RAG' },
  { label: 'German', icon: '🇩🇪', level: 40, description: 'Actively learning — relocated to Cologne for studies' },
];
