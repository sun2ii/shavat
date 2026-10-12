'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { DEFAULT_CURSOR_ACCENT, isCursorAccent, type CursorAccentId } from '@/lib/cursor-accents';

export type LineSpacing = 'compact' | 'comfortable' | 'spacious';
export type Appearance = 'light' | 'dark' | 'system';
export type KeyboardStyle = 'standard' | 'vim';

export interface ReadingPreferences {
  fontSize: number;
  lineSpacing: LineSpacing;
  appearance: Appearance;
  keyboardStyle: KeyboardStyle;
  /** Colour of the verse the reader is on. See lib/cursor-accents.ts. */
  cursorAccent: CursorAccentId;
}

const DEFAULT_PREFERENCES: ReadingPreferences = {
  fontSize: 21,
  lineSpacing: 'comfortable',
  appearance: 'system',
  keyboardStyle: 'standard',
  cursorAccent: DEFAULT_CURSOR_ACCENT,
};

const STORAGE_KEY = 'shavat-reading-preferences';

// Line height values for each spacing option
export const LINE_HEIGHT_MAP: Record<LineSpacing, number> = {
  compact: 1.6,
  comfortable: 1.95,
  spacious: 2.3,
};

interface ReadingPreferencesContextType {
  preferences: ReadingPreferences;
  setFontSize: (size: number) => void;
  setLineSpacing: (spacing: LineSpacing) => void;
  setAppearance: (appearance: Appearance) => void;
  setKeyboardStyle: (style: KeyboardStyle) => void;
  setCursorAccent: (accent: CursorAccentId) => void;
}

const ReadingPreferencesContext = createContext<ReadingPreferencesContextType | null>(null);

export function ReadingPreferencesProvider({
  children,
  initialPreferences,
}: {
  children: ReactNode;
  initialPreferences?: Partial<ReadingPreferences>;
}) {
  const [preferences, setPreferences] = useState<ReadingPreferences>(() => ({
    ...DEFAULT_PREFERENCES,
    ...initialPreferences,
  }));
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setPreferences((prev) => ({
          ...prev,
          fontSize: parsed.fontSize ?? prev.fontSize,
          lineSpacing: parsed.lineSpacing ?? prev.lineSpacing,
          appearance: parsed.appearance ?? prev.appearance,
          keyboardStyle: parsed.keyboardStyle ?? prev.keyboardStyle,
          cursorAccent: isCursorAccent(parsed.cursorAccent) ? parsed.cursorAccent : prev.cursorAccent,
        }));
      }
    } catch {}
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch {}
  }, [preferences, mounted]);

  // Apply appearance preference
  useEffect(() => {
    if (!mounted) return;

    const applyTheme = (isDark: boolean) => {
      const root = document.documentElement;
      root.classList.toggle('dark', isDark);
      root.classList.toggle('light', !isDark);
      try {
        localStorage.setItem('shavat-theme', isDark ? 'dark' : 'light');
      } catch {}
    };

    if (preferences.appearance === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      applyTheme(mq.matches);
      const handler = (e: MediaQueryListEvent) => applyTheme(e.matches);
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    } else {
      applyTheme(preferences.appearance === 'dark');
    }
  }, [preferences.appearance, mounted]);

  // Apply cursor accent: one attribute on <html> moves the --cursor token.
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.cursor = preferences.cursorAccent;
  }, [preferences.cursorAccent, mounted]);

  const setCursorAccent = useCallback((cursorAccent: CursorAccentId) => {
    setPreferences((prev) => ({ ...prev, cursorAccent }));
  }, []);

  const setFontSize = useCallback((size: number) => {
    const clamped = Math.max(14, Math.min(28, size));
    setPreferences((prev) => ({ ...prev, fontSize: clamped }));
  }, []);

  const setLineSpacing = useCallback((spacing: LineSpacing) => {
    setPreferences((prev) => ({ ...prev, lineSpacing: spacing }));
  }, []);

  const setAppearance = useCallback((appearance: Appearance) => {
    setPreferences((prev) => ({ ...prev, appearance }));
  }, []);

  const setKeyboardStyle = useCallback((keyboardStyle: KeyboardStyle) => {
    setPreferences((prev) => ({ ...prev, keyboardStyle }));
  }, []);

  return (
    <ReadingPreferencesContext.Provider
      value={{ preferences, setFontSize, setLineSpacing, setAppearance, setKeyboardStyle, setCursorAccent }}
    >
      {children}
    </ReadingPreferencesContext.Provider>
  );
}

export function useReadingPreferences() {
  const ctx = useContext(ReadingPreferencesContext);
  if (!ctx) {
    throw new Error('useReadingPreferences must be used within ReadingPreferencesProvider');
  }
  return ctx;
}
