import { Verse as VerseType } from '@/lib/types';
import { tokenizeVerse, type QuoteSpan } from '@/lib/speaker-quotes';

interface Props {
  verse: VerseType;
  isSelected?: boolean;
  onToggle?: (verseNum: number) => void;
  commentary?: string;
  spans?: Pick<QuoteSpan, 'speaker' | 'quote'>[];
  /* Speaker id → palette slot (1–10), resolved against the --speaker-N vars. */
  speakerColors?: Record<string, number>;
}

export default function Verse({ verse, isSelected = false, onToggle, commentary, spans, speakerColors }: Props) {
  const handleInteraction = () => {
    if (onToggle) {
      onToggle(verse.verse);
    }
  };

  return (
    <>
      <span
        className={`block mb-3 transition-colors cursor-pointer rounded ${
          isSelected
            ? 'bg-[rgb(var(--highlight-yellow))] shadow-[0_0_0_2px_rgb(var(--highlight-yellow))]'
            : ''
        }`}
        data-verse={verse.verse}
        onDoubleClick={handleInteraction}
      >
        <sup className="mr-1 text-xs font-sans font-semibold select-none align-super text-gold">
          {verse.verse}
        </sup>
        {spans && spans.length > 0 && speakerColors
          ? tokenizeVerse(verse.text, spans).map((run, i) =>
              run.speaker && speakerColors[run.speaker] ? (
                <span
                  key={i}
                  className="font-bold italic"
                  style={{ color: `rgb(var(--speaker-${speakerColors[run.speaker]}))` }}
                >
                  {run.text}
                </span>
              ) : (
                run.text
              )
            )
          : verse.text}
      </span>

      {isSelected && commentary && (
        <span className="block my-5 pl-5 border-l-2 border-gold">
          <span className="block font-sans text-[11px] tracking-[0.16em] uppercase font-bold text-gold-ink mb-1.5">
            Commentary · Verse {verse.verse}
          </span>
          <span className="block font-serif text-[16.5px] leading-relaxed text-muted">
            {commentary}
          </span>
        </span>
      )}
    </>
  );
}
