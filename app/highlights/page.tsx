import Link from 'next/link';
import HighlightsList from '@/components/HighlightsList';

export default function HighlightsPage() {
  // HighlightsList renders its own "Highlights" header; this page only frames
  // it with gutters and the back link to avoid a duplicated title on mobile.
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 py-6">
      <div className="mb-6">
        <Link
          href="/genesis/1"
          className="inline-block py-2 -my-2 text-base text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] active:text-[rgb(var(--text-primary))] transition-colors"
        >
          ← Back to reading
        </Link>
      </div>

      <HighlightsList />
    </main>
  );
}
