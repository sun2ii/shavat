import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROVERBS_TOPICS, isValidTopic, getTopicLabel, type ProverbsTopic } from '@/lib/proverbs-topics';
import { getVersesByTopic, getVersesBySubtopic, hasSubtopics } from '@/lib/getProverbsTopics';
import { getDivisionByChapter } from '@/lib/book-metadata-utils';
import CopyAllButton from './CopyAllButton';

interface Props {
  params: { topic: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!isValidTopic(params.topic)) {
    return { title: 'Not Found' };
  }
  const label = getTopicLabel(params.topic as ProverbsTopic);
  return {
    title: `${label} | Proverbs Map`,
    description: `Proverbs verses about ${label.toLowerCase()}`,
  };
}

export function generateStaticParams() {
  return Object.keys(PROVERBS_TOPICS).map((topic) => ({ topic }));
}

function getVerseUrl(chapter: number, verse: number): string {
  const division = getDivisionByChapter('proverbs', chapter);
  const divisionId = division?.id || 'proverbs-of-solomon';
  return `/ot/proverbs/${divisionId}/${chapter}#v${verse}`;
}

const COLOR_CLASSES: Record<string, { accent: string; text: string }> = {
  amber: { accent: 'border-l-amber-400', text: 'text-amber-700 dark:text-amber-300' },
  blue: { accent: 'border-l-blue-400', text: 'text-blue-700 dark:text-blue-300' },
  red: { accent: 'border-l-red-400', text: 'text-red-700 dark:text-red-300' },
  emerald: { accent: 'border-l-emerald-400', text: 'text-emerald-700 dark:text-emerald-300' },
  rose: { accent: 'border-l-rose-400', text: 'text-rose-700 dark:text-rose-300' },
  orange: { accent: 'border-l-orange-400', text: 'text-orange-700 dark:text-orange-300' },
  yellow: { accent: 'border-l-yellow-400', text: 'text-yellow-700 dark:text-yellow-300' },
  indigo: { accent: 'border-l-indigo-400', text: 'text-indigo-700 dark:text-indigo-300' },
  purple: { accent: 'border-l-purple-400', text: 'text-purple-700 dark:text-purple-300' },
  teal: { accent: 'border-l-teal-400', text: 'text-teal-700 dark:text-teal-300' },
  pink: { accent: 'border-l-pink-400', text: 'text-pink-700 dark:text-pink-300' },
  sky: { accent: 'border-l-sky-400', text: 'text-sky-700 dark:text-sky-300' },
};

export default function TopicDetailPage({ params }: Props) {
  if (!isValidTopic(params.topic)) {
    notFound();
  }

  const topic = params.topic as ProverbsTopic;
  const label = getTopicLabel(topic);
  const color = PROVERBS_TOPICS[topic].color;
  const colors = COLOR_CLASSES[color] || COLOR_CLASSES.amber;
  const verses = getVersesByTopic(topic);
  const subtopicGroups = hasSubtopics(topic) ? getVersesBySubtopic(topic) : null;

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <div className="mb-8">
        <Link
          href="/proverbs/map"
          className="inline-flex items-center gap-1 text-sm font-sans text-muted hover:text-gold transition-colors mb-4"
        >
          ← Back to Map
        </Link>
        <div className="flex items-start gap-3">
          <CopyAllButton label={label} verses={verses} />
          <div>
            <h1 className={`font-serif text-3xl sm:text-4xl mb-2 ${colors.text}`}>
              {label}
            </h1>
            <p className="font-sans text-sm text-muted">
              {verses.length} {verses.length === 1 ? 'verse' : 'verses'}
            </p>
          </div>
        </div>
      </div>

      {subtopicGroups ? (
        <div className="space-y-10">
          {subtopicGroups.map(({ subtopic, verses: groupVerses }) => (
            <section key={subtopic.id}>
              <div className="mb-4">
                <h2 className={`font-serif text-xl sm:text-2xl ${colors.text}`}>
                  {subtopic.label}
                </h2>
                <p className="font-sans text-sm text-muted mt-1">
                  {subtopic.description}
                </p>
              </div>
              <div className="space-y-5">
                {groupVerses.map(({ chapter, verse, text }) => (
                  <div
                    key={`${chapter}:${verse}`}
                    className={`pl-4 border-l-2 ${colors.accent}`}
                  >
                    <Link
                      href={getVerseUrl(chapter, verse)}
                      className="inline-block font-sans text-xs font-semibold text-gold hover:text-gold-ink transition-colors mb-1"
                    >
                      Proverbs {chapter}:{verse}
                    </Link>
                    <p className="font-serif text-lg text-ink leading-relaxed">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {verses.map(({ chapter, verse, text }) => (
            <div
              key={`${chapter}:${verse}`}
              className={`pl-4 border-l-2 ${colors.accent}`}
            >
              <Link
                href={getVerseUrl(chapter, verse)}
                className="inline-block font-sans text-xs font-semibold text-gold hover:text-gold-ink transition-colors mb-1"
              >
                Proverbs {chapter}:{verse}
              </Link>
              <p className="font-serif text-lg text-ink leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>
      )}

      {verses.length === 0 && (
        <div className="py-12 text-center">
          <p className="font-sans text-muted">
            No verses have been tagged with this topic yet.
          </p>
        </div>
      )}
    </main>
  );
}
