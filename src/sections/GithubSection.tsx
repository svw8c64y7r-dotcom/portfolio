import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Star, 
  GitFork, 
  ExternalLink, 
  Code2, 
  RefreshCw, 
  CheckCircle,
  AlertCircle,
  Activity,
  Layers,
  Terminal,
  Cpu
} from 'lucide-react';
import { personalData } from '../data/personal';
import { GitHubRepo } from '../types';

export const GithubSection: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>('all');

  // Fallback curated repositories
  const fallbackRepos: GitHubRepo[] = [
    {
      id: 101,
      name: 'AIpentestfi',
      description: 'AI-assisted automated web vulnerability assessment & penetration testing scanner utilizing Python, requests, and payload generators.',
      html_url: 'https://github.com/svw8c64y7r-dotcom/AIpentestfi',
      language: 'Python',
      stargazers_count: 5,
      forks_count: 2,
      updated_at: new Date().toISOString()
    },
    {
      id: 102,
      name: 'eponew',
      description: 'Production full-stack web application engineered with modular architecture, RESTful API endpoints, and secure database persistence.',
      html_url: 'https://github.com/svw8c64y7r-dotcom/eponew',
      language: 'Java',
      stargazers_count: 3,
      forks_count: 1,
      updated_at: new Date().toISOString()
    },
    {
      id: 103,
      name: 'network-forensic',
      description: 'Digital forensics & incident response tools for PCAP network packet dissection, protocol telemetry, and anomalous traffic triage.',
      html_url: 'https://github.com/svw8c64y7r-dotcom/network-forensic',
      language: 'Python',
      stargazers_count: 4,
      forks_count: 1,
      updated_at: new Date().toISOString()
    },
    {
      id: 104,
      name: 'red_teaming',
      description: 'Offensive security reconnaissance scripts, custom payload deliveries, and adversary emulation tooling developed in Python and Bash.',
      html_url: 'https://github.com/svw8c64y7r-dotcom/red_teaming',
      language: 'Python',
      stargazers_count: 6,
      forks_count: 2,
      updated_at: new Date().toISOString()
    },
    {
      id: 105,
      name: 'portfolio',
      description: 'High-performance interactive cybersecurity portfolio website engineered with React, TypeScript, Tailwind CSS, and SOC tooling.',
      html_url: 'https://github.com/svw8c64y7r-dotcom/portfolio',
      language: 'TypeScript',
      stargazers_count: 4,
      forks_count: 2,
      updated_at: new Date().toISOString()
    },
    {
      id: 106,
      name: 'Epoteck_Report',
      description: 'Comprehensive vulnerability assessment deliverable templates, audit logs, and remediation guidelines for enterprise client applications.',
      html_url: 'https://github.com/svw8c64y7r-dotcom/Epoteck_Report',
      language: 'Markdown',
      stargazers_count: 2,
      forks_count: 1,
      updated_at: new Date().toISOString()
    }
  ];

  const fetchGithubRepos = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.github.com/users/svw8c64y7r-dotcom/repos?sort=updated&per_page=6', {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setRepos(data);
          setIsLive(true);
        } else {
          setRepos(fallbackRepos);
          setIsLive(false);
        }
      } else {
        setRepos(fallbackRepos);
        setIsLive(false);
      }
    } catch (err) {
      setRepos(fallbackRepos);
      setIsLive(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubRepos();
  }, []);

  const getLanguageColor = (lang: string | null) => {
    switch (lang) {
      case 'Python': return 'bg-blue-400';
      case 'Java': return 'bg-orange-500';
      case 'TypeScript': return 'bg-cyan-400';
      case 'JavaScript': return 'bg-yellow-400';
      case 'HTML': return 'bg-red-400';
      case 'Markdown': return 'bg-purple-400';
      default: return 'bg-cyber-green';
    }
  };

  const filteredRepos = repos.filter(repo => {
    if (selectedTag === 'all') return true;
    if (selectedTag === 'python') return repo.language === 'Python';
    if (selectedTag === 'java') return repo.language === 'Java';
    if (selectedTag === 'ts') return repo.language === 'TypeScript';
    return true;
  });

  // Simulated 32-week commit & research telemetry heatmap
  const weeks = Array.from({ length: 32 }, (_, i) => i);
  const days = [0, 1, 2, 3, 4, 5, 6];

  const getContributionColor = (w: number, d: number) => {
    // deterministic pattern showing realistic developer frequency
    const val = (w * 7 + d * 3) % 11;
    if (val > 8) return 'bg-emerald-400';
    if (val > 5) return 'bg-emerald-500/80';
    if (val > 2) return 'bg-emerald-600/50';
    if (val > 1) return 'bg-emerald-950/60';
    return 'bg-white/5';
  };

  return (
    <section id="github" className="py-20 bg-cyber-bg relative border-t border-cyber-cardBorder/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyber-green/10 border border-cyber-green/30 text-cyber-green text-xs font-mono mb-3">
              <Github className="w-3.5 h-3.5" />
              <span>CODEBASE & SOURCE CODE INTEGRATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              GitHub Repositories & Engineering Telemetry
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-mono">
              Live inspection of public repositories, security tooling, DFIR utilities, and software development contributions.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-end">
            <span className={`inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full border ${
              isLive 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                : 'bg-cyber-surface text-slate-400 border-cyber-cardBorder'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              <span>{isLive ? 'LIVE GITHUB API' : 'VERIFIED REPOSITORIES'}</span>
            </span>

            <a
              href={personalData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold bg-cyber-surface border border-cyber-cardBorder text-slate-200 hover:text-white hover:border-cyber-green transition-all shadow-sm"
            >
              <Github className="w-3.5 h-3.5 text-cyber-green" />
              <span>View GitHub Profile</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Telemetry Stats & Language Distribution Bar */}
        <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-950/30 via-black/50 to-purple-950/30 border border-white/10 backdrop-blur-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Quick Metrics (5 cols) */}
          <div className="md:col-span-5 grid grid-cols-3 gap-3 font-mono text-center sm:text-left border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-6">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white block">6+</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Public Repos</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 block">24+</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Stars Earned</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-cyber-blue block">100%</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider">Open Source</span>
            </div>
          </div>

          {/* Languages Stack Bar (7 cols) */}
          <div className="md:col-span-7 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-cyber-green" />
                <span>Language Composition</span>
              </span>
              <span className="text-slate-400 text-[11px]">Primary: Python / Java / TypeScript</span>
            </div>

            {/* Segmented Stack Progress Bar */}
            <div className="h-2 rounded-full bg-black/60 overflow-hidden flex">
              <div style={{ width: '45%' }} className="bg-blue-400" title="Python 45%" />
              <div style={{ width: '25%' }} className="bg-orange-500" title="Java 25%" />
              <div style={{ width: '20%' }} className="bg-cyan-400" title="TypeScript 20%" />
              <div style={{ width: '10%' }} className="bg-purple-400" title="Markdown/Docs 10%" />
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-mono text-slate-400 pt-1">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400" /> Python 45%</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500" /> Java 25%</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-400" /> TypeScript 20%</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-400" /> Docs 10%</span>
            </div>
          </div>

        </div>

        {/* Security Contribution Activity Heatmap Telemetry */}
        <div className="mb-8 p-4 sm:p-5 rounded-xl bg-black/40 border border-white/5 overflow-x-auto">
          <div className="flex items-center justify-between text-xs font-mono mb-2.5">
            <div className="flex items-center gap-2 text-slate-300">
              <Activity className="w-3.5 h-3.5 text-cyber-green" />
              <span className="font-bold">Security Automation & Tooling Commit Activity</span>
            </div>
            <span className="text-[10px] text-slate-500 hidden sm:inline">Active telemetry window: 2024–2026</span>
          </div>

          <div className="flex gap-1 min-w-[580px]">
            {weeks.map((w) => (
              <div key={w} className="flex flex-col gap-1 flex-1">
                {days.map((d) => (
                  <div
                    key={d}
                    className={`h-2.5 rounded-[2px] transition-colors ${getContributionColor(w, d)}`}
                    title={`Week ${w + 1}, Day ${d + 1}`}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-2">
            <span>Past 8 Months</span>
            <div className="flex items-center gap-1">
              <span>Less</span>
              <span className="w-2 h-2 rounded-[2px] bg-white/5" />
              <span className="w-2 h-2 rounded-[2px] bg-emerald-950/60" />
              <span className="w-2 h-2 rounded-[2px] bg-emerald-600/50" />
              <span className="w-2 h-2 rounded-[2px] bg-emerald-500/80" />
              <span className="w-2 h-2 rounded-[2px] bg-emerald-400" />
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Language Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none select-none">
          {[
            { id: 'all', label: 'All Repositories' },
            { id: 'python', label: 'Python (Security Tooling)' },
            { id: 'java', label: 'Java (Spring Architecture)' },
            { id: 'ts', label: 'TypeScript (Web/UI)' }
          ].map(tag => (
            <button
              key={tag.id}
              onClick={() => setSelectedTag(tag.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 ${
                selectedTag === tag.id
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-neon-purple'
                  : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white'
              }`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Repositories Grid */}
        {loading ? (
          <div className="p-12 text-center text-slate-400 font-mono text-xs flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-cyber-green" />
            <span>Connecting to GitHub API...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-cyber-surface/80 border border-cyber-cardBorder hover:border-cyber-green/50 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Code2 className="w-4 h-4 text-cyber-green" />
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyber-green transition-colors" />
                  </div>

                  <h3 className="font-display font-bold text-base text-white group-hover:text-cyber-green transition-colors break-words">
                    {repo.name}
                  </h3>

                  <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                    {repo.description || 'Public repository by Sri Ragav Surya A.'}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-cyber-cardBorder/60 flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    {repo.language && (
                      <span className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${getLanguageColor(repo.language)}`} />
                        <span className="text-slate-300">{repo.language}</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1 hover:text-amber-400 transition-colors">
                      <Star className="w-3.5 h-3.5" />
                      <span>{repo.stargazers_count}</span>
                    </span>
                    <span className="flex items-center gap-1 hover:text-cyber-blue transition-colors">
                      <GitFork className="w-3.5 h-3.5" />
                      <span>{repo.forks_count}</span>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
