import Link from 'next/link';
import PageHeader from '@/components/PageHeader';

const READINGS = [
  {
    id: 'imitation-of-christ',
    title: 'The Imitation of Christ',
    author: 'Thomas à Kempis',
    description: 'A classic devotional on the spiritual life',
    books: 4,
    chapters: 114,
  },
  {
    id: 'confessions',
    title: 'Confessions',
    author: 'Saint Augustine',
    description: 'Spiritual autobiography and philosophical reflections',
    books: 13,
    chapters: 13,
  },
  {
    id: 'practice-presence-god',
    title: 'The Practice of the Presence of God',
    author: 'Brother Lawrence',
    description: 'Conversations and letters on practicing God\'s presence',
    books: 2,
    chapters: 19,
  },
];

export default function ReadingsPage() {
  return (
    <main className="max-w-6xl mx-auto pb-8 px-4">
      <PageHeader
        kicker="Devotional Literature"
        title="Readings"
        subtitle="Classic works of Christian spirituality"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {READINGS.map((reading) => (
          <Link
            key={reading.id}
            href={`/readings/${reading.id}`}
            className="block rounded border border-hairline bg-surface px-3 py-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:bg-gold/10 hover:border-gold/50 transition-all duration-150"
          >
            <div className="font-serif text-[14px] font-semibold text-ink leading-tight">
              {reading.title}
            </div>
            <div className="font-sans text-[11px] text-muted mt-1">
              {reading.author}
            </div>
            <div className="font-sans text-[10px] text-gold mt-2">
              {reading.books} books · {reading.chapters} chapters
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
