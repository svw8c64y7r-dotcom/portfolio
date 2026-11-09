import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CommandPalette } from './components/CommandPalette';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { VaptReport } from './sections/VaptReport';
import { Blog } from './sections/Blog';
import { Achievements } from './sections/Achievements';
import { Certifications } from './sections/Certifications';
import { Education } from './sections/Education';
import { Research } from './sections/Research';
import { TerminalSection } from './sections/TerminalSection';
import { GithubSection } from './sections/GithubSection';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { NotFound } from './components/NotFound';
import { RecruiterDossierModal } from './components/RecruiterDossierModal';
import { OperatorModeProvider } from './context/OperatorModeContext';

export const App: React.FC = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }

    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      setIsNotFound(true);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrollPercent = (totalScroll / windowHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, scrollPercent)));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (isNotFound) {
    return <NotFound onBackToHome={() => {
      window.history.pushState({}, '', '/');
      setIsNotFound(false);
    }} />;
  }

  return (
    <OperatorModeProvider>
    <div className="min-h-screen bg-[#110720] text-slate-100 flex flex-col font-sans selection:bg-purple-500/30 selection:text-purple-300">
      {/* Top Cyber Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 via-cyber-blue to-cyber-green z-50 transition-all duration-75 shadow-neon-purple pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Fixed Header with Integrated SOC Telemetry HUD & Navigation Bar */}
      <Navbar 
        onOpenResumeModal={() => setIsResumeModalOpen(true)} 
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenDossier={() => setIsDossierOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        <Hero onOpenResumeModal={() => setIsResumeModalOpen(true)} />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <VaptReport />
        <Blog />
        <Achievements />
        <Certifications />
        <Education />
        <Research />
        <TerminalSection />
        <GithubSection />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Official Resume Viewer / Download Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      {/* Global Command Palette (Ctrl+K / Cmd+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />

      {/* Recruiter 60-Second Dossier Modal */}
      <RecruiterDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
      />
    </div>
    </OperatorModeProvider>
  );
};

export default App;
