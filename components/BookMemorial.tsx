import Link from 'next/link';
import { BookMemorial as BookMemorialData } from '@/lib/types';
import { readingPath, writingPath } from '@/lib/routes';
import CopyHeading from './CopyHeading';

/*
  Clipboard payloads, same contract as the division memorial: each heading
  copies exactly the block it titles. Serialized on the server.
*/
function themeText(book: BookMemorialData): string {
  return [book.theme.heading, '', ...book.theme.body].join('\n\n');
}

function divisionsText(book: BookMemorialData): string {
  return book.divisions
    .map((d) => `${d.title} · ${d.scripture}\n${d.summary}`)
    .join('\n\n');
}

function synthesisText(book: BookMemorialData): string {
  return [
    book.synthesis.heading,
    '',
    ...book.synthesis.opening,
    '',
    ...book.synthesis.steps.map((s) => `${s.question}\n— ${s.answer}`),
    '',
    ...book.synthesis.closing,
  ].join('\n\n');
}

function canonText(book: BookMemorialData): string {
  return [
    book.canon.title,
    '',
    ...book.canon.principles.map((p, i) => `${i + 1}. ${p}`),
  ].join('\n');
}

function bookText(book: BookMemorialData): string {
  return [
    `${book.title} — ${book.subtitle}`,
    book.scripture,
    '',
    ...book.summary,
    '',
    `${book.keyVerse.text}\n— ${book.keyVerse.reference}`,
    '',
    themeText(book),
    '',
    divisionsText(book),
    '',
    synthesisText(book),
    '',
    canonText(book),
  ].join('\n\n');
}

/**
 * A book memorial: what the whole book is doing, and the movements it moves
 * through. Each movement links to its own memorial; headings copy their block.
 */
export default function BookMemorial({ book }: { book: BookMemorialData }) {
  return (
    <main className="max-w-[760px] mx-auto scroll-smooth">
      {/* Hero */}
      <header className="text-center pt-6 pb-10">
        <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-muted mb-4">
          {book.scripture}
        </p>

        <h1 className="mb-3">
          <CopyHeading
            text={bookText(book)}
            className="font-serif text-4xl md:text-5xl leading-tight text-center"
          >
            {book.title}
          </CopyHeading>
        </h1>

        <p className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-gold-ink mb-8">
          {book.subtitle}
        </p>

        <div className="text-left space-y-5">
          {book.summary.map((paragraph) => (
            <p key={paragraph} className="font-serif text-[19px] leading-[1.85] text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </header>

      <hr className="border-hairline" />

      {/* Key verse */}
      <section className="py-10 text-center">
        <blockquote className="font-serif italic text-[22px] md:text-[24px] leading-[1.7] text-ink mb-4">
          “{book.keyVerse.text}”
        </blockquote>
        <Link
          href={readingPath(book.slug)}
          className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted hover:text-ink transition-colors"
        >
          {book.keyVerse.reference}
        </Link>
      </section>

      <hr className="border-hairline" />

      {/* Theme */}
      <section className="py-10">
        <h2 className="mb-4">
          <CopyHeading
            text={themeText(book)}
            className="font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-left"
            restClass="text-gold-ink hover:text-gold"
          >
            {book.theme.heading}
          </CopyHeading>
        </h2>
        <div className="space-y-4">
          {book.theme.body.map((paragraph) => (
            <p key={paragraph} className="font-serif text-[19px] leading-[1.85] text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* The movements, each a doorway into its own memorial */}
      <section className="pt-12 pb-14 border-t border-hairline">
        <h2 className="mb-8">
          <CopyHeading
            text={divisionsText(book)}
            className="font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-left"
            restClass="text-gold-ink hover:text-gold"
          >
            The Movements
          </CopyHeading>
        </h2>

        <ol>
          {book.divisions.map((division, i) => (
            <li key={division.id} className="border-t border-hairline first:border-t-0">
              <Link href={writingPath(book.slug, division.id)} className="group block py-6">
                <div className="grid grid-cols-[2.25rem_1fr] items-baseline">
                  <span className="font-sans text-[11px] text-faint tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div>
                    <div className="flex items-baseline justify-between gap-4 mb-2">
                      <h3 className="font-serif text-2xl md:text-3xl text-ink group-hover:text-gold transition-colors">
                        {division.title}
                      </h3>
                      <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-faint whitespace-nowrap">
                        {division.scripture}
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

      {/* Synthesis */}
      <section className="pt-12 pb-14 border-t border-hairline">
        <h2 className="mb-8">
          <CopyHeading
            text={synthesisText(book)}
            className="font-serif text-3xl md:text-4xl text-left"
          >
            {book.synthesis.heading}
          </CopyHeading>
        </h2>

        <div className="space-y-5 mb-10">
          {book.synthesis.opening.map((paragraph) => (
            <p key={paragraph} className="font-serif text-[19px] leading-[1.85] text-muted">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Each movement as the question it answers */}
        <dl className="mb-10">
          {book.synthesis.steps.map((step) => (
            <div key={step.answer} className="border-t border-hairline py-5">
              <dt className="font-serif text-[18px] leading-[1.7] text-muted mb-2">
                {step.question}
              </dt>
              <dd className="font-sans text-[11px] uppercase tracking-[0.18em] font-semibold text-ink">
                {step.answer}
              </dd>
            </div>
          ))}
        </dl>

        <div className="space-y-5">
          {book.synthesis.closing.map((paragraph) => (
            <p key={paragraph} className="font-serif text-[19px] leading-[1.85] text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Final memorial */}
      <section className="mb-16 border border-hairline rounded-2xl px-6 py-8 md:px-8">
        <h2 className="mb-6">
          <CopyHeading
            text={canonText(book)}
            className="font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-left"
            restClass="text-gold-ink hover:text-gold"
          >
            {book.canon.title}
          </CopyHeading>
        </h2>

        <ol>
          {book.canon.principles.map((principle, i) => (
            <li
              key={principle}
              className="grid grid-cols-[2.25rem_1fr] items-baseline border-t border-hairline py-3.5 first:border-t-0 first:pt-0"
            >
              <span className="font-sans text-[11px] text-faint tabular-nums">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-serif text-[18px] leading-[1.7] text-ink">{principle}</span>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
