#!/usr/bin/env npx tsx
/**
 * Speaker Attribution Audit System
 *
 * Classifies speaker spans as GREEN / YELLOW / RED / BROKEN
 * with conservative GREEN criteria (false-yellow >> false-green).
 *
 * Usage:
 *   npm run audit:speakers -- hosea
 *   npm run audit:speakers -- hosea --show-green
 *   npm run audit:speakers -- hosea --chapter 2
 */

import fs from 'fs';
import path from 'path';

// ============================================================================
// TYPES
// ============================================================================

interface SpeakerDef {
  name: string;
  color: number;
}

interface QuoteSpan {
  verse: number;
  speaker: string;
  quote: string;
}

interface SpeakerFile {
  book: string;
  speakers: Record<string, SpeakerDef>;
  chapters: Record<string, QuoteSpan[]>;
}

interface BookJSON {
  book: string;
  count: number;
  chapters: Array<{
    chapter: string;
    verses: Array<{
      verse: string;
      text: string;
    }>;
  }>;
}

type Classification = 'GREEN' | 'YELLOW' | 'RED' | 'BROKEN';

interface SpanAudit {
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

interface VerseAudit {
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

interface Segment {
  type: 'speech' | 'narration';
  speaker?: string;
  text: string;
}

interface AuditReport {
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

// ============================================================================
// CONSTANTS: RISK SIGNAL PATTERNS
// ============================================================================

// Attribution phrases that interrupt speech
const NARRATOR_ATTRIBUTION_PATTERNS = [
  /\bdeclares\s+the\s+Lord\b/i,
  /\bsays\s+the\s+Lord\b/i,
  /\bsaid\s+the\s+Lord\b/i,
  /\bthe\s+Lord\s+said\b/i,
  /\bthe\s+Lord\s+declares\b/i,
  /\bhe\s+said\b/i,
  /\bshe\s+said\b/i,
  /\bthey\s+said\b/i,
  /\bhe\s+replied\b/i,
  /\bshe\s+replied\b/i,
  /\bhe\s+answered\b/i,
  /\bshe\s+answered\b/i,
  /\bhe\s+asked\b/i,
  /\bshe\s+asked\b/i,
  /\bhe\s+continued\b/i,
  /\bshe\s+continued\b/i,
  /\bhe\s+cried\b/i,
  /\bshe\s+cried\b/i,
  /\bhe\s+called\b/i,
  /\bshe\s+called\b/i,
  /\btold\s+him\b/i,
  /\btold\s+her\b/i,
  /\btold\s+them\b/i,
];

// Curly quote characters (semantic markers in this corpus)
const OUTER_QUOTE_OPEN = '\u201C'; // "
const OUTER_QUOTE_CLOSE = '\u201D'; // "
const INNER_QUOTE_OPEN = '\u2018'; // '
const INNER_QUOTE_CLOSE = '\u2019'; // '
const BACKTICK = '\u0060'; // ` (used as apostrophe)

// ============================================================================
// NORMALIZATION (for comparison only, not modification)
// ============================================================================

function normalizeForComparison(text: string): string {
  return text
    .replace(/[\u201C\u201D]/g, '"') // curly double -> straight
    .replace(/[\u2018\u2019\u0060]/g, "'") // curly single, backtick -> straight
    .replace(/\s+/g, ' ')
    .trim();
}

// ============================================================================
// RISK SIGNAL DETECTORS
// ============================================================================

function detectNarratorAttribution(text: string): string[] {
  const signals: string[] = [];
  for (const pattern of NARRATOR_ATTRIBUTION_PATTERNS) {
    if (pattern.test(text)) {
      const match = text.match(pattern);
      if (match) {
        signals.push(`narrator_attribution: "${match[0]}"`);
      }
    }
  }
  return signals;
}

function detectNestedQuotation(text: string): { depth: number; signals: string[] } {
  let depth = 0;
  let maxDepth = 0;
  const signals: string[] = [];

  // Count nesting using curly quotes
  for (const char of text) {
    if (char === OUTER_QUOTE_OPEN || char === INNER_QUOTE_OPEN) {
      depth++;
      maxDepth = Math.max(maxDepth, depth);
    } else if (char === OUTER_QUOTE_CLOSE || char === INNER_QUOTE_CLOSE || char === BACKTICK) {
      // Backtick can close inner quotes in this corpus
      if (depth > 0) depth--;
    }
  }

  if (maxDepth > 1) {
    signals.push(`nested_quotation_depth_${maxDepth}`);
  }

  return { depth: maxDepth, signals };
}

function detectInterruptedSpeech(verseText: string): string[] {
  const signals: string[] = [];

  // Pattern: quote, then narrator attribution, then quote
  // e.g., "In that day," declares the Lord, "you will..."
  const interruptionPattern =
    /["\u201D][,.]?\s*(declares|says|said)\s+the\s+Lord[,.]?\s*["\u201C]/i;

  if (interruptionPattern.test(verseText)) {
    signals.push('interrupted_speech');
  }

  return signals;
}

function detectContinuationVerse(
  verseText: string,
  previousVerseText: string | null
): string[] {
  const signals: string[] = [];

  // Check if verse starts with opening quote mark
  const startsWithQuote = /^["'\u201C\u2018]/.test(verseText.trim());

  // If the span doesn't start with a quote mark, flag as possible continuation
  // This is conservative: requires human to verify the surrounding context
  if (!startsWithQuote) {
    // Check if previous verse suggests continuation
    const previousHasUnclosed =
      previousVerseText &&
      (previousVerseText.split(OUTER_QUOTE_OPEN).length >
        previousVerseText.split(OUTER_QUOTE_CLOSE).length ||
        previousVerseText.endsWith(',') ||
        previousVerseText.endsWith(';'));

    if (previousHasUnclosed) {
      signals.push('continuation_verse');
    } else {
      // Even if previous doesn't clearly indicate continuation,
      // a verse without opening quotes that has speaker attribution
      // needs human verification of context
      signals.push('no_opening_quote');
    }
  }

  return signals;
}

function detectQuoteBoundaryRisk(
  quote: string,
  verseText: string
): string[] {
  const signals: string[] = [];

  // Quote starts mid-verse (not at beginning and not after quote mark)
  const quoteStart = verseText.indexOf(quote);
  if (quoteStart > 0) {
    const before = verseText.substring(0, quoteStart);
    // If there's substantial text before and it doesn't end with opening quote
    if (before.length > 10 && !/["'\u201C\u2018]\s*$/.test(before)) {
      signals.push('quote_starts_mid_verse');
    }
  }

  // Quote doesn't end at verse end and what follows isn't a closing quote
  const quoteEnd = quoteStart + quote.length;
  if (quoteEnd < verseText.length) {
    const after = verseText.substring(quoteEnd);
    if (after.length > 10 && !/^["'\u201D\u2019\u0060]/.test(after)) {
      signals.push('quote_ends_mid_verse');
    }
  }

  return signals;
}

// ============================================================================
// SEGMENTATION (for display purposes)
// ============================================================================

function segmentVerse(
  verseText: string,
  spans: QuoteSpan[],
  speakers: Record<string, SpeakerDef>
): Segment[] {
  if (spans.length === 0) {
    return [{ type: 'narration', text: verseText }];
  }

  const segments: Segment[] = [];
  let cursor = 0;

  // Sort spans by their position in the verse
  const sortedSpans = spans
    .map((span) => ({
      span,
      index: verseText.indexOf(span.quote),
    }))
    .filter((s) => s.index !== -1)
    .sort((a, b) => a.index - b.index);

  for (const { span, index } of sortedSpans) {
    // Add narration before this span
    if (index > cursor) {
      segments.push({
        type: 'narration',
        text: verseText.slice(cursor, index),
      });
    }

    // Add the speaker span
    segments.push({
      type: 'speech',
      speaker: span.speaker,
      text: span.quote,
    });

    cursor = index + span.quote.length;
  }

  // Add remaining narration
  if (cursor < verseText.length) {
    segments.push({
      type: 'narration',
      text: verseText.slice(cursor),
    });
  }

  return segments;
}

// ============================================================================
// CLASSIFICATION ENGINE
// ============================================================================

function classifySpan(
  span: QuoteSpan,
  verseText: string,
  previousVerse: string | null,
  nextVerse: string | null,
  speakers: Record<string, SpeakerDef>,
  otherSpansInVerse: QuoteSpan[]
): SpanAudit {
  const reasons: string[] = [];
  let classification: Classification = 'GREEN';

  // === BROKEN checks (deterministic failures) ===

  // Unknown speaker
  if (!speakers[span.speaker]) {
    reasons.push('unknown_speaker');
    return {
      chapter: 0, // filled in by caller
      verse: span.verse,
      speaker: span.speaker,
      quote: span.quote,
      classification: 'BROKEN',
      reasons,
      exactMatch: false,
      normalizedMatch: false,
      canonicalText: verseText,
      previousVerse,
      nextVerse,
    };
  }

  // Empty quote
  if (!span.quote || span.quote.trim() === '') {
    reasons.push('empty_quote');
    return {
      chapter: 0,
      verse: span.verse,
      speaker: span.speaker,
      quote: span.quote,
      classification: 'BROKEN',
      reasons,
      exactMatch: false,
      normalizedMatch: false,
      canonicalText: verseText,
      previousVerse,
      nextVerse,
    };
  }

  // Check exact match
  const exactMatch = verseText.includes(span.quote);

  // Check normalized match
  const normalizedVerse = normalizeForComparison(verseText);
  const normalizedQuote = normalizeForComparison(span.quote);
  const normalizedMatch = normalizedVerse.includes(normalizedQuote);

  if (!exactMatch && !normalizedMatch) {
    reasons.push('quote_not_found');
    return {
      chapter: 0,
      verse: span.verse,
      speaker: span.speaker,
      quote: span.quote,
      classification: 'BROKEN',
      reasons,
      exactMatch,
      normalizedMatch,
      canonicalText: verseText,
      previousVerse,
      nextVerse,
    };
  }

  // Typography mismatch (exact fails but normalized succeeds)
  if (!exactMatch && normalizedMatch) {
    reasons.push('typography_mismatch');
    classification = 'YELLOW';
  }

  // Check for duplicate matches
  const firstIndex = verseText.indexOf(span.quote);
  const secondIndex = verseText.indexOf(span.quote, firstIndex + 1);
  if (firstIndex !== -1 && secondIndex !== -1) {
    reasons.push('duplicate_substring');
    classification = classification === 'GREEN' ? 'YELLOW' : classification;
  }

  // === YELLOW/RED checks (risk signals) ===

  // Narrator attribution inside the quote
  const narratorInQuote = detectNarratorAttribution(span.quote);
  if (narratorInQuote.length > 0) {
    reasons.push(...narratorInQuote);
    reasons.push('narrator_phrase_in_span');
    classification = 'RED'; // This is a serious semantic issue
  }

  // Interrupted speech in the verse
  const interruptedSignals = detectInterruptedSpeech(verseText);
  if (interruptedSignals.length > 0) {
    reasons.push(...interruptedSignals);
    if (classification !== 'RED') classification = 'YELLOW';
  }

  // Nested quotation
  const { depth, signals: nestedSignals } = detectNestedQuotation(span.quote);
  if (nestedSignals.length > 0) {
    reasons.push(...nestedSignals);
    if (depth > 2) {
      classification = 'RED';
    } else if (classification !== 'RED') {
      classification = 'YELLOW';
    }
  }

  // Continuation verse / context-dependent attribution
  const continuationSignals = detectContinuationVerse(verseText, previousVerse);
  if (continuationSignals.length > 0) {
    reasons.push(...continuationSignals);
    if (classification !== 'RED') classification = 'YELLOW';
  }

  // Also check if the quote itself doesn't start with a quote mark
  // This is a strong signal that the attribution relies on context
  const quoteStartsWithQuote = /^["'\u201C\u2018]/.test(span.quote.trim());
  if (!quoteStartsWithQuote && continuationSignals.length === 0) {
    reasons.push('span_no_opening_quote');
    if (classification !== 'RED') classification = 'YELLOW';
  }

  // Quote boundary risk
  const boundarySignals = detectQuoteBoundaryRisk(span.quote, verseText);
  if (boundarySignals.length > 0) {
    reasons.push(...boundarySignals);
    if (classification !== 'RED') classification = 'YELLOW';
  }

  // Multiple spans in same verse
  if (otherSpansInVerse.length > 0) {
    const sameSpeaker = otherSpansInVerse.every((s) => s.speaker === span.speaker);
    const differentSpeakers = !sameSpeaker;

    if (differentSpeakers) {
      reasons.push('multiple_speakers_in_verse');
      classification = 'RED';
    } else {
      reasons.push('multiple_spans_same_speaker');
      if (classification !== 'RED') classification = 'YELLOW';
    }
  }

  // If no risk signals and passes all checks, it's GREEN
  if (reasons.length === 0) {
    reasons.push('simple_attribution');
  }

  return {
    chapter: 0,
    verse: span.verse,
    speaker: span.speaker,
    quote: span.quote,
    classification,
    reasons,
    exactMatch,
    normalizedMatch,
    canonicalText: verseText,
    previousVerse,
    nextVerse,
  };
}

function classifyVerse(
  chapter: number,
  verse: number,
  verseText: string,
  previousVerse: string | null,
  nextVerse: string | null,
  spans: QuoteSpan[],
  speakers: Record<string, SpeakerDef>
): VerseAudit {
  const spanAudits: SpanAudit[] = [];

  for (const span of spans) {
    const otherSpans = spans.filter((s) => s !== span);
    const audit = classifySpan(
      span,
      verseText,
      previousVerse,
      nextVerse,
      speakers,
      otherSpans
    );
    audit.chapter = chapter;
    spanAudits.push(audit);
  }

  // Verse classification = highest severity among spans
  const severityOrder: Classification[] = ['GREEN', 'YELLOW', 'RED', 'BROKEN'];
  let verseClassification: Classification = 'GREEN';
  const verseReasons: string[] = [];

  for (const audit of spanAudits) {
    if (
      severityOrder.indexOf(audit.classification) >
      severityOrder.indexOf(verseClassification)
    ) {
      verseClassification = audit.classification;
    }
    verseReasons.push(...audit.reasons);
  }

  // Additional verse-level checks
  const interruptedSignals = detectInterruptedSpeech(verseText);
  if (interruptedSignals.length > 0 && !verseReasons.includes('interrupted_speech')) {
    verseReasons.push(...interruptedSignals);
    if (verseClassification === 'GREEN') {
      verseClassification = 'YELLOW';
    }
  }

  // Build current segments (what the data currently implies)
  const currentSegments = segmentVerse(verseText, spans, speakers);

  // Propose correction for YELLOW cases with interrupted speech
  let proposedSegments: Segment[] | null = null;
  if (
    verseReasons.includes('interrupted_speech') &&
    verseClassification === 'YELLOW'
  ) {
    proposedSegments = proposeInterruptedSpeechSegments(verseText, spans, speakers);
  }

  return {
    chapter,
    verse,
    canonicalText: verseText,
    previousVerse,
    nextVerse,
    spans: spanAudits,
    classification: verseClassification,
    reasons: [...new Set(verseReasons)],
    currentSegments,
    proposedSegments,
  };
}

function proposeInterruptedSpeechSegments(
  verseText: string,
  spans: QuoteSpan[],
  speakers: Record<string, SpeakerDef>
): Segment[] | null {
  // Try to split on "declares the Lord" pattern
  const pattern = /(["\u201C][^"\u201D]*["\u201D]),?\s*(declares\s+the\s+Lord),?\s*(["\u201C])/i;
  const match = verseText.match(pattern);

  if (!match) return null;

  const segments: Segment[] = [];
  let cursor = 0;

  // Find the primary speaker from spans
  const primarySpeaker = spans[0]?.speaker || 'unknown';

  // Split the verse
  const matchIndex = verseText.indexOf(match[0]);
  if (matchIndex > 0) {
    segments.push({ type: 'narration', text: verseText.slice(0, matchIndex) });
  }

  // First speech segment
  const firstQuoteEnd = matchIndex + match[1].length;
  segments.push({
    type: 'speech',
    speaker: primarySpeaker,
    text: match[1],
  });

  // Narrator attribution
  const attrStart = verseText.indexOf(match[2], firstQuoteEnd);
  if (attrStart > firstQuoteEnd) {
    segments.push({
      type: 'narration',
      text: verseText.slice(firstQuoteEnd, attrStart) + match[2],
    });
  } else {
    segments.push({ type: 'narration', text: ', ' + match[2] + ', ' });
  }

  // Remaining speech
  const secondQuoteStart = verseText.indexOf(match[3], attrStart + match[2].length);
  if (secondQuoteStart !== -1) {
    segments.push({
      type: 'speech',
      speaker: primarySpeaker,
      text: verseText.slice(secondQuoteStart),
    });
  }

  return segments.length > 0 ? segments : null;
}

// ============================================================================
// MAIN AUDIT FUNCTION
// ============================================================================

function auditBook(bookSlug: string): AuditReport {
  const speakerPath = path.join(process.cwd(), 'data', 'speakers', `${bookSlug}.json`);
  const biblePath = path.join(process.cwd(), 'lib', `${bookSlug}.json`);

  // Load speaker data
  if (!fs.existsSync(speakerPath)) {
    throw new Error(`Speaker file not found: ${speakerPath}`);
  }
  const speakerData: SpeakerFile = JSON.parse(fs.readFileSync(speakerPath, 'utf-8'));

  // Load Bible text
  if (!fs.existsSync(biblePath)) {
    throw new Error(`Bible file not found: ${biblePath}`);
  }
  const bibleData: BookJSON = JSON.parse(fs.readFileSync(biblePath, 'utf-8'));

  // Build verse lookup
  const verseMap = new Map<string, string>();
  const verseOrder: string[] = [];

  for (const chapter of bibleData.chapters) {
    for (const verse of chapter.verses) {
      const key = `${chapter.chapter}:${verse.verse}`;
      verseMap.set(key, verse.text);
      verseOrder.push(key);
    }
  }

  // Audit each verse with spans
  const verseAudits: VerseAudit[] = [];
  const spanCounts: Record<Classification, number> = {
    GREEN: 0,
    YELLOW: 0,
    RED: 0,
    BROKEN: 0,
  };
  const verseCounts: Record<Classification, number> = {
    GREEN: 0,
    YELLOW: 0,
    RED: 0,
    BROKEN: 0,
  };

  let totalSpans = 0;
  const annotatedVerses = new Set<string>();

  for (const [chapterNum, spans] of Object.entries(speakerData.chapters)) {
    // Group spans by verse
    const byVerse = new Map<number, QuoteSpan[]>();
    for (const span of spans) {
      totalSpans++;
      const existing = byVerse.get(span.verse);
      if (existing) {
        existing.push(span);
      } else {
        byVerse.set(span.verse, [span]);
      }
    }

    for (const [verseNum, verseSpans] of byVerse) {
      const key = `${chapterNum}:${verseNum}`;
      annotatedVerses.add(key);

      const verseText = verseMap.get(key);
      if (!verseText) {
        // Verse doesn't exist
        for (const span of verseSpans) {
          spanCounts.BROKEN++;
        }
        verseCounts.BROKEN++;
        verseAudits.push({
          chapter: parseInt(chapterNum),
          verse: verseNum,
          canonicalText: '',
          previousVerse: null,
          nextVerse: null,
          spans: verseSpans.map((s) => ({
            chapter: parseInt(chapterNum),
            verse: s.verse,
            speaker: s.speaker,
            quote: s.quote,
            classification: 'BROKEN' as Classification,
            reasons: ['verse_not_found'],
            exactMatch: false,
            normalizedMatch: false,
            canonicalText: '',
            previousVerse: null,
            nextVerse: null,
          })),
          classification: 'BROKEN',
          reasons: ['verse_not_found'],
          currentSegments: [],
          proposedSegments: null,
        });
        continue;
      }

      // Get previous/next verses
      const keyIndex = verseOrder.indexOf(key);
      const previousVerse = keyIndex > 0 ? verseMap.get(verseOrder[keyIndex - 1]) || null : null;
      const nextVerse =
        keyIndex < verseOrder.length - 1
          ? verseMap.get(verseOrder[keyIndex + 1]) || null
          : null;

      const audit = classifyVerse(
        parseInt(chapterNum),
        verseNum,
        verseText,
        previousVerse,
        nextVerse,
        verseSpans,
        speakerData.speakers
      );

      verseAudits.push(audit);
      verseCounts[audit.classification]++;
      for (const spanAudit of audit.spans) {
        spanCounts[spanAudit.classification]++;
      }
    }
  }

  return {
    book: bookSlug,
    timestamp: new Date().toISOString(),
    summary: {
      chapters: bibleData.chapters.length,
      totalVerses: verseOrder.length,
      annotatedVerses: annotatedVerses.size,
      totalSpans,
      spanCounts,
      verseCounts,
    },
    verses: verseAudits.sort((a, b) => a.chapter - b.chapter || a.verse - b.verse),
  };
}

// ============================================================================
// OUTPUT FORMATTING
// ============================================================================

function formatSegments(segments: Segment[], speakers: Record<string, SpeakerDef>): string {
  return segments
    .map((seg) => {
      if (seg.type === 'narration') {
        return `[NARRATOR]\n${seg.text}`;
      } else {
        const speakerName = speakers[seg.speaker!]?.name || seg.speaker;
        return `[${speakerName?.toUpperCase()}]\n${seg.text}`;
      }
    })
    .join('\n');
}

function formatVerseAudit(
  audit: VerseAudit,
  speakers: Record<string, SpeakerDef>
): string {
  const lines: string[] = [];
  const divider = '='.repeat(80);

  lines.push(divider);
  lines.push(
    `${audit.classification} — ${audit.chapter}:${audit.verse}`
  );
  lines.push(divider);

  lines.push('');
  lines.push('VERSE');
  lines.push(audit.canonicalText);

  lines.push('');
  lines.push('CURRENT ATTRIBUTION');
  lines.push(formatSegments(audit.currentSegments, speakers));

  lines.push('');
  lines.push('WHY FLAGGED');
  for (const reason of audit.reasons) {
    lines.push(`  - ${reason}`);
  }

  if (audit.proposedSegments) {
    lines.push('');
    lines.push('PROPOSED');
    lines.push(formatSegments(audit.proposedSegments, speakers));
  } else if (audit.classification === 'RED') {
    lines.push('');
    lines.push('NO AUTOMATIC PROPOSAL');
    lines.push('Human editorial decision required.');
  }

  if (audit.previousVerse) {
    lines.push('');
    lines.push('CONTEXT (previous)');
    lines.push(audit.previousVerse.slice(0, 120) + (audit.previousVerse.length > 120 ? '...' : ''));
  }

  if (audit.nextVerse) {
    lines.push('');
    lines.push('CONTEXT (next)');
    lines.push(audit.nextVerse.slice(0, 120) + (audit.nextVerse.length > 120 ? '...' : ''));
  }

  lines.push('');

  return lines.join('\n');
}

function printSummary(report: AuditReport): void {
  console.log('');
  console.log('═'.repeat(60));
  console.log('  SHAVAT — SPEAKER ATTRIBUTION TRIAGE');
  console.log('═'.repeat(60));
  console.log('');
  console.log(`Book:                      ${report.book}`);
  console.log(`Chapters:                  ${report.summary.chapters}`);
  console.log(`Total Verses:              ${report.summary.totalVerses}`);
  console.log(`Annotated Verses:          ${report.summary.annotatedVerses}`);
  console.log(`Total Speaker Spans:       ${report.summary.totalSpans}`);
  console.log('');
  console.log('VERSE-LEVEL TRIAGE');
  console.log(`  GREEN:                   ${report.summary.verseCounts.GREEN}`);
  console.log(`  YELLOW:                  ${report.summary.verseCounts.YELLOW}`);
  console.log(`  RED:                     ${report.summary.verseCounts.RED}`);
  console.log(`  BROKEN:                  ${report.summary.verseCounts.BROKEN}`);
  console.log('');
  console.log('SPAN-LEVEL TRIAGE');
  console.log(`  GREEN:                   ${report.summary.spanCounts.GREEN}`);
  console.log(`  YELLOW:                  ${report.summary.spanCounts.YELLOW}`);
  console.log(`  RED:                     ${report.summary.spanCounts.RED}`);
  console.log(`  BROKEN:                  ${report.summary.spanCounts.BROKEN}`);
  console.log('');

  const total = report.summary.annotatedVerses;
  const humanReview =
    report.summary.verseCounts.YELLOW +
    report.summary.verseCounts.RED +
    report.summary.verseCounts.BROKEN;

  console.log(`Human review queue:        ${humanReview} verses`);
  console.log(
    `Auto-safe:                 ${((report.summary.verseCounts.GREEN / total) * 100).toFixed(1)}%`
  );
  console.log(
    `Needs quick confirmation:  ${((report.summary.verseCounts.YELLOW / total) * 100).toFixed(1)}%`
  );
  console.log(
    `Requires editorial:        ${((report.summary.verseCounts.RED / total) * 100).toFixed(1)}%`
  );
  console.log(
    `Technical problems:        ${((report.summary.verseCounts.BROKEN / total) * 100).toFixed(1)}%`
  );
  console.log('');
}

// ============================================================================
// CLI
// ============================================================================

function main(): void {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log('Usage: npm run audit:speakers -- <book> [options]');
    console.log('');
    console.log('Options:');
    console.log('  --show-green     Show all GREEN cases (default: show 5 examples)');
    console.log('  --chapter <n>    Filter to specific chapter');
    console.log('  --json-only      Only output JSON report, no terminal output');
    console.log('');
    console.log('Examples:');
    console.log('  npm run audit:speakers -- hosea');
    console.log('  npm run audit:speakers -- hosea --show-green');
    console.log('  npm run audit:speakers -- hosea --chapter 2');
    process.exit(0);
  }

  const bookSlug = args[0];
  const showAllGreen = args.includes('--show-green');
  const jsonOnly = args.includes('--json-only');

  let chapterFilter: number | null = null;
  const chapterIdx = args.indexOf('--chapter');
  if (chapterIdx !== -1 && args[chapterIdx + 1]) {
    chapterFilter = parseInt(args[chapterIdx + 1]);
  }

  // Run audit
  let report: AuditReport;
  try {
    report = auditBook(bookSlug);
  } catch (err) {
    console.error(`Error: ${(err as Error).message}`);
    process.exit(1);
  }

  // Filter by chapter if requested
  if (chapterFilter !== null) {
    report.verses = report.verses.filter((v) => v.chapter === chapterFilter);
    // Recalculate counts
    report.summary.verseCounts = { GREEN: 0, YELLOW: 0, RED: 0, BROKEN: 0 };
    report.summary.spanCounts = { GREEN: 0, YELLOW: 0, RED: 0, BROKEN: 0 };
    for (const v of report.verses) {
      report.summary.verseCounts[v.classification]++;
      for (const s of v.spans) {
        report.summary.spanCounts[s.classification]++;
      }
    }
    report.summary.annotatedVerses = report.verses.length;
    report.summary.totalSpans = report.verses.reduce((sum, v) => sum + v.spans.length, 0);
  }

  // Load speaker data for formatting
  const speakerPath = path.join(process.cwd(), 'data', 'speakers', `${bookSlug}.json`);
  const speakerData: SpeakerFile = JSON.parse(fs.readFileSync(speakerPath, 'utf-8'));

  // Write JSON report
  const reportsDir = path.join(process.cwd(), 'reports', 'speaker-audit');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  const jsonPath = path.join(reportsDir, `${bookSlug}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2));

  if (jsonOnly) {
    console.log(`Report written to ${jsonPath}`);
    process.exit(0);
  }

  // Terminal output
  printSummary(report);

  // Show BROKEN
  const broken = report.verses.filter((v) => v.classification === 'BROKEN');
  if (broken.length > 0) {
    console.log('');
    console.log('╔' + '═'.repeat(78) + '╗');
    console.log('║' + '  BROKEN CASES'.padEnd(78) + '║');
    console.log('╚' + '═'.repeat(78) + '╝');
    for (const v of broken) {
      console.log(formatVerseAudit(v, speakerData.speakers));
    }
  }

  // Show RED
  const red = report.verses.filter((v) => v.classification === 'RED');
  if (red.length > 0) {
    console.log('');
    console.log('╔' + '═'.repeat(78) + '╗');
    console.log('║' + '  RED CASES (Editorial Judgment Required)'.padEnd(78) + '║');
    console.log('╚' + '═'.repeat(78) + '╝');
    for (const v of red) {
      console.log(formatVerseAudit(v, speakerData.speakers));
    }
  }

  // Show YELLOW
  const yellow = report.verses.filter((v) => v.classification === 'YELLOW');
  if (yellow.length > 0) {
    console.log('');
    console.log('╔' + '═'.repeat(78) + '╗');
    console.log('║' + '  YELLOW CASES (Quick Confirmation Recommended)'.padEnd(78) + '║');
    console.log('╚' + '═'.repeat(78) + '╝');
    for (const v of yellow) {
      console.log(formatVerseAudit(v, speakerData.speakers));
    }
  }

  // Show GREEN (5 examples or all if --show-green)
  const green = report.verses.filter((v) => v.classification === 'GREEN');
  if (green.length > 0) {
    console.log('');
    console.log('╔' + '═'.repeat(78) + '╗');
    console.log(
      '║' +
        `  GREEN CASES (${showAllGreen ? 'All' : '5 Examples'})`.padEnd(78) +
        '║'
    );
    console.log('╚' + '═'.repeat(78) + '╝');
    const toShow = showAllGreen ? green : green.slice(0, 5);
    for (const v of toShow) {
      console.log(formatVerseAudit(v, speakerData.speakers));
    }
    if (!showAllGreen && green.length > 5) {
      console.log(`... and ${green.length - 5} more GREEN verses (use --show-green to see all)`);
    }
  }

  console.log('');
  console.log(`JSON report written to: ${jsonPath}`);
}

main();
