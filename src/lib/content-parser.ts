import { readFileSync } from 'fs';
import { resolve } from 'path';
import { parse as parseYaml } from 'yaml';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ContactInfo {
  email: string;
  telegram: string;
  linkedin: string;
  github: string;
}

export interface Info {
  name: string;
  role: string;
  tagline: string;
  photo: string;
  location: string;
  contacts: ContactInfo;
}

export interface About {
  short: string;
  full: string;
}

export interface ExperienceItem {
  period: string;
  company: string;
  position: string;
  description: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
  year: string;
  link: string;
}

export interface CaseItem {
  title: string;
  client: string;
  problem: string;
  actions: string;
  result: string;
  metrics: string[];
}

export interface SkillItem {
  name: string;
  level: string;
}

export interface Skills {
  hard: SkillItem[];
  soft: string[];
}

// ─── Parser ───────────────────────────────────────────────────────────────────

function loadSections(): Record<string, unknown>[] {
  const filePath = resolve(process.cwd(), 'content.md');
  const raw = readFileSync(filePath, 'utf-8');

  // Split on lines containing only "---"
  const chunks = raw.split(/\n---\n/);

  return chunks.map((chunk) => {
    // Remove the first line if it's a markdown heading
    const lines = chunk.trim().split('\n');
    const startIndex = lines[0].startsWith('#') ? 1 : 0;
    const yamlText = lines.slice(startIndex).join('\n').trim();
    return (parseYaml(yamlText) as Record<string, unknown>) ?? {};
  });
}

let _sections: Record<string, unknown>[] | null = null;

function getSections(): Record<string, unknown>[] {
  if (!_sections) _sections = loadSections();
  return _sections;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function getInfo(): Info {
  const sections = getSections();
  // Section 0 — flat fields (name, role, tagline, …)
  return sections[0] as unknown as Info;
}

export function getAbout(): About {
  const sections = getSections();
  const data = sections[1] as { about: About };
  return data.about;
}

export function getExperience(): ExperienceItem[] {
  const sections = getSections();
  const data = sections[2] as { experience: ExperienceItem[] };
  return data.experience;
}

export function getProjects(): ProjectItem[] {
  const sections = getSections();
  const data = sections[3] as { projects: ProjectItem[] };
  return data.projects;
}

export function getCases(): CaseItem[] {
  const sections = getSections();
  const data = sections[4] as { cases: CaseItem[] };
  return data.cases;
}

export function getSkills(): Skills {
  const sections = getSections();
  const data = sections[5] as { skills: Skills };
  return data.skills;
}
