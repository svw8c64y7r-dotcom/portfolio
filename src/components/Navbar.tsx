import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Menu, 
  X, 
  Download, 
  Github, 
  Linkedin, 
  ChevronRight,
  Zap
} from 'lucide-react';
import { personalData } from '../data/personal';
import { SocStatusBar } from './SocStatusBar';
import { useOperatorMode, OperatorMode } from '../context/OperatorModeContext';

interface NavbarProps {
  onOpenResumeModal?: () => void;
  onOpenCommandPalette?: () => void;
  onOpenDossier?: () => void;
}

const operatorModes: { label: string; value: OperatorMode; color: string; activeColor: string }[] = [
  { label: 'ALL', value: 'all', color: 'text-slate-400 border-white/10 bg-white/5', activeColor: 'text-purple-300 border-purple-500/50 bg-purple-500/15' },
  { label: 'RED', value: 'red', color: 'text-slate-400 border-white/10 bg-white/5', activeColor: 'text-red-300 border-red-500/50 bg-red-500/15' },
  { label: 'BLUE', value: 'blue', color: 'text-slate-400 border-white/10 bg-white/5', activeColor: 'text-blue-300 border-blue-500/50 bg-blue-500/15' },
  { label: 'DFIR', value: 'dfir', color: 'text-slate-400 border-white/10 bg-white/5', activeColor: 'text-cyan-300 border-cyan-500/50 bg-cyan-500/15' },
];

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumeModal, onOpenCommandPalette, onOpenDossier }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { mode, setMode } = useOperatorMode();

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'VAPT Report', href: '#vapt' },
    { label: 'Blog', href: '#blog' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Education', href: '#education' },
    { label: 'Terminal', href: '#terminal' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'vapt', 'blog', 'achievements', 'certifications', 'education', 'terminal', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadResume = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenResumeModal) {
      onOpenResumeModal();
    } else {
      window.open('/resume/Sri_Ragav_Surya_Resume.pdf', '_blank');
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex flex-col shadow-xl">
      {/* Top Real-time Simulated SOC HUD Bar */}
      <SocStatusBar onOpenCommandPalette={onOpenCommandPalette || (() => {})} />

      {/* Main Glassmorphic Navigation Bar */}
      <div className={`transition-all duration-300 ${isScrolled ? 'bg-[#110720]/95 backdrop-blur-md border-b border-purple-500/20 shadow-lg shadow-purple-950/40 py-2.5' : 'bg-[#110720]/90 backdrop-blur-md border-b border-white/10 py-3'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Moniker / Shield */}
            <a href="#hero" className="flex items-center space-x-3 group shrink-0">
              <div className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-purple-950/60 border border-purple-500/40 group-hover:border-purple-400 group-hover:shadow-neon-purple transition-all duration-300">
                <Shield className="w-4 h-4 text-purple-400 transition-transform duration-300 group-hover:scale-110" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyber-green rounded-full animate-ping opacity-75" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-cyber-green rounded-full" />
              </div>
              <div>
                <div className="font-display font-bold text-sm text-white group-hover:text-purple-300 transition-colors flex items-center gap-1">
                  <span>SRI RAGAV SURYA</span>
                  <span className="text-purple-400">A</span>
                </div>
                <div className="text-[9px] text-slate-400 font-mono tracking-wider flex items-center gap-1">
                  <span className="inline-block w-1 h-1 rounded-full bg-cyber-green"></span>
                  <span>CYBERSECURITY PROFESSIONAL</span>
                </div>
              </div>
            </a>

            {/* Desktop Navigation Links (xl+ screens) */}
            <nav className="hidden xl:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                      isActive 
                        ? 'text-purple-300 bg-purple-500/20 border border-purple-500/40 shadow-sm font-semibold' 
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Laptop Navigation Links (lg to xl screens) */}
            <nav className="hidden lg:flex xl:hidden items-center space-x-1">
              {[
                { label: 'About', href: '#about' },
                { label: 'Skills', href: '#skills' },
                { label: 'Experience', href: '#experience' },
                { label: 'Projects', href: '#projects' },
                { label: 'VAPT', href: '#vapt' },
                { label: 'Blog', href: '#blog' },
                { label: 'Terminal', href: '#terminal' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`px-2 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                      isActive 
                        ? 'text-purple-300 bg-purple-500/20 border border-purple-500/40 shadow-sm font-semibold' 
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

          {/* Action CTAs, Operator Mode & Resume Button */}
          <div className="hidden lg:flex items-center space-x-2 shrink-0">

            {/* Operator Mode Switcher */}
            <div className="flex items-center gap-1 p-1 rounded-lg bg-black/30 border border-white/10">
              {operatorModes.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setMode(m.value)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border transition-all duration-200 ${
                    mode === m.value ? m.activeColor : m.color + ' hover:text-white'
                  }`}
                  title={`Filter: ${m.label} Team`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Dossier / Quick View Button */}
            <button
              onClick={() => onOpenDossier?.()}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 hover:border-amber-400 hover:bg-amber-500/25 active:scale-95 transition-all duration-200 font-mono"
              title="Recruiter Quick View"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Dossier</span>
            </button>

            <a
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-purple-500/40 transition-colors"
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href={personalData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-purple-300 hover:border-purple-500/40 transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <button
              onClick={handleDownloadResume}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-500 hover:to-indigo-500 hover:shadow-neon-purple active:scale-95 transition-all duration-300 shadow-md font-mono"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={handleDownloadResume}
              className="flex items-center space-x-1 px-3 py-1.5 rounded text-xs font-semibold bg-purple-600/30 border border-purple-500/50 text-purple-300 sm:hidden"
            >
              <Download className="w-3 h-3" />
              <span>CV</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-purple-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>
    </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#110720]/98 backdrop-blur-xl border-b border-white/10 px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-purple-300 hover:bg-white/5 transition-colors"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </a>
            ))}
          </div>

          {/* Mobile Operator Mode */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">Operator Mode</div>
            <div className="flex gap-2">
              {operatorModes.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setMode(m.value)}
                  className={`flex-1 py-1.5 rounded text-[11px] font-mono font-bold border transition-all ${
                    mode === m.value ? m.activeColor : m.color
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenDossier?.(); }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 font-mono"
            >
              <Zap className="w-4 h-4" />
              <span>Recruiter Quick View (Dossier)</span>
            </button>

            <button
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleDownloadResume(e);
              }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg text-xs font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 transition-colors shadow-neon-purple font-mono"
            >
              <Download className="w-4 h-4" />
              <span>Download Official Resume (PDF)</span>
            </button>

            <div className="grid grid-cols-2 gap-2 mt-1">
              <a
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 hover:text-white"
              >
                <Github className="w-4 h-4 text-purple-400" />
                <span>GitHub</span>
              </a>
              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 hover:text-white"
              >
                <Linkedin className="w-4 h-4 text-cyber-blue" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
