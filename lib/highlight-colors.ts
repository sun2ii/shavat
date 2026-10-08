import { HighlightColor } from './types';

// Single source of truth for the highlight palette (design/shavat-concept-3.png).
// `id` is what gets persisted — 'yellow' predates the palette and renders as
// Gold, so existing saved highlights keep working.
// `swatch` paints toolbar buttons, verse tints and card stripes; `label`
// hexes are mid-luminance so note text reads on both paper and navy.
// `key` is the reader shortcut that applies this kind to the cursor verse.
export interface HighlightColorDef {
  id: HighlightColor;
  name: string;
  swatch: string;
  label: string;
  key?: string;
  /** Retired from the picker; still resolves so old highlights render. */
  hidden?: boolean;
}

const ALL_COLORS: HighlightColorDef[] = [
  // Named kinds first: distinct hues from the plain colors below.
  { id: 'character', name: 'Character', swatch: '#e08a5a', label: '#b5603a', key: 'c' },
  { id: 'setting', name: 'Setting', swatch: '#5fb3b3', label: '#2f8a8a', key: 's' },
  { id: 'plot', name: 'Plot', swatch: '#c8657a', label: '#a3465a', key: 'p' },
  { id: 'quote', name: 'Quote', swatch: '#8a86cf', label: '#5f5bb0', key: 'q' },
  // Plain colors.
  // Pushed toward orange: the old straw yellow vanished into the sand paper.
  { id: 'yellow', name: 'Gold', swatch: '#e9a93c', label: '#b4731f' },
  { id: 'blue', name: 'Blue', swatch: '#7ba0cf', label: '#5a87c9' },
  { id: 'rose', name: 'Rose', swatch: '#d98ba6', label: '#c76a8a' },
  { id: 'emerald', name: 'Emerald', swatch: '#7cb392', label: '#4e9a75' },
  // Retired: too many choices. Kept for highlights saved before.
  { id: 'purple', name: 'Purple', swatch: '#a98fd4', label: '#8b6fc4', hidden: true },
  { id: 'silver', name: 'Silver', swatch: '#b9bec7', label: '#8a8f98', hidden: true },
];

/** What the picker offers. */
export const HIGHLIGHT_COLORS: HighlightColorDef[] = ALL_COLORS.filter((c) => !c.hidden);

/** Every id that may appear in stored data, retired ones included. */
export const ALL_HIGHLIGHT_COLORS: HighlightColorDef[] = ALL_COLORS;

export function getHighlightColor(id: HighlightColor): HighlightColorDef {
  return ALL_COLORS.find((c) => c.id === id) ?? ALL_COLORS[0];
}

/** Reader shortcut letter → highlight kind (c, s, p). */
export const HIGHLIGHT_KEYS: Record<string, HighlightColor> = Object.fromEntries(
  HIGHLIGHT_COLORS.filter((c) => c.key).map((c) => [c.key as string, c.id]),
);
