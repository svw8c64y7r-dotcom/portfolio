import React, { useEffect, useRef } from 'react';
import {
  X,
  Download,
  Mail,
  Linkedin,
  Github,
  MapPin,
  Award,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Copy,
  Check,
  Zap
} from 'lucide-react';
import { personalData } from '../data/personal';

interface RecruiterDossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResumeModal: () => void;
}

export const RecruiterDossierModal: React.FC<RecruiterDossierModalProps> = ({
  isOpen,
  onClose,
  onOpenResumeModal
}) => {
  const [copiedEmail, setCopiedEmail] = React.useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  if (!isOpen) return null;

  const coreStack = ['VAPT / Web App PenTest', 'Burp Suite Pro', 'OWASP WSTG v4.2', 'Wazuh SIEM', 'Volatility 3', 'Python / Java', 'ISO/IEC 27001 GRC'];
  const topAchievements = [
    { icon: Award, label: '4th Place — International CTF', sub: 'Karunya Institute of Technology & Science', color: 'text-amber-400' },
    { icon: ShieldCheck, label: 'DEFCON CTF — Top 50 Global', sub: 'Competitive Cybersecurity Standing', color: 'text-cyber-green' },
    { icon: GraduationCap, label: 'M.Sc. Info Security & Forensics', sub: 'Karunya Inst. • 8.3 CGPA (2025–2027)', color: 'text-purple-400' },
    { icon: Briefcase, label: 'Cyber Security Engineer', sub: 'Pitowings (Feb–May 2025) • VAPT Production', color: 'text-cyber-blue' },
  ];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      {/* Modal */}
      <div className="relative w-full max-w-2xl rounded-2xl bg-gradient-to-b from-[#1a0a2e] to-[#110720] border border-purple-500/40 shadow-[0_0_80px_rgba(139,92,246,0.3)] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/30">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/40">
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-xs font-mono text-purple-300 font-bold">60-SECOND DOSSIER</span>
            </div>
            <span className="text-xs font-mono text-slate-500">RECRUITER QUICK VIEW</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[80vh]">

          {/* Identity Block */}
          <div className="flex items-start gap-4">
            <img
              src="/assets/profile.jpg"
              alt="Sri Ragav Surya A"
              className="w-16 h-16 rounded-xl object-cover object-top border-2 border-purple-500/50 shadow-lg"
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-extrabold font-display text-white">Sri Ragav Surya A</h2>
              <p className="text-sm text-purple-300 font-semibold">Cybersecurity Professional & Security Researcher</p>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400 font-mono">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>Coimbatore, Tamil Nadu, India</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
                <span className="text-xs font-mono text-cyber-green">Available for Security Engineering / VAPT / SOC Roles</span>
              </div>
            </div>
          </div>

          {/* Core Technical Stack */}
          <div>
            <p className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-2.5">Core Technical Stack</p>
            <div className="flex flex-wrap gap-2">
              {coreStack.map((tech) => (
                <span key={tech} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-slate-200 hover:border-purple-500/40 transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Top Achievements */}
          <div>
            <p className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-2.5">Verified Achievements & Credentials</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {topAchievements.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/30 transition-colors">
                  <item.icon className={`w-5 h-5 mt-0.5 shrink-0 ${item.color}`} />
                  <div>
                    <div className={`text-xs font-bold ${item.color}`}>{item.label}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action CTAs */}
          <div className="pt-2 border-t border-white/10">
            <p className="text-xs font-mono text-purple-400 uppercase tracking-widest mb-3">Quick Actions</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => { onOpenResumeModal(); onClose(); }}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gradient-to-b from-purple-600/30 to-indigo-600/20 border border-purple-500/40 text-purple-300 hover:border-purple-400 hover:bg-purple-500/20 transition-all"
              >
                <Download className="w-5 h-5" />
                <span className="text-[11px] font-mono">Resume PDF</span>
              </button>

              <button
                onClick={copyEmail}
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:border-cyber-blue/50 hover:text-cyber-blue transition-all"
              >
                {copiedEmail ? <Check className="w-5 h-5 text-cyber-green" /> : <Mail className="w-5 h-5" />}
                <span className="text-[11px] font-mono">{copiedEmail ? 'Copied!' : 'Copy Email'}</span>
              </button>

              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:border-cyber-blue/50 hover:text-cyber-blue transition-all"
              >
                <Linkedin className="w-5 h-5" />
                <span className="text-[11px] font-mono">LinkedIn</span>
              </a>

              <a
                href={personalData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:border-purple-500/50 hover:text-purple-300 transition-all"
              >
                <Github className="w-5 h-5" />
                <span className="text-[11px] font-mono">GitHub</span>
              </a>
            </div>
          </div>

          {/* Contact Detail */}
          <div className="text-center text-xs font-mono text-slate-500">
            📧 <span className="text-slate-300">{personalData.email}</span>
            {' • '}
            📞 <span className="text-slate-300">{personalData.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

