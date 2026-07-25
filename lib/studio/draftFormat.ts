import { DivisionMemorial, MemorialChapter } from '@/lib/types';
import { getBookBySlug } from '@/lib/bible-index';

/*
  The draft format — the plain text a memorial is written in, and the only thing
  the studio stores as prose. One rule, applied everywhere: a section may open
  with `key: value` lines, then prose. A blank line separates paragraphs, and
  "- " starts a list item.

  parseDraft and serializeDraft are inverses. That is the contract the studio
  depends on: a memorial committed today must load back into the paste box
  tomorrow as the same text.

  Reading is liberal, writing is strict. Any of — – · | or a spaced hyphen may
  separate a heading from its label; serializeDraft always emits the em dash.
*/

export interface ParsedDraft {
  memorial: DivisionMemorial;
  /** Front-matter keys that were present, so callers can tell blank from absent. */
  declared: Set<string>;
}

const HEADING = /^#\s+(.*)$/;
const SUBHEADING = /^##\s+(.*)$/;
const LIST_ITEM = /^[-*]\s+(.*)$/;
const KEY_VALUE = /^([a-zA-Z][\w-]*):\s*(.*)$/;
// The trailing \s* rather than \s+ matters: an unfinished "# Chapter 1 —" must
// still parse as chapter 1 with no theme yet, not vanish from the draft.
const SEPARATOR = /\s+[—–·|]\s*|\s+-\s+/;
/** "Chapter 1", "Ch 1", or a bare "1". */
const CHAPTER_HEADING = /^(?:chapters?|ch\.?)?\s*(\d+)$/i;

/** An empty memorial. Every array is present, so a preview can render a blank draft. */
export function emptyMemorial(): DivisionMemorial {
  return {
    bookSlug: '',
    bookName: '',
    divisionId: '',
    eyebrow: '',
    title: '',
    intro: [],
    memorialIntro: { heading: 'Memorial Stones', body: [] },
    chapters: [],
    synthesis: { eyebrow: 'The Movement', heading: '', opening: [], steps: [], closing: [] },
    canon: { title: '', principles: [] },
  };
}

interface Block {
  heading: string;
  lines: string[];
}

/** "Chapter 1 — Compromise" -> ["Chapter 1", "Compromise"] */
function splitHeading(text: string): [string, string] {
  const match = text.match(SEPARATOR);
  if (!match || match.index === undefined) {
    return [text.trim(), ''];
  }
  return [text.slice(0, match.index).trim(), text.slice(match.index + match[0].length).trim()];
}

/** Non-empty runs of lines become paragraphs; a hard-wrapped paragraph rejoins. */
function paragraphs(lines: string[]): string[] {
  const out: string[] = [];
  let current: string[] = [];

  for (const line of lines) {
    if (line.trim() === '') {
      if (current.length > 0) {
        out.push(current.join(' '));
        current = [];
      }
    } else {
      current.push(line.trim());
    }
  }
  if (current.length > 0) {
    out.push(current.join(' '));
  }
  return out;
}

/** "- one" per item; an unmarked continuation line joins the item above it. */
function listItems(lines: string[]): string[] {
  const out: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === '') continue;

    const match = trimmed.match(LIST_ITEM);
    if (match) {
      out.push(match[1].trim());
    } else if (out.length > 0) {
      out[out.length - 1] = `${out[out.length - 1]} ${trimmed}`;
    } else {
      out.push(trimmed);
    }
  }
  return out;
}

/**
 * Consume leading `key: value` lines, but only for keys the section knows.
 * A paragraph that happens to open with "Something: ..." is left as prose.
 */
function takeKeys(lines: string[], known: string[]): { values: Record<string, string>; rest: string[] } {
  const values: Record<string, string> = {};
  let i = 0;

  for (; i < lines.length; i += 1) {
    const trimmed = lines[i].trim();
    if (trimmed === '') {
      if (Object.keys(values).length === 0) continue;
      i += 1;
      break;
    }
    const match = trimmed.match(KEY_VALUE);
    if (!match || !known.includes(match[1].toLowerCase())) break;
    values[match[1].toLowerCase()] = match[2].trim();
  }

  return { values, rest: lines.slice(i) };
}

/** Split a run of lines on a heading pattern; text before the first heading is the preamble. */
function splitBlocks(lines: string[], pattern: RegExp): { preamble: string[]; blocks: Block[] } {
  const preamble: string[] = [];
  const blocks: Block[] = [];
  let current: Block | null = null;

  for (const line of lines) {
    const match = line.match(pattern);
    if (match) {
      current = { heading: match[1].trim(), lines: [] };
      blocks.push(current);
    } else if (current) {
      current.lines.push(line);
    } else {
      preamble.push(line);
    }
  }

  return { preamble, blocks };
}

/** The page renders its own quotation marks, so a pasted quote sheds them here. */
function unquote(text: string): string {
  return text.replace(/^["“”'’]+/, '').replace(/["“”'’]+$/, '').trim();
}

/** A theme is one word, so its anchor is that word lowercased. */
export function anchorFor(theme: string): string {
  return theme
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function parseChapter(number: number, theme: string, lines: string[]): MemorialChapter {
  const { blocks } = splitBlocks(lines, SUBHEADING);
  const find = (name: RegExp) => blocks.find((block) => name.test(block.heading))?.lines ?? [];

  return {
    chapter: number,
    anchor: anchorFor(theme),
    theme,
    story: paragraphs(find(/^story/i)).join(' '),
    tension: paragraphs(find(/^tension/i)).join(' '),
    revelation: paragraphs(find(/^revelation/i)).join(' '),
    memorialStones: listItems(find(/^(memorial\s+)?stones?/i)),
    quote: unquote(paragraphs(find(/^quote/i)).join(' ')),
  };
}

/**
 * Parse a draft into a complete memorial. Missing sections become safe empties
 * rather than undefined — the live preview renders every draft, however partial,
 * and `validate` is what reports the gaps.
 */
export function parseDraft(text: string): ParsedDraft {
  const memorial = emptyMemorial();
  const lines = text.replace(/\r\n?/g, '\n').split('\n');
  const { preamble, blocks } = splitBlocks(lines, HEADING);

  const front = takeKeys(preamble, ['book', 'division', 'eyebrow', 'title']).values;
  const declared = new Set(Object.keys(front));

  memorial.bookSlug = front.book ?? '';
  memorial.divisionId = front.division ?? '';
  memorial.bookName = getBookBySlug(memorial.bookSlug)?.name ?? '';
  memorial.eyebrow = front.eyebrow ?? '';
  memorial.title = front.title ?? '';

  for (const block of blocks) {
    const [label, rest] = splitHeading(block.heading);
    const chapter = label.match(CHAPTER_HEADING);

    if (chapter) {
      memorial.chapters.push(parseChapter(Number(chapter[1]), rest, block.lines));
      continue;
    }

    if (/^intro/i.test(label)) {
      memorial.intro = paragraphs(block.lines);
      continue;
    }

    if (/^synth/i.test(label)) {
      const { values, rest: body } = takeKeys(block.lines, ['eyebrow', 'heading']);
      const { blocks: parts } = splitBlocks(body, SUBHEADING);
      const find = (name: RegExp) => parts.find((part) => name.test(part.heading))?.lines ?? [];

      memorial.synthesis = {
        eyebrow: values.eyebrow || rest || 'The Movement',
        heading: values.heading || '',
        opening: paragraphs(find(/^opening/i)),
        steps: listItems(find(/^steps?/i)).map((item) => {
          const [question] = item.split(/\s*(?:→|->)\s*/);
          return { question: question.trim(), theme: '' };
        }),
        closing: paragraphs(find(/^closing/i)),
      };
      continue;
    }

    if (/^canon/i.test(label)) {
      memorial.canon = {
        title: rest || (memorial.title ? `The ${memorial.title} Canon` : ''),
        principles: listItems(block.lines),
      };
      continue;
    }

    // Anything else titles the memorial stones section, and that heading is
    // what the page renders above it.
    memorial.memorialIntro = {
      heading: block.heading.trim(),
      body: paragraphs(block.lines),
    };
  }

  // Field law: theme, anchor, and the synthesis answer are one word used three
  // times. Deriving the last two here means they cannot drift apart.
  memorial.synthesis.steps = memorial.synthesis.steps.map((step, i) => ({
    question: step.question,
    theme: memorial.chapters[i]?.theme ?? '',
  }));

  return { memorial, declared };
}

function keyLine(key: string, value: string): string {
  return `${key}: ${value}`;
}

/** The exact inverse of parseDraft. */
export function serializeDraft(memorial: DivisionMemorial): string {
  const out: string[] = [
    keyLine('book', memorial.bookSlug),
    keyLine('division', memorial.divisionId),
    keyLine('eyebrow', memorial.eyebrow),
    keyLine('title', memorial.title),
    '',
    '# Intro',
    ...memorial.intro.flatMap((paragraph, i) => (i === 0 ? [paragraph] : ['', paragraph])),
    '',
    `# ${memorial.memorialIntro.heading}`,
    ...memorial.memorialIntro.body.flatMap((paragraph, i) => (i === 0 ? [paragraph] : ['', paragraph])),
  ];

  for (const chapter of memorial.chapters) {
    out.push(
      '',
      `# Chapter ${chapter.chapter} — ${chapter.theme}`,
      '## Story',
      chapter.story,
      '## Tension',
      chapter.tension,
      '## Revelation',
      chapter.revelation,
      '## Stones',
      ...chapter.memorialStones.map((stone) => `- ${stone}`),
      '## Quote',
      chapter.quote
    );
  }

  out.push(
    '',
    '# Synthesis',
    keyLine('eyebrow', memorial.synthesis.eyebrow),
    keyLine('heading', memorial.synthesis.heading),
    '## Opening',
    ...memorial.synthesis.opening.flatMap((paragraph, i) => (i === 0 ? [paragraph] : ['', paragraph])),
    '## Steps',
    ...memorial.synthesis.steps.map((step) => `- ${step.question} → ${step.theme}`),
    '## Closing',
    ...memorial.synthesis.closing.flatMap((paragraph, i) => (i === 0 ? [paragraph] : ['', paragraph])),
    '',
    `# Canon — ${memorial.canon.title}`,
    ...memorial.canon.principles.map((principle) => `- ${principle}`),
    ''
  );

  return out.join('\n');
}

/**
 * The skeleton a division starts from, so an empty studio is never a blank page.
 * Chapter headings come from the division's own chapter list.
 */
export function draftSkeleton(
  bookSlug: string,
  divisionId: string,
  title: string,
  chapters: number[]
): string {
  const book = getBookBySlug(bookSlug);
  const range =
    chapters.length > 1
      ? `${chapters[0]}–${chapters[chapters.length - 1]}`
      : String(chapters[0] ?? '');

  const out: string[] = [
    keyLine('book', bookSlug),
    keyLine('division', divisionId),
    keyLine('eyebrow', `${book?.name ?? bookSlug} ${range}`),
    keyLine('title', title),
    '',
    '# Intro',
    '',
    '',
    '# Memorial Stones',
    '',
  ];

  for (const chapter of chapters) {
    out.push(
      '',
      `# Chapter ${chapter} — `,
      '## Story',
      '',
      '## Tension',
      '',
      '## Revelation',
      '',
      '## Stones',
      '- ',
      '## Quote',
      ''
    );
  }

  out.push(
    '',
    '# Synthesis',
    keyLine('eyebrow', 'The Movement'),
    keyLine('heading', ''),
    '## Opening',
    '',
    '## Steps',
    ...chapters.map(() => '- '),
    '## Closing',
    '',
    '',
    `# Canon — The ${title} Canon`,
    '- ',
    ''
  );

  return out.join('\n');
}
