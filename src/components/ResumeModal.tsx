import React, { useState } from 'react';
import { 
  X, 
  Download, 
  ExternalLink, 
  FileText, 
  ShieldCheck, 
  Briefcase, 
  GraduationCap, 
  Award,
  Layers
} from 'lucide-react';
import { personalData } from '../data/personal';
import { experienceData } from '../data/experience';
import { educationData } from '../data/education';
import { achievementsData } from '../data/achievements';
import { certificationsData } from '../data/certifications';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'pdf' | 'structured'>('pdf');

  if (!isOpen) return null;

  const resumePdfPath = '/resume/Sri_Ragav_Surya_Resume.pdf';

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumePdfPath;
    link.download = 'Sri_Ragav_Surya_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenNewTab = () => {
    window.open(resumePdfPath, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#110720] border border-white/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden font-sans">
        
        {/* Modal Top Bar */}
        <div className="bg-[#110720]/98 backdrop-blur px-6 py-4 border-b border-white/10 flex items-center justify-between select-none shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                Official Resume Document
              </h3>
              <p className="text-xs font-mono text-slate-400">
                SRI RAGAV SURYA A • PDF Format Verified (159 KB)
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {/* View Mode Switcher */}
            <div className="hidden sm:flex items-center bg-white/5 p-1 rounded-lg border border-white/10 text-xs font-mono mr-2">
              <button
                onClick={() => setActiveTab('pdf')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'pdf' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                PDF View
              </button>
              <button
                onClick={() => setActiveTab('structured')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === 'structured' ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Structured Text
              </button>
            </div>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 transition-all shadow-neon-purple"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>

            <button
              onClick={handleOpenNewTab}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-purple-300 transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeTab === 'pdf' ? (
            <div className="w-full h-[65vh] rounded-xl overflow-hidden border border-white/10 bg-slate-950 flex flex-col items-center justify-center p-2">
              <object
                data={resumePdfPath}
                type="application/pdf"
                className="w-full h-full rounded border-none"
              >
                <div className="p-8 text-center space-y-4">
                  <FileText className="w-12 h-12 text-purple-400 mx-auto" />
                  <p className="text-sm text-slate-200">
                    PDF Preview is supported natively in modern browsers.
                  </p>
                  <div className="flex justify-center gap-3">
                    <button onClick={handleOpenNewTab} className="px-4 py-2 bg-purple-600 text-white text-xs font-mono font-bold rounded-lg hover:bg-purple-500">
                      Open PDF in New Browser Tab
                    </button>
                    <button onClick={handleDownload} className="px-4 py-2 bg-white/10 border border-white/20 text-white text-xs font-mono rounded-lg hover:bg-white/20">
                      Download PDF Document
                    </button>
                  </div>
                </div>
              </object>
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 sm:p-8 space-y-6 text-slate-200 font-sans">
              
              {/* Document Header */}
              <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                    {personalData.name}
                  </h1>
                  <p className="text-xs sm:text-sm font-mono text-purple-400 font-semibold mt-1">
                    GRC | SOC Analyst | Digital Forensics & Incident Response (DFIR) | Web Penetration Tester
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-slate-400 mt-2">
                    <span>{personalData.location}</span>
                    <span>•</span>
                    <a href={`mailto:${personalData.email}`} className="text-purple-300 hover:underline">{personalData.email}</a>
                    <span>•</span>
                    <span>{personalData.phone}</span>
                  </div>
                </div>

                <div className="flex sm:flex-col gap-2 shrink-0">
                  <span className="px-3 py-1 rounded bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-mono">
                    STATUS: READY FOR ROLES
                  </span>
                </div>
              </div>

              {/* Summary */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300 mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>Professional Summary</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-black/40 p-4 rounded-xl border border-white/10">
                  {personalData.summary}
                </p>
              </div>

              {/* Experience */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyber-blue mb-3 flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" />
                  <span>Work Experience</span>
                </h4>
                {experienceData.map((exp, idx) => (
                  <div key={idx} className="bg-black/40 p-4 rounded-xl border border-white/10 space-y-2">
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <span className="font-bold text-white text-sm sm:text-base">{exp.position}</span>
                      <span className="text-xs font-mono text-purple-300">{exp.duration}</span>
                    </div>
                    <div className="text-xs font-mono text-cyber-green">{exp.company} • {exp.location}</div>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pt-1">
                      {exp.responsibilities.map((r, rIdx) => (
                        <li key={rIdx}>{r}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyber-green mb-3 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  <span>Academic Qualifications</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {educationData.map((edu, idx) => (
                    <div key={idx} className="bg-black/40 p-4 rounded-xl border border-white/10 space-y-1">
                      <div className="text-xs font-mono text-purple-300">{edu.duration}</div>
                      <div className="font-bold text-white text-sm">{edu.degree}</div>
                      <div className="text-xs text-slate-400">{edu.institution}</div>
                      <div className="text-xs font-mono text-emerald-400 font-bold mt-1">CGPA: {edu.cgpa}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-1.5">
                  <Award className="w-4 h-4" />
                  <span>Key Honors & Achievements</span>
                </h4>
                <div className="space-y-2">
                  {achievementsData.map((a, idx) => (
                    <div key={idx} className="bg-black/40 p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-100">{a.title}</span>
                        <span className="text-slate-400 block text-[11px]">{a.issuerOrHost}</span>
                      </div>
                      <span className="font-mono text-purple-400 font-bold text-[11px]">{a.rankBadge}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-[#110720]/98 backdrop-blur px-6 py-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>File: Sri_Ragav_Surya_Resume.pdf</span>
          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold hover:opacity-90 transition-colors shadow-neon-purple"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
