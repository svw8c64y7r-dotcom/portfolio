import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Wrench, 
  Building2,
  FileText,
  Users,
  ExternalLink
} from 'lucide-react';
import { experienceData } from '../data/experience';

export const Experience: React.FC = () => {
  const pitowingsCards = [
    {
      id: 1,
      title: "Manual Web VAPT & Security Testing",
      description: "Performed rigorous manual testing and Vulnerability Assessment and Penetration Testing (VAPT) on production web applications using industry-grade frameworks.",
      icon: "/cards/card-1.png"
    },
    {
      id: 2,
      title: "OWASP Top 10 & Business Logic Auditing",
      description: "Employed Burp Suite, Nmap, and Dirb to discover OWASP Top 10 injection weaknesses, authentication bypasses, and complex business logic flaws.",
      icon: "/cards/card-2.png"
    },
    {
      id: 3,
      title: "Risk Classification & PoC Preparation",
      description: "Authored comprehensive security assessment reports, classifying technical findings with standard risk ratings and reproducible Proof of Concepts (PoCs).",
      icon: "/cards/card-3.png"
    },
    {
      id: 4,
      title: "Remediation & Developer Collaboration",
      description: "Formulated prioritized remediation recommendations and communicated technical risk findings directly to engineering teams to facilitate rapid patch verification.",
      icon: "/cards/card-4.png"
    }
  ];

  return (
    <section id="experience" className="py-20 bg-[#110720] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>INDUSTRY WORK EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Work Experience
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-mono">
            Direct industry tenure conducting manual web vulnerability assessments, penetration testing, and developer remediation.
          </p>
        </div>

        {/* Primary Role Overview Card */}
        <div className="mb-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-950 via-purple-950/70 to-slate-950 border-t-4 border-purple-600 border-x border-b border-white/10 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display font-bold text-2xl text-white">
                  Cyber Security Engineer
                </h3>
                <span className="px-3 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-mono">
                  Full-Time Industrial Role
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-300 font-mono mt-1.5 flex-wrap">
                <span className="text-purple-400 font-bold flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" />
                  Pitowings
                </span>
                <span className="text-slate-400 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  India
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300 self-start sm:self-center">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span>February 2025 – May 2025</span>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyber-green" />
              <span>Key Responsibilities & Deliverables:</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {experienceData[0].responsibilities.map((resp, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 text-xs sm:text-sm text-slate-200 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-cyber-green shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1 mr-1">
              <Wrench className="w-3.5 h-3.5 text-purple-400" />
              <span>Toolchain:</span>
            </span>
            {experienceData[0].toolsUsed.map((tool, tIdx) => (
              <span key={tIdx} className="px-2.5 py-1 rounded bg-black/40 border border-white/10 text-xs font-mono text-slate-200">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Template-Styled Signature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pitowingsCards.map((card) => (
            <div
              key={card.id}
              className="bg-gradient-to-r from-slate-950 via-purple-950/60 to-slate-950 backdrop-blur-sm rounded-xl p-6 border-t-4 border-purple-600 border-x border-b border-white/10 hover:shadow-2xl hover:shadow-purple-900/40 flex items-center gap-5 transition-all duration-300 group"
            >
              <div className="shrink-0 w-24 h-24 flex items-center justify-center p-2 rounded-xl bg-black/40 border border-white/10 group-hover:scale-105 transition-transform">
                <img
                  src={card.icon}
                  alt={card.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-white mb-1.5 group-hover:text-purple-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
                  {card.description}
                </p>
                <span className="text-purple-400 font-mono font-medium text-xs flex items-center gap-1 group-hover:text-purple-300">
                  <span>AUDITED IN PRODUCTION</span>
                  <span>→</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
