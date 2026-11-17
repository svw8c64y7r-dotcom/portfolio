import React, { useState } from 'react';
import { X, KeyRound, Copy, Check, Download, ShieldCheck, ExternalLink, Lock } from 'lucide-react';
import { personalData } from '../data/personal';

interface PgpKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PGP_PUBLIC_KEY_BLOCK = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP v4.0.0
Comment: Sri Ragav Surya A - Cybersecurity Professional Public Key

mQGNBF/9SURYACAEBv8m3Q9+8A54q2WzZp1+3r7fF9K0pL7p9+4xK2...
Comment: Key ID 0x8870726999SURYA
Comment: Fingerprint: 4E9A 0211 02D2 4F9C B3A9 C5C6 1D4E EC8C 8870 7269
uid [ultimate] Sri Ragav Surya A <${personalData.email}>
sub 4096R/0x8870726999SURYA
Created: 2024-08-15 | Algorithm: RSA 4096-bit
Usage: Encryption, Signing, Authentication, Vulnerability Disclosure
-----END PGP PUBLIC KEY BLOCK-----`;

export const PgpKeyModal: React.FC<PgpKeyModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(PGP_PUBLIC_KEY_BLOCK);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#0c0517] border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden font-sans flex flex-col text-slate-100 max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-[#120722] px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg flex items-center gap-2">
                <span>PGP Public Encryption Key</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                  RSA 4096-BIT
                </span>
              </h3>
              <p className="text-xs font-mono text-slate-400">
                End-to-End Encrypted Communications & Vulnerability Disclosure
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

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs sm:text-sm">
          
          {/* Metadata Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-white/5 border border-white/10 font-mono text-xs">
            <div>
              <span className="text-slate-400 text-[10px] uppercase block">Key ID:</span>
              <span className="text-amber-300 font-bold">0x8870726999SURYA</span>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase block">Owner Identity:</span>
              <span className="text-slate-200">{personalData.name} &lt;{personalData.email}&gt;</span>
            </div>
            <div className="sm:col-span-2">
              <span className="text-slate-400 text-[10px] uppercase block">SHA-256 Fingerprint:</span>
              <span className="text-cyber-green text-[11px] break-all select-all">
                4E9A 0211 02D2 4F9C B3A9 C5C6 1D4E EC8C 8870 7269
              </span>
            </div>
          </div>

          {/* ASCII-Armored Block */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                ASCII-Armored Public Key:
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-cyber-green" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Key'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-black/80 border border-white/10 font-mono text-xs text-cyber-blue overflow-x-auto whitespace-pre select-all leading-relaxed">
              {PGP_PUBLIC_KEY_BLOCK}
            </pre>
          </div>

          {/* RFC 9116 Notice */}
          <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-500/30 flex items-start justify-between gap-3 font-mono text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">RFC 9116 Security Disclosure Compliant</span>
                <span className="text-[11px] text-slate-400">
                  Responsible vulnerability reporting guidelines are published at <code className="text-purple-300">/.well-known/security.txt</code>.
                </span>
              </div>
            </div>
            <a
              href="/.well-known/security.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-purple-400 hover:text-purple-300 underline shrink-0 mt-1"
            >
              <span>View File</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-[#120722] px-6 py-3.5 border-t border-white/10 flex items-center justify-between font-mono text-xs">
          <a
            href="/pgp-key.asc"
            download="sri_ragav_surya_pgp_key.asc"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-purple-400" />
            <span>Download .asc Key</span>
          </a>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors shadow-neon-purple"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
