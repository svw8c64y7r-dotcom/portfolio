import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'web-vulnerability-scanner',
    title: 'Advanced Web Vulnerability Scanner',
    category: 'Offensive Security / Tooling',
    tag: 'Python Security Automation',
    year: '2026',
    description: 'Developed a Python-based web vulnerability scanner featuring a configurable, depth-limited crawler and automated security testing suite.',
    technologies: ['Python', 'Requests', 'HTML Parsing', 'Urllib', 'Regex', 'Argparse'],
    problemStatement: 'Manual discovery of endpoint injection points and web application weaknesses is time-consuming during preliminary reconnaissance and security assessments.',
    implementationDetails: [
      'Automated URL discovery with breadth/depth-controlled recursive crawler',
      'Configurable crawl depth limits and domain-scoping safety controls',
      'SQL Injection detection modules targeting parameter input reflection and error signatures',
      'Reflected Cross-Site Scripting (XSS) payload delivery and DOM context detection',
      'Open Redirect testing with HTTP status and header location analysis',
      'Directory Traversal and local file inclusion pattern testing',
      'Comprehensive HTTP request and response header auditing',
      'Structured terminal and file-based vulnerability summary reporting'
    ],
    resultsOrStatus: 'Functional security automation tool for rapid URL surface mapping and common vulnerability detection during security testing assessments.',
    githubUrl: 'https://github.com/svw8c64y7r-dotcom',
    isLabWork: false,
    highlights: [
      'Automated URL Discovery',
      'SQLi & XSS Detection',
      'Open Redirect Testing',
      'Directory Traversal Testing',
      'Structured Vulnerability Reports'
    ]
  },
  {
    id: 'epoteck-fullstack',
    title: 'Epoteck Full-Stack Website',
    category: 'Software Engineering / Application Security',
    tag: 'Full-Stack Architecture',
    year: '2026',
    description: 'Designed and developed an enterprise full-stack web application using the Spring Framework, following secure software development principles.',
    technologies: ['Java', 'Spring Framework', 'REST APIs', 'Spring Security', 'JPA/Hibernate', 'SQL'],
    problemStatement: 'Modern web platforms require resilient backend services, robust authorization models, and secure data handling to prevent unauthorized data access.',
    implementationDetails: [
      'Designed and deployed clean, decoupled RESTful API endpoints',
      'Role-based access control (RBAC) and authentication workflows',
      'Secure input validation and defense against injection vulnerabilities',
      'Relational database modeling with JPA/Hibernate transactional integrity',
      'Structured exception handling and security auditing middleware'
    ],
    resultsOrStatus: 'Robust full-stack architecture implementing end-to-end security patterns and maintainable Spring services.',
    githubUrl: 'https://github.com/svw8c64y7r-dotcom',
    isLabWork: false,
    highlights: [
      'RESTful API Implementation',
      'Authentication & Authorization',
      'Database Operations',
      'Secure Coding Practices'
    ]
  },
  {
    id: 'owasp-top-10-assessment',
    title: 'OWASP Top 10 Web Application Security Assessment',
    category: 'Web Application Security / VAPT',
    tag: 'Practical VAPT Exercise',
    year: '2025 – 2026',
    description: 'Practical security assessment methodology and vulnerability verification against standard web application security flaw classifications.',
    technologies: ['Burp Suite', 'Nmap', 'Dirb / Gobuster', 'Browser DevTools', 'OWASP Testing Guide'],
    problemStatement: 'Validating security posture of web application components against the OWASP Top 10 framework to discover business logic and input handling flaws before deployment.',
    implementationDetails: [
      'Execution of black-box and grey-box security testing methodologies',
      'Evaluation against OWASP Top 10 attack vectors (Injection, Broken Auth, Security Misconfiguration, etc.)',
      'Manual parameter manipulation and authorization boundary bypass verification',
      'Vulnerability identification, technical Proof-of-Concept (PoC) preparation',
      'CVSS 3.1 severity scoring and contextual risk classification',
      'Actionable remediation guidelines and developer mitigation handoff'
    ],
    resultsOrStatus: 'Conducted as practical security testing exercises. Full assessment deliverables and verified findings are documented following standard VAPT reporting structures.',
    isLabWork: true,
    highlights: [
      'OWASP Top 10 Methodology',
      'CVSS Risk Scoring',
      'Technical Proof-of-Concepts',
      'Remediation Recommendations',
      'Security Assessment Documentation'
    ]
  },
  {
    id: 'digital-forensics-lab',
    title: 'Digital Forensics Investigation Lab',
    category: 'Digital Forensics / DFIR',
    tag: 'DFIR Practical Laboratory',
    year: '2025',
    description: 'Practical forensic investigations analyzing digital artifacts across host memory dumps, filesystem images, and network communication traces.',
    technologies: ['Volatility 3', 'Autopsy', 'Wireshark', 'FTK Imager', 'FTK / Sleuth Kit', 'Strings & Hashes'],
    problemStatement: 'Investigating simulated security breaches, malware persistence techniques, and data exfiltration scenarios through rigorous digital evidence recovery.',
    implementationDetails: [
      'Volatile memory forensics: extracting running processes, dll lists, network sockets, and command history using Volatility 3',
      'Disk image triage and filesystem analysis with Autopsy to reconstruct deleted files and user activity timelines',
      'Windows Event Log (.evtx) parsing to identify logon events (4624/4625), process creation (4688/Sysmon 1), and privilege escalation',
      'Network capture (PCAP) inspection in Wireshark to track protocol anomalies, unencrypted credentials, and lateral movement',
      'Chain-of-custody maintenance and evidence integrity hashing'
    ],
    resultsOrStatus: 'Practical forensic laboratory exercises demonstrating investigative rigor and evidence analysis under forensic standards.',
    isLabWork: true,
    highlights: [
      'Memory Forensics (Volatility 3)',
      'Disk Image Analysis (Autopsy)',
      'Windows Event Log Parsing',
      'Network PCAP Traffic Analysis',
      'Digital Evidence Integrity'
    ]
  },
  {
    id: 'security-monitoring-soc-lab',
    title: 'Security Monitoring & Threat Detection Lab',
    category: 'Blue Team / SOC',
    tag: 'SOC Practical Laboratory',
    year: '2025',
    description: 'Practical defensive operations focused on endpoint log aggregation, alert correlation, baseline anomaly detection, and incident response triage.',
    technologies: ['Wazuh SIEM / XDR', 'Wireshark', 'Sysmon', 'Linux Auditd', 'Logstash / OpenSearch'],
    problemStatement: 'Detecting stealthy intruder activity, suspicious authentication spikes, and unauthorized configuration modifications across hybrid endpoints.',
    implementationDetails: [
      'Telemetry ingestion and agent configuration across Windows and Linux testbeds',
      'Security event monitoring, baseline log analysis, and noise filtering',
      'Threat identification mapping detected attacker behavior to MITRE ATT&CK techniques',
      'Network packet investigation for command-and-control beaconing signatures',
      'Simulated incident response triage and containment procedural walk-throughs'
    ],
    resultsOrStatus: 'Practical defensive exercises exploring SIEM event correlation and threat detection rules using verified laboratory tools.',
    isLabWork: true,
    highlights: [
      'Wazuh SIEM Deployment',
      'Log Correlation & Threat Alerting',
      'Network Traffic Investigation',
      'MITRE ATT&CK Mapping',
      'Incident Triage Workflow'
    ]
  }
];
