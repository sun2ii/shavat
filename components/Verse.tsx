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
  /** First verse of chapter gets drop cap treatment */
  isFirstVerse?: boolean;
}

export default function Verse({ verse, isSelected = false, onToggle, commentary, showCommentaryGate = false, spans, speakerColors, isFirstVerse = false }: Props) {
  const handleInteraction = () => {
    if (onToggle) {
      onToggle(verse.verse);
    }
  };

  return (
    <>
      <div
        className={`flex items-start mb-3 transition-colors duration-200 cursor-pointer rounded-sm [-webkit-tap-highlight-color:transparent] [touch-action:manipulation] md:select-text ${
          isSelected
            ? 'bg-[rgb(var(--highlight-yellow))] shadow-[0_0_0_2px_rgb(var(--highlight-yellow))]'
            : 'hover:text-[rgb(var(--speaker-4))]'
        }`}
        data-verse={verse.verse}
        onDoubleClick={(e) => {
          e.preventDefault();
          handleInteraction();
        }}
      >
        {/* Verse number - fixed width, aligned to first line of text */}
        <span
          className="w-7 flex-shrink-0 text-center text-[13px] font-sans font-medium select-none text-gold cursor-pointer"
          style={{ lineHeight: '1.95', paddingTop: '0.15em' }}
          onClick={handleInteraction}
        >
          {verse.verse}
        </span>
        <span className="flex-1">
          {isFirstVerse && verse.text.length > 0 && (
            <span
              className="float-left text-[2.6rem] font-serif mr-1.5 select-none"
              style={{
                color: 'rgb(var(--speaker-4))',
                lineHeight: '0.85',
                marginTop: '0.12em',
              }}
            >
              {verse.text[0]}
            </span>
          )}
          {spans && spans.length > 0 && speakerColors
            ? tokenizeVerse(isFirstVerse ? verse.text.slice(1) : verse.text, spans).map((run, i) =>
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
            : renderWithPlaces(isFirstVerse ? verse.text.slice(1) : verse.text)}
        </span>
      </div>

      {isSelected && commentary && (
        <span className="block mt-4 mb-5 pl-6 pr-4 py-4 border-l-[3px] border-gold/60 bg-[rgb(var(--highlight-yellow)/0.06)] rounded-r">
          <span className="block font-sans text-[11px] tracking-[0.16em] uppercase font-bold text-gold-ink mb-2">
            Commentary · Verse {verse.verse}
          </span>
          <span className="block font-serif text-[17px] leading-relaxed text-muted">
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
