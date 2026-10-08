'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Translation, TRANSLATIONS, DEFAULT_TRANSLATION } from '@/lib/translations';

// Re-exported for existing client imports (TranslationToggle).
export type { Translation };
export { TRANSLATIONS };

// Must match lib/translation-preference.ts (server). Duplicated as literals
// because that module imports next/headers and cannot be loaded on the client.
const COOKIE = 'shavat-translation';
const SETTING_KEY = 'translation';

interface TranslationContextType {
  translation: Translation;
  setTranslation: (t: Translation) => void;
}

const TranslationContext = createContext<TranslationContextType | null>(null);

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    return {
      translation: DEFAULT_TRANSLATION,
      setTranslation: () => {},
    };
  }
  return context;
}

interface Props {
  children: ReactNode;
  /** Resolved on the server (account > cookie > default), so SSR and first
   *  client render agree and no mounted/hydration dance is needed. */
  initialTranslation: Translation;
  /** When true, changes are also written to the account via /api/user-settings. */
  persistToAccount: boolean;
}

export function TranslationProvider({ children, initialTranslation, persistToAccount }: Props) {
  const [translation, setTranslationState] = useState<Translation>(initialTranslation);

  const setTranslation = useCallback((t: Translation) => {
    setTranslationState(t);

    // Device-level persistence and the transport the server reads for
    // anonymous requests. Always written, so a later sign-out keeps the choice.
    document.cookie = `${COOKIE}=${t};path=/;max-age=31536000`;

    // Account-level persistence: follows the user across devices.
    if (persistToAccount) {
      fetch('/api/user-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: SETTING_KEY, value: t }),
      }).catch((err) => console.error('Failed to save translation to account:', err));
    }
  }, [persistToAccount]);

  return (
    <TranslationContext.Provider value={{ translation, setTranslation }}>
      {children}
    </TranslationContext.Provider>
  );
}
