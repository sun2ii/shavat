import { useState } from 'react';

interface Props {
  selection: { start: number; end: number };
  onHighlight: (color: 'yellow' | 'blue', note?: string) => void;
  onCancel: () => void;
}

export default function HighlightToolbar({ selection, onHighlight, onCancel }: Props) {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [note, setNote] = useState('');
  const [selectedColor, setSelectedColor] = useState<'yellow' | 'blue' | null>(null);

  const handleColorClick = (color: 'yellow' | 'blue') => {
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
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[rgb(var(--bg-primary))] shadow-2xl rounded-lg border border-[rgb(var(--border))]">
      {!showNoteInput ? (
        <div className="flex items-center gap-4 px-5 py-4">
          <span className="text-sm text-[rgb(var(--text-secondary))]">{verseRange}</span>
          <button
            onClick={() => handleColorClick('yellow')}
            className="px-4 py-2 bg-[rgb(var(--highlight-yellow))] hover:opacity-80 rounded text-sm font-medium transition-opacity"
          >
            Yellow
          </button>
          <button
            onClick={() => handleColorClick('blue')}
            className="px-4 py-2 bg-[rgb(var(--highlight-blue))] hover:opacity-80 rounded text-sm font-medium transition-opacity"
          >
            Blue
          </button>
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] text-sm transition-colors"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="px-5 py-4 space-y-3 min-w-[320px]">
          <div className="text-sm text-[rgb(var(--text-secondary))]">{verseRange}</div>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add note (optional)"
            className="w-full px-3 py-2 border border-[rgb(var(--border))] bg-[rgb(var(--bg-secondary))] text-[rgb(var(--text-primary))] rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave();
              if (e.key === 'Escape') handleCancel();
            }}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[rgb(var(--text-primary))] text-[rgb(var(--bg-primary))] rounded text-sm hover:opacity-90 transition-opacity font-medium"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] text-sm transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
