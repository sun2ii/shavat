'use client';

import { useState } from 'react';
import { Status, Roadmap } from '@/lib/roadmap';
import Link from 'next/link';

type Tab = 'milestones' | 'ai-work';

interface BibleBook {
  slug: string;
  abbreviation: string;
}

function StatusDot({ status }: { status: Status }) {
  const colors: Record<Status, string> = {
    done: 'bg-emerald-500',
    partial: 'bg-gold',
    wip: 'bg-blue-500',
    '-': 'bg-gray-600',
  };
  return <span className={`inline-block w-2 h-2 rounded-full ${colors[status]}`} />;
}

function hasWork(bookStatus: { commentary: Status; voices: Status; places: Status; character: Status }) {
  return bookStatus.commentary !== '-' || bookStatus.voices !== '-' || bookStatus.places !== '-' || bookStatus.character !== '-';
}

interface RoadmapClientProps {
  roadmap: Roadmap;
  otBooks: BibleBook[];
  ntBooks: BibleBook[];
}

export default function RoadmapClient({ roadmap, otBooks, ntBooks }: RoadmapClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>('milestones');
  const [showAll, setShowAll] = useState(false);

  const completedMilestones = roadmap.milestones.filter(m => m.done).length;
  const totalMilestones = roadmap.milestones.length;

  const countDone = (field: 'commentary' | 'voices' | 'places' | 'character') =>
    Object.values(roadmap.books).filter(b => b[field] === 'done').length;

  // Group milestones by section
  const sections = roadmap.milestones.reduce((acc, m) => {
    if (!acc[m.section]) acc[m.section] = [];
    acc[m.section].push(m);
    return acc;
  }, {} as Record<string, typeof roadmap.milestones>);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'milestones', label: 'Milestones' },
    { id: 'ai-work', label: 'AI Work' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header with tabs */}
      <div className="flex items-center gap-4 mb-2">
        <Link
          href="/review"
          className="font-sans text-xs text-muted hover:text-ink transition-colors"
        >
          Review
        </Link>
        <span className="text-faint">/</span>
        <h1 className="font-playfair text-2xl font-semibold text-[rgb(var(--text-primary))]">
          Roadmap
        </h1>

        {/* Tabs */}
        <div className="flex items-center gap-1 ml-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-md font-sans text-xs transition-colors ${
                activeTab === tab.id
                  ? 'bg-gold/20 text-gold font-medium'
                  : 'text-muted hover:text-ink'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <p className="font-sans text-sm text-[rgb(var(--text-tertiary))] mb-8">
        {activeTab === 'milestones' ? 'Feature milestones and project progress' : 'Book content status tracking'}
      </p>

      {/* Milestones Tab */}
      {activeTab === 'milestones' && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-sans text-sm font-semibold text-[rgb(var(--text-primary))]">
              Progress
            </h2>
            <span className="font-sans text-[10px] text-faint">
              {completedMilestones}/{totalMilestones}
            </span>
          </div>
          <div className="space-y-6">
            {Object.entries(sections).map(([section, items]) => (
              <div key={section}>
                <h3 className="font-sans text-[10px] font-semibold uppercase tracking-wider text-gold mb-2">
                  {section}
                </h3>
                <div className="space-y-1.5">
                  {items.map((m, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className={`text-sm ${m.done ? 'text-emerald-500' : 'text-faint'}`}>
                        {m.done ? '✓' : '○'}
                      </span>
                      <span className={`font-sans text-sm ${m.done ? 'text-muted line-through' : 'text-ink'}`}>
                        {m.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* AI Work Tab */}
      {activeTab === 'ai-work' && (
        <section>
          {/* Stats */}
          <div className="flex items-center gap-6 mb-6 font-sans text-[11px]">
            <span>
              <span className="font-semibold text-ink">{countDone('commentary')}</span>
              <span className="text-faint">/66 commentary</span>
            </span>
            <span>
              <span className="font-semibold text-ink">{countDone('voices')}</span>
              <span className="text-faint">/66 voices</span>
            </span>
            <span>
              <span className="font-semibold text-ink">{countDone('places')}</span>
              <span className="text-faint">/66 places</span>
            </span>
            <span>
              <span className="font-semibold text-ink">{countDone('character')}</span>
              <span className="text-faint">/66 character</span>
            </span>
          </div>

          {/* Book Grid as Tables */}
          {(() => {
            const defaultStatus = { commentary: '-' as Status, voices: '-' as Status, places: '-' as Status, character: '-' as Status };
            const filteredOT = showAll
              ? otBooks
              : otBooks.filter(book => hasWork(roadmap.books[book.slug] || defaultStatus));
            const filteredNT = showAll
              ? ntBooks
              : ntBooks.filter(book => hasWork(roadmap.books[book.slug] || defaultStatus));
            const totalWithWork = otBooks.filter(book => hasWork(roadmap.books[book.slug] || defaultStatus)).length +
                                  ntBooks.filter(book => hasWork(roadmap.books[book.slug] || defaultStatus)).length;

            return (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Old Testament */}
                  {filteredOT.length > 0 && (
                    <div>
                      <table className="w-full font-sans text-[11px]">
                        <thead>
                          <tr className="text-left text-[10px] uppercase tracking-wider">
                            <th className="pb-2 font-semibold text-gold">Old Testament</th>
                            <th className="pb-2 font-medium text-faint w-8 text-center">C</th>
                            <th className="pb-2 font-medium text-faint w-8 text-center">V</th>
                            <th className="pb-2 font-medium text-faint w-8 text-center">P</th>
                            <th className="pb-2 font-medium text-faint w-8 text-center">Ch</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredOT.map(book => {
                            const s = roadmap.books[book.slug] || defaultStatus;
                            return (
                              <tr key={book.slug} className="border-t border-hairline/50">
                                <td className="py-1 text-muted">{book.abbreviation}</td>
                                <td className="py-1 text-center"><StatusDot status={s.commentary} /></td>
                                <td className="py-1 text-center"><StatusDot status={s.voices} /></td>
                                <td className="py-1 text-center"><StatusDot status={s.places} /></td>
                                <td className="py-1 text-center"><StatusDot status={s.character} /></td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* New Testament */}
                  {filteredNT.length > 0 && (
                    <div>
                      <table className="w-full font-sans text-[11px]">
                        <thead>
                          <tr className="text-left text-[10px] uppercase tracking-wider">
                            <th className="pb-2 font-semibold text-gold">New Testament</th>
                            <th className="pb-2 font-medium text-faint w-8 text-center">C</th>
                            <th className="pb-2 font-medium text-faint w-8 text-center">V</th>
                            <th className="pb-2 font-medium text-faint w-8 text-center">P</th>
                            <th className="pb-2 font-medium text-faint w-8 text-center">Ch</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredNT.map(book => {
                            const s = roadmap.books[book.slug] || defaultStatus;
                            return (
                              <tr key={book.slug} className="border-t border-hairline/50">
                                <td className="py-1 text-muted">{book.abbreviation}</td>
                                <td className="py-1 text-center"><StatusDot status={s.commentary} /></td>
                                <td className="py-1 text-center"><StatusDot status={s.voices} /></td>
                                <td className="py-1 text-center"><StatusDot status={s.places} /></td>
                                <td className="py-1 text-center"><StatusDot status={s.character} /></td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                {/* Show all toggle */}
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="mt-6 font-sans text-xs text-muted hover:text-ink transition-colors"
                >
                  {showAll ? `Show only books with work (${totalWithWork})` : `Show all 66 books`}
                </button>
              </>
            );
          })()}
        </section>
      )}
    </div>
  );
}
