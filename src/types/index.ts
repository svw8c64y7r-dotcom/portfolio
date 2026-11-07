export interface PersonalInfo {
  name: string;
  headline: string;
  subtitle: string;
  roles: string[];
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  status: string;
  clearanceNotice?: string;
  summary: string;
}

export type SkillCategory = 
  | 'Offensive Security'
  | 'Defensive Security'
  | 'Digital Forensics & Incident Response'
  | 'Governance, Risk & Compliance'
  | 'Programming & Development'
  | 'Automation & Testing';

export interface SkillItem {
  name: string;
  proficiency?: 'Core Competency' | 'Advanced' | 'Proficient' | 'Hands-On' | 'Fundamental';
  iconName?: string;
  description?: string;
}

export interface SkillGroup {
  id: string;
  category: SkillCategory;
  code: string;
  description: string;
  skills: SkillItem[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  tag: string;
  year?: string;
  description: string;
  technologies: string[];
  problemStatement: string;
  implementationDetails: string[];
  resultsOrStatus: string;
  isLabWork?: boolean;
  githubUrl?: string;
  highlights: string[];
}

export interface Experience {
  position: string;
  company: string;
  location: string;
  duration: string;
  badge?: string;
  responsibilities: string[];
  toolsUsed: string[];
}

export interface Achievement {
  id: string;
  title: string;
  issuerOrHost: string;
  category: 'CTF' | 'National CTF' | 'Education' | 'Professional';
  rankBadge: string;
  description: string;
  platformsOrTopics?: string[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  status: 'Completed' | 'In Progress / Training' | 'Verified';
  badgeType: 'Security' | 'Network' | 'Hardware' | 'Programming' | 'Development';
  verificationAvailable: boolean;
  verificationNote: string;
}

export interface Education {
  degree: string;
  institution: string;
  duration: string;
  cgpa: string;
  status: 'Pursuing' | 'Completed';
  level: 'Postgraduate' | 'Undergraduate';
  highlights: string[];
}

export interface ResearchArticle {
  id: string;
  title: string;
  category: string;
  status: 'Upcoming' | 'In Progress' | 'Planned';
  datePlaceholder: string;
  summary: string;
  methodologyOverview: string;
  tools: string[];
  intendedFindings: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}
