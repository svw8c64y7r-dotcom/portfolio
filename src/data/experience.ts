import { Experience } from '../types';

export const experienceData: Experience[] = [
  {
    position: 'Cyber Security Engineer',
    company: 'Pitowings',
    location: 'India',
    duration: 'February 2025 – May 2025',
    badge: 'Industry Security Experience',
    responsibilities: [
      'Performed manual testing and Vulnerability Assessment and Penetration Testing (VAPT) on web applications.',
      'Used Burp Suite, Nmap, and Dirb to identify OWASP Top 10 vulnerabilities and critical business logic flaws.',
      'Prepared comprehensive security assessment reports documenting technical findings with structured risk ratings.',
      'Documented reproducible Proof of Concepts (PoCs) alongside prioritized, developer-friendly remediation recommendations.',
      'Communicated security findings directly to engineering and development teams to ensure timely vulnerability mitigation.'
    ],
    toolsUsed: ['Burp Suite', 'Nmap', 'Dirb', 'OWASP Top 10', 'VAPT Methodology', 'Risk Rating & CVSS']
  }
];
