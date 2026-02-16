'use client';

import { useState, Fragment } from 'react';
import Link from 'next/link';
import { getBooksByTopLevelCategory } from '@/lib/top-level-categories';
import { CATEGORIES } from '@/lib/bible-metadata';
import { getAllBooks } from '@/lib/genesis-collections';
import { getAllCollections } from '@/lib/psalms-collections';
import { getAllDivisions as getMarkDivisions } from '@/lib/mark-collections';
import { getAllDivisions } from '@/lib/book-metadata-utils';
import { divisionHasCommentary } from '@/lib/hasCommentary';

type TabId = 'torah' | 'psalms' | 'old-testament' | 'new-testament' | 'gospels';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<TabId>('torah');
  const [hideInstructional, setHideInstructional] = useState(false);

  const genesisBooks = getAllBooks();
  const psalmsCollections = getAllCollections();
  const markDivisions = getMarkDivisions();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'torah':
        const torahBooks = getBooksByTopLevelCategory('torah');
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {torahBooks.map((book, bookIndex) => {
              const divisions = book.slug === 'genesis' ? genesisBooks : getAllDivisions(book.slug);
              const hasDivisions = divisions.length > 0;
              const filteredDivisions = hideInstructional
                ? divisions.filter(d => d.contentType !== 'instructional')
                : divisions;

              // Skip book if all divisions are hidden
              if (hasDivisions && filteredDivisions.length === 0) {
                return null;
              }

              return (
                <Fragment key={book.slug}>
                  {/* Book name header */}
                  <div className="col-span-full">
                    <h3 className="text-xs uppercase tracking-widest text-[rgb(var(--text-secondary))] opacity-70 mb-3">
                      {book.name}
                    </h3>
                  </div>

                  {hasDivisions ? (
                    filteredDivisions.map((division) => {
                      const isInstructional = division.contentType === 'instructional';
                      const titleColor = isInstructional ? 'text-orange-500' : 'text-[rgb(var(--text-primary))]';
                      const themeColor = isInstructional ? 'text-orange-400 opacity-80' : 'text-[rgb(var(--text-secondary))] opacity-60';
                      const hasCommentary = divisionHasCommentary(book.slug, division.chapters);

                      return (
                        <Link
                          key={division.id}
                          href={book.slug === 'genesis'
                            ? `/genesis/${division.id}/${division.chapters[0]}`
                            : `/${book.slug}/${division.id}/${division.chapters[0]}`
                          }
                          className={`block p-4 border rounded hover:border-[rgb(var(--text-secondary))] transition-all text-center ${
                            hasCommentary
                              ? 'border-blue-400/60 shadow-md shadow-blue-400/40 dark:border-blue-500/70 dark:shadow-blue-500/30'
                              : 'border-[rgb(var(--border))]'
                          }`}
                        >
                          <h3 className={`text-sm font-light ${titleColor} leading-tight`}>
                            {division.title.replace('The Book of ', '').replace(/^The /, '')} <span className="text-[rgb(var(--text-secondary))] text-xs opacity-60">- {division.chapters.length}</span>
                          </h3>
                        </Link>
                      );
                    })
                  ) : (
                    <Link
                      key={book.slug}
                      href={`/${book.slug}/1`}
                      className="block p-4 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors text-center"
                    >
                      <h3 className="text-sm font-light text-[rgb(var(--text-primary))] leading-tight">
                        {book.name} <span className="text-[rgb(var(--text-secondary))] text-xs opacity-60">- {book.chapterCount}</span>
                      </h3>
                    </Link>
                  )}

                  {/* Add spacing between books */}
                  {bookIndex < torahBooks.length - 1 && <div className="col-span-full h-8" />}
                </Fragment>
              );
            })}
          </div>
        );

      case 'psalms':
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {psalmsCollections.map((collection) => (
              <Link
                key={collection.id}
                href={`/psalms/${collection.id}/${collection.psalms[0]}`}
                className="block p-4 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors text-center"
              >
                <h3 className="text-sm font-light text-[rgb(var(--text-primary))] leading-tight">
                  {collection.title.replace('Psalms of ', '')} <span className="text-[rgb(var(--text-secondary))] text-xs opacity-60">- {collection.psalms.length}</span>
                </h3>
              </Link>
            ))}
          </div>
        );

      case 'old-testament':
        const otBooks = getBooksByTopLevelCategory('old-testament');
        const otCategories = [
          CATEGORIES.HISTORICAL,
          CATEGORIES.WISDOM,
          CATEGORIES.MAJOR_PROPHETS,
          CATEGORIES.MINOR_PROPHETS,
        ];

        return (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {otCategories.map((category, categoryIndex) => {
              const categoryBooks = otBooks.filter(book => book.category === category.id);

              return (
                <Fragment key={category.id}>
                  {categoryBooks.map((book) => {
                    const divisions = getAllDivisions(book.slug);
                    const hasDivisions = divisions.length > 0;
                    const filteredDivisions = hideInstructional
                      ? divisions.filter(d => d.contentType !== 'instructional')
                      : divisions;

                    if (hasDivisions) {
                      // Skip if all divisions are hidden
                      if (filteredDivisions.length === 0) {
                        return null;
                      }

                      return filteredDivisions.map((division) => {
                        const isInstructional = division.contentType === 'instructional';
                        const titleColor = isInstructional ? 'text-orange-500' : 'text-[rgb(var(--text-primary))]';
                        const themeColor = isInstructional ? 'text-orange-400 opacity-80' : 'text-[rgb(var(--text-secondary))] opacity-60';
                        const hasCommentary = divisionHasCommentary(book.slug, division.chapters);

                        return (
                          <Link
                            key={division.id}
                            href={`/${book.slug}/${division.id}/${division.chapters[0]}`}
                            className={`block p-4 border rounded hover:border-[rgb(var(--text-secondary))] transition-all text-center ${
                              hasCommentary
                                ? 'border-blue-400/60 shadow-md shadow-blue-400/40 dark:border-blue-500/70 dark:shadow-blue-500/30'
                                : 'border-[rgb(var(--border))]'
                            }`}
                          >
                            <h3 className={`text-sm font-light ${titleColor} leading-tight`}>
                              {division.title.replace('The Book of ', '').replace(/^The /, '')} <span className="text-[rgb(var(--text-secondary))] text-xs opacity-60">- {division.chapters.length}</span>
                            </h3>
                          </Link>
                        );
                      });
                    }

                    return (
                      <Link
                        key={book.slug}
                        href={`/${book.slug}/1`}
                        className="block p-4 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors text-center"
                      >
                        <h3 className="text-sm font-light text-[rgb(var(--text-primary))] leading-tight">
                          {book.name} <span className="text-[rgb(var(--text-secondary))] text-xs opacity-60">- {book.chapterCount}</span>
                        </h3>
                      </Link>
                    );
                  })}

                  {/* Add spacing between categories */}
                  {categoryIndex < otCategories.length - 1 && <div className="col-span-full h-8" />}
                </Fragment>
              );
            })}
          </div>
        );

      case 'new-testament':
        const ntBooks = getBooksByTopLevelCategory('new-testament');
        const ntCategories = [
          CATEGORIES.ACTS,
          CATEGORIES.PAULINE,
          CATEGORIES.GENERAL,
          CATEGORIES.APOCALYPSE,
        ];

        return (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {ntCategories.map((category, categoryIndex) => {
              const categoryBooks = ntBooks.filter(book => book.category === category.id);

              return (
                <Fragment key={category.id}>
                  {categoryBooks.map((book) => (
                    <Link
                      key={book.slug}
                      href={`/${book.slug}/1`}
                      className="block p-4 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors text-center"
                    >
                      <h3 className="text-sm font-light text-[rgb(var(--text-primary))] leading-tight">
                        {book.name} <span className="text-[rgb(var(--text-secondary))] text-xs opacity-60">- {book.chapterCount}</span>
                      </h3>
                    </Link>
                  ))}

                  {/* Add spacing between categories */}
                  {categoryIndex < ntCategories.length - 1 && <div className="col-span-full h-8" />}
                </Fragment>
              );
            })}
          </div>
        );

      case 'gospels':
        const gospelBooks = getBooksByTopLevelCategory('gospels');
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {gospelBooks.map((book, bookIndex) => {
              const divisions = book.slug === 'mark' ? markDivisions : getAllDivisions(book.slug);
              const hasDivisions = divisions.length > 0;
              const filteredDivisions = hideInstructional
                ? divisions.filter(d => d.contentType !== 'instructional')
                : divisions;

              // Skip book if all divisions are hidden
              if (hasDivisions && filteredDivisions.length === 0) {
                return null;
              }

              return (
                <Fragment key={book.slug}>
                  {/* Book name header */}
                  <div className="col-span-full">
                    <h3 className="text-xs uppercase tracking-widest text-[rgb(var(--text-secondary))] opacity-70 mb-3">
                      {book.name}
                    </h3>
                  </div>

                  {hasDivisions ? (
                    filteredDivisions.map((division) => {
                      const isInstructional = division.contentType === 'instructional';
                      const titleColor = isInstructional ? 'text-orange-500' : 'text-[rgb(var(--text-primary))]';
                      const hasCommentary = divisionHasCommentary(book.slug, division.chapters);

                      return (
                        <Link
                          key={division.id}
                          href={book.slug === 'mark'
                            ? `/mark/${division.id}/${division.chapters[0]}`
                            : `/${book.slug}/${division.id}/${division.chapters[0]}`
                          }
                          className={`block p-4 border rounded hover:border-[rgb(var(--text-secondary))] transition-all text-center ${
                            hasCommentary
                              ? 'border-blue-400/60 shadow-md shadow-blue-400/40 dark:border-blue-500/70 dark:shadow-blue-500/30'
                              : 'border-[rgb(var(--border))]'
                          }`}
                        >
                          <h3 className={`text-sm font-light ${titleColor} leading-tight`}>
                            {division.title} <span className="text-[rgb(var(--text-secondary))] text-xs opacity-60">- {division.chapters.length}</span>
                          </h3>
                        </Link>
                      );
                    })
                  ) : (
                    <Link
                      key={book.slug}
                      href={`/${book.slug}/1`}
                      className="block p-4 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors text-center"
                    >
                      <h3 className="text-sm font-light text-[rgb(var(--text-primary))] leading-tight">
                        {book.name} <span className="text-[rgb(var(--text-secondary))] text-xs opacity-60">- {book.chapterCount}</span>
                      </h3>
                    </Link>
                  )}

                  {/* Add spacing between books */}
                  {bookIndex < gospelBooks.length - 1 && <div className="col-span-full h-8" />}
                </Fragment>
              );
            })}
          </div>
        );
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-4">
      {/* Tab Navigation */}
      <div className="flex items-center justify-between mb-8 border-b border-[rgb(var(--border))]">
        <div className="flex gap-1">
          {[
            { id: 'torah' as TabId, label: 'Torah' },
            { id: 'psalms' as TabId, label: 'Psalms' },
            { id: 'old-testament' as TabId, label: 'OT' },
            { id: 'new-testament' as TabId, label: 'NT' },
            { id: 'gospels' as TabId, label: 'Gospels' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-[rgb(var(--text-primary))] border-b-2 border-gold'
                  : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Hide Instructional Toggle */}
        <label className="flex items-center gap-2 text-xs text-[rgb(var(--text-secondary))] cursor-pointer mb-[-1px]">
          <input
            type="checkbox"
            checked={hideInstructional}
            onChange={(e) => setHideInstructional(e.target.checked)}
            className="cursor-pointer"
          />
          Hide Instructional
        </label>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </main>
  );
}
