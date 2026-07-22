import { notFound, permanentRedirect } from 'next/navigation';
import { getBookBySlug } from '@/lib/bible-index';
import { readingPath, resolveDivisionId } from '@/lib/routes';

interface Props {
  params: {
    book: string;
    slug?: string[];
  };
}

/**
 * Legacy reading URLs — /joshua/the-conquest/9 — from before reading routes
 * moved under /ot and /nt. Everything here permanently redirects to the
 * canonical path so old links and bookmarks survive; the route itself renders
 * nothing.
 */
export default function LegacyBookPage({ params }: Props) {
  const { book, slug = [] } = params;

  if (!getBookBySlug(book)) {
    notFound();
  }

  // /[book]/[division]/[chapter] — the division may since have been renamed
  if (slug.length === 2) {
    const [divisionSlug, chapterSlug] = slug;
    permanentRedirect(readingPath(book, resolveDivisionId(book, divisionSlug), chapterSlug));
  }

  permanentRedirect(readingPath(book, ...slug));
}
