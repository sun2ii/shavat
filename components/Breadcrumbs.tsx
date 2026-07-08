'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getAllBooks as getGenesisBooks } from '@/lib/genesis-collections';
import { getAllCollections } from '@/lib/psalms-collections';
import { getAllDivisions as getMarkDivisions } from '@/lib/mark-collections';
import { getAllDivisions } from '@/lib/book-metadata-utils';
import { getBooksByTopLevelCategory } from '@/lib/top-level-categories';
import { getWritingByPath } from '@/lib/hasWritings';

interface Breadcrumb {
  label: string;
  href: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  'torah': 'Torah',
  'old-testament': 'Old Testament',
  'new-testament': 'New Testament',
  'gospels': 'Gospels',
  'psalms': 'Psalms',
};

export default function Breadcrumbs() {
  const pathname = usePathname();

  const getBreadcrumbs = (): Breadcrumb[] => {
    const breadcrumbs: Breadcrumb[] = [
      { label: 'Home', href: '/' }
    ];

    if (pathname === '/') {
      return breadcrumbs;
    }

    const segments = pathname.split('/').filter(Boolean);

    // Get all book categories once
    const torahBooks = getBooksByTopLevelCategory('torah');
    const otBooks = getBooksByTopLevelCategory('old-testament');
    const ntBooks = getBooksByTopLevelCategory('new-testament');
    const gospelBooks = getBooksByTopLevelCategory('gospels');

    // Handle /library routes
    if (segments[0] === 'library') {
      breadcrumbs.push({ label: 'Library', href: '/library' });

      if (segments[1]) {
        const category = segments[1];
        breadcrumbs.push({
          label: CATEGORY_LABELS[category] || category,
          href: `/library/${category}`
        });
      }
      return breadcrumbs;
    }

    // Handle /map
    if (segments[0] === 'map') {
      breadcrumbs.push({ label: 'Map', href: '/map' });
      return breadcrumbs;
    }

    // Handle /highlights
    if (segments[0] === 'highlights') {
      breadcrumbs.push({ label: 'Highlights', href: '/highlights' });
      return breadcrumbs;
    }

    // Handle /writings routes
    if (segments[0] === 'writings') {
      breadcrumbs.push({ label: 'Writings', href: '/writings' });

      if (segments[1] && segments[2]) {
        const bookSlug = segments[1];
        const divisionPath = segments[2];
        const writing = getWritingByPath(bookSlug, divisionPath);

        if (writing) {
          breadcrumbs.push({
            label: writing.title,
            href: writing.path
          });
        }
      }
      return breadcrumbs;
    }

    // Handle book routes (e.g., /genesis/creation/1, /mark/beginning/1, /psalms/happy/1)
    if (segments.length >= 1) {
      const bookSlug = segments[0];

      // Determine which category the book belongs to
      let category = '';
      let categoryLabel = '';

      if (bookSlug === 'psalms') {
        category = 'psalms';
        categoryLabel = 'Psalms';
      } else if (torahBooks.some(b => b.slug === bookSlug)) {
        category = 'torah';
        categoryLabel = 'Torah';
      } else if (gospelBooks.some(b => b.slug === bookSlug)) {
        category = 'gospels';
        categoryLabel = 'Gospels';
      } else if (ntBooks.some(b => b.slug === bookSlug)) {
        category = 'new-testament';
        categoryLabel = 'New Testament';
      } else if (otBooks.some(b => b.slug === bookSlug)) {
        category = 'old-testament';
        categoryLabel = 'Old Testament';
      }

      if (category) {
        breadcrumbs.push({ label: 'Library', href: '/library' });
        breadcrumbs.push({ label: categoryLabel, href: `/library/${category}` });
      }

      // Add book name
      const book = [...torahBooks, ...otBooks, ...ntBooks, ...gospelBooks].find(b => b.slug === bookSlug);
      if (book) {
        breadcrumbs.push({
          label: book.name,
          href: `/${bookSlug}`
        });

        // Add division/collection name if present
        if (segments.length >= 2) {
          const divisionId = segments[1];

          let divisions: any[] = [];
          if (bookSlug === 'genesis') {
            divisions = getGenesisBooks();
          } else if (bookSlug === 'psalms') {
            divisions = getAllCollections();
          } else if (bookSlug === 'mark') {
            divisions = getMarkDivisions();
          } else {
            divisions = getAllDivisions(bookSlug);
          }

          const division = divisions.find(d => d.id === divisionId);
          if (division) {
            const chapterNum = segments[2] || division.chapters[0] || division.psalms?.[0] || '1';
            breadcrumbs.push({
              label: division.title.replace('The Book of ', '').replace('Psalms of ', ''),
              href: `/${bookSlug}/${divisionId}/${chapterNum}`
            });
          }
        }
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="mb-4 text-xs text-[rgb(var(--text-secondary))]">
      <ol className="flex items-center gap-2">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-center gap-2">
            {index > 0 && <span className="opacity-50">/</span>}
            {index === breadcrumbs.length - 1 ? (
              <span className="text-[rgb(var(--text-primary))]">{crumb.label}</span>
            ) : (
              <Link
                href={crumb.href}
                className="hover:text-[rgb(var(--text-primary))] transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
