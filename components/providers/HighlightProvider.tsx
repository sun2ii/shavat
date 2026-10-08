'use client';

import { createContext, useContext, useState, useCallback, useEffect, useMemo, ReactNode } from 'react';
import type { Highlight, HighlightColor } from '@/lib/types';
import { storage } from '@/lib/storage';

export interface HighlightInput {
  book: string;
  chapter: number;
  verseStart: number;
  verseEnd: number;
  color: HighlightColor;
  note?: string;
}

interface HighlightContextType {
  highlights: Highlight[];
  /** Highlights touching this chapter, in verse order. */
  forChapter: (book: string, chapter: number) => Highlight[];
  /** Create; replaces any highlight overlapping the range in that chapter. */
  saveHighlight: (input: HighlightInput) => Promise<void>;
  updateHighlight: (id: string, patch: { color?: HighlightColor; note?: string }) => Promise<void>;
  removeHighlight: (id: string) => Promise<void>;
}

const HighlightContext = createContext<HighlightContextType | null>(null);

export function useHighlights(): HighlightContextType {
  const ctx = useContext(HighlightContext);
  if (!ctx) {
    return {
      highlights: [],
      forChapter: () => [],
      saveHighlight: async () => {},
      updateHighlight: async () => {},
      removeHighlight: async () => {},
    };
  }
  return ctx;
}

function overlaps(h: Highlight, input: HighlightInput): boolean {
  return (
    h.book === input.book &&
    h.chapter === input.chapter &&
    h.verseStart <= input.verseEnd &&
    h.verseEnd >= input.verseStart
  );
}

interface Props {
  children: ReactNode;
  /** From the DB for a signed-in user; ignored when signed out. */
  initialHighlights: Highlight[];
  /** Signed in → API-backed. Signed out → localStorage-backed (lib/storage). */
  persistToAccount: boolean;
}

export function HighlightProvider({ children, initialHighlights, persistToAccount }: Props) {
  const [highlights, setHighlights] = useState<Highlight[]>(persistToAccount ? initialHighlights : []);

  // Signed out: the device is the store.
  useEffect(() => {
    if (!persistToAccount) setHighlights(storage.getHighlights());
  }, [persistToAccount]);

  const forChapter = useCallback(
    (book: string, chapter: number) =>
      highlights
        .filter((h) => h.book === book && h.chapter === chapter)
        .sort((a, b) => a.verseStart - b.verseStart),
    [highlights],
  );

  const saveHighlight = useCallback(
    async (input: HighlightInput) => {
      if (!persistToAccount) {
        for (const h of storage.getHighlights()) {
          if (overlaps(h, input)) storage.deleteHighlight(h.id);
        }
        storage.addHighlight(input);
        setHighlights(storage.getHighlights());
        return;
      }

      // Optimistic: drop overlaps, add a temp row, then swap in the server row.
      const tempId = `temp-${Date.now()}`;
      const optimistic: Highlight = { ...input, id: tempId, createdAt: Date.now() };
      const before = highlights;
      setHighlights((prev) => [...prev.filter((h) => !overlaps(h, input)), optimistic]);

      try {
        const res = await fetch('/api/highlights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input),
        });
        if (!res.ok) throw new Error(`POST /api/highlights ${res.status}`);
        const { highlight } = (await res.json()) as { highlight: Highlight };
        setHighlights((prev) => prev.map((h) => (h.id === tempId ? highlight : h)));
      } catch (err) {
        console.error('Failed to save highlight:', err);
        setHighlights(before);
      }
    },
    [highlights, persistToAccount],
  );

  const updateHighlight = useCallback(
    async (id: string, patch: { color?: HighlightColor; note?: string }) => {
      const before = highlights;
      setHighlights((prev) => prev.map((h) => (h.id === id ? { ...h, ...patch } : h)));

      if (!persistToAccount) {
        storage.updateHighlight(id, patch);
        return;
      }
      try {
        const res = await fetch('/api/highlights', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, ...patch }),
        });
        if (!res.ok) throw new Error(`PATCH /api/highlights ${res.status}`);
      } catch (err) {
        console.error('Failed to update highlight:', err);
        setHighlights(before);
      }
    },
    [highlights, persistToAccount],
  );

  const removeHighlight = useCallback(
    async (id: string) => {
      const before = highlights;
      setHighlights((prev) => prev.filter((h) => h.id !== id));

      if (!persistToAccount) {
        storage.deleteHighlight(id);
        return;
      }
      try {
        const res = await fetch('/api/highlights', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        if (!res.ok) throw new Error(`DELETE /api/highlights ${res.status}`);
      } catch (err) {
        console.error('Failed to delete highlight:', err);
        setHighlights(before);
      }
    },
    [highlights, persistToAccount],
  );

  const value = useMemo(
    () => ({ highlights, forChapter, saveHighlight, updateHighlight, removeHighlight }),
    [highlights, forChapter, saveHighlight, updateHighlight, removeHighlight],
  );

  return <HighlightContext.Provider value={value}>{children}</HighlightContext.Provider>;
}
