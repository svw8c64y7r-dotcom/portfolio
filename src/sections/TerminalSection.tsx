import React from 'react';
import { Terminal as TerminalIcon, ShieldAlert, Cpu, Sparkles, Command } from 'lucide-react';
import { Terminal } from '../components/Terminal';

export const TerminalSection: React.FC = () => {
  return (
    <section id="terminal" className="py-20 bg-cyber-bg relative border-t border-cyber-cardBorder/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyber-green/10 border border-cyber-green/30 text-cyber-green text-xs font-mono mb-3">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>INTERACTIVE CYBER COMMAND LINE INTERFACE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Security Terminal Simulation
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-mono">
            Execute simulated shell commands, query candidate credentials, download resumes, or probe security metrics via an interactive CLI.
          </p>
        </div>

        {/* Embedded Interactive Terminal */}
        <div className="relative">
          <Terminal isStandalone={true} />
        </div>

        {/* Command Cheat Sheet / Guide */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
          {[
            { cmd: 'help', desc: 'List all commands' },
            { cmd: 'about', desc: 'Summary & Bio' },
            { cmd: 'skills', desc: 'Skills matrix' },
            { cmd: 'projects', desc: 'Security work' },
            { cmd: 'experience', desc: 'Pitowings tenure' },
            { cmd: 'achievements', desc: 'CTF standings' },
            { cmd: 'certifications', desc: 'Credentials' },
            { cmd: 'education', desc: 'Academic history' },
            { cmd: 'github', desc: 'Open GitHub' },
            { cmd: 'linkedin', desc: 'Open LinkedIn' },
            { cmd: 'resume', desc: 'Download PDF' },
            { cmd: 'clear', desc: 'Reset session' },
          ].map((item) => (
            <div key={item.cmd} className="p-2.5 rounded-xl bg-cyber-surface/60 border border-cyber-cardBorder text-xs font-mono">
              <span className="text-cyber-green font-bold block">{item.cmd}</span>
              <span className="text-[11px] text-slate-400">{item.desc}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
