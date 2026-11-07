import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Search, 
  Terminal, 
  FileCheck2, 
  Binary, 
  Bot, 
  Layers, 
  CheckCircle,
  Sparkles,
  Copy,
  Check,
  Crosshair,
  X
} from 'lucide-react';
import { skillGroups } from '../data/skills';
import { SkillGroup, SkillItem } from '../types';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedMatrix, setCopiedMatrix] = useState(false);
  const [showMitreModal, setShowMitreModal] = useState(false);

  const mitreTactics = [
    {
      id: 'TA0043',
      tactic: 'Reconnaissance',
      techniques: [
        { id: 'T1595', name: 'Active Scanning', tool: 'Nmap, Gobuster' },
        { id: 'T1592', name: 'Gather Victim Host Info', tool: 'OSINT, DNS Enum' },
        { id: 'T1590', name: 'Gather Victim Network Info', tool: 'Wireshark, Whois' }
      ]
    },
    {
      id: 'TA0001',
      tactic: 'Initial Access',
      techniques: [
        { id: 'T1190', name: 'Exploit Public-Facing App', tool: 'Burp Suite, OWASP WSTG' },
        { id: 'T1566', name: 'Phishing Simulation & Defense', tool: 'SecOps SEDP' },
        { id: 'T1078', name: 'Valid Accounts Auditing', tool: 'Auth & JWT Testing' }
      ]
    },
    {
      id: 'TA0002',
      tactic: 'Execution',
      techniques: [
        { id: 'T1059.006', name: 'Python Automation', tool: 'Security Scripts & Scanners' },
        { id: 'T1059.004', name: 'Unix Shell / Bash', tool: 'Kali Linux CLI' },
        { id: 'T1203', name: 'Exploitation Testing', tool: 'Metasploit Framework' }
      ]
    },
    {
      id: 'TA0005',
      tactic: 'Defense Evasion',
      techniques: [
        { id: 'T1055', name: 'Process Injection Analysis', tool: 'Volatility 3 (DFIR)' },
        { id: 'T1070', name: 'Indicator Removal Detection', tool: 'Windows Event Logs' },
        { id: 'T1027', name: 'Obfuscated Payloads', tool: 'YARA Rules & SIEM' }
      ]
    },
    {
      id: 'TA0007',
      tactic: 'Discovery',
      techniques: [
        { id: 'T1046', name: 'Network Service Discovery', tool: 'Nmap Stealth Scans' },
        { id: 'T1083', name: 'File & Directory Discovery', tool: 'Gobuster, Dirb' },
        { id: 'T1087', name: 'Account Discovery', tool: 'Active Directory Labs' }
      ]
    },
    {
      id: 'TA0010',
      tactic: 'Exfiltration & Forensics',
      techniques: [
        { id: 'T1041', name: 'Exfiltration Over C2', tool: 'PCAP & Zeek Traffic Analysis' },
        { id: 'T1005', name: 'Data from Local System', tool: 'Autopsy & Disk Forensics' },
        { id: 'T1048', name: 'Exfiltration Over Protocol', tool: 'Wireshark Protocol Dumps' }
      ]
    }
  ];

  const categoryIcons: Record<string, React.ReactNode> = {
    'offensive-security': <ShieldAlert className="w-4 h-4 text-purple-400" />,
    'defensive-security': <ShieldCheck className="w-4 h-4 text-cyber-blue" />,
    'dfir': <Binary className="w-4 h-4 text-cyber-green" />,
    'grc': <FileCheck2 className="w-4 h-4 text-indigo-400" />,
    'programming-development': <Terminal className="w-4 h-4 text-amber-400" />,
    'automation-testing': <Bot className="w-4 h-4 text-emerald-400" />,
  };

  const filteredGroups = skillGroups.filter(group => {
    if (selectedCategory !== 'all' && group.id !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim() === '') {
      return true;
    }
    const q = searchQuery.toLowerCase();
    const matchesGroup = group.category.toLowerCase().includes(q) || group.description.toLowerCase().includes(q);
    const matchesSkill = group.skills.some(s => s.name.toLowerCase().includes(q));
    return matchesGroup || matchesSkill;
  });

  const getProficiencyBadgeStyle = (prof?: string) => {
    switch (prof) {
      case 'Core Competency':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/40 shadow-sm';
      case 'Advanced':
        return 'bg-cyber-blue/15 text-cyber-blue border-cyber-blue/40';
      case 'Proficient':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/40';
      case 'Hands-On':
        return 'bg-amber-400/15 text-amber-300 border-amber-400/40';
      default:
        return 'bg-white/5 text-slate-300 border-white/10';
    }
  };

  const handleCopySkillsMatrix = () => {
    const text = skillGroups.map(g => 
      `[${g.category.toUpperCase()}]\n` + g.skills.map(s => ` - ${s.name} (${s.proficiency || 'Verified'})`).join('\n')
    ).join('\n\n');
    navigator.clipboard.writeText(`SRI RAGAV SURYA A - TECHNICAL SKILLS MATRIX\n\n${text}`);
    setCopiedMatrix(true);
    setTimeout(() => setCopiedMatrix(false), 2000);
  };

  return (
    <section id="skills" className="py-20 bg-[#110720] relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>TECHNICAL COMPETENCY MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight">
              Interactive Skills Dashboard
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-mono">
              Curated capabilities verified through hands-on testing, CTF competitions, security labs, and production development.
            </p>
          </div>

          {/* Quick Search & Export */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <div className="relative w-56 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search skills (e.g. Burp, Python)..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white/5 border border-white/10 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-purple-400 transition-colors font-mono"
              />
            </div>

            <button
              onClick={handleCopySkillsMatrix}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-medium bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-purple-400 transition-all shrink-0"
              title="Copy formatted skills matrix"
            >
              {copiedMatrix ? <Check className="w-3.5 h-3.5 text-cyber-green" /> : <Copy className="w-3.5 h-3.5 text-purple-400" />}
              <span className="hidden sm:inline">{copiedMatrix ? 'Copied' : 'Export Matrix'}</span>
            </button>

            <button
              onClick={() => setShowMitreModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-bold bg-purple-500/15 border border-purple-500/30 text-purple-300 hover:bg-purple-500/25 transition-all shrink-0"
              title="View MITRE ATT&CK Matrix Mapping"
            >
              <Crosshair className="w-3.5 h-3.5 text-cyber-green" />
              <span>MITRE Matrix</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none select-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold shadow-neon-purple'
                : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white'
            }`}
          >
            All Disciplines ({skillGroups.reduce((acc, g) => acc + g.skills.length, 0)})
          </button>

          {skillGroups.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedCategory(g.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all shrink-0 ${
                selectedCategory === g.id
                  ? 'bg-purple-500/30 border border-purple-400 text-purple-200 font-bold'
                  : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-slate-500'
              }`}
            >
              {categoryIcons[g.id]}
              <span>{g.category}</span>
              <span className="text-[10px] opacity-70">({g.skills.length})</span>
            </button>
          ))}
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGroups.map((group) => {
            const filteredSkills = searchQuery.trim() === '' 
              ? group.skills 
              : group.skills.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

            if (filteredSkills.length === 0) return null;

            return (
              <div
                key={group.id}
                className="rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 p-5 sm:p-6 flex flex-col justify-between hover:border-purple-500/40 transition-all duration-300 group shadow-lg backdrop-blur-md"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-black/40 border border-white/10 group-hover:border-purple-500/40 transition-colors">
                        {categoryIcons[group.id]}
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-base text-white group-hover:text-purple-300 transition-colors">
                          {group.category}
                        </h3>
                        <span className="text-[10px] font-mono text-slate-400">
                          {group.code}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                    {group.description}
                  </p>

                  {/* Skills Tag Cloud */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                    {filteredSkills.map((skill: SkillItem, idx: number) => (
                      <div
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/40 border border-white/10 text-slate-200 hover:border-purple-500/40 transition-all"
                      >
                        <span className="text-xs font-medium font-sans">
                          {skill.name}
                        </span>
                        {skill.proficiency && (
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded border ${getProficiencyBadgeStyle(skill.proficiency)}`}>
                            {skill.proficiency}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1 text-cyber-green">
                    <CheckCircle className="w-3 h-3" />
                    <span>Explainable & Tested</span>
                  </span>
                  <span className="text-slate-500">{filteredSkills.length} Verified Items</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend Banner */}
        <div className="mt-12 p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span>Honest Evaluation Notice: Only displaying skills tested through practical labs, real assessments, or code. No arbitrary percentages.</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="px-2 py-0.5 rounded bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px]">Core</span>
            <span className="px-2 py-0.5 rounded bg-cyber-blue/20 border border-cyber-blue/40 text-cyber-blue text-[10px]">Advanced</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px]">Proficient</span>
            <span className="px-2 py-0.5 rounded bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[10px]">Hands-On</span>
          </div>
        </div>

        {/* MITRE ATT&CK Matrix Interactive Modal */}
        {showMitreModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0517] border border-cyber-green/40 rounded-2xl shadow-2xl overflow-y-auto font-sans flex flex-col text-slate-100">
              
              {/* Modal Header */}
              <div className="sticky top-0 z-10 bg-[#0c0517]/95 backdrop-blur px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Crosshair className="w-5 h-5 text-cyber-green" />
                  <span className="font-display font-bold text-white text-base">
                    MITRE ATT&CK® Enterprise Tactical Coverage Matrix
                  </span>
                </div>
                <button
                  onClick={() => setShowMitreModal(false)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-6">
                <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/30 text-xs font-mono text-slate-300">
                  <span className="text-purple-300 font-bold block mb-1">CANDIDATE COVERAGE STANDARD</span>
                  Tactical mapping of Sri Ragav Surya&apos;s offensive penetration testing, defensive SOC telemetry, and forensic analysis capabilities aligned with the MITRE ATT&CK Enterprise Framework.
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mitreTactics.map(tactic => (
                    <div key={tactic.id} className="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono text-cyber-green px-1.5 py-0.5 rounded bg-cyber-green/10 border border-cyber-green/30">
                            {tactic.id}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">TACTIC</span>
                        </div>
                        <h4 className="font-display font-bold text-sm text-white mb-3">
                          {tactic.tactic}
                        </h4>

                        <div className="space-y-2">
                          {tactic.techniques.map(tech => (
                            <div key={tech.id} className="p-2 rounded-lg bg-black/40 border border-white/5">
                              <div className="flex items-center justify-between text-xs font-mono text-purple-300 font-medium">
                                <span>{tech.name}</span>
                                <span className="text-[10px] text-slate-500">{tech.id}</span>
                              </div>
                              <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                                Verified Tools: <span className="text-cyber-blue">{tech.tool}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-[#0c0517]/95 backdrop-blur px-6 py-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Aligned with MITRE ATT&CK v14</span>
                <button
                  onClick={() => setShowMitreModal(false)}
                  className="px-5 py-2 rounded-xl text-xs font-mono font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  Close Matrix
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
