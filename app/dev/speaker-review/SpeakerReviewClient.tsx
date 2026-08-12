'use client';

import { useEffect, useState, useCallback } from 'react';
import type {
  AuditReport,
  VerseAudit,
  VerseReview,
  ReviewStatus,
  Classification,
  Segment,
} from '@/lib/speaker-review-types';
import {
  REASON_LABELS,
  CLASSIFICATION_STYLES,
} from '@/lib/speaker-review-types';

type ViewMode = 'simple' | 'expert';
type FilterMode = 'all' | 'review-queue' | 'rejected' | Classification | ReviewStatus;

interface SpeakerDef {
  name: string;
  color: number;
}

export default function SpeakerReviewClient() {
  const [books, setBooks] = useState<string[]>([]);
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [report, setReport] = useState<AuditReport | null>(null);
  const [speakers, setSpeakers] = useState<Record<string, SpeakerDef>>({});
  const [reviews, setReviews] = useState<Record<string, VerseReview>>({});
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>('simple');
  const [filter, setFilter] = useState<FilterMode>('review-queue');
  const [fixMode, setFixMode] = useState(false);
  const [fixSegments, setFixSegments] = useState<Segment[]>([]);
  const [showDetails, setShowDetails] = useState(false);
  const [showContext, setShowContext] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  // Check localStorage for intro dismissal
  useEffect(() => {
    const dismissed = localStorage.getItem('speaker-review-intro-dismissed');
    if (dismissed === 'true') {
      setShowIntro(false);
    }
  }, []);

  // Load available books
  useEffect(() => {
    fetch('/api/speaker-review')
      .then((r) => r.json())
      .then((data) => {
        setBooks(data.books || []);
        if (data.books?.length > 0 && !selectedBook) {
          setSelectedBook(data.books[0]);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Load book data when selection changes
  useEffect(() => {
    if (!selectedBook) return;
    setLoading(true);
    fetch(`/api/speaker-review?book=${selectedBook}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.report) {
          setReport(data.report);
          setSpeakers(data.speakers || {});
          setReviews(data.reviews || {});
          setCurrentIndex(0);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedBook]);

  // Filter verses based on current filter and mode
  const filteredVerses = report?.verses.filter((v) => {
    const key = `${v.chapter}:${v.verse}`;
    const review = reviews[key];
    const status = review?.status || 'unreviewed';

    // Simple mode: only show unreviewed verses
    if (viewMode === 'simple') {
      return status === 'unreviewed';
    }

    // Expert mode: full filter support
    switch (filter) {
      case 'all':
        return true;
      case 'review-queue':
        // Expert queue: unreviewed OR rejected (needs fixing)
        return status === 'unreviewed' || status === 'rejected';
      case 'rejected':
        return status === 'rejected';
      case 'GREEN':
      case 'YELLOW':
      case 'RED':
      case 'BROKEN':
        return v.classification === filter;
      case 'approved':
      case 'rejected':
      case 'unsure':
      case 'unreviewed':
        return status === filter;
      default:
        return true;
    }
  }) || [];

  const currentVerse = filteredVerses[currentIndex];

  // Navigation
  const goNext = useCallback(() => {
    if (currentIndex < filteredVerses.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setFixMode(false);
      setShowContext(false);
    }
  }, [currentIndex, filteredVerses.length]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setFixMode(false);
      setShowContext(false);
    }
  }, [currentIndex]);

  // Review actions
  const saveReview = useCallback(
    async (status: ReviewStatus, proposedSegments?: Segment[]) => {
      if (!currentVerse || !selectedBook) return;

      const review: VerseReview = {
        status,
        reviewedAt: new Date().toISOString(),
        classificationAtReview: currentVerse.classification,
        ...(proposedSegments && { proposedSegments }),
      };

      // Optimistic update
      const key = `${currentVerse.chapter}:${currentVerse.verse}`;
      setReviews((prev) => ({ ...prev, [key]: review }));

      // Save to server
      await fetch('/api/speaker-review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          book: selectedBook,
          chapter: currentVerse.chapter,
          verse: currentVerse.verse,
          review,
        }),
      });

      // Auto-advance for all actions in simple mode
      if (viewMode === 'simple') {
        goNext();
      } else if (status === 'approved' || status === 'unsure') {
        goNext();
      }
    },
    [currentVerse, selectedBook, goNext, viewMode]
  );

  // Simple mode actions
  const handleYes = useCallback(() => saveReview('approved'), [saveReview]);
  const handleNo = useCallback(() => saveReview('rejected'), [saveReview]);
  const handleNotSure = useCallback(() => saveReview('unsure'), [saveReview]);

  // Expert mode actions
  const handleApprove = useCallback(() => saveReview('approved'), [saveReview]);
  const handleReject = useCallback(() => saveReview('rejected'), [saveReview]);
  const handleUnsure = useCallback(() => saveReview('unsure'), [saveReview]);
  const handleFix = useCallback(() => {
    if (currentVerse) {
      setFixSegments([...currentVerse.currentSegments]);
      setFixMode(true);
    }
  }, [currentVerse]);

  const handleSaveFix = useCallback(() => {
    saveReview('approved', fixSegments);
    setFixMode(false);
    goNext();
  }, [saveReview, fixSegments, goNext]);

  const handleCancelFix = useCallback(() => {
    setFixMode(false);
  }, []);

  const dismissIntro = useCallback(() => {
    setShowIntro(false);
    localStorage.setItem('speaker-review-intro-dismissed', 'true');
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return;
      }

      if (fixMode) {
        if (e.key === 'Escape') {
          handleCancelFix();
        }
        return;
      }

      if (showIntro) return;

      const key = e.key.toLowerCase();

      if (viewMode === 'simple') {
        // Simple mode: Y/N/U
        switch (key) {
          case 'y':
            e.preventDefault();
            handleYes();
            break;
          case 'n':
            e.preventDefault();
            handleNo();
            break;
          case 'u':
            e.preventDefault();
            handleNotSure();
            break;
          case 'arrowright':
            e.preventDefault();
            goNext();
            break;
          case 'arrowleft':
            e.preventDefault();
            goPrev();
            break;
          case 'c':
            e.preventDefault();
            setShowContext((c) => !c);
            break;
        }
      } else {
        // Expert mode: A/R/F/U
        switch (key) {
          case 'a':
            e.preventDefault();
            handleApprove();
            break;
          case 'r':
            e.preventDefault();
            handleReject();
            break;
          case 'f':
            e.preventDefault();
            handleFix();
            break;
          case 'u':
            e.preventDefault();
            handleUnsure();
            break;
          case 'arrowright':
          case 'j':
            e.preventDefault();
            goNext();
            break;
          case 'arrowleft':
          case 'k':
            e.preventDefault();
            goPrev();
            break;
          case 'd':
            e.preventDefault();
            setShowDetails((d) => !d);
            break;
          case 'c':
            e.preventDefault();
            setShowContext((c) => !c);
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    fixMode,
    showIntro,
    viewMode,
    handleYes,
    handleNo,
    handleNotSure,
    handleApprove,
    handleReject,
    handleFix,
    handleUnsure,
    goNext,
    goPrev,
    handleCancelFix,
  ]);

  // Progress stats
  const stats = {
    total: report?.summary.annotatedVerses || 0,
    approved: Object.values(reviews).filter((r) => r.status === 'approved').length,
    rejected: Object.values(reviews).filter((r) => r.status === 'rejected').length,
    unsure: Object.values(reviews).filter((r) => r.status === 'unsure').length,
    reviewed: Object.keys(reviews).length,
  };

  if (loading && !report) {
    return (
      <div className="min-h-screen bg-[rgb(var(--bg-primary))] flex items-center justify-center">
        <span className="font-sans text-sm text-muted">Loading...</span>
      </div>
    );
  }

  // First-time intro screen
  if (showIntro && viewMode === 'simple') {
    return (
      <div className="min-h-screen bg-[rgb(var(--bg-primary))] flex items-center justify-center p-6">
        <div className="max-w-md text-center space-y-6">
          <h1 className="font-sans text-2xl font-bold text-[rgb(var(--text-primary))]">
            Check the voices
          </h1>
          <p className="font-serif text-lg text-[rgb(var(--text-secondary))] leading-relaxed">
            Shavat uses color to show who is speaking. Read each verse and check
            whether the highlighted words belong to the speaker shown.
          </p>
          <button
            onClick={dismissIntro}
            className="font-sans text-sm font-semibold px-8 py-3 bg-[rgb(var(--gold))] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Start
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[rgb(var(--bg-primary))] text-[rgb(var(--text-primary))]">
      {/* Header - minimal in simple mode */}
      <header className="sticky top-0 z-40 border-b border-hairline bg-[rgb(var(--bg-primary))]/95 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {viewMode === 'expert' && (
                <select
                  value={selectedBook}
                  onChange={(e) => setSelectedBook(e.target.value)}
                  className="font-sans text-sm bg-[rgb(var(--surface))] border border-hairline rounded px-3 py-1.5 text-[rgb(var(--text-primary))]"
                >
                  {books.map((book) => (
                    <option key={book} value={book}>
                      {book.charAt(0).toUpperCase() + book.slice(1)}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <button
              onClick={() => {
                setViewMode(viewMode === 'simple' ? 'expert' : 'simple');
                setCurrentIndex(0);
              }}
              className="font-sans text-[10px] tracking-widest uppercase text-faint hover:text-muted"
            >
              {viewMode === 'simple' ? 'Expert mode' : 'Simple mode'}
            </button>
          </div>

          {/* Expert mode: filters and stats */}
          {viewMode === 'expert' && report && (
            <>
              <div className="mt-3 flex items-center gap-3 text-xs font-sans">
                <span className="text-emerald-600 dark:text-emerald-400">
                  {report.summary.verseCounts.GREEN} Green
                </span>
                <span className="text-amber-600 dark:text-amber-400">
                  {report.summary.verseCounts.YELLOW} Yellow
                </span>
                <span className="text-red-600 dark:text-red-400">
                  {report.summary.verseCounts.RED} Red
                </span>
                <span className="text-rose-600 dark:text-rose-400">
                  {report.summary.verseCounts.BROKEN} Broken
                </span>
                <span className="text-muted">|</span>
                <span className="text-emerald-600 dark:text-emerald-400">
                  {stats.approved} approved
                </span>
                <span className="text-red-600 dark:text-red-400">
                  {stats.rejected} rejected
                </span>
                <span className="text-amber-600 dark:text-amber-400">
                  {stats.unsure} unsure
                </span>
              </div>

              <div className="mt-3 flex items-center gap-2 flex-wrap">
                <span className="font-sans text-[10px] tracking-widest uppercase text-faint">
                  Filter:
                </span>
                {(
                  [
                    ['review-queue', 'Review Queue'],
                    ['rejected', 'Rejected'],
                    ['all', 'All'],
                    ['GREEN', 'Green'],
                    ['YELLOW', 'Yellow'],
                    ['RED', 'Red'],
                    ['BROKEN', 'Broken'],
                    ['unreviewed', 'Unreviewed'],
                    ['approved', 'Approved'],
                    ['unsure', 'Unsure'],
                  ] as [FilterMode, string][]
                ).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setFilter(key);
                      setCurrentIndex(0);
                    }}
                    className={`font-sans text-[10px] tracking-wide uppercase px-2 py-1 rounded transition-colors ${
                      filter === key
                        ? 'bg-gold/20 text-gold-ink font-semibold'
                        : 'text-muted hover:text-[rgb(var(--text-primary))]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-4">
                <div className="flex-1 h-1.5 bg-[rgb(var(--border-subtle))] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all"
                    style={{ width: `${(stats.reviewed / stats.total) * 100}%` }}
                  />
                </div>
                <span className="font-sans text-[10px] text-muted whitespace-nowrap">
                  {stats.reviewed} / {stats.total} reviewed
                </span>
              </div>
            </>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {filteredVerses.length === 0 ? (
          <div className="text-center py-16">
            <span className="font-sans text-sm text-muted">
              {viewMode === 'simple'
                ? 'All verses have been reviewed!'
                : 'No verses match the current filter.'}
            </span>
            {viewMode === 'simple' && stats.rejected > 0 && (
              <p className="mt-4 font-sans text-xs text-faint">
                {stats.rejected} verse{stats.rejected === 1 ? '' : 's'} marked for review.
                <button
                  onClick={() => setViewMode('expert')}
                  className="ml-2 text-gold-ink underline"
                >
                  Open Expert Mode
                </button>
              </p>
            )}
          </div>
        ) : currentVerse ? (
          viewMode === 'simple' ? (
            <SimpleReviewCard
              verse={currentVerse}
              speakers={speakers}
              bookName={selectedBook}
              currentIndex={currentIndex}
              totalCount={filteredVerses.length}
              showContext={showContext}
              onToggleContext={() => setShowContext(!showContext)}
              onYes={handleYes}
              onNo={handleNo}
              onNotSure={handleNotSure}
              onPrev={goPrev}
              onNext={goNext}
              canGoPrev={currentIndex > 0}
              canGoNext={currentIndex < filteredVerses.length - 1}
            />
          ) : (
            <ExpertReviewCard
              verse={currentVerse}
              speakers={speakers}
              bookName={selectedBook}
              review={reviews[`${currentVerse.chapter}:${currentVerse.verse}`]}
              currentIndex={currentIndex}
              totalCount={filteredVerses.length}
              fixMode={fixMode}
              fixSegments={fixSegments}
              setFixSegments={setFixSegments}
              showDetails={showDetails}
              showContext={showContext}
              onToggleDetails={() => setShowDetails(!showDetails)}
              onToggleContext={() => setShowContext(!showContext)}
              onApprove={handleApprove}
              onReject={handleReject}
              onFix={handleFix}
              onUnsure={handleUnsure}
              onSaveFix={handleSaveFix}
              onCancelFix={handleCancelFix}
              onPrev={goPrev}
              onNext={goNext}
              canGoPrev={currentIndex > 0}
              canGoNext={currentIndex < filteredVerses.length - 1}
            />
          )
        ) : null}

        {/* Keyboard hints - subtle */}
        {currentVerse && !fixMode && (
          <div className="mt-6 flex justify-center gap-4 text-[10px] font-sans text-faint">
            {viewMode === 'simple' ? (
              <>
                <span>Y = Yes</span>
                <span>N = No</span>
                <span>U = Not sure</span>
                <span>← → = Navigate</span>
              </>
            ) : (
              <>
                <span>A = Approve</span>
                <span>R = Reject</span>
                <span>F = Fix</span>
                <span>U = Unsure</span>
                <span>← → = Navigate</span>
                <span>D = Details</span>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// =============================================================================
// SIMPLE REVIEW CARD
// =============================================================================

interface SimpleReviewCardProps {
  verse: VerseAudit;
  speakers: Record<string, SpeakerDef>;
  bookName: string;
  currentIndex: number;
  totalCount: number;
  showContext: boolean;
  onToggleContext: () => void;
  onYes: () => void;
  onNo: () => void;
  onNotSure: () => void;
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

function SimpleReviewCard({
  verse,
  speakers,
  bookName,
  currentIndex,
  totalCount,
  showContext,
  onToggleContext,
  onYes,
  onNo,
  onNotSure,
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
}: SimpleReviewCardProps) {
  const speakerColors: Record<string, number> = {};
  for (const [id, def] of Object.entries(speakers)) {
    speakerColors[id] = def.color;
  }

  // Get unique speakers in this verse
  const verseSpeakers = new Set<string>();
  for (const seg of verse.currentSegments) {
    if (seg.type === 'speech' && seg.speaker) {
      verseSpeakers.add(seg.speaker);
    }
  }

  return (
    <div className="flex flex-col items-center">
      {/* Book and verse reference */}
      <div className="text-center mb-8">
        <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-faint mb-1">
          {bookName.charAt(0).toUpperCase() + bookName.slice(1)}
        </h2>
        <span className="font-sans text-2xl font-bold text-gold-ink">
          {verse.chapter}:{verse.verse}
        </span>
        <a
          href={`/${bookName}/${verse.chapter}?verse=${verse.verse}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block mt-1 font-sans text-[10px] text-faint hover:text-muted underline"
        >
          Go to verse
        </a>
      </div>

      {/* Context: Previous verse (on demand) */}
      {showContext && verse.previousVerse && (
        <div className="w-full max-w-2xl mb-4 text-center opacity-40">
          <span className="font-sans text-[10px] text-faint">
            {verse.chapter}:{verse.verse - 1}
          </span>
          <p className="font-serif text-sm text-muted mt-1">
            {verse.previousVerse.slice(0, 250)}
            {verse.previousVerse.length > 250 ? '…' : ''}
          </p>
        </div>
      )}

      {/* THE VERSE - rendered exactly as Shavat would */}
      <div className="w-full max-w-2xl text-center mb-8">
        <p className="font-serif text-xl leading-relaxed">
          {renderVerseWithSpeakers(verse.canonicalText, verse.currentSegments, speakerColors)}
        </p>
      </div>

      {/* Context: Next verse (on demand) */}
      {showContext && verse.nextVerse && (
        <div className="w-full max-w-2xl mb-4 text-center opacity-40">
          <span className="font-sans text-[10px] text-faint">
            {verse.chapter}:{verse.verse + 1}
          </span>
          <p className="font-serif text-sm text-muted mt-1">
            {verse.nextVerse.slice(0, 250)}
            {verse.nextVerse.length > 250 ? '…' : ''}
          </p>
        </div>
      )}

      {/* Speaker legend - simple */}
      {verseSpeakers.size > 0 && (
        <div className="flex justify-center gap-4 mb-8">
          {Array.from(verseSpeakers).map((speakerId) => {
            const speaker = speakers[speakerId];
            if (!speaker) return null;
            return (
              <span
                key={speakerId}
                className="font-sans text-xs font-bold italic"
                style={{ color: `rgb(var(--speaker-${speaker.color}))` }}
              >
                {speaker.name}
              </span>
            );
          })}
        </div>
      )}

      {/* Question */}
      <p className="font-sans text-sm text-muted mb-6">
        Does the highlighting look correct?
      </p>

      {/* Actions */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={onYes}
          className="font-sans text-sm font-semibold px-8 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
        >
          Yes
        </button>
        <button
          onClick={onNo}
          className="font-sans text-sm font-semibold px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          No
        </button>
        <button
          onClick={onNotSure}
          className="font-sans text-sm px-8 py-3 border border-hairline rounded-lg hover:bg-[rgb(var(--bg-secondary))] transition-colors"
        >
          Not sure
        </button>
      </div>

      {/* Progress */}
      <div className="text-center mb-4">
        <span className="font-sans text-sm text-muted">
          {currentIndex + 1} / {totalCount}
        </span>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-8">
        <button
          onClick={onPrev}
          disabled={!canGoPrev}
          className="font-sans text-xs text-muted hover:text-[rgb(var(--text-primary))] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>
        <button
          onClick={onToggleContext}
          className="font-sans text-[10px] text-faint hover:text-muted"
        >
          {showContext ? 'Hide context' : 'Show context'}
        </button>
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className="font-sans text-xs text-muted hover:text-[rgb(var(--text-primary))] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

// =============================================================================
// EXPERT REVIEW CARD
// =============================================================================

interface ExpertReviewCardProps {
  verse: VerseAudit;
  speakers: Record<string, SpeakerDef>;
  bookName: string;
  review?: VerseReview;
  currentIndex: number;
  totalCount: number;
  fixMode: boolean;
  fixSegments: Segment[];
  setFixSegments: (segments: Segment[]) => void;
  showDetails: boolean;
  showContext: boolean;
  onToggleDetails: () => void;
  onToggleContext: () => void;
  onApprove: () => void;
  onReject: () => void;
  onFix: () => void;
  onUnsure: () => void;
  onSaveFix: () => void;
  onCancelFix: () => void;
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
}

function ExpertReviewCard({
  verse,
  speakers,
  bookName,
  review,
  currentIndex,
  totalCount,
  fixMode,
  fixSegments,
  setFixSegments,
  showDetails,
  showContext,
  onToggleDetails,
  onToggleContext,
  onApprove,
  onReject,
  onFix,
  onUnsure,
  onSaveFix,
  onCancelFix,
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
}: ExpertReviewCardProps) {
  const styles = CLASSIFICATION_STYLES[verse.classification];
  const speakerColors: Record<string, number> = {};
  for (const [id, def] of Object.entries(speakers)) {
    speakerColors[id] = def.color;
  }

  return (
    <div className="space-y-4">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onPrev}
          disabled={!canGoPrev}
          className="font-sans text-xs text-muted hover:text-[rgb(var(--text-primary))] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>
        <span className="font-sans text-xs text-muted">
          {currentIndex + 1} of {totalCount}
        </span>
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className="font-sans text-xs text-muted hover:text-[rgb(var(--text-primary))] disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>

      {/* Card */}
      <div className={`border ${styles.border} rounded-lg overflow-hidden bg-[rgb(var(--surface))]`}>
        {/* Header */}
        <div className={`px-6 py-3 ${styles.bg} border-b ${styles.border} flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <span className="font-sans text-xs tracking-widest uppercase font-bold text-gold-ink">
              {bookName.charAt(0).toUpperCase() + bookName.slice(1)} {verse.chapter}:{verse.verse}
            </span>
            <span className={`font-sans text-[10px] tracking-widest uppercase font-bold ${styles.text}`}>
              {verse.classification}
            </span>
          </div>
          {review && (
            <span
              className={`font-sans text-[10px] tracking-widest uppercase px-2 py-0.5 rounded ${
                review.status === 'approved'
                  ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                  : review.status === 'rejected'
                  ? 'bg-red-500/20 text-red-600 dark:text-red-400'
                  : review.status === 'unsure'
                  ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                  : ''
              }`}
            >
              {review.status}
            </span>
          )}
        </div>

        {/* Context: Previous verse */}
        {showContext && verse.previousVerse && (
          <div className="px-6 py-3 border-b border-hairline bg-[rgb(var(--bg-secondary))]/50">
            <span className="font-sans text-[10px] tracking-widest uppercase text-faint block mb-1">
              {verse.chapter}:{verse.verse - 1}
            </span>
            <span className="font-serif text-sm text-muted leading-relaxed">
              {verse.previousVerse.slice(0, 200)}
              {verse.previousVerse.length > 200 ? '…' : ''}
            </span>
          </div>
        )}

        {/* Rendered verse with speaker styling */}
        <div className="px-6 py-5 border-b border-hairline">
          <p className="font-serif text-lg leading-relaxed">
            {renderVerseWithSpeakers(verse.canonicalText, verse.currentSegments, speakerColors)}
          </p>
        </div>

        {/* Context: Next verse */}
        {showContext && verse.nextVerse && (
          <div className="px-6 py-3 border-b border-hairline bg-[rgb(var(--bg-secondary))]/50">
            <span className="font-sans text-[10px] tracking-widest uppercase text-faint block mb-1">
              {verse.chapter}:{verse.verse + 1}
            </span>
            <span className="font-serif text-sm text-muted leading-relaxed">
              {verse.nextVerse.slice(0, 200)}
              {verse.nextVerse.length > 200 ? '…' : ''}
            </span>
          </div>
        )}

        {/* Current attribution breakdown (expert only) */}
        {!fixMode && (
          <div className="px-6 py-4 border-b border-hairline">
            <span className="font-sans text-[10px] tracking-widest uppercase text-faint block mb-3">
              Segments
            </span>
            <div className="space-y-2">
              {verse.currentSegments.map((seg, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className={`font-sans text-[10px] tracking-widest uppercase font-bold w-24 flex-shrink-0 ${
                      seg.type === 'narration' ? 'text-muted' : ''
                    }`}
                    style={
                      seg.type === 'speech' && seg.speaker && speakerColors[seg.speaker]
                        ? { color: `rgb(var(--speaker-${speakerColors[seg.speaker]}))` }
                        : undefined
                    }
                  >
                    {seg.type === 'narration'
                      ? 'Narrator'
                      : speakers[seg.speaker || '']?.name || seg.speaker}
                  </span>
                  <span
                    className={`font-serif text-base leading-relaxed ${
                      seg.type === 'speech' ? 'font-bold italic' : ''
                    }`}
                    style={
                      seg.type === 'speech' && seg.speaker && speakerColors[seg.speaker]
                        ? { color: `rgb(var(--speaker-${speakerColors[seg.speaker]}))` }
                        : undefined
                    }
                  >
                    {seg.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fix mode */}
        {fixMode && (
          <div className="px-6 py-4 border-b border-hairline bg-amber-500/5">
            <span className="font-sans text-[10px] tracking-widest uppercase text-amber-600 dark:text-amber-400 block mb-3">
              Edit Segments
            </span>
            <div className="space-y-3">
              {fixSegments.map((seg, i) => (
                <div key={i} className="flex items-start gap-3">
                  <select
                    value={seg.type === 'narration' ? 'narrator' : seg.speaker || ''}
                    onChange={(e) => {
                      const newSegments = [...fixSegments];
                      if (e.target.value === 'narrator') {
                        newSegments[i] = { type: 'narration', text: seg.text };
                      } else {
                        newSegments[i] = {
                          type: 'speech',
                          speaker: e.target.value,
                          text: seg.text,
                        };
                      }
                      setFixSegments(newSegments);
                    }}
                    className="font-sans text-xs bg-[rgb(var(--surface))] border border-hairline rounded px-2 py-1 w-32 text-[rgb(var(--text-primary))]"
                  >
                    <option value="narrator">Narrator</option>
                    {Object.entries(speakers).map(([id, def]) => (
                      <option key={id} value={id}>
                        {def.name}
                      </option>
                    ))}
                  </select>
                  <span className="font-serif text-sm leading-relaxed flex-1 text-muted">
                    {seg.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              <button
                onClick={onSaveFix}
                className="font-sans text-xs font-semibold px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors"
              >
                Save Fix
              </button>
              <button
                onClick={onCancelFix}
                className="font-sans text-xs px-4 py-2 border border-hairline rounded hover:bg-[rgb(var(--bg-secondary))] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Flagged reasons */}
        <div className="px-6 py-3 border-b border-hairline">
          <span className="font-sans text-[10px] tracking-widest uppercase text-faint block mb-2">
            Flags
          </span>
          <div className="flex flex-wrap gap-2">
            {verse.reasons.map((reason, i) => (
              <span
                key={i}
                className="font-sans text-[10px] px-2 py-1 bg-[rgb(var(--bg-secondary))] rounded text-muted"
              >
                {REASON_LABELS[reason] || reason}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        {!fixMode && (
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex gap-3">
              <button
                onClick={onApprove}
                className="font-sans text-xs font-semibold px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-colors"
              >
                Approve
              </button>
              <button
                onClick={onReject}
                className="font-sans text-xs font-semibold px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Reject
              </button>
              <button
                onClick={onFix}
                className="font-sans text-xs font-semibold px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors"
              >
                Fix
              </button>
              <button
                onClick={onUnsure}
                className="font-sans text-xs px-4 py-2 border border-hairline rounded hover:bg-[rgb(var(--bg-secondary))] transition-colors"
              >
                Unsure
              </button>
            </div>
            <button
              onClick={onToggleContext}
              className="font-sans text-[10px] text-faint hover:text-muted"
            >
              {showContext ? 'Hide context' : 'Show context'}
            </button>
          </div>
        )}

        {/* Details toggle */}
        <div className="px-6 py-2 border-t border-hairline">
          <button
            onClick={onToggleDetails}
            className="font-sans text-[10px] tracking-widest uppercase text-faint hover:text-muted"
          >
            {showDetails ? '▼ Hide Details' : '▶ Show Details'}
          </button>
          {showDetails && (
            <div className="mt-3 p-3 bg-[rgb(var(--bg-secondary))] rounded text-xs font-mono text-muted overflow-x-auto">
              <pre>{JSON.stringify({ verse, speakers: Object.keys(speakers) }, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// HELPER: Render verse with speaker styling
// =============================================================================

function renderVerseWithSpeakers(
  canonicalText: string,
  segments: Segment[],
  speakerColors: Record<string, number>
): React.ReactNode[] {
  // Use the same tokenization logic as the real Shavat reader
  // Build spans from segments
  const spans = segments
    .filter((seg) => seg.type === 'speech' && seg.speaker)
    .map((seg) => ({
      speaker: seg.speaker!,
      quote: seg.text,
    }));

  if (spans.length === 0) {
    return [canonicalText];
  }

  const result: React.ReactNode[] = [];
  let cursor = 0;

  for (const span of spans) {
    let idx = canonicalText.indexOf(span.quote, cursor);
    if (idx === -1) idx = canonicalText.indexOf(span.quote);
    if (idx === -1 || idx < cursor) continue;

    // Add narration before this span
    if (idx > cursor) {
      result.push(canonicalText.slice(cursor, idx));
    }

    // Add the speech span with styling
    const colorSlot = speakerColors[span.speaker];
    if (colorSlot) {
      result.push(
        <span
          key={`${cursor}-${idx}`}
          className="font-bold italic"
          style={{ color: `rgb(var(--speaker-${colorSlot}))` }}
        >
          {span.quote}
        </span>
      );
    } else {
      result.push(span.quote);
    }

    cursor = idx + span.quote.length;
  }

  // Add remaining text
  if (cursor < canonicalText.length) {
    result.push(canonicalText.slice(cursor));
  }

  return result.length > 0 ? result : [canonicalText];
}
