import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
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

export const App: React.FC = () => {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    // Simple 404 simulation if someone loads a path other than root
    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      setIsNotFound(true);
    }
  }, []);

  if (isNotFound) {
    return <NotFound onBackToHome={() => {
      window.history.pushState({}, '', '/');
      setIsNotFound(false);
    }} />;
  }

  return (
    <div className="min-h-screen bg-cyber-bg text-slate-100 flex flex-col font-sans selection:bg-cyber-green/20 selection:text-cyber-green">
      {/* Sticky Navigation Bar */}
      <Navbar onOpenResumeModal={() => setIsResumeModalOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1">
        <Hero onOpenResumeModal={() => setIsResumeModalOpen(true)} />
        <About />
        <Skills />
        <Experience />
        <Projects />
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
    </div>
  );
};

export default App;
