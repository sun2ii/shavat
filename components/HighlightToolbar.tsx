'use client';

import { useState } from 'react';
import type { Highlight, HighlightColor } from '@/lib/types';
import { HIGHLIGHT_COLORS } from '@/lib/highlight-colors';

interface Props {
  /** Verse range this toolbar will mark, for the label. */
  rangeLabel: string;
  /** Existing highlight on the tapped verse, if any: pre-fills and enables Remove. */
  existing?: Highlight;
  onSave: (color: HighlightColor, note: string) => void;
  onRemove?: () => void;
  onCancel: () => void;
}

// Inline, under the verse. Swatches first because color is the fast path;
// the note is optional and only costs a line.
export default function HighlightToolbar({ rangeLabel, existing, onSave, onRemove, onCancel }: Props) {
  const [color, setColor] = useState<HighlightColor>(existing?.color ?? HIGHLIGHT_COLORS[0].id);
  const [note, setNote] = useState(existing?.note ?? '');

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
        <div className="flex items-center gap-1.5">
          {HIGHLIGHT_COLORS.map((c, i) => (
            <span key={c.id} className="flex items-center gap-1.5">
              {/* Thin divider between the named kinds and the plain colors */}
              {i > 0 && !c.key && HIGHLIGHT_COLORS[i - 1].key && (
                <span className="mx-0.5 h-4 w-px bg-hairline" aria-hidden="true" />
              )}
              <button
                type="button"
                onClick={() => setColor(c.id)}
                aria-label={c.key ? `${c.name} (${c.key})` : c.name}
                title={c.key ? `${c.name} · press ${c.key}` : c.name}
                className={`flex h-5 w-5 items-center justify-center rounded-full font-sans text-[10px] font-bold uppercase leading-none text-white/90 transition-transform ${
                  color === c.id ? 'ring-2 ring-offset-2 ring-offset-surface ring-ink scale-110' : 'hover:scale-110'
                }`}
                style={{ background: c.swatch }}
              >
                {c.key ?? ''}
              </button>
            </span>
          ))}
        </div>
      </div>

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        // Enter saves and closes; Shift+Enter is a line break. (Escape is
        // handled by the reader's key handler and closes the toolbar.)
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSave(color, note);
          }
        }}
        placeholder="Add a note"
        rows={2}
        className="block w-full resize-y rounded border border-hairline bg-paper-2 px-2 py-1.5 font-serif text-sm leading-snug text-ink placeholder:text-faint outline-none focus:border-gold"
      />

      <div className="mt-2 flex items-center gap-4 text-xs">
        <button
          type="button"
          onClick={() => onSave(color, note)}
          className="rounded bg-gold px-3 py-1 font-semibold text-paper hover:opacity-90"
        >
          Save
        </button>
        {existing && onRemove && (
          <button type="button" onClick={onRemove} className="text-faint hover:text-red-500">
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
