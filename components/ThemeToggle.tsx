'use client';

import { useEffect, useState } from 'react';

/**
 * Light / dark toggle. Persists to localStorage under `shavat-theme`.
 * The no-flash class is applied by the inline script in layout.tsx before paint.
 */
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = !root.classList.contains('dark');
    root.classList.toggle('dark', next);
    root.classList.toggle('light', !next);
    try {
      localStorage.setItem('shavat-theme', next ? 'dark' : 'light');
    } catch {}
    setIsDark(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="w-9 h-9 flex items-center justify-center rounded-lg border border-hairline text-muted hover:text-gold transition-colors"
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      <span className="text-base leading-none">{isDark ? '☀' : '☾'}</span>
    </button>
  );
}
