import React from 'react';
import { 
  UserCheck, 
  Target, 
  Terminal, 
  ShieldAlert, 
  Code2, 
  FileSearch, 
  Scale, 
  MapPin, 
  Mail, 
  Phone, 
  GraduationCap,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { personalData } from '../data/personal';

export const About: React.FC = () => {
  const careerInterests = [
    { title: 'Web Application VAPT', desc: 'Manual penetration testing, OWASP Top 10 remediation, business logic auditing.' },
    { title: 'Security Operations & SOC', desc: 'Alert triage, Wazuh SIEM telemetry, anomaly detection, incident response.' },
    { title: 'Digital Forensics & DFIR', desc: 'Memory analysis with Volatility 3, disk triage with Autopsy, PCAP analysis.' },
    { title: 'GRC & Risk Assessment', desc: 'ISO/IEC 27001 policies, GDPR/CCPA compliance, security posture audits.' }
  ];

  const technicalPillars = [
    { name: 'Offensive Security', detail: 'Burp Suite, Nmap, Gobuster, SQLi, XSS, Auth Flaws' },
    { name: 'Defensive Security', detail: 'Wireshark, Wazuh SIEM, Traffic Analysis, Threat Triage' },
    { name: 'Digital Forensics', detail: 'Volatility 3, Autopsy, Windows Event Logs, PCAP Forensics' },
    { name: 'Secure Development', detail: 'Python, Java, Spring Framework, REST APIs, Automation' }
  ];

  const journeyMilestones = [
    {
      year: '2022 – 2025',
      title: 'B.Sc. Information Security & Digital Forensics',
      organization: 'Karunya Institute of Technology & Science',
      desc: 'Graduated with strong foundations in networking, OS security, cryptography, and digital forensics principles.'
    },
    {
      year: 'Feb 2025 – May 2025',
      title: 'Cyber Security Engineer',
      organization: 'Pitowings',
      desc: 'Executed practical VAPT assessments on production web applications, drafted risk reports, and coordinated remediation.'
    },
    {
      year: '2025 – 2027 (Current)',
      title: 'M.Sc. Information Security & Digital Forensics',
      organization: 'Karunya Institute of Technology & Science',
      desc: 'Advancing research in enterprise threat detection, volatile memory forensics, and automated vulnerability scanning.'
    }
  ];

  return (
    <section id="about" className="py-20 bg-[#110720] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
            <UserCheck className="w-3.5 h-3.5" />
            <span>OPERATOR PROFILE & BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            About Me
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-mono">
            Bridging offensive testing, defensive operations, digital investigation, and secure software development.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Core Narrative & Profile */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Primary Bio Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 shadow-xl relative overflow-hidden backdrop-blur-md">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <h3 className="text-xl font-bold font-display text-slate-100 mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400" />
                Professional Summary
              </h3>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  I am a cybersecurity graduate pursuing an <span className="text-purple-300 font-semibold">M.Sc. in Information Security and Digital Forensics</span> at Karunya Institute of Technology and Science.
                </p>
                <p>
                  My interests span offensive security, defensive security, digital forensics, vulnerability assessment, security research and governance, risk and compliance.
                </p>
                <p>
                  I have practical experience in web application security testing, penetration testing and vulnerability assessment using tools such as <span className="text-cyber-blue font-semibold">Burp Suite, Nmap, Wireshark and Kali Linux</span>.
                </p>
                <p>
                  My cybersecurity journey also includes competitive Capture The Flag challenges, security laboratories and hands-on technical projects.
                </p>
                <p>
                  Alongside cybersecurity, I have development experience in <span className="text-cyber-green font-semibold">Java, Python and full-stack application development</span>.
                </p>
                <p className="border-l-2 border-purple-500 pl-3 text-slate-200 italic font-mono text-xs sm:text-sm pt-1">
                  &ldquo;I continuously work on improving my technical capabilities and applying security principles to real-world environments.&rdquo;
                </p>
              </div>

              {/* Verified Contact Coordinates Bar */}
              <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Coimbatore, TN, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyber-blue shrink-0" />
                  <a href={`mailto:${personalData.email}`} className="truncate hover:text-cyber-blue">{personalData.email}</a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-cyber-green shrink-0" />
                  <span>{personalData.phone}</span>
                </div>
              </div>
            </div>

            {/* Career & Technical Interests */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
              <h3 className="text-lg font-bold font-display text-slate-100 mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-400" />
                <span>Primary Career & Technical Focus</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {careerInterests.map((interest, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-purple-500/40 transition-colors">
                    <div className="text-sm font-bold text-purple-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyber-green" />
                      <span>{interest.title}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">
                      {interest.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Template Illustration & Professional Timeline */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Skill Matrix from Template */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex flex-col items-center">
              <div className="text-center mb-4">
                <h4 className="text-sm font-bold font-display text-white">
                  Security Ecosystem & Tooling Stack
                </h4>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  End-to-end tooling across testing, forensics, and automation
                </p>
              </div>
              <img
                src="/assets/illustration.png"
                alt="Security Skills Illustration"
                className="w-full max-w-sm object-contain drop-shadow-xl"
              />
            </div>

            {/* Milestone Timeline */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
              <h3 className="text-lg font-bold font-display text-slate-100 mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span>Milestone Journey</span>
              </h3>
              <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                {journeyMilestones.map((m, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-purple-500 border-2 border-[#110720] ring-4 ring-purple-500/20" />
                    <div className="text-[11px] font-mono text-purple-400 font-bold">{m.year}</div>
                    <div className="text-sm font-bold text-slate-100">{m.title}</div>
                    <div className="text-xs text-cyber-blue">{m.organization}</div>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">{m.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
