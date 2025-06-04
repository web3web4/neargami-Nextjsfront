"use client";
import React, { useState, useEffect, createContext, useContext } from 'react';
import styles from './SpeedLines.module.css';

type SpeedLinesContextType = {
  speedLinesActive: boolean;
  activateSpeedLines: () => void;
  deactivateSpeedLines: () => void;
};

const SpeedLinesContext = createContext<SpeedLinesContextType | undefined>(undefined);

export const useSpeedLines = () => {
  const context = useContext(SpeedLinesContext);
  if (!context) {
    throw new Error('useSpeedLines must be used within a SpeedLinesProvider');
  }
  return context;
};

type SpeedLineProps = {
  active: boolean;
};

type SpeedLineItem = {
  id: number;
  left: string;
  delay: string;
  width: string;
  height: string;
  variant?: string;
};

const SpeedLines: React.FC<SpeedLineProps> = ({ active }) => {
  const [lines, setLines] = useState<SpeedLineItem[]>([]);

  useEffect(() => {
    if (active) {
      const newLines = [];
      const lineCount = 40;
      
      for (let i = 0; i < lineCount; i++) {

        const variantNum = Math.floor(Math.random() * 3); // 0, 1, or 2
        const variantClass = variantNum === 0 ? '' : `variant${variantNum}`;
        
        const randomWidth = Math.random();
        const width = randomWidth < 0.7 
          ? `${randomWidth * 2 + 1}px`
          : `${randomWidth * 5 + 2}px`;

        const randomDelay = Math.random();
        const delay = randomDelay < 0.8
          ? `${randomDelay * 0.3}s`
          : `${randomDelay * 0.6}s`;

        const heightVariation = Math.random();
        const height = heightVariation < 0.6
          ? `${Math.random() * 300 + 150}px`
          : `${Math.random() * 600 + 400}px`;

        newLines.push({
          id: i,
          left: `${Math.random() * 100}%`,
          delay: delay,
          width: width,
          height: height,
          variant: variantClass
        });
      }
      
      setLines(newLines);
    }
  }, [active]);

  return (
    <div className={`${styles.speedLinesContainer} ${active ? styles.active : ''}`}>
      {lines.map((line) => (
        <div
          key={line.id}
          className={`${styles.speedLine} ${line.variant ? styles[line.variant] : ''} ${active ? styles.speedLineAnimation : ''}`}
          style={{
            left: line.left,
            width: line.width,
            height: line.height,
            animationDelay: line.delay,
          }}
        />
      ))}
    </div>
  );
};

export const ClientSpeedLinesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [speedLinesActive, setSpeedLinesActive] = useState(false);

  const activateSpeedLines = () => {
    setSpeedLinesActive(true);
  };

  const deactivateSpeedLines = () => {
    setSpeedLinesActive(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && speedLinesActive) {
      const timer = setTimeout(() => {
        deactivateSpeedLines();
      }, 1000);


      return () => {
        clearTimeout(timer);
      };
    }
  }, [speedLinesActive]);

  return (
    <SpeedLinesContext.Provider value={{ speedLinesActive, activateSpeedLines, deactivateSpeedLines }}>
      {children}
      <SpeedLines active={speedLinesActive} />
    </SpeedLinesContext.Provider>
  );
};

export default ClientSpeedLinesProvider;
