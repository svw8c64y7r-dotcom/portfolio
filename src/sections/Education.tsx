import React from 'react';
import { 
  GraduationCap, 
  Calendar, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Building2,
  Sparkles
} from 'lucide-react';
import { educationData } from '../data/education';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-20 bg-cyber-bg relative border-t border-cyber-cardBorder/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyber-blue/10 border border-cyber-blue/30 text-cyber-blue text-xs font-mono mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>ACADEMIC FOUNDATION & DEGREES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Academic Qualifications
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-mono">
            Formal education specialized exclusively in Information Security, Digital Forensics, and cyber investigations.
          </p>
        </div>

        {/* Education Timeline */}
        <div className="relative pl-6 sm:pl-8 space-y-8 before:content-[''] before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-cyber-blue before:via-cyber-green before:to-transparent">
          {educationData.map((edu, idx) => {
            const isPostgraduate = edu.level === 'Postgraduate';

            return (
              <div key={idx} className="relative group">
                {/* Timeline Dot */}
                <div className={`absolute -left-[27px] sm:-left-[31px] top-1.5 w-5 h-5 rounded-full bg-cyber-surface border-2 flex items-center justify-center ${
                  isPostgraduate ? 'border-cyber-blue shadow-neon-blue' : 'border-cyber-green shadow-neon-green'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isPostgraduate ? 'bg-cyber-blue animate-pulse' : 'bg-cyber-green'}`} />
                </div>

                {/* Academic Card */}
                <div className="p-6 sm:p-8 rounded-2xl bg-cyber-surface/90 border border-cyber-cardBorder hover:border-cyber-blue/40 transition-all duration-300 shadow-xl backdrop-blur-sm">
                  
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyber-cardBorder/80 pb-5">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-medium ${
                          isPostgraduate 
                            ? 'bg-cyber-blue/15 text-cyber-blue border-cyber-blue/40' 
                            : 'bg-cyber-green/15 text-cyber-green border-cyber-green/40'
                        }`}>
                          {edu.level} DEGREE
                        </span>
                        <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                          edu.status === 'Pursuing' ? 'bg-amber-400/10 text-amber-300 border border-amber-400/30' : 'bg-emerald-400/10 text-emerald-300 border border-emerald-400/30'
                        }`}>
                          {edu.status}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-xl sm:text-2xl text-white mt-1.5">
                        {edu.degree}
                      </h3>

                      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 font-mono mt-1">
                        <Building2 className="w-4 h-4 text-cyber-blue shrink-0" />
                        <span>{edu.institution}</span>
                      </div>
                    </div>

                    {/* Duration & CGPA Badges */}
                    <div className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0">
                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyber-card border border-cyber-cardBorder text-xs font-mono text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-cyber-blue" />
                        <span>{edu.duration}</span>
                      </div>

                      <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-bold text-emerald-400">
                        <Award className="w-3.5 h-3.5" />
                        <span>CGPA: {edu.cgpa}</span>
                      </div>
                    </div>
                  </div>

                  {/* Curriculum & Focus Highlights */}
                  <div className="mt-6 space-y-3">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-cyber-blue" />
                      <span>Specialized Curriculum & Core Domains:</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {edu.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2.5 text-xs text-slate-200 bg-cyber-card/50 p-2.5 rounded-lg border border-cyber-cardBorder">
                          <CheckCircle2 className="w-4 h-4 text-cyber-blue shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
