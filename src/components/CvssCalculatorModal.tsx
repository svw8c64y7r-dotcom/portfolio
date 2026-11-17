import React, { useState, useMemo } from 'react';
import { X, Calculator, Copy, Check, RotateCcw, AlertTriangle, ShieldCheck, Sparkles } from 'lucide-react';

interface CvssCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPreset?: string;
}

type AttackVector = 'N' | 'A' | 'L' | 'P';
type AttackComplexity = 'L' | 'H';
type PrivilegesRequired = 'N' | 'L' | 'H';
type UserInteraction = 'N' | 'R';
type Scope = 'U' | 'C';
type Impact = 'N' | 'L' | 'H';

interface CvssState {
  av: AttackVector;
  ac: AttackComplexity;
  pr: PrivilegesRequired;
  ui: UserInteraction;
  s: Scope;
  c: Impact;
  i: Impact;
  a: Impact;
}

const PRESETS: Record<string, { label: string; state: CvssState }> = {
  'vuln-01': {
    label: 'VULN-01: BOLA / IDOR API Flaw',
    state: { av: 'N', ac: 'L', pr: 'L', ui: 'N', s: 'U', c: 'H', i: 'H', a: 'N' }
  },
  'vuln-02': {
    label: 'VULN-02: SQL Injection Parameter',
    state: { av: 'N', ac: 'L', pr: 'N', ui: 'N', s: 'U', c: 'H', i: 'L', a: 'N' }
  },
  'vuln-03': {
    label: 'VULN-03: Reflected XSS',
    state: { av: 'N', ac: 'L', pr: 'N', ui: 'R', s: 'C', c: 'L', i: 'L', a: 'N' }
  },
  'vuln-04': {
    label: 'VULN-04: Info Disclosure / Stack Trace',
    state: { av: 'N', ac: 'L', pr: 'N', ui: 'N', s: 'U', c: 'L', i: 'N', a: 'N' }
  },
  'vuln-05': {
    label: 'VULN-05: Missing Security Headers',
    state: { av: 'N', ac: 'H', pr: 'N', ui: 'R', s: 'U', c: 'L', i: 'N', a: 'N' }
  },
  'log4shell': {
    label: 'Critical RCE (Log4Shell Example)',
    state: { av: 'N', ac: 'L', pr: 'N', ui: 'N', s: 'C', c: 'H', i: 'H', a: 'H' }
  }
};

const DEFAULT_STATE: CvssState = {
  av: 'N',
  ac: 'L',
  pr: 'N',
  ui: 'N',
  s: 'U',
  c: 'H',
  i: 'H',
  a: 'N'
};

export const CvssCalculatorModal: React.FC<CvssCalculatorModalProps> = ({ isOpen, onClose }) => {
  const [cvss, setCvss] = useState<CvssState>(DEFAULT_STATE);
  const [copied, setCopied] = useState(false);

  // CVSS v3.1 Calculation algorithm (FIRST.org spec)
  const calculation = useMemo(() => {
    const avWeights: Record<AttackVector, number> = { N: 0.85, A: 0.62, L: 0.55, P: 0.2 };
    const acWeights: Record<AttackComplexity, number> = { L: 0.77, H: 0.44 };
    
    // PR depends on Scope
    const prWeightsUnchanged: Record<PrivilegesRequired, number> = { N: 0.85, L: 0.62, H: 0.27 };
    const prWeightsChanged: Record<PrivilegesRequired, number> = { N: 0.85, L: 0.68, H: 0.5 };
    const prWeight = cvss.s === 'U' ? prWeightsUnchanged[cvss.pr] : prWeightsChanged[cvss.pr];

    const uiWeights: Record<UserInteraction, number> = { N: 0.85, R: 0.62 };
    const impactWeights: Record<Impact, number> = { N: 0, L: 0.22, H: 0.56 };

    const cWeight = impactWeights[cvss.c];
    const iWeight = impactWeights[cvss.i];
    const aWeight = impactWeights[cvss.a];

    // ISS = 1 - ((1 - C) * (1 - I) * (1 - A))
    const iss = 1 - ((1 - cWeight) * (1 - iWeight) * (1 - aWeight));

    let impact = 0;
    if (cvss.s === 'U') {
      impact = 6.42 * iss;
    } else {
      impact = 7.52 * (iss - 0.029) - 3.25 * Math.pow(Math.max(0, iss - 0.02), 15);
    }

    const exploitability = 8.22 * avWeights[cvss.av] * acWeights[cvss.ac] * prWeight * uiWeights[cvss.ui];

    let baseScore = 0;
    if (impact <= 0) {
      baseScore = 0;
    } else if (cvss.s === 'U') {
      baseScore = Math.min(impact + exploitability, 10);
    } else {
      baseScore = Math.min(1.08 * (impact + exploitability), 10);
    }

    // Official CVSS round-up to 1 decimal place
    const roundedScore = Math.ceil(Math.round(baseScore * 100000) / 10000) / 10;

    let severity = 'None';
    let severityStyle = 'bg-slate-500/20 text-slate-300 border-slate-500/40';

    if (roundedScore >= 9.0) {
      severity = 'Critical';
      severityStyle = 'bg-red-500/20 text-red-400 border-red-500/50';
    } else if (roundedScore >= 7.0) {
      severity = 'High';
      severityStyle = 'bg-orange-500/20 text-orange-400 border-orange-500/50';
    } else if (roundedScore >= 4.0) {
      severity = 'Medium';
      severityStyle = 'bg-amber-500/20 text-amber-300 border-amber-500/50';
    } else if (roundedScore >= 0.1) {
      severity = 'Low';
      severityStyle = 'bg-blue-500/20 text-blue-300 border-blue-500/50';
    }

    const vectorString = `CVSS:3.1/AV:${cvss.av}/AC:${cvss.ac}/PR:${cvss.pr}/UI:${cvss.ui}/S:${cvss.s}/C:${cvss.c}/I:${cvss.i}/A:${cvss.a}`;

    return {
      score: roundedScore.toFixed(1),
      severity,
      severityStyle,
      vectorString,
      impactSubScore: iss.toFixed(3),
      exploitabilityScore: exploitability.toFixed(2)
    };
  }, [cvss]);

  if (!isOpen) return null;

  const handleCopyVector = () => {
    navigator.clipboard.writeText(calculation.vectorString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyPreset = (key: string) => {
    if (PRESETS[key]) {
      setCvss(PRESETS[key].state);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0c0517] border border-purple-500/30 rounded-2xl shadow-2xl overflow-hidden font-sans flex flex-col text-slate-100">
        
        {/* Header */}
        <div className="bg-[#120722] px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base sm:text-lg flex items-center gap-2">
                <span>Interactive CVSS 3.1 Calculator</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
                  FIRST.ORG SPECIFICATION
                </span>
              </h3>
              <p className="text-xs font-mono text-slate-400">
                Common Vulnerability Scoring System v3.1 Base Metric Simulator
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

        {/* Real-Time Score Dashboard Ribbon */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-purple-950/40 via-black/60 to-purple-950/40 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`px-4 py-3 rounded-2xl border flex flex-col items-center justify-center min-w-[100px] shadow-lg ${calculation.severityStyle}`}>
              <span className="text-3xl font-extrabold font-mono tracking-tight">{calculation.score}</span>
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider">{calculation.severity}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-0.5">
                GENERATED CVSS 3.1 VECTOR STRING
              </span>
              <div className="flex items-center gap-2">
                <code className="text-xs sm:text-sm font-mono text-purple-300 bg-black/60 px-2.5 py-1.5 rounded-lg border border-purple-500/30 select-all">
                  {calculation.vectorString}
                </code>
                <button
                  onClick={handleCopyVector}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors shrink-0"
                  title="Copy vector string"
                >
                  {copied ? <Check className="w-4 h-4 text-cyber-green" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-1.5 self-start md:self-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase mr-1">Load Preset:</span>
            {Object.entries(PRESETS).map(([key, p]) => (
              <button
                key={key}
                onClick={() => applyPreset(key)}
                className="px-2 py-1 rounded text-[10px] font-mono bg-white/5 hover:bg-purple-600/20 text-slate-300 hover:text-purple-300 border border-white/10 hover:border-purple-500/40 transition-colors"
              >
                {key.toUpperCase()}
              </button>
            ))}
            <button
              onClick={() => setCvss(DEFAULT_STATE)}
              className="p-1 rounded text-slate-400 hover:text-white"
              title="Reset"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Group 1: Exploitability Metrics */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-400 mb-3 flex items-center gap-1.5">
              <span>1. Exploitability Metrics</span>
              <span className="text-[10px] text-slate-500 font-normal">(Subscore: {calculation.exploitabilityScore})</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Attack Vector (AV) */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-mono font-bold text-slate-200 block">Attack Vector (AV)</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {[
                    { id: 'N', label: 'Network (N)', desc: 'Remotely exploitable' },
                    { id: 'A', label: 'Adjacent (A)', desc: 'Local subnet/WiFi' },
                    { id: 'L', label: 'Local (L)', desc: 'Local shell/read' },
                    { id: 'P', label: 'Physical (P)', desc: 'Physical device access' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setCvss(prev => ({ ...prev, av: opt.id as AttackVector }))}
                      className={`p-2 rounded-lg text-left text-xs font-mono transition-all ${
                        cvss.av === opt.id 
                          ? 'bg-purple-600 text-white font-bold border border-purple-400 shadow-sm' 
                          : 'bg-black/40 text-slate-400 hover:text-white border border-white/5'
                      }`}
                      title={opt.desc}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Attack Complexity (AC) */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-mono font-bold text-slate-200 block">Attack Complexity (AC)</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: 'L', label: 'Low (L)', desc: 'No specialized conditions' },
                    { id: 'H', label: 'High (H)', desc: 'Race condition, bypass required' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setCvss(prev => ({ ...prev, ac: opt.id as AttackComplexity }))}
                      className={`p-2 rounded-lg text-left text-xs font-mono transition-all ${
                        cvss.ac === opt.id 
                          ? 'bg-purple-600 text-white font-bold border border-purple-400 shadow-sm' 
                          : 'bg-black/40 text-slate-400 hover:text-white border border-white/5'
                      }`}
                      title={opt.desc}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Privileges Required (PR) */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-mono font-bold text-slate-200 block">Privileges Required (PR)</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'N', label: 'None (N)' },
                    { id: 'L', label: 'Low (L)' },
                    { id: 'H', label: 'High (H)' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setCvss(prev => ({ ...prev, pr: opt.id as PrivilegesRequired }))}
                      className={`p-2 rounded-lg text-center text-xs font-mono transition-all ${
                        cvss.pr === opt.id 
                          ? 'bg-purple-600 text-white font-bold border border-purple-400 shadow-sm' 
                          : 'bg-black/40 text-slate-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* User Interaction (UI) */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-mono font-bold text-slate-200 block">User Interaction (UI)</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: 'N', label: 'None (N)', desc: 'Zero victim interaction' },
                    { id: 'R', label: 'Required (R)', desc: 'Victim must click or visit' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setCvss(prev => ({ ...prev, ui: opt.id as UserInteraction }))}
                      className={`p-2 rounded-lg text-left text-xs font-mono transition-all ${
                        cvss.ui === opt.id 
                          ? 'bg-purple-600 text-white font-bold border border-purple-400 shadow-sm' 
                          : 'bg-black/40 text-slate-400 hover:text-white border border-white/5'
                      }`}
                      title={opt.desc}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Group 2: Scope & Impact Metrics */}
          <div>
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyber-blue mb-3 flex items-center gap-1.5">
              <span>2. Scope & Impact Metrics</span>
              <span className="text-[10px] text-slate-500 font-normal">(Impact Subscore: {calculation.impactSubScore})</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Scope (S) */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-mono font-bold text-slate-200 block">Scope (S)</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    { id: 'U', label: 'Unchanged (U)', desc: 'Affects only vulnerable component' },
                    { id: 'C', label: 'Changed (C)', desc: 'Breaches security authority / sandbox' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setCvss(prev => ({ ...prev, s: opt.id as Scope }))}
                      className={`p-2 rounded-lg text-left text-xs font-mono transition-all ${
                        cvss.s === opt.id 
                          ? 'bg-indigo-600 text-white font-bold border border-indigo-400 shadow-sm' 
                          : 'bg-black/40 text-slate-400 hover:text-white border border-white/5'
                      }`}
                      title={opt.desc}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Confidentiality Impact (C) */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-mono font-bold text-slate-200 block">Confidentiality (C)</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'N', label: 'None' },
                    { id: 'L', label: 'Low' },
                    { id: 'H', label: 'High' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setCvss(prev => ({ ...prev, c: opt.id as Impact }))}
                      className={`p-2 rounded-lg text-center text-xs font-mono transition-all ${
                        cvss.c === opt.id 
                          ? 'bg-indigo-600 text-white font-bold border border-indigo-400 shadow-sm' 
                          : 'bg-black/40 text-slate-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Integrity Impact (I) */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-mono font-bold text-slate-200 block">Integrity (I)</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'N', label: 'None' },
                    { id: 'L', label: 'Low' },
                    { id: 'H', label: 'High' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setCvss(prev => ({ ...prev, i: opt.id as Impact }))}
                      className={`p-2 rounded-lg text-center text-xs font-mono transition-all ${
                        cvss.i === opt.id 
                          ? 'bg-indigo-600 text-white font-bold border border-indigo-400 shadow-sm' 
                          : 'bg-black/40 text-slate-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Availability Impact (A) */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-xs font-mono font-bold text-slate-200 block">Availability (A)</span>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'N', label: 'None' },
                    { id: 'L', label: 'Low' },
                    { id: 'H', label: 'High' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setCvss(prev => ({ ...prev, a: opt.id as Impact }))}
                      className={`p-2 rounded-lg text-center text-xs font-mono transition-all ${
                        cvss.a === opt.id 
                          ? 'bg-indigo-600 text-white font-bold border border-indigo-400 shadow-sm' 
                          : 'bg-black/40 text-slate-400 hover:text-white border border-white/5'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-[#120722] px-6 py-3.5 border-t border-white/10 flex items-center justify-between font-mono text-xs">
          <span className="text-slate-400 text-[11px]">
            National Vulnerability Database (NVD) & FIRST.org CVSS v3.1 standard
          </span>
          <button
            onClick={onClose}
            className="px-5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors shadow-neon-purple"
          >
            Close Calculator
          </button>
        </div>

      </div>
    </div>
  );
};
