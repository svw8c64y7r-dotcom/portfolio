import React, { useState } from 'react';
import { 
  Award, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  ExternalLink, 
  Upload, 
  FileCheck, 
  Info,
  CheckCircle2,
  X
} from 'lucide-react';
import { certificationsData } from '../data/certifications';
import { Certification } from '../types';

export const Certifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const getBadgeTypeColor = (type: string) => {
    switch (type) {
      case 'Security':
        return 'text-cyber-green bg-cyber-green/10 border-cyber-green/30';
      case 'Network':
        return 'text-cyber-blue bg-cyber-blue/10 border-cyber-blue/30';
      case 'Hardware':
        return 'text-amber-400 bg-amber-400/10 border-amber-400/30';
      case 'Programming':
        return 'text-cyber-purple bg-cyber-purple/10 border-cyber-purple/30';
      default:
        return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30';
    }
  };

  return (
    <section id="certifications" className="py-20 bg-[#110720] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>INDUSTRY CREDENTIALS & TECHNICAL TRAINING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
            Certifications & Training
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-mono">
            Professional certifications and coursework in social engineering defense, networking, system architecture, and development.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificationsData.map((cert) => {
            const isCompleted = cert.status === 'Completed' || cert.status === 'Verified';

            return (
              <div
                key={cert.id}
                className="rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 hover:border-purple-500/40 p-6 flex flex-col justify-between transition-all duration-300 group shadow-lg backdrop-blur-md"
              >
                <div>
                  {/* Status & Category Bar */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-medium ${getBadgeTypeColor(cert.badgeType)}`}>
                      {cert.badgeType}
                    </span>

                    <span className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full border ${
                      isCompleted 
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    }`}>
                      {isCompleted ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>{cert.status}</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span>{cert.status}</span>
                        </>
                      )}
                    </span>
                  </div>

                  {/* Title & Issuer */}
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-purple-300 transition-colors leading-snug">
                    {cert.title}
                  </h3>
                  
                  <div className="text-xs font-mono text-cyber-blue mt-1">
                    Issued / Coursework by: <strong className="text-slate-200">{cert.issuer}</strong>
                  </div>

                  {/* Verification Note */}
                  <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                    {cert.verificationNote}
                  </p>
                </div>

                {/* Card Action / Verification Placeholder */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-300 hover:text-purple-300 transition-colors"
                  >
                    <Info className="w-3.5 h-3.5 text-purple-400" />
                    <span>View Credential Details</span>
                  </button>

                  <span className="text-[10px] font-mono text-slate-500">
                    ID: {cert.id}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* User Configuration & Upload Placeholder Notice */}
        <div className="mt-12 p-5 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-black/40 border border-white/10 text-purple-400 shrink-0">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-100 font-display">
                Configurable Certificate Vault
              </h4>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Certificate images and external verification badges can be configured in <code className="text-purple-300 bg-black/40 px-1 py-0.5 rounded border border-white/10">src/data/certifications.ts</code>. No unverified IDs are generated.
              </p>
            </div>
          </div>
        </div>

        {/* Modal for credential view / info */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-lg bg-[#0e061a] border border-white/10 rounded-2xl shadow-2xl p-6 font-mono text-xs text-slate-200">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-purple-300 font-bold text-sm">Credential Information</span>
                <button onClick={() => setSelectedCert(null)} className="p-1 hover:text-white text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 pt-4 text-slate-300">
                <p><strong className="text-white">Title:</strong> {selectedCert.title}</p>
                <p><strong className="text-white">Issuing Organization:</strong> {selectedCert.issuer}</p>
                <p><strong className="text-white">Status:</strong> {selectedCert.status}</p>
                <p><strong className="text-white">Curriculum Focus:</strong> {selectedCert.verificationNote}</p>
                <div className="p-3 bg-black/40 rounded-xl border border-white/10 text-slate-400 text-[11px]">
                  [i] Formal certificate images and verification hashes can be attached directly to the portfolio repository upon credential issuance.
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
