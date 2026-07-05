import { useState } from 'react';
import { HighlightColor } from '@/lib/types';
import { HIGHLIGHT_COLORS } from '@/lib/highlight-colors';

interface Props {
  selection: { start: number; end: number };
  onHighlight: (color: HighlightColor, note?: string) => void;
  onCancel: () => void;
}

export default function HighlightToolbar({ selection, onHighlight, onCancel }: Props) {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [note, setNote] = useState('');
  const [selectedColor, setSelectedColor] = useState<HighlightColor | null>(null);

  const handleColorClick = (color: HighlightColor) => {
    setSelectedColor(color);
    setShowNoteInput(true);
  };

  const handleSave = () => {
    if (selectedColor) {
      onHighlight(selectedColor, note.trim() || undefined);
      setNote('');
      setShowNoteInput(false);
      setSelectedColor(null);
    }
  };

  const handleCancel = () => {
    setNote('');
    setShowNoteInput(false);
    setSelectedColor(null);
    onCancel();
  };

  const verseRange =
    selection.start === selection.end
      ? `Verse ${selection.start}`
      : `Verses ${selection.start}–${selection.end}`;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[calc(100vw-2rem)]">
      {!showNoteInput ? (
        <div className="flex items-center gap-3.5 pl-5 pr-2.5 py-2.5 rounded-full bg-ink text-white shadow-2xl border border-white/10">
          <span className="font-sans text-[13px] text-white/60 whitespace-nowrap">{verseRange}</span>
          <span className="w-px h-5 bg-white/15" />
          {HIGHLIGHT_COLORS.map((color) => (
            <button
              key={color.id}
              onClick={() => handleColorClick(color.id)}
              aria-label={`Highlight ${color.name.toLowerCase()}`}
              title={color.name}
              className="w-6 h-6 rounded-full border border-white/25 hover:scale-110 transition-transform"
              style={{ background: color.swatch }}
            />
          ))}
          <button
            onClick={handleCancel}
            className="font-sans text-[13px] text-white/70 hover:text-white transition-colors px-1"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="px-4 py-3.5 rounded-2xl bg-ink text-white shadow-2xl border border-white/10 space-y-3 min-w-[320px]">
          <div className="font-sans text-[13px] text-white/60">{verseRange}</div>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add note (optional)"
            className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-white/40 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-gold"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-full bg-gold text-[#231c07] font-sans text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 font-sans text-sm text-white/70 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
