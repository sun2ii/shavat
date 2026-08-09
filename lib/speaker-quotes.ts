// Client-safe types and tokenizer for speaker-attributed dialogue
// (data/speakers/<book>.json). The server loader lives in lib/speakers.ts.

export interface SpeakerDef {
  name: string;
  /* Palette slot 1–10, resolved to the --speaker-N CSS var pair. */
  color: number;
}

export interface QuoteSpan {
  verse: number;
  speaker: string;
  /*
    Verbatim substring of the verse's text, quote marks included. Substring
    matching is the one addressing scheme the source text can't sabotage:
    backtick doubles as apostrophe and closing single quote, so anything that
    counts or pairs quote characters misfires.
  */
  quote: string;
}

export interface ChapterSpeakers {
  /* Only the speakers appearing in this chapter — the legend reads this directly. */
  speakers: Record<string, SpeakerDef>;
  spans: QuoteSpan[];
}

export interface VerseRun {
  text: string;
  speaker?: string;
}

/*
  Split a verse into narration and speaker runs. Spans arrive in document
  order; a forward cursor disambiguates repeated phrases. A span that doesn't
  match is dropped silently — the verse renders plain rather than broken, and
  scripts/validate-speakers.ts is the loud path for data drift.
*/
export function tokenizeVerse(
  text: string,
  spans: Pick<QuoteSpan, 'speaker' | 'quote'>[]
): VerseRun[] {
  if (spans.length === 0) return [{ text }];

  const runs: VerseRun[] = [];
  let cursor = 0;

  for (const span of spans) {
    let idx = text.indexOf(span.quote, cursor);
    if (idx === -1) idx = text.indexOf(span.quote);
    if (idx === -1 || idx < cursor) continue;

    if (idx > cursor) runs.push({ text: text.slice(cursor, idx) });
    runs.push({ text: span.quote, speaker: span.speaker });
    cursor = idx + span.quote.length;
  }

  if (cursor < text.length) runs.push({ text: text.slice(cursor) });
  return runs.length > 0 ? runs : [{ text }];
}
