import Link from 'next/link';
import { DivisionMemorial as DivisionMemorialData, MemorialChapter } from '@/lib/types';
import { readingPath } from '@/lib/routes';
import CopyHeading from './CopyHeading';

/*
  Clipboard payloads. Each heading copies exactly the block it titles, so the
  page's own hierarchy is the selection model — no drag, no partial capture.
  Serialized on the server; the client only carries the finished strings.
*/
function chapterText(bookName: string, chapter: MemorialChapter): string {
  return [
    `${bookName} ${chapter.chapter} — ${chapter.theme}`,
    '',
    'STORY',
    chapter.story,
    '',
    'TENSION',
    chapter.tension,
    '',
    'REVELATION',
    chapter.revelation,
    '',
    'MEMORIAL STONES',
    ...chapter.memorialStones.map((stone, i) => `${i + 1}. ${stone}`),
    '',
    `“${chapter.quote}”`,
  ].join('\n');
}

function memorialIntroText(memorial: DivisionMemorialData): string {
  return [memorial.memorialIntro.heading, '', ...memorial.memorialIntro.body].join('\n\n');
}

function synthesisText(memorial: DivisionMemorialData): string {
  const { synthesis } = memorial;
  return [
    synthesis.eyebrow,
    synthesis.heading,
    '',
    ...synthesis.opening,
    '',
    ...synthesis.steps.map((step) => `${step.question}\n— ${step.theme}`),
    '',
    ...synthesis.closing,
  ].join('\n\n');
}

function canonText(memorial: DivisionMemorialData): string {
  return [
    memorial.canon.title,
    '',
    ...memorial.canon.principles.map((principle, i) => `${i + 1}. ${principle}`),
  ].join('\n');
}

function memorialText(memorial: DivisionMemorialData): string {
  return [
    memorial.eyebrow,
    memorial.title,
    '',
    ...memorial.intro,
    '',
    memorialIntroText(memorial),
    '',
    ...memorial.chapters.map((chapter) => chapterText(memorial.bookName, chapter)),
    '',
    synthesisText(memorial),
    '',
    canonText(memorial),
  ].join('\n\n');
}

/**
 * A division memorial: the summary and record of one movement of a book.
 * Passive by design — the anchors, the links back into the text, and the
 * headings, which copy the block they title.
 */
export default function DivisionMemorial({ memorial }: { memorial: DivisionMemorialData }) {
  const { bookSlug, bookName, divisionId, chapters, synthesis, canon } = memorial;

  return (
    <main className="max-w-[760px] mx-auto scroll-smooth">
      {/* Hero */}
      <header className="text-center pt-6 pb-10">
        <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-muted mb-4">
          {memorial.eyebrow}
        </p>

        <h1 className="mb-8">
          <CopyHeading
            text={memorialText(memorial)}
            className="font-serif text-4xl md:text-5xl leading-tight text-center"
          >
            {memorial.title}
          </CopyHeading>
        </h1>

        <div className="text-left space-y-5">
          {memorial.intro.map((paragraph) => (
            <p key={paragraph} className="font-serif text-[19px] leading-[1.85] text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </header>

      <hr className="border-hairline" />

      {/* Section overview */}
      <nav aria-label="Chapter progression" className="py-10">
        <ol className="flex flex-col sm:flex-row sm:items-stretch sm:justify-between">
          {chapters.map((chapter) => (
            <li
              key={chapter.anchor}
              className="flex-1 border-t sm:border-t-0 sm:border-l border-hairline first:border-t-0 sm:first:border-l-0 py-4 sm:py-0 sm:px-5 first:sm:pl-0 last:sm:pr-0"
            >
              <a href={`#${chapter.anchor}`} className="group block">
                <span className="block font-serif text-2xl text-faint group-hover:text-muted transition-colors leading-none mb-2">
                  {String(chapter.chapter).padStart(2, '0')}
                </span>
                <span className="block font-sans text-[11px] uppercase tracking-[0.18em] font-semibold text-muted group-hover:text-ink transition-colors">
                  {chapter.theme}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <hr className="border-hairline" />

      {/* Memorial stones introduction */}
      <section className="py-10">
        <h2 className="mb-4">
          <CopyHeading
            text={memorialIntroText(memorial)}
            className="font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-left"
            restClass="text-gold-ink hover:text-gold"
          >
            {memorial.memorialIntro.heading}
          </CopyHeading>
        </h2>
        <div className="space-y-4">
          {memorial.memorialIntro.body.map((paragraph) => (
            <p key={paragraph} className="font-serif text-[19px] leading-[1.85] text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* One section per chapter */}
      {chapters.map((chapter) => (
        <section
          key={chapter.anchor}
          id={chapter.anchor}
          className="scroll-mt-24 pt-12 pb-14 border-t border-hairline"
        >
          <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-muted mb-3">
            {bookName} {chapter.chapter}
          </p>

          <h2 className="mb-8">
            <CopyHeading
              text={chapterText(bookName, chapter)}
              className="font-serif text-3xl md:text-4xl text-left"
            >
              {chapter.theme}
            </CopyHeading>
          </h2>

          {/* Story -> tension -> revelation, the pattern the book itself follows */}
          <div className="mb-10 space-y-7">
            <div>
              <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-faint mb-2">
                Story
              </h3>
              <p className="font-serif text-[19px] leading-[1.85] text-muted">{chapter.story}</p>
            </div>

            <div>
              <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-faint mb-2">
                Tension
              </h3>
              <p className="font-serif italic text-[19px] leading-[1.85] text-ink">
                {chapter.tension}
              </p>
            </div>

            <div>
              <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-faint mb-2">
                Revelation
              </h3>
              <p className="font-serif text-[19px] leading-[1.85] text-muted">
                {chapter.revelation}
              </p>
            </div>
          </div>

          <h3 className="font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-gold-ink mb-1">
            Memorial Stones
          </h3>

          <ol>
            {chapter.memorialStones.map((stone, i) => (
              <li
                key={stone}
                className="grid grid-cols-[2.25rem_1fr] items-baseline border-t border-hairline py-3.5"
              >
                <span className="font-sans text-[11px] text-faint tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-serif text-[18px] leading-[1.7] text-ink">{stone}</span>
              </li>
            ))}
          </ol>

          <blockquote className="mt-9 border-l-2 border-hairline pl-5">
            <p className="font-serif italic text-[17px] leading-[1.7] text-muted">
              “{chapter.quote}”
            </p>
          </blockquote>

          <Link
            href={readingPath(bookSlug, divisionId, chapter.chapter)}
            className="inline-block mt-8 font-sans text-xs text-muted hover:text-ink transition-colors"
          >
            Read {bookName} {chapter.chapter} →
          </Link>
        </section>
      ))}

      {/* Synthesis */}
      <section className="pt-12 pb-14 border-t border-hairline">
        <p className="font-sans text-[10px] uppercase tracking-[0.22em] text-muted mb-3">
          {synthesis.eyebrow}
        </p>

        <h2 className="mb-8">
          <CopyHeading
            text={synthesisText(memorial)}
            className="font-serif text-3xl md:text-4xl text-left"
          >
            {synthesis.heading}
          </CopyHeading>
        </h2>

        <div className="space-y-5 mb-10">
          {synthesis.opening.map((paragraph) => (
            <p key={paragraph} className="font-serif text-[19px] leading-[1.85] text-muted">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Each chapter as a question the narrative answers */}
        <dl className="mb-10">
          {synthesis.steps.map((step) => (
            <div key={step.theme} className="border-t border-hairline py-5">
              <dt className="font-serif text-[18px] leading-[1.7] text-muted mb-2">
                {step.question}
              </dt>
              <dd className="font-sans text-[11px] uppercase tracking-[0.18em] font-semibold text-ink">
                {step.theme}
              </dd>
            </div>
          ))}
        </dl>

        <div className="space-y-5">
          {synthesis.closing.map((paragraph) => (
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
            text={canonText(memorial)}
            className="font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-left"
            restClass="text-gold-ink hover:text-gold"
          >
            {canon.title}
          </CopyHeading>
        </h2>

        <ol>
          {canon.principles.map((principle, i) => (
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
