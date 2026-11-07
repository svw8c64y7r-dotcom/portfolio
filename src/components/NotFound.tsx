import React from 'react';
import { ShieldAlert, ArrowLeft, Home, Terminal } from 'lucide-react';

interface NotFoundProps {
  onBackToHome: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onBackToHome }) => {
  return (
    <div className="min-h-screen bg-cyber-bg flex items-center justify-center p-4 font-mono text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#101722_1px,transparent_1px),linear-gradient(to_bottom,#101722_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 pointer-events-none" />

      <div className="relative max-w-lg w-full bg-cyber-surface/90 border border-cyber-cardBorder rounded-2xl p-8 sm:p-10 shadow-2xl backdrop-blur-md">
        <div className="w-16 h-16 rounded-2xl bg-cyber-card border border-red-500/40 text-red-400 mx-auto flex items-center justify-center mb-6 shadow-[0_0_20px_-3px_rgba(239,68,68,0.3)]">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="inline-block px-3 py-1 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs mb-3">
          ERROR_CODE: 0x404 // ROUTE_NOT_FOUND
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white mb-2">
          Access Denied
        </h1>

        <p className="text-slate-400 text-xs sm:text-sm mb-8 leading-relaxed">
          The requested endpoint or memory address does not exist on this security host. The incident has been logged.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onBackToHome}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold bg-cyber-green text-black hover:bg-cyber-green/90 transition-all shadow-neon-green"
          >
            <Home className="w-4 h-4" />
            <span>Return to Secure Perimeter</span>
          </button>
        </div>
      </div>
    </div>
  );
};
