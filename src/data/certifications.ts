import { Certification } from '../types';

export const certificationsData: Certification[] = [
  {
    id: 'secops-sedp',
    title: 'Certified Social Engineering Defense Practitioner',
    issuer: 'SecOps Group',
    status: 'Completed',
    badgeType: 'Security',
    verificationAvailable: false,
    verificationNote: 'Certificate document and verification credentials can be attached here.'
  },
  {
    id: 'comptia-network-plus',
    title: 'CompTIA Network+ (N+)',
    issuer: 'CompTIA',
    status: 'In Progress / Training',
    badgeType: 'Network',
    verificationAvailable: false,
    verificationNote: 'Core networking domain knowledge: OSI, TCP/IP, network routing, switching, and security architectures.'
  },
  {
    id: 'comptia-a-plus',
    title: 'CompTIA A+',
    issuer: 'CompTIA',
    status: 'In Progress / Training',
    badgeType: 'Hardware',
    verificationAvailable: false,
    verificationNote: 'Hardware architecture, operating systems troubleshooting, virtualization, and endpoint operational procedures.'
  },
  {
    id: 'python-programming',
    title: 'Python Programming',
    issuer: 'Professional Training',
    status: 'Completed',
    badgeType: 'Programming',
    verificationAvailable: false,
    verificationNote: 'Core and advanced Python scripting, socket programming, HTTP manipulation, and automation.'
  },
  {
    id: 'java-programming-udemy',
    title: 'Java Programming',
    issuer: 'Udemy',
    status: 'Completed',
    badgeType: 'Programming',
    verificationAvailable: false,
    verificationNote: 'Object-Oriented Programming, enterprise data structures, multithreading, and JVM internals.'
  },
  {
    id: 'fullstack-web-udemy',
    title: 'Full-Stack Web Development',
    issuer: 'Udemy',
    status: 'Completed',
    badgeType: 'Development',
    verificationAvailable: false,
    verificationNote: 'Modern full-stack application lifecycle, REST APIs, frontend integration, and database persistence.'
  }
];
