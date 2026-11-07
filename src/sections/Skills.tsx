import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Search, 
  Terminal, 
  FileCheck2, 
  Binary, 
  Bot, 
  Layers, 
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { skillGroups } from '../data/skills';
import { SkillGroup, SkillItem } from '../types';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categoryIcons: Record<string, React.ReactNode> = {
    'offensive-security': <ShieldAlert className="w-4 h-4 text-cyber-green" />,
    'defensive-security': <ShieldCheck className="w-4 h-4 text-cyber-blue" />,
    'dfir': <Binary className="w-4 h-4 text-cyan-400" />,
    'grc': <FileCheck2 className="w-4 h-4 text-cyber-purple" />,
    'programming-development': <Terminal className="w-4 h-4 text-amber-400" />,
    'automation-testing': <Bot className="w-4 h-4 text-emerald-400" />,
  };

  const filteredGroups = skillGroups.filter(group => {
    if (selectedCategory !== 'all' && group.id !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim() === '') {
      return true;
    }
    const q = searchQuery.toLowerCase();
    const matchesGroup = group.category.toLowerCase().includes(q) || group.description.toLowerCase().includes(q);
    const matchesSkill = group.skills.some(s => s.name.toLowerCase().includes(q));
    return matchesGroup || matchesSkill;
  });

  const getProficiencyBadgeStyle = (prof?: string) => {
    switch (prof) {
      case 'Core Competency':
        return 'bg-cyber-green/15 text-cyber-green border-cyber-green/40 shadow-sm';
      case 'Advanced':
        return 'bg-cyber-blue/15 text-cyber-blue border-cyber-blue/40';
      case 'Proficient':
        return 'bg-cyber-purple/15 text-cyber-purple border-cyber-purple/40';
      case 'Hands-On':
        return 'bg-amber-400/15 text-amber-300 border-amber-400/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <section id="skills" className="py-20 bg-cyber-bg relative border-t border-cyber-cardBorder/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyber-blue/10 border border-cyber-blue/30 text-cyber-blue text-xs font-mono mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>TECHNICAL COMPETENCY MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              Interactive Skills Dashboard
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-mono">
              Curated capabilities verified through hands-on testing, CTF competitions, security labs, and production development.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools or skills (e.g. Burp, Python)..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg bg-cyber-surface border border-cyber-cardBorder text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyber-green transition-colors font-mono"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none select-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-cyber-green text-black font-bold shadow-neon-green'
                : 'bg-cyber-surface border border-cyber-cardBorder text-slate-300 hover:text-white'
            }`}
          >
            All Disciplines ({skillGroups.reduce((acc, g) => acc + g.skills.length, 0)})
          </button>

          {skillGroups.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedCategory(g.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 ${
                selectedCategory === g.id
                  ? 'bg-cyber-blue text-black font-bold shadow-neon-blue'
                  : 'bg-cyber-surface border border-cyber-cardBorder text-slate-300 hover:text-white hover:border-slate-500'
              }`}
            >
              {categoryIcons[g.id]}
              <span>{g.category}</span>
              <span className="text-[10px] opacity-70">({g.skills.length})</span>
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => {
            const filteredSkills = searchQuery.trim() === '' 
              ? group.skills 
              : group.skills.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

            if (filteredSkills.length === 0) return null;

            return (
              <div
                key={group.id}
                className="rounded-2xl bg-cyber-surface/80 border border-cyber-cardBorder p-5 sm:p-6 flex flex-col justify-between hover:border-cyber-green/40 transition-all duration-300 group shadow-lg"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-cyber-card border border-cyber-cardBorder group-hover:border-cyber-green/40 transition-colors">
                        {categoryIcons[group.id]}
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base text-slate-100 group-hover:text-cyber-green transition-colors">
                          {group.category}
                        </h3>
                        <span className="text-[10px] font-mono text-slate-400">
                          {group.code}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                    {group.description}
                  </p>

                  {/* Skills Tag Cloud */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-cyber-cardBorder/60">
                    {filteredSkills.map((skill: SkillItem, idx: number) => (
                      <div
                        key={idx}
                        className="group/tag inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyber-card border border-cyber-cardBorder text-slate-200 hover:border-cyber-green/50 transition-all"
                      >
                        <span className="text-xs font-medium font-sans">
                          {skill.name}
                        </span>
                        {skill.proficiency && (
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${getProficiencyBadgeStyle(skill.proficiency)}`}>
                            {skill.proficiency}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Domain Guarantee */}
                <div className="mt-5 pt-3 border-t border-cyber-cardBorder/40 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1 text-cyber-green">
                    <CheckCircle className="w-3 h-3" />
                    <span>Explainable & Tested</span>
                  </span>
                  <span className="text-slate-500">{filteredSkills.length} Verified Items</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend / Transparency Banner */}
        <div className="mt-12 p-4 rounded-xl bg-cyber-surface/40 border border-cyber-cardBorder flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyber-green" />
            <span>Honest Evaluation Notice: Only displaying skills tested through practical labs, real assessments, or code. No arbitrary percentages.</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2 py-0.5 rounded bg-cyber-green/10 border border-cyber-green/40 text-cyber-green text-[10px]">Core</span>
            <span className="px-2 py-0.5 rounded bg-cyber-blue/10 border border-cyber-blue/40 text-cyber-blue text-[10px]">Advanced</span>
            <span className="px-2 py-0.5 rounded bg-cyber-purple/10 border border-cyber-purple/40 text-cyber-purple text-[10px]">Proficient</span>
            <span className="px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/40 text-amber-300 text-[10px]">Hands-On</span>
          </div>
        </div>

      </div>
    </section>
  );
};
