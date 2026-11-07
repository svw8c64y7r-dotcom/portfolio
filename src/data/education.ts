import { Education } from '../types';

export const educationData: Education[] = [
  {
    degree: 'M.Sc. Information Security & Digital Forensics',
    institution: 'Karunya Institute of Technology and Science',
    duration: '2025 – 2027',
    cgpa: '8.3 / 10',
    status: 'Pursuing',
    level: 'Postgraduate',
    highlights: [
      'Advanced Digital Forensics & Volatile Memory Analysis',
      'Advanced Web Application Security & Penetration Testing',
      'Information Security Governance, Risk Management & Compliance (GRC)',
      'Threat Hunting, SIEM Engineering & Incident Response Architectures',
      'Cryptography & Secure Network Protocols'
    ]
  },
  {
    degree: 'B.Sc. Information Security & Digital Forensics',
    institution: 'Karunya Institute of Technology and Science',
    duration: '2022 – 2025',
    cgpa: '6.0 / 10',
    status: 'Completed',
    level: 'Undergraduate',
    highlights: [
      'Foundational Network Security & Protocols (TCP/IP, OSI)',
      'Operating Systems Internals & Linux/Windows Forensics',
      'Vulnerability Assessment Methodologies & Ethical Hacking',
      'Computer Crime Investigation & Chain of Custody',
      'Software Development & Object-Oriented Programming (Java, Python)'
    ]
  }
];
