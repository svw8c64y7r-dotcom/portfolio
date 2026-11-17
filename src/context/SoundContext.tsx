import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface SoundContextValue {
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  toggleSound: () => void;
  playClick: () => void;
  playModeSwitch: (mode: string) => void;
  playModalOpen: () => void;
  playSuccess: () => void;
}

export const SoundContext = createContext<SoundContextValue>({
  soundEnabled: false,
  setSoundEnabled: () => {},
  toggleSound: () => {},
  playClick: () => {},
  playModeSwitch: () => {},
  playModalOpen: () => {},
  playSuccess: () => {}
});

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      return localStorage.getItem('sri_ragav_sfx_enabled') === 'true';
    } catch {
      return false;
    }
  });

  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const next = !prev;
      try {
        localStorage.setItem('sri_ragav_sfx_enabled', String(next));
      } catch {}
      return next;
    });
  }, []);

  // Web Audio API Synth Engine (0 external files, 0 latency, 0 KB assets)
  const getAudioContext = useCallback(() => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return null;
      return new AudioCtx();
    } catch {
      return null;
    }
  }, []);

  const playClick = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    } catch {}
  }, [soundEnabled, getAudioContext]);

  const playModeSwitch = useCallback((mode: string) => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      if (mode === 'red') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
      } else if (mode === 'blue') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(680, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
      } else if (mode === 'dfir') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(950, ctx.currentTime + 0.09);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
      }

      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.11);
    } catch {}
  }, [soundEnabled, getAudioContext]);

  const playModalOpen = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.13);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.14);
    } catch {}
  }, [soundEnabled, getAudioContext]);

  const playSuccess = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        gain.gain.setValueAtTime(0.04, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.16);
      });
    } catch {}
  }, [soundEnabled, getAudioContext]);

  return (
    <SoundContext.Provider value={{
      soundEnabled,
      setSoundEnabled,
      toggleSound,
      playClick,
      playModeSwitch,
      playModalOpen,
      playSuccess
    }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);

