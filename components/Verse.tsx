import Link from 'next/link';
import { Verse as VerseType } from '@/lib/types';
import { tokenizeVerse, type QuoteSpan } from '@/lib/speaker-quotes';
import { tokenizePlaces } from '@/lib/places';

// Save scroll position before navigating to place page
function saveScrollPosition() {
  const scrollKey = `scroll-${window.location.pathname}${window.location.hash}`;
  sessionStorage.setItem(scrollKey, String(window.scrollY));
}

// Render text with place names as clickable links (underlined brown)
function renderWithPlaces(text: string): React.ReactNode {
  const segments = tokenizePlaces(text);
  if (segments.length === 1 && !segments[0].isPlace) {
    return text;
  }
  return segments.map((seg, i) =>
    seg.isPlace && seg.placeId ? (
      <Link
        key={i}
        href={`/places/${seg.placeId}`}
        className="underline text-amber-900 dark:text-amber-600 hover:text-amber-700 dark:hover:text-amber-400"
        onClick={(e) => {
          e.stopPropagation();
          saveScrollPosition();
        }}
      >
        {seg.text}
      </Link>
    ) : (
      seg.text
    )
  );
}

interface Props {
  verse: VerseType;
  isSelected?: boolean;
  onToggle?: (verseNum: number) => void;
  commentary?: string;
  showCommentaryGate?: boolean;
  spans?: Pick<QuoteSpan, 'speaker' | 'quote'>[];
  /* Speaker id → palette slot (1–10), resolved against the --speaker-N vars. */
  speakerColors?: Record<string, number>;
}

export default function Verse({ verse, isSelected = false, onToggle, commentary, showCommentaryGate = false, spans, speakerColors }: Props) {
  const handleInteraction = () => {
    if (onToggle) {
      onToggle(verse.verse);
    }
  };

  return (
    <>
      <span
        className={`block mb-3 transition-colors cursor-pointer rounded [-webkit-tap-highlight-color:transparent] [touch-action:manipulation] ${
          isSelected
            ? 'bg-[rgb(var(--highlight-yellow))] shadow-[0_0_0_2px_rgb(var(--highlight-yellow))]'
            : ''
        }`}
        data-verse={verse.verse}
        onDoubleClick={handleInteraction}
      >
        {/* Verse number doubles as a single-tap toggle for touch devices,
            where double-tap conflicts with iOS text selection/zoom. Inline
            padding widens the hit area without changing the line box. */}
        <sup
          className="mr-1 px-1 -mx-0.5 py-2 text-xs font-sans font-semibold select-none align-super text-gold cursor-pointer"
          onClick={handleInteraction}
        >
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
                  {renderWithPlaces(run.text)}
                </span>
              ) : (
                <span key={i}>{renderWithPlaces(run.text)}</span>
              )
            )
          : renderWithPlaces(verse.text)}
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

      {isSelected && !commentary && showCommentaryGate && (
        <span className="block my-5 pl-5 border-l-2 border-hairline">
          <span className="block font-sans text-[13px] text-muted mb-2">
            Sign up to view verse commentary
          </span>
          <Link
            href="/signup"
            className="inline-block font-sans text-[11px] tracking-[0.12em] uppercase font-semibold text-gold hover:text-gold-ink transition-colors"
          >
            Create free account →
          </Link>
        </span>
      )}
    </>
  );
}
