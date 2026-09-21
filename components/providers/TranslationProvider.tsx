'use client';

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

export type Translation = 'niv' | 'kjv' | 'web';

export const TRANSLATIONS: Record<Translation, { name: string; fullName: string }> = {
  niv: { name: 'NIV', fullName: 'New International Version' },
  kjv: { name: 'KJV', fullName: 'King James Version' },
  web: { name: 'WEB', fullName: 'World English Bible' },
};

interface TranslationContextType {
  translation: Translation;
  setTranslation: (t: Translation) => void;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    return {
      translation: 'niv' as Translation,
      setTranslation: () => {},
    };
  }
  return context;
}

interface Props {
  children: ReactNode;
}

export function TranslationProvider({ children }: Props) {
  const [translation, setTranslationState] = useState<Translation>('niv');
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('shavat-translation');
    if (saved && (saved === 'niv' || saved === 'kjv' || saved === 'web')) {
      setTranslationState(saved);
    }
  }, []);

  const setTranslation = useCallback((t: Translation) => {
    setTranslationState(t);
    localStorage.setItem('shavat-translation', t);
    // Also set cookie so server can read it
    document.cookie = `shavat-translation=${t};path=/;max-age=31536000`;
  }, []);

  // Avoid hydration mismatch by using default until mounted
  const value = {
    translation: mounted ? translation : 'niv',
    setTranslation,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}
