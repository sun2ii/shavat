import Link from 'next/link';
import { getAllWritings, Writing } from '@/lib/hasWritings';
import { hasBookWriting } from '@/lib/writings/bookWritings';
import { getBookBySlug } from '@/lib/bible-index';
import { getAllDivisions } from '@/lib/book-metadata-utils';
import { TOP_LEVEL_CATEGORIES, TopLevelCategory } from '@/lib/top-level-categories';

export const metadata = {
  title: 'Shavat | Writings',
  description: 'Theological writings and devotionals on Scripture',
};

/*
  The index folds twice: books gather under the same top-level collections
  the Library uses (Torah, Old Testament, Psalms, Gospels, New Testament);
  each book is one collapsed row; open it and the essays appear grouped
  under the book's own divisions, in reading order. Native <details> keeps
  it server-rendered and accessible.
*/

// Same partition the Library tabs use, resolved from the canonical index.
function collectionFor(slug: string): TopLevelCategory {
  const book = getBookBySlug(slug);
  if (slug === 'psalms') return TOP_LEVEL_CATEGORIES.PSALMS;
  if (book?.category === 'pentateuch') return TOP_LEVEL_CATEGORIES.TORAH;
  if (book?.category === 'gospels') return TOP_LEVEL_CATEGORIES.GOSPELS;
  if (book?.testament === 'new') return TOP_LEVEL_CATEGORIES.NEW_TESTAMENT;
  return TOP_LEVEL_CATEGORIES.OLD_TESTAMENT;
}

const COLLECTION_ORDER = [
  TOP_LEVEL_CATEGORIES.TORAH,
  TOP_LEVEL_CATEGORIES.OLD_TESTAMENT,
  TOP_LEVEL_CATEGORIES.PSALMS,
  TOP_LEVEL_CATEGORIES.GOSPELS,
  TOP_LEVEL_CATEGORIES.NEW_TESTAMENT,
];

interface DivisionGroup {
  id: string;
  title: string;
  writings: Writing[];
}

interface BookGroup {
  slug: string;
  name: string;
  order: number;
  collectionId: string;
  hasOverview: boolean;
  divisions: DivisionGroup[];
  count: number;
}

function fallbackTitle(divisionId: string): string {
  return divisionId
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function buildGroups(): BookGroup[] {
  const byBook = new Map<string, Writing[]>();
  for (const writing of getAllWritings()) {
    const list = byBook.get(writing.book) ?? [];
    list.push(writing);
    byBook.set(writing.book, list);
  }

  const groups: BookGroup[] = [];
  for (const [slug, writings] of byBook) {
    const book = getBookBySlug(slug);
    const divisionTitles = new Map(getAllDivisions(slug).map((d) => [d.id, d.title]));

    // Collections in the order the book reads, essays in chapter order inside.
    const divisions: DivisionGroup[] = [];
    for (const writing of [...writings].sort((a, b) => a.chapter - b.chapter)) {
      let division = divisions.find((d) => d.id === writing.division);
      if (!division) {
        division = {
          id: writing.division,
          title: divisionTitles.get(writing.division) ?? fallbackTitle(writing.division),
          writings: [],
        };
        divisions.push(division);
      }
      division.writings.push(writing);
    }

    groups.push({
      slug,
      name: book?.name ?? fallbackTitle(slug),
      order: book?.order ?? 999,
      collectionId: collectionFor(slug).id,
      hasOverview: hasBookWriting(slug),
      divisions,
      count: writings.length,
    });
  }

  return groups.sort((a, b) => a.order - b.order);
}

export default function WritingsPage() {
  const groups = buildGroups();

  return (
    <main className="max-w-3xl mx-auto select-text">
      <div className="mb-8">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
          Essays &amp; Devotionals
        </p>
        <h1 className="mt-2 font-serif text-3xl font-light text-ink">Writings</h1>
        <p className="mt-1.5 font-serif italic text-sm text-muted">
          What was recorded along the way — one book at a time.
        </p>
      </div>

      {groups.length === 0 ? (
        <div className="py-12 text-center text-muted">
          <p>No writings available yet.</p>
        </div>
      ) : (
        <div className="space-y-10 select-none-ui">
          {COLLECTION_ORDER.map((collection) => {
            const books = groups.filter((g) => g.collectionId === collection.id);
            if (books.length === 0) return null;
            return (
              <section key={collection.id}>
                <div className="flex items-baseline gap-3 pb-3">
                  <h2 className="font-serif text-2xl font-light text-ink">{collection.name}</h2>
                  <span className="hidden font-sans text-[11px] text-faint sm:inline">
                    {collection.description}
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-hairline" />
                </div>
                <div className="space-y-2.5">
                  {books.map((book) => (
                    <details
                      key={book.slug}
                      className="group rounded-lg border border-hairline bg-surface transition-colors duration-150 open:pb-3"
                    >
                      <summary className="flex items-baseline gap-3 rounded-lg px-4 py-3 list-none transition-colors duration-150 hover:bg-paper-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 [&::-webkit-details-marker]:hidden">
                        <span className="font-serif text-xl font-light text-ink">{book.name}</span>
                        <span className="font-sans text-[11px] text-faint">
                          {book.count} {book.count === 1 ? 'writing' : 'writings'}
                        </span>
                        <span
                          aria-hidden
                          className="ml-auto self-center font-sans text-sm text-faint transition-transform duration-200 group-open:rotate-90"
                        >
                          ›
                        </span>
                      </summary>

                      <div className="select-text px-4">
                        {book.hasOverview && (
                          <Link
                            href={`/writings/${book.slug}`}
                            className="-mx-2 mt-1 flex items-baseline justify-between gap-4 rounded px-2 py-1.5 transition-colors duration-150 hover:bg-paper-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                          >
                            <span className="font-serif text-[15px] italic text-muted">
                              The whole book, looking back
                            </span>
                            <span className="whitespace-nowrap font-sans text-[11px] text-gold-ink">
                              Overview →
                            </span>
                          </Link>
                        )}

                        {book.divisions.map((division) => (
                          <div key={division.id} className="pt-3">
                            <div className="flex items-baseline gap-3 pb-1.5">
                              <h3 className="font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-faint">
                                {division.title}
                              </h3>
                              <span aria-hidden className="h-px flex-1 bg-hairline" />
                            </div>
                            <ul>
                              {division.writings.map((writing) => (
                                <li key={`${writing.book}-${writing.chapter}`}>
                                  <Link
                                    href={writing.path}
                                    className="-mx-2 flex items-baseline justify-between gap-4 rounded px-2 py-1.5 transition-colors duration-150 hover:bg-paper-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                                  >
                                    <span className="font-serif text-[15px] leading-snug text-ink">
                                      {writing.title}
                                    </span>
                                    <span className="whitespace-nowrap font-sans text-[11px] text-faint">
                                      ch {writing.chapter}
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}
    </main>
  );
}
