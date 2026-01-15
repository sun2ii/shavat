'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getBooksByCategory } from '@/lib/bible-index';
import { CATEGORIES } from '@/lib/bible-metadata';
import { getAllBooks } from '@/lib/genesis-collections';
import { getAllCollections } from '@/lib/psalms-collections';
import { getAllDivisions } from '@/lib/book-metadata-utils';

export default function LibraryPage() {
  // Track expanded state for each category
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleCategory = (categoryId: string) => {
    setExpanded(prev => ({ ...prev, [categoryId]: !prev[categoryId] }));
  };

  const genesisBooks = getAllBooks();
  const psalmsCollections = getAllCollections();

  const renderCategory = (categoryId: string, categoryName: string) => {
    // Filter out Genesis and Psalms since they're rendered specially elsewhere
    const books = getBooksByCategory(categoryId).filter(
      book => book.slug !== 'genesis' && book.slug !== 'psalms'
    );
    const isExpanded = expanded[categoryId] || false;

    return (
      <section key={categoryId} className="mb-12">
        <button
          onClick={() => toggleCategory(categoryId)}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-[rgb(var(--text-secondary))] mb-4 hover:text-[rgb(var(--text-primary))] transition-colors"
        >
          <span>{isExpanded ? '▼' : '▶'}</span>
          {categoryName}
        </button>
        {isExpanded && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {books.map((book) => (
              <Link
                key={book.slug}
                href={`/${book.slug}/1`}
                className="block p-4 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors text-center"
              >
                <h3 className="text-sm font-light text-[rgb(var(--text-primary))] mb-1 leading-tight">
                  {book.name} <span className="text-[rgb(var(--text-secondary))] text-xs opacity-60">- {book.chapterCount}</span>
                </h3>
                <p className="text-xs text-[rgb(var(--text-secondary))] opacity-60">
                  {book.abbreviation}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    );
  };

  const renderTorahBook = (slug: string, name: string) => {
    const isExpanded = expanded[slug] || false;

    // Get divisions for any book using the generic system
    const divisions = slug === 'genesis' ? genesisBooks : getAllDivisions(slug);
    const hasDivisions = divisions.length > 0;

    return (
      <section key={slug} className="mb-12">
        <button
          onClick={() => toggleCategory(slug)}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-[rgb(var(--text-secondary))] mb-4 hover:text-[rgb(var(--text-primary))] transition-colors"
        >
          <span>{isExpanded ? '▼' : '▶'}</span>
          {name}
        </button>
        {isExpanded && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {hasDivisions ? (
              divisions.map((division) => {
                const isInstructional = division.contentType === 'instructional';
                const titleColor = isInstructional ? 'text-orange-500' : 'text-[rgb(var(--text-primary))]';
                const themeColor = isInstructional ? 'text-orange-400 opacity-80' : 'text-[rgb(var(--text-secondary))] opacity-60';

                return (
                  <Link
                    key={division.id}
                    href={slug === 'genesis'
                      ? `/genesis/${division.id}/${division.chapters[0]}`
                      : `/${slug}/${division.id}/${division.chapters[0]}`
                    }
                    className="block p-4 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors text-center"
                  >
                    <h3 className={`text-sm font-light ${titleColor} mb-1 leading-tight`}>
                      {division.title.replace('The Book of ', '').replace(/^The /, '')} <span className="text-[rgb(var(--text-secondary))] text-xs opacity-60">- {division.chapters.length}</span>
                    </h3>
                    <p className={`text-xs ${themeColor}`}>
                      {division.theme}
                    </p>
                  </Link>
                );
              })
            ) : (
              <Link
                href={`/${slug}/1`}
                className="block p-4 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors text-center"
              >
                <h3 className="text-sm font-light text-[rgb(var(--text-primary))] mb-1 leading-tight">
                  Read {name}
                </h3>
                <p className="text-xs text-[rgb(var(--text-secondary))] opacity-60">
                  Start reading
                </p>
              </Link>
            )}
          </div>
        )}
      </section>
    );
  };

  const renderPsalms = () => {
    const isExpanded = expanded['psalms'] || false;

    return (
      <section key="psalms" className="mb-12">
        <button
          onClick={() => toggleCategory('psalms')}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-[rgb(var(--text-secondary))] mb-4 hover:text-[rgb(var(--text-primary))] transition-colors"
        >
          <span>{isExpanded ? '▼' : '▶'}</span>
          Psalms
        </button>
        {isExpanded && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {psalmsCollections.map((collection) => (
              <Link
                key={collection.id}
                href={`/psalms/${collection.id}/${collection.psalms[0]}`}
                className="block p-4 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors text-center"
              >
                <h3 className="text-sm font-light text-[rgb(var(--text-primary))] mb-1 leading-tight">
                  {collection.title.replace('Psalms of ', '')} <span className="text-[rgb(var(--text-secondary))] text-xs opacity-60">- {collection.psalms.length}</span>
                </h3>
                <p className="text-xs text-[rgb(var(--text-secondary))] opacity-60">
                  {collection.theme}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    );
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-4">
      {/* OLD TESTAMENT - TORAH */}
      <div className="mb-16">
        <h2 className="text-lg uppercase tracking-widest text-[rgb(var(--text-primary))] mb-8 opacity-80">
          Torah
        </h2>
        {renderTorahBook('genesis', 'Genesis')}
        {renderTorahBook('exodus', 'Exodus')}
        {renderTorahBook('leviticus', 'Leviticus')}
        {renderTorahBook('numbers', 'Numbers')}
        {renderTorahBook('deuteronomy', 'Deuteronomy')}
      </div>

      {/* OLD TESTAMENT - OTHER */}
      <div className="mb-16">
        <h2 className="text-lg uppercase tracking-widest text-[rgb(var(--text-primary))] mb-8 opacity-80">
          Old Testament
        </h2>
        {renderCategory(CATEGORIES.HISTORICAL.id, CATEGORIES.HISTORICAL.name)}
        {renderCategory(CATEGORIES.WISDOM.id, CATEGORIES.WISDOM.name)}
        {renderPsalms()}
        {renderCategory(CATEGORIES.MAJOR_PROPHETS.id, CATEGORIES.MAJOR_PROPHETS.name)}
        {renderCategory(CATEGORIES.MINOR_PROPHETS.id, CATEGORIES.MINOR_PROPHETS.name)}
      </div>

      {/* NEW TESTAMENT */}
      <div>
        <h2 className="text-lg uppercase tracking-widest text-[rgb(var(--text-primary))] mb-8 opacity-80">
          New Testament
        </h2>
        {renderCategory(CATEGORIES.GOSPELS.id, CATEGORIES.GOSPELS.name)}
        {renderCategory(CATEGORIES.ACTS.id, CATEGORIES.ACTS.name)}
        {renderCategory(CATEGORIES.PAULINE.id, CATEGORIES.PAULINE.name)}
        {renderCategory(CATEGORIES.GENERAL.id, CATEGORIES.GENERAL.name)}
        {renderCategory(CATEGORIES.APOCALYPSE.id, CATEGORIES.APOCALYPSE.name)}
      </div>
    </main>
  );
}
