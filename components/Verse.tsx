import Link from 'next/link';
import { Verse as VerseType, Highlight, HighlightColor } from '@/lib/types';
import { tokenizeVerse, type QuoteSpan } from '@/lib/speaker-quotes';
import { tokenizePlaces } from '@/lib/places';
import type { ProverbsTopic } from '@/lib/proverbs-topics';
import { getHighlightColor } from '@/lib/highlight-colors';
import ProverbsTopicTag from './ProverbsTopicTag';
import TextWithDefinitions from './TextWithDefinitions';
import HighlightToolbar from './HighlightToolbar';

// Save scroll position before navigating to place page
function saveScrollPosition() {
  const scrollKey = `scroll-${window.location.pathname}${window.location.hash}`;
  sessionStorage.setItem(scrollKey, String(window.scrollY));
}

// Render text with place names as clickable links (underlined brown)
// If withDefinitions is true, also wrap words with definition tooltips
function renderWithPlaces(text: string, withDefinitions: boolean = false): React.ReactNode {
  const segments = tokenizePlaces(text);
  if (segments.length === 1 && !segments[0].isPlace) {
    return withDefinitions ? <TextWithDefinitions text={text} /> : text;
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
    ) : withDefinitions ? (
      <TextWithDefinitions key={i} text={seg.text} />
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
  /** Purple text highlight for first verse of opened section */
  isHighlighted?: boolean;
  /** Called when mouse enters verse (to clear auto-highlight) */
  onMouseEnter?: () => void;
  /** Topic tags for Proverbs verses */
  topics?: ProverbsTopic[];
  /** Chapter number (needed for Hebrew lookup) */
  chapter?: number;
  /** Show word definition tooltips on hover */
  showDefinitions?: boolean;
  /** Persisted highlight covering this verse, if any */
  highlight?: Highlight;
  /** Render the highlight toolbar under this verse */
  showHighlightToolbar?: boolean;
  /** Label for the range the toolbar will mark, e.g. "verses 3–5" */
  highlightRangeLabel?: string;
  onSaveHighlight?: (color: HighlightColor, note: string) => void;
  onRemoveHighlight?: () => void;
  onCloseHighlightToolbar?: () => void;
}

export default function Verse({ verse, isSelected = false, onToggle, commentary, showCommentaryGate = false, spans, speakerColors, isFirstVerse = false, isHighlighted = false, onMouseEnter, topics, chapter, showDefinitions = false, highlight, showHighlightToolbar = false, highlightRangeLabel, onSaveHighlight, onRemoveHighlight, onCloseHighlightToolbar }: Props) {
  const handleInteraction = () => {
    if (onToggle) {
      onToggle(verse.verse);
    }
  };

  // A saved highlight tints the row by its palette color; selection keeps
  // the gold ring on top of it so the two states stay distinguishable.
  const palette = highlight ? getHighlightColor(highlight.color) : null;
  const swatch = palette?.swatch ?? null;

  return (
    <>
      <div
        className={`flex items-start mb-3 transition-colors duration-200 cursor-pointer rounded-sm [-webkit-tap-highlight-color:transparent] [touch-action:manipulation] md:select-text ${
          isSelected
            ? 'shadow-[0_0_0_2px_rgb(var(--highlight-yellow))]'
            : isHighlighted
            ? 'text-[rgb(var(--speaker-4))]'
            : ''
        } ${isSelected && !swatch ? 'bg-[rgb(var(--highlight-yellow))]' : ''}`}
        style={swatch ? { backgroundColor: `${swatch}40` } : undefined}
        data-verse={verse.verse}
        onMouseEnter={onMouseEnter}
        // The browser selects a word on the second mousedown of a double-click,
        // before dblclick fires. Blocking multi-click mousedown stops that while
        // leaving ordinary click-and-drag text selection alone.
        onMouseDown={(e) => {
          if (e.detail > 1) e.preventDefault();
        }}
        onDoubleClick={(e) => {
          e.preventDefault();
          window.getSelection()?.removeAllRanges();
          handleInteraction();
        }}
      >
        {/* Topic tags - fixed width column before verse number */}
        {topics !== undefined && (
          <span className="flex-shrink-0 w-[70px] flex flex-col gap-0.5 mr-1 items-start" style={{ paddingTop: '0.15em' }}>
            {topics.map((topic) => (
              <ProverbsTopicTag key={topic} topic={topic} />
            ))}
          </span>
        )}
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
                    {renderWithPlaces(run.text, showDefinitions)}
                  </span>
                ) : (
                  <span key={i}>{renderWithPlaces(run.text, showDefinitions)}</span>
                )
              )
            : renderWithPlaces(isFirstVerse ? verse.text.slice(1) : verse.text, showDefinitions)}
        </span>
      </div>

      {/* The note rides with the first verse of its highlight only */}
      {highlight?.note && highlight.verseStart === verse.verse && !showHighlightToolbar && (
        <span
          className="block -mt-1 mb-3 ml-7 pl-3 font-serif italic text-[15px] leading-snug border-l-2"
          style={{ borderColor: swatch ?? undefined, color: palette?.label }}
        >
          {highlight.note}
        </span>
      )}

      {showHighlightToolbar && onSaveHighlight && onCloseHighlightToolbar && (
        <HighlightToolbar
          rangeLabel={highlightRangeLabel ?? `verse ${verse.verse}`}
          existing={highlight}
          onSave={onSaveHighlight}
          onRemove={onRemoveHighlight}
          onCancel={onCloseHighlightToolbar}
        />
      )}

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
