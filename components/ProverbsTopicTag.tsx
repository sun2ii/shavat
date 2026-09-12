'use client';

import Link from 'next/link';
import { ProverbsTopic, PROVERBS_TOPICS } from '@/lib/proverbs-topics';

interface Props {
  topic: ProverbsTopic;
}

const COLOR_CLASSES: Record<string, { bg: string; text: string }> = {
  amber: {
    bg: 'bg-amber-100/60 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-300',
  },
  blue: {
    bg: 'bg-blue-100/60 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
  },
  red: {
    bg: 'bg-red-100/60 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-300',
  },
  emerald: {
    bg: 'bg-emerald-100/60 dark:bg-emerald-900/30',
    text: 'text-emerald-700 dark:text-emerald-300',
  },
  rose: {
    bg: 'bg-rose-100/60 dark:bg-rose-900/30',
    text: 'text-rose-700 dark:text-rose-300',
  },
  orange: {
    bg: 'bg-orange-100/60 dark:bg-orange-900/30',
    text: 'text-orange-700 dark:text-orange-300',
  },
  yellow: {
    bg: 'bg-yellow-100/60 dark:bg-yellow-900/30',
    text: 'text-yellow-700 dark:text-yellow-300',
  },
  indigo: {
    bg: 'bg-indigo-100/60 dark:bg-indigo-900/30',
    text: 'text-indigo-700 dark:text-indigo-300',
  },
  purple: {
    bg: 'bg-purple-100/60 dark:bg-purple-900/30',
    text: 'text-purple-700 dark:text-purple-300',
  },
  teal: {
    bg: 'bg-teal-100/60 dark:bg-teal-900/30',
    text: 'text-teal-700 dark:text-teal-300',
  },
  pink: {
    bg: 'bg-pink-100/60 dark:bg-pink-900/30',
    text: 'text-pink-700 dark:text-pink-300',
  },
  sky: {
    bg: 'bg-sky-100/60 dark:bg-sky-900/30',
    text: 'text-sky-700 dark:text-sky-300',
  },
};

function getShortLabel(topic: ProverbsTopic): string {
  const mapping: Record<ProverbsTopic, string> = {
    wisdom: 'Wisdom',
    speech: 'Speech',
    anger: 'Anger',
    friendship: 'Friendship',
    family: 'Family',
    work: 'Work',
    wealth: 'Wealth',
    justice: 'Justice',
    leadership: 'Leadership',
    discipline: 'Discipline',
    desire: 'Desire',
    'fear-of-lord': 'Fear of Lord',
  };
  return mapping[topic];
}

export default function ProverbsTopicTag({ topic }: Props) {
  const colorKey = PROVERBS_TOPICS[topic].color;
  const colors = COLOR_CLASSES[colorKey] || COLOR_CLASSES.amber;

  return (
    <Link
      href={`/proverbs/map/${topic}`}
      onClick={(e) => e.stopPropagation()}
      className={`inline-block px-1.5 py-0.5 text-[10px] font-sans font-medium rounded ${colors.bg} ${colors.text} hover:opacity-80 transition-opacity`}
    >
      {getShortLabel(topic)}
    </Link>
  );
}
