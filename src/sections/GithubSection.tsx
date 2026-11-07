import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Star, 
  GitFork, 
  ExternalLink, 
  Code2, 
  RefreshCw, 
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { personalData } from '../data/personal';
import { GitHubRepo } from '../types';

export const GithubSection: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  // Fallback curated repositories in case of GitHub rate limiting or network issues
  const fallbackRepos: GitHubRepo[] = [
    {
      id: 101,
      name: 'Advanced-Web-Vulnerability-Scanner',
      description: 'Python-based automated security testing scanner with configurable crawler, SQLi and XSS detection modules.',
      html_url: 'https://github.com/svw8c64y7r-dotcom',
      language: 'Python',
      stargazers_count: 5,
      forks_count: 2,
      updated_at: new Date().toISOString()
    },
    {
      id: 102,
      name: 'Epoteck-Fullstack-App',
      description: 'Enterprise full-stack web application designed with Spring Framework, REST APIs, and secure authentication architecture.',
      html_url: 'https://github.com/svw8c64y7r-dotcom',
      language: 'Java',
      stargazers_count: 4,
      forks_count: 1,
      updated_at: new Date().toISOString()
    },
    {
      id: 103,
      name: 'Security-Automation-Playwright',
      description: 'End-to-end browser automation workflows and automated security verification scripts with Playwright.',
      html_url: 'https://github.com/svw8c64y7r-dotcom',
      language: 'TypeScript',
      stargazers_count: 3,
      forks_count: 1,
      updated_at: new Date().toISOString()
    },
    {
      id: 104,
      name: 'DFIR-Analysis-Utilities',
      description: 'Forensic parsing helpers for memory dump triage, Windows event log analysis, and network PCAP inspection.',
      html_url: 'https://github.com/svw8c64y7r-dotcom',
      language: 'Python',
      stargazers_count: 6,
      forks_count: 2,
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
      default: return 'bg-cyber-green';
    }
  };

  return (
    <section id="github" className="py-20 bg-cyber-bg relative border-t border-cyber-cardBorder/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyber-green/10 border border-cyber-green/30 text-cyber-green text-xs font-mono mb-3">
              <Github className="w-3.5 h-3.5" />
              <span>CODEBASE & SOURCE CODE INTEGRATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              GitHub Repositories
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-mono">
              Live inspection of public repositories, security tools, and software contributions.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-end">
            <span className={`inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full border ${
              isLive 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                : 'bg-cyber-surface text-slate-400 border-cyber-cardBorder'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              <span>{isLive ? 'LIVE GITHUB API' : 'CURATED REPOSITORIES'}</span>
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

        {/* Repositories Grid */}
        {loading ? (
          <div className="p-12 text-center text-slate-400 font-mono text-xs flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-cyber-green" />
            <span>Connecting to GitHub API...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
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
