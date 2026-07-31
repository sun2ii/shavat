'use client';

import { useState, useEffect, useRef } from 'react';
import { Verse as VerseType } from '@/lib/types';
import Verse from './Verse';
import { loadCommentary, getCommentary } from '@/lib/getCommentary';
import { COPY_FLASH_MS, COPY_GLOW, COPY_GLOW_OFF, COPY_TRANSITION } from '@/lib/copy-glow';
import ChapterOutline from './ChapterOutline';
import type { Section } from '@/lib/sections';

interface Props {
  verses: VerseType[];
  book?: string;
  chapter?: number;
  sections?: Section[];
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

export default function BookReader({ verses, book, chapter, sections }: Props) {
  const [selectedVerses, setSelectedVerses] = useState<Set<number>>(new Set());
  const [commentary, setCommentary] = useState<Map<number, string>>(new Map());
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  // Tracked as the open set, not the closed one: empty means folded, which is
  // the resting state, and needs no knowledge of a chapter's section titles.
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Extract book and chapter from verses if not provided
  const actualBook = book || verses[0]?.book.toLowerCase();
  const actualChapter = chapter || verses[0]?.chapter;

  // Section titles are chapter-scoped, so a chapter change folds everything again.
  useEffect(() => {
    setExpandedSections(new Set());
  }, [actualBook, actualChapter]);

  const toggleSection = (sectionName: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(sectionName)) {
        next.delete(sectionName);
      } else {
        next.add(sectionName);
      }
      return next;
    });
  };

  useEffect(() => {
    if (actualBook && actualChapter) {
      loadCommentary(actualBook, actualChapter).then(() => {
        setCommentary(getCommentary(actualBook, actualChapter));
      });
    }
  }, [actualBook, actualChapter]);

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
      return;
    }
    if (copyTimer.current) clearTimeout(copyTimer.current);
    setCopiedSection(sectionName);
    copyTimer.current = setTimeout(() => setCopiedSection(null), COPY_FLASH_MS);
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

  if (sections && sections.length > 0) {
    return (
      <div className="max-w-[760px] mx-auto">
        <ChapterOutline sections={sections} book={actualBook} chapter={actualChapter} />
        <div className="space-y-4">
          {sections.map((daySection) => {
            const dayVerses = verses.filter(
              (v) => v.verse >= daySection.verseRange[0] && v.verse <= daySection.verseRange[1]
            );
            const sectionId = slugify(daySection.title);
            const isCollapsed = !expandedSections.has(daySection.title);
            return (
              /*
                Folded, the whole card is the target. Open, only the header is —
                otherwise selecting a verse or double-clicking one for its
                commentary would slam the section shut underneath the reader.
              */
              <div
                key={daySection.title}
                id={sectionId}
                onClick={isCollapsed ? () => toggleSection(daySection.title) : undefined}
                className={`rounded-2xl border-l-[3px] px-6 md:px-8 scroll-mt-24 ${
                  isCollapsed ? 'cursor-pointer py-5' : 'py-6 md:py-8'
                } ${daySection.borderColor} ${daySection.color}`}
              >
                <div
                  onClick={() => {
                    // Collapsed, this bubbles to the card, which owns the toggle.
                    if (!isCollapsed) toggleSection(daySection.title);
                  }}
                  className="cursor-pointer"
                >
                  <h3 className={`relative text-center ${isCollapsed ? 'mb-0' : 'mb-4'}`}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopySection(daySection.title, dayVerses);
                      }}
                      title="Copy section"
                      className={`font-sans text-[14px] tracking-[0.16em] uppercase font-bold cursor-pointer text-center rounded outline-none focus-visible:ring-2 focus-visible:ring-gold/60 ${COPY_TRANSITION} ${
                        copiedSection === daySection.title
                          ? `${copyFlashClass(daySection.borderColor)} ${COPY_GLOW}`
                          : `text-gold-ink hover:text-gold ${COPY_GLOW_OFF}`
                      }`}
                    >
                      {daySection.title}
                    </button>
                    {/* The keyboard path, and the sign that the card folds at all. */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSection(daySection.title);
                      }}
                      aria-expanded={!isCollapsed}
                      aria-controls={`${sectionId}-verses`}
                      title={isCollapsed ? 'Expand section' : 'Collapse section'}
                      className="absolute right-0 top-1/2 -translate-y-1/2 p-1 text-faint hover:text-ink transition-colors"
                    >
                      <svg
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`h-4 w-4 transition-transform duration-300 ease-out ${
                          isCollapsed ? '' : 'rotate-180'
                        }`}
                      >
                        <path d="M5 7.5 10 12.5 15 7.5" />
                      </svg>
                    </button>
                  </h3>

                  {isCollapsed && (
                    <p className="mt-2 text-center font-sans text-[11px] tracking-[0.16em] uppercase text-faint">
                      Verses {daySection.verseRange[0]}–{daySection.verseRange[1]}
                    </p>
                  )}
                </div>

                {/* 0fr → 1fr folds to the content's natural height without measuring it. */}
                <div
                  id={`${sectionId}-verses`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isCollapsed ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="font-serif text-ink text-[21px] leading-[1.95]">
                      {dayVerses.map((verse) => (
                        <Verse
                          key={verse.verse}
                          verse={verse}
                          isSelected={selectedVerses.has(verse.verse)}
                          onToggle={toggleVerse}
                          commentary={commentary.get(verse.verse)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Default rendering for other chapters
  return (
    <div className="max-w-[760px] mx-auto">
      <div className="font-serif text-ink text-[21px] leading-[1.95]">
        {verses.map((verse) => (
          <Verse
            key={verse.verse}
            verse={verse}
            isSelected={selectedVerses.has(verse.verse)}
            onToggle={toggleVerse}
            commentary={commentary.get(verse.verse)}
          />
        ))}
      </div>
    </div>
  );
}
