// Single source of truth for which translations exist. Importable from both
// server (BookReadingRoute, book-accessor) and client (TranslationProvider)
// code: it must NOT carry a 'use client' directive, or its functions become
// client references the server cannot call.

export type Translation = 'niv' | 'msg';

export const TRANSLATIONS: Record<Translation, { name: string; fullName: string }> = {
  niv: { name: 'NIV', fullName: 'New International Version' },
  msg: { name: 'MSG', fullName: 'The Message' },
};

export const DEFAULT_TRANSLATION: Translation = 'niv';

export function isTranslation(value: unknown): value is Translation {
  return typeof value === 'string' && value in TRANSLATIONS;
}
