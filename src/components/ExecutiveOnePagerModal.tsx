import React, { useRef } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Award, 
  ShieldCheck, 
  GraduationCap, 
  Briefcase,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { personalData } from '../data/personal';
import { experienceData } from '../data/experience';
import { educationData } from '../data/education';
import { achievementsData } from '../data/achievements';

interface ExecutiveOnePagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResumeModal?: () => void;
}

export const ExecutiveOnePagerModal: React.FC<ExecutiveOnePagerModalProps> = ({
  isOpen,
  onClose,
  onOpenResumeModal
}) => {
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[95vh] bg-[#0c0517] border border-purple-500/40 rounded-2xl shadow-2xl overflow-hidden font-sans flex flex-col text-slate-100">
        
        {/* Header Bar */}
        <div className="bg-[#120722] px-6 py-3.5 border-b border-white/10 flex items-center justify-between no-print">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-400">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-sm sm:text-base flex items-center gap-2">
                <span>Executive Recruiter One-Pager</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold uppercase">
                  A4 Print Ready
                </span>
              </h3>
              <p className="text-[11px] font-mono text-slate-400">
                Single-sheet briefing optimized for hiring managers, technical leads, and interview panels.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 transition-all shadow-neon-purple"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable One-Pager Document */}
        <div className="overflow-y-auto p-4 sm:p-8 bg-[#0e071c] print:bg-white print:text-black print:p-0 print:overflow-visible">
          <div 
            ref={printAreaRef}
            className="max-w-[780px] mx-auto bg-[#130924] print:bg-white border border-purple-500/20 print:border-none p-6 sm:p-8 rounded-xl shadow-xl print:shadow-none space-y-5 text-slate-200 print:text-black font-sans leading-relaxed"
          >
            
            {/* Top Identity & Contact Header */}
            <div className="border-b border-purple-500/30 print:border-black/30 pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white print:text-black tracking-tight">
                  SRI RAGAV SURYA A
                </h1>
                <p className="text-xs sm:text-sm font-bold text-purple-400 print:text-purple-800 font-mono mt-0.5">
                  CYBERSECURITY ENGINEER • VAPT SPECIALIST • SOC & DFIR ANALYST
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-slate-300 print:text-slate-700 mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-purple-400 print:text-black" />
                    <span>Coimbatore, Tamil Nadu, India</span>
                  </span>
                  <span>•</span>
                  <span>Phone: +91 88707 26999</span>
                  <span>•</span>
                  <span>Email: sriragavsurya@gmail.com</span>
                </div>
              </div>

              <div className="text-left sm:text-right font-mono text-xs text-slate-400 print:text-slate-600 space-y-0.5 shrink-0">
                <div>LinkedIn: linkedin.com/in/sri-ragav-surya</div>
                <div>GitHub: github.com/svw8c64y7r-dotcom</div>
                <div>Portfolio: sri-ragav-surya.vercel.app</div>
              </div>
            </div>

            {/* Executive Profile Statement */}
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 print:text-purple-800 mb-1.5">
                Executive Profile & Specialization
              </h2>
              <p className="text-xs text-slate-300 print:text-slate-800 leading-relaxed font-sans">
                Postgraduate cybersecurity specialist with hands-on production experience in Web Application Penetration Testing (VAPT), Security Operations Center (SOC) incident monitoring, and memory forensics (DFIR). Ranked in the Top 50 globally in the DEFCON CTF and achieved 4th Place in the International CTF at Karunya Institute of Technology and Sciences. Proven track record auditing enterprise web applications, discovering OWASP Top 10 vulnerabilities (BOLA/IDOR, SQLi, XSS), and architecting automated security tooling in Python and Java.
              </p>
            </div>

            {/* Core Competencies Matrix */}
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 print:text-purple-800 mb-1.5">
                Technical Competencies & Methodologies
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-black/40 print:bg-slate-100 border border-white/5 print:border-slate-300">
                  <span className="font-bold text-white print:text-black block mb-1">Offensive Security & VAPT:</span>
                  <span className="text-slate-300 print:text-slate-700 text-[11px]">
                    Web App PenTesting, OWASP Top 10, Burp Suite Pro, Nmap, Metasploit, Gobuster, SQLMap, BOLA/IDOR exploitation, CVSS v3.1 scoring, WSTG v4.2.
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 print:bg-slate-100 border border-white/5 print:border-slate-300">
                  <span className="font-bold text-white print:text-black block mb-1">Defensive Security & DFIR:</span>
                  <span className="text-slate-300 print:text-slate-700 text-[11px]">
                    Wazuh SIEM, Volatility 3 Memory Forensics, Wireshark packet analysis, Process Hollowing detection, Zeek, Autopsy, YARA rule authoring.
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 print:bg-slate-100 border border-white/5 print:border-slate-300">
                  <span className="font-bold text-white print:text-black block mb-1">Governance, Risk & Compliance (GRC):</span>
                  <span className="text-slate-300 print:text-slate-700 text-[11px]">
                    ISO/IEC 27001 standard frameworks, NIST SP 800-115, security risk assessment, executive vulnerability deliverables.
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/40 print:bg-slate-100 border border-white/5 print:border-slate-300">
                  <span className="font-bold text-white print:text-black block mb-1">Programming & Automation:</span>
                  <span className="text-slate-300 print:text-slate-700 text-[11px]">
                    Python (Requests, BeautifulSoup, Scanners), Java (Spring Boot, Secure Architecture), Unix Shell/Bash CLI, Git, RESTful APIs.
                  </span>
                </div>
              </div>
            </div>

            {/* Professional Experience */}
            <div>
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 print:text-purple-800 mb-1.5">
                Professional Cybersecurity Experience
              </h2>
              <div className="p-3 rounded-lg bg-black/30 print:bg-slate-50 border border-white/5 print:border-slate-300 text-xs font-mono">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-white print:text-black font-bold">
                  <span>Cyber Security Engineer • Pitowings</span>
                  <span className="text-purple-300 print:text-purple-800 text-[11px]">Feb 2025 – May 2025 | Production</span>
                </div>
                <ul className="mt-1.5 space-y-1 text-slate-300 print:text-slate-700 text-[11px] list-disc list-inside font-sans">
                  <li>Conducted grey-box and black-box web application penetration testing across client production infrastructure.</li>
                  <li>Identified, validated, and documented critical OWASP Top 10 vulnerabilities including Broken Object Level Authorization (BOLA) and Injection flaws.</li>
                  <li>Delivered executive-level and technical remediation reports conforming to NIST and OWASP WSTG methodologies.</li>
                </ul>
              </div>
            </div>

            {/* Academic Credentials & Honors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 print:text-purple-800 mb-1.5">
                  Academic Education
                </h2>
                <div className="p-3 rounded-lg bg-black/30 print:bg-slate-50 border border-white/5 print:border-slate-300 text-xs font-mono space-y-1">
                  <div className="font-bold text-white print:text-black">M.Sc. Information Security & Digital Forensics</div>
                  <div className="text-slate-300 print:text-slate-700 text-[11px]">Karunya Institute of Technology and Sciences (2025–2027)</div>
                  <div className="text-cyber-green print:text-emerald-800 font-bold text-[11px]">Cumulative Grade: 8.3 CGPA</div>
                </div>
              </div>

              <div>
                <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 print:text-purple-800 mb-1.5">
                  Verified CTF & Industry Honors
                </h2>
                <div className="p-3 rounded-lg bg-black/30 print:bg-slate-50 border border-white/5 print:border-slate-300 text-xs font-mono space-y-1">
                  <div className="font-bold text-amber-300 print:text-amber-800 flex items-center gap-1">
                    <span>🏆</span> 4th Place — International CTF (Karunya)
                  </div>
                  <div className="font-bold text-cyber-blue print:text-blue-800 flex items-center gap-1">
                    <span>🛡️</span> DEFCON CTF — Top 50 Global Ranking
                  </div>
                  <div className="text-slate-400 print:text-slate-600 text-[10px]">
                    Verified standing across Web Exploitation, Cryptography, and Reverse Engineering.
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Footer (No Print) */}
        <div className="bg-[#120722] px-6 py-3 border-t border-white/10 flex items-center justify-between font-mono text-xs no-print">
          <span className="text-slate-400 text-[11px]">
            Designed for 1-page A4 printing. Use "Save as PDF" in print dialog.
          </span>
          <div className="flex items-center gap-2">
            {onOpenResumeModal && (
              <button
                onClick={() => { onClose(); onOpenResumeModal(); }}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                Official Resume PDF
              </button>
            )}
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold transition-colors shadow-neon-purple"
            >
              Print One-Pager
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

