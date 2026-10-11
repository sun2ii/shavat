'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
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

// Hook to detect mobile viewport
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
}

// Inline on desktop, modal on mobile. Swatches first because color is the fast path;
// the note is optional and only costs a line.
export default function HighlightToolbar({ rangeLabel, existing, onSave, onRemove, onCancel }: Props) {
  const [color, setColor] = useState<HighlightColor>(existing?.color ?? HIGHLIGHT_OPTIONS[0].id);
  const [note, setNote] = useState(existing?.note ?? '');
  const [removed, setRemoved] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isMobile = useIsMobile();

  const selectedDef = getHighlightColor(color);

  // Auto-focus the textarea when toolbar opens (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const timer = setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, [isMobile]);

  const handleSave = useCallback(() => {
    if (removed) return;
    onSave(color, note);
  }, [color, note, onSave, removed]);

  const handleRemove = useCallback(() => {
    setRemoved(true);
    onRemove?.();
  }, [onRemove]);

  // Global keyboard handler for the toolbar (desktop only)
  useEffect(() => {
    if (isMobile) return;

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
  }, [color, note, removed, onSave, isMobile]);

  // Shared toolbar content
  const toolbarContent = (
    <>
      {/* One header row: label · selected kind · swatches, all on a line.
          Mobile (modal) stacks the larger swatches beneath for touch. */}
      <div className={`flex items-center gap-3 ${isMobile ? 'mb-3 flex-wrap' : 'mb-2'}`}>
        <span
          className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: selectedDef.label }}
          title={rangeLabel}
        >
          {selectedDef.name}
        </span>
      <div className={`flex items-center gap-3 ${isMobile ? 'w-full justify-center pt-1' : 'ml-1'}`}>
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
              className={`flex items-center justify-center rounded-full font-sans font-bold uppercase leading-none text-white/90 ${
                isMobile ? 'h-10 w-10 text-sm' : 'h-5 w-5 text-[10px]'
              } ${color === c.id ? 'ring-2 ring-offset-2 ring-offset-surface ring-ink' : ''}`}
              style={{ background: c.swatch }}
            >
              {c.key ?? c.name[0]}
            </span>
            {!isMobile && <span className="text-[9px] text-faint">{i + 1}</span>}
          </button>
        ))}
      </div>
      </div>

      <textarea
        ref={textareaRef}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a note"
        rows={isMobile ? 3 : 2}
        className="block w-full resize-y rounded border border-hairline bg-paper-2 px-3 py-2 font-serif text-sm leading-snug text-ink placeholder:text-faint outline-none focus:border-gold"
      />

      <div className={`flex items-center gap-4 text-sm ${isMobile ? 'mt-4' : 'mt-2 text-xs'}`}>
        <button
          type="button"
          onClick={handleSave}
          className={`rounded bg-gold font-semibold text-paper hover:opacity-90 ${
            isMobile ? 'px-5 py-2' : 'px-3 py-1'
          }`}
        >
          Save
        </button>
        {existing && onRemove && (
          <button
            type="button"
            onClick={handleRemove}
            className={`text-faint hover:text-red-500 ${isMobile ? 'py-2' : ''}`}
          >
            Remove
          </button>
        )}
        <button
          type="button"
          onClick={onCancel}
          className={`ml-auto text-faint hover:text-ink ${isMobile ? 'py-2' : ''}`}
        >
          Cancel
        </button>
      </div>
    </>
  );

  // Mobile: a centered card, portaled to <body>.
  //
  // Portal, because this component renders inside the verse list, under
  // <main class="chapter-enter">, whose entrance animation applies a
  // transform. A transformed ancestor becomes the containing block for
  // position: fixed descendants, so "inset-0" meant the chapter box, not the
  // screen: the sheet sat at the bottom of the chapter, not the viewport.
  // Rendering at body level makes the overlay's frame the real screen.
  //
  // Centered, not a bottom sheet, because the bottom edge is exactly where
  // the keyboard appears when the note field focuses.
  if (isMobile) {
    return createPortal(
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        onClick={onCancel}
      >
        <div
          className="w-full max-w-lg rounded-2xl bg-surface p-5 font-sans shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          {toolbarContent}
        </div>
      </div>,
      document.body
    );
  }

  // Desktop: inline under the verse
  return (
    <div
      className="my-3 ml-7 rounded-lg border border-hairline bg-surface p-3 font-sans"
      onClick={(e) => e.stopPropagation()}
      onDoubleClick={(e) => e.stopPropagation()}
    >
      {toolbarContent}
    </div>
  );
}
