import { BibleBookEntry } from './types';
import { getBookBySlug } from './bible-index';

export interface ChronologicalPeriod {
  id: string;
  name: string;
  dateRange: string;
  description: string;
  bookSlugs: string[];
  note?: string;
}

export const CHRONOLOGICAL_PERIODS: ChronologicalPeriod[] = [
  {
    id: 'patriarchal',
    name: 'Patriarchal Era',
    dateRange: '~2000-1800 BC',
    description: 'Creation through the patriarchs',
    bookSlugs: ['job', 'genesis'],
    note: 'Job may contain the oldest events described in Scripture'
  },
  {
    id: 'exodus',
    name: 'Exodus & Wilderness',
    dateRange: '~1446-1406 BC',
    description: 'Deliverance from Egypt and the Law',
    bookSlugs: ['exodus', 'leviticus', 'numbers', 'deuteronomy']
  },
  {
    id: 'conquest',
    name: 'Conquest & Judges',
    dateRange: '~1406-1050 BC',
    description: 'Entering the Promised Land and the period of judges',
    bookSlugs: ['joshua', 'judges', 'ruth']
  },
  {
    id: 'united-kingdom',
    name: 'United Kingdom',
    dateRange: '~1050-930 BC',
    description: 'Reign of Saul, David, and Solomon',
    bookSlugs: ['1-samuel', '2-samuel', 'psalms', 'proverbs', 'ecclesiastes', 'song-of-solomon', '1-kings'],
    note: '1 Kings covers both Solomon\'s reign and the divided kingdom'
  },
  {
    id: 'divided-kingdom',
    name: 'Divided Kingdom',
    dateRange: '~930-586 BC',
    description: 'Israel and Judah split, prophets call for repentance',
    bookSlugs: [
      '2-kings',
      '1-chronicles',
      '2-chronicles',
      'obadiah',
      'joel',
      'jonah',
      'amos',
      'hosea',
      'isaiah',
      'micah',
      'nahum',
      'zephaniah',
      'habakkuk',
      'jeremiah',
      'lamentations'
    ],
    note: 'Chronicles parallels Samuel and Kings; prophets ministered during this period'
  },
  {
    id: 'exile',
    name: 'Exile',
    dateRange: '~586-539 BC',
    description: 'Judah in Babylonian captivity',
    bookSlugs: ['ezekiel', 'daniel']
  },
  {
    id: 'post-exile',
    name: 'Post-Exile Return',
    dateRange: '~539-400 BC',
    description: 'Return to Jerusalem and rebuilding the temple',
    bookSlugs: ['ezra', 'nehemiah', 'esther', 'haggai', 'zechariah', 'malachi'],
    note: 'Esther occurs during the exile period in Persia'
  },
  {
    id: 'intertestamental',
    name: 'Intertestamental Period',
    dateRange: '~400 BC - 4 BC',
    description: '400 years of silence between the testaments',
    bookSlugs: [],
    note: 'No biblical books written during this period'
  },
  {
    id: 'life-of-jesus',
    name: 'Life of Jesus',
    dateRange: '~4 BC - 30 AD',
    description: 'The Gospels - parallel accounts of Jesus\' ministry',
    bookSlugs: ['matthew', 'mark', 'luke', 'john']
  },
  {
    id: 'early-church',
    name: 'Early Church',
    dateRange: '~30-95 AD',
    description: 'The apostolic age and spread of Christianity',
    bookSlugs: [
      'acts',
      'james',
      'galatians',
      '1-thessalonians',
      '2-thessalonians',
      '1-corinthians',
      '2-corinthians',
      'romans',
      'ephesians',
      'philippians',
      'colossians',
      'philemon',
      '1-timothy',
      'titus',
      '2-timothy',
      '1-peter',
      '2-peter',
      'hebrews',
      'jude',
      '1-john',
      '2-john',
      '3-john',
      'revelation'
    ],
    note: 'Letters ordered roughly by date of writing; Revelation written last (~95 AD)'
  }
];

export function getChronologicalBooks(periodId: string): BibleBookEntry[] {
  const period = CHRONOLOGICAL_PERIODS.find(p => p.id === periodId);
  if (!period) return [];

  return period.bookSlugs
    .map(slug => getBookBySlug(slug))
    .filter((book): book is BibleBookEntry => book !== undefined);
}

export function getAllChronologicalBooks(): BibleBookEntry[] {
  return CHRONOLOGICAL_PERIODS.flatMap(period => getChronologicalBooks(period.id));
}
