'use client';

import Link from 'next/link';

type Season = 1 | 2 | 3;

const SEASON_LABELS: Record<Season, string> = {
  1: 'First Reading',
  2: 'Second Reading',
  3: 'Third Reading',
};

const SEASON_COLORS: Record<Season, { bg: string; text: string; border: string; dot: string }> = {
  1: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500/30',
    dot: 'bg-amber-500',
  },
  2: {
    bg: 'bg-purple-500/10',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-500/30',
    dot: 'bg-purple-500',
  },
  3: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/30',
    dot: 'bg-emerald-500',
  },
};

interface Props {
  season: Season;
}

export default function SeasonIndicator({ season }: Props) {
  const colors = SEASON_COLORS[season];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${colors.bg} ${colors.border} border`}>
          <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
          <span className={`font-sans text-xs font-medium ${colors.text}`}>
            {SEASON_LABELS[season]}
          </span>
        </div>

        <Link
          href="/dashboard/history"
          className="font-sans text-xs text-muted hover:text-ink transition-colors"
        >
          View history
        </Link>
      </div>
    </div>
  );
}
