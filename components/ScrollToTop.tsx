'use client';

import { useState, useEffect } from 'react';
import { NormalizedIcon } from '@/components/ui/NormalizedIcon';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Only show when scrolled near the bottom (past all content)
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const distanceFromBottom = docHeight - scrollTop - windowHeight;

      // Show when within 200px of the bottom AND scrolled down a bit
      if (scrollTop > 300 && distanceFromBottom < 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 [.native-app_&]:bottom-[calc(4.5rem+env(safe-area-inset-bottom))] left-1/2 lg:left-[calc(50%+111px)] -translate-x-1/2 p-2.5 rounded-full cursor-pointer transition-all duration-150 z-40
        bg-gradient-to-b from-gray-600 to-gray-700
        dark:from-gray-500 dark:to-gray-600
        shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.1)]
        hover:shadow-[0_4px_16px_rgba(200,162,72,0.3),0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.15)]
        active:shadow-[0_2px_6px_rgba(0,0,0,0.3),inset_0_1px_3px_rgba(0,0,0,0.2)] active:translate-y-[1px]"
      aria-label="Return to top"
    >
      <NormalizedIcon
        src="/icons/general/arrowup.webp"
        alt="Return to top"
        width={14}
        height={14}
        className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]"
      />
    </button>
  );
}
