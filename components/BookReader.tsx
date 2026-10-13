'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Verse as VerseType, Highlight, HighlightColor } from '@/lib/types';
import { useHighlights } from '@/components/providers/HighlightProvider';
import { loadingBus } from '@/lib/loading-bus';
import { FIRST_VERSE_HASH, LAST_VERSE_HASH, VERSE_HASH_RE } from '@/lib/reader-keys';
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
import { useKeyboardNav } from '@/components/KeyboardNav';
import { usePathname } from 'next/navigation';
import ScrollToTop from './ScrollToTop';
import { getChapterTopics } from '@/lib/getProverbsTopics';
import type { ProverbsTopic } from '@/lib/proverbs-topics';
import { useReadingPreferences, LINE_HEIGHT_MAP } from '@/components/providers/ReadingPreferencesProvider';

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
  /** Custom href for next chapter navigation (overrides division-based routing) */
  nextHref?: string | null;
  /** Custom href for prev chapter navigation (overrides division-based routing) */
  prevHref?: string | null;
  bookCategory?: string;
  isAuthenticated?: boolean;
  /** Initial verse/paragraph to highlight with purple cursor */
  initialCursor?: number;
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
  fontSize,
  lineHeight,
}: {
  id: string;
  isCollapsed: boolean;
  children: React.ReactNode;
  fontSize: number;
  lineHeight: number;
}) {
  return (
    <div id={id} className="overflow-x-visible overflow-y-hidden" style={{ height: isCollapsed ? 0 : 'auto' }}>
      <div
        className={`font-serif text-ink ${
          isCollapsed ? 'opacity-0' : 'opacity-100 transition-opacity duration-1000 ease-out'
        }`}
        style={{ fontSize: `${fontSize}px`, lineHeight }}
      >
        {children}
      </div>
    </div>
  );
}

export default function BookReader({ verses, book, chapter, sections, chapterSpeakers, prevChapter, nextChapter, prevDivisionId, nextDivisionId, nextHref, prevHref, bookCategory, isAuthenticated = false, initialCursor }: Props) {
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
  // Also used for initialCursor prop to highlight first paragraph on load
  const [autoHighlightedVerse, setAutoHighlightedVerse] = useState<number | null>(initialCursor ?? null);
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

  // Compute full navigation hrefs (for readings these are passed in, for Bible we compute them)
  const computedNextHref = nextHref || (nextChapter && nextDivisionId && book
    ? readingPath(book, nextDivisionId, nextChapter) + FIRST_VERSE_HASH
    : null);
  const computedPrevHref = prevHref || (prevChapter && prevDivisionId && book
    ? readingPath(book, prevDivisionId, prevChapter)
    : null);

  // Toast states for keyboard shortcuts
  const [showBookmarkToast, setShowBookmarkToast] = useState(false);
  const [showCompleteToast, setShowCompleteToast] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  // Centralized keyboard navigation hook
  const {
    isVim,
    canGoNext,
    canGoPrev,
    handleNext,
    handlePrev,
    handleBookmark,
    handleToggleComplete,
  } = useKeyboardNav({
    book: book || '',
    chapter: chapter || 0,
    prevHref: computedPrevHref,
    nextHref: computedNextHref,
    isAuthenticated,
    onBookmarkAdded: () => {
      setShowBookmarkToast(true);
      setTimeout(() => setShowBookmarkToast(false), 1500);
    },
    onMarkedComplete: () => {
      setShowCompleteToast(true);
      setTimeout(() => setShowCompleteToast(false), 1500);
    },
  });

  // Reading preferences (font size, line spacing)
  const { preferences, setKeyboardStyle } = useReadingPreferences();
  const fontSize = preferences.fontSize;
  const lineHeight = LINE_HEIGHT_MAP[preferences.lineSpacing];

  const toggleKeyboardStyle = () => {
    setKeyboardStyle(isVim ? 'standard' : 'vim');
  };

  // Get markChapterComplete for return to library
  const { markChapterComplete } = useReadingProgress();

  // Track reading progress when returning to library
  const handleReturnToLibrary = () => {
    if (bookCategory) {
      if (isAuthenticated && book && chapter) {
        markChapterComplete(book, chapter);
        fetch('/api/reading-progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ book, chapter }),
        }).catch(err => console.error('Failed to save reading progress:', err));
      }
      loadingBus.start();
      router.push(`/library/${bookCategory}`);
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

  // Armed by keyboard steps and hash arrivals; consumed by the follow-scroll
  // effect below. Taps never arm it, so on a phone the page stays put.
  const scrollOnCursorChange = useRef(false);

  // On mount, restore expanded section from URL hash and scroll position from sessionStorage
  // Also handle verse-specific hashes like #v7
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove #
    if (!hash) return;

    // Check for verse hash pattern: v{number}, or vlast (arriving from the
    // next chapter by pressing ↑ on its first verse).
    const verseMatch = hash.match(/^v(\d+|last)$/);
    if (verseMatch) {
      const verseNum = verseMatch[1] === 'last'
        ? Math.max(...verses.map((v) => v.verse))
        : parseInt(verseMatch[1], 10);
      if (!Number.isFinite(verseNum)) return;
      // Find the section containing this verse and expand it
      if (sections) {
        const matchingSection = sections.find(
          s => verseNum >= s.verseRange[0] && verseNum <= s.verseRange[1]
        );
        if (matchingSection) {
          setExpandedSection(matchingSection.title);
        }
      }
      // Put the reading cursor on it and arm the follow-scroll, so arriving
      // on #vlast from the next chapter shows the final verse instead of the
      // chapter top. The scroll runs within this instance's own DOM, so the
      // hidden twin can't win.
      scrollOnCursorChange.current = true;
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
  }, [sections, pathname, verses]);

  // Section titles are chapter-scoped, so a chapter change folds everything again.
  useEffect(() => {
    // Only reset if no hash present
    if (!window.location.hash) {
      setExpandedSection(null);
    }
    // Per-chapter interaction state is cleared by hand. The cursor is kept
    // when the URL names a verse (#v12): the hash effect above just set it.
    if (!VERSE_HASH_RE.test(window.location.hash)) setCursorVerse(null);
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
  // Track whether cursor change came from tap (no scroll) vs keyboard (scroll)
  // Exactly one verse is ever purple: the keyboard cursor when there is one,
  // otherwise the first verse of a section just opened by mouse.
  const litVerse = cursorVerse ?? autoHighlightedVerse;

  // toggleSection tints the section's first verse; re-clear after it so the
  // cursor stays the only highlighted verse.
  const openSection = (title: string, firstVerse: number) => {
    toggleSection(title, rootRef.current, firstVerse);
    setAutoHighlightedVerse(null);
  };

  // ↑ before the first verse: previous chapter, landing on ITS last verse.
  // handlePrev() (← key, Previous button) deliberately lands at the top; this
  // is the keyboard-reading path, which must continue the text backwards.
  const goPrevLastVerse = () => {
    if (!computedPrevHref) return;
    const base = computedPrevHref.split('#')[0];
    loadingBus.start();
    router.push(base + LAST_VERSE_HASH);
  };

  const stepCursor = (dir: 1 | -1) => {
    const nums = verses.map((v) => v.verse).sort((a, b) => a - b);
    if (nums.length === 0) return;
    // The cursor is the only purple verse while the keyboard drives; drop the
    // "first verse of the opened section" tint (toggleSection sets it, and a
    // later setState in the same tick wins).
    setAutoHighlightedVerse(null);
    // Keyboard navigation should scroll to keep cursor in view
    scrollOnCursorChange.current = true;

    if (!sections || sections.length === 0) {
      const i = cursorVerse === null ? (dir > 0 ? 0 : nums.length - 1) : nums.indexOf(cursorVerse) + dir;
      if (i >= 0 && i < nums.length) setCursorVerse(nums[i]);
      else if (dir > 0 && canGoNext) handleNext();
      else if (dir < 0) goPrevLastVerse();
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
    if (dir > 0 && canGoNext) handleNext();
    else if (dir < 0) goPrevLastVerse();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Escape closes the toolbar or shortcuts panel
      if (e.key === 'Escape') {
        if (showShortcuts) {
          e.preventDefault();
          setShowShortcuts(false);
          return;
        }
        if (toolbarVerse !== null) {
          e.preventDefault();
          (document.activeElement as HTMLElement | null)?.blur?.();
          closeToolbar();
          return;
        }
      }

      const t = e.target as HTMLElement | null;
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t?.isContentEditable) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      // Show keyboard shortcuts (works in both modes)
      if (e.key === '/') {
        e.preventDefault();
        setShowShortcuts(s => !s);
        return;
      }

      if (isVim) {
        // Vim mode: j/k = verse nav, h/l = chapter nav, i = highlight, o = bookmark, p = mark read
        if (e.key === 'j') {
          e.preventDefault();
          stepCursor(1);
        } else if (e.key === 'k') {
          e.preventDefault();
          stepCursor(-1);
        } else if (e.key === 'h' && canGoPrev) {
          e.preventDefault();
          handlePrev();
        } else if (e.key === 'l' && canGoNext) {
          e.preventDefault();
          handleNext();
        } else if (e.key === 'i' && cursorVerse !== null) {
          e.preventDefault();
          if (toolbarVerse === cursorVerse) {
            closeToolbar();
          } else {
            setSelectedVerses(new Set([cursorVerse]));
            setToolbarVerse(cursorVerse);
          }
        } else if (e.key === 'o') {
          e.preventDefault();
          handleBookmark();
        } else if (e.key === 'p' && isAuthenticated) {
          e.preventDefault();
          handleToggleComplete();
        }
      } else {
        // Standard mode: arrow keys for nav
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          stepCursor(1);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          stepCursor(-1);
        } else if (e.key === 'ArrowLeft' && canGoPrev) {
          e.preventDefault();
          handlePrev();
        } else if (e.key === 'ArrowRight' && canGoNext) {
          e.preventDefault();
          handleNext();
        } else if (e.key === 'Enter' && cursorVerse !== null && toolbarVerse === null) {
          e.preventDefault();
          toggleVerse(cursorVerse);
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  // Keep the cursor verse in view. Delayed a beat so a section's own
  // scroll-to-top (toggleSection) settles first.
  // Only scroll for keyboard navigation, not tap (mobile UX: tap shouldn't move page).
  // Position verse ~20% from top of viewport for comfortable reading position.
  useEffect(() => {
    if (cursorVerse === null) return;
    if (!scrollOnCursorChange.current) return;
    scrollOnCursorChange.current = false;
    const id = setTimeout(() => {
      const el = rootRef.current?.querySelector<HTMLElement>(`[data-verse="${cursorVerse}"]`);
      if (!el) return;
      // The reader does not scroll the window: on desktop the app shell's
      // <main> is the scroll container, in the native shell too. Find the
      // nearest scrollable ancestor and move THAT, falling back to the window.
      let scroller: HTMLElement | null = el.parentElement;
      while (scroller && scroller !== document.body) {
        const { overflowY } = getComputedStyle(scroller);
        if ((overflowY === 'auto' || overflowY === 'scroll') && scroller.scrollHeight > scroller.clientHeight) break;
        scroller = scroller.parentElement;
      }
      const rect = el.getBoundingClientRect();
      if (scroller && scroller !== document.body) {
        const top = scroller.getBoundingClientRect().top;
        const target = scroller.scrollTop + (rect.top - top) - scroller.clientHeight * 0.2; // 20% from top
        scroller.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
      } else {
        const target = window.scrollY + rect.top - window.innerHeight * 0.2;
        window.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
      }
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
    // Clicking a section teleports the keyboard cursor there, so up/down
    // arrows continue from this position rather than forcing 40 presses.
    if (newSection && firstVerse) {
      setCursorVerse(firstVerse);
    }
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

  // Single tap sets the purple cursor (for phone navigation)
  // A tap (any device) paints the verse purple by making it the cursor.
  // It never scrolls: the follow-scroll effect only fires for keyboard moves
  // (scrollOnCursorChange), so on a phone the page stays exactly where it is.
  const handleTapVerse = (verseNum: number) => {
    setAutoHighlightedVerse(null);
    setCursorVerse(verseNum);
  };

  // Double tap opens the highlight toolbar
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

  const handleSaveHighlight = (color: HighlightColor, note: string) => {
    if (!actualBook || !actualChapter || !selectionRange) return;
    // If no note provided, use the verse text as the note (prefixed with [v] marker)
    let finalNote = note.trim();
    if (!finalNote) {
      const verseTexts = verses
        .filter(v => v.verse >= selectionRange.start && v.verse <= selectionRange.end)
        .map(v => v.text);
      finalNote = '[v]' + verseTexts.join(' ');
    }
    // Close toolbar immediately (optimistic), SQL syncs in background
    closeToolbar();
    void saveHighlight({
      book: actualBook,
      chapter: actualChapter,
      verseStart: selectionRange.start,
      verseEnd: selectionRange.end,
      color,
      note: finalNote || undefined,
    });
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

  // Toast notifications and keyboard shortcuts overlay
  const Toasts = () => (
    <>
      {showBookmarkToast && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
          <div className="bg-surface/95 backdrop-blur-sm border border-gold/30 rounded-xl px-6 py-4 shadow-xl animate-[fade-in_0.15s_ease-out]">
            <div className="flex items-center gap-3">
              <span className="text-2xl text-gold">★</span>
              <span className="font-sans text-sm font-medium text-ink">Bookmarked</span>
            </div>
          </div>
        </div>
      )}
      {showCompleteToast && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50">
          <div className="bg-surface/95 backdrop-blur-sm border border-emerald-500/30 rounded-xl px-6 py-4 shadow-xl animate-[fade-in_0.15s_ease-out]">
            <div className="flex items-center gap-3">
              <span className="text-2xl text-emerald-500">✓</span>
              <span className="font-sans text-sm font-medium text-ink">Marked as read</span>
            </div>
          </div>
        </div>
      )}
      {showShortcuts && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowShortcuts(false)}
        >
          <div
            className="bg-surface border border-hairline rounded-xl px-8 py-6 shadow-2xl max-w-md"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-6 mb-4">
              <h2 className="font-sans text-lg font-bold text-ink">Keyboard Shortcuts</h2>
              <button
                onClick={toggleKeyboardStyle}
                className="font-sans text-xs text-muted px-2 py-1 bg-muted/10 hover:bg-muted/20 rounded cursor-pointer transition-colors"
              >
                {isVim ? 'Vim' : 'Standard'}
              </button>
            </div>
            <div className="space-y-3 font-sans text-sm">
              {isVim ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted">Move down</span>
                    <kbd className="px-2 py-0.5 bg-muted/10 rounded text-ink font-mono">j</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Move up</span>
                    <kbd className="px-2 py-0.5 bg-muted/10 rounded text-ink font-mono">k</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Previous chapter</span>
                    <kbd className="px-2 py-0.5 bg-muted/10 rounded text-ink font-mono">h</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Next chapter</span>
                    <kbd className="px-2 py-0.5 bg-muted/10 rounded text-ink font-mono">l</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Highlight verse</span>
                    <kbd className="px-2 py-0.5 bg-muted/10 rounded text-ink font-mono">i</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Toggle bookmark</span>
                    <kbd className="px-2 py-0.5 bg-muted/10 rounded text-ink font-mono">o</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Mark as read</span>
                    <kbd className="px-2 py-0.5 bg-muted/10 rounded text-ink font-mono">p</kbd>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-muted">Move down</span>
                    <kbd className="px-2 py-0.5 bg-muted/10 rounded text-ink font-mono">↓</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Move up</span>
                    <kbd className="px-2 py-0.5 bg-muted/10 rounded text-ink font-mono">↑</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Previous chapter</span>
                    <kbd className="px-2 py-0.5 bg-muted/10 rounded text-ink font-mono">←</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Next chapter</span>
                    <kbd className="px-2 py-0.5 bg-muted/10 rounded text-ink font-mono">→</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Select verse</span>
                    <kbd className="px-2 py-0.5 bg-muted/10 rounded text-ink font-mono">Enter</kbd>
                  </div>
                </>
              )}
              <div className="pt-2 border-t border-hairline">
                <div className="flex justify-between">
                  <span className="text-muted">Close / Dismiss</span>
                  <kbd className="px-2 py-0.5 bg-muted/10 rounded text-ink font-mono">Esc</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
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
            // "Where I am": the section holding the cursor verse; failing that the
            // open section; failing that the first. The count pills are a ladder
            // measured from here:
            //   behind me → its own length as a minus   (-9: already passed)
            //   where I am → its own length as a plus    (+5: this section)
            //   ahead     → running total from the END of my section
            //               (+3, +8, +14 ...: what is still to come after this one)
            const hereIndex = (() => {
              const byCursor = litVerse != null
                ? sections.findIndex(s => litVerse >= s.verseRange[0] && litVerse <= s.verseRange[1])
                : -1;
              if (byCursor !== -1) return byCursor;
              return expandedIndex !== -1 ? expandedIndex : 0;
            })();
            const ownLength = daySection.verseRange[1] - daySection.verseRange[0] + 1;
            const pillLabel = sectionIndex < hereIndex
              ? `-${ownLength}`
              : sectionIndex === hereIndex
              ? `+${ownLength}`
              : `+${daySection.verseRange[1] - sections[hereIndex].verseRange[1]}`;
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

                  {/* Right: Verse number + pill + chevron */}
                  <div className="absolute right-0 top-0 flex items-center gap-2">
                    <span className="font-sans text-[11px] font-medium tabular-nums text-muted">
                      {/* "v17 +7": the section starts at verse 17 and holds 7 more. */}
                      v{daySection.verseRange[0]}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSection(daySection.title, e.currentTarget, daySection.verseRange[0]);
                      }}
                      aria-expanded={!isCollapsed}
                      aria-controls={`${sectionId}-verses`}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-full flex-shrink-0 min-w-[50px] justify-center transition-all duration-150 cursor-pointer ${
                        !isCollapsed
                          ? 'bg-gradient-to-b from-emerald-500 via-emerald-600 to-emerald-700 text-white shadow-[0_2px_4px_rgba(0,0,0,0.2),0_4px_8px_rgba(16,185,129,0.25),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:shadow-[0_3px_6px_rgba(0,0,0,0.25),0_6px_12px_rgba(16,185,129,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:from-emerald-400 hover:via-emerald-500 hover:to-emerald-600 active:shadow-[0_1px_2px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(0,0,0,0.1)] active:translate-y-[1px]'
                          : isNextSection
                          ? 'bg-emerald-900/30 text-emerald-200/70 shadow-[0_2px_4px_rgba(0,0,0,0.15)] hover:bg-emerald-800/40 active:translate-y-[1px]'
                          : 'bg-gradient-to-b from-stone-500 via-stone-600 to-stone-700 text-stone-100 shadow-[0_2px_4px_rgba(0,0,0,0.2),0_4px_8px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:shadow-[0_3px_6px_rgba(0,0,0,0.25),0_6px_12px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:from-stone-400 hover:via-stone-500 hover:to-stone-600 active:shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(0,0,0,0.1)] active:translate-y-[1px]'
                      }`}
                    >
                      <span className="font-sans text-[11px] font-semibold tabular-nums [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                        {pillLabel}
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
                </div>

                {/* Verses (collapsible) */}
                <CollapsibleVerses
                  id={`${sectionId}-verses`}
                  isCollapsed={isCollapsed}
                  fontSize={fontSize}
                  lineHeight={lineHeight}
                >
                  <div className="mt-6">
                    {dayVerses.map((verse) => (
                      <Verse
                        key={verse.verse}
                        verse={verse}
                        isSelected={selectedVerses.has(verse.verse)}
                        onToggle={toggleVerse}
                        onTap={handleTapVerse}
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
        {(prevChapter || nextChapter || prevHref || nextHref || bookCategory) && (
          <div className="py-6 md:py-8 border-t border-hairline">
            {/* Prev / Next */}
            <div className="flex justify-between items-center">
              {prevHref ? (
                <Link
                  href={prevHref}
                  className="px-6 py-3 text-sm font-sans font-semibold border border-hairline rounded-lg hover:border-gold hover:text-gold transition-colors"
                >
                  ← Previous
                </Link>
              ) : prevChapter && prevDivisionId && book ? (
                <Link
                  href={readingPath(book, prevDivisionId, prevChapter)}
                  className="px-6 py-3 text-sm font-sans font-semibold border border-hairline rounded-lg hover:border-gold hover:text-gold transition-colors"
                >
                  ← Previous
                </Link>
              ) : (
                <div />
              )}
              {canGoNext ? (
                <button
                  onClick={handleNext}
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
        <Toasts />
      </div>
    );
  }

  // Default rendering for other chapters
  return (
    <div ref={rootRef} data-cursor={cursorVerse ?? ''}>
      <ProgressBar />
      <Toasts />
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
              onTap={handleTapVerse}
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

        {/* Navigation buttons */}
        {(prevHref || nextHref || canGoNext) && (
          <div className="py-6 md:py-8 border-t border-hairline mt-8">
            <div className="flex justify-between items-center">
              {prevHref ? (
                <Link
                  href={prevHref}
                  className="px-6 py-3 text-sm font-sans font-semibold border border-hairline rounded-lg hover:border-gold hover:text-gold transition-colors"
                >
                  ← Previous
                </Link>
              ) : (
                <div />
              )}
              {canGoNext ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-3 text-sm font-sans font-semibold rounded-lg transition-all cursor-pointer border border-gold-ink/60 bg-gold/10 text-gold-ink hover:bg-gold/20 hover:border-gold-ink dark:border-amber-500/40 dark:bg-transparent dark:text-amber-400/80 dark:shadow-[0_0_12px_rgba(245,158,11,0.15)] dark:hover:border-amber-400 dark:hover:text-amber-300 dark:hover:shadow-[0_0_16px_rgba(245,158,11,0.25)]"
                >
                  Next →
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
