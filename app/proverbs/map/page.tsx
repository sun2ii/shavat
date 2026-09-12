import { Metadata } from 'next';
import Link from 'next/link';
import { getTopicsWithCounts } from '@/lib/getProverbsTopics';
import type { ProverbsTopic } from '@/lib/proverbs-topics';

export const metadata: Metadata = {
  title: 'Proverbs Map',
  description: 'Explore Proverbs by topic',
};

interface TopicFamily {
  name: string;
  description: string;
  colorClass: string;
  headerClass: string;
  topics: ProverbsTopic[];
}

const TOPIC_FAMILIES: TopicFamily[] = [
  {
    name: 'Foundation',
    description: 'The underlying orientation of Proverbs',
    colorClass: 'amber',
    headerClass: 'text-amber-600 dark:text-amber-400',
    topics: ['wisdom', 'fear-of-lord'],
  },
  {
    name: 'Self',
    description: 'How do I govern myself?',
    colorClass: 'orange',
    headerClass: 'text-orange-600 dark:text-orange-400',
    topics: ['work', 'discipline', 'anger', 'desire'],
  },
  {
    name: 'Relationships',
    description: 'How do I relate to others?',
    colorClass: 'teal',
    headerClass: 'text-teal-600 dark:text-teal-400',
    topics: ['speech', 'friendship', 'family'],
  },
  {
    name: 'Society',
    description: 'How do people behave in larger structures?',
    colorClass: 'indigo',
    headerClass: 'text-indigo-600 dark:text-indigo-400',
    topics: ['wealth', 'justice', 'leadership'],
  },
];

const TOPIC_COLORS: Record<ProverbsTopic, { border: string; bg: string; text: string }> = {
  // Foundation - Gold
  wisdom: {
    border: 'border-amber-400/60 dark:border-amber-500/50',
    bg: 'bg-amber-50/60 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-300',
  },
  'fear-of-lord': {
    border: 'border-amber-500/60 dark:border-amber-600/50',
    bg: 'bg-amber-100/50 dark:bg-amber-900/30',
    text: 'text-amber-800 dark:text-amber-200',
  },
  // Self - Warm (Orange/Red)
  work: {
    border: 'border-orange-400/60 dark:border-orange-500/50',
    bg: 'bg-orange-50/60 dark:bg-orange-950/40',
    text: 'text-orange-700 dark:text-orange-300',
  },
  discipline: {
    border: 'border-orange-500/60 dark:border-orange-600/50',
    bg: 'bg-orange-100/50 dark:bg-orange-900/30',
    text: 'text-orange-800 dark:text-orange-200',
  },
  anger: {
    border: 'border-red-400/60 dark:border-red-500/50',
    bg: 'bg-red-50/60 dark:bg-red-950/40',
    text: 'text-red-700 dark:text-red-300',
  },
  desire: {
    border: 'border-rose-400/60 dark:border-rose-500/50',
    bg: 'bg-rose-50/60 dark:bg-rose-950/40',
    text: 'text-rose-700 dark:text-rose-300',
  },
  // Relationships - Green/Teal
  speech: {
    border: 'border-cyan-400/60 dark:border-cyan-500/50',
    bg: 'bg-cyan-50/60 dark:bg-cyan-950/40',
    text: 'text-cyan-700 dark:text-cyan-300',
  },
  friendship: {
    border: 'border-emerald-400/60 dark:border-emerald-500/50',
    bg: 'bg-emerald-50/60 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-300',
  },
  family: {
    border: 'border-teal-400/60 dark:border-teal-500/50',
    bg: 'bg-teal-50/60 dark:bg-teal-950/40',
    text: 'text-teal-700 dark:text-teal-300',
  },
  // Society - Blue/Purple
  wealth: {
    border: 'border-blue-400/60 dark:border-blue-500/50',
    bg: 'bg-blue-50/60 dark:bg-blue-950/40',
    text: 'text-blue-700 dark:text-blue-300',
  },
  justice: {
    border: 'border-indigo-400/60 dark:border-indigo-500/50',
    bg: 'bg-indigo-50/60 dark:bg-indigo-950/40',
    text: 'text-indigo-700 dark:text-indigo-300',
  },
  leadership: {
    border: 'border-purple-400/60 dark:border-purple-500/50',
    bg: 'bg-purple-50/60 dark:bg-purple-950/40',
    text: 'text-purple-700 dark:text-purple-300',
  },
};

export default function ProverbsMapPage() {
  const topicsData = getTopicsWithCounts();
  const topicCounts = Object.fromEntries(
    topicsData.map((t) => [t.topic, t.count])
  ) as Record<ProverbsTopic, number>;
  const topicLabels = Object.fromEntries(
    topicsData.map((t) => [t.topic, t.label])
  ) as Record<ProverbsTopic, string>;
  const totalVerses = topicsData.reduce((sum, t) => sum + t.count, 0);

  return (
    <main className="max-w-3xl mx-auto px-4 py-6">
      <div className="mb-6">
        <Link
          href="/ot/proverbs"
          className="inline-flex items-center gap-1 text-sm font-sans text-muted hover:text-gold transition-colors mb-3"
        >
          ← Back to Proverbs
        </Link>
        <h1 className="font-serif text-3xl text-ink">Proverbs Map</h1>
      </div>

      <div className="space-y-6">
        {TOPIC_FAMILIES.map((family) => (
          <section key={family.name}>
            <h2 className={`font-sans text-xs font-bold tracking-widest uppercase mb-2 ${family.headerClass}`}>
              {family.name}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {family.topics.map((topic) => {
                const colors = TOPIC_COLORS[topic];
                const count = topicCounts[topic] || 0;
                const label = topicLabels[topic] || topic;
                return (
                  <Link
                    key={topic}
                    href={`/proverbs/map/${topic}`}
                    className={`block px-3 py-2.5 rounded-lg border ${colors.border} ${colors.bg} hover:shadow-md transition-shadow`}
                  >
                    <div className={`font-sans text-sm font-medium ${colors.text}`}>
                      {label}
                    </div>
                    <div className="font-sans text-xs text-muted mt-0.5">
                      {count} verses
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
