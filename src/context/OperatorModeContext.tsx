import React, { createContext, useContext, useState } from 'react';

export type OperatorMode = 'all' | 'red' | 'blue' | 'dfir';

interface OperatorModeContextValue {
  mode: OperatorMode;
  setMode: (m: OperatorMode) => void;
}

export const OperatorModeContext = createContext<OperatorModeContextValue>({
  mode: 'all',
  setMode: () => {},
});

export const OperatorModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<OperatorMode>('all');
  return (
    <OperatorModeContext.Provider value={{ mode, setMode }}>
      {children}
    </OperatorModeContext.Provider>
  );
};

export const useOperatorMode = () => useContext(OperatorModeContext);

