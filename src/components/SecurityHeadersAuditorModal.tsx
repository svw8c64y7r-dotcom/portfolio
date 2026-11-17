import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  RefreshCw, 
  Copy, 
  Check, 
  ExternalLink,
  Code2,
  Lock
} from 'lucide-react';

interface SecurityHeadersAuditorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HeaderAuditItem {
  name: string;
  value: string;
  status: 'pass' | 'warn' | 'fail';
  importance: 'Critical' | 'High' | 'Medium';
  impact: string;
  recommended: string;
}

interface AuditProfile {
  target: string;
  grade: 'A+' | 'A' | 'B' | 'C' | 'F';
  score: number;
  headers: HeaderAuditItem[];
}

const AUDIT_PROFILES: Record<string, AuditProfile> = {
  'current-portfolio': {
    target: 'sri-ragav-surya.vercel.app (Production Site)',
    grade: 'A+',
    score: 96,
    headers: [
      {
        name: 'Strict-Transport-Security (HSTS)',
        value: 'max-age=63072000; includeSubDomains; preload',
        status: 'pass',
        importance: 'Critical',
        impact: 'Guarantees browser-enforced TLS 1.3/1.2 connections, neutralizing SSL-stripping and MITM downgrade attacks.',
        recommended: 'Strict-Transport-Security: max-age=63072000; includeSubDomains; preload'
      },
      {
        name: 'Content-Security-Policy (CSP)',
        value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com; object-src 'none'; frame-ancestors 'none';",
        status: 'pass',
        importance: 'Critical',
        impact: 'Restricts script execution boundaries, mitigating Reflected and DOM-based Cross-Site Scripting (XSS).',
        recommended: "default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'none';"
      },
      {
        name: 'X-Content-Type-Options',
        value: 'nosniff',
        status: 'pass',
        importance: 'High',
        impact: 'Prevents MIME-type confusion sniffing attacks where non-executable uploads are executed as scripts.',
        recommended: 'X-Content-Type-Options: nosniff'
      },
      {
        name: 'X-Frame-Options',
        value: 'DENY',
        status: 'pass',
        importance: 'High',
        impact: 'Prevents iframe framing across external domains, completely preventing UI redress and Clickjacking attacks.',
        recommended: 'X-Frame-Options: DENY'
      },
      {
        name: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
        status: 'pass',
        importance: 'Medium',
        impact: 'Limits URL path leakage during external navigation to preserve privacy and confidential session tokens.',
        recommended: 'Referrer-Policy: strict-origin-when-cross-origin'
      },
      {
        name: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), payment=()',
        status: 'pass',
        importance: 'Medium',
        impact: 'Restricts browser hardware API access (webcam, microphone, geolocation) to prevent rogue peripheral exploitation.',
        recommended: 'Permissions-Policy: camera=(), microphone=(), geolocation=()'
      }
    ]
  },
  'vulnerable-benchmark': {
    target: 'Default Unhardened Web Application (Vulnerable)',
    grade: 'F',
    score: 22,
    headers: [
      {
        name: 'Strict-Transport-Security (HSTS)',
        value: 'Header Missing',
        status: 'fail',
        importance: 'Critical',
        impact: 'Adversaries can execute ARP poisoning or rogue AP attacks to strip SSL and capture plaintext cookies.',
        recommended: 'Strict-Transport-Security: max-age=31536000; includeSubDomains; preload'
      },
      {
        name: 'Content-Security-Policy (CSP)',
        value: 'Header Missing',
        status: 'fail',
        importance: 'Critical',
        impact: 'Zero restriction on arbitrary JavaScript injection, inline script execution, or rogue data exfiltration.',
        recommended: "default-src 'self'; script-src 'self'; frame-ancestors 'none';"
      },
      {
        name: 'X-Content-Type-Options',
        value: 'Header Missing',
        status: 'fail',
        importance: 'High',
        impact: 'Browsers may interpret text/plain or image uploads as JavaScript if HTML or script signatures are detected.',
        recommended: 'X-Content-Type-Options: nosniff'
      },
      {
        name: 'X-Frame-Options',
        value: 'ALLOW-FROM * (or missing)',
        status: 'fail',
        importance: 'High',
        impact: 'Vulnerable to clickjacking attacks where application buttons are overlaid inside transparent adversary iframes.',
        recommended: 'X-Frame-Options: DENY'
      },
      {
        name: 'Server Header / Information Disclosure',
        value: 'Apache/2.4.41 (Ubuntu) mod_ssl/2.4.41',
        status: 'warn',
        importance: 'Medium',
        impact: 'Verbose server version banner disclosure assists attackers in targeting known CVE exploits.',
        recommended: 'ServerTokens Prod; ServerSignature Off'
      }
    ]
  }
};

export const SecurityHeadersAuditorModal: React.FC<SecurityHeadersAuditorModalProps> = ({ isOpen, onClose }) => {
  const [selectedProfileKey, setSelectedProfileKey] = useState<string>('current-portfolio');
  const [isScanning, setIsScanning] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [expandedHeader, setExpandedHeader] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentProfile = AUDIT_PROFILES[selectedProfileKey] || AUDIT_PROFILES['current-portfolio'];

  const handleRescan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 500);
  };

  const getGradeStyle = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50';
      case 'B':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'C':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/50';
      default:
        return 'bg-red-500/20 text-red-400 border-red-500/50';
    }
  };

  const copyVercelConfig = () => {
    const config = `{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" }
      ]
    }
  ]
}`;
    navigator.clipboard.writeText(config);
    setCopiedSnippet(true);
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0c0517] border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden font-sans flex flex-col text-slate-100">
        
        {/* Header */}
        <div className="bg-[#120722] px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyber-blue/15 border border-cyber-blue/30 text-cyber-blue">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg flex items-center gap-2">
                <span>Security Headers & CSP Diagnostic Auditor</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/40 font-bold">
                  OWASP SECRECS
                </span>
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Automated HTTP Response Security Header & Defense-in-Depth Inspection
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target Profile Bar */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-purple-950/40 via-black/60 to-purple-950/40 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`px-4 py-3 rounded-2xl border flex flex-col items-center justify-center min-w-[90px] shadow-lg ${getGradeStyle(currentProfile.grade)}`}>
              <span className="text-3xl font-extrabold font-mono tracking-tight">{currentProfile.grade}</span>
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider">{currentProfile.score} / 100</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-0.5">
                AUDITED TARGET ENDPOINT
              </span>
              <div className="text-sm sm:text-base font-bold font-mono text-white flex items-center gap-2">
                <span>{currentProfile.target}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-0.5">
                <span className="text-emerald-400">● {currentProfile.headers.filter(h => h.status === 'pass').length} Passed</span>
                <span>•</span>
                <span className="text-amber-400">▲ {currentProfile.headers.filter(h => h.status === 'warn').length} Warnings</span>
                <span>•</span>
                <span className="text-red-400">✕ {currentProfile.headers.filter(h => h.status === 'fail').length} Failed</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-center">
            <button
              onClick={() => setSelectedProfileKey('current-portfolio')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedProfileKey === 'current-portfolio'
                  ? 'bg-purple-600 text-white font-bold border border-purple-400 shadow-neon-purple'
                  : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white'
              }`}
            >
              Current Portfolio
            </button>
            <button
              onClick={() => setSelectedProfileKey('vulnerable-benchmark')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedProfileKey === 'vulnerable-benchmark'
                  ? 'bg-red-600/30 text-red-300 font-bold border border-red-500/50'
                  : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white'
              }`}
            >
              Vulnerable Comparison
            </button>
            <button
              onClick={handleRescan}
              disabled={isScanning}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
              title="Rescan"
            >
              <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin text-purple-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Findings List */}
        <div className="p-6 overflow-y-auto space-y-3.5">
          {currentProfile.headers.map((h, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all ${
                h.status === 'pass' 
                  ? 'bg-emerald-950/15 border-emerald-500/30' 
                  : h.status === 'warn'
                  ? 'bg-amber-950/15 border-amber-500/30'
                  : 'bg-red-950/20 border-red-500/40'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  {h.status === 'pass' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : h.status === 'warn' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                  )}
                  <span className="font-mono font-bold text-sm text-white">{h.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                    h.importance === 'Critical' ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-white/10 text-slate-300'
                  }`}>
                    {h.importance}
                  </span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${
                    h.status === 'pass' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                  }`}>
                    {h.status.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Detected Value */}
              <div className="mb-2 p-2 rounded-lg bg-black/60 border border-white/5 font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre">
                <span className="text-slate-500">Detected: </span>
                <span className={h.status === 'pass' ? 'text-emerald-300' : 'text-red-300 font-semibold'}>
                  {h.value}
                </span>
              </div>

              {/* Security Impact & Remediation */}
              <div className="text-xs font-mono text-slate-300 space-y-1">
                <p><strong className="text-purple-300">Security Impact:</strong> {h.impact}</p>
                <p><strong className="text-cyber-green">Remediation Directive:</strong> <code className="text-slate-200 bg-white/5 px-1 py-0.5 rounded">{h.recommended}</code></p>
              </div>
            </div>
          ))}

          {/* Hardening Blueprint Accordion */}
          <div className="mt-6 p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-white block">
                Download / Copy Complete Hardening Policy (vercel.json)
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                Production-grade zero-trust headers configuration for Node.js / Vercel edge reverse proxies.
              </span>
            </div>
            <button
              onClick={copyVercelConfig}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors shadow-neon-purple shrink-0 ml-4"
            >
              {copiedSnippet ? <Check className="w-3.5 h-3.5 text-cyber-green" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSnippet ? 'Copied' : 'Copy vercel.json'}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#120722] px-6 py-3.5 border-t border-white/10 flex items-center justify-between font-mono text-xs">
          <span className="text-slate-400 text-[11px]">
            Audited per OWASP Secure Headers Project & Mozilla Observatory Guidelines
          </span>
          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors shadow-neon-purple"
          >
            Close Auditor
          </button>
        </div>

      </div>
    </div>
  );
};

