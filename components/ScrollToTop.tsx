'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
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
      className="fixed bottom-6 left-1/2 lg:left-[calc(50%+111px)] -translate-x-1/2 p-3 bg-gray-800 dark:bg-gray-700 text-white rounded-full shadow-lg cursor-pointer hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300 z-50"
      aria-label="Return to top"
    >
      <Image src="/icons/general/arrowup.png" alt="Return to top" width={24} height={24} />
    </button>
  );
}
