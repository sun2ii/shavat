import { DivisionMemorial } from '@/lib/types';
import { anchorFor } from './draftFormat';
import { hasStraightTypography } from './typography';

/*
  The checklist in prompt/writings.md §9, mechanized. Blocking issues are the
  ones that would produce a page that is wrong rather than unfinished — a
  chapter that does not belong to the division, a theme that is not one word,
  a synthesis that does not answer every chapter. Everything else is a warning,
  because the template's counts are a discipline, not a schema.

  Pure: the expected chapter numbers are passed in, so the same function runs in
  the browser for live feedback and on the server before a commit.
*/

export interface Issue {
  level: 'block' | 'warn';
  /** The id of the field group to scroll to. */
  field: string;
  message: string;
}

export function validate(
  memorial: DivisionMemorial,
  expectedChapters: number[],
  draft?: string
): Issue[] {
  const issues: Issue[] = [];
  const block = (field: string, message: string) => issues.push({ level: 'block', field, message });
  const warn = (field: string, message: string) => issues.push({ level: 'warn', field, message });

  if (!memorial.bookSlug) block('front', 'No book. Add a `book:` line.');
  if (!memorial.divisionId) block('front', 'No division. Add a `division:` line.');
  if (!memorial.bookName) block('front', `“${memorial.bookSlug}” is not a book slug in the canon index.`);
  if (!memorial.title.trim()) block('front', 'No title. Add a `title:` line.');
  if (!memorial.eyebrow.trim()) block('front', 'No eyebrow. Add an `eyebrow:` line, e.g. “Judges 1–2”.');

  if (memorial.intro.length === 0) block('intro', 'The intro is empty.');
  if (memorial.memorialIntro.body.length === 0) {
    block('stones-intro', 'The memorial stones introduction is empty.');
  }

  if (memorial.chapters.length === 0) {
    block('chapters', 'No chapter sections. Each needs a `# Chapter N — Theme` heading.');
  }

  const found = memorial.chapters.map((chapter) => chapter.chapter);
  const missing = expectedChapters.filter((chapter) => !found.includes(chapter));
  const extra = found.filter((chapter) => !expectedChapters.includes(chapter));

  if (missing.length > 0) {
    block('chapters', `This division covers ${expectedChapters.join(', ')}. Missing ${missing.join(', ')}.`);
  }
  if (extra.length > 0) {
    block('chapters', `Chapter ${extra.join(', ')} is not part of this division.`);
  }

  for (const chapter of memorial.chapters) {
    const field = `chapter-${chapter.chapter}`;
    const where = `Chapter ${chapter.chapter}`;

    if (!chapter.theme.trim()) {
      block(field, `${where} has no theme. Put it after the heading: \`# Chapter ${chapter.chapter} — Theme\`.`);
    } else if (/\s/.test(chapter.theme.trim())) {
      block(field, `${where} theme “${chapter.theme}” is more than one word. A theme is one capacity.`);
    } else if (anchorFor(chapter.theme) === '') {
      block(field, `${where} theme “${chapter.theme}” produces no anchor id.`);
    }

    if (!chapter.story.trim()) block(field, `${where} has no story.`);
    if (!chapter.tension.trim()) block(field, `${where} has no tension.`);
    if (!chapter.revelation.trim()) block(field, `${where} has no revelation.`);
    if (!chapter.quote.trim()) block(field, `${where} has no quote.`);

    if (chapter.tension.trim() && !chapter.tension.trim().endsWith('?')) {
      warn(field, `${where} tension is not a question. It should ask what the chapter asks.`);
    }
    if (chapter.memorialStones.length === 0) {
      block(field, `${where} has no memorial stones.`);
    } else if (chapter.memorialStones.length < 5 || chapter.memorialStones.length > 8) {
      warn(field, `${where} has ${chapter.memorialStones.length} stones. The template asks for 5–8.`);
    }
  }

  const anchors = memorial.chapters.map((chapter) => chapter.anchor).filter(Boolean);
  const duplicated = anchors.filter((anchor, i) => anchors.indexOf(anchor) !== i);
  if (duplicated.length > 0) {
    block('chapters', `Two chapters share the theme “${duplicated[0]}”. Anchors must be distinct.`);
  }

  if (!memorial.synthesis.heading.trim()) {
    block('synthesis', 'The synthesis has no heading. Add a `heading:` line under `# Synthesis`.');
  }
  if (memorial.synthesis.opening.length === 0) block('synthesis', 'The synthesis opening is empty.');
  if (memorial.synthesis.closing.length === 0) block('synthesis', 'The synthesis closing is empty.');

  if (memorial.synthesis.steps.length !== memorial.chapters.length) {
    block(
      'synthesis',
      `${memorial.synthesis.steps.length} synthesis step(s) for ${memorial.chapters.length} chapter(s). One question per chapter, in order.`
    );
  }
  memorial.synthesis.steps.forEach((step, i) => {
    if (!step.question.trim()) block('synthesis', `Synthesis step ${i + 1} has no question.`);
  });

  if (!memorial.canon.title.trim()) block('canon', 'The canon has no title.');
  if (memorial.canon.principles.length === 0) {
    block('canon', 'The canon is empty.');
  } else if (memorial.canon.principles.length !== 5) {
    warn('canon', `The canon has ${memorial.canon.principles.length} principles. The template asks for 5.`);
  }

  if (draft && hasStraightTypography(draft)) {
    warn('front', 'Straight quotes or hyphens are present. Every other memorial is set in ’ “ ” –.');
  }

  return issues;
}

export function isBlocked(issues: Issue[]): boolean {
  return issues.some((issue) => issue.level === 'block');
}
