import React from 'react';
import { Shield, ArrowUp, Github, Linkedin, Mail, Heart, Lock } from 'lucide-react';
import { personalData } from '../data/personal';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Achievements', href: '#achievements' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Education', href: '#education' },
    { label: 'Research', href: '#research' },
    { label: 'Terminal', href: '#terminal' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#110720] border-t border-white/10 text-slate-400 py-16 relative overflow-hidden">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1338_1px,transparent_1px),linear-gradient(to_bottom,#1e1338_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-25 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Center Callout */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="w-12 h-12 rounded-2xl bg-purple-950/60 border border-purple-500/40 text-purple-400 mx-auto flex items-center justify-center mb-4 shadow-neon-purple">
            <Shield className="w-6 h-6" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white mb-3">
            SRI RAGAV SURYA <span className="text-purple-400">A</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 mb-6 font-sans leading-relaxed">
            Cybersecurity Professional specializing in Web Application Security, Penetration Testing, Security Operations (SOC), Digital Forensics (DFIR), and GRC.
          </p>

          <a
            href={`mailto:${personalData.email}`}
            className="text-base sm:text-lg text-purple-400 hover:text-purple-300 font-mono underline transition-colors"
          >
            {personalData.email}
          </a>

          {/* Social Media Buttons Matching Template */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <a
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-purple-500/30 hover:border-purple-400 transition-all text-white hover:scale-110 shadow-md"
              aria-label="GitHub Profile"
              title="GitHub"
            >
              <Github className="w-5 h-5 text-purple-300" />
            </a>

            <a
              href={personalData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-purple-500/30 hover:border-purple-400 transition-all text-white hover:scale-110 shadow-md"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-cyber-blue" />
            </a>

            <a
              href={`mailto:${personalData.email}`}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border border-purple-500/30 hover:border-purple-400 transition-all text-white hover:scale-110 shadow-md"
              aria-label="Direct Email"
              title="Email"
            >
              <Mail className="w-5 h-5 text-cyber-green" />
            </a>

            <button
              onClick={scrollToTop}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 transition-all text-white hover:scale-110 shadow-neon-purple ml-2"
              title="Scroll to Top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-mono pb-8 border-b border-white/10 text-slate-400">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-purple-300 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Bottom Metadata */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 gap-3">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-purple-400" />
            <span>Built with React, TypeScript & Tailwind CSS • Inspired by Figma Architecture</span>
          </div>
          <div>
            © {new Date().getFullYear()} Sri Ragav Surya A. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
