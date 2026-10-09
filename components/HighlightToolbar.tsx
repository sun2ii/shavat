'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Highlight, HighlightColor } from '@/lib/types';
import { HIGHLIGHT_COLORS, getHighlightColor } from '@/lib/highlight-colors';

interface Props {
  /** Verse range this toolbar will mark, for the label. */
  rangeLabel: string;
  /** Existing highlight on the tapped verse, if any: pre-fills and enables Remove. */
  existing?: Highlight;
  onSave: (color: HighlightColor, note: string) => void;
  onRemove?: () => void;
  onCancel: () => void;
}

// 5 highlight options: C S P Q H (first 5 colors)
const HIGHLIGHT_OPTIONS = HIGHLIGHT_COLORS.slice(0, 5);

// Inline, under the verse. Swatches first because color is the fast path;
// the note is optional and only costs a line.
export default function HighlightToolbar({ rangeLabel, existing, onSave, onRemove, onCancel }: Props) {
  const [color, setColor] = useState<HighlightColor>(existing?.color ?? HIGHLIGHT_OPTIONS[0].id);
  const [note, setNote] = useState(existing?.note ?? '');
  const [removed, setRemoved] = useState(false);

  const selectedDef = getHighlightColor(color);

  const handleSave = useCallback(() => {
    if (removed) return;
    onSave(color, note);
  }, [color, note, onSave, removed]);

  const handleRemove = useCallback(() => {
    setRemoved(true);
    onRemove?.();
  }, [onRemove]);

  // Global keyboard handler for the toolbar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Enter saves (unless Shift+Enter for newline in textarea)
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!removed) onSave(color, note);
        return;
      }

      // Number keys 1-5 select highlight type
      if (/^[1-5]$/.test(e.key)) {
        e.preventDefault();
        const idx = parseInt(e.key, 10) - 1;
        if (HIGHLIGHT_OPTIONS[idx]) setColor(HIGHLIGHT_OPTIONS[idx].id);
        return;
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [color, note, removed, onSave]);

  return (
    <div
      className="my-3 ml-7 rounded-lg border border-hairline bg-surface p-3 font-sans"
      onClick={(e) => e.stopPropagation()}
      onDoubleClick={(e) => e.stopPropagation()}
    >
      <div className="mb-2 flex flex-wrap items-center gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold">
          {existing ? 'Edit highlight' : 'Highlight'} · {rangeLabel}
        </span>
        <span className="text-[10px] font-medium" style={{ color: selectedDef.label }}>
          {selectedDef.name}
        </span>
        <div className="flex items-center gap-1.5">
          {/* C S P Q H buttons with 1-5 underneath */}
          {HIGHLIGHT_OPTIONS.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setColor(c.id)}
              aria-label={`${c.name} (${i + 1})`}
              title={`${c.name} · press ${i + 1}`}
              className={`flex flex-col items-center gap-0.5 transition-transform ${
                color === c.id ? 'scale-110' : 'hover:scale-110'
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full font-sans text-[10px] font-bold uppercase leading-none text-white/90 ${
                  color === c.id ? 'ring-2 ring-offset-2 ring-offset-surface ring-ink' : ''
                }`}
                style={{ background: c.swatch }}
              >
                {c.key ?? c.name[0]}
              </span>
              <span className="text-[9px] text-faint">{i + 1}</span>
            </button>
          ))}
        </div>
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a note"
        rows={2}
        className="block w-full resize-y rounded border border-hairline bg-paper-2 px-2 py-1.5 font-serif text-sm leading-snug text-ink placeholder:text-faint outline-none focus:border-gold"
      />

      <div className="mt-2 flex items-center gap-4 text-xs">
        <button
          type="button"
          onClick={handleSave}
          className="rounded bg-gold px-3 py-1 font-semibold text-paper hover:opacity-90"
        >
          Save
        </button>
        {existing && onRemove && (
          <button type="button" onClick={handleRemove} className="text-faint hover:text-red-500">
            Remove
          </button>
        )}
        <button type="button" onClick={onCancel} className="ml-auto text-faint hover:text-ink">
          Cancel
        </button>
      </div>
    </div>
  );
}
