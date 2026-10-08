'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Verse as VerseType, Highlight, HighlightColor } from '@/lib/types';
import { useHighlights } from '@/components/providers/HighlightProvider';
import { loadingBus } from '@/lib/loading-bus';
import { FIRST_VERSE_HASH } from '@/lib/reader-keys';
import { HIGHLIGHT_KEYS } from '@/lib/highlight-colors';
import Verse from './Verse';
import { loadCommentary, getCommentary } from '@/lib/getCommentary';
import { COPY_FLASH_MS, COPY_GLOW, COPY_GLOW_OFF, COPY_TRANSITION, COPY_UNFOLD_DELAY_MS } from '@/lib/copy-glow';
import ChapterOutline from './ChapterOutline';
import SpeakerLegend from './SpeakerLegend';
import type { Section } from '@/lib/sections';
import type { ChapterSpeakers, QuoteSpan, SpeakerDef } from '@/lib/speaker-quotes';
import { getSpeakersInRange } from '@/lib/speaker-quotes';
import { readingPath } from '@/lib/routes';
import { useReadingProgress } from '@/components/providers/ReadingProgressProvider';
import { usePathname } from 'next/navigation';
import ScrollToTop from './ScrollToTop';
import { getChapterTopics } from '@/lib/getProverbsTopics';
import type { ProverbsTopic } from '@/lib/proverbs-topics';

interface Props {
  verses: VerseType[];
  book?: string;
  chapter?: number;
  sections?: Section[];
  chapterSpeakers?: ChapterSpeakers;
  prevChapter?: number | null;
  nextChapter?: number | null;
  prevDivisionId?: string | null;
  nextDivisionId?: string | null;
  bookCategory?: string;
  isAuthenticated?: boolean;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}


/*
  Copy-confirmation flash. Each section is tinted with its own hue, so a single
  fixed flash color would collide on same-family sections (blue on blue reads as
  muddy rather than as a signal). Instead each tint maps to roughly its opposite
  on the wheel, so the flash always cuts against the background it sits on.
  Full class strings are required — Tailwind scans source and cannot see
  interpolated names.
*/
const COPY_FLASH: Record<string, string> = {
  red: 'text-teal-600 dark:text-teal-300',
  orange: 'text-blue-600 dark:text-blue-300',
  amber: 'text-indigo-600 dark:text-indigo-300',
  yellow: 'text-violet-600 dark:text-violet-300',
  green: 'text-rose-600 dark:text-rose-300',
  emerald: 'text-pink-600 dark:text-pink-300',
  teal: 'text-red-600 dark:text-red-300',
  cyan: 'text-orange-600 dark:text-orange-300',
  sky: 'text-amber-600 dark:text-amber-300',
  blue: 'text-amber-600 dark:text-amber-300',
  indigo: 'text-yellow-600 dark:text-yellow-300',
  violet: 'text-yellow-600 dark:text-yellow-300',
  purple: 'text-green-600 dark:text-green-300',
  pink: 'text-emerald-600 dark:text-emerald-300',
  rose: 'text-green-600 dark:text-green-300',
  gray: 'text-blue-600 dark:text-blue-300',
  slate: 'text-amber-600 dark:text-amber-300',
};

const FALLBACK_FLASH = 'text-blue-600 dark:text-blue-300';

function copyFlashClass(borderColor: string): string {
  const family = borderColor.match(/border-([a-z]+)-/)?.[1];
  return (family && COPY_FLASH[family]) || FALLBACK_FLASH;
}

/*
  Collapsible content: height is always instant (required for scroll positioning),
  but opening has a gentle fade-in for peaceful Scripture reading.
  Close is instant - animated close breaks scroll positioning.
*/
function CollapsibleVerses({
  id,
  isCollapsed,
  children,
}: {
  id: string;
  isCollapsed: boolean;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className="overflow-x-visible overflow-y-hidden" style={{ height: isCollapsed ? 0 : 'auto' }}>
      <div
        className={`font-serif text-ink text-[21px] leading-[1.95] ${
          isCollapsed ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000 ease-out'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function BookReader({ verses, book, chapter, sections, chapterSpeakers, prevChapter, nextChapter, prevDivisionId, nextDivisionId, bookCategory, isAuthenticated = false }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedVerses, setSelectedVerses] = useState<Set<number>>(new Set());
  const [commentary, setCommentary] = useState<Map<number, string>>(new Map());
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  // Accordion: at most one section open at a time; null means everything folded.
  // Synced with URL hash so back navigation restores state.
  const [expandedSection, setExpandedSection] = useState<string | null>(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      // Convert hash back to section title (reverse of slugify)
      return null; // Will be set properly in useEffect
    }
    return null;
  });
  // Auto-highlight first verse of newly opened section (clears on any hover)
  const [autoHighlightedVerse, setAutoHighlightedVerse] = useState<number | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unfoldTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reading progress bar
  const [readingProgress, setReadingProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setReadingProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Get the context to update progress optimistically
  const { markChapterComplete } = useReadingProgress();

  // Mark chapter as read and navigate
  const markReadAndNavigate = (href: string) => {
    if (isAuthenticated && book && chapter) {
      // Optimistically update context (instant UI feedback)
      markChapterComplete(book, chapter);

      // Persist to database in background (don't block navigation)
      fetch('/api/reading-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ book, chapter }),
      }).catch(err => console.error('Failed to save reading progress:', err));
    }
    loadingBus.start();
    router.push(href);
  };

  // Track reading progress when navigating to next chapter
  const handleNextClick = () => {
    if (nextChapter && nextDivisionId && book) {
      // #v1: the next chapter opens on its first verse (see lib/reader-keys).
      markReadAndNavigate(readingPath(book, nextDivisionId, nextChapter) + FIRST_VERSE_HASH);
    }
  };

  // Track reading progress when returning to library
  const handleReturnToLibrary = () => {
    if (bookCategory) {
      markReadAndNavigate(`/library/${bookCategory}`);
    }
  };

  // Extract book and chapter from verses if not provided
  const actualBook = book || verses[0]?.book.toLowerCase();
  const actualChapter = chapter || verses[0]?.chapter;

  // Speaker spans indexed once per chapter, not re-filtered per verse render.
  const spansByVerse = new Map<number, QuoteSpan[]>();
  const speakerColors: Record<string, number> = {};
  if (chapterSpeakers) {
    for (const span of chapterSpeakers.spans) {
      const existing = spansByVerse.get(span.verse);
      if (existing) {
        existing.push(span);
      } else {
        spansByVerse.set(span.verse, [span]);
      }
    }
    for (const [id, def] of Object.entries(chapterSpeakers.speakers)) {
      speakerColors[id] = def.color;
    }
  }

  // Display name as printed in the text ("2 Kings"), not the route slug.
  const bookLabel = verses[0]?.book || actualBook;

  // Load topic tags for Proverbs verses
  const isProverbs = actualBook?.toLowerCase() === 'proverbs';
  const chapterTopics: Map<number, ProverbsTopic[]> = isProverbs && actualChapter
    ? getChapterTopics(actualChapter)
    : new Map();

  // Each fold's legend lists only the characters speaking inside it.
  // Uses verse-range attribution if available (translation-agnostic),
  // falls back to quote spans (translation-specific).
  const sectionSpeakers = (range: [number, number]): Record<string, SpeakerDef> => {
    if (!chapterSpeakers) return {};

    // Try verse-range attribution first (works across translations)
    const fromRanges = getSpeakersInRange(
      chapterSpeakers.verseSpeakers,
      chapterSpeakers.speakers,
      range[0],
      range[1]
    );
    if (Object.keys(fromRanges).length > 0) {
      return fromRanges;
    }

    // Fall back to quote-span detection
    const result: Record<string, SpeakerDef> = {};
    for (const span of chapterSpeakers.spans) {
      if (span.verse >= range[0] && span.verse <= range[1]) {
        const def = chapterSpeakers.speakers[span.speaker];
        if (def) result[span.speaker] = def;
      }
    }
    return result;
  };

  // On mount, restore expanded section from URL hash and scroll position from sessionStorage
  // Also handle verse-specific hashes like #v7
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove #
    if (!hash) return;

    // Check for verse hash pattern: v{number}
    const verseMatch = hash.match(/^v(\d+)$/);
    if (verseMatch) {
      const verseNum = parseInt(verseMatch[1], 10);
      // Find the section containing this verse and expand it
      if (sections) {
        const matchingSection = sections.find(
          s => verseNum >= s.verseRange[0] && verseNum <= s.verseRange[1]
        );
        if (matchingSection) {
          setExpandedSection(matchingSection.title);
        }
      }
      // Put the reading cursor on it. The cursor effect below scrolls it into
      // view (within this instance's own DOM, so the hidden twin can't win).
      setCursorVerse(verseNum);
      setAutoHighlightedVerse(null);
      return;
    }

    // Handle section hash (existing behavior)
    if (sections) {
      // Find section whose slugified title matches the hash
      const matchingSection = sections.find(s => slugify(s.title) === hash);
      if (matchingSection) {
        setExpandedSection(matchingSection.title);

        // Restore scroll position after section expands
        const scrollKey = `scroll-${pathname}#${hash}`;
        const savedScroll = sessionStorage.getItem(scrollKey);
        if (savedScroll) {
          // Wait for section to expand before scrolling
          setTimeout(() => {
            window.scrollTo(0, parseInt(savedScroll, 10));
            sessionStorage.removeItem(scrollKey);
          }, 100);
        }
      }
    }
  }, [sections, pathname]);

  // Section titles are chapter-scoped, so a chapter change folds everything again.
  useEffect(() => {
    // Only reset if no hash present
    if (!window.location.hash) {
      setExpandedSection(null);
    }
    // Per-chapter interaction state is cleared by hand. The cursor is kept
    // when the URL names a verse (#v12): the hash effect above just set it.
    if (!/^#v\d+$/.test(window.location.hash)) setCursorVerse(null);
    setSelectedVerses(new Set());
    setToolbarVerse(null);
    setAutoHighlightedVerse(null);
  }, [actualBook, actualChapter]);

  // ── Keyboard reading cursor ──
  // ↓ / ↑ step through verses. Leaving a section opens the adjacent one and
  // lands on its first (or last) verse. Past the final section, ↓ goes to the
  // next chapter. Enter = double-tap on the cursor verse.
  const [cursorVerse, setCursorVerse] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  // Exactly one verse is ever purple: the keyboard cursor when there is one,
  // otherwise the first verse of a section just opened by mouse.
  const litVerse = cursorVerse ?? autoHighlightedVerse;

  // toggleSection tints the section's first verse; re-clear after it so the
  // cursor stays the only highlighted verse.
  const openSection = (title: string, firstVerse: number) => {
    toggleSection(title, rootRef.current, firstVerse);
    setAutoHighlightedVerse(null);
  };

  const stepCursor = (dir: 1 | -1) => {
    const nums = verses.map((v) => v.verse).sort((a, b) => a - b);
    if (nums.length === 0) return;
    // The cursor is the only purple verse while the keyboard drives; drop the
    // "first verse of the opened section" tint (toggleSection sets it, and a
    // later setState in the same tick wins).
    setAutoHighlightedVerse(null);

    if (!sections || sections.length === 0) {
      const i = cursorVerse === null ? (dir > 0 ? 0 : nums.length - 1) : nums.indexOf(cursorVerse) + dir;
      if (i >= 0 && i < nums.length) setCursorVerse(nums[i]);
      else if (dir > 0 && nextChapter && nextDivisionId) handleNextClick();
      return;
    }

    const sectionOf = (v: number) =>
      sections.find((s) => v >= s.verseRange[0] && v <= s.verseRange[1]);

    if (cursorVerse === null) {
      const sec = sections.find((s) => s.title === expandedSection) ?? sections[0];
      if (expandedSection !== sec.title) openSection(sec.title, sec.verseRange[0]);
      setCursorVerse(sec.verseRange[0]);
      return;
    }

    const sec = sectionOf(cursorVerse);
    const next = cursorVerse + dir;
    if (sec && next >= sec.verseRange[0] && next <= sec.verseRange[1]) {
      setCursorVerse(next);
      return;
    }

    // Next section in the direction of travel. When the cursor sits on a verse
    // no section covers (ranges with gaps), pick the nearest section ahead or
    // behind rather than indexing from -1, which would reopen the first one.
    const target = sec
      ? sections[sections.indexOf(sec) + dir]
      : dir > 0
      ? sections.find((s) => s.verseRange[0] > cursorVerse)
      : [...sections].reverse().find((s) => s.verseRange[1] < cursorVerse);
    if (target) {
      const landing = dir > 0 ? target.verseRange[0] : target.verseRange[1];
      openSection(target.title, target.verseRange[0]);
      setCursorVerse(landing);
      return;
    }
    if (dir > 0 && nextChapter && nextDivisionId) handleNextClick();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Escape closes the toolbar from anywhere, including inside its note box.
      if (e.key === 'Escape' && toolbarVerse !== null) {
        e.preventDefault();
        (document.activeElement as HTMLElement | null)?.blur?.();
        closeToolbar();
        return;
      }
      const t = e.target as HTMLElement | null;
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t?.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        stepCursor(1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        stepCursor(-1);
      } else if (e.key === 'Enter' && cursorVerse !== null) {
        e.preventDefault();
        toggleVerse(cursorVerse);
      } else if (e.key === 'h' && cursorVerse !== null) {
        // Toggle the highlight toolbar on the cursor verse.
        e.preventDefault();
        if (toolbarVerse === cursorVerse) {
          closeToolbar();
        } else {
          setSelectedVerses(new Set([cursorVerse]));
          setToolbarVerse(cursorVerse);
        }
      } else if (HIGHLIGHT_KEYS[e.key] && cursorVerse !== null && actualBook && actualChapter) {
        // c / s / p: one-key highlight of the selection (or the cursor verse)
        // as that kind. Pressing the same kind on an existing highlight of
        // that kind removes it, so each key is a toggle.
        e.preventDefault();
        const kind = HIGHLIGHT_KEYS[e.key];
        const existing = highlightByVerse.get(cursorVerse);
        const range = selectionRange ?? { start: cursorVerse, end: cursorVerse };
        if (existing && existing.color === kind && existing.verseStart === range.start && existing.verseEnd === range.end) {
          void removeHighlight(existing.id);
        } else {
          void saveHighlight({ book: actualBook, chapter: actualChapter, verseStart: range.start, verseEnd: range.end, color: kind, note: existing?.note });
        }
        setSelectedVerses(new Set());
        setToolbarVerse(null);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // Keep the cursor verse in view. Delayed a beat so a section's own
  // scroll-to-top (toggleSection) settles first.
  useEffect(() => {
    if (cursorVerse === null) return;
    const id = setTimeout(() => {
      const el = rootRef.current?.querySelector<HTMLElement>(`[data-verse="${cursorVerse}"]`);
      el?.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }, 80);
    return () => clearTimeout(id);
  }, [cursorVerse, expandedSection]);

  /*
    SIMPLE by design, after much pain: the section opens instantly (no height
    animation — see CollapsibleVerses), then ONE instant scroll puts the card
    at the top. Crucially we scroll the card the user actually touched:
    the app shell renders the page twice (desktop + mobile layout branches),
    so document.getElementById can return the HIDDEN twin — the root cause of
    every "lands anywhere but the top" bug. closest() walks up from the real
    tapped element, so it can only find the visible copy.
  */
  const toggleSection = (sectionName: string, origin?: HTMLElement | null, firstVerse?: number) => {
    const newSection = expandedSection === sectionName ? null : sectionName;
    setExpandedSection(newSection);
    setAutoHighlightedVerse(newSection && firstVerse ? firstVerse : null);
    if (newSection) {
      const id = slugify(newSection);
      window.history.replaceState(null, '', `#${id}`);
      // origin may be the tapped element (walk up) or the reader root (walk down).
      const card =
        origin?.closest<HTMLElement>(`[id="${id}"]`) ??
        origin?.querySelector<HTMLElement>(`[id="${id}"]`) ??
        document.getElementById(id);
      requestAnimationFrame(() => {
        card?.scrollIntoView({ block: 'start' });
      });
    } else {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  // Only load commentary for authenticated users
  useEffect(() => {
    if (isAuthenticated && actualBook && actualChapter) {
      loadCommentary(actualBook, actualChapter).then(() => {
        setCommentary(getCommentary(actualBook, actualChapter));
      });
    }
  }, [isAuthenticated, actualBook, actualChapter]);

  // The verse the reader double-tapped last; the highlight toolbar hangs off
  // it. Kept separate from selectedVerses because deep links (#v12) also
  // write selectedVerses for a 2s flash and must not open the toolbar.
  const [toolbarVerse, setToolbarVerse] = useState<number | null>(null);

  const toggleVerse = (verseNum: number) => {
    setSelectedVerses(prev => {
      const next = new Set(prev);
      if (next.has(verseNum)) {
        next.delete(verseNum);
        setToolbarVerse((t) => (t === verseNum ? null : t));
      } else {
        next.add(verseNum);
        setToolbarVerse(verseNum);
      }
      return next;
    });
  };

  // ── Highlights ──
  const { forChapter, saveHighlight, removeHighlight } = useHighlights();
  const chapterHighlights = useMemo(
    () => (actualBook && actualChapter ? forChapter(actualBook, actualChapter) : []),
    [forChapter, actualBook, actualChapter],
  );
  // verse number → the highlight covering it (ranges expanded)
  const highlightByVerse = useMemo(() => {
    const map = new Map<number, Highlight>();
    for (const h of chapterHighlights) {
      for (let v = h.verseStart; v <= h.verseEnd; v++) map.set(v, h);
    }
    return map;
  }, [chapterHighlights]);

  // The range a save will cover: everything selected, or just the tapped verse.
  const selectionRange = useMemo(() => {
    const nums = selectedVerses.size > 0 ? [...selectedVerses] : toolbarVerse !== null ? [toolbarVerse] : [];
    if (nums.length === 0) return null;
    return { start: Math.min(...nums), end: Math.max(...nums) };
  }, [selectedVerses, toolbarVerse]);
  const rangeLabel = selectionRange
    ? selectionRange.start === selectionRange.end
      ? `verse ${selectionRange.start}`
      : `verses ${selectionRange.start}–${selectionRange.end}`
    : '';

  const closeToolbar = () => {
    setToolbarVerse(null);
    setSelectedVerses(new Set());
  };

  const handleSaveHighlight = async (color: HighlightColor, note: string) => {
    if (!actualBook || !actualChapter || !selectionRange) return;
    await saveHighlight({
      book: actualBook,
      chapter: actualChapter,
      verseStart: selectionRange.start,
      verseEnd: selectionRange.end,
      color,
      note: note.trim() || undefined,
    });
    closeToolbar();
  };

  const handleRemoveHighlight = async () => {
    const existing = toolbarVerse !== null ? highlightByVerse.get(toolbarVerse) : undefined;
    if (existing) await removeHighlight(existing.id);
    closeToolbar();
  };

  // Props every Verse gets for highlighting; keeps both render branches in sync.
  const highlightProps = (verseNum: number) => ({
    highlight: highlightByVerse.get(verseNum),
    showHighlightToolbar: toolbarVerse === verseNum,
    highlightRangeLabel: rangeLabel,
    onSaveHighlight: handleSaveHighlight,
    onRemoveHighlight: handleRemoveHighlight,
    onCloseHighlightToolbar: closeToolbar,
  });

  const handleCopySection = async (sectionName: string, sectionVerses: VerseType[]) => {
    const sectionText = sectionVerses.map(v => `${v.verse}. ${v.text}`).join('\n\n');
    try {
      await navigator.clipboard.writeText(sectionText);
    } catch {
      return false;
    }
    if (copyTimer.current) clearTimeout(copyTimer.current);
    setCopiedSection(sectionName);
    copyTimer.current = setTimeout(() => setCopiedSection(null), COPY_FLASH_MS);
    return true;
  };

  useEffect(() => {
    const handleCopy = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'c' && selectedVerses.size > 0) {
        const selectedText = verses
          .filter(v => selectedVerses.has(v.verse))
          .map(v => `${v.verse}. ${v.text}`)
          .join('\n\n');

        if (selectedText) {
          navigator.clipboard.writeText(selectedText);
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleCopy);
    return () => window.removeEventListener('keydown', handleCopy);
  }, [selectedVerses, verses]);

  // Progress bar component
  const ProgressBar = () => (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-transparent pointer-events-none">
      <div
        className="h-full transition-[width] duration-100 ease-out"
        style={{
          width: `${readingProgress * 100}%`,
          background: 'linear-gradient(to right, rgb(52 211 153 / 0.7), rgb(16 185 129))'
        }}
      />
    </div>
  );

  if (sections && sections.length > 0) {
    return (
      <div ref={rootRef} className="px-6 sm:px-10 md:px-16" data-cursor={cursorVerse ?? ''}>
        <ProgressBar />
        <ChapterOutline sections={sections} book={actualBook} chapter={actualChapter} />
        <div>
          {sections.map((daySection, sectionIndex) => {
            const dayVerses = verses.filter(
              (v) => v.verse >= daySection.verseRange[0] && v.verse <= daySection.verseRange[1]
            );
            const sectionId = slugify(daySection.title);
            const isCollapsed = expandedSection !== daySection.title;
            const speakers = chapterSpeakers ? sectionSpeakers(daySection.verseRange) : {};
            const speakerEntries = Object.entries(speakers);
            // Highlight the next section after the expanded one
            const expandedIndex = sections.findIndex(s => s.title === expandedSection);
            const isNextSection = expandedIndex !== -1 && sectionIndex === expandedIndex + 1;
            return (
              <div
                key={daySection.title}
                id={sectionId}
                onClick={isCollapsed ? (e) => toggleSection(daySection.title, e.currentTarget, daySection.verseRange[0]) : undefined}
                className={`scroll-mt-16 py-1.5 md:py-2 ${
                  isCollapsed ? 'cursor-pointer' : ''
                }`}
              >
                {/* Header: title centered, verse range on right */}
                <div
                  id={`${sectionId}-header`}
                  className="relative flex items-start justify-center"
                >
                  {/* Title + speakers - left on mobile, center on desktop */}
                  <div
                    className="flex flex-col gap-1 cursor-pointer items-start sm:items-center text-left sm:text-center w-full pr-16"
                    onClick={async (e) => {
                      e.stopPropagation();
                      const origin = e.currentTarget as HTMLElement;
                      const copied = await handleCopySection(daySection.title, dayVerses);
                      // If already open, just copy - don't collapse
                      if (!isCollapsed) {
                        return;
                      }
                      // If collapsed, open after copy flash (or immediately if copy failed)
                      if (unfoldTimer.current) clearTimeout(unfoldTimer.current);
                      if (copied) {
                        unfoldTimer.current = setTimeout(
                          () => toggleSection(daySection.title, origin, daySection.verseRange[0]),
                          COPY_UNFOLD_DELAY_MS
                        );
                      } else {
                        toggleSection(daySection.title, origin, daySection.verseRange[0]);
                      }
                    }}
                  >
                    <span
                      className={`py-2 -my-2 px-1 font-sans text-[14px] tracking-[0.16em] uppercase font-bold text-center rounded ${COPY_TRANSITION} ${
                        copiedSection === daySection.title
                          ? `text-blue-500 dark:text-blue-400 ${COPY_GLOW}`
                          : `text-gold-ink hover:text-gold ${COPY_GLOW_OFF}`
                      }`}
                    >
                      {daySection.title}
                    </span>

                    {/* Speaker names with colored dots */}
                    {speakerEntries.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        {speakerEntries.map(([id, def]) => (
                          <span key={id} className="flex items-center gap-1">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ backgroundColor: `rgb(var(--speaker-${def.color}))` }}
                            />
                            <span className="font-sans text-[10px] tracking-[0.12em] uppercase text-muted">
                              {def.name}
                            </span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right: Verse range pill + chevron */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSection(daySection.title, e.currentTarget, daySection.verseRange[0]);
                    }}
                    aria-expanded={!isCollapsed}
                    aria-controls={`${sectionId}-verses`}
                    className={`absolute right-0 top-0 flex items-center gap-1 px-2.5 py-1 rounded-full flex-shrink-0 min-w-[50px] justify-center transition-all duration-150 cursor-pointer ${
                      !isCollapsed
                        ? 'bg-gradient-to-b from-emerald-500 via-emerald-600 to-emerald-700 text-white shadow-[0_2px_4px_rgba(0,0,0,0.2),0_4px_8px_rgba(16,185,129,0.25),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:shadow-[0_3px_6px_rgba(0,0,0,0.25),0_6px_12px_rgba(16,185,129,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:from-emerald-400 hover:via-emerald-500 hover:to-emerald-600 active:shadow-[0_1px_2px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(0,0,0,0.1)] active:translate-y-[1px]'
                        : isNextSection
                        ? 'bg-emerald-900/30 text-emerald-200/70 shadow-[0_2px_4px_rgba(0,0,0,0.15)] hover:bg-emerald-800/40 active:translate-y-[1px]'
                        : 'bg-gradient-to-b from-stone-500 via-stone-600 to-stone-700 text-stone-100 shadow-[0_2px_4px_rgba(0,0,0,0.2),0_4px_8px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:shadow-[0_3px_6px_rgba(0,0,0,0.25),0_6px_12px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:from-stone-400 hover:via-stone-500 hover:to-stone-600 active:shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(0,0,0,0.1)] active:translate-y-[1px]'
                    }`}
                  >
                    <span className="font-sans text-[11px] font-semibold tabular-nums [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                      {daySection.verseRange[1] - daySection.verseRange[0] + 1}
                    </span>
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`h-3 w-3 [filter:drop-shadow(0_1px_1px_rgba(0,0,0,0.3))] transition-transform duration-500 ease-out ${
                        isCollapsed ? '' : 'rotate-180'
                      }`}
                    >
                      <path d="M5 7.5 10 12.5 15 7.5" />
                    </svg>
                  </button>
                </div>

                {/* Verses (collapsible) */}
                <CollapsibleVerses
                  id={`${sectionId}-verses`}
                  isCollapsed={isCollapsed}
                >
                  <div className="mt-6">
                    {dayVerses.map((verse) => (
                      <Verse
                        key={verse.verse}
                        verse={verse}
                        isSelected={selectedVerses.has(verse.verse)}
                        onToggle={toggleVerse}
                        commentary={isAuthenticated ? commentary.get(verse.verse) : undefined}
                        showCommentaryGate={!isAuthenticated}
                        spans={spansByVerse.get(verse.verse)}
                        speakerColors={speakerColors}
                        isFirstVerse={verse.verse === daySection.verseRange[0]}
                        isHighlighted={litVerse === verse.verse}
                        onMouseEnter={() => setAutoHighlightedVerse(null)}
                        topics={chapterTopics.get(verse.verse)}
                        chapter={actualChapter}
                        showDefinitions={isProverbs}
                        {...highlightProps(verse.verse)}
                      />
                    ))}
                  </div>
                </CollapsibleVerses>
              </div>
            );
          })}
        </div>

        {/* Floating scroll to top button */}
        <ScrollToTop />

        {/* Navigation buttons below sections */}
        {(prevChapter || nextChapter || bookCategory) && (
          <div className="py-6 md:py-8 border-t border-hairline">
            {/* Prev / Next */}
            <div className="flex justify-between items-center">
              {prevChapter && prevDivisionId && book ? (
                <Link
                  href={readingPath(book, prevDivisionId, prevChapter)}
                  className="px-6 py-3 text-sm font-sans font-semibold border border-hairline rounded-lg hover:border-gold hover:text-gold transition-colors"
                >
                  ← Previous
                </Link>
              ) : (
                <div />
              )}
              {nextChapter && nextDivisionId && book ? (
                <button
                  onClick={handleNextClick}
                  className="px-6 py-3 text-sm font-sans font-semibold rounded-lg transition-all cursor-pointer border border-gold-ink/60 bg-gold/10 text-gold-ink hover:bg-gold/20 hover:border-gold-ink dark:border-amber-500/40 dark:bg-transparent dark:text-amber-400/80 dark:shadow-[0_0_12px_rgba(245,158,11,0.15)] dark:hover:border-amber-400 dark:hover:text-amber-300 dark:hover:shadow-[0_0_16px_rgba(245,158,11,0.25)]"
                >
                  Next →
                </button>
              ) : bookCategory ? (
                <button
                  onClick={handleReturnToLibrary}
                  className="px-6 py-3 text-sm font-sans font-semibold rounded-lg transition-all cursor-pointer border border-emerald-700/50 bg-emerald-600/10 text-emerald-800 hover:bg-emerald-600/20 hover:border-emerald-700 dark:border-emerald-500/40 dark:bg-transparent dark:text-emerald-400/80 dark:shadow-[0_0_12px_rgba(16,185,129,0.15)] dark:hover:border-emerald-400 dark:hover:text-emerald-300 dark:hover:shadow-[0_0_16px_rgba(16,185,129,0.25)]"
                >
                  Return to Library →
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default rendering for other chapters
  return (
    <div ref={rootRef} data-cursor={cursorVerse ?? ''}>
      <ProgressBar />
      {chapterSpeakers && (
        <SpeakerLegend
          heading={`${bookLabel} ${actualChapter}`}
          detail={`${verses.length} verses`}
          speakers={chapterSpeakers.speakers}
        />
      )}
      <div className="px-6 sm:px-10 md:px-16">
        <div className="font-serif text-ink text-[21px] leading-[1.95]">
          {verses.map((verse) => (
            <Verse
              key={verse.verse}
              verse={verse}
              isSelected={selectedVerses.has(verse.verse)}
              onToggle={toggleVerse}
              commentary={isAuthenticated ? commentary.get(verse.verse) : undefined}
              showCommentaryGate={!isAuthenticated}
              spans={spansByVerse.get(verse.verse)}
              speakerColors={speakerColors}
              isFirstVerse={verse.verse === 1}
              isHighlighted={litVerse === verse.verse}
              topics={chapterTopics.get(verse.verse)}
              chapter={actualChapter}
              showDefinitions={isProverbs}
              {...highlightProps(verse.verse)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
