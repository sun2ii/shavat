import { HighlightColor } from './types';

// Single source of truth for the highlight palette (design/shavat-concept-3.png).
// `id` is what gets persisted in localStorage — 'yellow' predates the palette
// and renders as Gold, so existing saved highlights keep working.
// `swatch` paints toolbar buttons and card stripes; `label` hexes are
// mid-luminance so they read on both paper and navy surfaces.
export interface HighlightColorDef {
  id: HighlightColor;
  name: string;
  swatch: string;
  label: string;
}

export const HIGHLIGHT_COLORS: HighlightColorDef[] = [
  { id: 'yellow', name: 'Gold', swatch: '#e5c65a', label: '#b08a2e' },
  { id: 'purple', name: 'Purple', swatch: '#a98fd4', label: '#8b6fc4' },
  { id: 'blue', name: 'Blue', swatch: '#7ba0cf', label: '#5a87c9' },
  { id: 'rose', name: 'Rose', swatch: '#d98ba6', label: '#c76a8a' },
  { id: 'emerald', name: 'Emerald', swatch: '#7cb392', label: '#4e9a75' },
  { id: 'silver', name: 'Silver', swatch: '#b9bec7', label: '#8a8f98' },
];

export function getHighlightColor(id: HighlightColor): HighlightColorDef {
  return HIGHLIGHT_COLORS.find((c) => c.id === id) ?? HIGHLIGHT_COLORS[0];
}
