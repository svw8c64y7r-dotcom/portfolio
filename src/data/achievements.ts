import { Achievement } from '../types';

export const achievementsData: Achievement[] = [
  {
    id: 'ctf-international-4th',
    title: '4th Place – International-Level CTF',
    issuerOrHost: 'Karunya Institute of Technology and Science',
    category: 'CTF',
    rankBadge: '4th Place Worldwide / International',
    description: 'Secured 4th position competing against international student and researcher teams in intensive cybersecurity challenges testing multi-disciplinary offensive and defensive problem solving.',
    platformsOrTopics: ['Web Security', 'Reverse Engineering', 'Forensic Analysis', 'Binary Exploitation', 'Crypto']
  },
  {
    id: 'ctf-defcon-top50',
    title: 'Top 50 – DEFCON CTF',
    issuerOrHost: 'DEFCON CTF Qualification / Open Division',
    category: 'CTF',
    rankBadge: 'Top 50 Competitive Standing',
    description: 'Ranked in the Top 50 among global cybersecurity teams in prestigious DEFCON CTF competitive challenges, tackling complex real-world exploitation scenarios and high-difficulty targets.',
    platformsOrTopics: ['Vulnerability Research', 'Binary Analysis', 'System Exploitation', 'Network Attacks']
  },
  {
    id: 'ctf-national-practice',
    title: 'National-Level CTF Participation & Competitive Practice',
    issuerOrHost: 'PicoCTF • Hack The Box • TryHackMe',
    category: 'National CTF',
    rankBadge: 'Active Competitive Player',
    description: 'Consistent competitor across leading global and national competitive platforms, solving hands-on laboratories and timed challenges to maintain peak offensive and investigative skills.',
    platformsOrTopics: [
      'Cryptography',
      'Binary Exploitation',
      'Digital Forensics',
      'Web Security'
    ]
  }
];
