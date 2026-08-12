'use client';

import { useEffect, useState } from 'react';

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

// Component that syncs debug modes from database to DOM
// Debug modes default to ON so reviewers can see them immediately
export default function DebugModeSync() {
  useEffect(() => {
    const modes: DebugMode[] = ['svg', 'link'];

    modes.forEach((mode) => {
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
          if (enabled) {
            document.documentElement.classList.add(getCssClass(mode));
          } else {
            document.documentElement.classList.remove(getCssClass(mode));
          }
        })
        .catch(() => {
          // On error, keep default ON
          document.documentElement.classList.add(getCssClass(mode));
        });
    });
  }, []);

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
