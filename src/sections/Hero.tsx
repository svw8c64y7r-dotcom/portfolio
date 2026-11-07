import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Download, 
  Github, 
  Linkedin, 
  Terminal, 
  Award, 
  Briefcase, 
  GraduationCap,
  Sparkles,
  ExternalLink,
  Target,
  FileCheck2,
  Cpu
} from 'lucide-react';
import { personalData } from '../data/personal';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = personalData.roles;

  useEffect(() => {
    const targetRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 35 : 75;
    const pauseTime = isDeleting ? 200 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < targetRole.length) {
          setCurrentText(targetRole.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(targetRole.slice(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, roles]);

  const verifiedStats = [
    { label: 'International CTF Standing', value: '4th Place', highlight: 'Worldwide Rank', color: 'text-amber-400' },
    { label: 'DEFCON CTF Qualification', value: 'Top 50', highlight: 'Global Standing', color: 'text-cyber-green' },
    { label: 'Postgraduate M.Sc. CGPA', value: '8.3 / 10', highlight: 'Karunya Institute', color: 'text-purple-400' },
    { label: 'Production VAPT Experience', value: '100%', highlight: 'Manual Verification', color: 'text-cyber-blue' },
  ];

  const highlights = [
    {
      title: '4th Place',
      subtitle: 'International-Level CTF',
      issuer: 'Karunya Institute of Technology & Science',
      icon: Award,
      color: 'text-amber-400',
      border: 'border-amber-400/30'
    },
    {
      title: 'Top 50',
      subtitle: 'DEFCON CTF',
      issuer: 'Competitive Cybersecurity Standing',
      icon: Award,
      color: 'text-cyber-green',
      border: 'border-cyber-green/30'
    },
    {
      title: 'M.Sc. Information Security',
      subtitle: '& Digital Forensics',
      issuer: 'Karunya (2025–2027) • 8.3 CGPA',
      icon: GraduationCap,
      color: 'text-purple-400',
      border: 'border-purple-400/30'
    },
    {
      title: 'Cyber Security Engineer',
      subtitle: 'Pitowings (Feb–May 2025)',
      issuer: 'VAPT, Burp Suite & OWASP Top 10',
      icon: Briefcase,
      color: 'text-cyber-blue',
      border: 'border-cyber-blue/30'
    }
  ];

  const technicalSpecializations = [
    'Web Application VAPT',
    'OWASP Top 10 Auditing',
    'Wazuh SIEM Operations',
    'Volatile Memory Forensics',
    'Security Automation',
    'ISO/IEC 27001 & GRC'
  ];

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center overflow-hidden bg-[#110720]">
      {/* Background Cyber Mesh Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1338_1px,transparent_1px),linear-gradient(to_bottom,#1e1338_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)] opacity-35 pointer-events-none" />

      {/* Subtle Glow Spheres */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-blue/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Top Split Layout: Content + Character Art */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12 pt-4">
          
          {/* Left Column: Hero Content */}
          <div className="flex-1 space-y-6 text-center lg:text-left">
            
            {/* Desktop Pointer Header with arrow.png */}
            <div className="hidden lg:inline-block relative">
              <img
                src="/assets/arrow.png"
                alt="Pointer"
                className="absolute w-20 h-20 -left-20 -top-10 pointer-events-none"
              />
              <div className="relative -top-6 pl-2">
                <p className="text-white text-base sm:text-lg font-medium flex items-center gap-2">
                  <span>Hello! I Am</span>
                  <span className="text-purple-400 font-bold font-display">SRI RAGAV SURYA A</span>
                </p>
              </div>
            </div>

            {/* Mobile Pointer Header */}
            <div className="lg:hidden inline-block relative mb-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-cyber-green animate-ping" />
                <span>Hello! I Am <strong className="text-white">SRI RAGAV SURYA A</strong></span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <p className="text-xl sm:text-2xl text-purple-300 font-display font-medium">
                A Cybersecurity Specialist who
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-display">
                Securing Digital
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-violet-300 to-cyber-blue bg-clip-text text-transparent">
                  Infrastructure
                </span>
                <br />
                One Vulnerability at a Time.
              </h1>
              <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
                {personalData.subtitle}
              </p>
            </div>

            {/* Dynamic Rotating Role Typing Banner */}
            <div className="h-12 flex items-center justify-center lg:justify-start">
              <div className="flex items-center text-xl sm:text-2xl font-mono text-slate-100">
                <span className="text-purple-400 font-bold mr-2">I&apos;m a</span>
                <span className="font-bold text-cyber-green">{currentText}</span>
                <span className="w-2.5 h-6 bg-purple-400 ml-1 animate-pulse"></span>
              </div>
            </div>

            {/* Technical Specializations Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 pt-1">
              {technicalSpecializations.map((spec, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:border-purple-500/40 transition-colors"
                >
                  {spec}
                </span>
              ))}
            </div>

            {/* Primary & Secondary Action CTAs */}
            <div className="pt-2 flex flex-wrap gap-3 sm:gap-4 items-center justify-center lg:justify-start">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 hover:shadow-neon-purple active:scale-95 transition-all duration-200 font-mono shadow-lg"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenResumeModal}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-[#110720] border border-purple-500/60 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 hover:shadow-neon-purple active:scale-95 transition-all duration-200 font-mono"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </button>

              <a
                href="#vapt"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:border-purple-500/50 transition-colors"
              >
                <FileCheck2 className="w-4 h-4 text-purple-400" />
                <span>VAPT Report</span>
              </a>

              <a
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:border-purple-500/50 transition-colors"
                title="View GitHub Profile"
              >
                <Github className="w-4 h-4 text-purple-400" />
                <span className="hidden sm:inline">GitHub</span>
              </a>

              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:border-purple-500/50 transition-colors"
                title="Connect on LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-cyber-blue" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            </div>

            {/* Interactive Terminal Quick Link */}
            <div className="pt-2">
              <a 
                href="#terminal"
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-purple-300 transition-colors"
              >
                <Terminal className="w-4 h-4 text-purple-400" />
                <span>Launch Interactive Cyber Terminal <span className="text-purple-400 font-bold">ragav@cybersecurity:~$</span></span>
              </a>
            </div>

          </div>

          {/* Right Column: Template Layered Character Illustration */}
          <div className="flex justify-center relative w-full lg:w-auto">
            <div className="relative w-72 sm:w-80 lg:w-96 aspect-square flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 via-indigo-600/20 to-transparent rounded-full blur-2xl pointer-events-none" />

              <img
                src="/assets/me-glow.png"
                alt="Security Researcher Glow Art"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none scale-105"
              />
              <img
                src="/assets/me.png"
                alt="Sri Ragav Surya A"
                className="relative z-10 w-full h-full object-contain drop-shadow-[0_15px_35px_rgba(139,92,246,0.35)]"
              />

              <div className="absolute -top-2 -right-2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#110720]/90 border border-purple-500/40 shadow-lg text-[11px] font-mono text-purple-300 backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-cyber-green" />
                <span>VAPT & DFIR</span>
              </div>

              <div className="absolute -bottom-2 -left-2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#110720]/90 border border-purple-500/40 shadow-lg text-[11px] font-mono text-slate-200 backdrop-blur-md">
                <Award className="w-4 h-4 text-amber-400" />
                <span>DEFCON Top 50</span>
              </div>
            </div>
          </div>

        </div>

        {/* Verified Security Statistics Ribbon */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4">
          {verifiedStats.map((st, sIdx) => (
            <div key={sIdx} className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 backdrop-blur-sm">
              <div className={`font-display font-extrabold text-2xl sm:text-3xl ${st.color}`}>
                {st.value}
              </div>
              <div className="text-xs font-semibold text-slate-200 mt-1">
                {st.label}
              </div>
              <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                {st.highlight}
              </div>
            </div>
          ))}
        </div>

        {/* Achievement Highlights Banner Grid */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4">
            VERIFIED HIGHLIGHTS & CREDENTIALS
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {highlights.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className={`p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border ${item.border} hover:border-purple-500/60 hover:bg-white/10 transition-all duration-300 flex items-start space-x-3.5 shadow-md`}
                >
                  <div className={`p-2.5 rounded-lg bg-black/40 border border-white/10 ${item.color}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-base text-white">
                      {item.title}
                    </div>
                    <div className="text-xs font-medium text-slate-300">
                      {item.subtitle}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-1">
                      {item.issuer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
