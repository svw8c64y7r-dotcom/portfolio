import React, { useState, useEffect } from 'react';
import { ShieldCheck, Activity, Clock, Terminal, Command } from 'lucide-react';

interface SocStatusBarProps {
  onOpenCommandPalette: () => void;
}

export const SocStatusBar: React.FC<SocStatusBarProps> = ({ onOpenCommandPalette }) => {
  const [timeIST, setTimeIST] = useState('');
  const [timeUTC, setTimeUTC] = useState('');

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTimeIST(now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false }));
      setTimeUTC(now.toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: false }));
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0b0416] border-b border-purple-500/20 text-[11px] font-mono text-slate-300 py-1.5 px-4 select-none">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        
        {/* Left Side: Defense Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-cyber-green">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green"></span>
            </span>
            <span className="font-bold">SOC_TELEMETRY: ACTIVE</span>
          </div>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">PERIMETER: ZERO-TRUST ENFORCED</span>
        </div>

        {/* Right Side: Clocks & Command Palette Trigger */}
        <div className="flex items-center gap-3 ml-auto sm:ml-0">
          <div className="flex items-center gap-2 text-slate-400">
            <Clock className="w-3 h-3 text-purple-400" />
            <span className="hidden md:inline">IST:</span>
            <span className="text-purple-300 font-bold">{timeIST || '19:30:00'}</span>
            <span className="text-slate-600 hidden lg:inline">|</span>
            <span className="text-slate-400 hidden lg:inline">UTC: {timeUTC || '14:00:00'}</span>
          </div>

          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-purple-600/30 border border-white/10 hover:border-purple-500/50 text-slate-200 transition-colors text-[10px]"
            title="Press Ctrl+K or Cmd+K to launch command palette"
          >
            <Command className="w-3 h-3 text-purple-400" />
            <span>Cmd+K</span>
          </button>
        </div>

      </div>
    </div>
  );
};

