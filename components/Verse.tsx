import { useState, useEffect } from 'react';
import { Verse as VerseType } from '@/lib/types';

interface Props {
  verse: VerseType;
  isSelected?: boolean;
  onToggle?: (verseNum: number) => void;
  commentary?: string;
}

export default function Verse({ verse, isSelected = false, onToggle, commentary }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect if device is mobile/touch-enabled
    const checkMobile = () => {
      const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isMobileWidth = window.innerWidth < 768;
      setIsMobile(hasTouchScreen || isMobileWidth);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleInteraction = () => {
    if (onToggle) {
      onToggle(verse.verse);
    }
  };

  return (
    <>
      <span
        className={`inline-block mb-4 py-1 font-medium cursor-pointer transition-colors px-2 rounded ${
          isSelected ? 'bg-yellow-200 text-gray-900' : 'hover:bg-yellow-100 hover:text-gray-900'
        }`}
        data-verse={verse.verse}
        onClick={isMobile ? undefined : handleInteraction}
        onDoubleClick={isMobile ? handleInteraction : undefined}
      >
        <sup className={`mr-2 text-xs font-light select-none transition-colors ${isSelected ? 'text-gray-600' : 'text-[rgb(var(--text-tertiary))] group-hover:text-gray-600'}`}>{verse.verse}</sup>
        {verse.text}
      </span>
      <br />
      {isSelected && commentary && (
        <div className="ml-6 mb-6 p-4 bg-gray-100 dark:bg-gray-800 border-l-4 border-yellow-500 rounded-r text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          {commentary}
        </div>
      )}
    </>
  );
}
