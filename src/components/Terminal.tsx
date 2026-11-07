import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Copy, Check, CornerDownLeft } from 'lucide-react';
import { personalData } from '../data/personal';
import { skillGroups } from '../data/skills';
import { projectsData } from '../data/projects';
import { experienceData } from '../data/experience';
import { achievementsData } from '../data/achievements';
import { certificationsData } from '../data/certifications';
import { educationData } from '../data/education';

interface HistoryItem {
  id: string;
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

interface TerminalProps {
  isOpen?: boolean;
  onClose?: () => void;
  isStandalone?: boolean;
}

export const Terminal: React.FC<TerminalProps> = ({ isStandalone = true }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [commandIndex, setCommandIndex] = useState<number>(-1);
  const [commandHistoryList, setCommandHistoryList] = useState<string[]>([]);
  const [isMaximized, setIsMaximized] = useState(false);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Initial welcome banner
    const welcomeId = 'init-' + Date.now();
    setHistory([
      {
        id: welcomeId,
        command: 'banner',
        timestamp: new Date().toLocaleTimeString(),
        output: (
          <div className="space-y-2 text-xs md:text-sm">
            <div className="text-cyber-green font-mono leading-tight whitespace-pre font-bold">
{`   _____ _____  _____   _____            _______     __
  / ____|  __ \\|_   _| |  __ \\   /\\    / ____\\ \\   / /
 | (___ | |__) | | |   | |__) | /  \\  | |  __ \\ \\_/ / 
  \\___ \\|  _  /  | |   |  _  / / /\\ \\ | | |_ | \\   /  
  ____) | | \\ \\ _| |_  | | \\ \\/ ____ \\| |__| |  | |   
 |_____/|_|  \\_\\_____| |_|  \\_/_/    \\_\\_____|  |_|   `}
            </div>
            <div className="text-slate-400 font-mono">
              [+] System: <span className="text-cyber-blue">CYBER-PORTFOLIO-OS v2.6.4</span> (Secure Sandbox)
            </div>
            <div className="text-slate-400 font-mono">
              [+] Operator: <span className="text-cyber-green font-bold">{personalData.name}</span>
            </div>
            <div className="text-slate-400 font-mono">
              [+] Status: <span className="text-emerald-400">ONLINE // AUTHORIZED_SESSION</span>
            </div>
            <div className="text-slate-300 font-mono pt-1">
              Type <span className="text-cyber-green font-bold bg-cyber-green/10 px-1 py-0.5 rounded">help</span> to view available system commands.
            </div>
          </div>
        )
      }
    ]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCopyHistory = () => {
    const text = history.map(h => `$ ${h.command}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecute = (cmdToRun?: string) => {
    const cmd = (cmdToRun !== undefined ? cmdToRun : inputVal).trim();
    if (!cmd) return;

    const lowerCmd = cmd.toLowerCase();
    const args = lowerCmd.split(' ');
    const mainCmd = args[0];

    // Store in history for up/down navigation
    setCommandHistoryList(prev => [...prev, cmd]);
    setCommandIndex(-1);

    let outputContent: React.ReactNode = null;

    switch (mainCmd) {
      case 'clear':
      case 'cls':
        setHistory([]);
        setInputVal('');
        return;

      case 'help':
        outputContent = (
          <div className="space-y-2 text-xs md:text-sm font-mono text-slate-300">
            <p className="text-cyber-blue font-semibold">Available Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs">
              <div><span className="text-cyber-green font-bold inline-block w-28">about</span> - Professional introduction & overview</div>
              <div><span className="text-cyber-green font-bold inline-block w-28">skills</span> - Categorized technical skills dashboard</div>
              <div><span className="text-cyber-green font-bold inline-block w-28">projects</span> - Cybersecurity & software projects</div>
              <div><span className="text-cyber-green font-bold inline-block w-28">experience</span> - Professional experience at Pitowings</div>
              <div><span className="text-cyber-green font-bold inline-block w-28">achievements</span> - CTF rankings & competitive honors</div>
              <div><span className="text-cyber-green font-bold inline-block w-28">certifications</span> - Industry credentials & training</div>
              <div><span className="text-cyber-green font-bold inline-block w-28">education</span> - M.Sc. & B.Sc. degree qualifications</div>
              <div><span className="text-cyber-green font-bold inline-block w-28">github</span> - Open GitHub profile & repositories</div>
              <div><span className="text-cyber-green font-bold inline-block w-28">linkedin</span> - Open LinkedIn profile connection</div>
              <div><span className="text-cyber-green font-bold inline-block w-28">contact</span> - Direct contact channels & coordinates</div>
              <div><span className="text-cyber-green font-bold inline-block w-28">resume</span> - Download official resume PDF</div>
              <div><span className="text-cyber-green font-bold inline-block w-28">banner</span> - Display system welcome banner</div>
              <div><span className="text-cyber-green font-bold inline-block w-28">status</span> - Inspect current security operational status</div>
              <div><span className="text-cyber-green font-bold inline-block w-28">clear</span> - Clear terminal session output</div>
            </div>
            <p className="text-slate-400 text-xs italic pt-1">
              Tip: Press Up/Down arrows for command history or click the quick action chips below.
            </p>
          </div>
        );
        break;

      case 'about':
        outputContent = (
          <div className="space-y-2 text-xs md:text-sm font-mono text-slate-300">
            <div className="text-cyber-blue font-bold text-sm">=== CANDIDATE PROFILE ===</div>
            <p><span className="text-cyber-green font-semibold">Name:</span> {personalData.name}</p>
            <p><span className="text-cyber-green font-semibold">Headline:</span> {personalData.headline}</p>
            <p><span className="text-cyber-green font-semibold">Specialization:</span> {personalData.subtitle}</p>
            <div className="p-3 bg-cyber-bg/80 border border-cyber-cardBorder rounded mt-2 text-xs text-slate-300 leading-relaxed">
              {personalData.summary}
            </div>
          </div>
        );
        break;

      case 'skills':
        outputContent = (
          <div className="space-y-3 text-xs md:text-sm font-mono">
            <div className="text-cyber-blue font-bold text-sm">=== TECHNICAL SKILLS MATRIX ===</div>
            {skillGroups.map(group => (
              <div key={group.id} className="border-l-2 border-cyber-green/40 pl-3 py-0.5">
                <span className="text-cyber-green font-semibold">{group.category}</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {group.skills.map((s, idx) => (
                    <span key={idx} className="bg-cyber-surface px-2 py-0.5 rounded text-[11px] text-slate-200 border border-cyber-cardBorder">
                      {s.name} <span className="text-cyber-blue/70">({s.proficiency || 'Verified'})</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        outputContent = (
          <div className="space-y-3 text-xs md:text-sm font-mono">
            <div className="text-cyber-blue font-bold text-sm">=== CYBERSECURITY PROJECTS & LABS ===</div>
            {projectsData.map(p => (
              <div key={p.id} className="p-2.5 bg-cyber-surface/60 border border-cyber-cardBorder rounded">
                <div className="flex items-center justify-between">
                  <span className="text-cyber-green font-bold">{p.title}</span>
                  <span className="text-[11px] px-2 py-0.5 bg-cyber-bg border border-cyber-blue/30 text-cyber-blue rounded">
                    {p.tag}
                  </span>
                </div>
                <p className="text-slate-300 text-xs mt-1">{p.description}</p>
                <div className="text-[11px] text-slate-400 mt-1">
                  <span className="text-cyber-purple font-semibold">Stack:</span> {p.technologies.join(', ')}
                </div>
                {p.isLabWork && (
                  <span className="text-[10px] text-amber-400 mt-1 block">
                    [!] Practical Lab Exercise / Evidence Verification Environment
                  </span>
                )}
              </div>
            ))}
          </div>
        );
        break;

      case 'experience':
        outputContent = (
          <div className="space-y-2 text-xs md:text-sm font-mono">
            <div className="text-cyber-blue font-bold text-sm">=== PROFESSIONAL EXPERIENCE ===</div>
            {experienceData.map((exp, idx) => (
              <div key={idx} className="p-3 bg-cyber-surface/60 border border-cyber-green/30 rounded">
                <div className="flex justify-between items-center">
                  <span className="text-cyber-green font-bold text-sm">{exp.position}</span>
                  <span className="text-xs text-cyber-blue">{exp.duration}</span>
                </div>
                <div className="text-xs text-slate-300 font-semibold">{exp.company} • {exp.location}</div>
                <ul className="list-disc list-inside mt-2 space-y-1 text-slate-300 text-xs">
                  {exp.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
                <div className="mt-2 text-xs text-slate-400">
                  <span className="text-cyber-purple">Tools & Methods:</span> {exp.toolsUsed.join(' • ')}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'achievements':
        outputContent = (
          <div className="space-y-2 text-xs md:text-sm font-mono">
            <div className="text-cyber-blue font-bold text-sm">=== CTF HONORS & ACHIEVEMENTS ===</div>
            {achievementsData.map(a => (
              <div key={a.id} className="p-2.5 bg-cyber-surface/60 border border-cyber-cardBorder rounded flex items-start gap-2">
                <span className="text-cyber-green font-bold">🏆</span>
                <div>
                  <div className="text-cyber-green font-bold">{a.title}</div>
                  <div className="text-xs text-slate-400">Host: {a.issuerOrHost}</div>
                  <p className="text-xs text-slate-300 mt-1">{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'certifications':
        outputContent = (
          <div className="space-y-2 text-xs md:text-sm font-mono">
            <div className="text-cyber-blue font-bold text-sm">=== CERTIFICATIONS & CREDENTIALS ===</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {certificationsData.map(c => (
                <div key={c.id} className="p-2.5 bg-cyber-surface/60 border border-cyber-cardBorder rounded">
                  <div className="text-cyber-green font-bold text-xs">{c.title}</div>
                  <div className="text-[11px] text-slate-400">{c.issuer}</div>
                  <div className="mt-1">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                      c.status === 'Completed' 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      {c.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        break;

      case 'education':
        outputContent = (
          <div className="space-y-2 text-xs md:text-sm font-mono">
            <div className="text-cyber-blue font-bold text-sm">=== ACADEMIC QUALIFICATIONS ===</div>
            {educationData.map((edu, idx) => (
              <div key={idx} className="p-2.5 bg-cyber-surface/60 border border-cyber-cardBorder rounded">
                <div className="flex justify-between">
                  <span className="text-cyber-green font-bold">{edu.degree}</span>
                  <span className="text-xs text-cyber-blue">{edu.duration}</span>
                </div>
                <div className="text-xs text-slate-300">{edu.institution}</div>
                <div className="text-xs text-emerald-400 mt-0.5">CGPA: {edu.cgpa} ({edu.status})</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'github':
        window.open(personalData.github, '_blank', 'noopener,noreferrer');
        outputContent = (
          <div className="text-xs md:text-sm font-mono text-slate-300">
            [+] Opening GitHub profile in new tab: <a href={personalData.github} target="_blank" rel="noreferrer" className="text-cyber-blue underline">{personalData.github}</a>
          </div>
        );
        break;

      case 'linkedin':
        window.open(personalData.linkedin, '_blank', 'noopener,noreferrer');
        outputContent = (
          <div className="text-xs md:text-sm font-mono text-slate-300">
            [+] Opening LinkedIn profile in new tab: <a href={personalData.linkedin} target="_blank" rel="noreferrer" className="text-cyber-blue underline">{personalData.linkedin}</a>
          </div>
        );
        break;

      case 'contact':
        outputContent = (
          <div className="space-y-1.5 text-xs md:text-sm font-mono text-slate-300">
            <div className="text-cyber-blue font-bold text-sm">=== CONTACT CHANNELS ===</div>
            <p><span className="text-cyber-green font-semibold">Email:</span> <a href={`mailto:${personalData.email}`} className="text-cyber-blue hover:underline">{personalData.email}</a></p>
            <p><span className="text-cyber-green font-semibold">Phone:</span> {personalData.phone}</p>
            <p><span className="text-cyber-green font-semibold">Location:</span> {personalData.location}</p>
            <p><span className="text-cyber-green font-semibold">LinkedIn:</span> <a href={personalData.linkedin} target="_blank" rel="noreferrer" className="text-cyber-blue hover:underline">{personalData.linkedin}</a></p>
            <p><span className="text-cyber-green font-semibold">GitHub:</span> <a href={personalData.github} target="_blank" rel="noreferrer" className="text-cyber-blue hover:underline">{personalData.github}</a></p>
          </div>
        );
        break;

      case 'resume':
        const link = document.createElement('a');
        link.href = '/resume/Sri_Ragav_Surya_Resume.pdf';
        link.download = 'Sri_Ragav_Surya_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        outputContent = (
          <div className="text-xs md:text-sm font-mono text-slate-300">
            [+] Initiating secure resume download: <span className="text-cyber-green">Sri_Ragav_Surya_Resume.pdf</span>
            <div className="text-xs text-slate-400 mt-1">If download does not begin, <a href="/resume/Sri_Ragav_Surya_Resume.pdf" target="_blank" rel="noreferrer" className="text-cyber-blue underline">click here to view PDF</a>.</div>
          </div>
        );
        break;

      case 'banner':
        outputContent = (
          <div className="text-cyber-green font-mono whitespace-pre text-xs">
{`[+] SRI RAGAV SURYA A | CYBERSECURITY PROFESSIONAL & RESEARCHER
[+] Web Security • VAPT • SOC • DFIR • GRC • Secure Development`}
          </div>
        );
        break;

      case 'status':
        outputContent = (
          <div className="text-xs font-mono space-y-1 text-slate-300">
            <p>[*] THREAT LEVEL: <span className="text-emerald-400 font-bold">DEFCON 5 (ALL SYSTEMS NORMAL)</span></p>
            <p>[*] FIREWALL: <span className="text-cyber-green">ACTIVE & AUDITED</span></p>
            <p>[*] SANDBOX INTEGRITY: <span className="text-cyber-blue">VERIFIED (NON-EVAL EXECUTION)</span></p>
            <p>[*] AVAILABILITY: <span className="text-emerald-400">OPEN TO PROFESSIONAL OPPORTUNITIES</span></p>
          </div>
        );
        break;

      case 'whoami':
        outputContent = (
          <div className="text-xs font-mono text-cyber-green">
            sri_ragav_surya (uid=1000, gid=1000, roles=[sec_ops, pentest, dfir, dev])
          </div>
        );
        break;

      case 'date':
        outputContent = (
          <div className="text-xs font-mono text-slate-300">
            {new Date().toString()}
          </div>
        );
        break;

      default:
        outputContent = (
          <div className="text-xs font-mono text-red-400">
            bash: {cmd}: command not found. Type <span className="text-cyber-green underline cursor-pointer" onClick={() => handleExecute('help')}>help</span> for list of available commands.
          </div>
        );
        break;
    }

    const newItem: HistoryItem = {
      id: 'cmd-' + Date.now(),
      command: cmd,
      output: outputContent,
      timestamp: new Date().toLocaleTimeString()
    };

    setHistory(prev => [...prev, newItem]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleExecute();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistoryList.length === 0) return;
      const nextIndex = commandIndex + 1;
      if (nextIndex < commandHistoryList.length) {
        setCommandIndex(nextIndex);
        setInputVal(commandHistoryList[commandHistoryList.length - 1 - nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandIndex > 0) {
        const nextIndex = commandIndex - 1;
        setCommandIndex(nextIndex);
        setInputVal(commandHistoryList[commandHistoryList.length - 1 - nextIndex]);
      } else if (commandIndex === 0) {
        setCommandIndex(-1);
        setInputVal('');
      }
    }
  };

  const quickCommands = ['help', 'about', 'skills', 'projects', 'experience', 'achievements', 'contact', 'resume', 'clear'];

  return (
    <div className={`w-full rounded-xl overflow-hidden border border-cyber-cardBorder shadow-2xl bg-cyber-bg/95 backdrop-blur-md font-mono transition-all duration-300 ${isMaximized ? 'fixed inset-4 z-50 flex flex-col h-[calc(100vh-2rem)]' : 'h-[500px] flex flex-col'}`}>
      {/* Terminal Titlebar */}
      <div className="bg-cyber-surface px-4 py-2.5 border-b border-cyber-cardBorder flex items-center justify-between select-none">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block cursor-pointer hover:opacity-80" onClick={() => setHistory([])} title="Clear terminal" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block cursor-pointer hover:opacity-80" onClick={() => setIsMaximized(!isMaximized)} title="Toggle size" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block cursor-pointer hover:opacity-80" onClick={() => handleExecute('status')} title="System status" />
          </div>
          <div className="flex items-center space-x-2 pl-3 text-xs text-slate-300 font-mono">
            <TerminalIcon className="w-3.5 h-3.5 text-cyber-green" />
            <span className="font-semibold text-slate-200">ragav@cybersecurity:~</span>
            <span className="hidden sm:inline-block text-[10px] text-cyber-green px-1.5 py-0.2 rounded bg-cyber-green/10 border border-cyber-green/30">
              SSH // TLS-1.3
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-slate-400">
          <button 
            onClick={handleCopyHistory}
            className="p-1 hover:text-cyber-green transition-colors text-xs flex items-center gap-1"
            title="Copy command history"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-cyber-green" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button 
            onClick={() => setIsMaximized(!isMaximized)} 
            className="p-1 hover:text-cyber-blue transition-colors"
            title="Toggle Maximize"
          >
            {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-xs md:text-sm text-slate-200 scrollbar-thin scrollbar-thumb-cyber-cardBorder scrollbar-track-cyber-bg"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item) => (
          <div key={item.id} className="space-y-1.5">
            <div className="flex items-center space-x-2 text-slate-400">
              <span className="text-cyber-green font-bold">ragav@cybersecurity</span>
              <span className="text-slate-500">:</span>
              <span className="text-cyber-blue font-semibold">~$</span>
              <span className="text-slate-100 font-semibold">{item.command}</span>
              <span className="text-[10px] text-slate-600 ml-auto hidden sm:inline">{item.timestamp}</span>
            </div>
            <div className="pl-2 border-l border-slate-700/50 py-0.5">
              {item.output}
            </div>
          </div>
        ))}

        {/* Active Command Input Line */}
        <div className="flex items-center space-x-2 pt-1">
          <span className="text-cyber-green font-bold">ragav@cybersecurity</span>
          <span className="text-slate-500">:</span>
          <span className="text-cyber-blue font-semibold">~$</span>
          <div className="flex-1 relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent outline-none border-none text-slate-100 font-mono text-xs md:text-sm caret-cyber-green"
              placeholder="Type command ('help', 'projects', 'resume')..."
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          <button 
            onClick={() => handleExecute()}
            className="text-slate-400 hover:text-cyber-green px-1.5 py-0.5"
            title="Execute Command"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
        <div ref={bottomRef} />
      </div>

      {/* Quick Command Chips for mobile and quick browsing */}
      <div className="p-2.5 bg-cyber-surface/90 border-t border-cyber-cardBorder flex items-center gap-1.5 overflow-x-auto text-[11px] select-none scrollbar-none">
        <span className="text-slate-500 font-semibold text-[10px] px-1 uppercase tracking-wider shrink-0">Quick Cmds:</span>
        {quickCommands.map(cmd => (
          <button
            key={cmd}
            onClick={() => handleExecute(cmd)}
            className="px-2 py-0.5 rounded bg-cyber-card border border-cyber-cardBorder text-slate-300 hover:text-cyber-green hover:border-cyber-green/50 active:scale-95 transition-all shrink-0 font-mono"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};
