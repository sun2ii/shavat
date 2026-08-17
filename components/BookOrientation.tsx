import Link from 'next/link';
import {
  BookOrientation as BookOrientationData,
  OrientationSection,
} from '@/lib/types';
import { readingPath } from '@/lib/routes';
import { getAllDivisions } from '@/lib/book-metadata-utils';
import CopyHeading from './CopyHeading';

/*
  Clipboard payloads, same contract as the memorials: every heading copies
  exactly the block it titles, diagrams included. Serialized on the server.
*/
function sectionText(section: OrientationSection): string {
  const parts: string[] = [section.heading, ''];

  if (section.body) parts.push(...section.body, '');
  if (section.figures) {
    for (const figure of section.figures) {
      parts.push(figure.art);
      if (figure.caption) parts.push(figure.caption);
      parts.push('');
    }
  }
  if (section.entries) {
    for (const entry of section.entries) {
      parts.push(`${entry.term}${entry.role ? ` — ${entry.role}` : ''}`, entry.detail, '');
    }
  }
  if (section.themes) {
    for (const theme of section.themes) {
      parts.push(
        theme.name,
        `What it is: ${theme.definition}`,
        `Where it appears: ${theme.appears}`,
        `Why it matters: ${theme.matters}`,
        ''
      );
    }
  }
  if (section.reversals) {
    for (const reversal of section.reversals) {
      parts.push(`${reversal.from} → ${reversal.to}`, reversal.note, '');
    }
  }
  if (section.closing) parts.push(...section.closing);

  return parts.join('\n').trim();
}

function orientationText(book: BookOrientationData): string {
  return [
    `${book.title} — ${book.subtitle}`,
    book.scripture,
    '',
    book.summary,
    '',
    ...book.sections.map(sectionText),
  ].join('\n\n');
}

/**
 * A diagram. Held in its own scroll container so a wide figure never drags the
 * page sideways on a narrow screen.
 */
function Figure({ art, caption }: { art: string; caption?: string }) {
  return (
    <figure className="my-8">
      <div className="overflow-x-auto rounded-xl border border-hairline bg-paper-2 px-5 py-6">
        <pre className="font-mono text-[12px] md:text-[13px] leading-[1.7] text-muted whitespace-pre w-max">
          {art}
        </pre>
      </div>
      {caption ? (
        <figcaption className="mt-3 font-sans text-[11px] uppercase tracking-[0.14em] text-faint">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function Paragraphs({ body }: { body: string[] }) {
  return (
    <div className="space-y-5">
      {body.map((paragraph) => (
        <p key={paragraph} className="font-serif text-[19px] leading-[1.85] text-muted">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

/**
 * A book orientation: the map read before the first verse. Sections carry
 * whichever primitives they need — prose, diagrams, named entries, themes,
 * reversals — and render in one invariant order.
 */
export default function BookOrientation({ book }: { book: BookOrientationData }) {
  const divisions = getAllDivisions(book.slug);

  return (
    <main className="max-w-[760px] mx-auto scroll-smooth">
      {/* Cover */}
      <header className="text-center pt-6 pb-10">
        <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-muted mb-4">
          {book.scripture}
        </p>

        <h1 className="mb-3">
          <CopyHeading
            text={orientationText(book)}
            title="Copy the whole orientation"
            className="font-serif text-4xl md:text-5xl leading-tight text-center"
          >
            {book.title}
          </CopyHeading>
        </h1>

        <p className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-gold-ink mb-8">
          {book.subtitle}
        </p>

        <p className="font-serif italic text-[21px] md:text-[23px] leading-[1.7] text-ink text-left">
          {book.summary}
        </p>

        {book.place ? (
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-faint mt-6">
            Think <span className="text-purple-400">{book.place.city}</span>: {book.place.vibe}
          </p>
        ) : null}
      </header>

      <hr className="border-hairline" />

      {/* Contents — the shape of the orientation itself */}
      <nav className="py-8" aria-label="Contents">
        <ol className="grid sm:grid-cols-2 gap-x-8">
          {book.sections.map((section, i) => (
            <li key={section.id} className="border-t border-hairline first:border-t-0 sm:[&:nth-child(2)]:border-t-0">
              <a
                href={`#${section.id}`}
                className="group grid grid-cols-[2.25rem_1fr] items-baseline py-3 cursor-pointer rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
              >
                <span className="font-sans text-[11px] text-faint tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-serif text-[17px] text-muted group-hover:text-gold transition-colors duration-150">
                  {section.heading}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* The sections */}
      {book.sections.map((section, i) => (
        <section
          key={section.id}
          id={section.id}
          className="pt-12 pb-14 border-t border-hairline scroll-mt-24"
        >
          <p className="font-sans text-[11px] text-faint tabular-nums mb-3">
            {String(i + 1).padStart(2, '0')}
          </p>

          <h2 className="mb-6">
            <CopyHeading
              text={sectionText(section)}
              className="font-serif text-3xl md:text-4xl text-left"
            >
              {section.heading}
            </CopyHeading>
          </h2>

          {section.body ? <Paragraphs body={section.body} /> : null}

          {section.figures?.map((figure) => (
            <Figure key={figure.art} art={figure.art} caption={figure.caption} />
          ))}

          {/* Named things: people, places, books, words */}
          {section.entries ? (
            <dl className="mt-8">
              {section.entries.map((entry) => (
                <div key={entry.term} className="border-t border-hairline py-5">
                  <dt className="flex items-baseline justify-between gap-4 mb-2">
                    <span className="font-sans text-[11px] uppercase tracking-[0.18em] font-semibold text-ink">
                      {entry.term}
                    </span>
                    {entry.role ? (
                      <span className="font-sans text-[11px] uppercase tracking-[0.16em] text-faint whitespace-nowrap">
                        {entry.role}
                      </span>
                    ) : null}
                  </dt>
                  <dd className="font-serif text-[18px] leading-[1.75] text-muted">
                    {entry.detail}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {/* Themes carry three fixed questions, always in this order */}
          {section.themes ? (
            <div className="mt-4">
              {section.themes.map((theme) => (
                <div key={theme.name} className="border-t border-hairline py-6">
                  <h3 className="font-serif text-2xl text-ink mb-4">{theme.name}</h3>
                  <dl className="space-y-3">
                    {[
                      ['What it is', theme.definition],
                      ['Where it appears', theme.appears],
                      ['Why it matters', theme.matters],
                    ].map(([label, text]) => (
                      <div key={label} className="grid md:grid-cols-[9.5rem_1fr] gap-y-1 gap-x-4">
                        <dt className="font-sans text-[10px] uppercase tracking-[0.18em] text-faint md:pt-[7px]">
                          {label}
                        </dt>
                        <dd className="font-serif text-[18px] leading-[1.75] text-muted">
                          {text}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          ) : null}

          {/* Reversals, stated as the movement they are */}
          {section.reversals ? (
            <dl className="mt-4">
              {section.reversals.map((reversal) => (
                <div key={reversal.from} className="border-t border-hairline py-5">
                  <dt className="flex items-baseline gap-3 mb-2">
                    <span className="font-sans text-[11px] uppercase tracking-[0.18em] font-semibold text-ink">
                      {reversal.from}
                    </span>
                    <span className="font-mono text-[12px] text-faint">──►</span>
                    <span className="font-sans text-[11px] uppercase tracking-[0.18em] font-semibold text-gold-ink">
                      {reversal.to}
                    </span>
                  </dt>
                  <dd className="font-serif text-[18px] leading-[1.75] text-muted">
                    {reversal.note}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {section.closing ? (
            <div className="mt-8">
              <Paragraphs body={section.closing} />
            </div>
          ) : null}
        </section>
      ))}

      {/* The orientation ends where the reading begins */}
      {divisions.length > 0 ? (
        <section className="mb-16 pt-12 border-t border-hairline">
          <h2 className="font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-gold-ink mb-8">
            Begin Reading
          </h2>

          <ol>
            {divisions.map((division, i) => (
              <li key={division.id} className="border-t border-hairline first:border-t-0">
                <Link
                  href={readingPath(book.slug, division.id, division.chapters[0])}
                  className="group block py-5 cursor-pointer rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                >
                  <div className="grid grid-cols-[2.25rem_1fr] items-baseline">
                    <span className="font-sans text-[11px] text-faint tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div>
                      <div className="flex items-baseline justify-between gap-4 mb-1.5">
                        <h3 className="font-serif text-2xl text-ink group-hover:text-gold transition-colors duration-150">
                          {division.title}
                        </h3>
                        <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-faint whitespace-nowrap">
                          {book.title} {division.chapters[0]}
                          {division.chapters.length > 1
                            ? `–${division.chapters[division.chapters.length - 1]}`
                            : ''}
                        </span>
                      </div>
                      <p className="font-serif text-[18px] leading-[1.7] text-muted">
                        {division.summary}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </main>
  );
}
