export type ParticleStateId = 0 | 1 | 2 | 3 | 4 | 5;

export interface ParticleStateConfig {
  id: ParticleStateId;
  name: string;
  subtitle: string;
  themeColor: string; // Hex for UI badge
  cameraZ: number;
  cameraY: number;
  rotationSpeed: number;
  particleSize: number;
  description: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  tagline: string;
  overview: string;
  architecture: string[];
  keyContributions: string[];
  techStack: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
  constellationClusterIndex: number;
  githubUrl?: string;
  liveUrl?: string;
  isFeatured?: boolean;
}

export interface SkillItem {
  name: string;
  category: string;
  proficiency: number; // 0-100
  highlight?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  summary: string;
  highlights: string[];
  techStack: string[];
  badge?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  details?: string;
}

export interface CertificateItem {
  title: string;
  issuer: string;
  year: string;
  url?: string;
}

export interface SystemStatus {
  isAvailable: boolean;
  statusText: string;
  location: string;
  currentFocus: string;
  activeClientSlots: string;
}
