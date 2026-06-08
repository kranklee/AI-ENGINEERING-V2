export const projects = [
  {
    id: '01',
    title: 'CyberWatch::AI',
    highlight: 'Threat classifier dashboard',
    description:
      "Built a real-time network threat detection dashboard that classifies traffic using a TensorFlow model trained on labeled packet data. Flask handles the backend inference, React renders live charts as threats come in.",
    stack: ['React', 'Flask', 'TensorFlow', 'Python'],
    url: 'https://kranklee.github.io/CyberWatch-AI',
  },
  {
    id: '02',
    title: 'Canada Rental System',
    highlight: 'Full-stack rental app',
    description:
      "A property rental platform with tenant and landlord portals. C# ASP.NET handles auth and business logic, jQuery powers the frontend interactions, and SQL Server stores everything. Done for a systems course and then kept going.",
    stack: ['C#', 'ASP.NET', 'jQuery', 'SQL Server'],
  },
  {
    id: '03',
    title: 'MQTT Solar Panel IoT',
    highlight: 'Real-time sensor dashboard',
    description:
      "Reads live voltage and temperature data from solar panel sensors over MQTT and displays it in a tkinter GUI. Built to monitor a small off-grid setup. Handles broker reconnects and logs anomalies automatically.",
    stack: ['Python', 'MQTT', 'tkinter'],
  },
  {
    id: '04',
    title: 'AI Engineering Path',
    highlight: 'This repo — in progress',
    description:
      "Documenting and building my path into AI engineering. FastAPI backend, RAG pipeline for document Q&A, and experimenting with different LLM APIs. Also powers the AI chat section of this portfolio.",
    stack: ['FastAPI', 'RAG', 'LLM APIs', 'Python'],
    url: 'https://github.com/kranklee/AI-ENGINEERING-V2',
  },
];

export const skillGroups = [
  { category: 'Frontend', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
  { category: 'Backend', skills: ['Python', 'Flask', 'FastAPI', 'Node.js', 'C#', 'ASP.NET'] },
  { category: 'AI / ML', skills: ['TensorFlow', 'scikit-learn', 'LLM APIs', 'RAG Systems'] },
  { category: 'Database', skills: ['PostgreSQL', 'MongoDB', 'Supabase', 'SQL'] },
  { category: 'Tools', skills: ['Git', 'Docker', 'Linux', 'Claude Code', 'MQTT', 'Vercel'] },
];
