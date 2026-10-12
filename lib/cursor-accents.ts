/*
  Cursor accent: the colour of the ONE verse the reader is on.

  Primitive: a single CSS token, --cursor (an "r g b" triple), read by the
  .verse-cursor rule in globals.css for text colour, tint and glow. Choosing
  an accent only moves that token, via data-cursor="<id>" on <html>; nothing
  about the glow's shape changes, so every accent feels like the same light
  in a different colour. The per-accent values (light and dark) live next to
  the rule in globals.css, keyed by these ids.
*/

export type CursorAccentId = 'emerald' | 'gold' | 'azure' | 'violet' | 'crimson' | 'ember';

export interface CursorAccent {
  id: CursorAccentId;
  name: string;
  /** One line shown under the swatch in Settings. */
  hint: string;
}

export const CURSOR_ACCENTS: CursorAccent[] = [
  { id: 'emerald', name: 'Emerald', hint: 'Living, growing. The default.' },
  { id: 'gold', name: 'Gold', hint: 'Glory. Matches the chapter numbers.' },
  { id: 'azure', name: 'Azure', hint: 'Sky and sea. Calm.' },
  { id: 'violet', name: 'Violet', hint: 'Royal. The original purple.' },
  { id: 'crimson', name: 'Crimson', hint: 'Blood and covenant.' },
  { id: 'ember', name: 'Ember', hint: 'Fire and altar.' },
];

export const DEFAULT_CURSOR_ACCENT: CursorAccentId = 'emerald';

export function isCursorAccent(value: unknown): value is CursorAccentId {
  return typeof value === 'string' && CURSOR_ACCENTS.some((a) => a.id === value);
}
