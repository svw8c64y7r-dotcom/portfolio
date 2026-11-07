import React from 'react';
import { 
  Trophy, 
  Award, 
  Target, 
  Flag, 
  Sparkles, 
  CheckCircle2, 
  ShieldAlert, 
  Terminal,
  ExternalLink
} from 'lucide-react';
import { achievementsData } from '../data/achievements';

export const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="py-20 bg-cyber-bg relative border-t border-cyber-cardBorder/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-mono mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>COMPETITIVE CYBERSECURITY HONORS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Capture The Flag & Achievements
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-mono">
            Proven offensive problem-solving, binary analysis, and forensics under competitive pressure.
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievementsData.map((item, index) => {
            const isFirst = index === 0;
            const isSecond = index === 1;

            return (
              <div
                key={item.id}
                className={`relative rounded-2xl p-6 sm:p-7 flex flex-col justify-between border transition-all duration-300 backdrop-blur-md group ${
                  isFirst
                    ? 'bg-gradient-to-b from-amber-500/10 via-cyber-surface to-cyber-surface border-amber-400/40 hover:border-amber-400 hover:shadow-[0_0_25px_-5px_rgba(251,191,36,0.3)]'
                    : isSecond
                    ? 'bg-gradient-to-b from-cyber-green/10 via-cyber-surface to-cyber-surface border-cyber-green/40 hover:border-cyber-green hover:shadow-neon-green'
                    : 'bg-gradient-to-b from-cyber-blue/10 via-cyber-surface to-cyber-surface border-cyber-blue/40 hover:border-cyber-blue hover:shadow-neon-blue'
                }`}
              >
                <div>
                  {/* Top Badge & Rank Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2.5 rounded-xl border ${
                      isFirst
                        ? 'bg-amber-400/15 border-amber-400/40 text-amber-400'
                        : isSecond
                        ? 'bg-cyber-green/15 border-cyber-green/40 text-cyber-green'
                        : 'bg-cyber-blue/15 border-cyber-blue/40 text-cyber-blue'
                    }`}>
                      <Trophy className="w-6 h-6" />
                    </div>

                    <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-full border ${
                      isFirst
                        ? 'bg-amber-400/15 text-amber-300 border-amber-400/40'
                        : isSecond
                        ? 'bg-cyber-green/15 text-cyber-green border-cyber-green/40'
                        : 'bg-cyber-blue/15 text-cyber-blue border-cyber-blue/40'
                    }`}>
                      {item.rankBadge}
                    </span>
                  </div>

                  {/* Title & Host */}
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-cyber-green transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="text-xs font-mono text-slate-400 mt-1 flex items-center gap-1.5">
                    <Flag className="w-3.5 h-3.5 text-slate-500" />
                    <span>Host / Platform: <strong className="text-slate-200">{item.issuerOrHost}</strong></span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Platforms / Challenge Topics */}
                <div className="mt-6 pt-4 border-t border-cyber-cardBorder/60">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-2">
                    {item.category === 'National CTF' ? 'Competency Areas:' : 'Challenge Domains:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.platformsOrTopics?.map((topic, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded bg-cyber-card border border-cyber-cardBorder text-[11px] font-mono text-slate-200"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* CTF Philosophy Callout */}
        <div className="mt-10 p-5 rounded-xl bg-cyber-surface/60 border border-cyber-cardBorder/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyber-card text-cyber-green shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <p className="text-slate-300">
              Active competitor in Capture The Flag tournaments. Solving challenges across web vulnerabilities, forensic artifact extraction, and cryptography.
            </p>
          </div>
          <div className="text-slate-400 shrink-0">
            Rankings and standings recorded as verified.
          </div>
        </div>

      </div>
    </section>
  );
};
