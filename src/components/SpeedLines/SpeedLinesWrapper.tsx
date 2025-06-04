"use client";
import React, { useEffect, useRef } from 'react';
import SpeedLines from './SpeedLines';
import { useSpeedLines } from '@/context/SpeedLinesContext';

const SpeedLinesWrapper: React.FC = () => {
  const { speedLinesActive, deactivateSpeedLines } = useSpeedLines();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting && speedLinesActive) {
              deactivateSpeedLines();
            }
          });
        },
        { threshold: 0.2 } 
      );

      const coursesElement = document.getElementById('courses-list');
      if (coursesElement && observerRef.current) {
        observerRef.current.observe(coursesElement);
      }
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [speedLinesActive, deactivateSpeedLines]);

  return (
    <SpeedLines 
      active={speedLinesActive} 
      onAnimationComplete={() => {
        setTimeout(() => {
          deactivateSpeedLines();
        }, 1000);
      }} 
    />
  );
};

export default SpeedLinesWrapper;
