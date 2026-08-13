'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

type DebugMode = 'svg' | 'link';

function getStorageKey(mode: DebugMode) {
  return `${mode}-debug-mode`;
}

function getSettingsKey(mode: DebugMode) {
  return `${mode}_debug_mode`;
}

function getCssClass(mode: DebugMode) {
  return `${mode}-debug-mode`;
}

// Paths where debug mode should be disabled (reading/library pages)
function isReadingPage(pathname: string): boolean {
  // Disable on library pages and book reading pages
  return pathname.startsWith('/library') ||
         pathname.startsWith('/ot/') ||
         pathname.startsWith('/nt/') ||
         // Book slugs (e.g., /genesis/1, /hosea/judgment-on-israel/9)
         /^\/[a-z0-9-]+\//.test(pathname);
}

// Component that syncs debug modes from database to DOM
// Debug modes default to ON so reviewers can see them immediately
// But disabled on reading/library pages to avoid distraction
export default function DebugModeSync() {
  const pathname = usePathname();

  useEffect(() => {
    const modes: DebugMode[] = ['svg', 'link'];
    const onReadingPage = isReadingPage(pathname);

    modes.forEach((mode) => {
      // Always remove on reading pages
      if (onReadingPage) {
        document.documentElement.classList.remove(getCssClass(mode));
        return;
      }

      // Check localStorage first, default to true if not set
      const stored = localStorage.getItem(getStorageKey(mode));
      const defaultOn = stored === null || stored === 'true';

      if (defaultOn) {
        document.documentElement.classList.add(getCssClass(mode));
      }

      // Sync from database
      fetch(`/api/settings?key=${getSettingsKey(mode)}`)
        .then((res) => res.json())
        .then((data) => {
          // Default to true if not set in database
          const enabled = data.value === null ? true : data.value === true;
          localStorage.setItem(getStorageKey(mode), String(enabled));
          if (enabled && !onReadingPage) {
            document.documentElement.classList.add(getCssClass(mode));
          } else {
            document.documentElement.classList.remove(getCssClass(mode));
          }
        })
        .catch(() => {
          // On error, keep default ON (unless on reading page)
          if (!onReadingPage) {
            document.documentElement.classList.add(getCssClass(mode));
          }
        });
    });
  }, [pathname]);

  return null;
}

// Hook for toggling debug modes
export function useDebugMode(mode: DebugMode) {
  const [enabled, setEnabled] = useState(true); // Default ON
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(getStorageKey(mode));
    // Default to true if not set
    setEnabled(stored === null || stored === 'true');
    setLoading(false);
  }, [mode]);

  const toggle = async () => {
    const newValue = !enabled;
    setEnabled(newValue);
    localStorage.setItem(getStorageKey(mode), String(newValue));

    if (newValue) {
      document.documentElement.classList.add(getCssClass(mode));
    } else {
      document.documentElement.classList.remove(getCssClass(mode));
    }

    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: getSettingsKey(mode), value: newValue }),
      });
    } catch (err) {
      console.error(`Failed to save ${mode} debug mode:`, err);
    }
  };

  return { enabled, loading, toggle };
}
