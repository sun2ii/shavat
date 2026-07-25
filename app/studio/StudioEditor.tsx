'use client';

import { useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import { DivisionMemorial as DivisionMemorialData } from '@/lib/types';
import DivisionMemorial from '@/components/DivisionMemorial';
import { parseDraft, serializeDraft, draftSkeleton } from '@/lib/studio/draftFormat';
import { Issue, isBlocked, validate } from '@/lib/studio/validate';
import { typographize } from '@/lib/studio/typography';
import { writingPath } from '@/lib/routes';

export interface DivisionOption {
  id: string;
  title: string;
  chapters: number[];
}

export interface BookOption {
  slug: string;
  name: string;
  divisions: DivisionOption[];
}

/* Shared interaction styling. Every control that can be pressed carries the
   pointer, a hover state, a focus ring, and the same 150ms transition. */
const CONTROL =
  'cursor-pointer transition-colors duration-150 focus-visible:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1 focus-visible:ring-offset-paper ' +
  'disabled:cursor-not-allowed disabled:opacity-40';

const BUTTON = `${CONTROL} font-sans text-[11px] uppercase tracking-[0.16em] font-semibold px-3 py-2 border border-hairline rounded hover:border-gold hover:text-gold-ink`;

const FIELD =
  'w-full bg-paper-2 border border-hairline rounded px-3 py-2 font-serif text-[15px] leading-[1.7] text-ink ' +
  'transition-colors duration-150 focus:outline-none focus:border-gold focus-visible:ring-1 focus-visible:ring-gold';

const LABEL = 'block font-sans text-[10px] uppercase tracking-[0.2em] text-faint mb-1.5';

/* Conversions between a textarea and the shapes the memorial holds. Prose
   fields are separated by blank lines; list fields by newlines, because that is
   how the stones and the canon are actually pasted. */
const asProse = (items: string[]) => items.join('\n\n');
const toProse = (text: string) =>
  text
    .split(/\n\s*\n/)
    .map((part) => part.trim().replace(/\s*\n\s*/g, ' '))
    .filter(Boolean);

const asLines = (items: string[]) => items.join('\n');
const toLines = (text: string) =>
  text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

export default function StudioEditor({ books, live }: { books: BookOption[]; live: boolean }) {
  const [bookSlug, setBookSlug] = useState(books[0]?.slug ?? '');
  const [divisionId, setDivisionId] = useState('');
  const [draft, setDraft] = useState('');

  const [mode, setMode] = useState<'draft' | 'fields'>('draft');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ tone: 'ok' | 'bad'; text: string; href?: string } | null>(null);

  const book = books.find((entry) => entry.slug === bookSlug);
  const division = book?.divisions.find((entry) => entry.id === divisionId);

  const { memorial } = useMemo(() => parseDraft(draft), [draft]);
  const issues = useMemo(
    () => (division ? validate(memorial, division.chapters, draft) : []),
    [memorial, division, draft]
  );
  const blocked = isBlocked(issues);

  const loadDraft = useCallback(
    async (nextBook: string, nextDivision: DivisionOption) => {
      setLoading(true);
      setNotice(null);
      try {
        const response = await fetch(
          `/api/studio/draft?book=${encodeURIComponent(nextBook)}&division=${encodeURIComponent(nextDivision.id)}`
        );
        const data = await response.json();

        if (!response.ok) {
          setNotice({ tone: 'bad', text: data.error ?? 'Could not load the draft.' });
          setDraft(draftSkeleton(nextBook, nextDivision.id, nextDivision.title, nextDivision.chapters));
          return;
        }

        if (data.draft) {
          setDraft(data.draft);
          setMode('fields');
        } else {
          setDraft(draftSkeleton(nextBook, nextDivision.id, nextDivision.title, nextDivision.chapters));
          setMode('draft');
          if (data.written) {
            setNotice({
              tone: 'bad',
              text: 'A memorial exists here but has no draft file. Saving will overwrite it.',
            });
          }
        }
      } catch {
        setNotice({ tone: 'bad', text: 'Could not reach the server.' });
      } finally {
        setLoading(false);
      }
    },
    []
  );

  function pickBook(slug: string) {
    setBookSlug(slug);
    setDivisionId('');
    setDraft('');
    setNotice(null);
  }

  function pickDivision(id: string) {
    setDivisionId(id);
    const next = books.find((entry) => entry.slug === bookSlug)?.divisions.find((entry) => entry.id === id);
    if (next) void loadDraft(bookSlug, next);
  }

  /* Field edits write through the draft, not around it. Serializing means the
     parser re-derives anchors and synthesis themes, so the three can never
     disagree no matter which pane the change was made in. */
  const edit = useCallback(
    (mutate: (next: DivisionMemorialData) => void) => {
      const next = JSON.parse(JSON.stringify(memorial)) as DivisionMemorialData;
      mutate(next);
      setDraft(serializeDraft(next));
    },
    [memorial]
  );

  function goToField(field: string) {
    setMode('fields');
    requestAnimationFrame(() => {
      document.getElementById(`field-${field}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  async function save() {
    if (!division || blocked) return;
    setSaving(true);
    setNotice(null);
    try {
      const response = await fetch('/api/studio/commit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ book: bookSlug, division: divisionId, draft }),
      });
      const data = await response.json();

      if (!response.ok) {
        setNotice({ tone: 'bad', text: data.error ?? 'The save failed.' });
        return;
      }

      setNotice({
        tone: 'ok',
        text: `Wrote ${data.paths.length} files. Commit them when you are ready.`,
        href: data.path,
      });
    } catch {
      setNotice({ tone: 'bad', text: 'Could not reach the server.' });
    } finally {
      setSaving(false);
    }
  }

  if (!live) {
    return (
      <Shell>
        <p className="font-serif text-[19px] leading-[1.85] text-muted">
          The studio writes files into the repository, so it only runs under{' '}
          <Code>npm run dev</Code>. Write the memorial locally, then commit it.
        </p>
      </Shell>
    );
  }

  return (
    <main className="lg:max-w-none mx-auto">
      <header className="pb-6 mb-6 border-b border-hairline">
        <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-muted mb-3">Studio</p>

        <div className="flex flex-wrap items-end gap-3">
          <div>
            <label htmlFor="studio-book" className={LABEL}>
              Book
            </label>
            <select
              id="studio-book"
              value={bookSlug}
              onChange={(event) => pickBook(event.target.value)}
              className={`${FIELD} ${CONTROL} font-sans text-[13px] w-auto pr-8`}
            >
              {books.map((entry) => (
                <option key={entry.slug} value={entry.slug}>
                  {entry.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="studio-division" className={LABEL}>
              Division
            </label>
            <select
              id="studio-division"
              value={divisionId}
              onChange={(event) => pickDivision(event.target.value)}
              className={`${FIELD} ${CONTROL} font-sans text-[13px] w-auto pr-8`}
            >
              <option value="">Choose a movement…</option>
              {book?.divisions.map((entry) => (
                <option key={entry.id} value={entry.id}>
                  {entry.title} · {entry.chapters[0]}
                  {entry.chapters.length > 1 ? `–${entry.chapters[entry.chapters.length - 1]}` : ''}
                </option>
              ))}
            </select>
          </div>

          {division && (
            <Link
              href={writingPath(bookSlug, divisionId)}
              target="_blank"
              className={`${CONTROL} font-sans text-[11px] text-muted hover:text-ink self-center pb-2`}
            >
              View live →
            </Link>
          )}
        </div>
      </header>

      {!division ? (
        <p className="font-serif text-[19px] leading-[1.85] text-muted">
          Choose a movement. If it already has a memorial, its draft loads here; if not, you get an
          empty skeleton with one section per chapter.
        </p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: the draft, or the fields it parsed into */}
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-4">
              {(['draft', 'fields'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setMode(option)}
                  aria-pressed={mode === option}
                  className={`${BUTTON} ${
                    mode === option ? 'border-gold text-gold-ink' : 'text-muted'
                  }`}
                >
                  {option}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setDraft(typographize(draft))}
                className={`${BUTTON} text-muted ml-auto`}
                title="Straight quotes and hyphens to ’ “ ” –"
              >
                Fix typography
              </button>
            </div>

            {loading ? (
              <p className="font-serif text-[17px] text-faint">Loading…</p>
            ) : mode === 'draft' ? (
              <textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                spellCheck
                className={`${FIELD} font-mono text-[13px] leading-[1.7] h-[70vh] resize-y`}
                placeholder="Paste the finished memorial here."
              />
            ) : (
              <Fields memorial={memorial} edit={edit} />
            )}

            <IssuePanel issues={issues} onJump={goToField} />

            <div className="mt-6 flex items-center gap-4 flex-wrap">
              <button
                type="button"
                onClick={save}
                disabled={blocked || saving}
                className={`${BUTTON} ${
                  blocked || saving ? '' : 'border-gold text-gold-ink hover:bg-paper-2'
                }`}
              >
                {saving ? 'Writing…' : 'Write the files'}
              </button>

              {blocked && (
                <span className="font-sans text-[11px] text-faint">
                  Resolve the blocking issues first.
                </span>
              )}

              {notice && (
                <p
                  className={`font-serif text-[15px] ${
                    notice.tone === 'ok' ? 'text-muted' : 'text-gold-ink'
                  }`}
                >
                  {notice.text}{' '}
                  {notice.href && (
                    <Link
                      href={notice.href}
                      target="_blank"
                      className={`${CONTROL} underline hover:text-ink`}
                    >
                      Open it
                    </Link>
                  )}
                </p>
              )}
            </div>
          </div>

          {/* Right: the real component, so what you see is what ships */}
          <div className="min-w-0 lg:sticky lg:top-6">
            <p className={LABEL}>Preview</p>
            <div className="border border-hairline rounded-2xl px-5 md:px-8 h-[80vh] overflow-y-auto">
              <DivisionMemorial memorial={memorial} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-[760px] mx-auto py-10">
      <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-muted mb-4">Studio</p>
      {children}
    </main>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return <code className="font-sans text-[13px] text-ink">{children}</code>;
}

function IssuePanel({ issues, onJump }: { issues: Issue[]; onJump: (field: string) => void }) {
  if (issues.length === 0) {
    return (
      <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.18em] text-gold-ink">
        Clean — every check in the template passes.
      </p>
    );
  }

  return (
    <ul className="mt-6">
      {issues.map((issue, i) => (
        <li key={`${issue.field}-${i}`} className="border-t border-hairline first:border-t-0">
          <button
            type="button"
            onClick={() => onJump(issue.field)}
            className={`${CONTROL} w-full text-left grid grid-cols-[4.5rem_1fr] items-baseline gap-3 py-2.5 hover:bg-paper-2 rounded`}
          >
            <span
              className={`font-sans text-[10px] uppercase tracking-[0.16em] font-semibold ${
                issue.level === 'block' ? 'text-gold-ink' : 'text-faint'
              }`}
            >
              {issue.level === 'block' ? 'Blocks' : 'Check'}
            </span>
            <span className="font-serif text-[15px] leading-[1.6] text-muted">{issue.message}</span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function Group({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details id={`field-${id}`} open className="scroll-mt-6 border-t border-hairline py-4 first:border-t-0">
      <summary
        className={`${CONTROL} font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-muted hover:text-ink list-none marker:hidden`}
      >
        {title}
      </summary>
      <div className="mt-4 space-y-4">{children}</div>
    </details>
  );
}

function Line({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className={LABEL}>{label}</label>
      <input value={value} onChange={(event) => onChange(event.target.value)} className={FIELD} />
    </div>
  );
}

function Area({
  label,
  value,
  onChange,
  hint,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className={LABEL}>
        {label}
        {hint && <span className="normal-case tracking-normal text-faint"> · {hint}</span>}
      </label>
      <textarea
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        spellCheck
        className={`${FIELD} resize-y`}
      />
    </div>
  );
}

function Fields({
  memorial,
  edit,
}: {
  memorial: DivisionMemorialData;
  edit: (mutate: (next: DivisionMemorialData) => void) => void;
}) {
  return (
    <div>
      <Group id="front" title="Division">
        <Line
          label="Eyebrow"
          value={memorial.eyebrow}
          onChange={(value) => edit((next) => void (next.eyebrow = value))}
        />
        <Line
          label="Title"
          value={memorial.title}
          onChange={(value) => edit((next) => void (next.title = value))}
        />
      </Group>

      <Group id="intro" title="Intro">
        <Area
          label="Paragraphs"
          hint="blank line between them"
          rows={6}
          value={asProse(memorial.intro)}
          onChange={(value) => edit((next) => void (next.intro = toProse(value)))}
        />
      </Group>

      <Group id="stones-intro" title="Memorial stones introduction">
        <Line
          label="Heading"
          value={memorial.memorialIntro.heading}
          onChange={(value) => edit((next) => void (next.memorialIntro.heading = value))}
        />
        <Area
          label="Paragraphs"
          hint="blank line between them"
          rows={6}
          value={asProse(memorial.memorialIntro.body)}
          onChange={(value) => edit((next) => void (next.memorialIntro.body = toProse(value)))}
        />
      </Group>

      <div id="field-chapters">
        {memorial.chapters.length === 0 && (
          <p className="border-t border-hairline py-4 font-serif text-[15px] text-faint">
            No chapters parsed. Each needs a <Code>{'# Chapter N — Theme'}</Code> heading in the draft.
          </p>
        )}

        {memorial.chapters.map((chapter, index) => (
          <Group
            key={chapter.chapter}
            id={`chapter-${chapter.chapter}`}
            title={`${memorial.bookName || memorial.bookSlug} ${chapter.chapter} — ${chapter.theme || 'untitled'}`}
          >
            <Line
              label="Theme · one word, and also the anchor"
              value={chapter.theme}
              onChange={(value) => edit((next) => void (next.chapters[index].theme = value))}
            />
            <Area
              label="Story"
              hint="2–4 sentences, concrete"
              value={chapter.story}
              onChange={(value) => edit((next) => void (next.chapters[index].story = value))}
            />
            <Area
              label="Tension"
              hint="a question in the narrative’s terms"
              rows={2}
              value={chapter.tension}
              onChange={(value) => edit((next) => void (next.chapters[index].tension = value))}
            />
            <Area
              label="Revelation"
              hint="2–4 sentences answering the tension"
              value={chapter.revelation}
              onChange={(value) => edit((next) => void (next.chapters[index].revelation = value))}
            />
            <Area
              label="Memorial stones"
              hint="one per line, 5–8"
              rows={7}
              value={asLines(chapter.memorialStones)}
              onChange={(value) =>
                edit((next) => void (next.chapters[index].memorialStones = toLines(value)))
              }
            />
            <Line
              label="Quote"
              value={chapter.quote}
              onChange={(value) => edit((next) => void (next.chapters[index].quote = value))}
            />
          </Group>
        ))}
      </div>

      <Group id="synthesis" title="Synthesis">
        <Line
          label="Eyebrow"
          value={memorial.synthesis.eyebrow}
          onChange={(value) => edit((next) => void (next.synthesis.eyebrow = value))}
        />
        <Line
          label="Heading"
          value={memorial.synthesis.heading}
          onChange={(value) => edit((next) => void (next.synthesis.heading = value))}
        />
        <Area
          label="Opening"
          hint="blank line between paragraphs"
          value={asProse(memorial.synthesis.opening)}
          onChange={(value) => edit((next) => void (next.synthesis.opening = toProse(value)))}
        />
        <Area
          label="Steps"
          hint="one question per line, in chapter order — the answer is that chapter’s theme"
          rows={memorial.chapters.length + 1}
          value={asLines(memorial.synthesis.steps.map((step) => step.question))}
          onChange={(value) =>
            edit(
              (next) =>
                void (next.synthesis.steps = toLines(value).map((question) => ({
                  question,
                  theme: '',
                })))
            )
          }
        />
        <Area
          label="Closing"
          hint="what the division formed in the people"
          value={asProse(memorial.synthesis.closing)}
          onChange={(value) => edit((next) => void (next.synthesis.closing = toProse(value)))}
        />
      </Group>

      <Group id="canon" title="Canon">
        <Line
          label="Title"
          value={memorial.canon.title}
          onChange={(value) => edit((next) => void (next.canon.title = value))}
        />
        <Area
          label="Principles"
          hint="one imperative per line, 5"
          rows={6}
          value={asLines(memorial.canon.principles)}
          onChange={(value) => edit((next) => void (next.canon.principles = toLines(value)))}
        />
      </Group>
    </div>
  );
}
