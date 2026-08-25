export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  resumeUrl: string;
  avatarUrl: string;
  currentCompany?: string;
  currentRole?: string;
  totalExperience?: string;
}

export interface ShowcaseStat {
  id: string;
  value: string;
  label: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  details?: string;
}

export interface PhilosophyPillar {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface AboutStatCard {
  id: string;
  label: string;
  value: string;
  sublabel: string;
}

export interface AboutSectionMeta {
  displayHeadline: string;
  trueFocusSentence: string;
  summary: string;
}

export interface SystemStatus {
  isAvailable: boolean;
  statusText: string;
  location: string;
  currentFocus: string;
  activeClientSlots: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface About {
  headline: string;
  bio: string;
  highlights: string[];
}

export interface Skill {
  name: string;
  level: number;
}

/** Single skill card in the technical matrix (cinematic site). */
export interface SkillMatrixItem {
  name: string;
  category: string;
  proficiency: number;
  highlight?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  shortTitle?: string;
  subtitle: string;
  iconName: string;
  skills: SkillMatrixItem[];
}

export interface SkillsSectionMeta {
  headline: string;
  headlineAccent: string;
  description: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  /** SYSTEM // XX index shown on cards */
  number: string;
  title: string;
  /** Category chip (e.g. Industrial Control & Real-Time Telemetry) */
  category: string;
  /** Short card blurb */
  tagline: string;
  /** Modal overview paragraph */
  overview: string;
  architecture: string[];
  keyContributions: string[];
  techStack: string[];
  metrics: ProjectMetric[];
  accentColor: string;
  constellationClusterIndex: number;
  company?: string;
  liveUrl?: string;
  githubUrl?: string;
  linkLabel?: string;
  featured: boolean;
  /** @deprecated use tagline / overview */
  description?: string;
  /** @deprecated use keyContributions */
  highlights?: string[];
  /** @deprecated use techStack */
  tags?: string[];
  /** @deprecated use liveUrl */
  url?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  highlights: string[];
  techStack: string[];
  badge?: string;
  /** @deprecated use summary */
  description?: string;
}

export interface Theme {
  primary: string;
  accent: string;
  background: string;
  surface: string;
  ink: string;
}

export interface Seo {
  title: string;
  description: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  read: boolean;
}

export interface PortfolioData {
  profile: Profile;
  social: SocialLinks;
  about: About;
  showcase: ShowcaseStat[];
  /** @deprecated use skillCategories */
  skills?: Skill[];
  skillCategories: SkillCategory[];
  skillsSection?: SkillsSectionMeta;
  aboutSection?: AboutSectionMeta;
  aboutStats?: AboutStatCard[];
  philosophyPillars?: PhilosophyPillar[];
  systemStatus?: SystemStatus;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  theme: Theme;
  seo: Seo;
}
