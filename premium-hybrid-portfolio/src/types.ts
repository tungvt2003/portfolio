export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullDescription: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  features: string[];
  challenges?: string;
  solutions?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  points: string[];
}

export interface Education {
  id: string;
  institution: string;
  major: string;
  period: string;
  gpa: string;
}

export interface SkillItem {
  name: string;
  percentage: number;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  level: "High" | "Medium" | "Intermediate";
  iconType: "frontend" | "backend" | "devops" | "tools";
  items: SkillItem[];
}
