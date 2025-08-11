"use client";
import React, { useEffect, useState, useRef } from 'react';
import styles from './SpeedLines.module.css';

interface SpeedLinesProps {
  active: boolean;
  onAnimationComplete?: () => void;
}

const SpeedLines: React.FC<SpeedLinesProps> = ({ active, onAnimationComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<{ id: number; left: string; delay: string; width: string; height: string }[]>([]);
  
  useEffect(() => {
    if (active) {
      const newLines = [];
      const lineCount = 30;
      
      for (let i = 0; i < lineCount; i++) {
        newLines.push({
          id: i,
          left: `${Math.random() * 100}%`,
          delay: `${Math.random() * 0.3}s`,
          width: `${Math.random() * 3 + 1}px`,
          height: `${Math.random() * 30 + 100}px`
        });
      }
      
      setLines(newLines);
      
      const timer = setTimeout(() => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [active, onAnimationComplete]);
  
  return (
    <div 
      ref={containerRef}
      className={`${styles.speedLinesContainer} ${active ? styles.active : ''}`}
    >
      {lines.map((line) => (
        <div
          key={line.id}
          className={`${styles.speedLine} ${active ? styles.speedLineAnimation : ''}`}
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

export default SpeedLines;
