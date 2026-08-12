/**
 * Tests for speaker attribution classification logic
 *
 * Run with: npx tsx scripts/audit-speakers.test.ts
 */

// Simple test framework
let passed = 0;
let failed = 0;

function test(name: string, fn: () => void): void {
  try {
    fn();
    passed++;
    console.log(`  ✓ ${name}`);
  } catch (err) {
    failed++;
    console.log(`  ✗ ${name}`);
    console.log(`    ${(err as Error).message}`);
  }
}

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(message);
  }
}

function assertEqual<T>(actual: T, expected: T, message: string): void {
  if (actual !== expected) {
    throw new Error(`${message}: expected "${expected}", got "${actual}"`);
  }
}

function assertIncludes(arr: string[], item: string, message: string): void {
  if (!arr.includes(item)) {
    throw new Error(`${message}: expected to include "${item}", got [${arr.join(', ')}]`);
  }
}

// ============================================================================
// Import classification logic (inline for testing)
// ============================================================================

type Classification = 'GREEN' | 'YELLOW' | 'RED' | 'BROKEN';

const OUTER_QUOTE_OPEN = '\u201C';
const OUTER_QUOTE_CLOSE = '\u201D';
const INNER_QUOTE_OPEN = '\u2018';
const BACKTICK = '\u0060';

const NARRATOR_ATTRIBUTION_PATTERNS = [
  /\bdeclares\s+the\s+Lord\b/i,
  /\bsays\s+the\s+Lord\b/i,
  /\bsaid\s+the\s+Lord\b/i,
  /\bthe\s+Lord\s+said\b/i,
  /\bhe\s+said\b/i,
  /\bshe\s+said\b/i,
];

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

  for (const char of text) {
    if (char === OUTER_QUOTE_OPEN || char === INNER_QUOTE_OPEN) {
      depth++;
      maxDepth = Math.max(maxDepth, depth);
    } else if (char === OUTER_QUOTE_CLOSE || char === BACKTICK) {
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
  const interruptionPattern =
    /["\u201D][,.]?\s*(declares|says|said)\s+the\s+Lord[,.]?\s*["\u201C]/i;

  if (interruptionPattern.test(verseText)) {
    signals.push('interrupted_speech');
  }

  return signals;
}

interface SimpleSpan {
  speaker: string;
  quote: string;
}

interface SimpleSpeakers {
  [key: string]: { name: string; color: number };
}

function classifySimple(
  quote: string,
  verseText: string,
  speaker: string,
  speakers: SimpleSpeakers,
  previousVerse: string | null = null
): { classification: Classification; reasons: string[] } {
  const reasons: string[] = [];
  let classification: Classification = 'GREEN';

  // BROKEN: unknown speaker
  if (!speakers[speaker]) {
    return { classification: 'BROKEN', reasons: ['unknown_speaker'] };
  }

  // BROKEN: empty quote
  if (!quote || quote.trim() === '') {
    return { classification: 'BROKEN', reasons: ['empty_quote'] };
  }

  // BROKEN: quote not found
  if (!verseText.includes(quote)) {
    return { classification: 'BROKEN', reasons: ['quote_not_found'] };
  }

  // RED: narrator attribution in quote
  const narratorSignals = detectNarratorAttribution(quote);
  if (narratorSignals.length > 0) {
    reasons.push(...narratorSignals);
    reasons.push('narrator_phrase_in_span');
    classification = 'RED';
  }

  // YELLOW: interrupted speech
  const interruptedSignals = detectInterruptedSpeech(verseText);
  if (interruptedSignals.length > 0) {
    reasons.push(...interruptedSignals);
    if (classification !== 'RED') classification = 'YELLOW';
  }

  // YELLOW: nested quotation
  const { depth, signals: nestedSignals } = detectNestedQuotation(quote);
  if (nestedSignals.length > 0) {
    reasons.push(...nestedSignals);
    if (depth > 2) {
      classification = 'RED';
    } else if (classification !== 'RED') {
      classification = 'YELLOW';
    }
  }

  // YELLOW: span doesn't start with quote mark
  const quoteStartsWithQuote = /^["'\u201C\u2018]/.test(quote.trim());
  if (!quoteStartsWithQuote) {
    reasons.push('span_no_opening_quote');
    if (classification !== 'RED') classification = 'YELLOW';
  }

  // YELLOW: verse doesn't start with quote (continuation)
  const verseStartsWithQuote = /^["'\u201C\u2018]/.test(verseText.trim());
  if (!verseStartsWithQuote) {
    reasons.push('no_opening_quote');
    if (classification !== 'RED') classification = 'YELLOW';
  }

  if (reasons.length === 0) {
    reasons.push('simple_attribution');
  }

  return { classification, reasons };
}

// ============================================================================
// TESTS
// ============================================================================

console.log('\n=== SPEAKER CLASSIFICATION TESTS ===\n');

const speakers: SimpleSpeakers = {
  'the-lord': { name: 'The Lord', color: 8 },
  elisha: { name: 'Elisha', color: 1 },
  israel: { name: 'Israel', color: 2 },
};

// --- Simple correct speech (GREEN) ---
console.log('Simple correct speech:');

test('simple quote matching entire verse should be GREEN', () => {
  const verse = '"Go, sell the oil and pay your debts."';
  const quote = '"Go, sell the oil and pay your debts."';
  const result = classifySimple(quote, verse, 'the-lord', speakers);
  assertEqual(result.classification, 'GREEN', 'classification');
  assertIncludes(result.reasons, 'simple_attribution', 'reasons');
});

test('quote with apostrophe should be GREEN', () => {
  const verse = '"Israel\'s king won\'t listen."';
  const quote = '"Israel\'s king won\'t listen."';
  const result = classifySimple(quote, verse, 'the-lord', speakers);
  assertEqual(result.classification, 'GREEN', 'classification');
});

// --- Interrupted speech (YELLOW/RED) ---
console.log('\nInterrupted speech:');

test('interrupted speech in verse should be YELLOW', () => {
  const verse = '"In that day," declares the Lord, "I will restore you."';
  const quote = '"In that day,"';
  const result = classifySimple(quote, verse, 'the-lord', speakers);
  assertEqual(result.classification, 'YELLOW', 'classification');
  assertIncludes(result.reasons, 'interrupted_speech', 'reasons');
});

test('narrator attribution inside span should be RED', () => {
  const verse = '"In that day," declares the Lord, "I will restore you."';
  const quote = '"In that day," declares the Lord, "I will restore you."';
  const result = classifySimple(quote, verse, 'the-lord', speakers);
  assertEqual(result.classification, 'RED', 'classification');
  assertIncludes(result.reasons, 'narrator_phrase_in_span', 'reasons');
});

// --- Nested quotation ---
console.log('\nNested quotation:');

test('simple nested quote (depth 2) should be YELLOW', () => {
  // Use actual curly quotes from corpus: " and '
  const verse = '\u201CSay to them, \u2018My people.\u0060\u201D';
  const quote = '\u201CSay to them, \u2018My people.\u0060\u201D';
  const result = classifySimple(quote, verse, 'the-lord', speakers);
  assertEqual(result.classification, 'YELLOW', 'classification');
  assertIncludes(result.reasons, 'nested_quotation_depth_2', 'reasons');
});

test('deep nested quote (depth 3) should be RED', () => {
  // Use actual curly quotes: " outer, ' inner, ' deeper
  const verse =
    '\u201CDo not swear, \u2018As surely as the Lord lives, \u2018truly!\u0060\u0060\u201D';
  const quote = verse;
  const result = classifySimple(quote, verse, 'the-lord', speakers);
  // This has depth 3 (outer " and two levels of inner ')
  assertEqual(result.classification, 'RED', 'classification');
});

// --- Continuation verses ---
console.log('\nContinuation verses:');

test('verse without opening quote should be YELLOW', () => {
  const verse = 'I will not show my love to her children.';
  const quote = 'I will not show my love to her children.';
  const result = classifySimple(quote, verse, 'the-lord', speakers);
  assertEqual(result.classification, 'YELLOW', 'classification');
  assertIncludes(result.reasons, 'no_opening_quote', 'reasons');
});

test('span without opening quote should be YELLOW', () => {
  const verse = 'Then the Lord said, "Go now."';
  const quote = 'Go now.';
  const result = classifySimple(quote, verse, 'the-lord', speakers);
  assertEqual(result.classification, 'YELLOW', 'classification');
  assertIncludes(result.reasons, 'span_no_opening_quote', 'reasons');
});

// --- Multiple speakers ---
console.log('\nMultiple speakers:');

test('different speakers in verse should be noted', () => {
  // This test is simplified; the full implementation checks otherSpansInVerse
  const verse = 'The Lord said, "Go." And he replied, "I will."';
  const quote = '"Go."';
  const result = classifySimple(quote, verse, 'the-lord', speakers);
  // Should be YELLOW due to quote_starts_mid_verse likely
  assert(result.classification !== 'GREEN', 'should not be GREEN');
});

// --- BROKEN cases ---
console.log('\nBROKEN cases:');

test('unknown speaker should be BROKEN', () => {
  const verse = '"Go now."';
  const quote = '"Go now."';
  const result = classifySimple(quote, verse, 'unknown-speaker', speakers);
  assertEqual(result.classification, 'BROKEN', 'classification');
  assertIncludes(result.reasons, 'unknown_speaker', 'reasons');
});

test('empty quote should be BROKEN', () => {
  const verse = '"Go now."';
  const quote = '';
  const result = classifySimple(quote, verse, 'the-lord', speakers);
  assertEqual(result.classification, 'BROKEN', 'classification');
  assertIncludes(result.reasons, 'empty_quote', 'reasons');
});

test('quote not found should be BROKEN', () => {
  const verse = '"Go now."';
  const quote = '"Something else entirely."';
  const result = classifySimple(quote, verse, 'the-lord', speakers);
  assertEqual(result.classification, 'BROKEN', 'classification');
  assertIncludes(result.reasons, 'quote_not_found', 'reasons');
});

// --- Typography ---
console.log('\nTypography:');

test('curly quotes should work', () => {
  const verse = '\u201CGo now.\u201D';
  const quote = '\u201CGo now.\u201D';
  const result = classifySimple(quote, verse, 'the-lord', speakers);
  assertEqual(result.classification, 'GREEN', 'classification');
});

// --- Summary ---
console.log('\n' + '='.repeat(50));
console.log(`\nResults: ${passed} passed, ${failed} failed`);
console.log('');

if (failed > 0) {
  process.exit(1);
}
