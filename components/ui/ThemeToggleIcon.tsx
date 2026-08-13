'use client';

import { useState, useEffect } from 'react';
import { NormalizedIcon } from './NormalizedIcon';

interface ThemeToggleIconProps {
  isDark: boolean;
  size?: number;
}

export function ThemeToggleIcon({ isDark, size = 24 }: ThemeToggleIconProps) {
  const [mounted, setMounted] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [displayIcon, setDisplayIcon] = useState(isDark);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && displayIcon !== isDark) {
      // Start spinning and fading
      setRotation(prev => prev + 360);
      setOpacity(0);

      // Swap icon halfway through
      const swapTimer = setTimeout(() => {
        setDisplayIcon(isDark);
        setOpacity(1);
      }, 600);

      return () => clearTimeout(swapTimer);
    }
  }, [isDark, mounted, displayIcon]);

  if (!mounted) {
    return <div className="flex-shrink-0" style={{ width: size, height: size }} />;
  }

  return (
    <div
      style={{
        transform: `rotate(${rotation}deg)`,
        opacity: opacity,
        transition: 'transform 1.2s ease-in-out, opacity 0.6s ease-in-out',
      }}
    >
      <NormalizedIcon
        src={displayIcon ? '/icons/sidebar/lightmode.webp' : '/icons/sidebar/darkmode.webp'}
        alt={displayIcon ? 'Light Mode' : 'Dark Mode'}
        width={size}
        height={size}
      />
    </div>
  );
}
