import { ResearchArticle } from '../types';

export const researchArticles: ResearchArticle[] = [
  {
    id: 'research-owasp-broken-auth',
    title: 'Dissecting Modern Authentication Vulnerabilities: From JWT Misconfiguration to IDOR',
    category: 'Web Application Security',
    status: 'Upcoming',
    datePlaceholder: 'Target Publication: Q2 2026',
    summary: 'An in-depth technical analysis exploring subtle token verification bypasses, algorithm confusion, and horizontal privilege escalation in cloud-native microservices.',
    methodologyOverview: 'Black-box fuzzing, cryptographic state validation, and proxy-based traffic manipulation with Burp Suite and custom Python scripts.',
    tools: ['Burp Suite Professional', 'Python', 'JWT Tools', 'Postman'],
    intendedFindings: 'Root cause analysis of improper signature checks and practical defensive guidance for development teams.'
  },
  {
    id: 'research-memory-forensics',
    title: 'Volatile Memory Investigation: Detecting Process Hollowing and C2 Injections in RAM',
    category: 'Digital Forensics & Incident Response',
    status: 'Upcoming',
    datePlaceholder: 'Target Publication: Q3 2026',
    summary: 'Forensic breakdown of in-memory code injection techniques using Volatility 3 plugins, VAD analysis, and Yara pattern matching across contemporary Windows kernel revisions.',
    methodologyOverview: 'Controlled execution of injection PoCs in isolated VM sandbox followed by acquisition via DumpIt and artifact triage via Volatility 3.',
    tools: ['Volatility 3', 'Yara', 'FTK Imager', 'Sysinternals Suite'],
    intendedFindings: 'Signature-less memory anomaly identification strategies and automated triaging heuristics for SOC analysts.'
  },
  {
    id: 'research-soc-automation',
    title: 'Automating Threat Triage: Integrating Wazuh SIEM Alerts with Custom Python Heuristics',
    category: 'Security Automation & SOC',
    status: 'Upcoming',
    datePlaceholder: 'Target Publication: Q4 2026',
    summary: 'Designing low-latency webhook ingestion pipelines to enrich raw endpoint alerts with contextual reputation lookups and alert deduplication.',
    methodologyOverview: 'Building an event subscriber daemon with Python and REST APIs to process Wazuh security events and calculate dynamic risk coefficients.',
    tools: ['Wazuh', 'Python 3', 'REST APIs', 'Wireshark', 'Linux Auditd'],
    intendedFindings: 'Reduction of alert fatigue and quantifiable improvement in mean time to detect (MTTD) for tier-1 SOC operators.'
  },
  {
    id: 'research-ctf-cryptanalysis',
    title: 'CTF Cryptanalysis Archive: Exploiting Weak Primes and Implementation Pitfalls in RSA',
    category: 'CTF Write-Ups & Cryptography',
    status: 'Upcoming',
    datePlaceholder: 'Target Publication: Ongoing Archive',
    summary: 'A structured compendium of CTF challenge breakdowns focusing on non-standard RSA attacks, Coppersmith theorem applications, and discrete logarithm weaknesses.',
    methodologyOverview: 'Mathematical modeling in SageMath / Python alongside challenge target validation.',
    tools: ['Python', 'SageMath', 'CyberChef', 'Pwntools'],
    intendedFindings: 'Step-by-step mathematical derivation and reproducible exploitation scripts for security competition learners.'
  }
];

export const researchCategories = [
  'All Categories',
  'Web Application Security',
  'Digital Forensics & Incident Response',
  'Security Automation & SOC',
  'CTF Write-Ups & Cryptography',
  'Network Security',
  'Vulnerability Research'
];
