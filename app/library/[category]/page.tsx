'use client';

import { useState, Fragment } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getBooksByTopLevelCategory } from '@/lib/top-level-categories';
import { CATEGORIES } from '@/lib/bible-metadata';
import { getAllBooks } from '@/lib/genesis-collections';
import { getAllCollections } from '@/lib/psalms-collections';
import { getAllDivisions as getMarkDivisions } from '@/lib/mark-collections';
import { getAllDivisions } from '@/lib/book-metadata-utils';
import { divisionHasCommentary } from '@/lib/hasCommentary';
import { divisionHasWritings } from '@/lib/hasWritings';
import { getBookTheme } from '@/lib/getBookThemes';

type TabId = 'torah' | 'psalms' | 'old-testament' | 'new-testament' | 'gospels';

const TABS = [
  { id: 'torah' as TabId, label: 'Torah' },
  { id: 'old-testament' as TabId, label: 'OT' },
  { id: 'new-testament' as TabId, label: 'NT' },
  { id: 'gospels' as TabId, label: 'Gospels' },
  { id: 'psalms' as TabId, label: 'Psalms' },
];

export default function LibraryPage() {
  const params = useParams();
  const activeTab = (params.category as TabId) || 'torah';
  const [hideInstructional, setHideInstructional] = useState(true);

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
                    <h3 className="text-xs uppercase tracking-widest text-[rgb(var(--text-secondary))] opacity-70 mb-3 text-center font-semibold">
                      {book.name}
                    </h3>
                  </div>

                  {hasDivisions ? (
                    filteredDivisions.map((division) => {
                      const isInstructional = division.contentType === 'instructional';
                      const titleColor = isInstructional ? 'text-orange-500' : 'text-[rgb(var(--text-primary))]';
                      const themeColor = isInstructional ? 'text-orange-400 opacity-80' : 'text-[rgb(var(--text-secondary))] opacity-60';
                      const hasCommentary = divisionHasCommentary(book.slug, division.chapters);
                      const hasWritings = divisionHasWritings(book.slug, division.chapters);

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
                              : hasWritings
                              ? 'border-green-400/60 shadow-md shadow-green-400/40 dark:border-green-500/70 dark:shadow-green-500/30'
                              : 'border-[rgb(var(--border))]'
                          }`}
                        >
                          <h3 className={`text-sm font-light ${titleColor} leading-tight`}>
                            {division.title.replace('The Book of ', '').replace(/^The /, '')}
                            {division.theme && (
                              <>
                                <br />
                                <span className="text-xs text-[rgb(var(--text-secondary))] opacity-50 italic">
                                  {division.theme}
                                </span>
                              </>
                            )}
                            <br />
                            <span className="text-[rgb(var(--text-secondary))] text-xs opacity-60">{division.chapters.length}</span>
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
                        {book.name}
                        <br />
                        <span className="text-[rgb(var(--text-secondary))] text-xs opacity-60">{book.chapterCount}</span>
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
                  {collection.title.replace('Psalms of ', '')}
                  {collection.theme && (
                    <>
                      <br />
                      <span className="text-xs text-[rgb(var(--text-secondary))] opacity-50 italic">
                        {collection.theme}
                      </span>
                    </>
                  )}
                  <br />
                  <span className="text-[rgb(var(--text-secondary))] text-xs opacity-60">{collection.psalms.length}</span>
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
                  {/* Category header */}
                  <div className="col-span-full">
                    <h3 className="text-xs uppercase tracking-widest text-[rgb(var(--text-secondary))] opacity-70 mb-3 text-center font-semibold">
                      {category.name}
                    </h3>
                  </div>

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
                        const hasWritings = divisionHasWritings(book.slug, division.chapters);

                        return (
                          <Link
                            key={division.id}
                            href={`/${book.slug}/${division.id}/${division.chapters[0]}`}
                            className={`block p-4 border rounded hover:border-[rgb(var(--text-secondary))] transition-all text-center ${
                              hasCommentary
                                ? 'border-blue-400/60 shadow-md shadow-blue-400/40 dark:border-blue-500/70 dark:shadow-blue-500/30'
                                : hasWritings
                                ? 'border-green-400/60 shadow-md shadow-green-400/40 dark:border-green-500/70 dark:shadow-green-500/30'
                                : 'border-[rgb(var(--border))]'
                            }`}
                          >
                            <h3 className={`text-sm font-light ${titleColor} leading-tight`}>
                              {division.title.replace('The Book of ', '').replace(/^The /, '')}
                              {division.theme && (
                                <>
                                  <br />
                                  <span className="text-xs text-[rgb(var(--text-secondary))] opacity-50 italic">
                                    {division.theme}
                                  </span>
                                </>
                              )}
                              <br />
                              <span className="text-[rgb(var(--text-secondary))] text-xs opacity-60">{division.chapters.length}</span>
                            </h3>
                          </Link>
                        );
                      });
                    }

                    const bookTheme = getBookTheme(book.slug);
                    return (
                      <Link
                        key={book.slug}
                        href={`/${book.slug}/1`}
                        className="block p-4 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors text-center"
                      >
                        <h3 className="text-sm font-light text-[rgb(var(--text-primary))] leading-tight">
                          {book.name}
                          {bookTheme && (
                            <>
                              <br />
                              <span className="text-xs text-[rgb(var(--text-secondary))] opacity-50 italic">
                                {bookTheme}
                              </span>
                            </>
                          )}
                          <br />
                          <span className="text-[rgb(var(--text-secondary))] text-xs opacity-60">{book.chapterCount}</span>
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
                  {/* Category header */}
                  <div className="col-span-full">
                    <h3 className="text-xs uppercase tracking-widest text-[rgb(var(--text-secondary))] opacity-70 mb-3 text-center font-semibold">
                      {category.name}
                    </h3>
                  </div>

                  {categoryBooks.map((book) => {
                    // Check if book has any commentary or writings
                    const allChapters = Array.from({ length: book.chapterCount }, (_, i) => i + 1);
                    const hasCommentary = divisionHasCommentary(book.slug, allChapters);
                    const hasWritings = divisionHasWritings(book.slug, allChapters);
                    const bookTheme = getBookTheme(book.slug);

                    return (
                      <Link
                        key={book.slug}
                        href={`/${book.slug}/1`}
                        className={`block p-4 border rounded hover:border-[rgb(var(--text-secondary))] transition-all text-center ${
                          hasCommentary
                            ? 'border-blue-400/60 shadow-md shadow-blue-400/40 dark:border-blue-500/70 dark:shadow-blue-500/30'
                            : hasWritings
                            ? 'border-green-400/60 shadow-md shadow-green-400/40 dark:border-green-500/70 dark:shadow-green-500/30'
                            : 'border-[rgb(var(--border))]'
                        }`}
                      >
                        <h3 className="text-sm font-light text-[rgb(var(--text-primary))] leading-tight">
                          {book.name}
                          {bookTheme && (
                            <>
                              <br />
                              <span className="text-xs text-[rgb(var(--text-secondary))] opacity-50 italic">
                                {bookTheme}
                              </span>
                            </>
                          )}
                          <br />
                          <span className="text-[rgb(var(--text-secondary))] text-xs opacity-60">{book.chapterCount}</span>
                        </h3>
                      </Link>
                    );
                  })}

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
                    <h3 className="text-xs uppercase tracking-widest text-[rgb(var(--text-secondary))] opacity-70 mb-3 text-center font-semibold">
                      {book.name}
                    </h3>
                  </div>

                  {hasDivisions ? (
                    filteredDivisions.map((division) => {
                      const isInstructional = division.contentType === 'instructional';
                      const titleColor = isInstructional ? 'text-orange-500' : 'text-[rgb(var(--text-primary))]';
                      const hasCommentary = divisionHasCommentary(book.slug, division.chapters);
                      const hasWritings = divisionHasWritings(book.slug, division.chapters);

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
                              : hasWritings
                              ? 'border-green-400/60 shadow-md shadow-green-400/40 dark:border-green-500/70 dark:shadow-green-500/30'
                              : 'border-[rgb(var(--border))]'
                          }`}
                        >
                          <h3 className={`text-sm font-light ${titleColor} leading-tight`}>
                            {division.title}
                            {division.theme && (
                              <>
                                <br />
                                <span className="text-xs text-[rgb(var(--text-secondary))] opacity-50 italic">
                                  {division.theme}
                                </span>
                              </>
                            )}
                            <br />
                            <span className="text-[rgb(var(--text-secondary))] text-xs opacity-60">{division.chapters.length}</span>
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
                        {book.name}
                        <br />
                        <span className="text-[rgb(var(--text-secondary))] text-xs opacity-60">{book.chapterCount}</span>
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
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-[rgb(var(--border))] -mx-4 px-4 md:mx-0 md:px-0">
          {/* Tabs - scrollable on mobile */}
          <div className="overflow-x-auto flex-1">
            <div className="flex gap-1 min-w-max md:min-w-0">
              {TABS.map((tab) => (
                <Link
                  key={tab.id}
                  href={`/library/${tab.id}`}
                  className={`px-4 md:px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-[rgb(var(--text-primary))] border-b-2 border-gold'
                      : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]'
                  }`}
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Law Toggle - below tabs on mobile, right side on desktop */}
          <label className="flex items-center gap-2 text-xs text-[rgb(var(--text-secondary))] opacity-50 hover:opacity-100 cursor-pointer py-3 transition-opacity whitespace-nowrap md:ml-4">
            <input
              type="checkbox"
              checked={hideInstructional}
              onChange={(e) => setHideInstructional(e.target.checked)}
              className="cursor-pointer"
            />
            Law
          </label>

          {/* Contents Buttons - conditional based on active tab */}
          {activeTab === 'torah' && (
            <Link
              href="/torah-toc"
              className="flex items-center gap-2 text-xs text-[rgb(var(--text-secondary))] opacity-50 hover:opacity-100 py-3 transition-opacity whitespace-nowrap md:ml-4"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Contents
            </Link>
          )}
          {activeTab === 'old-testament' && (
            <Link
              href="/ot-toc"
              className="flex items-center gap-2 text-xs text-[rgb(var(--text-secondary))] opacity-50 hover:opacity-100 py-3 transition-opacity whitespace-nowrap md:ml-4"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Contents
            </Link>
          )}
          {activeTab === 'new-testament' && (
            <Link
              href="/nt-toc"
              className="flex items-center gap-2 text-xs text-[rgb(var(--text-secondary))] opacity-50 hover:opacity-100 py-3 transition-opacity whitespace-nowrap md:ml-4"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Contents
            </Link>
          )}
          {activeTab === 'gospels' && (
            <Link
              href="/gospels-toc"
              className="flex items-center gap-2 text-xs text-[rgb(var(--text-secondary))] opacity-50 hover:opacity-100 py-3 transition-opacity whitespace-nowrap md:ml-4"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Contents
            </Link>
          )}
          {activeTab === 'psalms' && (
            <Link
              href="/psalms-toc"
              className="flex items-center gap-2 text-xs text-[rgb(var(--text-secondary))] opacity-50 hover:opacity-100 py-3 transition-opacity whitespace-nowrap md:ml-4"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Contents
            </Link>
          )}
        </div>
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </main>
  );
}
