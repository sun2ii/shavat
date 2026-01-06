import Link from 'next/link';
import HighlightsList from '@/components/HighlightsList';

export default function HighlightsPage() {
  return (
    <main>
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-3xl font-light text-[rgb(var(--text-primary))]">Highlights</h1>
        <Link href="/genesis/1" className="text-base text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors">
          ← Back to reading
        </Link>
      </div>

      <HighlightsList />
    </main>
  );
}
