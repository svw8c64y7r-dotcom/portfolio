import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Terminal, 
  Download, 
  Mail, 
  Github, 
  Linkedin, 
  Shield, 
  Layers, 
  FolderGit2, 
  Award, 
  BookOpen, 
  X,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { personalData } from '../data/personal';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResumeModal: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ 
  isOpen, 
  onClose,
  onOpenResumeModal 
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'resume',
      title: 'Download Resume PDF',
      subtitle: 'Official 159 KB verified document',
      icon: <Download className="w-4 h-4 text-purple-400" />,
      perform: () => {
        onClose();
        onOpenResumeModal();
      }
    },
    {
      id: 'terminal',
      title: 'Open Cyber Terminal',
      subtitle: 'Jump to interactive CLI (ragav@cybersecurity:~)',
      icon: <Terminal className="w-4 h-4 text-cyber-green" />,
      perform: () => {
        onClose();
        window.location.hash = '#terminal';
      }
    },
    {
      id: 'projects',
      title: 'Explore Security Projects & Labs',
      subtitle: 'Advanced Web Vulnerability Scanner, Epoteck, DFIR Lab',
      icon: <FolderGit2 className="w-4 h-4 text-cyber-blue" />,
      perform: () => {
        onClose();
        window.location.hash = '#projects';
      }
    },
    {
      id: 'skills',
      title: 'View Skills Dashboard',
      subtitle: 'Offensive Security, Defensive, DFIR, GRC & Dev',
      icon: <Layers className="w-4 h-4 text-indigo-400" />,
      perform: () => {
        onClose();
        window.location.hash = '#skills';
      }
    },
    {
      id: 'experience',
      title: 'Inspect Work Experience',
      subtitle: 'Cyber Security Engineer @ Pitowings (VAPT)',
      icon: <Shield className="w-4 h-4 text-purple-300" />,
      perform: () => {
        onClose();
        window.location.hash = '#experience';
      }
    },
    {
      id: 'achievements',
      title: 'View CTF Achievements',
      subtitle: '4th Place International CTF & Top 50 DEFCON CTF',
      icon: <Award className="w-4 h-4 text-amber-400" />,
      perform: () => {
        onClose();
        window.location.hash = '#achievements';
      }
    },
    {
      id: 'education',
      title: 'Academic Qualifications',
      subtitle: 'M.Sc. (8.3 CGPA) & B.Sc. (6.0 CGPA) at Karunya',
      icon: <BookOpen className="w-4 h-4 text-emerald-400" />,
      perform: () => {
        onClose();
        window.location.hash = '#education';
      }
    },
    {
      id: 'contact',
      title: 'Contact Sri Ragav Surya A',
      subtitle: 'Send direct encrypted inquiry or email',
      icon: <Mail className="w-4 h-4 text-cyber-green" />,
      perform: () => {
        onClose();
        window.location.hash = '#contact';
      }
    },
    {
      id: 'github',
      title: 'Open GitHub Profile',
      subtitle: 'github.com/svw8c64y7r-dotcom',
      icon: <Github className="w-4 h-4 text-white" />,
      perform: () => {
        onClose();
        window.open(personalData.github, '_blank');
      }
    },
    {
      id: 'linkedin',
      title: 'Connect on LinkedIn',
      subtitle: 'linkedin.com/in/sri-ragav-surya',
      icon: <Linkedin className="w-4 h-4 text-cyber-blue" />,
      perform: () => {
        onClose();
        window.open(personalData.linkedin, '_blank');
      }
    }
  ];

  const filtered = actions.filter(a => 
    a.title.toLowerCase().includes(query.toLowerCase()) || 
    a.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-[#110720] border border-white/20 rounded-2xl shadow-2xl overflow-hidden font-sans flex flex-col">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-white/5">
          <Search className="w-5 h-5 text-purple-400 shrink-0 mr-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands, sections, repos, or shortcuts..."
            className="w-full bg-transparent border-none outline-none text-white text-sm placeholder-slate-400 font-sans"
            autoFocus
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
          >
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono">ESC</kbd>
          </button>
        </div>

        {/* Action List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center text-xs font-mono text-slate-400">
              No matching actions or navigation targets found for &quot;{query}&quot;.
            </div>
          ) : (
            filtered.map((item) => (
              <button
                key={item.id}
                onClick={item.perform}
                className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/10 transition-colors text-left group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-black/40 border border-white/10 group-hover:border-purple-500/40 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {item.title}
                    </div>
                    <div className="text-xs text-slate-400 font-mono">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 transition-colors" />
              </button>
            ))
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2.5 bg-black/50 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Navigate with mouse or keyboard</span>
          <div className="flex items-center gap-2">
            <span>Toggle:</span>
            <kbd className="px-1 py-0.5 rounded bg-white/10 text-[10px]">Ctrl</kbd>
            <span>+</span>
            <kbd className="px-1 py-0.5 rounded bg-white/10 text-[10px]">K</kbd>
          </div>
        </div>

      </div>
    </div>
  );
};
