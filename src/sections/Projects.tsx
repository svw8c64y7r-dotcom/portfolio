import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Layers, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  X, 
  Maximize2,
  Terminal,
  Activity,
  ArrowRight
} from 'lucide-react';
import { projectsData } from '../data/projects';
import { Project } from '../types';
import { useOperatorMode } from '../context/OperatorModeContext';

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { mode, setMode } = useOperatorMode();

  const filterTabs = [
    { id: 'all', label: 'All Projects & Labs' },
    { id: 'dev', label: 'Security Software & Tools' },
    { id: 'lab', label: 'Practical Labs & Exercises' }
  ];

  const filteredProjects = projectsData.filter(project => {
    // Operator Mode filter
    if (mode === 'red' && !['web-vulnerability-scanner', 'owasp-top-10-assessment'].includes(project.id)) {
      return false;
    }
    if (mode === 'blue' && !['security-monitoring-soc-lab', 'epoteck-fullstack'].includes(project.id)) {
      return false;
    }
    if (mode === 'dfir' && !['digital-forensics-lab'].includes(project.id)) {
      return false;
    }

    if (activeFilter === 'dev') return !project.isLabWork;
    if (activeFilter === 'lab') return project.isLabWork;
    return true;
  });

  const projectImages: Record<string, string> = {
    'web-vulnerability-scanner': '/projects/project-1.png',
    'epoteck-fullstack': '/projects/project-2.png',
    'owasp-top-10-assessment': '/cards/card-2.png',
    'digital-forensics-lab': '/cards/card-3.png',
    'security-monitoring-soc-lab': '/cards/card-4.png'
  };

  return (
    <section id="projects" className="py-20 bg-[#110720] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>SECURITY WORK & LAB BENCHMARKS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              Featured Projects & Labs
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-mono">
              Engineered security scanners, full-stack architectures, and practical DFIR/SOC laboratory investigations.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10 self-start md:self-end">
            {filterTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeFilter === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-neon-purple'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Projects Staggered Alternating Layout (Template Signature) */}
        <div className="space-y-16">
          {filteredProjects.map((project, index) => {
            const isEven = index % 2 === 1;
            const imgSrc = projectImages[project.id] || '/projects/project-1.png';

            return (
              <div key={project.id} className="relative">
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${isEven ? 'lg:grid-flow-dense' : ''}`}>
                  
                  {/* Text Description Overlap Column */}
                  <div className={`lg:col-span-7 z-10 ${isEven ? 'lg:col-start-6' : 'lg:col-start-1'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border ${
                        project.isLabWork
                          ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                          : 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                      }`}>
                        {project.isLabWork ? 'PRACTICAL LAB EXERCISE' : 'FEATURED PROJECT'}
                      </span>
                      {project.year && (
                        <span className="text-xs font-mono text-slate-400">
                          {project.year}
                        </span>
                      )}
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-4 hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>

                    {/* Glassmorphic Overlapping Card */}
                    <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl relative">
                      <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-4">
                        {project.description}
                      </p>

                      <div className="space-y-1.5 pt-3 border-t border-white/10">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300 block mb-1">
                          Core Capabilities:
                        </span>
                        {project.highlights.slice(0, 3).map((h, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2 text-xs text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech Pills */}
                      <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-white/10">
                        {project.technologies.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-0.5 rounded bg-black/40 border border-white/10 text-[11px] font-mono text-slate-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div className="flex items-center gap-3 mt-4">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-mono font-bold bg-white/10 border border-white/20 text-white hover:bg-purple-600 hover:border-purple-500 transition-all"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-purple-400 transition-colors"
                          title="View on GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Image/Visual Mockup Column */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-8'}`}>
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 p-2 border border-white/10 shadow-2xl group cursor-pointer" onClick={() => setSelectedProject(project)}>
                      <div className="relative w-full h-full rounded-xl overflow-hidden bg-purple-950/20 flex items-center justify-center">
                        <img
                          src={imgSrc}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#110720] via-transparent to-transparent opacity-60" />
                        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-[11px] font-mono text-slate-300 bg-[#110720]/80 backdrop-blur-sm p-2 rounded-lg border border-white/10">
                          <span className="truncate">{project.tag}</span>
                          <span className="text-purple-400 shrink-0 flex items-center gap-1">
                            <span>Inspect</span>
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Project Details Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#110720] border border-white/20 rounded-2xl shadow-2xl overflow-y-auto font-sans flex flex-col">
              
              {/* Modal Header */}
              <div className="sticky top-0 bg-[#110720]/98 backdrop-blur px-6 py-4 border-b border-white/10 flex items-center justify-between z-10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-purple-400 font-semibold">
                      {selectedProject.tag}
                    </span>
                    {selectedProject.year && (
                      <span className="text-xs font-mono text-slate-400">
                        • {selectedProject.year}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-0.5">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                
                {selectedProject.isLabWork && (
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-200">
                      <span className="font-bold">Practical Lab Exercise:</span> Conducted as practical security laboratories. Comprehensive sanitized reports and findings are securely maintained in laboratory archives.
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider mb-2">
                    Problem Statement & Scope
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed bg-white/5 p-3.5 rounded-xl border border-white/10">
                    {selectedProject.problemStatement}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold text-cyber-green uppercase tracking-wider mb-2">
                    Implementation Details & Methodology
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.implementationDetails.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold text-cyber-blue uppercase tracking-wider mb-2">
                    Results & Assessment Summary
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed bg-white/5 p-3.5 rounded-xl border border-white/10">
                    {selectedProject.resultsOrStatus}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Technologies & Tools Utilized
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-md bg-black/40 border border-white/10 text-xs font-mono text-slate-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-[#110720]/98 backdrop-blur px-6 py-4 border-t border-white/10 flex items-center justify-between gap-3">
                <span className="text-xs font-mono text-slate-400">
                  {selectedProject.isLabWork ? 'Lab Environment: Isolated Sandbox' : 'Repository: Open Source'}
                </span>
                <div className="flex items-center gap-3">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 transition-colors shadow-neon-purple"
                    >
                      <Github className="w-4 h-4" />
                      <span>View on GitHub</span>
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 rounded-lg text-xs font-mono font-medium bg-white/5 border border-white/10 text-slate-300 hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
