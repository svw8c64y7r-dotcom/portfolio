import React, { useState, useEffect } from 'react';
import { 
  Binary, 
  Terminal, 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  Search, 
  FileText, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Cpu, 
  HardDrive,
  Copy,
  Check
} from 'lucide-react';

interface TimelinePhase {
  id: number;
  time: string;
  title: string;
  category: string;
  command: string;
  outputPreview: string;
  analystDeduction: string;
  keyArtifact: string;
  severity: 'Info' | 'Warning' | 'High' | 'Critical';
}

const DFIR_PHASES: TimelinePhase[] = [
  {
    id: 1,
    time: 'T+00:00:00',
    title: 'Volatile RAM Acquisition & Triage',
    category: 'Evidence Preservation',
    command: 'winpmem.exe -o memdump_win10.raw --volume_mode 1\nsha256sum memdump_win10.raw',
    outputPreview: `[+] WinPmem v4.0 Physical Memory Imager
[+] Target OS: Windows 10 x64 Build 19045
[+] Physical RAM Size: 16,777,216 KB (16 GB)
[+] Output Image: memdump_win10.raw written successfully
[+] SHA256: 9b87fc120aa489f6d71b29e018d9f48ac62bf450912d7b...
[+] Chain of Custody: VERIFIED`,
    analystDeduction: 'Physical RAM captured live without powering down the host to preserve active network sockets, decrypted encryption keys, and ephemeral injection payloads in user-space.',
    keyArtifact: 'Raw 16GB Memory Dump (memdump_win10.raw)',
    severity: 'Info'
  },
  {
    id: 2,
    time: 'T+00:02:40',
    title: 'Kernel EPROCESS Doubly-Linked List Traversal',
    category: 'Kernel Pool Scanning',
    command: 'vol.py -f memdump_win10.raw windows.pslist\nvol.py -f memdump_win10.raw windows.psscan',
    outputPreview: `PID    PPID   ImageFileName    Offset(V)          Threads  Handles  CreateTime
4      0      System           0xffffba0a1200     192      0        2025-02-14 09:12:01
680    4      smss.exe         0xffffba0a2400     4        32       2025-02-14 09:12:02
...
4812   2410   svchost.exe      0xffffba0a9800     14       182      2025-02-14 10:45:12
[!] CROSS-REFERENCE DISCREPANCY:
PID 4812 found in psscan unlinked pool, unlinked from PsActiveProcessHead!`,
    analystDeduction: 'Cross-referencing windows.pslist against windows.psscan identifies unlinked memory structures indicative of Direct Kernel Object Manipulation (DKOM) hiding malicious processes from Task Manager.',
    keyArtifact: 'Discrepancy: PID 4812 unlinked from EPROCESS list',
    severity: 'Warning'
  },
  {
    id: 3,
    time: 'T+00:05:15',
    title: 'Process Hollowing Detection (svchost.exe PID 4812)',
    category: 'Process Lineage Anomaly',
    command: 'vol.py -f memdump_win10.raw windows.pstree --pid 4812\nvol.py -f memdump_win10.raw windows.netscan | grep 4812',
    outputPreview: `Process Tree Ancestry:
explorer.exe (PID 3100)
  └── cmd.exe (PID 2410)
        └── svchost.exe (PID 4812) [ANOMALOUS PARENT]

Network Sockets (PID 4812):
TCP  10.0.4.15:49821 -> 198.51.100.42:4444  ESTABLISHED  svchost.exe`,
    analystDeduction: 'Legitimate svchost.exe MUST be parented by services.exe. Here, PID 4812 was spawned by cmd.exe and has established an active outbound beacon connection to an external IP on port 4444.',
    keyArtifact: 'Parent PID 2410 (cmd.exe) -> svchost.exe + External C2 Socket',
    severity: 'High'
  },
  {
    id: 4,
    time: 'T+00:08:50',
    title: 'Virtual Address Descriptor (VAD) Permission Audit',
    category: 'Memory Structure Analysis',
    command: 'vol.py -f memdump_win10.raw windows.vadinfo --pid 4812',
    outputPreview: `VAD Node: 0x00400000 - 0x00428000
Protection: PAGE_EXECUTE_READWRITE (RWX)
Commit Charge: 40 pages
Memory Tag: VadS
File Object: NONE (Unbacked private anonymous memory!)
Control Area: 0x0000000000000000
[!] CRITICAL VIOLATION: Executable code in unbacked RWX memory page`,
    analystDeduction: 'Standard PE binaries run with PAGE_EXECUTE_READ or PAGE_READONLY. Finding PAGE_EXECUTE_READWRITE with NO backing disk file proves shellcode or a reflected DLL was injected in RAM.',
    keyArtifact: 'VAD Region 0x00400000 allocated with PAGE_EXECUTE_READWRITE',
    severity: 'Critical'
  },
  {
    id: 5,
    time: 'T+00:12:30',
    title: 'Shellcode Carving & YARA C2 Signature Extraction',
    category: 'Payload Extraction',
    command: 'vol.py -f memdump_win10.raw windows.malfind --pid 4812 --dump\nyara -s rules/cobaltstrike.yar pid.4812.vad.0x00400000.dmp',
    outputPreview: `0x00400000  4d 5a 90 00 03 00 00 00  04 00 00 00 ff ff 00 00  |MZ..............|
0x00400010  b8 00 00 00 00 00 00 00  40 00 00 00 00 00 00 00  |........@.......|
...
[+] YARA Match: rule CobaltStrike_Beacon_HTTPS
    $beacon_config = "c2.threat-actor.xyz/api/v2/update"
    $sleep_mask    = { 48 8b ?? ?? 48 83 c4 ?? c3 }
    $jitter        = 30%`,
    analystDeduction: 'Carved memory segment contains a complete Cobalt Strike Reflective DLL with SleepMask evasion and configured HTTPS C2 callback URI.',
    keyArtifact: 'Carved Binary: Cobalt Strike Beacon Payload (SHA256: 4e9a0211...)',
    severity: 'Critical'
  },
  {
    id: 6,
    time: 'T+00:16:00',
    title: 'Forensic Remediation & SIEM Sigma Detection Rule',
    category: 'Incident Response & Mitigation',
    command: 'sigma-cli generate -t wazuh rules/proc_hollow_svchost.yml',
    outputPreview: `title: Suspicious svchost.exe Non-System Parent & RWX Memory
status: production
logsource:
  category: process_creation
  product: windows
detection:
  selection:
    Image|endswith: '\\svchost.exe'
  filter:
    ParentImage|endswith: '\\services.exe'
  condition: selection and not filter
tags:
  - attack.t1055.012  # Process Hollowing
  - attack.t1059.001  # PowerShell / Command Execution
level: critical`,
    analystDeduction: 'IOCs cataloged (C2 IP 198.51.100.42, Domain c2.threat-actor.xyz). Automated Wazuh SIEM rule deployed to alert on non-services svchost parentage across enterprise fleet.',
    keyArtifact: 'Deployed Sigma / Wazuh Rule + Threat Intelligence IOC Feed',
    severity: 'Info'
  }
];

export const DfirTimelineScrubber: React.FC = () => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(false);

  const phase = DFIR_PHASES[currentPhaseIndex];

  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentPhaseIndex(prev => {
          if (prev >= DFIR_PHASES.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleCopyCommand = () => {
    navigator.clipboard.writeText(phase.command);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'Critical':
        return 'bg-red-500/20 text-red-400 border-red-500/40 animate-pulse';
      case 'High':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/40';
      case 'Warning':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      default:
        return 'bg-cyber-blue/20 text-cyber-blue border-cyber-blue/40';
    }
  };

  return (
    <div className="rounded-2xl bg-[#0c0517] border border-purple-500/30 overflow-hidden shadow-2xl font-sans text-slate-100">
      
      {/* Title & Toolbar */}
      <div className="bg-[#120722] p-4 sm:p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold uppercase">
              INTERACTIVE FORENSIC TIMELINE
            </span>
            <span className="text-xs font-mono text-slate-400">
              Volatility 3 Framework
            </span>
          </div>
          <h3 className="font-display font-bold text-base sm:text-lg text-white">
            Process Hollowing & In-Memory Code Injection Investigation
          </h3>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            onClick={() => setCurrentPhaseIndex(prev => Math.max(0, prev - 1))}
            disabled={currentPhaseIndex === 0}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 border border-white/10 transition-colors"
            title="Previous Phase"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-bold transition-all shadow-neon-purple"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
          </button>

          <button
            onClick={() => setCurrentPhaseIndex(prev => Math.min(DFIR_PHASES.length - 1, prev + 1))}
            disabled={currentPhaseIndex === DFIR_PHASES.length - 1}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 border border-white/10 transition-colors"
            title="Next Phase"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setIsPlaying(false);
              setCurrentPhaseIndex(0);
            }}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
            title="Reset to Phase 1"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrubber Progress Bar */}
      <div className="px-4 sm:px-6 py-4 bg-black/40 border-b border-white/5">
        <div className="flex items-center justify-between gap-1 sm:gap-2">
          {DFIR_PHASES.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setIsPlaying(false);
                setCurrentPhaseIndex(idx);
              }}
              className={`flex-1 flex flex-col items-center gap-1.5 group transition-all text-center`}
            >
              <div className={`w-full h-1.5 rounded-full transition-all ${
                idx === currentPhaseIndex 
                  ? 'bg-purple-500 shadow-neon-purple' 
                  : idx < currentPhaseIndex 
                  ? 'bg-emerald-500' 
                  : 'bg-white/10'
              }`} />
              <div className="flex items-center gap-1">
                <span className={`text-[10px] font-mono font-bold transition-colors ${
                  idx === currentPhaseIndex ? 'text-purple-300' : 'text-slate-500 group-hover:text-slate-300'
                }`}>
                  P{p.id}
                </span>
                <span className="hidden md:inline text-[9px] font-mono text-slate-600 truncate max-w-[80px]">
                  {p.time}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Investigation Panel */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Volatility CLI Command & Terminal Output (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-purple-400" />
              <span>Volatility 3 Forensics Console:</span>
            </span>
            <button
              onClick={handleCopyCommand}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-purple-400 hover:text-purple-300 transition-colors"
            >
              {copiedCmd ? <Check className="w-3 h-3 text-cyber-green" /> : <Copy className="w-3 h-3" />}
              <span>{copiedCmd ? 'Copied' : 'Copy CLI'}</span>
            </button>
          </div>

          {/* Interactive Shell Box */}
          <div className="rounded-xl bg-black/90 border border-purple-500/30 overflow-hidden font-mono text-xs shadow-inner">
            <div className="bg-white/5 px-3 py-1.5 border-b border-white/10 flex items-center justify-between text-[11px] text-slate-400">
              <span>ragav@dfir-workstation:~/investigations/case-021</span>
              <span>volatility3 v2.5.0</span>
            </div>
            
            <div className="p-3.5 space-y-3 overflow-x-auto">
              <div>
                <span className="text-cyber-green">$ </span>
                <span className="text-white font-bold whitespace-pre">{phase.command}</span>
              </div>
              <pre className="text-slate-300 text-[11px] leading-relaxed whitespace-pre font-mono border-t border-white/5 pt-2">
                {phase.outputPreview}
              </pre>
            </div>
          </div>
        </div>

        {/* Right Column: Forensic Deduction & Artifact Analysis (5 cols) */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Phase Tag & Title */}
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border uppercase font-bold ${getSeverityBadge(phase.severity)}`}>
                  {phase.severity} SEVERITY
                </span>
                <span className="text-xs font-mono text-cyber-blue font-semibold">
                  {phase.time}
                </span>
              </div>
              <h4 className="font-display font-bold text-lg text-white">
                {phase.title}
              </h4>
              <p className="text-xs font-mono text-purple-400 mt-0.5">
                Discipline: {phase.category}
              </p>
            </div>

            {/* Forensic Analyst Deduction */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                Lead Investigator Finding:
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {phase.analystDeduction}
              </p>
            </div>

            {/* Key Artifact Card */}
            <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/30 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300 block font-bold">
                Extracted Evidence Artifact:
              </span>
              <p className="text-xs font-mono text-cyber-green font-semibold">
                {phase.keyArtifact}
              </p>
            </div>

          </div>

          {/* Stepper Footer info */}
          <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400 border-t border-white/5">
            <span>Phase {phase.id} of {DFIR_PHASES.length}</span>
            <span>Research: Sri Ragav Surya A</span>
          </div>

        </div>

      </div>

    </div>
  );
};
