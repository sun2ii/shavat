// Types for the speaker review tool

export type Classification = 'GREEN' | 'YELLOW' | 'RED' | 'BROKEN';

export type ReviewStatus = 'approved' | 'rejected' | 'unsure' | 'unreviewed';

export interface Segment {
  type: 'speech' | 'narration';
  speaker?: string;
  text: string;
}

export interface SpanAudit {
  chapter: number;
  verse: number;
  speaker: string;
  quote: string;
  classification: Classification;
  reasons: string[];
  exactMatch: boolean;
  normalizedMatch: boolean;
  canonicalText: string;
  previousVerse: string | null;
  nextVerse: string | null;
}

export interface VerseAudit {
  chapter: number;
  verse: number;
  canonicalText: string;
  previousVerse: string | null;
  nextVerse: string | null;
  spans: SpanAudit[];
  classification: Classification;
  reasons: string[];
  currentSegments: Segment[];
  proposedSegments: Segment[] | null;
}

export interface AuditReport {
  book: string;
  timestamp: string;
  summary: {
    chapters: number;
    totalVerses: number;
    annotatedVerses: number;
    totalSpans: number;
    spanCounts: Record<Classification, number>;
    verseCounts: Record<Classification, number>;
  };
  verses: VerseAudit[];
}

export interface VerseReview {
  status: ReviewStatus;
  reviewedAt: string;
  classificationAtReview: Classification;
  proposedSegments?: Segment[];
  comment?: string;
}

export interface BookReviewData {
  book: string;
  reviews: Record<string, VerseReview>; // key is "chapter:verse"
}

// Human-readable reason labels
export const REASON_LABELS: Record<string, string> = {
  simple_attribution: 'Simple attribution',
  quote_starts_mid_verse: 'Quote starts mid-verse',
  quote_ends_mid_verse: 'Quote ends mid-verse',
  no_opening_quote: 'No opening quote',
  span_no_opening_quote: 'Span lacks opening quote',
  continuation_verse: 'Continuation from previous verse',
  nested_quotation_depth_2: 'Nested quotation (depth 2)',
  nested_quotation_depth_3: 'Deep nested quotation',
  interrupted_speech: 'Interrupted speech',
  multiple_spans_same_speaker: 'Multiple spans, same speaker',
  multiple_speakers_in_verse: 'Multiple speakers',
  typography_mismatch: 'Typography mismatch',
  duplicate_substring: 'Duplicate substring',
  narrator_phrase_in_span: 'Narrator phrase in span',
  unknown_speaker: 'Unknown speaker',
  empty_quote: 'Empty quote',
  quote_not_found: 'Quote not found in verse',
  verse_not_found: 'Verse not found',
};

// Classification colors (Tailwind classes)
export const CLASSIFICATION_STYLES: Record<Classification, { bg: string; text: string; border: string }> = {
  GREEN: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/30',
  },
  YELLOW: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500/30',
  },
  RED: {
    bg: 'bg-red-500/10',
    text: 'text-red-600 dark:text-red-400',
    border: 'border-red-500/30',
  },
  BROKEN: {
    bg: 'bg-rose-500/10',
    text: 'text-rose-600 dark:text-rose-400',
    border: 'border-rose-500/30',
  },
};
