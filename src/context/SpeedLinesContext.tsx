"use client";
import React, { createContext, useState, useContext } from 'react';

interface SpeedLinesContextType {
  speedLinesActive: boolean;
  activateSpeedLines: () => void;
  deactivateSpeedLines: () => void;
}

const SpeedLinesContext = createContext<SpeedLinesContextType | undefined>(undefined);

export const SpeedLinesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [speedLinesActive, setSpeedLinesActive] = useState(false);

  const activateSpeedLines = () => {
    setSpeedLinesActive(true);
  };

  const deactivateSpeedLines = () => {
    setSpeedLinesActive(false);
  };

  return (
    <SpeedLinesContext.Provider
      value={{
        speedLinesActive,
        activateSpeedLines,
        deactivateSpeedLines
      }}
    >
      {children}
    </SpeedLinesContext.Provider>
  );
};

export const useSpeedLines = (): SpeedLinesContextType => {
  const context = useContext(SpeedLinesContext);
  if (context === undefined) {
    throw new Error('useSpeedLines must be used within a SpeedLinesProvider');
  }
  return context;
};
