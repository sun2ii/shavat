'use client';

import { useState, Fragment, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
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

type FocusableCard = {
  id: string;
  href: string;
  bookSlug: string; // Track which book this card belongs to
  categoryId?: string; // Track category for OT/NT tabs with category groupings
};

const TABS = [
  { id: 'torah' as TabId, label: 'Torah' },
  { id: 'old-testament' as TabId, label: 'OT' },
  { id: 'new-testament' as TabId, label: 'NT' },
  { id: 'gospels' as TabId, label: 'Gospels' },
  { id: 'psalms' as TabId, label: 'Psalms' },
];

export default function LibraryPage() {
  const params = useParams();
  const router = useRouter();
  const activeTab = (params.category as TabId) || 'torah';
  const [hideInstructional, setHideInstructional] = useState(true);
  const [focusedCardIndex, setFocusedCardIndex] = useState<number | null>(null);

  const genesisBooks = getAllBooks();
  const psalmsCollections = getAllCollections();
  const markDivisions = getMarkDivisions();

  // Extract focusable cards based on active tab
  const extractFocusableCards = (): FocusableCard[] => {
    const cards: FocusableCard[] = [];

    switch (activeTab) {
      case 'torah': {
        const torahBooks = getBooksByTopLevelCategory('torah');
        torahBooks.forEach(book => {
          const divisions = book.slug === 'genesis' ? genesisBooks : getAllDivisions(book.slug);
          const hasDivisions = divisions.length > 0;
          const filteredDivisions = hideInstructional
            ? divisions.filter(d => d.contentType !== 'instructional')
            : divisions;

          if (hasDivisions && filteredDivisions.length > 0) {
            filteredDivisions.forEach(division => {
              cards.push({
                id: `${book.slug}:${division.id}`,
                href: book.slug === 'genesis'
                  ? `/genesis/${division.id}/${division.chapters[0]}`
                  : `/${book.slug}/${division.id}/${division.chapters[0]}`,
                bookSlug: book.slug
              });
            });
          } else if (!hasDivisions) {
            cards.push({
              id: book.slug,
              href: `/${book.slug}/1`,
              bookSlug: book.slug
            });
          }
        });
        break;
      }

      case 'psalms': {
        psalmsCollections.forEach(collection => {
          cards.push({
            id: collection.id,
            href: `/psalms/${collection.id}/${collection.psalms[0]}`,
            bookSlug: 'psalms'
          });
        });
        break;
      }

      case 'old-testament': {
        const otBooks = getBooksByTopLevelCategory('old-testament');
        const otCategories = [
          CATEGORIES.HISTORICAL,
          CATEGORIES.WISDOM,
          CATEGORIES.MAJOR_PROPHETS,
          CATEGORIES.MINOR_PROPHETS,
        ];

        // Extract cards in category order to match rendering
        otCategories.forEach(category => {
          const categoryBooks = otBooks.filter(book => book.category === category.id);

          categoryBooks.forEach(book => {
            const divisions = getAllDivisions(book.slug);
            const hasDivisions = divisions.length > 0;
            const filteredDivisions = hideInstructional
              ? divisions.filter(d => d.contentType !== 'instructional')
              : divisions;

            if (hasDivisions && filteredDivisions.length > 0) {
              filteredDivisions.forEach(division => {
                cards.push({
                  id: `${book.slug}:${division.id}`,
                  href: `/${book.slug}/${division.id}/${division.chapters[0]}`,
                  bookSlug: book.slug,
                  categoryId: category.id
                });
              });
            } else {
              cards.push({
                id: book.slug,
                href: `/${book.slug}/1`,
                bookSlug: book.slug,
                categoryId: category.id
              });
            }
          });
        });
        break;
      }

      case 'new-testament': {
        const ntBooks = getBooksByTopLevelCategory('new-testament');
        const ntCategories = [
          CATEGORIES.ACTS,
          CATEGORIES.PAULINE,
          CATEGORIES.GENERAL,
          CATEGORIES.APOCALYPSE,
        ];

        // Extract cards in category order to match rendering
        ntCategories.forEach(category => {
          const categoryBooks = ntBooks.filter(book => book.category === category.id);

          categoryBooks.forEach(book => {
            cards.push({
              id: book.slug,
              href: `/${book.slug}/1`,
              bookSlug: book.slug,
              categoryId: category.id
            });
          });
        });
        break;
      }

      case 'gospels': {
        const gospelBooks = getBooksByTopLevelCategory('gospels');
        gospelBooks.forEach(book => {
          const divisions = book.slug === 'mark' ? markDivisions : getAllDivisions(book.slug);
          const hasDivisions = divisions.length > 0;
          const filteredDivisions = hideInstructional
            ? divisions.filter(d => d.contentType !== 'instructional')
            : divisions;

          if (hasDivisions && filteredDivisions.length > 0) {
            filteredDivisions.forEach(division => {
              cards.push({
                id: `${book.slug}:${division.id}`,
                href: book.slug === 'mark'
                  ? `/mark/${division.id}/${division.chapters[0]}`
                  : `/${book.slug}/${division.id}/${division.chapters[0]}`,
                bookSlug: book.slug
              });
            });
          } else {
            cards.push({
              id: book.slug,
              href: `/${book.slug}/1`,
              bookSlug: book.slug
            });
          }
        });
        break;
      }
    }

    return cards;
  };

  const focusableCards = extractFocusableCards();

  // Get the focused card ID
  const focusedCardId = focusedCardIndex !== null ? (focusableCards[focusedCardIndex]?.id || null) : null;

  // Calculate grid columns based on viewport width
  const getGridColumns = () => {
    if (typeof window === 'undefined') return 5;
    const width = window.innerWidth;
    if (width < 768) return 2;  // mobile
    if (width < 1024) return 4; // tablet
    return 5; // desktop
  };

  const [gridColumns, setGridColumns] = useState(getGridColumns);

  // Update grid columns on resize
  useEffect(() => {
    const handleResize = () => setGridColumns(getGridColumns());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Debug logging
  useEffect(() => {
    console.log('Tab:', activeTab, '| Cards:', focusableCards.length, '| Focused index:', focusedCardIndex, '| Focused ID:', focusedCardId, '| Grid cols:', gridColumns);
  }, [activeTab, focusableCards.length, focusedCardIndex, focusedCardId, gridColumns]);

  // Reset focus when tab changes
  useEffect(() => {
    setFocusedCardIndex(null);
  }, [activeTab, hideInstructional]);

  // Auto-scroll focused card into view
  useEffect(() => {
    if (focusedCardIndex !== null && focusedCardId) {
      // Find the focused card element by its href
      const focusedCard = focusableCards[focusedCardIndex];
      if (focusedCard) {
        // Find all links and match by href
        const links = document.querySelectorAll('a[href]');
        const cardElement = Array.from(links).find(link =>
          link.getAttribute('href') === focusedCard.href
        );

        if (cardElement) {
          cardElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
          });
        }
      }
    }
  }, [focusedCardIndex, focusedCardId, focusableCards]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // 2D grid navigation with arrow keys
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setFocusedCardIndex(prev => {
          // If nothing focused, start at first card
          if (prev === null) return 0;
          const newIndex = Math.max(0, prev - 1);
          console.log('Left arrow: ', prev, '->', newIndex);
          return newIndex;
        });
        return;
      }

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setFocusedCardIndex(prev => {
          // If nothing focused, start at first card
          if (prev === null) return 0;
          const newIndex = Math.min(focusableCards.length - 1, prev + 1);
          console.log('Right arrow: ', prev, '->', newIndex);
          return newIndex;
        });
        return;
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedCardIndex(prev => {
          // If nothing focused, start at first card
          if (prev === null) return 0;
          // Move up one row (subtract gridColumns)
          const newIndex = Math.max(0, prev - gridColumns);
          console.log('Up arrow: ', prev, '->', newIndex, '(cols:', gridColumns, ')');
          return newIndex;
        });
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedCardIndex(prev => {
          // If nothing focused, start at first card
          if (prev === null) return 0;

          const currentCard = focusableCards[prev];
          const tentativeIndex = prev + gridColumns;

          if (tentativeIndex < focusableCards.length) {
            const tentativeCard = focusableCards[tentativeIndex];

            // Priority 1: Check if crossing to a new category (OT/NT tabs)
            if (currentCard.categoryId && tentativeCard.categoryId &&
                currentCard.categoryId !== tentativeCard.categoryId) {
              // Jump to first card of new category
              const firstCardOfNewCategory = focusableCards.findIndex(
                card => card.categoryId === tentativeCard.categoryId
              );
              console.log('Down arrow: crossing categories from', currentCard.categoryId, 'to', tentativeCard.categoryId, '| Jump to index:', firstCardOfNewCategory);
              return firstCardOfNewCategory !== -1 ? firstCardOfNewCategory : tentativeIndex;
            }

            // Priority 2: Check if crossing to a new book (within same category or no categories)
            if (currentCard.bookSlug !== tentativeCard.bookSlug) {
              // Jump to first card of new book
              const firstCardOfNewBook = focusableCards.findIndex(
                card => card.bookSlug === tentativeCard.bookSlug
              );
              console.log('Down arrow: crossing books from', currentCard.bookSlug, 'to', tentativeCard.bookSlug, '| Jump to index:', firstCardOfNewBook);
              return firstCardOfNewBook !== -1 ? firstCardOfNewBook : tentativeIndex;
            }
          }

          // Normal down movement
          const newIndex = Math.min(focusableCards.length - 1, tentativeIndex);
          console.log('Down arrow: ', prev, '->', newIndex, '(cols:', gridColumns, ')');
          return newIndex;
        });
        return;
      }

      if (e.key === 'Enter') {
        console.log('Enter pressed. Index:', focusedCardIndex, 'Card:', focusedCardIndex !== null ? focusableCards[focusedCardIndex] : null);
        if (focusedCardIndex !== null && focusableCards.length > 0 && focusableCards[focusedCardIndex]) {
          console.log('Navigating to:', focusableCards[focusedCardIndex].href);
          router.push(focusableCards[focusedCardIndex].href);
          e.preventDefault();
        }
        return;
      }

      // Tab navigation by number keys
      switch (e.key) {
        case '1':
          router.push('/library/torah');
          break;
        case '2':
          router.push('/library/old-testament');
          break;
        case '3':
          router.push('/library/new-testament');
          break;
        case '4':
          router.push('/library/gospels');
          break;
        case '5':
          router.push('/library/psalms');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, focusableCards, focusedCardIndex, gridColumns]);

  const renderTabContent = () => {
    let cardIndex = 0; // Track card index for focus indicator
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
                      const cardId = `${book.slug}:${division.id}`;
                      const isFocused = focusedCardId === cardId;

                      return (
                        <Link
                          key={division.id}
                          href={book.slug === 'genesis'
                            ? `/genesis/${division.id}/${division.chapters[0]}`
                            : `/${book.slug}/${division.id}/${division.chapters[0]}`
                          }
                          className={`block p-4 border rounded hover:border-[rgb(var(--text-secondary))] transition-all text-center ${
                            isFocused
                              ? '!border-4 !border-yellow-400 shadow-lg shadow-yellow-400/50'
                              : ''
                          } ${
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
                      className={`block p-4 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors text-center ${
                        focusedCardId === book.slug ? '!border-4 !border-yellow-400 shadow-lg shadow-yellow-400/50' : ''
                      }`}
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
            {psalmsCollections.map((collection) => {
              const isFocused = focusedCardId === collection.id;
              return (
                <Link
                  key={collection.id}
                  href={`/psalms/${collection.id}/${collection.psalms[0]}`}
                  className={`block p-4 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors text-center ${
                    isFocused ? '!border-4 !border-yellow-400 shadow-lg shadow-yellow-400/50' : ''
                  }`}
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
              );
            })}
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
                        const cardId = `${book.slug}:${division.id}`;
                        const isFocused = focusedCardId === cardId;

                        return (
                          <Link
                            key={division.id}
                            href={`/${book.slug}/${division.id}/${division.chapters[0]}`}
                            className={`block p-4 border rounded hover:border-[rgb(var(--text-secondary))] transition-all text-center ${
                              isFocused
                                ? '!border-4 !border-yellow-400 shadow-lg shadow-yellow-400/50'
                                : ''
                            } ${
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
                    const isFocused = focusedCardId === book.slug;
                    return (
                      <Link
                        key={book.slug}
                        href={`/${book.slug}/1`}
                        className={`block p-4 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors text-center ${
                          isFocused ? '!border-4 !border-yellow-400 shadow-lg shadow-yellow-400/50' : ''
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
                    const isFocused = focusedCardId === book.slug;

                    return (
                      <Link
                        key={book.slug}
                        href={`/${book.slug}/1`}
                        className={`block p-4 border rounded hover:border-[rgb(var(--text-secondary))] transition-all text-center ${
                          isFocused
                            ? '!border-4 !border-yellow-400 shadow-lg shadow-yellow-400/50'
                            : ''
                        } ${
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
                      const cardId = `${book.slug}:${division.id}`;
                      const isFocused = focusedCardId === cardId;

                      return (
                        <Link
                          key={division.id}
                          href={book.slug === 'mark'
                            ? `/mark/${division.id}/${division.chapters[0]}`
                            : `/${book.slug}/${division.id}/${division.chapters[0]}`
                          }
                          className={`block p-4 border rounded hover:border-[rgb(var(--text-secondary))] transition-all text-center ${
                            isFocused
                              ? '!border-4 !border-yellow-400 shadow-lg shadow-yellow-400/50'
                              : ''
                          } ${
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
                      className={`block p-4 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors text-center ${
                        focusedCardId === book.slug ? '!border-4 !border-yellow-400 shadow-lg shadow-yellow-400/50' : ''
                      }`}
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

          {/* Story/Law Mode Toggle - below tabs on mobile, right side on desktop */}
          <div className="flex items-center gap-3 py-3 md:ml-6 border-l border-[rgb(var(--border))] pl-4">
            <button
              onClick={() => setHideInstructional(true)}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-all ${
                hideInstructional
                  ? 'bg-[#D4AF37] text-black'
                  : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]'
              }`}
            >
              Story
            </button>
            <button
              onClick={() => setHideInstructional(false)}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-all ${
                !hideInstructional
                  ? 'bg-orange-500 text-white'
                  : 'text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))]'
              }`}
            >
              Study
            </button>
          </div>

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
