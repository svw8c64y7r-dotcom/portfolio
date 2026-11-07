import React, { useState } from 'react';
import { 
  FileCheck2, 
  Download, 
  ShieldAlert, 
  ShieldCheck, 
  ExternalLink, 
  ChevronRight, 
  AlertTriangle, 
  Bug, 
  CheckCircle2, 
  Terminal,
  Activity,
  Layers,
  X
} from 'lucide-react';
import { vaptAssessmentData, VulnerabilityFinding } from '../data/vaptReports';

export const VaptReport: React.FC = () => {
  const [selectedFinding, setSelectedFinding] = useState<VulnerabilityFinding | null>(null);
  const [activeSeverityFilter, setActiveSeverityFilter] = useState<string>('All');

  const assessment = vaptAssessmentData;

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-500/20 text-red-400 border-red-500/40';
      case 'High':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
      case 'Medium':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Low':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
      default:
        return 'bg-slate-500/20 text-slate-300 border-slate-500/40';
    }
  };

  const filteredFindings = assessment.findings.filter(f => {
    if (activeSeverityFilter === 'All') return true;
    return f.severity === activeSeverityFilter;
  });

  return (
    <section id="vapt" className="py-20 bg-[#0e061a] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
              <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
              <span>OFFENSIVE SECURITY ASSESSMENT DELIVERABLE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              VAPT Security Assessment Report
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-mono">
              Audited web application vulnerability assessment following OWASP WSTG v4.2 methodology with verified technical Proof of Concepts and CVSS 3.1 scoring.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            <a
              href={assessment.reportDownloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 transition-all shadow-neon-purple"
            >
              <Download className="w-4 h-4" />
              <span>View Report Deliverable</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Assessment Scope & Methodology Card */}
        <div className="mb-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-b border-white/10 pb-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 block mb-1">
                Assessment Title & Type:
              </span>
              <div className="text-base font-bold text-white font-display">
                {assessment.assessmentTitle}
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                {assessment.assessmentType}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 block mb-1">
                Target Perimeter Scope:
              </span>
              <div className="text-sm font-semibold text-slate-200 font-mono">
                {assessment.targetScope}
              </div>
              <div className="text-xs text-cyber-blue font-mono mt-0.5">
                Period: {assessment.dateConducted}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 block mb-1">
                Testing Standard:
              </span>
              <div className="text-sm font-semibold text-slate-200">
                {assessment.methodology}
              </div>
              <div className="text-xs text-emerald-400 font-mono mt-0.5">
                Standard: NIST SP 800-115 Compliant
              </div>
            </div>
          </div>

          {/* Severity Statistics Pill Bar */}
          <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Vulnerability Severity Breakdown:
            </span>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveSeverityFilter('All')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
                  activeSeverityFilter === 'All' ? 'bg-purple-600 text-white font-bold' : 'bg-white/5 text-slate-300'
                }`}
              >
                All ({assessment.findings.length})
              </button>

              <button
                onClick={() => setActiveSeverityFilter('High')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
                  activeSeverityFilter === 'High' ? 'bg-orange-500 text-white font-bold' : 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
                }`}
              >
                High: {assessment.statistics.high}
              </button>

              <button
                onClick={() => setActiveSeverityFilter('Medium')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
                  activeSeverityFilter === 'Medium' ? 'bg-amber-500 text-black font-bold' : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                }`}
              >
                Medium: {assessment.statistics.medium}
              </button>

              <button
                onClick={() => setActiveSeverityFilter('Low')}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
                  activeSeverityFilter === 'Low' ? 'bg-blue-500 text-white font-bold' : 'bg-blue-500/10 text-blue-300 border border-blue-500/30'
                }`}
              >
                Low: {assessment.statistics.low}
              </button>
            </div>
          </div>
        </div>

        {/* Findings List */}
        <div className="space-y-4">
          {filteredFindings.map((finding) => (
            <div
              key={finding.id}
              onClick={() => setSelectedFinding(finding)}
              className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-purple-950/40 to-slate-950 border border-white/10 hover:border-purple-500/50 transition-all duration-200 cursor-pointer group shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono text-purple-400 font-bold">
                    {finding.id}
                  </span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border uppercase ${getSeverityStyle(finding.severity)}`}>
                    {finding.severity}
                  </span>
                  <span className="text-xs font-mono font-bold text-purple-300 bg-black/40 px-2 py-0.5 rounded border border-white/10">
                    CVSS {finding.cvssScore}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    • {finding.category}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-white group-hover:text-purple-300 transition-colors">
                  {finding.title}
                </h3>

                <p className="text-xs text-slate-400 font-mono">
                  Affected Endpoint: <code className="text-slate-200 bg-white/5 px-1 py-0.5 rounded">{finding.affectedComponent}</code>
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                <span className="text-xs font-mono text-purple-400 font-semibold group-hover:text-purple-300 flex items-center gap-1">
                  <span>Inspect PoC & Remediation</span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Finding Inspector Modal */}
        {selectedFinding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#110720] border border-white/20 rounded-2xl shadow-2xl overflow-y-auto font-sans flex flex-col">
              
              {/* Modal Header */}
              <div className="sticky top-0 bg-[#110720]/98 backdrop-blur px-6 py-4 border-b border-white/10 flex items-center justify-between z-10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-purple-400 font-bold">{selectedFinding.id}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase ${getSeverityStyle(selectedFinding.severity)}`}>
                      {selectedFinding.severity}
                    </span>
                    <span className="text-xs font-mono text-white font-bold bg-purple-600/30 px-2 py-0.5 rounded">
                      CVSS 3.1: {selectedFinding.cvssScore}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                    {selectedFinding.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedFinding(null)}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6 text-sm text-slate-200">
                {/* CVSS Vector String */}
                <div className="p-3 bg-black/50 border border-white/10 rounded-xl font-mono text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span><strong className="text-purple-300">CVSS v3.1 Vector:</strong> {selectedFinding.cvssVector}</span>
                  <span className="text-emerald-400 font-bold">{selectedFinding.status}</span>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300 mb-2">
                    Vulnerability Description & Root Cause
                  </h4>
                  <p className="bg-white/5 p-4 rounded-xl border border-white/10 leading-relaxed text-xs sm:text-sm text-slate-300">
                    {selectedFinding.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400 mb-2">
                    Security Impact
                  </h4>
                  <p className="bg-white/5 p-4 rounded-xl border border-white/10 leading-relaxed text-xs sm:text-sm text-slate-300">
                    {selectedFinding.impact}
                  </p>
                </div>

                {/* Technical Proof of Concept */}
                {selectedFinding.pocSnippet && (
                  <div>
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyber-green mb-2 flex items-center gap-1.5">
                      <Terminal className="w-4 h-4 text-cyber-green" />
                      <span>Technical Proof of Concept (PoC)</span>
                    </h4>
                    <div className="space-y-2">
                      <div className="text-[11px] font-mono text-slate-400">Captured HTTP Request:</div>
                      <pre className="p-3.5 rounded-xl bg-black/80 border border-white/10 text-xs font-mono text-cyber-green overflow-x-auto whitespace-pre">
                        {selectedFinding.pocSnippet.request}
                      </pre>
                      <div className="text-[11px] font-mono text-slate-400 pt-1">Server Response Verification:</div>
                      <pre className="p-3.5 rounded-xl bg-black/80 border border-white/10 text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre">
                        {selectedFinding.pocSnippet.response}
                      </pre>
                    </div>
                  </div>
                )}

                {/* Prioritized Remediation */}
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Developer Remediation Guidelines</span>
                  </h4>
                  <ul className="space-y-2">
                    {selectedFinding.remediation.map((r, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200 bg-white/5 p-3 rounded-xl border border-white/5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-[#110720]/98 backdrop-blur px-6 py-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Standard: OWASP WSTG v4.2</span>
                <button
                  onClick={() => setSelectedFinding(null)}
                  className="px-5 py-2 rounded-xl text-xs font-mono font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  Close Finding
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};

