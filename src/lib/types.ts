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

export interface Project {
  id: string;
  title: string;
  company?: string;
  description: string;
  highlights?: string[];
  tags: string[];
  url: string;
  linkLabel?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
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

export interface PortfolioData {
  profile: Profile;
  social: SocialLinks;
  about: About;
  showcase: ShowcaseStat[];
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  theme: Theme;
  seo: Seo;
}
