import React, { useState } from 'react';
import { 
  FileSearch, 
  Tag, 
  Calendar, 
  Terminal, 
  Wrench, 
  Clock, 
  Sparkles, 
  X, 
  ArrowRight,
  BookOpen,
  Layers,
  ChevronRight
} from 'lucide-react';
import { researchArticles, researchCategories } from '../data/research';
import { ResearchArticle } from '../types';

export const Research: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [activeArticle, setActiveArticle] = useState<ResearchArticle | null>(null);

  const filteredArticles = researchArticles.filter(art => {
    if (selectedCategory === 'All Categories') return true;
    return art.category === selectedCategory;
  });

  return (
    <section id="research" className="py-20 bg-cyber-bg relative border-t border-cyber-cardBorder/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyber-purple/10 border border-cyber-purple/30 text-cyber-purple text-xs font-mono mb-3">
              <FileSearch className="w-3.5 h-3.5" />
              <span>TECHNICAL PUBLICATIONS & WRITE-UPS ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              Security Research & Write-Ups
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-mono">
              Technical publication hub designed for in-depth vulnerability research, CTF write-ups, DFIR breakdowns, and automation architectures.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5 bg-cyber-surface px-3 py-1.5 rounded-lg border border-cyber-cardBorder self-start md:self-end">
            <Clock className="w-3.5 h-3.5 text-cyber-purple" />
            <span>Structured Publication Blueprints</span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none select-none">
          {researchCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-cyber-purple text-white font-bold shadow-neon-purple'
                  : 'bg-cyber-surface border border-cyber-cardBorder text-slate-300 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Research Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="rounded-2xl bg-cyber-surface/80 border border-cyber-cardBorder hover:border-cyber-purple/50 p-6 flex flex-col justify-between transition-all duration-300 group shadow-lg"
            >
              <div>
                {/* Status & Category */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-purple/15 text-cyber-purple border border-cyber-purple/30 uppercase">
                    {article.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-cyber-blue" />
                    <span>{article.datePlaceholder}</span>
                  </span>
                </div>

                {/* Article Title */}
                <h3 className="font-display font-bold text-lg text-white group-hover:text-cyber-purple transition-colors leading-snug">
                  {article.title}
                </h3>

                {/* Summary */}
                <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                  {article.summary}
                </p>

                {/* Planned Methodology Preview */}
                <div className="mt-4 p-3 rounded-xl bg-cyber-card/60 border border-cyber-cardBorder/60">
                  <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Methodology Blueprint:
                  </div>
                  <p className="text-xs text-slate-300">
                    {article.methodologyOverview}
                  </p>
                </div>
              </div>

              {/* Tools & CTA */}
              <div className="mt-6 pt-4 border-t border-cyber-cardBorder/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {article.tools.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-cyber-card border border-cyber-cardBorder text-[10px] font-mono text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setActiveArticle(article)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-cyber-purple hover:text-white transition-colors self-end sm:self-center"
                >
                  <span>Inspect Blueprint</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Article Blueprint View */}
        {activeArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="relative w-full max-w-2xl bg-cyber-surface border border-cyber-cardBorder rounded-2xl shadow-2xl p-6 sm:p-8 font-sans max-h-[90vh] overflow-y-auto">
              
              <div className="flex justify-between items-start border-b border-cyber-cardBorder pb-4">
                <div>
                  <span className="text-xs font-mono text-cyber-purple font-semibold uppercase">
                    {activeArticle.category} • {activeArticle.datePlaceholder}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                    {activeArticle.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5 pt-5 text-sm text-slate-300">
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyber-blue mb-1">
                    Technical Scope & Abstract
                  </h4>
                  <p className="bg-cyber-card/60 p-3.5 rounded-xl border border-cyber-cardBorder leading-relaxed">
                    {activeArticle.summary}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyber-green mb-1">
                    Testing Methodology & Setup
                  </h4>
                  <p className="bg-cyber-card/60 p-3.5 rounded-xl border border-cyber-cardBorder leading-relaxed">
                    {activeArticle.methodologyOverview}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyber-purple mb-1">
                    Intended Findings & Key Remediation Guidance
                  </h4>
                  <p className="bg-cyber-card/60 p-3.5 rounded-xl border border-cyber-cardBorder leading-relaxed">
                    {activeArticle.intendedFindings}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Security Toolchain
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeArticle.tools.map((tool, idx) => (
                      <span key={idx} className="px-3 py-1 rounded bg-cyber-card border border-cyber-cardBorder text-xs font-mono text-slate-200">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-cyber-purple/10 border border-cyber-purple/30 rounded-xl text-xs text-cyber-purple font-mono">
                  [!] This publication card is formatted as a research blueprint. Full technical papers with raw capture screenshots and sanitized PoCs will be linked upon release.
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-cyber-cardBorder flex justify-end">
                <button
                  onClick={() => setActiveArticle(null)}
                  className="px-5 py-2 rounded-lg bg-cyber-card border border-cyber-cardBorder text-xs font-mono text-slate-200 hover:text-white"
                >
                  Close Blueprint
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
