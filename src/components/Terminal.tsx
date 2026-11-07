import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal as TerminalIcon, 
  X, 
  Maximize2, 
  Minimize2, 
  Copy, 
  Check, 
  CornerDownLeft,
  Volume2,
  VolumeX,
  Sparkles,
  Download
} from 'lucide-react';
import { personalData } from '../data/personal';
import { skillGroups } from '../data/skills';
import { projectsData } from '../data/projects';
import { experienceData } from '../data/experience';
import { achievementsData } from '../data/achievements';
import { certificationsData } from '../data/certifications';
import { educationData } from '../data/education';
import { vaptAssessmentData, VulnerabilityFinding } from '../data/vaptReports';
import { blogPostsData, BlogPost } from '../data/blogPosts';

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
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Synthesize futuristic cyber audio feedback via Web Audio API (zero external assets)
  const playCyberSound = (type: 'key' | 'success' | 'clear') => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'key') {
        osc.frequency.setValueAtTime(600, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
      } else if (type === 'success') {
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.12);
      }
    } catch {
      // Audio not permitted without user gesture
    }
  };

  const availableCommands = [
    'help', 'about', 'skills', 'projects', 'vapt', 'blog', 'experience', 'achievements',
    'certifications', 'education', 'github', 'linkedin', 'contact', 'resume',
    'clear', 'banner', 'status', 'mitre', 'cve', 'soc', 'ping', 'whoami', 'date'
  ];

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
            <div className="text-purple-400 font-mono leading-tight whitespace-pre font-bold">
{`   _____ _____  _____   _____            _______     __
  / ____|  __ \\|_   _| |  __ \\   /\\    / ____\\ \\   / /
 | (___ | |__) | | |   | |__) | /  \\  | |  __ \\ \\_/ / 
  \\___ \\|  _  /  | |   |  _  / / /\\ \\ | | |_ | \\   /  
  ____) | | \\ \\ _| |_  | | \\ \\/ ____ \\| |__| |  | |   
 |_____/|_|  \\_\\_____| |_|  \\_/_/    \\_\\_____|  |_|   `}
            </div>
            <div className="text-slate-400 font-mono">
              [+] System: <span className="text-cyber-blue">CYBER-PORTFOLIO-OS v2.8.0</span> (Zero-Trust Sandbox)
            </div>
            <div className="text-slate-400 font-mono">
              [+] Operator: <span className="text-purple-400 font-bold">{personalData.name}</span>
            </div>
            <div className="text-slate-400 font-mono">
              [+] Status: <span className="text-emerald-400 font-bold">ONLINE // ZERO_VULNERABILITIES_DETECTED</span>
            </div>
            <div className="text-slate-300 font-mono pt-1">
              Type <span className="text-purple-300 font-bold bg-purple-500/20 px-1.5 py-0.5 rounded border border-purple-500/30">help</span> to view available commands. Press <kbd className="text-cyber-green bg-black/40 px-1 rounded">Tab</kbd> for autocompletion.
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

    playCyberSound('success');
    const lowerCmd = cmd.toLowerCase();
    const args = lowerCmd.split(' ');
    const mainCmd = args[0];

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
            <p className="text-purple-300 font-semibold">Available Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs">
              <div><span className="text-purple-400 font-bold inline-block w-28">about</span> - Professional intro & bio</div>
              <div><span className="text-purple-400 font-bold inline-block w-28">skills</span> - Categorized technical skills matrix</div>
              <div><span className="text-purple-400 font-bold inline-block w-28">projects</span> - Security tools & practical labs</div>
              <div><span className="text-purple-400 font-bold inline-block w-28">vapt</span> - OWASP assessment reports & CVSS</div>
              <div><span className="text-purple-400 font-bold inline-block w-28">blog</span> - Security research & technical writeups</div>
              <div><span className="text-purple-400 font-bold inline-block w-28">experience</span> - Cyber Security Engineer @ Pitowings</div>
              <div><span className="text-purple-400 font-bold inline-block w-28">achievements</span> - 4th Place CTF & DEFCON Top 50</div>
              <div><span className="text-purple-400 font-bold inline-block w-28">certifications</span> - Credentials & industry training</div>
              <div><span className="text-purple-400 font-bold inline-block w-28">education</span> - M.Sc. & B.Sc. qualifications</div>
              <div><span className="text-purple-400 font-bold inline-block w-28">github</span> - Official GitHub profile & repos</div>
              <div><span className="text-purple-400 font-bold inline-block w-28">linkedin</span> - LinkedIn professional connection</div>
              <div><span className="text-purple-400 font-bold inline-block w-28">contact</span> - Verified communication channels</div>
              <div><span className="text-purple-400 font-bold inline-block w-28">resume</span> - Download official 159 KB PDF</div>
              <div><span className="text-purple-400 font-bold inline-block w-28">mitre</span> - MITRE ATT&CK framework coverage</div>
              <div><span className="text-purple-400 font-bold inline-block w-28">soc</span> - Simulated live SOC defense telemetry</div>
              <div><span className="text-purple-400 font-bold inline-block w-28">status</span> - Inspect system defense parameters</div>
              <div><span className="text-purple-400 font-bold inline-block w-28">ping</span> - Test telemetry latency</div>
              <div><span className="text-purple-400 font-bold inline-block w-28">clear</span> - Clear terminal session output</div>
            </div>
            <p className="text-slate-400 text-xs italic pt-1">
              Tip: Press Up/Down arrows for command history or click any quick command chip below.
            </p>
          </div>
        );
        break;

      case 'about':
        outputContent = (
          <div className="space-y-2 text-xs md:text-sm font-mono text-slate-300">
            <div className="text-purple-400 font-bold text-sm">=== CANDIDATE PROFILE ===</div>
            <p><span className="text-purple-300 font-semibold">Name:</span> {personalData.name}</p>
            <p><span className="text-purple-300 font-semibold">Specialization:</span> {personalData.subtitle}</p>
            <div className="p-3 bg-black/50 border border-white/10 rounded-xl mt-2 text-xs text-slate-300 leading-relaxed">
              {personalData.summary}
            </div>
          </div>
        );
        break;

      case 'skills':
        outputContent = (
          <div className="space-y-3 text-xs md:text-sm font-mono">
            <div className="text-purple-400 font-bold text-sm">=== TECHNICAL SKILLS MATRIX ===</div>
            {skillGroups.map(group => (
              <div key={group.id} className="border-l-2 border-purple-500/50 pl-3 py-0.5">
                <span className="text-purple-300 font-semibold">{group.category}</span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {group.skills.map((s, idx) => (
                    <span key={idx} className="bg-white/5 px-2 py-0.5 rounded text-[11px] text-slate-200 border border-white/10">
                      {s.name} <span className="text-cyber-blue">({s.proficiency || 'Verified'})</span>
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
            <div className="text-purple-400 font-bold text-sm">=== CYBERSECURITY PROJECTS & LABS ===</div>
            {projectsData.map(p => (
              <div key={p.id} className="p-2.5 bg-black/40 border border-white/10 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-purple-300 font-bold">{p.title}</span>
                  <span className="text-[11px] px-2 py-0.5 bg-purple-950/60 border border-purple-500/30 text-purple-300 rounded">
                    {p.tag}
                  </span>
                </div>
                <p className="text-slate-300 text-xs mt-1">{p.description}</p>
                <div className="text-[11px] text-slate-400 mt-1">
                  <span className="text-cyber-green font-semibold">Stack:</span> {p.technologies.join(', ')}
                </div>
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-cyber-blue underline text-[11px] block mt-1">
                    Repository: {p.githubUrl}
                  </a>
                )}
              </div>
            ))}
          </div>
        );
        break;

      case 'vapt':
        outputContent = (
          <div className="space-y-3 text-xs md:text-sm font-mono">
            <div className="text-purple-400 font-bold text-sm">=== VAPT ASSESSMENT FINDINGS ({vaptAssessmentData.methodology}) ===</div>
            {vaptAssessmentData.findings.map((f: VulnerabilityFinding) => (
              <div key={f.id} className="p-2.5 bg-black/40 border border-white/10 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-purple-300 font-bold">{f.id} — {f.title}</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded font-bold ${
                    f.severity === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    f.severity === 'High' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                    f.severity === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                    'bg-cyber-blue/20 text-cyber-blue border border-cyber-blue/30'
                  }`}>
                    {f.severity} (CVSS {f.cvssScore})
                  </span>
                </div>
                <div className="text-slate-400 text-xs mt-1">
                  <span className="text-purple-400">Target:</span> {f.affectedComponent} | <span className="text-purple-400">OWASP:</span> {f.category}
                </div>
                <p className="text-slate-300 text-xs mt-1">{f.description}</p>
                <div className="text-[11px] text-cyber-green mt-1">
                  Remediation: {f.remediation.join(' • ')}
                </div>
              </div>
            ))}
            <div className="text-xs text-slate-400 pt-1">
              [+] View full interactive report & download PDF in the <a href="#vapt" className="text-purple-300 underline">#vapt section</a>.
            </div>
          </div>
        );
        break;

      case 'blog':
        outputContent = (
          <div className="space-y-3 text-xs md:text-sm font-mono">
            <div className="text-purple-400 font-bold text-sm">=== CYBERSECURITY BLOG & RESEARCH ===</div>
            {blogPostsData.map((post: BlogPost) => (
              <div key={post.id} className="p-2.5 bg-black/40 border border-white/10 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-purple-300 font-bold">{post.title}</span>
                  <span className="text-[11px] px-2 py-0.5 bg-purple-950/60 border border-purple-500/30 text-purple-300 rounded">
                    {post.category} • {post.readTime}
                  </span>
                </div>
                <p className="text-slate-300 text-xs mt-1">{post.summary}</p>
                <div className="text-[11px] text-slate-400 mt-1">
                  Published: {post.publishedDate} | Tags: {post.tags.join(', ')}
                </div>
              </div>
            ))}
            <div className="text-xs text-slate-400 pt-1">
              [+] Read full articles with copyable code blocks in the <a href="#blog" className="text-purple-300 underline">#blog section</a>.
            </div>
          </div>
        );
        break;

      case 'experience':
        outputContent = (
          <div className="space-y-2 text-xs md:text-sm font-mono">
            <div className="text-purple-400 font-bold text-sm">=== PROFESSIONAL EXPERIENCE ===</div>
            {experienceData.map((exp, idx) => (
              <div key={idx} className="p-3 bg-black/40 border border-purple-500/30 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-purple-300 font-bold text-sm">{exp.position}</span>
                  <span className="text-xs text-cyber-blue">{exp.duration}</span>
                </div>
                <div className="text-xs text-slate-300 font-semibold">{exp.company} • {exp.location}</div>
                <ul className="list-disc list-inside mt-2 space-y-1 text-slate-300 text-xs">
                  {exp.responsibilities.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
                <div className="mt-2 text-xs text-slate-400">
                  <span className="text-purple-400">Tools:</span> {exp.toolsUsed.join(' • ')}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case 'achievements':
        outputContent = (
          <div className="space-y-2 text-xs md:text-sm font-mono">
            <div className="text-purple-400 font-bold text-sm">=== CTF HONORS & ACHIEVEMENTS ===</div>
            {achievementsData.map(a => (
              <div key={a.id} className="p-2.5 bg-black/40 border border-white/10 rounded-xl flex items-start gap-2">
                <span className="text-amber-400 font-bold">🏆</span>
                <div>
                  <div className="text-purple-300 font-bold">{a.title}</div>
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
            <div className="text-purple-400 font-bold text-sm">=== CERTIFICATIONS & CREDENTIALS ===</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {certificationsData.map(c => (
                <div key={c.id} className="p-2.5 bg-black/40 border border-white/10 rounded-xl">
                  <div className="text-purple-300 font-bold text-xs">{c.title}</div>
                  <div className="text-[11px] text-slate-400">{c.issuer}</div>
                  <div className="mt-1">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                      c.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
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
            <div className="text-purple-400 font-bold text-sm">=== ACADEMIC QUALIFICATIONS ===</div>
            {educationData.map((edu, idx) => (
              <div key={idx} className="p-2.5 bg-black/40 border border-white/10 rounded-xl">
                <div className="flex justify-between">
                  <span className="text-purple-300 font-bold">{edu.degree}</span>
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
          <div className="text-xs font-mono text-slate-300">
            [+] Opening GitHub profile: <a href={personalData.github} target="_blank" rel="noreferrer" className="text-cyber-blue underline">{personalData.github}</a>
          </div>
        );
        break;

      case 'linkedin':
        window.open(personalData.linkedin, '_blank', 'noopener,noreferrer');
        outputContent = (
          <div className="text-xs font-mono text-slate-300">
            [+] Opening LinkedIn profile: <a href={personalData.linkedin} target="_blank" rel="noreferrer" className="text-cyber-blue underline">{personalData.linkedin}</a>
          </div>
        );
        break;

      case 'contact':
        outputContent = (
          <div className="space-y-1.5 text-xs font-mono text-slate-300">
            <div className="text-purple-400 font-bold text-sm">=== CONTACT CHANNELS ===</div>
            <p><span className="text-purple-300 font-semibold">Email:</span> <a href={`mailto:${personalData.email}`} className="text-cyber-blue hover:underline">{personalData.email}</a></p>
            <p><span className="text-purple-300 font-semibold">Phone:</span> {personalData.phone}</p>
            <p><span className="text-purple-300 font-semibold">Location:</span> {personalData.location}</p>
            <p><span className="text-purple-300 font-semibold">LinkedIn:</span> <a href={personalData.linkedin} target="_blank" rel="noreferrer" className="text-cyber-blue hover:underline">{personalData.linkedin}</a></p>
            <p><span className="text-purple-300 font-semibold">GitHub:</span> <a href={personalData.github} target="_blank" rel="noreferrer" className="text-cyber-blue hover:underline">{personalData.github}</a></p>
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
          <div className="text-xs font-mono text-slate-300">
            [+] Initiating secure resume download: <span className="text-cyber-green">Sri_Ragav_Surya_Resume.pdf (159 KB)</span>
            <div className="text-xs text-slate-400 mt-1">If download does not begin, <a href="/resume/Sri_Ragav_Surya_Resume.pdf" target="_blank" rel="noreferrer" className="text-purple-300 underline">click here to view PDF</a>.</div>
          </div>
        );
        break;

      case 'mitre':
        outputContent = (
          <div className="space-y-1.5 text-xs font-mono text-slate-300">
            <div className="text-purple-400 font-bold text-sm">=== MITRE ATT&CK TACTICAL MAPPING ===</div>
            <p>[*] <span className="text-cyber-green font-bold">TA0001 (Initial Access):</span> Phishing & External Remote Services (SecOps Certified)</p>
            <p>[*] <span className="text-cyber-green font-bold">TA0002 (Execution):</span> Command and Scripting Interpreter (Python, Java, Bash)</p>
            <p>[*] <span className="text-cyber-green font-bold">TA0005 (Defense Evasion):</span> Process Injection & Volatile Memory Analysis (Volatility 3)</p>
            <p>[*] <span className="text-cyber-green font-bold">TA0007 (Discovery):</span> Network Reconnaissance & Port Scanning (Nmap, Burp Suite)</p>
            <p>[*] <span className="text-cyber-green font-bold">TA0010 (Exfiltration):</span> Automated Detection via Wazuh SIEM & Network PCAPs</p>
          </div>
        );
        break;

      case 'soc':
        outputContent = (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <p>[+] SIEM INGESTION: <span className="text-emerald-400 font-bold">ACTIVE (Wazuh 4.8.x)</span></p>
            <p>[+] ENDPOINT AGENTS: <span className="text-emerald-400">SYNCED (Windows Server & Ubuntu 24.04)</span></p>
            <p>[+] FIM (File Integrity Monitoring): <span className="text-emerald-400">ENABLED</span></p>
            <p>[+] ROOTCHECK & SCA: <span className="text-emerald-400">0 High-Severity Warnings</span></p>
          </div>
        );
        break;

      case 'ping':
        outputContent = (
          <div className="text-xs font-mono text-slate-300">
            PING defense-node.karunya.ac.in (127.0.0.1): 56 data bytes<br />
            64 bytes from 127.0.0.1: icmp_seq=0 ttl=64 time=0.42 ms<br />
            64 bytes from 127.0.0.1: icmp_seq=1 ttl=64 time=0.38 ms<br />
            --- defense-node ping statistics --- 0% packet loss, round-trip min/avg/max = 0.38/0.40/0.42 ms
          </div>
        );
        break;

      case 'status':
        outputContent = (
          <div className="text-xs font-mono space-y-1 text-slate-300">
            <p>[*] THREAT LEVEL: <span className="text-emerald-400 font-bold">DEFCON 5 (ALL SYSTEMS NORMAL)</span></p>
            <p>[*] FIREWALL: <span className="text-cyber-green">ACTIVE & TLS-1.3 ENFORCED</span></p>
            <p>[*] OPERATOR READINESS: <span className="text-purple-300 font-bold">OPEN TO CYBERSECURITY ROLES</span></p>
          </div>
        );
        break;

      case 'whoami':
        outputContent = (
          <div className="text-xs font-mono text-purple-300">
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
            bash: {cmd}: command not found. Type <span className="text-purple-300 underline cursor-pointer" onClick={() => handleExecute('help')}>help</span> for list of available commands.
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
    playCyberSound('key');

    if (e.key === 'Enter') {
      e.preventDefault();
      handleExecute();
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      if (!current) return;
      const match = availableCommands.find(c => c.startsWith(current));
      if (match) {
        setInputVal(match);
      }
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

  const quickCommands = ['help', 'about', 'skills', 'projects', 'vapt', 'blog', 'experience', 'achievements', 'mitre', 'soc', 'contact', 'resume', 'clear'];

  return (
    <div className={`w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0e061a]/95 backdrop-blur-md font-mono transition-all duration-300 ${isMaximized ? 'fixed inset-4 z-50 flex flex-col h-[calc(100vh-2rem)]' : 'h-[520px] flex flex-col'}`}>
      {/* Terminal Titlebar */}
      <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex items-center justify-between select-none">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block cursor-pointer hover:opacity-80" onClick={() => setHistory([])} title="Clear terminal" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block cursor-pointer hover:opacity-80" onClick={() => setIsMaximized(!isMaximized)} title="Toggle size" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block cursor-pointer hover:opacity-80" onClick={() => handleExecute('status')} title="System status" />
          </div>
          <div className="flex items-center space-x-2 pl-3 text-xs text-slate-300 font-mono">
            <TerminalIcon className="w-3.5 h-3.5 text-purple-400" />
            <span className="font-semibold text-slate-200">ragav@cybersecurity:~</span>
            <span className="hidden sm:inline-block text-[10px] text-cyber-green px-1.5 py-0.2 rounded bg-cyber-green/10 border border-cyber-green/30">
              SSH // TLS-1.3
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-slate-400">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1 transition-colors text-xs flex items-center gap-1 ${soundEnabled ? 'text-cyber-green' : 'text-slate-500 hover:text-slate-300'}`}
            title={soundEnabled ? 'Mute audio feedback' : 'Enable audio feedback'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
          <button 
            onClick={handleCopyHistory}
            className="p-1 hover:text-purple-300 transition-colors text-xs flex items-center gap-1"
            title="Copy command history"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-cyber-green" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <button 
            onClick={() => setIsMaximized(!isMaximized)} 
            className="p-1 hover:text-white transition-colors"
            title="Toggle Maximize"
          >
            {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div 
        className="flex-1 p-4 overflow-y-auto space-y-4 font-mono text-xs md:text-sm text-slate-200 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-black/40"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item) => (
          <div key={item.id} className="space-y-1.5">
            <div className="flex items-center space-x-2 text-slate-400">
              <span className="text-purple-400 font-bold">ragav@cybersecurity</span>
              <span className="text-slate-500">:</span>
              <span className="text-cyber-blue font-semibold">~$</span>
              <span className="text-slate-100 font-semibold">{item.command}</span>
              <span className="text-[10px] text-slate-600 ml-auto hidden sm:inline">{item.timestamp}</span>
            </div>
            <div className="pl-2 border-l border-white/10 py-0.5">
              {item.output}
            </div>
          </div>
        ))}

        {/* Active Command Input Line */}
        <div className="flex items-center space-x-2 pt-1">
          <span className="text-purple-400 font-bold">ragav@cybersecurity</span>
          <span className="text-slate-500">:</span>
          <span className="text-cyber-blue font-semibold">~$</span>
          <div className="flex-1 relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent outline-none border-none text-slate-100 font-mono text-xs md:text-sm caret-purple-400"
              placeholder="Type command ('help', 'projects', 'mitre', 'resume')..."
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          <button 
            onClick={() => handleExecute()}
            className="text-slate-400 hover:text-purple-300 px-1.5 py-0.5"
            title="Execute Command"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
        <div ref={bottomRef} />
      </div>

      {/* Quick Command Chips */}
      <div className="p-2.5 bg-black/60 border-t border-white/10 flex items-center gap-1.5 overflow-x-auto text-[11px] select-none scrollbar-none">
        <span className="text-slate-500 font-semibold text-[10px] px-1 uppercase tracking-wider shrink-0">Quick Cmds:</span>
        {quickCommands.map(cmd => (
          <button
            key={cmd}
            onClick={() => handleExecute(cmd)}
            className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 hover:text-purple-300 hover:border-purple-500/40 active:scale-95 transition-all shrink-0 font-mono"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};
