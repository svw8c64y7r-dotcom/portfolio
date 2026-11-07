import { SkillGroup } from '../types';

export const skillGroups: SkillGroup[] = [
  {
    id: 'offensive-security',
    category: 'Offensive Security',
    code: 'SEC-OFF-01',
    description: 'Vulnerability assessment, application penetration testing, reconnaissance, and exploitation methodologies.',
    skills: [
      { name: 'Web Application Penetration Testing', proficiency: 'Core Competency' },
      { name: 'Vulnerability Assessment', proficiency: 'Core Competency' },
      { name: 'OWASP Top 10', proficiency: 'Advanced' },
      { name: 'Network Reconnaissance', proficiency: 'Advanced' },
      { name: 'Security Testing', proficiency: 'Advanced' },
      { name: 'SQL Injection', proficiency: 'Advanced' },
      { name: 'Cross-Site Scripting', proficiency: 'Advanced' },
      { name: 'Authentication Testing', proficiency: 'Advanced' },
      { name: 'Burp Suite', proficiency: 'Hands-On' },
      { name: 'Nmap', proficiency: 'Hands-On' },
      { name: 'Metasploit', proficiency: 'Hands-On' },
      { name: 'Gobuster', proficiency: 'Hands-On' },
    ]
  },
  {
    id: 'defensive-security',
    category: 'Defensive Security',
    code: 'SEC-DEF-02',
    description: 'Threat monitoring, security event detection, network traffic auditing, and triage.',
    skills: [
      { name: 'Security Monitoring Fundamentals', proficiency: 'Core Competency' },
      { name: 'Network Traffic Analysis', proficiency: 'Advanced' },
      { name: 'SIEM Fundamentals', proficiency: 'Proficient' },
      { name: 'Threat Detection Fundamentals', proficiency: 'Proficient' },
      { name: 'Incident Response Fundamentals', proficiency: 'Proficient' },
      { name: 'Wireshark', proficiency: 'Hands-On' },
      { name: 'Wazuh', proficiency: 'Hands-On' },
    ]
  },
  {
    id: 'dfir',
    category: 'Digital Forensics & Incident Response',
    code: 'SEC-DFIR-03',
    description: 'Host, disk, and volatile memory investigation, artifact extraction, and timeline reconstruction.',
    skills: [
      { name: 'Memory Forensics', proficiency: 'Advanced' },
      { name: 'Disk Forensics', proficiency: 'Advanced' },
      { name: 'Digital Evidence Analysis', proficiency: 'Advanced' },
      { name: 'Windows Event Log Analysis', proficiency: 'Advanced' },
      { name: 'Volatility 3', proficiency: 'Hands-On' },
      { name: 'Autopsy', proficiency: 'Hands-On' },
      { name: 'Linux Forensics', proficiency: 'Hands-On' },
      { name: 'PCAP Analysis', proficiency: 'Hands-On' },
    ]
  },
  {
    id: 'grc',
    category: 'Governance, Risk & Compliance',
    code: 'SEC-GRC-04',
    description: 'Industry regulatory frameworks, risk mitigation policies, information governance, and standards compliance.',
    skills: [
      { name: 'ISO/IEC 27001', proficiency: 'Proficient' },
      { name: 'GDPR', proficiency: 'Proficient' },
      { name: 'CCPA', proficiency: 'Proficient' },
      { name: 'Risk Assessment', proficiency: 'Advanced' },
      { name: 'Security Policies', proficiency: 'Advanced' },
      { name: 'Compliance Fundamentals', proficiency: 'Proficient' },
      { name: 'Information Security Governance', proficiency: 'Proficient' },
    ]
  },
  {
    id: 'programming-development',
    category: 'Programming & Development',
    code: 'SEC-DEV-05',
    description: 'Secure application engineering, scripting, backend API implementation, and software architecture.',
    skills: [
      { name: 'Python', proficiency: 'Core Competency' },
      { name: 'Java', proficiency: 'Advanced' },
      { name: 'JavaScript', proficiency: 'Proficient' },
      { name: 'TypeScript', proficiency: 'Proficient' },
      { name: 'Bash', proficiency: 'Hands-On' },
      { name: 'Spring Framework', proficiency: 'Hands-On' },
      { name: 'REST APIs', proficiency: 'Advanced' },
      { name: 'Secure Coding Practices', proficiency: 'Core Competency' },
    ]
  },
  {
    id: 'automation-testing',
    category: 'Automation & Testing',
    code: 'SEC-AUTO-06',
    description: 'End-to-end browser automation, test suite scripting, and repetitive security validation tooling.',
    skills: [
      { name: 'Playwright', proficiency: 'Hands-On' },
      { name: 'Python Automation', proficiency: 'Advanced' },
      { name: 'Browser Automation', proficiency: 'Hands-On' },
      { name: 'Automated Security Testing', proficiency: 'Advanced' },
    ]
  }
];
