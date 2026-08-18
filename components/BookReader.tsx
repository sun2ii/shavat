'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Verse as VerseType } from '@/lib/types';
import Verse from './Verse';
import { loadCommentary, getCommentary } from '@/lib/getCommentary';
import { COPY_FLASH_MS, COPY_GLOW, COPY_GLOW_OFF, COPY_TRANSITION, COPY_UNFOLD_DELAY_MS } from '@/lib/copy-glow';
import ChapterOutline from './ChapterOutline';
import SpeakerLegend from './SpeakerLegend';
import type { Section } from '@/lib/sections';
import type { ChapterSpeakers, QuoteSpan, SpeakerDef } from '@/lib/speaker-quotes';
import { readingPath } from '@/lib/routes';
import { useReadingProgress } from '@/components/providers/ReadingProgressProvider';
import { usePathname } from 'next/navigation';
import ScrollToTop from './ScrollToTop';

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
    router.push(href);
  };

  // Track reading progress when navigating to next chapter
  const handleNextClick = () => {
    if (nextChapter && nextDivisionId && book) {
      markReadAndNavigate(readingPath(book, nextDivisionId, nextChapter));
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

  // Each fold's legend lists only the characters speaking inside it.
  const sectionSpeakers = (range: [number, number]): Record<string, SpeakerDef> => {
    const result: Record<string, SpeakerDef> = {};
    if (chapterSpeakers) {
      for (const span of chapterSpeakers.spans) {
        if (span.verse >= range[0] && span.verse <= range[1]) {
          const def = chapterSpeakers.speakers[span.speaker];
          if (def) result[span.speaker] = def;
        }
      }
    }
    return result;
  };

  // On mount, restore expanded section from URL hash and scroll position from sessionStorage
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove #
    if (hash && sections) {
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
  }, [actualBook, actualChapter]);

  /*
    SIMPLE by design, after much pain: the section opens instantly (no height
    animation — see CollapsibleVerses), then ONE instant scroll puts the card
    at the top. Crucially we scroll the card the user actually touched:
    the app shell renders the page twice (desktop + mobile layout branches),
    so document.getElementById can return the HIDDEN twin — the root cause of
    every "lands anywhere but the top" bug. closest() walks up from the real
    tapped element, so it can only find the visible copy.
  */
  const toggleSection = (sectionName: string, origin?: HTMLElement | null) => {
    const newSection = expandedSection === sectionName ? null : sectionName;
    setExpandedSection(newSection);
    if (newSection) {
      const id = slugify(newSection);
      window.history.replaceState(null, '', `#${id}`);
      const card =
        origin?.closest<HTMLElement>(`[id="${id}"]`) ?? document.getElementById(id);
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

  const toggleVerse = (verseNum: number) => {
    setSelectedVerses(prev => {
      const next = new Set(prev);
      if (next.has(verseNum)) {
        next.delete(verseNum);
      } else {
        next.add(verseNum);
      }
      return next;
    });
  };

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
      <div className="px-6 sm:px-10 md:px-16">
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
                onClick={isCollapsed ? (e) => toggleSection(daySection.title, e.currentTarget) : undefined}
                className={`scroll-mt-16 py-3 md:py-4 ${
                  isCollapsed ? 'cursor-pointer' : ''
                }`}
              >
                {/* Header: title centered, verse range on right */}
                <div
                  id={`${sectionId}-header`}
                  className="relative flex items-start justify-center"
                >
                  {/* Center: Title + speakers - clicking anywhere here copies + opens */}
                  <div
                    className="flex flex-col gap-1 cursor-pointer items-center text-center w-full"
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
                          () => toggleSection(daySection.title, origin),
                          COPY_UNFOLD_DELAY_MS
                        );
                      } else {
                        toggleSection(daySection.title, origin);
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
                      toggleSection(daySection.title, e.currentTarget);
                    }}
                    aria-expanded={!isCollapsed}
                    aria-controls={`${sectionId}-verses`}
                    className={`absolute right-0 top-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full flex-shrink-0 min-w-[90px] justify-center transition-all duration-150 cursor-pointer ${
                      !isCollapsed
                        ? 'bg-gradient-to-b from-emerald-500 via-emerald-600 to-emerald-700 text-white shadow-[0_2px_4px_rgba(0,0,0,0.2),0_4px_8px_rgba(16,185,129,0.25),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:shadow-[0_3px_6px_rgba(0,0,0,0.25),0_6px_12px_rgba(16,185,129,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:from-emerald-400 hover:via-emerald-500 hover:to-emerald-600 active:shadow-[0_1px_2px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(0,0,0,0.1)] active:translate-y-[1px]'
                        : isNextSection
                        ? 'bg-emerald-900/30 text-emerald-200/70 shadow-[0_2px_4px_rgba(0,0,0,0.15)] hover:bg-emerald-800/40 active:translate-y-[1px]'
                        : 'bg-gradient-to-b from-stone-500 via-stone-600 to-stone-700 text-stone-100 shadow-[0_2px_4px_rgba(0,0,0,0.2),0_4px_8px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.1)] hover:shadow-[0_3px_6px_rgba(0,0,0,0.25),0_6px_12px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.15)] hover:from-stone-400 hover:via-stone-500 hover:to-stone-600 active:shadow-[0_1px_2px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(0,0,0,0.1)] active:translate-y-[1px]'
                    }`}
                  >
                    <span className="font-sans text-[11px] font-semibold tabular-nums [text-shadow:0_1px_2px_rgba(0,0,0,0.3)]">
                      {actualChapter}:{daySection.verseRange[0]}–{daySection.verseRange[1]}
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
                  className="px-6 py-3 text-sm font-sans font-semibold border border-amber-500/40 text-amber-400/80 rounded-lg shadow-[0_0_12px_rgba(245,158,11,0.15)] hover:border-amber-400 hover:text-amber-300 hover:shadow-[0_0_16px_rgba(245,158,11,0.25)] transition-all cursor-pointer"
                >
                  Next →
                </button>
              ) : bookCategory ? (
                <button
                  onClick={handleReturnToLibrary}
                  className="px-6 py-3 text-sm font-sans font-semibold border border-emerald-500/40 text-emerald-400/80 rounded-lg shadow-[0_0_12px_rgba(16,185,129,0.15)] hover:border-emerald-400 hover:text-emerald-300 hover:shadow-[0_0_16px_rgba(16,185,129,0.25)] transition-all cursor-pointer"
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
    <div>
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
            />
          ))}
        </div>
      </div>
    </div>
  );
}
