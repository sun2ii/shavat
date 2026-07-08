'use client';

import { useState, useEffect } from 'react';
import { Verse as VerseType } from '@/lib/types';
import Verse from './Verse';
import { loadCommentary, getCommentary } from '@/lib/getCommentary';
import ChapterOutline from './ChapterOutline';

interface Props {
  verses: VerseType[];
  book?: string;
  chapter?: number;
}

interface DaySection {
  day: string;
  verseRange: [number, number];
  color: string;
  borderColor: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

const GENESIS_1_DAYS: DaySection[] = [
  { day: 'First Day', verseRange: [1, 5], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Second Day', verseRange: [6, 8], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Third Day', verseRange: [9, 13], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Fourth Day', verseRange: [14, 19], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Fifth Day', verseRange: [20, 23], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Sixth Day', verseRange: [24, 31], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
];

const GENESIS_2_SECTIONS: DaySection[] = [
  { day: 'Seventh Day (Sabbath Rest)', verseRange: [1, 3], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Formation of Man', verseRange: [4, 7], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Garden of Eden', verseRange: [8, 14], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'The Command', verseRange: [15, 17], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'Creation of Woman', verseRange: [18, 25], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
];

const GENESIS_3_SECTIONS: DaySection[] = [
  { day: 'The Temptation', verseRange: [1, 7], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'The Confrontation', verseRange: [8, 13], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'The Curse', verseRange: [14, 19], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
  { day: 'Expulsion from Eden', verseRange: [20, 24], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const GENESIS_4_SECTIONS: DaySection[] = [
  { day: 'Cain and Abel', verseRange: [1, 7], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'The First Murder', verseRange: [8, 16], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: "Cain's Descendants", verseRange: [17, 24], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
  { day: 'Seth and Enosh', verseRange: [25, 26], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const GENESIS_5_SECTIONS: DaySection[] = [
  { day: 'Introduction', verseRange: [1, 2], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Adam to Enoch', verseRange: [3, 24], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Methuselah to Noah', verseRange: [25, 32], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const GENESIS_6_SECTIONS: DaySection[] = [
  { day: 'Corruption of Humanity', verseRange: [1, 8], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Noah and the Ark', verseRange: [9, 22], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const GENESIS_7_SECTIONS: DaySection[] = [
  { day: 'Entering the Ark', verseRange: [1, 10], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'The Flood Waters Rise', verseRange: [11, 24], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const GENESIS_8_SECTIONS: DaySection[] = [
  { day: 'Waters Recede', verseRange: [1, 14], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Leaving the Ark', verseRange: [15, 22], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const GENESIS_9_SECTIONS: DaySection[] = [
  { day: 'God\'s Blessing and Command', verseRange: [1, 7], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'The Covenant with Noah', verseRange: [8, 17], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Noah\'s Sons and the Curse', verseRange: [18, 29], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const GENESIS_10_SECTIONS: DaySection[] = [
  { day: 'Descendants of Japheth', verseRange: [1, 5], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Descendants of Ham', verseRange: [6, 20], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Descendants of Shem', verseRange: [21, 32], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const GENESIS_11_SECTIONS: DaySection[] = [
  { day: 'Tower of Babel', verseRange: [1, 9], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Shem to Abram', verseRange: [10, 26], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Terah\'s Family', verseRange: [27, 32], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const GENESIS_12_SECTIONS: DaySection[] = [
  { day: 'The Call of Abram', verseRange: [1, 9], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Abram in Egypt', verseRange: [10, 20], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
];

const GENESIS_13_SECTIONS: DaySection[] = [
  { day: 'Abram and Lot Separate', verseRange: [1, 13], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'God\'s Promise Renewed', verseRange: [14, 18], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const GENESIS_14_SECTIONS: DaySection[] = [
  { day: 'War of the Kings', verseRange: [1, 12], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Abram Rescues Lot', verseRange: [13, 16], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Melchizedek and the King of Sodom', verseRange: [17, 24], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const GENESIS_15_SECTIONS: DaySection[] = [
  { day: 'God\'s Promise of a Son', verseRange: [1, 6], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'The Covenant Ceremony', verseRange: [7, 21], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const GENESIS_16_SECTIONS: DaySection[] = [
  { day: 'Hagar and Ishmael', verseRange: [1, 6], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'The Angel and Hagar', verseRange: [7, 16], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const GENESIS_17_SECTIONS: DaySection[] = [
  { day: 'Covenant of Circumcision', verseRange: [1, 14], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Sarah and Isaac Promised', verseRange: [15, 22], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Abraham Obeys', verseRange: [23, 27], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
];

const GENESIS_18_SECTIONS: DaySection[] = [
  { day: 'Three Visitors', verseRange: [1, 15], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'Abraham Intercedes for Sodom', verseRange: [16, 33], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const GENESIS_19_SECTIONS: DaySection[] = [
  { day: 'Angels in Sodom', verseRange: [1, 11], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Escape from Sodom', verseRange: [12, 29], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Lot and His Daughters', verseRange: [30, 38], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
];

const GENESIS_20_SECTIONS: DaySection[] = [
  { day: 'Abraham and Abimelek', verseRange: [1, 18], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
];

const GENESIS_21_SECTIONS: DaySection[] = [
  { day: 'Isaac Born', verseRange: [1, 8], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Hagar and Ishmael Sent Away', verseRange: [9, 21], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Treaty with Abimelek', verseRange: [22, 34], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
];

const GENESIS_22_SECTIONS: DaySection[] = [
  { day: 'Abraham Tested', verseRange: [1, 10], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'The Lord Provides', verseRange: [11, 19], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Nahor\'s Family', verseRange: [20, 24], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
];

const GENESIS_23_SECTIONS: DaySection[] = [
  { day: 'Sarah\'s Death and Burial', verseRange: [1, 20], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const GENESIS_24_SECTIONS: DaySection[] = [
  { day: 'The Servant\'s Mission', verseRange: [1, 27], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'At Rebekah\'s Home', verseRange: [28, 60], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Isaac Meets Rebekah', verseRange: [61, 67], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
];

const GENESIS_25_SECTIONS: DaySection[] = [
  { day: 'Abraham\'s Death', verseRange: [1, 11], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
  { day: 'Ishmael\'s Descendants', verseRange: [12, 18], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Jacob and Esau Born', verseRange: [19, 34], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const GENESIS_26_SECTIONS: DaySection[] = [
  { day: 'Isaac and Abimelek', verseRange: [1, 11], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'Disputes Over Wells', verseRange: [12, 25], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Treaty with Abimelek', verseRange: [26, 35], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
];

const GENESIS_27_SECTIONS: DaySection[] = [
  { day: 'Isaac Blesses Jacob', verseRange: [1, 29], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Esau\'s Distress', verseRange: [30, 46], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const GENESIS_28_SECTIONS: DaySection[] = [
  { day: 'Jacob Sent to Laban', verseRange: [1, 9], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Jacob\'s Dream at Bethel', verseRange: [10, 22], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const GENESIS_29_SECTIONS: DaySection[] = [
  { day: 'Jacob Arrives', verseRange: [1, 14], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Jacob Marries Leah and Rachel', verseRange: [15, 30], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Leah\'s Sons', verseRange: [31, 35], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const GENESIS_30_SECTIONS: DaySection[] = [
  { day: 'Rachel and Bilhah\'s Sons', verseRange: [1, 8], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Leah and Zilpah\'s Sons', verseRange: [9, 21], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Rachel\'s Son Joseph', verseRange: [22, 24], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Jacob Prospers', verseRange: [25, 43], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const GENESIS_31_SECTIONS: DaySection[] = [
  { day: 'Jacob Flees from Laban', verseRange: [1, 21], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Laban Pursues Jacob', verseRange: [22, 42], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Covenant at Mizpah', verseRange: [43, 55], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const GENESIS_32_SECTIONS: DaySection[] = [
  { day: 'Jacob Prepares to Meet Esau', verseRange: [1, 21], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Jacob Wrestles with God', verseRange: [22, 32], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const GENESIS_33_SECTIONS: DaySection[] = [
  { day: 'Jacob Meets Esau', verseRange: [1, 11], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Separation and Settlement', verseRange: [12, 20], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const GENESIS_34_SECTIONS: DaySection[] = [
  { day: 'Dinah and Shechem', verseRange: [1, 12], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'The Deception', verseRange: [13, 24], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'The Massacre', verseRange: [25, 31], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
];

const GENESIS_35_SECTIONS: DaySection[] = [
  { day: 'Return to Bethel', verseRange: [1, 15], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Rachel\'s Death', verseRange: [16, 22], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Isaac\'s Death', verseRange: [23, 29], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
];

const GENESIS_36_SECTIONS: DaySection[] = [
  { day: 'Esau\'s Descendants', verseRange: [1, 19], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Seir\'s Descendants', verseRange: [20, 30], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Kings of Edom', verseRange: [31, 43], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const GENESIS_37_SECTIONS: DaySection[] = [
  { day: 'Joseph\'s Dreams', verseRange: [1, 11], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Joseph Sold into Slavery', verseRange: [12, 28], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Jacob\'s Grief', verseRange: [29, 36], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
];

const GENESIS_38_SECTIONS: DaySection[] = [
  { day: 'Judah and Tamar', verseRange: [1, 11], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Tamar\'s Deception', verseRange: [12, 23], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Judah\'s Confession', verseRange: [24, 30], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const GENESIS_39_SECTIONS: DaySection[] = [
  { day: 'Joseph in Potiphar\'s House', verseRange: [1, 6], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Joseph\'s Temptation and Imprisonment', verseRange: [7, 20], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Joseph in Prison', verseRange: [21, 23], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const GENESIS_40_SECTIONS: DaySection[] = [
  { day: 'The Cupbearer and Baker\'s Dreams', verseRange: [1, 15], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Dreams Fulfilled', verseRange: [16, 23], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const GENESIS_41_SECTIONS: DaySection[] = [
  { day: 'Pharaoh\'s Dreams', verseRange: [1, 13], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Joseph Interprets the Dreams', verseRange: [14, 36], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Joseph Elevated to Power', verseRange: [37, 57], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const GENESIS_42_SECTIONS: DaySection[] = [
  { day: 'Brothers Go to Egypt', verseRange: [1, 17], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Brothers\' Guilt and Return', verseRange: [18, 38], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const GENESIS_43_SECTIONS: DaySection[] = [
  { day: 'Return to Egypt with Benjamin', verseRange: [1, 15], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Feast at Joseph\'s House', verseRange: [16, 34], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
];

const GENESIS_44_SECTIONS: DaySection[] = [
  { day: 'The Silver Cup', verseRange: [1, 17], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Judah\'s Plea', verseRange: [18, 34], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const GENESIS_45_SECTIONS: DaySection[] = [
  { day: 'Joseph Reveals Himself', verseRange: [1, 15], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Pharaoh\'s Invitation', verseRange: [16, 28], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const GENESIS_46_SECTIONS: DaySection[] = [
  { day: 'Journey to Egypt', verseRange: [1, 7], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Jacob\'s Descendants', verseRange: [8, 27], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
  { day: 'Reunion in Goshen', verseRange: [28, 34], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const GENESIS_47_SECTIONS: DaySection[] = [
  { day: 'Settlement in Goshen', verseRange: [1, 12], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Joseph\'s Administration', verseRange: [13, 26], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Jacob\'s Final Request', verseRange: [27, 31], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const GENESIS_48_SECTIONS: DaySection[] = [
  { day: 'Jacob Blesses Ephraim and Manasseh', verseRange: [1, 22], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const GENESIS_49_SECTIONS: DaySection[] = [
  { day: 'Jacob\'s Blessings: Reuben to Judah', verseRange: [1, 12], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Jacob\'s Blessings: Zebulun to Joseph', verseRange: [13, 26], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Benjamin and Jacob\'s Death', verseRange: [27, 33], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
];

const GENESIS_50_SECTIONS: DaySection[] = [
  { day: 'Jacob\'s Burial', verseRange: [1, 14], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Joseph Reassures His Brothers', verseRange: [15, 21], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Joseph\'s Death', verseRange: [22, 26], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
];

// EXODUS SECTIONS
const EXODUS_1_SECTIONS: DaySection[] = [
  { day: 'Israel Multiplies in Egypt', verseRange: [1, 7], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Oppression Under New Pharaoh', verseRange: [8, 14], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Hebrew Midwives Defy Pharaoh', verseRange: [15, 22], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const EXODUS_2_SECTIONS: DaySection[] = [
  { day: 'Birth and Rescue of Moses', verseRange: [1, 10], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Moses Flees to Midian', verseRange: [11, 22], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'God Hears Israel\'s Groaning', verseRange: [23, 25], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const EXODUS_3_SECTIONS: DaySection[] = [
  { day: 'The Burning Bush', verseRange: [1, 6], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'God\'s Commission to Moses', verseRange: [7, 12], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'The Name "I AM"', verseRange: [13, 15], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Instructions for Deliverance', verseRange: [16, 22], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const EXODUS_4_SECTIONS: DaySection[] = [
  { day: 'Three Signs for Moses', verseRange: [1, 9], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Moses\' Objections and Aaron', verseRange: [10, 17], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Return to Egypt', verseRange: [18, 26], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Meeting with Elders', verseRange: [27, 31], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const EXODUS_5_SECTIONS: DaySection[] = [
  { day: 'First Encounter with Pharaoh', verseRange: [1, 5], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Increased Burdens', verseRange: [6, 14], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
  { day: 'Complaints Against Moses', verseRange: [15, 23], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const EXODUS_6_SECTIONS: DaySection[] = [
  { day: 'God Renews His Promise', verseRange: [1, 9], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Genealogy of Moses and Aaron', verseRange: [10, 27], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
  { day: 'Aaron\'s Staff', verseRange: [28, 30], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const EXODUS_7_SECTIONS: DaySection[] = [
  { day: 'Moses and Aaron\'s Commission', verseRange: [1, 7], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Staff Becomes Serpent', verseRange: [8, 13], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'First Plague: Water to Blood', verseRange: [14, 25], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const EXODUS_8_SECTIONS: DaySection[] = [
  { day: 'Second Plague: Frogs', verseRange: [1, 15], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Third Plague: Gnats', verseRange: [16, 19], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Fourth Plague: Flies', verseRange: [20, 32], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const EXODUS_9_SECTIONS: DaySection[] = [
  { day: 'Fifth Plague: Livestock Disease', verseRange: [1, 7], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Sixth Plague: Boils', verseRange: [8, 12], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Seventh Plague: Hail', verseRange: [13, 35], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const EXODUS_10_SECTIONS: DaySection[] = [
  { day: 'Eighth Plague: Locusts', verseRange: [1, 20], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Ninth Plague: Darkness', verseRange: [21, 29], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
];

const EXODUS_11_SECTIONS: DaySection[] = [
  { day: 'Announcement of Final Plague', verseRange: [1, 10], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const EXODUS_12_SECTIONS: DaySection[] = [
  { day: 'Institution of Passover', verseRange: [1, 13], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Festival of Unleavened Bread', verseRange: [14, 20], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Tenth Plague: Death of Firstborn', verseRange: [21, 30], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'The Exodus Begins', verseRange: [31, 42], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Passover Regulations', verseRange: [43, 51], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const EXODUS_13_SECTIONS: DaySection[] = [
  { day: 'Consecration of Firstborn', verseRange: [1, 16], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Pillar of Cloud and Fire', verseRange: [17, 22], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const EXODUS_14_SECTIONS: DaySection[] = [
  { day: 'Pharaoh Pursues Israel', verseRange: [1, 9], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Fear and Faith', verseRange: [10, 14], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Crossing the Red Sea', verseRange: [15, 25], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Destruction of Egyptian Army', verseRange: [26, 31], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const EXODUS_15_SECTIONS: DaySection[] = [
  { day: 'Song of Moses', verseRange: [1, 18], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Song of Miriam', verseRange: [19, 21], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Bitter Water Made Sweet', verseRange: [22, 27], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const EXODUS_16_SECTIONS: DaySection[] = [
  { day: 'Grumbling in the Wilderness', verseRange: [1, 3], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
  { day: 'Promise of Manna and Quail', verseRange: [4, 12], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Gathering Manna', verseRange: [13, 21], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Sabbath Rest', verseRange: [22, 30], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Manna Preserved', verseRange: [31, 36], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const EXODUS_17_SECTIONS: DaySection[] = [
  { day: 'Water from the Rock', verseRange: [1, 7], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Victory over Amalek', verseRange: [8, 16], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const EXODUS_18_SECTIONS: DaySection[] = [
  { day: 'Jethro Visits Moses', verseRange: [1, 12], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Jethro\'s Counsel', verseRange: [13, 27], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const EXODUS_19_SECTIONS: DaySection[] = [
  { day: 'Arrival at Sinai', verseRange: [1, 2], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Covenant Proposal', verseRange: [3, 8], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Consecration of the People', verseRange: [9, 15], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'The Lord Descends on Sinai', verseRange: [16, 25], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const EXODUS_20_SECTIONS: DaySection[] = [
  { day: 'The Ten Commandments', verseRange: [1, 17], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'The People\'s Fear', verseRange: [18, 21], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
  { day: 'Laws about Worship', verseRange: [22, 26], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const EXODUS_21_SECTIONS: DaySection[] = [
  { day: 'Laws about Servants', verseRange: [1, 11], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Laws about Violence', verseRange: [12, 27], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Laws about Property Damage', verseRange: [28, 36], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const EXODUS_22_SECTIONS: DaySection[] = [
  { day: 'Laws about Theft and Restitution', verseRange: [1, 15], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Social and Moral Laws', verseRange: [16, 31], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const EXODUS_23_SECTIONS: DaySection[] = [
  { day: 'Laws about Justice', verseRange: [1, 9], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Sabbath and Festival Laws', verseRange: [10, 19], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'The Angel and the Promise', verseRange: [20, 33], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const EXODUS_24_SECTIONS: DaySection[] = [
  { day: 'Covenant Ceremony', verseRange: [1, 8], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Moses on the Mountain', verseRange: [9, 18], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
];

const EXODUS_25_SECTIONS: DaySection[] = [
  { day: 'Offerings for the Tabernacle', verseRange: [1, 9], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'The Ark of the Covenant', verseRange: [10, 22], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Table and Lampstand', verseRange: [23, 40], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const EXODUS_26_SECTIONS: DaySection[] = [
  { day: 'Tabernacle Curtains', verseRange: [1, 14], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Framework and Veil', verseRange: [15, 37], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const EXODUS_27_SECTIONS: DaySection[] = [
  { day: 'The Altar of Burnt Offering', verseRange: [1, 8], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'The Courtyard', verseRange: [9, 19], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Oil for the Lampstand', verseRange: [20, 21], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
];

const EXODUS_28_SECTIONS: DaySection[] = [
  { day: 'Garments for the Priests', verseRange: [1, 5], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'The Ephod', verseRange: [6, 14], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'The Breastpiece', verseRange: [15, 30], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Other Priestly Garments', verseRange: [31, 43], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const EXODUS_29_SECTIONS: DaySection[] = [
  { day: 'Consecration of Priests', verseRange: [1, 9], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Offerings for Ordination', verseRange: [10, 28], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Daily Offerings', verseRange: [29, 37], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'God\'s Promise to Dwell', verseRange: [38, 46], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const EXODUS_30_SECTIONS: DaySection[] = [
  { day: 'Altar of Incense', verseRange: [1, 10], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Census Tax', verseRange: [11, 16], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Bronze Basin', verseRange: [17, 21], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Anointing Oil and Incense', verseRange: [22, 38], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const EXODUS_31_SECTIONS: DaySection[] = [
  { day: 'Craftsmen for the Tabernacle', verseRange: [1, 11], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'The Sabbath Sign', verseRange: [12, 17], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'The Two Tablets', verseRange: [18, 18], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
];

const EXODUS_32_SECTIONS: DaySection[] = [
  { day: 'The Golden Calf', verseRange: [1, 6], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'God\'s Anger and Moses\' Intercession', verseRange: [7, 14], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Moses Destroys the Calf', verseRange: [15, 24], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Levites\' Zeal and Judgment', verseRange: [25, 29], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
  { day: 'Moses\' Second Intercession', verseRange: [30, 35], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const EXODUS_33_SECTIONS: DaySection[] = [
  { day: 'The Tent Outside the Camp', verseRange: [1, 11], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Moses\' Request for God\'s Presence', verseRange: [12, 17], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'God\'s Glory Passes By', verseRange: [18, 23], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const EXODUS_34_SECTIONS: DaySection[] = [
  { day: 'New Tablets', verseRange: [1, 9], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Covenant Renewed', verseRange: [10, 28], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Moses\' Radiant Face', verseRange: [29, 35], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
];

const EXODUS_35_SECTIONS: DaySection[] = [
  { day: 'Sabbath Regulations', verseRange: [1, 3], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Offerings for the Tabernacle', verseRange: [4, 29], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Bezalel and Oholiab', verseRange: [30, 35], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const EXODUS_36_SECTIONS: DaySection[] = [
  { day: 'Abundant Contributions', verseRange: [1, 7], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Construction of the Tabernacle', verseRange: [8, 38], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const EXODUS_37_SECTIONS: DaySection[] = [
  { day: 'The Ark', verseRange: [1, 9], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Table and Lampstand', verseRange: [10, 24], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Altar of Incense and Anointing Oil', verseRange: [25, 29], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const EXODUS_38_SECTIONS: DaySection[] = [
  { day: 'Altar and Basin', verseRange: [1, 8], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'The Courtyard', verseRange: [9, 20], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Materials Used', verseRange: [21, 31], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
];

const EXODUS_39_SECTIONS: DaySection[] = [
  { day: 'Priestly Garments', verseRange: [1, 31], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Completion of the Tabernacle', verseRange: [32, 43], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const EXODUS_40_SECTIONS: DaySection[] = [
  { day: 'Setting Up the Tabernacle', verseRange: [1, 33], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'The Glory of the Lord Fills', verseRange: [34, 38], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
];

// LEVITICUS SECTIONS
const LEVITICUS_1_SECTIONS: DaySection[] = [
  { day: 'Burnt Offering from Herd', verseRange: [1, 9], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Burnt Offering from Flock or Birds', verseRange: [10, 17], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const LEVITICUS_2_SECTIONS: DaySection[] = [
  { day: 'Grain Offering Types', verseRange: [1, 10], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Regulations for Grain Offerings', verseRange: [11, 16], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
];

const LEVITICUS_3_SECTIONS: DaySection[] = [
  { day: 'Peace Offering from Herd', verseRange: [1, 5], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Peace Offering from Flock', verseRange: [6, 17], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const LEVITICUS_4_SECTIONS: DaySection[] = [
  { day: 'Sin Offering for Priest', verseRange: [1, 12], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Sin Offering for Community', verseRange: [13, 21], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Sin Offering for Leader', verseRange: [22, 26], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Sin Offering for Individual', verseRange: [27, 35], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const LEVITICUS_5_SECTIONS: DaySection[] = [
  { day: 'Cases Requiring Sin Offering', verseRange: [1, 13], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Guilt Offering', verseRange: [14, 19], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const LEVITICUS_6_SECTIONS: DaySection[] = [
  { day: 'Guilt Offering for Deception', verseRange: [1, 7], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Law of Burnt Offering', verseRange: [8, 13], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Law of Grain Offering', verseRange: [14, 23], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Law of Sin Offering', verseRange: [24, 30], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const LEVITICUS_7_SECTIONS: DaySection[] = [
  { day: 'Law of Guilt Offering', verseRange: [1, 10], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Law of Peace Offering', verseRange: [11, 21], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Prohibition of Fat and Blood', verseRange: [22, 27], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
  { day: 'Priests\' Portion', verseRange: [28, 38], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const LEVITICUS_8_SECTIONS: DaySection[] = [
  { day: 'Consecration Ceremony Begins', verseRange: [1, 13], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Offerings for Ordination', verseRange: [14, 30], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Seven Days of Ordination', verseRange: [31, 36], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const LEVITICUS_9_SECTIONS: DaySection[] = [
  { day: 'First Offerings by Aaron', verseRange: [1, 14], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Offerings for the People', verseRange: [15, 21], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Glory of the Lord Appears', verseRange: [22, 24], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
];

const LEVITICUS_10_SECTIONS: DaySection[] = [
  { day: 'Death of Nadab and Abihu', verseRange: [1, 7], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Regulations for Priests', verseRange: [8, 15], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'The Sin Offering Controversy', verseRange: [16, 20], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const LEVITICUS_11_SECTIONS: DaySection[] = [
  { day: 'Clean and Unclean Land Animals', verseRange: [1, 8], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Water Creatures and Birds', verseRange: [9, 23], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Swarming Creatures', verseRange: [24, 38], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
  { day: 'Purpose of Dietary Laws', verseRange: [39, 47], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const LEVITICUS_12_SECTIONS: DaySection[] = [
  { day: 'Purification after Childbirth', verseRange: [1, 8], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
];

const LEVITICUS_13_SECTIONS: DaySection[] = [
  { day: 'Laws about Skin Diseases', verseRange: [1, 28], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Laws about Baldness', verseRange: [29, 46], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Laws about Mildew in Fabric', verseRange: [47, 59], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
];

const LEVITICUS_14_SECTIONS: DaySection[] = [
  { day: 'Cleansing from Skin Disease', verseRange: [1, 32], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Laws about Mildew in Houses', verseRange: [33, 57], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const LEVITICUS_15_SECTIONS: DaySection[] = [
  { day: 'Male Discharges', verseRange: [1, 18], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Female Discharges', verseRange: [19, 33], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
];

const LEVITICUS_16_SECTIONS: DaySection[] = [
  { day: 'Preparation for Day of Atonement', verseRange: [1, 10], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'The Atonement Ritual', verseRange: [11, 22], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Annual Observance', verseRange: [23, 34], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const LEVITICUS_17_SECTIONS: DaySection[] = [
  { day: 'One Place of Sacrifice', verseRange: [1, 9], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Prohibition Against Eating Blood', verseRange: [10, 16], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const LEVITICUS_18_SECTIONS: DaySection[] = [
  { day: 'Introduction to Sexual Laws', verseRange: [1, 5], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Unlawful Sexual Relations', verseRange: [6, 23], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
  { day: 'Warning Against Defilement', verseRange: [24, 30], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const LEVITICUS_19_SECTIONS: DaySection[] = [
  { day: 'Call to Holiness', verseRange: [1, 4], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Various Moral and Social Laws', verseRange: [5, 18], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'More Holiness Laws', verseRange: [19, 37], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const LEVITICUS_20_SECTIONS: DaySection[] = [
  { day: 'Penalties for Molech Worship', verseRange: [1, 5], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Penalties for Sexual Sins', verseRange: [6, 21], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Call to Separation', verseRange: [22, 27], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const LEVITICUS_21_SECTIONS: DaySection[] = [
  { day: 'Rules for Priests', verseRange: [1, 9], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Rules for High Priest', verseRange: [10, 15], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Priestly Qualifications', verseRange: [16, 24], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const LEVITICUS_22_SECTIONS: DaySection[] = [
  { day: 'Priests and Sacred Offerings', verseRange: [1, 16], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Acceptable Offerings', verseRange: [17, 33], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const LEVITICUS_23_SECTIONS: DaySection[] = [
  { day: 'The Sabbath', verseRange: [1, 3], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Passover and Unleavened Bread', verseRange: [4, 8], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Firstfruits and Weeks', verseRange: [9, 22], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Trumpets, Atonement, Booths', verseRange: [23, 44], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const LEVITICUS_24_SECTIONS: DaySection[] = [
  { day: 'Oil and Bread in the Tabernacle', verseRange: [1, 9], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Blasphemy and Retaliation Laws', verseRange: [10, 23], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const LEVITICUS_25_SECTIONS: DaySection[] = [
  { day: 'The Sabbath Year', verseRange: [1, 7], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'The Jubilee Year', verseRange: [8, 22], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Redemption of Property', verseRange: [23, 34], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Treatment of the Poor', verseRange: [35, 55], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const LEVITICUS_26_SECTIONS: DaySection[] = [
  { day: 'Blessings for Obedience', verseRange: [1, 13], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Curses for Disobedience', verseRange: [14, 39], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Promise of Restoration', verseRange: [40, 46], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const LEVITICUS_27_SECTIONS: DaySection[] = [
  { day: 'Vows and Valuations', verseRange: [1, 13], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Redemption of Property', verseRange: [14, 25], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Things Not Redeemable', verseRange: [26, 34], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

// NUMBERS SECTIONS
const NUMBERS_1_SECTIONS: DaySection[] = [
  { day: 'The Census Command', verseRange: [1, 4], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Tribal Leaders', verseRange: [5, 16], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Census Results', verseRange: [17, 46], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
  { day: 'Levites Exempted', verseRange: [47, 54], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const NUMBERS_2_SECTIONS: DaySection[] = [
  { day: 'Camp Arrangement East', verseRange: [1, 9], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Camp Arrangement South', verseRange: [10, 16], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Camp Arrangement West and North', verseRange: [17, 31], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Summary', verseRange: [32, 34], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const NUMBERS_3_SECTIONS: DaySection[] = [
  { day: 'Aaron\'s Sons', verseRange: [1, 4], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Duties of Levites', verseRange: [5, 13], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Levite Clans Numbered', verseRange: [14, 39], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Redemption of Firstborn', verseRange: [40, 51], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const NUMBERS_4_SECTIONS: DaySection[] = [
  { day: 'Kohathites\' Duties', verseRange: [1, 20], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Gershonites\' Duties', verseRange: [21, 28], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Merarites\' Duties', verseRange: [29, 33], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'Census of Levite Clans', verseRange: [34, 49], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
];

const NUMBERS_5_SECTIONS: DaySection[] = [
  { day: 'Purity of the Camp', verseRange: [1, 4], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Restitution for Wrongs', verseRange: [5, 10], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Test for Adultery', verseRange: [11, 31], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const NUMBERS_6_SECTIONS: DaySection[] = [
  { day: 'Nazirite Vow', verseRange: [1, 21], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Aaronic Blessing', verseRange: [22, 27], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const NUMBERS_7_SECTIONS: DaySection[] = [
  { day: 'Wagons for Levites', verseRange: [1, 9], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Tribal Offerings Days 1-6', verseRange: [10, 47], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Tribal Offerings Days 7-12', verseRange: [48, 83], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Summary and Voice from Ark', verseRange: [84, 89], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
];

const NUMBERS_8_SECTIONS: DaySection[] = [
  { day: 'Setting Up the Lamps', verseRange: [1, 4], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Consecration of Levites', verseRange: [5, 22], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Levite Service Years', verseRange: [23, 26], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const NUMBERS_9_SECTIONS: DaySection[] = [
  { day: 'Second Passover', verseRange: [1, 14], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Cloud Guides Israel', verseRange: [15, 23], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const NUMBERS_10_SECTIONS: DaySection[] = [
  { day: 'Silver Trumpets', verseRange: [1, 10], color: 'bg-silver-50 dark:bg-gray-900/20', borderColor: 'border-gray-400' },
  { day: 'Departure from Sinai', verseRange: [11, 28], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Hobab and the Ark', verseRange: [29, 36], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const NUMBERS_11_SECTIONS: DaySection[] = [
  { day: 'Complaints and Fire', verseRange: [1, 3], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Craving for Meat', verseRange: [4, 15], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Seventy Elders', verseRange: [16, 30], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Quail and Plague', verseRange: [31, 35], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
];

const NUMBERS_12_SECTIONS: DaySection[] = [
  { day: 'Miriam and Aaron Oppose Moses', verseRange: [1, 3], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'God Defends Moses', verseRange: [4, 9], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Miriam\'s Leprosy', verseRange: [10, 16], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
];

const NUMBERS_13_SECTIONS: DaySection[] = [
  { day: 'Twelve Spies Sent', verseRange: [1, 16], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Exploring Canaan', verseRange: [17, 25], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Report of the Spies', verseRange: [26, 33], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const NUMBERS_14_SECTIONS: DaySection[] = [
  { day: 'People Rebel', verseRange: [1, 10], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Moses Intercedes', verseRange: [11, 19], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'God\'s Judgment', verseRange: [20, 35], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
  { day: 'Failed Attempt to Enter', verseRange: [36, 45], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const NUMBERS_15_SECTIONS: DaySection[] = [
  { day: 'Offerings for the Future', verseRange: [1, 16], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Sin Offerings', verseRange: [17, 31], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Sabbath Breaker Stoned', verseRange: [32, 36], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
  { day: 'Tassels as Reminders', verseRange: [37, 41], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const NUMBERS_16_SECTIONS: DaySection[] = [
  { day: 'Korah\'s Rebellion', verseRange: [1, 11], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Dathan and Abiram', verseRange: [12, 15], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'The Test', verseRange: [16, 24], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Earth Swallows Rebels', verseRange: [25, 35], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
  { day: 'Plague and Atonement', verseRange: [36, 50], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const NUMBERS_17_SECTIONS: DaySection[] = [
  { day: 'Aaron\'s Staff Buds', verseRange: [1, 13], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const NUMBERS_18_SECTIONS: DaySection[] = [
  { day: 'Duties of Priests and Levites', verseRange: [1, 7], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Offerings for Priests', verseRange: [8, 20], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Tithes for Levites', verseRange: [21, 32], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const NUMBERS_19_SECTIONS: DaySection[] = [
  { day: 'Red Heifer Ritual', verseRange: [1, 10], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Water of Purification', verseRange: [11, 22], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const NUMBERS_20_SECTIONS: DaySection[] = [
  { day: 'Miriam Dies, Water from Rock', verseRange: [1, 13], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Edom Refuses Passage', verseRange: [14, 21], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Aaron\'s Death', verseRange: [22, 29], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
];

const NUMBERS_21_SECTIONS: DaySection[] = [
  { day: 'Victory over Canaanites', verseRange: [1, 3], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Bronze Serpent', verseRange: [4, 9], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Journey Continues', verseRange: [10, 20], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Defeat of Sihon and Og', verseRange: [21, 35], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const NUMBERS_22_SECTIONS: DaySection[] = [
  { day: 'Balak Summons Balaam', verseRange: [1, 14], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Second Summons', verseRange: [15, 21], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Balaam\'s Donkey Speaks', verseRange: [22, 35], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Balaam Meets Balak', verseRange: [36, 41], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const NUMBERS_23_SECTIONS: DaySection[] = [
  { day: 'Balaam\'s First Oracle', verseRange: [1, 12], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Balaam\'s Second Oracle', verseRange: [13, 26], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Balaam\'s Third Oracle', verseRange: [27, 30], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const NUMBERS_24_SECTIONS: DaySection[] = [
  { day: 'Balaam\'s Fourth Oracle', verseRange: [1, 9], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Balaam\'s Final Oracles', verseRange: [10, 25], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const NUMBERS_25_SECTIONS: DaySection[] = [
  { day: 'Moabite Women Seduce Israel', verseRange: [1, 5], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Phinehas\' Zeal', verseRange: [6, 18], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const NUMBERS_26_SECTIONS: DaySection[] = [
  { day: 'Second Census Begins', verseRange: [1, 4], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Census of Tribes', verseRange: [5, 51], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
  { day: 'Land Division Instructions', verseRange: [52, 56], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Levites Counted Separately', verseRange: [57, 65], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const NUMBERS_27_SECTIONS: DaySection[] = [
  { day: 'Daughters of Zelophehad', verseRange: [1, 11], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Joshua to Succeed Moses', verseRange: [12, 23], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const NUMBERS_28_SECTIONS: DaySection[] = [
  { day: 'Daily and Sabbath Offerings', verseRange: [1, 10], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Monthly and Festival Offerings', verseRange: [11, 31], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
];

const NUMBERS_29_SECTIONS: DaySection[] = [
  { day: 'Offerings for Seventh Month', verseRange: [1, 11], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Offerings for Feast of Booths', verseRange: [12, 40], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const NUMBERS_30_SECTIONS: DaySection[] = [
  { day: 'Vows by Men and Unmarried Women', verseRange: [1, 2], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Vows by Married Women', verseRange: [3, 16], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
];

const NUMBERS_31_SECTIONS: DaySection[] = [
  { day: 'War Against Midian', verseRange: [1, 12], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Purification After Battle', verseRange: [13, 24], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Division of Plunder', verseRange: [25, 54], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const NUMBERS_32_SECTIONS: DaySection[] = [
  { day: 'Reuben and Gad Request Land', verseRange: [1, 15], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Moses\' Conditional Agreement', verseRange: [16, 27], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Allocation East of Jordan', verseRange: [28, 42], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const NUMBERS_33_SECTIONS: DaySection[] = [
  { day: 'Journey from Egypt to Sinai', verseRange: [1, 15], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Journey from Sinai to Canaan', verseRange: [16, 49], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Instructions for Conquest', verseRange: [50, 56], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const NUMBERS_34_SECTIONS: DaySection[] = [
  { day: 'Boundaries of Canaan', verseRange: [1, 15], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Leaders to Divide the Land', verseRange: [16, 29], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const NUMBERS_35_SECTIONS: DaySection[] = [
  { day: 'Cities for Levites', verseRange: [1, 8], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Cities of Refuge', verseRange: [9, 34], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const NUMBERS_36_SECTIONS: DaySection[] = [
  { day: 'Inheritance for Women', verseRange: [1, 13], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
];

// DEUTERONOMY SECTIONS
const DEUTERONOMY_1_SECTIONS: DaySection[] = [
  { day: 'Introduction', verseRange: [1, 5], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Command to Leave Horeb', verseRange: [6, 8], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Appointment of Leaders', verseRange: [9, 18], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Failed Entry into Canaan', verseRange: [19, 46], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const DEUTERONOMY_2_SECTIONS: DaySection[] = [
  { day: 'Journey Through Edom and Moab', verseRange: [1, 23], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Defeat of Sihon', verseRange: [24, 37], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const DEUTERONOMY_3_SECTIONS: DaySection[] = [
  { day: 'Defeat of Og', verseRange: [1, 11], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Land East of Jordan Divided', verseRange: [12, 20], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Moses Forbidden to Enter', verseRange: [21, 29], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
];

const DEUTERONOMY_4_SECTIONS: DaySection[] = [
  { day: 'Obedience Commanded', verseRange: [1, 14], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Warning Against Idolatry', verseRange: [15, 31], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'The Lord Alone is God', verseRange: [32, 40], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Cities of Refuge', verseRange: [41, 43], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Introduction to the Law', verseRange: [44, 49], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const DEUTERONOMY_5_SECTIONS: DaySection[] = [
  { day: 'The Ten Commandments', verseRange: [1, 21], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Moses as Mediator', verseRange: [22, 33], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const DEUTERONOMY_6_SECTIONS: DaySection[] = [
  { day: 'The Greatest Commandment', verseRange: [1, 9], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Caution Against Forgetting', verseRange: [10, 19], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Teaching Children', verseRange: [20, 25], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const DEUTERONOMY_7_SECTIONS: DaySection[] = [
  { day: 'Destroy the Nations', verseRange: [1, 11], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Blessings for Obedience', verseRange: [12, 26], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const DEUTERONOMY_8_SECTIONS: DaySection[] = [
  { day: 'Remember the Wilderness', verseRange: [1, 10], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Warning Against Pride', verseRange: [11, 20], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const DEUTERONOMY_9_SECTIONS: DaySection[] = [
  { day: 'Not Because of Righteousness', verseRange: [1, 6], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'The Golden Calf Remembered', verseRange: [7, 21], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Moses\' Intercession', verseRange: [22, 29], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const DEUTERONOMY_10_SECTIONS: DaySection[] = [
  { day: 'New Tablets and the Ark', verseRange: [1, 11], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Fear and Love the Lord', verseRange: [12, 22], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const DEUTERONOMY_11_SECTIONS: DaySection[] = [
  { day: 'Love and Obey the Lord', verseRange: [1, 12], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Blessings and Curses', verseRange: [13, 25], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Blessings on Gerizim and Ebal', verseRange: [26, 32], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const DEUTERONOMY_12_SECTIONS: DaySection[] = [
  { day: 'One Place of Worship', verseRange: [1, 14], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Eating Meat', verseRange: [15, 28], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Warning Against Idolatry', verseRange: [29, 32], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const DEUTERONOMY_13_SECTIONS: DaySection[] = [
  { day: 'False Prophets', verseRange: [1, 5], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Family Members Who Entice', verseRange: [6, 11], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Apostate Cities', verseRange: [12, 18], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
];

const DEUTERONOMY_14_SECTIONS: DaySection[] = [
  { day: 'Clean and Unclean Food', verseRange: [1, 21], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Tithes', verseRange: [22, 29], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
];

const DEUTERONOMY_15_SECTIONS: DaySection[] = [
  { day: 'Year of Release', verseRange: [1, 11], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Hebrew Servants', verseRange: [12, 18], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Firstborn Animals', verseRange: [19, 23], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const DEUTERONOMY_16_SECTIONS: DaySection[] = [
  { day: 'Passover', verseRange: [1, 8], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Feast of Weeks and Booths', verseRange: [9, 17], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Judges and Justice', verseRange: [18, 20], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Forbidden Worship', verseRange: [21, 22], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const DEUTERONOMY_17_SECTIONS: DaySection[] = [
  { day: 'Acceptable Sacrifices', verseRange: [1, 1], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Idolaters Must Die', verseRange: [2, 7], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Hard Cases for Priests', verseRange: [8, 13], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Laws Concerning Kings', verseRange: [14, 20], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const DEUTERONOMY_18_SECTIONS: DaySection[] = [
  { day: 'Provision for Levites', verseRange: [1, 8], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Detestable Practices', verseRange: [9, 14], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'The Prophet Like Moses', verseRange: [15, 22], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const DEUTERONOMY_19_SECTIONS: DaySection[] = [
  { day: 'Cities of Refuge', verseRange: [1, 13], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Boundary Stones', verseRange: [14, 14], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Witnesses', verseRange: [15, 21], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const DEUTERONOMY_20_SECTIONS: DaySection[] = [
  { day: 'Laws for Warfare', verseRange: [1, 9], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Distant Cities', verseRange: [10, 15], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Cities in Canaan', verseRange: [16, 18], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
  { day: 'Trees in Siege', verseRange: [19, 20], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const DEUTERONOMY_21_SECTIONS: DaySection[] = [
  { day: 'Unsolved Murder', verseRange: [1, 9], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Female Captives', verseRange: [10, 14], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Rights of Firstborn', verseRange: [15, 17], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Rebellious Son', verseRange: [18, 21], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Hanged on a Tree', verseRange: [22, 23], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
];

const DEUTERONOMY_22_SECTIONS: DaySection[] = [
  { day: 'Various Laws', verseRange: [1, 12], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Laws About Sexual Purity', verseRange: [13, 30], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const DEUTERONOMY_23_SECTIONS: DaySection[] = [
  { day: 'Exclusion from Assembly', verseRange: [1, 8], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
  { day: 'Cleanliness in Camp', verseRange: [9, 14], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Miscellaneous Laws', verseRange: [15, 25], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const DEUTERONOMY_24_SECTIONS: DaySection[] = [
  { day: 'Laws About Divorce', verseRange: [1, 4], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Miscellaneous Laws', verseRange: [5, 22], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const DEUTERONOMY_25_SECTIONS: DaySection[] = [
  { day: 'Flogging', verseRange: [1, 3], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Oxen and Levirate Marriage', verseRange: [4, 10], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Various Laws', verseRange: [11, 16], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Blot Out Amalek', verseRange: [17, 19], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const DEUTERONOMY_26_SECTIONS: DaySection[] = [
  { day: 'Firstfruits and Tithes', verseRange: [1, 15], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Covenant Reaffirmed', verseRange: [16, 19], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const DEUTERONOMY_27_SECTIONS: DaySection[] = [
  { day: 'The Altar on Mount Ebal', verseRange: [1, 10], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
  { day: 'Curses from Mount Ebal', verseRange: [11, 26], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const DEUTERONOMY_28_SECTIONS: DaySection[] = [
  { day: 'Blessings for Obedience', verseRange: [1, 14], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Curses for Disobedience', verseRange: [15, 68], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const DEUTERONOMY_29_SECTIONS: DaySection[] = [
  { day: 'Review of God\'s Faithfulness', verseRange: [1, 9], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Covenant in Moab', verseRange: [10, 15], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Warning Against Idolatry', verseRange: [16, 29], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const DEUTERONOMY_30_SECTIONS: DaySection[] = [
  { day: 'Restoration Promised', verseRange: [1, 10], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'The Choice of Life or Death', verseRange: [11, 20], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const DEUTERONOMY_31_SECTIONS: DaySection[] = [
  { day: 'Joshua Commissioned', verseRange: [1, 8], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Reading of the Law', verseRange: [9, 13], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Israel\'s Rebellion Predicted', verseRange: [14, 23], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'The Law Placed in the Ark', verseRange: [24, 29], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const DEUTERONOMY_32_SECTIONS: DaySection[] = [
  { day: 'Song of Moses: Introduction', verseRange: [1, 6], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'God\'s Care for Israel', verseRange: [7, 14], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Israel\'s Rebellion', verseRange: [15, 25], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'God\'s Judgment and Mercy', verseRange: [26, 43], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Moses to Die on Mount Nebo', verseRange: [44, 52], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
];

const DEUTERONOMY_33_SECTIONS: DaySection[] = [
  { day: 'Introduction to Blessings', verseRange: [1, 5], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Blessings on Tribes', verseRange: [6, 25], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Conclusion', verseRange: [26, 29], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const DEUTERONOMY_34_SECTIONS: DaySection[] = [
  { day: 'Moses Views the Promised Land', verseRange: [1, 4], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Death of Moses', verseRange: [5, 8], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
  { day: 'Joshua Succeeds Moses', verseRange: [9, 12], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

// MARK SECTIONS
const MARK_1_SECTIONS: DaySection[] = [
  { day: 'John the Baptist', verseRange: [1, 8], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Baptism and Temptation', verseRange: [9, 13], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Calling the Disciples', verseRange: [14, 20], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Authority Over Demons', verseRange: [21, 28], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Healing Ministry', verseRange: [29, 39], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Cleansing the Leper', verseRange: [40, 45], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
];

const MARK_2_SECTIONS: DaySection[] = [
  { day: 'Paralytic Forgiven', verseRange: [1, 12], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Calling Levi', verseRange: [13, 17], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Questions About Fasting', verseRange: [18, 22], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Lord of Sabbath', verseRange: [23, 28], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
];

const MARK_3_SECTIONS: DaySection[] = [
  { day: 'Sabbath Healing', verseRange: [1, 6], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'Crowds and Twelve', verseRange: [7, 19], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'Beelzebul Accusation', verseRange: [20, 30], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'True Family', verseRange: [31, 35], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const MARK_4_SECTIONS: DaySection[] = [
  { day: 'Parable of Sower', verseRange: [1, 20], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Lamp and Measure', verseRange: [21, 25], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Growing Seed', verseRange: [26, 29], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Mustard Seed', verseRange: [30, 34], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Calming the Storm', verseRange: [35, 41], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const MARK_5_SECTIONS: DaySection[] = [
  { day: 'Gerasene Demoniac', verseRange: [1, 20], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Jairus\' Plea', verseRange: [21, 24], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Woman Healed', verseRange: [25, 34], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Raising the Dead', verseRange: [35, 43], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const MARK_6_SECTIONS: DaySection[] = [
  { day: 'Rejection at Nazareth', verseRange: [1, 6], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Sending the Twelve', verseRange: [7, 13], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'John\'s Death', verseRange: [14, 29], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Feeding Five Thousand', verseRange: [30, 44], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Walking on Water', verseRange: [45, 56], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
];

const MARK_7_SECTIONS: DaySection[] = [
  { day: 'Clean and Unclean', verseRange: [1, 23], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Syrophoenician Woman', verseRange: [24, 30], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Healing the Deaf', verseRange: [31, 37], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const MARK_8_SECTIONS: DaySection[] = [
  { day: 'Feeding Four Thousand', verseRange: [1, 10], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Pharisees Demand Sign', verseRange: [11, 21], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
  { day: 'Blind Man Healed', verseRange: [22, 26], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Peter\'s Confession', verseRange: [27, 30], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'First Passion Prediction', verseRange: [31, 38], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const MARK_9_SECTIONS: DaySection[] = [
  { day: 'The Transfiguration', verseRange: [1, 13], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Healing Possessed Boy', verseRange: [14, 29], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Second Passion Prediction', verseRange: [30, 32], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'True Greatness', verseRange: [33, 50], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const MARK_10_SECTIONS: DaySection[] = [
  { day: 'Marriage and Divorce', verseRange: [1, 12], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Blessing the Children', verseRange: [13, 16], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Rich Young Man', verseRange: [17, 31], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Third Passion Prediction', verseRange: [32, 34], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Servant Leadership', verseRange: [35, 45], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'Blind Bartimaeus', verseRange: [46, 52], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
];

const MARK_11_SECTIONS: DaySection[] = [
  { day: 'Triumphal Entry', verseRange: [1, 11], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Cursing the Fig Tree', verseRange: [12, 14], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Cleansing the Temple', verseRange: [15, 19], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Faith and Prayer', verseRange: [20, 26], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Authority Challenged', verseRange: [27, 33], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const MARK_12_SECTIONS: DaySection[] = [
  { day: 'Wicked Tenants', verseRange: [1, 12], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Paying Taxes', verseRange: [13, 17], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Marriage at Resurrection', verseRange: [18, 27], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Greatest Commandment', verseRange: [28, 34], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Questions About Messiah', verseRange: [35, 40], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Widow\'s Offering', verseRange: [41, 44], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
];

const MARK_13_SECTIONS: DaySection[] = [
  { day: 'Temple Destruction Foretold', verseRange: [1, 4], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
  { day: 'Signs Before End', verseRange: [5, 13], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Great Tribulation', verseRange: [14, 23], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Son of Man Coming', verseRange: [24, 31], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Watch and Be Ready', verseRange: [32, 37], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
];

const MARK_14_SECTIONS: DaySection[] = [
  { day: 'Plot and Anointing', verseRange: [1, 11], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Last Supper', verseRange: [12, 26], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Peter\'s Denial Predicted', verseRange: [27, 31], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Gethsemane', verseRange: [32, 42], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Arrest and Trial', verseRange: [43, 65], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Peter Denies Jesus', verseRange: [66, 72], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
];

const MARK_15_SECTIONS: DaySection[] = [
  { day: 'Jesus Before Pilate', verseRange: [1, 15], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
  { day: 'Soldiers Mock Jesus', verseRange: [16, 20], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'The Crucifixion', verseRange: [21, 32], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Death of Jesus', verseRange: [33, 41], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Burial', verseRange: [42, 47], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
];

const MARK_16_SECTIONS: DaySection[] = [
  { day: 'Empty Tomb', verseRange: [1, 8], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Appearances and Commission', verseRange: [9, 20], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
];

// MATTHEW SECTIONS
const JOSHUA_1_SECTIONS: DaySection[] = [
  { day: 'Be Strong and Courageous', verseRange: [1, 9], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Orders to Cross', verseRange: [10, 15], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'The People Pledge', verseRange: [16, 18], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const JOSHUA_2_SECTIONS: DaySection[] = [
  { day: 'Spies Sent to Jericho', verseRange: [1, 7], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: "Rahab's Faith", verseRange: [8, 14], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'The Scarlet Cord', verseRange: [15, 24], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const JOSHUA_3_SECTIONS: DaySection[] = [
  { day: 'To the Jordan', verseRange: [1, 8], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'The Waters Stop', verseRange: [9, 17], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const JOSHUA_4_SECTIONS: DaySection[] = [
  { day: 'Twelve Stones', verseRange: [1, 14], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Memorial at Gilgal', verseRange: [15, 24], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const JOSHUA_5_SECTIONS: DaySection[] = [
  { day: 'Circumcision at Gilgal', verseRange: [1, 9], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'First Passover in the Land', verseRange: [10, 12], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'The Commander of the Army', verseRange: [13, 15], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const JOSHUA_6_SECTIONS: DaySection[] = [
  { day: 'Marching Orders', verseRange: [1, 14], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'The Walls Fall', verseRange: [15, 21], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Rahab Spared', verseRange: [22, 27], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const JOSHUA_7_SECTIONS: DaySection[] = [
  { day: 'Defeat at Ai', verseRange: [1, 9], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Sin in the Camp', verseRange: [10, 15], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Achan Exposed', verseRange: [16, 26], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const JOSHUA_8_SECTIONS: DaySection[] = [
  { day: 'The Ambush Plan', verseRange: [1, 13], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Ai Destroyed', verseRange: [14, 29], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Covenant at Mount Ebal', verseRange: [30, 35], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const JOSHUA_9_SECTIONS: DaySection[] = [
  { day: 'The Gibeonite Deception', verseRange: [1, 15], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'The Treaty Stands', verseRange: [16, 27], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const JOSHUA_10_SECTIONS: DaySection[] = [
  { day: 'The Sun Stands Still', verseRange: [1, 15], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Five Kings in a Cave', verseRange: [16, 28], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'The Southern Campaign', verseRange: [29, 43], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const JOSHUA_11_SECTIONS: DaySection[] = [
  { day: 'The Northern Coalition', verseRange: [1, 9], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'The Whole Land Taken', verseRange: [10, 23], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const JOSHUA_12_SECTIONS: DaySection[] = [
  { day: 'Kings East of the Jordan', verseRange: [1, 6], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Kings West of the Jordan', verseRange: [7, 24], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const JOSHUA_13_SECTIONS: DaySection[] = [
  { day: 'Land Yet to Be Taken', verseRange: [1, 7], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'The Eastern Inheritance', verseRange: [8, 33], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const JOSHUA_14_SECTIONS: DaySection[] = [
  { day: 'Dividing the Inheritance', verseRange: [1, 5], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: "Caleb's Mountain", verseRange: [6, 15], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const JOSHUA_15_SECTIONS: DaySection[] = [
  { day: "Judah's Borders", verseRange: [1, 12], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Caleb and Aksah', verseRange: [13, 19], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: "Judah's Towns", verseRange: [20, 63], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const JOSHUA_16_SECTIONS: DaySection[] = [
  { day: "Ephraim's Inheritance", verseRange: [1, 10], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
];

const JOSHUA_17_SECTIONS: DaySection[] = [
  { day: "Manasseh's Inheritance", verseRange: [1, 13], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'The Joseph Tribes Push Back', verseRange: [14, 18], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const JOSHUA_18_SECTIONS: DaySection[] = [
  { day: 'The Tent at Shiloh', verseRange: [1, 10], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: "Benjamin's Territory", verseRange: [11, 28], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const JOSHUA_19_SECTIONS: DaySection[] = [
  { day: 'The Remaining Tribes', verseRange: [1, 48], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: "Joshua's Own Town", verseRange: [49, 51], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const JOSHUA_20_SECTIONS: DaySection[] = [
  { day: 'Cities of Refuge', verseRange: [1, 9], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
];

const JOSHUA_21_SECTIONS: DaySection[] = [
  { day: 'Towns for the Levites', verseRange: [1, 42], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Not One Promise Failed', verseRange: [43, 45], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const JOSHUA_22_SECTIONS: DaySection[] = [
  { day: 'The Eastern Tribes Go Home', verseRange: [1, 9], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'The Altar of Witness', verseRange: [10, 34], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const JOSHUA_23_SECTIONS: DaySection[] = [
  { day: "Joshua's Farewell", verseRange: [1, 16], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
];

const JOSHUA_24_SECTIONS: DaySection[] = [
  { day: 'The Covenant at Shechem', verseRange: [1, 28], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Three Burials', verseRange: [29, 33], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const JUDGES_1_SECTIONS: DaySection[] = [
  { day: 'Judah Leads', verseRange: [1, 21], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'The Failures Spread', verseRange: [22, 36], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const JUDGES_2_SECTIONS: DaySection[] = [
  { day: 'The Angel at Bokim', verseRange: [1, 5], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'A Generation Forgets', verseRange: [6, 10], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'The Cycle Begins', verseRange: [11, 23], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const JUDGES_3_SECTIONS: DaySection[] = [
  { day: 'The Nations That Remained', verseRange: [1, 6], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Othniel', verseRange: [7, 11], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: "Ehud's Left Hand", verseRange: [12, 30], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Shamgar', verseRange: [31, 31], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const JUDGES_4_SECTIONS: DaySection[] = [
  { day: 'Deborah and Barak', verseRange: [1, 10], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: "Sisera's Defeat", verseRange: [11, 16], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: "Jael's Tent Peg", verseRange: [17, 24], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const JUDGES_5_SECTIONS: DaySection[] = [
  { day: 'The Song of Deborah', verseRange: [1, 31], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
];

const JUDGES_6_SECTIONS: DaySection[] = [
  { day: "Midian's Oppression", verseRange: [1, 10], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'The Call of Gideon', verseRange: [11, 24], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'The Altar Torn Down', verseRange: [25, 32], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'The Fleece', verseRange: [33, 40], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const JUDGES_7_SECTIONS: DaySection[] = [
  { day: 'Three Hundred Men', verseRange: [1, 8], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'The Dream in the Camp', verseRange: [9, 15], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Torches and Trumpets', verseRange: [16, 25], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const JUDGES_8_SECTIONS: DaySection[] = [
  { day: 'Pursuit Beyond the Jordan', verseRange: [1, 21], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: "Gideon's Ephod", verseRange: [22, 27], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'After Gideon', verseRange: [28, 35], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const JUDGES_9_SECTIONS: DaySection[] = [
  { day: 'Abimelech Seizes Power', verseRange: [1, 6], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: "Jotham's Parable", verseRange: [7, 21], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Shechem Revolts', verseRange: [22, 49], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'A Millstone Falls', verseRange: [50, 57], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const JUDGES_10_SECTIONS: DaySection[] = [
  { day: 'Tola and Jair', verseRange: [1, 5], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Sold to Their Enemies', verseRange: [6, 18], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const JUDGES_11_SECTIONS: DaySection[] = [
  { day: 'Jephthah the Outcast', verseRange: [1, 11], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'The Case Against Ammon', verseRange: [12, 28], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'The Rash Vow', verseRange: [29, 40], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const JUDGES_12_SECTIONS: DaySection[] = [
  { day: 'The Ephraimite War', verseRange: [1, 7], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Three Minor Judges', verseRange: [8, 15], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const JUDGES_13_SECTIONS: DaySection[] = [
  { day: 'The Angel and the Barren Wife', verseRange: [1, 14], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: "Manoah's Offering", verseRange: [15, 23], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Samson Is Born', verseRange: [24, 25], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const JUDGES_14_SECTIONS: DaySection[] = [
  { day: 'A Wife from Timnah', verseRange: [1, 9], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'The Riddle at the Feast', verseRange: [10, 20], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const JUDGES_15_SECTIONS: DaySection[] = [
  { day: 'Foxes and Fire', verseRange: [1, 8], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'The Jawbone', verseRange: [9, 20], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const JUDGES_16_SECTIONS: DaySection[] = [
  { day: 'The Gates of Gaza', verseRange: [1, 3], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Delilah', verseRange: [4, 22], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Strength Returns Once More', verseRange: [23, 31], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const JUDGES_17_SECTIONS: DaySection[] = [
  { day: "Micah's Shrine", verseRange: [1, 6], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'A Priest for Hire', verseRange: [7, 13], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const JUDGES_18_SECTIONS: DaySection[] = [
  { day: 'The Danites Scout Laish', verseRange: [1, 10], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'The Stolen Gods', verseRange: [11, 26], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Laish Falls', verseRange: [27, 31], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const JUDGES_19_SECTIONS: DaySection[] = [
  { day: "The Levite's Journey", verseRange: [1, 15], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'The Outrage at Gibeah', verseRange: [16, 30], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const JUDGES_20_SECTIONS: DaySection[] = [
  { day: 'Israel Assembles', verseRange: [1, 17], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'War with Benjamin', verseRange: [18, 48], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const JUDGES_21_SECTIONS: DaySection[] = [
  { day: 'Wives for the Survivors', verseRange: [1, 25], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
];

const MATTHEW_1_SECTIONS: DaySection[] = [
  { day: 'The Genealogy', verseRange: [1, 17], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'The Birth of Jesus', verseRange: [18, 25], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
];

const MATTHEW_2_SECTIONS: DaySection[] = [
  { day: 'The Magi Visit', verseRange: [1, 12], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Escape to Egypt', verseRange: [13, 18], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Return to Nazareth', verseRange: [19, 23], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const MATTHEW_3_SECTIONS: DaySection[] = [
  { day: 'John the Baptist Prepares the Way', verseRange: [1, 12], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'The Baptism of Jesus', verseRange: [13, 17], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const MATTHEW_4_SECTIONS: DaySection[] = [
  { day: 'The Temptation', verseRange: [1, 11], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Jesus Begins His Ministry', verseRange: [12, 17], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Jesus Calls the First Disciples', verseRange: [18, 22], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Jesus Heals the Sick', verseRange: [23, 25], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
];

const MATTHEW_5_SECTIONS: DaySection[] = [
  { day: 'Beatitudes', verseRange: [1, 12], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Salt and Light', verseRange: [13, 16], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Fulfilling the Law', verseRange: [17, 20], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Teaching on Anger', verseRange: [21, 26], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Teaching on Adultery', verseRange: [27, 30], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Teaching on Divorce', verseRange: [31, 32], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Teaching on Oaths', verseRange: [33, 37], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Eye for Eye', verseRange: [38, 42], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Love for Enemies', verseRange: [43, 48], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const MATTHEW_6_SECTIONS: DaySection[] = [
  { day: 'Giving to the Needy', verseRange: [1, 4], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Teaching on Prayer', verseRange: [5, 15], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'Teaching on Fasting', verseRange: [16, 18], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'Treasures in Heaven', verseRange: [19, 24], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Do Not Worry', verseRange: [25, 34], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const MATTHEW_7_SECTIONS: DaySection[] = [
  { day: 'Judging Others', verseRange: [1, 6], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Ask, Seek, Knock', verseRange: [7, 12], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
  { day: 'Narrow and Wide Gates', verseRange: [13, 14], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
  { day: 'True and False Prophets', verseRange: [15, 23], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Wise and Foolish Builders', verseRange: [24, 29], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
];

const MATTHEW_8_SECTIONS: DaySection[] = [
  { day: 'Jesus Heals a Leper', verseRange: [1, 4], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'The Centurion\'s Faith', verseRange: [5, 13], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Many Healed', verseRange: [14, 17], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'The Cost of Following Jesus', verseRange: [18, 22], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Jesus Calms the Storm', verseRange: [23, 27], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'The Demon-Possessed Men', verseRange: [28, 34], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const MATTHEW_9_SECTIONS: DaySection[] = [
  { day: 'Jesus Heals a Paralytic', verseRange: [1, 8], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'The Call of Matthew', verseRange: [9, 13], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Question About Fasting', verseRange: [14, 17], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'A Dead Girl and a Sick Woman', verseRange: [18, 26], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'Jesus Heals the Blind and Mute', verseRange: [27, 34], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'The Workers Are Few', verseRange: [35, 38], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const MATTHEW_10_SECTIONS: DaySection[] = [
  { day: 'The Twelve Apostles', verseRange: [1, 4], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Jesus Sends Out the Twelve', verseRange: [5, 15], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
  { day: 'Sheep Among Wolves', verseRange: [16, 23], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
  { day: 'Do Not Fear', verseRange: [24, 33], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Not Peace but a Sword', verseRange: [34, 42], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
];

const MATTHEW_11_SECTIONS: DaySection[] = [
  { day: 'John the Baptist\'s Question', verseRange: [1, 6], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Jesus Testifies About John', verseRange: [7, 19], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Woe to Unrepentant Cities', verseRange: [20, 24], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Come to Me and Rest', verseRange: [25, 30], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
];

const MATTHEW_12_SECTIONS: DaySection[] = [
  { day: 'Lord of the Sabbath', verseRange: [1, 14], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'God\'s Chosen Servant', verseRange: [15, 21], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Jesus and Beelzebul', verseRange: [22, 37], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'The Sign of Jonah', verseRange: [38, 45], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Jesus\' Mother and Brothers', verseRange: [46, 50], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
];

const MATTHEW_13_SECTIONS: DaySection[] = [
  { day: 'Parable of the Sower', verseRange: [1, 23], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Parable of the Weeds', verseRange: [24, 30], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Parables of Mustard Seed and Yeast', verseRange: [31, 35], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Parable of the Weeds Explained', verseRange: [36, 43], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Parables of Hidden Treasure, Pearl, and Net', verseRange: [44, 52], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Prophet Without Honor', verseRange: [53, 58], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const MATTHEW_14_SECTIONS: DaySection[] = [
  { day: 'John the Baptist Beheaded', verseRange: [1, 12], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'Jesus Feeds the Five Thousand', verseRange: [13, 21], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Jesus Walks on Water', verseRange: [22, 36], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const MATTHEW_15_SECTIONS: DaySection[] = [
  { day: 'Clean and Unclean', verseRange: [1, 20], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'The Canaanite Woman\'s Faith', verseRange: [21, 28], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
  { day: 'Jesus Feeds the Four Thousand', verseRange: [29, 39], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
];

const MATTHEW_16_SECTIONS: DaySection[] = [
  { day: 'The Pharisees and Sadducees Demand a Sign', verseRange: [1, 4], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'The Yeast of the Pharisees', verseRange: [5, 12], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Peter\'s Confession of Christ', verseRange: [13, 20], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Jesus Predicts His Death', verseRange: [21, 28], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const MATTHEW_17_SECTIONS: DaySection[] = [
  { day: 'The Transfiguration', verseRange: [1, 13], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Jesus Heals a Demon-Possessed Boy', verseRange: [14, 21], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Jesus Predicts His Death Again', verseRange: [22, 23], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'The Temple Tax', verseRange: [24, 27], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const MATTHEW_18_SECTIONS: DaySection[] = [
  { day: 'The Greatest in the Kingdom', verseRange: [1, 9], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'The Parable of the Lost Sheep', verseRange: [10, 14], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Dealing with Sin in the Church', verseRange: [15, 20], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'The Parable of the Unmerciful Servant', verseRange: [21, 35], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
];

const MATTHEW_19_SECTIONS: DaySection[] = [
  { day: 'Divorce', verseRange: [1, 12], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Jesus Blesses Little Children', verseRange: [13, 15], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'The Rich Young Man', verseRange: [16, 30], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
];

const MATTHEW_20_SECTIONS: DaySection[] = [
  { day: 'The Parable of the Workers in the Vineyard', verseRange: [1, 16], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
  { day: 'Jesus Predicts His Death a Third Time', verseRange: [17, 19], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
  { day: 'The Request of James and John', verseRange: [20, 28], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Two Blind Men Receive Sight', verseRange: [29, 34], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
];

const MATTHEW_21_SECTIONS: DaySection[] = [
  { day: 'The Triumphal Entry', verseRange: [1, 11], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Jesus Clears the Temple', verseRange: [12, 17], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Jesus Curses a Fig Tree', verseRange: [18, 22], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'The Authority of Jesus Questioned', verseRange: [23, 27], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'The Parable of the Two Sons', verseRange: [28, 32], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'The Parable of the Tenants', verseRange: [33, 46], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const MATTHEW_22_SECTIONS: DaySection[] = [
  { day: 'The Parable of the Wedding Banquet', verseRange: [1, 14], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Paying Taxes to Caesar', verseRange: [15, 22], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Marriage at the Resurrection', verseRange: [23, 33], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'The Greatest Commandment', verseRange: [34, 40], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'Whose Son is the Christ?', verseRange: [41, 46], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const MATTHEW_23_SECTIONS: DaySection[] = [
  { day: 'Warning Against Hypocrisy', verseRange: [1, 12], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Seven Woes to the Pharisees', verseRange: [13, 36], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Lament Over Jerusalem', verseRange: [37, 39], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
];

const MATTHEW_24_SECTIONS: DaySection[] = [
  { day: 'Signs of the End', verseRange: [1, 14], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'The Great Tribulation', verseRange: [15, 28], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Coming of the Son of Man', verseRange: [29, 35], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'No One Knows the Day', verseRange: [36, 51], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
];

const MATTHEW_25_SECTIONS: DaySection[] = [
  { day: 'The Parable of the Ten Virgins', verseRange: [1, 13], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
  { day: 'The Parable of the Talents', verseRange: [14, 30], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'The Sheep and the Goats', verseRange: [31, 46], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
];

const MATTHEW_26_SECTIONS: DaySection[] = [
  { day: 'Plot to Kill Jesus', verseRange: [1, 5], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Anointing at Bethany', verseRange: [6, 13], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Judas Agrees to Betray', verseRange: [14, 16], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'The Last Supper', verseRange: [17, 30], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
  { day: 'Jesus Predicts Peter\'s Denial', verseRange: [31, 35], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
  { day: 'Gethsemane', verseRange: [36, 46], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Jesus Arrested', verseRange: [47, 56], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Before the Sanhedrin', verseRange: [57, 68], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Peter Denies Jesus', verseRange: [69, 75], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const MATTHEW_27_SECTIONS: DaySection[] = [
  { day: 'Judas Hangs Himself', verseRange: [1, 10], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Jesus Before Pilate', verseRange: [11, 26], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'The Soldiers Mock Jesus', verseRange: [27, 31], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'The Crucifixion', verseRange: [32, 44], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'The Death of Jesus', verseRange: [45, 56], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'The Burial of Jesus', verseRange: [57, 66], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
];

const MATTHEW_28_SECTIONS: DaySection[] = [
  { day: 'The Resurrection', verseRange: [1, 10], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'The Guards\' Report', verseRange: [11, 15], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'The Great Commission', verseRange: [16, 20], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

// LUKE SECTIONS
const LUKE_1_SECTIONS: DaySection[] = [
  { day: 'Introduction', verseRange: [1, 4], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Birth of John Foretold', verseRange: [5, 25], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Birth of Jesus Foretold', verseRange: [26, 38], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Mary Visits Elizabeth', verseRange: [39, 56], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Birth of John the Baptist', verseRange: [57, 66], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Zechariah\'s Prophecy', verseRange: [67, 80], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
];

// JOHN SECTIONS
const JOHN_1_SECTIONS: DaySection[] = [
  { day: 'The Word Became Flesh', verseRange: [1, 18], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'John the Baptist\'s Testimony', verseRange: [19, 34], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'The First Disciples', verseRange: [35, 51], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const JOHN_2_SECTIONS: DaySection[] = [
  { day: 'The Wedding at Cana', verseRange: [1, 12], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Jesus Clears the Temple Courts', verseRange: [13, 25], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const JOHN_3_SECTIONS: DaySection[] = [
  { day: 'Jesus Teaches Nicodemus', verseRange: [1, 21], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'John Testifies About Jesus', verseRange: [22, 36], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const JOHN_4_SECTIONS: DaySection[] = [
  { day: 'Jesus and the Samaritan Woman', verseRange: [1, 26], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'The Disciples Rejoin Jesus', verseRange: [27, 38], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Many Samaritans Believe', verseRange: [39, 42], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Jesus Heals an Official\'s Son', verseRange: [43, 54], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
];

const JOHN_5_SECTIONS: DaySection[] = [
  { day: 'The Healing at the Pool', verseRange: [1, 15], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'The Authority of the Son', verseRange: [16, 30], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Testimonies About Jesus', verseRange: [31, 47], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const JOHN_6_SECTIONS: DaySection[] = [
  { day: 'Jesus Feeds the Five Thousand', verseRange: [1, 15], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Jesus Walks on Water', verseRange: [16, 21], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
  { day: 'The Bread of Life Discourse', verseRange: [22, 59], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
  { day: 'Many Disciples Desert Jesus', verseRange: [60, 71], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const JOHN_7_SECTIONS: DaySection[] = [
  { day: 'Jesus at the Festival of Tabernacles', verseRange: [1, 13], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Jesus Teaches at the Festival', verseRange: [14, 24], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Division Over Jesus', verseRange: [25, 44], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Unbelief of the Jewish Leaders', verseRange: [45, 53], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const JOHN_8_SECTIONS: DaySection[] = [
  { day: 'The Woman Caught in Adultery', verseRange: [1, 11], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'The Light of the World', verseRange: [12, 30], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Children of Abraham or the Devil', verseRange: [31, 47], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Before Abraham Was, I Am', verseRange: [48, 59], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const JOHN_9_SECTIONS: DaySection[] = [
  { day: 'Jesus Heals a Man Born Blind', verseRange: [1, 12], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'The Pharisees Investigate the Healing', verseRange: [13, 34], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'Spiritual Blindness', verseRange: [35, 41], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
];

const JOHN_10_SECTIONS: DaySection[] = [
  { day: 'The Good Shepherd', verseRange: [1, 21], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Further Conflict Over Jesus\' Identity', verseRange: [22, 42], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const JOHN_11_SECTIONS: DaySection[] = [
  { day: 'The Death of Lazarus', verseRange: [1, 16], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Jesus Comforts Martha and Mary', verseRange: [17, 37], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
  { day: 'Jesus Raises Lazarus', verseRange: [38, 44], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
  { day: 'The Plot to Kill Jesus', verseRange: [45, 57], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const JOHN_12_SECTIONS: DaySection[] = [
  { day: 'Mary Anoints Jesus at Bethany', verseRange: [1, 11], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Jesus Comes to Jerusalem as King', verseRange: [12, 19], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Jesus Predicts His Death', verseRange: [20, 36], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Belief and Unbelief Among the Jews', verseRange: [37, 50], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const JOHN_13_SECTIONS: DaySection[] = [
  { day: 'Jesus Washes the Disciples\' Feet', verseRange: [1, 17], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Jesus Predicts Betrayal', verseRange: [18, 30], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'The New Commandment', verseRange: [31, 38], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
];

const JOHN_14_SECTIONS: DaySection[] = [
  { day: 'Jesus Comforts His Disciples', verseRange: [1, 14], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Jesus Promises the Holy Spirit', verseRange: [15, 31], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const JOHN_15_SECTIONS: DaySection[] = [
  { day: 'The Vine and the Branches', verseRange: [1, 17], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'The World Hates the Disciples', verseRange: [18, 27], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
];

const JOHN_16_SECTIONS: DaySection[] = [
  { day: 'The Work of the Holy Spirit', verseRange: [1, 16], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'Sorrow Will Turn to Joy', verseRange: [17, 33], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
];

const JOHN_17_SECTIONS: DaySection[] = [
  { day: 'Jesus Prays for Himself', verseRange: [1, 5], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Jesus Prays for His Disciples', verseRange: [6, 19], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Jesus Prays for All Believers', verseRange: [20, 26], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
];

const JOHN_18_SECTIONS: DaySection[] = [
  { day: 'Jesus Arrested', verseRange: [1, 14], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
  { day: 'Peter\'s First Denial', verseRange: [15, 18], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
  { day: 'The High Priest Questions Jesus', verseRange: [19, 24], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Peter\'s Second and Third Denials', verseRange: [25, 27], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Jesus Before Pilate', verseRange: [28, 40], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const JOHN_19_SECTIONS: DaySection[] = [
  { day: 'Jesus Sentenced to Death', verseRange: [1, 16], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'The Crucifixion', verseRange: [17, 27], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'The Death of Jesus', verseRange: [28, 37], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'The Burial of Jesus', verseRange: [38, 42], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const JOHN_20_SECTIONS: DaySection[] = [
  { day: 'The Empty Tomb', verseRange: [1, 10], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Jesus Appears to Mary Magdalene', verseRange: [11, 18], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Jesus Appears to His Disciples', verseRange: [19, 23], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Jesus Appears to Thomas', verseRange: [24, 29], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'The Purpose of This Gospel', verseRange: [30, 31], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
];

const JOHN_21_SECTIONS: DaySection[] = [
  { day: 'Jesus and the Miraculous Catch of Fish', verseRange: [1, 14], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Jesus Reinstates Peter', verseRange: [15, 19], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Jesus and the Beloved Disciple', verseRange: [20, 25], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
];

const LUKE_2_SECTIONS: DaySection[] = [
  { day: 'Birth of Jesus', verseRange: [1, 7], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'The Shepherds', verseRange: [8, 20], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Presentation in the Temple', verseRange: [21, 40], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'The Boy Jesus at the Temple', verseRange: [41, 52], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
];

const LUKE_3_SECTIONS: DaySection[] = [
  { day: 'John the Baptist Prepares the Way', verseRange: [1, 20], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'The Baptism of Jesus', verseRange: [21, 22], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'The Genealogy of Jesus', verseRange: [23, 38], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const LUKE_4_SECTIONS: DaySection[] = [
  { day: 'The Temptation', verseRange: [1, 13], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Jesus Rejected at Nazareth', verseRange: [14, 30], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Jesus Drives Out an Impure Spirit', verseRange: [31, 37], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
  { day: 'Jesus Heals Many', verseRange: [38, 44], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
];

const LUKE_5_SECTIONS: DaySection[] = [
  { day: 'The Calling of the First Disciples', verseRange: [1, 11], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Jesus Cleanses a Leper', verseRange: [12, 16], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Jesus Heals a Paralytic', verseRange: [17, 26], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'The Calling of Levi', verseRange: [27, 32], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Questions About Fasting', verseRange: [33, 39], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const LUKE_6_SECTIONS: DaySection[] = [
  { day: 'Lord of the Sabbath', verseRange: [1, 11], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'The Twelve Apostles', verseRange: [12, 16], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Blessings and Woes', verseRange: [17, 26], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Love for Enemies', verseRange: [27, 36], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Judging Others', verseRange: [37, 42], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'A Tree and Its Fruit', verseRange: [43, 49], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
];

const LUKE_7_SECTIONS: DaySection[] = [
  { day: 'The Faith of the Centurion', verseRange: [1, 10], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'Jesus Raises a Widow\'s Son', verseRange: [11, 17], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'John the Baptist\'s Question', verseRange: [18, 35], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'A Sinful Woman Forgiven', verseRange: [36, 50], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
];

const LUKE_8_SECTIONS: DaySection[] = [
  { day: 'Women Who Followed Jesus', verseRange: [1, 3], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
  { day: 'Parable of the Sower', verseRange: [4, 15], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'A Lamp on a Stand', verseRange: [16, 18], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Jesus\' Mother and Brothers', verseRange: [19, 21], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Jesus Calms the Storm', verseRange: [22, 25], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'The Gerasene Demoniac', verseRange: [26, 39], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'A Dead Girl and a Sick Woman', verseRange: [40, 56], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
];

const LUKE_9_SECTIONS: DaySection[] = [
  { day: 'Jesus Sends Out the Twelve', verseRange: [1, 9], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Jesus Feeds the Five Thousand', verseRange: [10, 17], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Peter\'s Confession of Christ', verseRange: [18, 27], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'The Transfiguration', verseRange: [28, 36], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Jesus Heals a Demon-Possessed Boy', verseRange: [37, 45], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'Who Will Be the Greatest?', verseRange: [46, 50], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'Samaritan Opposition', verseRange: [51, 56], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'The Cost of Following Jesus', verseRange: [57, 62], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const LUKE_10_SECTIONS: DaySection[] = [
  { day: 'Jesus Sends Out the Seventy-Two', verseRange: [1, 24], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'The Parable of the Good Samaritan', verseRange: [25, 37], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
  { day: 'At the Home of Martha and Mary', verseRange: [38, 42], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const LUKE_11_SECTIONS: DaySection[] = [
  { day: 'Jesus Teaches on Prayer', verseRange: [1, 13], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Jesus and Beelzebul', verseRange: [14, 28], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'The Sign of Jonah', verseRange: [29, 36], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Woes to Pharisees and Lawyers', verseRange: [37, 54], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const LUKE_12_SECTIONS: DaySection[] = [
  { day: 'Warnings and Encouragements', verseRange: [1, 12], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'The Parable of the Rich Fool', verseRange: [13, 21], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Do Not Worry', verseRange: [22, 34], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Watchfulness', verseRange: [35, 48], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Not Peace but Division', verseRange: [49, 53], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Interpreting the Times', verseRange: [54, 59], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
];

const LUKE_13_SECTIONS: DaySection[] = [
  { day: 'Repent or Perish', verseRange: [1, 9], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'Jesus Heals on the Sabbath', verseRange: [10, 17], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Parables of the Mustard Seed and Yeast', verseRange: [18, 21], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'The Narrow Door', verseRange: [22, 30], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Jesus\' Lament over Jerusalem', verseRange: [31, 35], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
];

const LUKE_14_SECTIONS: DaySection[] = [
  { day: 'Jesus Heals on the Sabbath', verseRange: [1, 6], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Teachings on Humility', verseRange: [7, 14], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Parable of the Great Banquet', verseRange: [15, 24], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'The Cost of Discipleship', verseRange: [25, 35], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const LUKE_15_SECTIONS: DaySection[] = [
  { day: 'Parable of the Lost Sheep', verseRange: [1, 7], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'Parable of the Lost Coin', verseRange: [8, 10], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'Parable of the Prodigal Son', verseRange: [11, 32], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const LUKE_16_SECTIONS: DaySection[] = [
  { day: 'Parable of the Shrewd Manager', verseRange: [1, 13], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'The Law and the Kingdom of God', verseRange: [14, 18], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'The Rich Man and Lazarus', verseRange: [19, 31], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const LUKE_17_SECTIONS: DaySection[] = [
  { day: 'Sin, Faith, and Duty', verseRange: [1, 10], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Ten Healed of Leprosy', verseRange: [11, 19], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'The Coming of the Kingdom of God', verseRange: [20, 37], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
];

const LUKE_18_SECTIONS: DaySection[] = [
  { day: 'Parable of the Persistent Widow', verseRange: [1, 8], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'Parable of the Pharisee and Tax Collector', verseRange: [9, 14], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'The Little Children and Jesus', verseRange: [15, 17], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'The Rich Ruler', verseRange: [18, 30], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Jesus Predicts His Death', verseRange: [31, 34], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'A Blind Beggar Receives His Sight', verseRange: [35, 43], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
];

const LUKE_19_SECTIONS: DaySection[] = [
  { day: 'Zacchaeus the Tax Collector', verseRange: [1, 10], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Parable of the Ten Minas', verseRange: [11, 27], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'The Triumphal Entry', verseRange: [28, 40], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Jesus Weeps over Jerusalem', verseRange: [41, 44], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Jesus Cleanses the Temple', verseRange: [45, 48], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const LUKE_20_SECTIONS: DaySection[] = [
  { day: 'The Authority of Jesus Questioned', verseRange: [1, 8], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Parable of the Wicked Tenants', verseRange: [9, 19], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Paying Taxes to Caesar', verseRange: [20, 26], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'The Resurrection and Marriage', verseRange: [27, 40], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Whose Son Is the Christ?', verseRange: [41, 47], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
];

const LUKE_21_SECTIONS: DaySection[] = [
  { day: 'The Widow\'s Offering', verseRange: [1, 4], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'Signs of the End of the Age', verseRange: [5, 28], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'Watch and Pray', verseRange: [29, 38], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const LUKE_22_SECTIONS: DaySection[] = [
  { day: 'Judas Agrees to Betray Jesus', verseRange: [1, 6], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'The Last Supper', verseRange: [7, 23], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Who Is the Greatest?', verseRange: [24, 30], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
  { day: 'Jesus Predicts Peter\'s Denial', verseRange: [31, 38], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Jesus Prays on the Mount of Olives', verseRange: [39, 46], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Jesus Arrested', verseRange: [47, 53], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Peter Denies Jesus', verseRange: [54, 62], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Jesus Before the Council', verseRange: [63, 71], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const LUKE_23_SECTIONS: DaySection[] = [
  { day: 'Jesus Before Pilate', verseRange: [1, 5], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Jesus Before Herod', verseRange: [6, 12], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Pilate Delivers Jesus to Be Crucified', verseRange: [13, 25], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'The Crucifixion', verseRange: [26, 43], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'The Death of Jesus', verseRange: [44, 49], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'The Burial of Jesus', verseRange: [50, 56], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
];

const LUKE_24_SECTIONS: DaySection[] = [
  { day: 'The Empty Tomb', verseRange: [1, 12], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'On the Road to Emmaus', verseRange: [13, 35], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Jesus Appears to the Disciples', verseRange: [36, 49], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
  { day: 'The Ascension', verseRange: [50, 53], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
];

// ACTS SECTIONS
const ACTS_1_SECTIONS: DaySection[] = [
  { day: 'Jesus Taken Up Into Heaven', verseRange: [1, 11], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'The Apostles Wait in Prayer', verseRange: [12, 14], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Matthias Chosen to Replace Judas', verseRange: [15, 26], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const ACTS_2_SECTIONS: DaySection[] = [
  { day: 'The Holy Spirit Comes at Pentecost', verseRange: [1, 13], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Peter\'s Sermon', verseRange: [14, 36], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'The Fellowship of Believers', verseRange: [37, 47], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const ACTS_3_SECTIONS: DaySection[] = [
  { day: 'Peter Heals a Lame Beggar', verseRange: [1, 10], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Peter Speaks to the Onlookers', verseRange: [11, 26], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const ACTS_4_SECTIONS: DaySection[] = [
  { day: 'Peter and John Before the Sanhedrin', verseRange: [1, 22], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'The Believers\' Prayer', verseRange: [23, 31], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'The Believers Share Everything', verseRange: [32, 37], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const ACTS_5_SECTIONS: DaySection[] = [
  { day: 'Ananias and Sapphira', verseRange: [1, 11], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'The Apostles Heal Many', verseRange: [12, 16], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'The Apostles Persecuted', verseRange: [17, 42], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
];

const ACTS_6_SECTIONS: DaySection[] = [
  { day: 'The Choosing of the Seven', verseRange: [1, 7], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'Stephen Seized', verseRange: [8, 15], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const ACTS_7_SECTIONS: DaySection[] = [
  { day: 'Stephen\'s Speech: The Patriarchs', verseRange: [1, 16], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Moses and the Exodus', verseRange: [17, 43], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'The Tabernacle and Solomon\'s Temple', verseRange: [44, 50], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
  { day: 'Israel\'s Resistance and Stephen\'s Martyrdom', verseRange: [51, 60], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const ACTS_8_SECTIONS: DaySection[] = [
  { day: 'The Church Persecuted and Scattered', verseRange: [1, 3], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Philip in Samaria', verseRange: [4, 8], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Simon the Sorcerer', verseRange: [9, 25], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Philip and the Ethiopian', verseRange: [26, 40], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

// ROMANS SECTIONS
const ROMANS_1_SECTIONS: DaySection[] = [
  { day: 'Paul\'s Greeting and Gospel Theme', verseRange: [1, 17], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'God\'s Wrath Against Humanity', verseRange: [18, 32], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const ROMANS_2_SECTIONS: DaySection[] = [
  { day: 'God\'s Righteous Judgment', verseRange: [1, 16], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'The Jews and the Law', verseRange: [17, 29], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const ROMANS_3_SECTIONS: DaySection[] = [
  { day: 'God\'s Faithfulness', verseRange: [1, 8], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'No One Righteous', verseRange: [9, 20], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Righteousness Through Faith', verseRange: [21, 31], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
];

const ROMANS_4_SECTIONS: DaySection[] = [
  { day: 'Abraham Justified by Faith', verseRange: [1, 12], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Faith and the Promise', verseRange: [13, 25], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const ROMANS_5_SECTIONS: DaySection[] = [
  { day: 'Peace with God Through Faith', verseRange: [1, 11], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Death Through Adam, Life Through Christ', verseRange: [12, 21], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
];

const ROMANS_6_SECTIONS: DaySection[] = [
  { day: 'Dead to Sin, Alive in Christ', verseRange: [1, 14], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'Slaves to Righteousness', verseRange: [15, 23], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
];

const ROMANS_7_SECTIONS: DaySection[] = [
  { day: 'Released from the Law', verseRange: [1, 6], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'The Law and Sin', verseRange: [7, 13], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Struggle with Sin', verseRange: [14, 25], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
];

const ROMANS_8_SECTIONS: DaySection[] = [
  { day: 'No Condemnation in Christ', verseRange: [1, 4], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Life by the Spirit', verseRange: [5, 17], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Future Glory', verseRange: [18, 27], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'More Than Conquerors', verseRange: [28, 39], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const ROMANS_9_SECTIONS: DaySection[] = [
  { day: 'Paul\'s Anguish for Israel', verseRange: [1, 5], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'God\'s Sovereign Election', verseRange: [6, 29], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Israel\'s Unbelief', verseRange: [30, 33], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const ROMANS_10_SECTIONS: DaySection[] = [
  { day: 'Christ the End of the Law', verseRange: [1, 13], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Faith Comes from Hearing', verseRange: [14, 21], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const ROMANS_11_SECTIONS: DaySection[] = [
  { day: 'The Remnant of Israel', verseRange: [1, 10], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Ingrafted Branches', verseRange: [11, 24], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'All Israel Will Be Saved', verseRange: [25, 36], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
];

const ROMANS_12_SECTIONS: DaySection[] = [
  { day: 'A Living Sacrifice', verseRange: [1, 2], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Humble Service in the Body of Christ', verseRange: [3, 8], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Love in Action', verseRange: [9, 21], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
];

const ROMANS_13_SECTIONS: DaySection[] = [
  { day: 'Submission to Governing Authorities', verseRange: [1, 7], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Love Fulfills the Law', verseRange: [8, 10], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'The Day Is Near', verseRange: [11, 14], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const ROMANS_14_SECTIONS: DaySection[] = [
  { day: 'The Weak and the Strong', verseRange: [1, 12], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Do Not Cause Another to Stumble', verseRange: [13, 23], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const ROMANS_15_SECTIONS: DaySection[] = [
  { day: 'Bear One Another\'s Burdens', verseRange: [1, 13], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Paul\'s Ministry and Plans', verseRange: [14, 33], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const ROMANS_16_SECTIONS: DaySection[] = [
  { day: 'Personal Greetings', verseRange: [1, 16], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Final Instructions and Doxology', verseRange: [17, 27], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

// 1 CORINTHIANS SECTIONS
const CORINTHIANS_1_1_SECTIONS: DaySection[] = [
  { day: 'Greeting', verseRange: [1, 9], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Divisions in the Church', verseRange: [10, 17], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Foolishness of the Cross', verseRange: [18, 31], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const CORINTHIANS_1_2_SECTIONS: DaySection[] = [
  { day: 'Spiritual Wisdom', verseRange: [1, 5], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'God\'s Wisdom Revealed by the Spirit', verseRange: [6, 16], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const CORINTHIANS_1_3_SECTIONS: DaySection[] = [
  { day: 'Worldliness in the Church', verseRange: [1, 9], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'The Church is God\'s Temple', verseRange: [10, 17], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'True Wisdom', verseRange: [18, 23], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const CORINTHIANS_1_4_SECTIONS: DaySection[] = [
  { day: 'The Nature of True Apostleship', verseRange: [1, 7], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Paul\'s Defense of His Ministry', verseRange: [8, 21], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
];

const CORINTHIANS_1_5_SECTIONS: DaySection[] = [
  { day: 'Dealing with Immorality', verseRange: [1, 8], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'Church Discipline', verseRange: [9, 13], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
];

const CORINTHIANS_1_6_SECTIONS: DaySection[] = [
  { day: 'Lawsuits Among Believers', verseRange: [1, 11], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Sexual Immorality', verseRange: [12, 20], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const CORINTHIANS_1_7_SECTIONS: DaySection[] = [
  { day: 'Principles of Marriage', verseRange: [1, 16], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Concerning the Unmarried', verseRange: [17, 40], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const CORINTHIANS_1_8_SECTIONS: DaySection[] = [
  { day: 'Food Sacrificed to Idols', verseRange: [1, 13], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
];

const CORINTHIANS_1_9_SECTIONS: DaySection[] = [
  { day: 'Paul\'s Rights as an Apostle', verseRange: [1, 18], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Paul\'s Discipline and Service', verseRange: [19, 27], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const CORINTHIANS_1_10_SECTIONS: DaySection[] = [
  { day: 'Warnings from Israel\'s History', verseRange: [1, 13], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Idol Feasts and the Lord\'s Supper', verseRange: [14, 22], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Do Everything for God\'s Glory', verseRange: [23, 33], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const CORINTHIANS_1_11_SECTIONS: DaySection[] = [
  { day: 'Head Coverings', verseRange: [1, 16], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Correcting the Lord\'s Supper', verseRange: [17, 34], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const CORINTHIANS_1_12_SECTIONS: DaySection[] = [
  { day: 'Concerning Spiritual Gifts', verseRange: [1, 11], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Unity and Diversity in the Body', verseRange: [12, 31], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
];

const CORINTHIANS_1_13_SECTIONS: DaySection[] = [
  { day: 'The Supremacy of Love', verseRange: [1, 3], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'Love Described', verseRange: [4, 7], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Love Never Fails', verseRange: [8, 13], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const CORINTHIANS_1_14_SECTIONS: DaySection[] = [
  { day: 'Prophecy and Tongues', verseRange: [1, 25], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Order in Worship', verseRange: [26, 40], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const CORINTHIANS_1_15_SECTIONS: DaySection[] = [
  { day: 'The Gospel and the Resurrection', verseRange: [1, 11], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'The Resurrection of the Dead', verseRange: [12, 34], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'The Resurrection Body', verseRange: [35, 58], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const CORINTHIANS_1_16_SECTIONS: DaySection[] = [
  { day: 'The Collection for the Lord\'s People', verseRange: [1, 4], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Personal Requests and Greetings', verseRange: [5, 24], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
];

// 2 CORINTHIANS SECTIONS
const CORINTHIANS_2_1_SECTIONS: DaySection[] = [
  { day: 'Paul\'s Greeting', verseRange: [1, 2], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Comfort in Suffering', verseRange: [3, 11], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Paul\'s Change of Plans', verseRange: [12, 24], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const CORINTHIANS_2_2_SECTIONS: DaySection[] = [
  { day: 'Forgiveness for the Offender', verseRange: [1, 11], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Triumph in Christ', verseRange: [12, 17], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const CORINTHIANS_2_3_SECTIONS: DaySection[] = [
  { day: 'Ministers of the New Covenant', verseRange: [1, 6], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'The Glory of the New Covenant', verseRange: [7, 18], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const CORINTHIANS_2_4_SECTIONS: DaySection[] = [
  { day: 'Treasure in Jars of Clay', verseRange: [1, 12], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Eternal Weight of Glory', verseRange: [13, 18], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const CORINTHIANS_2_5_SECTIONS: DaySection[] = [
  { day: 'Our Heavenly Dwelling', verseRange: [1, 10], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'The Ministry of Reconciliation', verseRange: [11, 21], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
];

const CORINTHIANS_2_6_SECTIONS: DaySection[] = [
  { day: 'Hardships of Paul\'s Ministry', verseRange: [1, 13], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'Do Not Be Unequally Yoked', verseRange: [14, 18], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const CORINTHIANS_2_7_SECTIONS: DaySection[] = [
  { day: 'Paul\'s Joy at Their Repentance', verseRange: [1, 7], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Godly Sorrow Brings Repentance', verseRange: [8, 16], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
];

const CORINTHIANS_2_8_SECTIONS: DaySection[] = [
  { day: 'The Example of the Macedonian Churches', verseRange: [1, 7], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'The Grace of Giving', verseRange: [8, 15], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Titus and the Delegation', verseRange: [16, 24], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const CORINTHIANS_2_9_SECTIONS: DaySection[] = [
  { day: 'Generosity Encouraged', verseRange: [1, 5], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Sowing and Reaping', verseRange: [6, 15], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const CORINTHIANS_2_10_SECTIONS: DaySection[] = [
  { day: 'Paul Defends His Authority', verseRange: [1, 6], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Spiritual Warfare', verseRange: [7, 18], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const CORINTHIANS_2_11_SECTIONS: DaySection[] = [
  { day: 'Paul and the False Apostles', verseRange: [1, 15], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Paul\'s Sufferings', verseRange: [16, 33], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const CORINTHIANS_2_12_SECTIONS: DaySection[] = [
  { day: 'Paul\'s Visions and Revelations', verseRange: [1, 10], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Thorn in the Flesh', verseRange: [11, 21], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
];

const CORINTHIANS_2_13_SECTIONS: DaySection[] = [
  { day: 'Final Warnings', verseRange: [1, 10], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'Final Greetings', verseRange: [11, 14], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

// GALATIANS SECTIONS
const GALATIANS_1_SECTIONS: DaySection[] = [
  { day: 'Paul\'s Greeting', verseRange: [1, 5], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'No Other Gospel', verseRange: [6, 10], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Paul\'s Calling from God', verseRange: [11, 24], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const GALATIANS_2_SECTIONS: DaySection[] = [
  { day: 'Gospel Confirmed by the Apostles', verseRange: [1, 10], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Paul Confronts Peter', verseRange: [11, 14], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Justified by Faith', verseRange: [15, 21], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

const GALATIANS_3_SECTIONS: DaySection[] = [
  { day: 'Faith or Works of the Law', verseRange: [1, 14], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'The Law and the Promise', verseRange: [15, 25], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Children of God Through Faith', verseRange: [26, 29], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const GALATIANS_4_SECTIONS: DaySection[] = [
  { day: 'Sons, Not Slaves', verseRange: [1, 11], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Paul\'s Concern for the Galatians', verseRange: [12, 20], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Hagar and Sarah', verseRange: [21, 31], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
];

const GALATIANS_5_SECTIONS: DaySection[] = [
  { day: 'Freedom in Christ', verseRange: [1, 15], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'Fruit of the Spirit', verseRange: [16, 26], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
];

const GALATIANS_6_SECTIONS: DaySection[] = [
  { day: 'Bear One Another\'s Burdens', verseRange: [1, 10], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Boast Only in the Cross', verseRange: [11, 18], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

// EPHESIANS SECTIONS
const EPHESIANS_1_SECTIONS: DaySection[] = [
  { day: 'Spiritual Blessings in Christ', verseRange: [1, 14], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Prayer for Spiritual Wisdom', verseRange: [15, 23], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const EPHESIANS_2_SECTIONS: DaySection[] = [
  { day: 'Alive in Christ', verseRange: [1, 10], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'One in Christ', verseRange: [11, 22], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const EPHESIANS_3_SECTIONS: DaySection[] = [
  { day: 'Paul\'s Ministry to the Gentiles', verseRange: [1, 13], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Prayer for Strength and Love', verseRange: [14, 21], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const EPHESIANS_4_SECTIONS: DaySection[] = [
  { day: 'Unity in the Body', verseRange: [1, 16], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Put Off the Old Self', verseRange: [17, 32], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const EPHESIANS_5_SECTIONS: DaySection[] = [
  { day: 'Walk in Love and Light', verseRange: [1, 20], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Marriage as a Picture of Christ and the Church', verseRange: [21, 33], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const EPHESIANS_6_SECTIONS: DaySection[] = [
  { day: 'Children and Parents, Slaves and Masters', verseRange: [1, 9], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'The Armor of God', verseRange: [10, 20], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'Final Greetings', verseRange: [21, 24], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
];

// PHILIPPIANS SECTIONS
const PHILIPPIANS_1_SECTIONS: DaySection[] = [
  { day: 'Paul\'s Greeting and Prayer', verseRange: [1, 11], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Paul\'s Chains Advance the Gospel', verseRange: [12, 26], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Stand Firm for the Gospel', verseRange: [27, 30], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
];

const PHILIPPIANS_2_SECTIONS: DaySection[] = [
  { day: 'Imitating Christ\'s Humility', verseRange: [1, 11], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Shine as Lights', verseRange: [12, 18], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Timothy and Epaphroditus', verseRange: [19, 30], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const PHILIPPIANS_3_SECTIONS: DaySection[] = [
  { day: 'Righteousness Through Faith in Christ', verseRange: [1, 11], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Pressing On Toward the Goal', verseRange: [12, 21], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const PHILIPPIANS_4_SECTIONS: DaySection[] = [
  { day: 'Stand Firm, Rejoice, and Think on Good Things', verseRange: [1, 9], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Contentment in All Circumstances', verseRange: [10, 20], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Final Greetings', verseRange: [21, 23], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

// COLOSSIANS SECTIONS
const COLOSSIANS_1_SECTIONS: DaySection[] = [
  { day: 'Thanksgiving and Prayer', verseRange: [1, 14], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'The Supremacy of Christ', verseRange: [15, 23], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Paul\'s Labor for the Church', verseRange: [24, 29], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
];

const COLOSSIANS_2_SECTIONS: DaySection[] = [
  { day: 'Freedom from Human Rules', verseRange: [1, 12], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'Fullness in Christ', verseRange: [13, 23], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const COLOSSIANS_3_SECTIONS: DaySection[] = [
  { day: 'Set Your Hearts on Things Above', verseRange: [1, 4], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Put to Death the Old Self', verseRange: [5, 11], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Clothe Yourselves with Christ', verseRange: [12, 17], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Christian Household', verseRange: [18, 25], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
];

const COLOSSIANS_4_SECTIONS: DaySection[] = [
  { day: 'Instructions for Masters', verseRange: [1, 1], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Prayer and Wise Conduct', verseRange: [2, 6], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Final Greetings', verseRange: [7, 18], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

// 1 THESSALONIANS SECTIONS
const THESSALONIANS_1_1_SECTIONS: DaySection[] = [
  { day: 'Thanksgiving for the Thessalonians', verseRange: [1, 10], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
];

const THESSALONIANS_1_2_SECTIONS: DaySection[] = [
  { day: 'Paul\'s Ministry in Thessalonica', verseRange: [1, 12], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Reception of the Gospel', verseRange: [13, 20], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const THESSALONIANS_1_3_SECTIONS: DaySection[] = [
  { day: 'Paul\'s Longing to Visit', verseRange: [1, 5], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Timothy\'s Encouraging Report', verseRange: [6, 13], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
];

const THESSALONIANS_1_4_SECTIONS: DaySection[] = [
  { day: 'Living to Please God', verseRange: [1, 12], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'The Coming of the Lord', verseRange: [13, 18], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
];

const THESSALONIANS_1_5_SECTIONS: DaySection[] = [
  { day: 'The Day of the Lord', verseRange: [1, 11], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Final Instructions', verseRange: [12, 28], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

// 2 THESSALONIANS SECTIONS
const THESSALONIANS_2_1_SECTIONS: DaySection[] = [
  { day: 'Thanksgiving and Prayer', verseRange: [1, 4], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'God\'s Righteous Judgment', verseRange: [5, 12], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const THESSALONIANS_2_2_SECTIONS: DaySection[] = [
  { day: 'The Man of Lawlessness', verseRange: [1, 12], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Stand Firm', verseRange: [13, 17], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const THESSALONIANS_2_3_SECTIONS: DaySection[] = [
  { day: 'Request for Prayer', verseRange: [1, 5], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Warning Against Idleness', verseRange: [6, 15], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Final Greetings', verseRange: [16, 18], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
];

// 1 TIMOTHY SECTIONS
const TIMOTHY_1_1_SECTIONS: DaySection[] = [
  { day: 'Warning Against False Teachers', verseRange: [1, 11], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Paul\'s Testimony of Mercy', verseRange: [12, 20], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const TIMOTHY_1_2_SECTIONS: DaySection[] = [
  { day: 'Instructions on Worship', verseRange: [1, 15], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const TIMOTHY_1_3_SECTIONS: DaySection[] = [
  { day: 'Qualifications for Overseers', verseRange: [1, 7], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Qualifications for Deacons', verseRange: [8, 13], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'The Mystery of Godliness', verseRange: [14, 16], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
];

const TIMOTHY_1_4_SECTIONS: DaySection[] = [
  { day: 'Warning Against False Teachers', verseRange: [1, 5], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Train Yourself in Godliness', verseRange: [6, 16], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const TIMOTHY_1_5_SECTIONS: DaySection[] = [
  { day: 'Care for Widows', verseRange: [1, 16], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Honor for Elders', verseRange: [17, 25], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const TIMOTHY_1_6_SECTIONS: DaySection[] = [
  { day: 'Instructions for Slaves', verseRange: [1, 2], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'False Teachers and Love of Money', verseRange: [3, 10], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Fight the Good Fight', verseRange: [11, 21], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
];

// 2 TIMOTHY SECTIONS
const TIMOTHY_2_1_SECTIONS: DaySection[] = [
  { day: 'Thanksgiving and Encouragement', verseRange: [1, 7], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Not Ashamed of the Gospel', verseRange: [8, 18], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
];

const TIMOTHY_2_2_SECTIONS: DaySection[] = [
  { day: 'Endure Hardship', verseRange: [1, 13], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Approved Workman', verseRange: [14, 26], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const TIMOTHY_2_3_SECTIONS: DaySection[] = [
  { day: 'Godlessness in the Last Days', verseRange: [1, 9], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'All Scripture is God-Breathed', verseRange: [10, 17], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
];

const TIMOTHY_2_4_SECTIONS: DaySection[] = [
  { day: 'Preach the Word', verseRange: [1, 8], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'Paul\'s Final Testimony', verseRange: [9, 18], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'Final Greetings', verseRange: [19, 22], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

// TITUS SECTIONS
const TITUS_1_SECTIONS: DaySection[] = [
  { day: 'Paul\'s Greeting', verseRange: [1, 4], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Qualifications for Elders', verseRange: [5, 9], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Rebuking False Teachers', verseRange: [10, 16], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const TITUS_2_SECTIONS: DaySection[] = [
  { day: 'Sound Doctrine for All Ages', verseRange: [1, 10], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Grace Teaches Us', verseRange: [11, 15], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const TITUS_3_SECTIONS: DaySection[] = [
  { day: 'Doing What Is Good', verseRange: [1, 8], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Avoid Foolish Controversies', verseRange: [9, 11], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Final Instructions', verseRange: [12, 15], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
];

// PHILEMON SECTIONS
const PHILEMON_1_SECTIONS: DaySection[] = [
  { day: 'Greeting and Thanksgiving', verseRange: [1, 7], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Paul\'s Appeal for Onesimus', verseRange: [8, 21], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Final Greetings', verseRange: [22, 25], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

// HEBREWS SECTIONS
const HEBREWS_1_SECTIONS: DaySection[] = [
  { day: 'God Has Spoken by His Son', verseRange: [1, 4], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'The Son Superior to Angels', verseRange: [5, 14], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const HEBREWS_2_SECTIONS: DaySection[] = [
  { day: 'Warning to Pay Attention', verseRange: [1, 4], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Jesus Made Fully Human', verseRange: [5, 9], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Jesus the Merciful High Priest', verseRange: [10, 18], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const HEBREWS_3_SECTIONS: DaySection[] = [
  { day: 'Jesus Greater than Moses', verseRange: [1, 6], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Warning Against Unbelief', verseRange: [7, 19], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const HEBREWS_4_SECTIONS: DaySection[] = [
  { day: 'The Sabbath Rest for God\'s People', verseRange: [1, 11], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'The Living Word of God', verseRange: [12, 13], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Jesus the Great High Priest', verseRange: [14, 16], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const HEBREWS_5_SECTIONS: DaySection[] = [
  { day: 'The Qualifications of a High Priest', verseRange: [1, 4], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'Christ\'s Priestly Appointment', verseRange: [5, 10], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Warning Against Falling Away', verseRange: [11, 14], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
];

const HEBREWS_6_SECTIONS: DaySection[] = [
  { day: 'Press On to Maturity', verseRange: [1, 3], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Warning of Apostasy', verseRange: [4, 8], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Encouragement and Hope', verseRange: [9, 12], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'The Certainty of God\'s Promise', verseRange: [13, 20], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const HEBREWS_7_SECTIONS: DaySection[] = [
  { day: 'Melchizedek the Priest', verseRange: [1, 10], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Jesus Like Melchizedek', verseRange: [11, 22], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'The Superiority of Christ\'s Priesthood', verseRange: [23, 28], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const HEBREWS_8_SECTIONS: DaySection[] = [
  { day: 'The High Priest of a New Covenant', verseRange: [1, 6], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'The New Covenant', verseRange: [7, 13], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const HEBREWS_9_SECTIONS: DaySection[] = [
  { day: 'Worship in the Earthly Tabernacle', verseRange: [1, 10], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'The Blood of Christ', verseRange: [11, 22], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Christ\'s Sacrifice Once for All', verseRange: [23, 28], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
];

const HEBREWS_10_SECTIONS: DaySection[] = [
  { day: 'Christ\'s Sacrifice Perfect', verseRange: [1, 18], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Draw Near to God', verseRange: [19, 25], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Warning of Judgment', verseRange: [26, 31], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Call to Persevere in Faith', verseRange: [32, 39], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const HEBREWS_11_SECTIONS: DaySection[] = [
  { day: 'Faith Defined', verseRange: [1, 3], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Examples of Faith: Abel to Noah', verseRange: [4, 7], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Abraham\'s Faith', verseRange: [8, 19], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Faith of the Patriarchs', verseRange: [20, 22], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Moses\'s Faith', verseRange: [23, 29], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Faith\'s Hall of Fame', verseRange: [30, 40], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
];

const HEBREWS_12_SECTIONS: DaySection[] = [
  { day: 'Run with Endurance', verseRange: [1, 3], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'God Disciplines His Children', verseRange: [4, 13], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Warning Against Refusing God', verseRange: [14, 17], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'The Kingdom That Cannot Be Shaken', verseRange: [18, 29], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const HEBREWS_13_SECTIONS: DaySection[] = [
  { day: 'Practical Christian Living', verseRange: [1, 6], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Spiritual Leadership', verseRange: [7, 19], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Benediction and Greetings', verseRange: [20, 25], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

// JAMES SECTIONS
const JAMES_1_SECTIONS: DaySection[] = [
  { day: 'Joy in Trials', verseRange: [1, 8], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Poverty and Riches', verseRange: [9, 11], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Temptation and Sin', verseRange: [12, 18], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Hearing and Doing the Word', verseRange: [19, 27], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const JAMES_2_SECTIONS: DaySection[] = [
  { day: 'Warning Against Favoritism', verseRange: [1, 13], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'Faith and Deeds', verseRange: [14, 26], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
];

const JAMES_3_SECTIONS: DaySection[] = [
  { day: 'Taming the Tongue', verseRange: [1, 12], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Two Kinds of Wisdom', verseRange: [13, 18], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const JAMES_4_SECTIONS: DaySection[] = [
  { day: 'Friendship with the World', verseRange: [1, 10], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Warning Against Judging', verseRange: [11, 12], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Boasting About Tomorrow', verseRange: [13, 17], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const JAMES_5_SECTIONS: DaySection[] = [
  { day: 'Warning to Rich Oppressors', verseRange: [1, 6], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Patience in Suffering', verseRange: [7, 12], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'The Prayer of Faith', verseRange: [13, 18], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Restoring a Wanderer', verseRange: [19, 20], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
];

// 1 PETER SECTIONS
const PETER1_1_SECTIONS: DaySection[] = [
  { day: 'Greeting', verseRange: [1, 2], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Living Hope Through the Resurrection', verseRange: [3, 12], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'Called to Be Holy', verseRange: [13, 25], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
];

const PETER1_2_SECTIONS: DaySection[] = [
  { day: 'Living Stones and a Chosen People', verseRange: [1, 12], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Submission to Authority', verseRange: [13, 17], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Following Christ\'s Example', verseRange: [18, 25], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const PETER1_3_SECTIONS: DaySection[] = [
  { day: 'Wives and Husbands', verseRange: [1, 7], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Suffering for Doing Good', verseRange: [8, 17], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Christ\'s Victory Over Death', verseRange: [18, 22], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const PETER1_4_SECTIONS: DaySection[] = [
  { day: 'Living for God', verseRange: [1, 6], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'The End Is Near', verseRange: [7, 11], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Suffering as a Christian', verseRange: [12, 19], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const PETER1_5_SECTIONS: DaySection[] = [
  { day: 'To the Elders and Young Men', verseRange: [1, 5], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'Humble Yourselves', verseRange: [6, 11], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Final Greetings', verseRange: [12, 14], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
];

// 2 PETER SECTIONS
const PETER2_1_SECTIONS: DaySection[] = [
  { day: 'Greeting and Divine Power', verseRange: [1, 4], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Make Your Calling Sure', verseRange: [5, 11], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Peter\'s Eyewitness Account', verseRange: [12, 21], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const PETER2_2_SECTIONS: DaySection[] = [
  { day: 'False Teachers Condemned', verseRange: [1, 9], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'The Depravity of False Teachers', verseRange: [10, 22], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const PETER2_3_SECTIONS: DaySection[] = [
  { day: 'The Day of the Lord Will Come', verseRange: [1, 10], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'New Heavens and a New Earth', verseRange: [11, 18], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

// 1 JOHN SECTIONS
const JOHN1_1_SECTIONS: DaySection[] = [
  { day: 'The Word of Life', verseRange: [1, 4], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Walking in the Light', verseRange: [5, 10], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const JOHN1_2_SECTIONS: DaySection[] = [
  { day: 'Christ Our Advocate', verseRange: [1, 6], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'The New Command', verseRange: [7, 11], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Do Not Love the World', verseRange: [12, 17], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Warning Against Antichrists', verseRange: [18, 29], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const JOHN1_3_SECTIONS: DaySection[] = [
  { day: 'Children of God', verseRange: [1, 10], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Love in Deed and Truth', verseRange: [11, 24], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const JOHN1_4_SECTIONS: DaySection[] = [
  { day: 'Test the Spirits', verseRange: [1, 6], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'God Is Love', verseRange: [7, 21], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const JOHN1_5_SECTIONS: DaySection[] = [
  { day: 'Faith Overcomes the World', verseRange: [1, 5], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'The Testimony of God', verseRange: [6, 12], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Concluding Affirmations', verseRange: [13, 21], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

// 2 JOHN SECTIONS
const JOHN2_1_SECTIONS: DaySection[] = [
  { day: 'Greeting and Love Command', verseRange: [1, 6], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'Warning Against Deceivers', verseRange: [7, 11], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Final Words', verseRange: [12, 13], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
];

// 3 JOHN SECTIONS
const JOHN3_1_SECTIONS: DaySection[] = [
  { day: 'Greeting and Gaius\'s Faithfulness', verseRange: [1, 8], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Diotrephes and Demetrius', verseRange: [9, 12], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Closing Words', verseRange: [13, 15], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

// JUDE SECTIONS
const JUDE_1_SECTIONS: DaySection[] = [
  { day: 'Greeting and Purpose', verseRange: [1, 4], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Historical Examples of Judgment', verseRange: [5, 7], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'False Teachers Condemned', verseRange: [8, 16], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Call to Persevere', verseRange: [17, 23], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Doxology', verseRange: [24, 25], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const ACTS_9_SECTIONS: DaySection[] = [
  { day: 'Saul\'s Conversion on the Road to Damascus', verseRange: [1, 9], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Ananias and Saul', verseRange: [10, 19], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Saul in Damascus and Jerusalem', verseRange: [20, 31], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Aeneas and Dorcas', verseRange: [32, 43], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const ACTS_10_SECTIONS: DaySection[] = [
  { day: 'Cornelius Calls for Peter', verseRange: [1, 8], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Peter\'s Vision', verseRange: [9, 23], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'Peter at Cornelius\'s House', verseRange: [24, 33], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'The Gentiles Receive the Holy Spirit', verseRange: [34, 48], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const ACTS_11_SECTIONS: DaySection[] = [
  { day: 'Peter Explains His Actions', verseRange: [1, 18], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'The Church in Antioch', verseRange: [19, 30], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
];

const ACTS_12_SECTIONS: DaySection[] = [
  { day: 'Peter\'s Miraculous Escape from Prison', verseRange: [1, 19], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
  { day: 'Herod\'s Death', verseRange: [20, 25], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
];

const ACTS_13_SECTIONS: DaySection[] = [
  { day: 'Barnabas and Saul Sent Off', verseRange: [1, 3], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'On Cyprus', verseRange: [4, 12], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'In Pisidian Antioch', verseRange: [13, 43], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Rejection and Turn to the Gentiles', verseRange: [44, 52], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const ACTS_14_SECTIONS: DaySection[] = [
  { day: 'In Iconium', verseRange: [1, 7], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'In Lystra and Derbe', verseRange: [8, 20], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'The Return to Antioch in Syria', verseRange: [21, 28], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const ACTS_15_SECTIONS: DaySection[] = [
  { day: 'The Debate in Jerusalem', verseRange: [1, 12], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'James\'s Judgment', verseRange: [13, 21], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'The Council\'s Letter to Gentile Believers', verseRange: [22, 35], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'Paul and Barnabas Separate', verseRange: [36, 41], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
];

const ACTS_16_SECTIONS: DaySection[] = [
  { day: 'Timothy Joins Paul and Silas', verseRange: [1, 5], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Paul\'s Vision of the Man of Macedonia', verseRange: [6, 10], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Lydia\'s Conversion in Philippi', verseRange: [11, 15], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Paul and Silas in Prison', verseRange: [16, 40], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
];

const ACTS_17_SECTIONS: DaySection[] = [
  { day: 'In Thessalonica', verseRange: [1, 9], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'In Berea', verseRange: [10, 15], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'In Athens', verseRange: [16, 34], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const ACTS_18_SECTIONS: DaySection[] = [
  { day: 'In Corinth', verseRange: [1, 17], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Priscilla, Aquila and Apollos', verseRange: [18, 28], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const ACTS_19_SECTIONS: DaySection[] = [
  { day: 'Paul in Ephesus', verseRange: [1, 10], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'The Sons of Sceva', verseRange: [11, 20], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'The Riot in Ephesus', verseRange: [21, 41], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const ACTS_20_SECTIONS: DaySection[] = [
  { day: 'Through Macedonia and Greece', verseRange: [1, 6], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Eutychus Raised from the Dead at Troas', verseRange: [7, 12], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Paul\'s Farewell to the Ephesian Elders', verseRange: [13, 38], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
];

const ACTS_21_SECTIONS: DaySection[] = [
  { day: 'On to Jerusalem', verseRange: [1, 16], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'Paul\'s Arrival at Jerusalem', verseRange: [17, 26], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Paul Arrested', verseRange: [27, 40], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const ACTS_22_SECTIONS: DaySection[] = [
  { day: 'Paul Speaks to the Crowd', verseRange: [1, 21], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Paul the Roman Citizen', verseRange: [22, 30], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
];

const ACTS_23_SECTIONS: DaySection[] = [
  { day: 'Paul Before the Sanhedrin', verseRange: [1, 11], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'The Plot to Kill Paul', verseRange: [12, 22], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'Paul Transferred to Caesarea', verseRange: [23, 35], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const ACTS_24_SECTIONS: DaySection[] = [
  { day: 'Paul\'s Trial Before Felix', verseRange: [1, 21], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Paul\'s Two Years in Caesarea', verseRange: [22, 27], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const ACTS_25_SECTIONS: DaySection[] = [
  { day: 'Paul\'s Trial Before Festus', verseRange: [1, 12], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Festus Consults King Agrippa', verseRange: [13, 27], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const ACTS_26_SECTIONS: DaySection[] = [
  { day: 'Paul Before Agrippa', verseRange: [1, 11], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'Paul Recounts His Conversion', verseRange: [12, 18], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'Paul\'s Defense and Appeal', verseRange: [19, 32], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
];

const ACTS_27_SECTIONS: DaySection[] = [
  { day: 'Paul Sails for Rome', verseRange: [1, 12], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'The Storm', verseRange: [13, 26], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'The Shipwreck', verseRange: [27, 44], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
];

const ACTS_28_SECTIONS: DaySection[] = [
  { day: 'Ashore on Malta', verseRange: [1, 10], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Paul\'s Arrival at Rome', verseRange: [11, 16], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
  { day: 'Paul Preaches at Rome Under Guard', verseRange: [17, 31], color: 'bg-gray-50 dark:bg-gray-800/20', borderColor: 'border-gray-400' },
];

// REVELATION SECTIONS
const REVELATION_1_SECTIONS: DaySection[] = [
  { day: 'Prologue', verseRange: [1, 3], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'Greeting to Seven Churches', verseRange: [4, 8], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'John\'s Vision on Patmos', verseRange: [9, 11], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Vision of the Son of Man', verseRange: [12, 16], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Christ\'s Commission to John', verseRange: [17, 20], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const REVELATION_2_SECTIONS: DaySection[] = [
  { day: 'To Ephesus: Lost First Love', verseRange: [1, 7], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'To Smyrna: Faithful in Suffering', verseRange: [8, 11], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'To Pergamum: Where Satan Dwells', verseRange: [12, 17], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'To Thyatira: Tolerating Jezebel', verseRange: [18, 29], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const REVELATION_3_SECTIONS: DaySection[] = [
  { day: 'To Sardis: Wake Up', verseRange: [1, 6], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'To Philadelphia: Open Door', verseRange: [7, 13], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'To Laodicea: Lukewarm', verseRange: [14, 22], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
];

const REVELATION_4_SECTIONS: DaySection[] = [
  { day: 'The Throne in Heaven', verseRange: [1, 3], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'The Twenty-Four Elders', verseRange: [4, 8], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'The Four Living Creatures', verseRange: [9, 11], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
];

const REVELATION_5_SECTIONS: DaySection[] = [
  { day: 'The Scroll and the Lamb', verseRange: [1, 7], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'The New Song', verseRange: [8, 14], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
];

const REVELATION_6_SECTIONS: DaySection[] = [
  { day: 'First Four Seals: The Four Horsemen', verseRange: [1, 8], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'Fifth Seal: Souls Under the Altar', verseRange: [9, 11], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'Sixth Seal: Cosmic Upheaval', verseRange: [12, 17], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const REVELATION_7_SECTIONS: DaySection[] = [
  { day: '144,000 Sealed from Israel', verseRange: [1, 8], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Great Multitude from Every Nation', verseRange: [9, 17], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
];

const REVELATION_8_SECTIONS: DaySection[] = [
  { day: 'Seventh Seal: Silence in Heaven', verseRange: [1, 5], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'First Four Trumpets', verseRange: [6, 13], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const REVELATION_9_SECTIONS: DaySection[] = [
  { day: 'Fifth Trumpet: Demonic Locusts', verseRange: [1, 12], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'Sixth Trumpet: Army from the Euphrates', verseRange: [13, 21], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
];

const REVELATION_10_SECTIONS: DaySection[] = [
  { day: 'The Angel and the Little Scroll', verseRange: [1, 7], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'John Eats the Scroll', verseRange: [8, 11], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const REVELATION_11_SECTIONS: DaySection[] = [
  { day: 'The Two Witnesses', verseRange: [1, 6], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'Death and Resurrection of Witnesses', verseRange: [7, 14], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
  { day: 'Seventh Trumpet: Kingdom Proclaimed', verseRange: [15, 19], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
];

const REVELATION_12_SECTIONS: DaySection[] = [
  { day: 'The Woman and the Dragon', verseRange: [1, 6], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'War in Heaven', verseRange: [7, 12], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
  { day: 'The Dragon Persecutes the Woman', verseRange: [13, 17], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
];

const REVELATION_13_SECTIONS: DaySection[] = [
  { day: 'The Beast from the Sea', verseRange: [1, 10], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'The Beast from the Earth', verseRange: [11, 18], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
];

const REVELATION_14_SECTIONS: DaySection[] = [
  { day: 'The Lamb and 144,000 on Mount Zion', verseRange: [1, 5], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
  { day: 'Three Angels\' Messages', verseRange: [6, 13], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'The Harvest of the Earth', verseRange: [14, 20], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
];

const REVELATION_15_SECTIONS: DaySection[] = [
  { day: 'Seven Angels with Seven Last Plagues', verseRange: [1, 4], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
  { day: 'The Temple Opened', verseRange: [5, 8], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
];

const REVELATION_16_SECTIONS: DaySection[] = [
  { day: 'First Four Bowls', verseRange: [1, 9], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'Fifth and Sixth Bowls', verseRange: [10, 16], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
  { day: 'Seventh Bowl: It Is Done', verseRange: [17, 21], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
];

const REVELATION_17_SECTIONS: DaySection[] = [
  { day: 'The Great Prostitute Babylon', verseRange: [1, 6], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'The Mystery Explained', verseRange: [7, 18], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
];

const REVELATION_18_SECTIONS: DaySection[] = [
  { day: 'Babylon\'s Fall Announced', verseRange: [1, 8], color: 'bg-slate-50 dark:bg-slate-950/20', borderColor: 'border-slate-400' },
  { day: 'Lament for Babylon', verseRange: [9, 19], color: 'bg-blue-50 dark:bg-blue-950/20', borderColor: 'border-blue-400' },
  { day: 'The Finality of Babylon\'s Fall', verseRange: [20, 24], color: 'bg-amber-50 dark:bg-amber-950/20', borderColor: 'border-amber-400' },
];

const REVELATION_19_SECTIONS: DaySection[] = [
  { day: 'Hallelujah Chorus', verseRange: [1, 5], color: 'bg-green-50 dark:bg-green-950/20', borderColor: 'border-green-400' },
  { day: 'The Wedding Supper of the Lamb', verseRange: [6, 10], color: 'bg-purple-50 dark:bg-purple-950/20', borderColor: 'border-purple-400' },
  { day: 'The Rider on the White Horse', verseRange: [11, 16], color: 'bg-cyan-50 dark:bg-cyan-950/20', borderColor: 'border-cyan-400' },
  { day: 'Defeat of the Beast and False Prophet', verseRange: [17, 21], color: 'bg-rose-50 dark:bg-rose-950/20', borderColor: 'border-rose-400' },
];

const REVELATION_20_SECTIONS: DaySection[] = [
  { day: 'The Thousand Year Reign', verseRange: [1, 6], color: 'bg-emerald-50 dark:bg-emerald-950/20', borderColor: 'border-emerald-400' },
  { day: 'Satan\'s Final Rebellion', verseRange: [7, 10], color: 'bg-violet-50 dark:bg-violet-950/20', borderColor: 'border-violet-400' },
  { day: 'The Great White Throne Judgment', verseRange: [11, 15], color: 'bg-orange-50 dark:bg-orange-950/20', borderColor: 'border-orange-400' },
];

const REVELATION_21_SECTIONS: DaySection[] = [
  { day: 'A New Heaven and a New Earth', verseRange: [1, 8], color: 'bg-pink-50 dark:bg-pink-950/20', borderColor: 'border-pink-400' },
  { day: 'The New Jerusalem', verseRange: [9, 21], color: 'bg-teal-50 dark:bg-teal-950/20', borderColor: 'border-teal-400' },
  { day: 'The Glory of the New Jerusalem', verseRange: [22, 27], color: 'bg-sky-50 dark:bg-sky-950/20', borderColor: 'border-sky-400' },
];

const REVELATION_22_SECTIONS: DaySection[] = [
  { day: 'Eden Restored', verseRange: [1, 5], color: 'bg-indigo-50 dark:bg-indigo-950/20', borderColor: 'border-indigo-400' },
  { day: 'Jesus is Coming', verseRange: [6, 16], color: 'bg-red-50 dark:bg-red-950/20', borderColor: 'border-red-400' },
  { day: 'The Invitation', verseRange: [17, 21], color: 'bg-yellow-50 dark:bg-yellow-950/20', borderColor: 'border-yellow-400' },
];

export default function GenesisReader({ verses, book, chapter }: Props) {
  const [selectedVerses, setSelectedVerses] = useState<Set<number>>(new Set());
  const [commentary, setCommentary] = useState<Map<number, string>>(new Map());
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Extract book and chapter from verses if not provided
  const actualBook = book || verses[0]?.book.toLowerCase();
  const actualChapter = chapter || verses[0]?.chapter;

  useEffect(() => {
    if (actualBook && actualChapter) {
      loadCommentary(actualBook, actualChapter).then(() => {
        setCommentary(getCommentary(actualBook, actualChapter));
      });
    }
  }, [actualBook, actualChapter]);

  const toggleVerse = (verseNum: number) => {
    setSelectedVerses(prev => {
      const next = new Set(prev);
      if (next.has(verseNum)) {
        next.delete(verseNum);
      } else {
        next.add(verseNum);
      }
      return next;
    });
  };

  const handleCopySection = async (sectionName: string, sectionVerses: VerseType[]) => {
    const sectionText = sectionVerses.map(v => `${v.verse}. ${v.text}`).join('\n\n');
    await navigator.clipboard.writeText(sectionText);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  useEffect(() => {
    const handleCopy = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'c' && selectedVerses.size > 0) {
        const selectedText = verses
          .filter(v => selectedVerses.has(v.verse))
          .map(v => `${v.verse}. ${v.text}`)
          .join('\n\n');

        if (selectedText) {
          navigator.clipboard.writeText(selectedText);
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleCopy);
    return () => window.removeEventListener('keydown', handleCopy);
  }, [selectedVerses, verses]);

  // Check if this is Genesis 1-50, Exodus 1-40, Leviticus 1-27, Numbers 1-36, Deuteronomy 1-34, Mark 1-16, Matthew 1-28, Luke 1-24, John 1-21, Acts 1-28, Romans 1-16, 1 Corinthians 1-16, 2 Corinthians 1-13, Galatians 1-6, Ephesians 1-6, Philippians 1-4, Colossians 1-4, 1 Thessalonians 1-5, 2 Thessalonians 1-3, 1 Timothy 1-6, 2 Timothy 1-4, Titus 1-3, Philemon 1, Hebrews 1-13, James 1-5, 1 Peter 1-5, 2 Peter 1-3, 1 John 1-5, 2 John 1, 3 John 1, Jude 1, or Revelation 4-5, 12, 21-22
  const hasStructuredSections =
    (actualBook === 'genesis' && actualChapter >= 1 && actualChapter <= 50) ||
    (actualBook === 'exodus' && actualChapter >= 1 && actualChapter <= 40) ||
    (actualBook === 'leviticus' && actualChapter >= 1 && actualChapter <= 27) ||
    (actualBook === 'numbers' && actualChapter >= 1 && actualChapter <= 36) ||
    (actualBook === 'deuteronomy' && actualChapter >= 1 && actualChapter <= 34) ||
    (actualBook === 'joshua' && actualChapter >= 1 && actualChapter <= 24) ||
    (actualBook === 'judges' && actualChapter >= 1 && actualChapter <= 21) ||
    (actualBook === 'mark' && actualChapter >= 1 && actualChapter <= 16) ||
    (actualBook === 'matthew' && actualChapter >= 1 && actualChapter <= 28) ||
    (actualBook === 'luke' && actualChapter >= 1 && actualChapter <= 24) ||
    (actualBook === 'john' && actualChapter >= 1 && actualChapter <= 21) ||
    (actualBook === 'acts' && actualChapter >= 1 && actualChapter <= 28) ||
    (actualBook === 'romans' && actualChapter >= 1 && actualChapter <= 16) ||
    (actualBook === '1corinthians' && actualChapter >= 1 && actualChapter <= 16) ||
    (actualBook === '2corinthians' && actualChapter >= 1 && actualChapter <= 13) ||
    (actualBook === 'galatians' && actualChapter >= 1 && actualChapter <= 6) ||
    (actualBook === 'ephesians' && actualChapter >= 1 && actualChapter <= 6) ||
    (actualBook === 'philippians' && actualChapter >= 1 && actualChapter <= 4) ||
    (actualBook === 'colossians' && actualChapter >= 1 && actualChapter <= 4) ||
    (actualBook === '1-thessalonians' && actualChapter >= 1 && actualChapter <= 5) ||
    (actualBook === '2-thessalonians' && actualChapter >= 1 && actualChapter <= 3) ||
    (actualBook === '1-timothy' && actualChapter >= 1 && actualChapter <= 6) ||
    (actualBook === '2-timothy' && actualChapter >= 1 && actualChapter <= 4) ||
    (actualBook === 'titus' && actualChapter >= 1 && actualChapter <= 3) ||
    (actualBook === 'philemon' && actualChapter === 1) ||
    (actualBook === 'hebrews' && actualChapter >= 1 && actualChapter <= 13) ||
    (actualBook === 'james' && actualChapter >= 1 && actualChapter <= 5) ||
    (actualBook === '1-peter' && actualChapter >= 1 && actualChapter <= 5) ||
    (actualBook === '2-peter' && actualChapter >= 1 && actualChapter <= 3) ||
    (actualBook === '1-john' && actualChapter >= 1 && actualChapter <= 5) ||
    (actualBook === '2-john' && actualChapter === 1) ||
    (actualBook === '3-john' && actualChapter === 1) ||
    (actualBook === 'jude' && actualChapter === 1) ||
    (actualBook === 'revelation' && actualChapter >= 1 && actualChapter <= 22);

  if (hasStructuredSections) {
    let sections: DaySection[] = [];

    if (actualBook === 'genesis') {
      switch (actualChapter) {
        case 1:
          sections = GENESIS_1_DAYS;
          break;
        case 2:
          sections = GENESIS_2_SECTIONS;
          break;
        case 3:
          sections = GENESIS_3_SECTIONS;
          break;
        case 4:
          sections = GENESIS_4_SECTIONS;
          break;
        case 5:
          sections = GENESIS_5_SECTIONS;
          break;
        case 6:
          sections = GENESIS_6_SECTIONS;
          break;
        case 7:
          sections = GENESIS_7_SECTIONS;
          break;
        case 8:
          sections = GENESIS_8_SECTIONS;
          break;
        case 9:
          sections = GENESIS_9_SECTIONS;
          break;
        case 10:
          sections = GENESIS_10_SECTIONS;
          break;
        case 11:
          sections = GENESIS_11_SECTIONS;
          break;
        case 12:
          sections = GENESIS_12_SECTIONS;
          break;
        case 13:
          sections = GENESIS_13_SECTIONS;
          break;
        case 14:
          sections = GENESIS_14_SECTIONS;
          break;
        case 15:
          sections = GENESIS_15_SECTIONS;
          break;
        case 16:
          sections = GENESIS_16_SECTIONS;
          break;
        case 17:
          sections = GENESIS_17_SECTIONS;
          break;
        case 18:
          sections = GENESIS_18_SECTIONS;
          break;
        case 19:
          sections = GENESIS_19_SECTIONS;
          break;
        case 20:
          sections = GENESIS_20_SECTIONS;
          break;
        case 21:
          sections = GENESIS_21_SECTIONS;
          break;
        case 22:
          sections = GENESIS_22_SECTIONS;
          break;
        case 23:
          sections = GENESIS_23_SECTIONS;
          break;
        case 24:
          sections = GENESIS_24_SECTIONS;
          break;
        case 25:
          sections = GENESIS_25_SECTIONS;
          break;
        case 26:
          sections = GENESIS_26_SECTIONS;
          break;
        case 27:
          sections = GENESIS_27_SECTIONS;
          break;
        case 28:
          sections = GENESIS_28_SECTIONS;
          break;
        case 29:
          sections = GENESIS_29_SECTIONS;
          break;
        case 30:
          sections = GENESIS_30_SECTIONS;
          break;
        case 31:
          sections = GENESIS_31_SECTIONS;
          break;
        case 32:
          sections = GENESIS_32_SECTIONS;
          break;
        case 33:
          sections = GENESIS_33_SECTIONS;
          break;
        case 34:
          sections = GENESIS_34_SECTIONS;
          break;
        case 35:
          sections = GENESIS_35_SECTIONS;
          break;
        case 36:
          sections = GENESIS_36_SECTIONS;
          break;
        case 37:
          sections = GENESIS_37_SECTIONS;
          break;
        case 38:
          sections = GENESIS_38_SECTIONS;
          break;
        case 39:
          sections = GENESIS_39_SECTIONS;
          break;
        case 40:
          sections = GENESIS_40_SECTIONS;
          break;
        case 41:
          sections = GENESIS_41_SECTIONS;
          break;
        case 42:
          sections = GENESIS_42_SECTIONS;
          break;
        case 43:
          sections = GENESIS_43_SECTIONS;
          break;
        case 44:
          sections = GENESIS_44_SECTIONS;
          break;
        case 45:
          sections = GENESIS_45_SECTIONS;
          break;
        case 46:
          sections = GENESIS_46_SECTIONS;
          break;
        case 47:
          sections = GENESIS_47_SECTIONS;
          break;
        case 48:
          sections = GENESIS_48_SECTIONS;
          break;
        case 49:
          sections = GENESIS_49_SECTIONS;
          break;
        case 50:
          sections = GENESIS_50_SECTIONS;
          break;
      }
    } else if (actualBook === 'exodus') {
      switch (actualChapter) {
        case 1:
          sections = EXODUS_1_SECTIONS;
          break;
        case 2:
          sections = EXODUS_2_SECTIONS;
          break;
        case 3:
          sections = EXODUS_3_SECTIONS;
          break;
        case 4:
          sections = EXODUS_4_SECTIONS;
          break;
        case 5:
          sections = EXODUS_5_SECTIONS;
          break;
        case 6:
          sections = EXODUS_6_SECTIONS;
          break;
        case 7:
          sections = EXODUS_7_SECTIONS;
          break;
        case 8:
          sections = EXODUS_8_SECTIONS;
          break;
        case 9:
          sections = EXODUS_9_SECTIONS;
          break;
        case 10:
          sections = EXODUS_10_SECTIONS;
          break;
        case 11:
          sections = EXODUS_11_SECTIONS;
          break;
        case 12:
          sections = EXODUS_12_SECTIONS;
          break;
        case 13:
          sections = EXODUS_13_SECTIONS;
          break;
        case 14:
          sections = EXODUS_14_SECTIONS;
          break;
        case 15:
          sections = EXODUS_15_SECTIONS;
          break;
        case 16:
          sections = EXODUS_16_SECTIONS;
          break;
        case 17:
          sections = EXODUS_17_SECTIONS;
          break;
        case 18:
          sections = EXODUS_18_SECTIONS;
          break;
        case 19:
          sections = EXODUS_19_SECTIONS;
          break;
        case 20:
          sections = EXODUS_20_SECTIONS;
          break;
        case 21:
          sections = EXODUS_21_SECTIONS;
          break;
        case 22:
          sections = EXODUS_22_SECTIONS;
          break;
        case 23:
          sections = EXODUS_23_SECTIONS;
          break;
        case 24:
          sections = EXODUS_24_SECTIONS;
          break;
        case 25:
          sections = EXODUS_25_SECTIONS;
          break;
        case 26:
          sections = EXODUS_26_SECTIONS;
          break;
        case 27:
          sections = EXODUS_27_SECTIONS;
          break;
        case 28:
          sections = EXODUS_28_SECTIONS;
          break;
        case 29:
          sections = EXODUS_29_SECTIONS;
          break;
        case 30:
          sections = EXODUS_30_SECTIONS;
          break;
        case 31:
          sections = EXODUS_31_SECTIONS;
          break;
        case 32:
          sections = EXODUS_32_SECTIONS;
          break;
        case 33:
          sections = EXODUS_33_SECTIONS;
          break;
        case 34:
          sections = EXODUS_34_SECTIONS;
          break;
        case 35:
          sections = EXODUS_35_SECTIONS;
          break;
        case 36:
          sections = EXODUS_36_SECTIONS;
          break;
        case 37:
          sections = EXODUS_37_SECTIONS;
          break;
        case 38:
          sections = EXODUS_38_SECTIONS;
          break;
        case 39:
          sections = EXODUS_39_SECTIONS;
          break;
        case 40:
          sections = EXODUS_40_SECTIONS;
          break;
      }
    } else if (actualBook === 'leviticus') {
      switch (actualChapter) {
        case 1:
          sections = LEVITICUS_1_SECTIONS;
          break;
        case 2:
          sections = LEVITICUS_2_SECTIONS;
          break;
        case 3:
          sections = LEVITICUS_3_SECTIONS;
          break;
        case 4:
          sections = LEVITICUS_4_SECTIONS;
          break;
        case 5:
          sections = LEVITICUS_5_SECTIONS;
          break;
        case 6:
          sections = LEVITICUS_6_SECTIONS;
          break;
        case 7:
          sections = LEVITICUS_7_SECTIONS;
          break;
        case 8:
          sections = LEVITICUS_8_SECTIONS;
          break;
        case 9:
          sections = LEVITICUS_9_SECTIONS;
          break;
        case 10:
          sections = LEVITICUS_10_SECTIONS;
          break;
        case 11:
          sections = LEVITICUS_11_SECTIONS;
          break;
        case 12:
          sections = LEVITICUS_12_SECTIONS;
          break;
        case 13:
          sections = LEVITICUS_13_SECTIONS;
          break;
        case 14:
          sections = LEVITICUS_14_SECTIONS;
          break;
        case 15:
          sections = LEVITICUS_15_SECTIONS;
          break;
        case 16:
          sections = LEVITICUS_16_SECTIONS;
          break;
        case 17:
          sections = LEVITICUS_17_SECTIONS;
          break;
        case 18:
          sections = LEVITICUS_18_SECTIONS;
          break;
        case 19:
          sections = LEVITICUS_19_SECTIONS;
          break;
        case 20:
          sections = LEVITICUS_20_SECTIONS;
          break;
        case 21:
          sections = LEVITICUS_21_SECTIONS;
          break;
        case 22:
          sections = LEVITICUS_22_SECTIONS;
          break;
        case 23:
          sections = LEVITICUS_23_SECTIONS;
          break;
        case 24:
          sections = LEVITICUS_24_SECTIONS;
          break;
        case 25:
          sections = LEVITICUS_25_SECTIONS;
          break;
        case 26:
          sections = LEVITICUS_26_SECTIONS;
          break;
        case 27:
          sections = LEVITICUS_27_SECTIONS;
          break;
      }
    } else if (actualBook === 'numbers') {
      switch (actualChapter) {
        case 1:
          sections = NUMBERS_1_SECTIONS;
          break;
        case 2:
          sections = NUMBERS_2_SECTIONS;
          break;
        case 3:
          sections = NUMBERS_3_SECTIONS;
          break;
        case 4:
          sections = NUMBERS_4_SECTIONS;
          break;
        case 5:
          sections = NUMBERS_5_SECTIONS;
          break;
        case 6:
          sections = NUMBERS_6_SECTIONS;
          break;
        case 7:
          sections = NUMBERS_7_SECTIONS;
          break;
        case 8:
          sections = NUMBERS_8_SECTIONS;
          break;
        case 9:
          sections = NUMBERS_9_SECTIONS;
          break;
        case 10:
          sections = NUMBERS_10_SECTIONS;
          break;
        case 11:
          sections = NUMBERS_11_SECTIONS;
          break;
        case 12:
          sections = NUMBERS_12_SECTIONS;
          break;
        case 13:
          sections = NUMBERS_13_SECTIONS;
          break;
        case 14:
          sections = NUMBERS_14_SECTIONS;
          break;
        case 15:
          sections = NUMBERS_15_SECTIONS;
          break;
        case 16:
          sections = NUMBERS_16_SECTIONS;
          break;
        case 17:
          sections = NUMBERS_17_SECTIONS;
          break;
        case 18:
          sections = NUMBERS_18_SECTIONS;
          break;
        case 19:
          sections = NUMBERS_19_SECTIONS;
          break;
        case 20:
          sections = NUMBERS_20_SECTIONS;
          break;
        case 21:
          sections = NUMBERS_21_SECTIONS;
          break;
        case 22:
          sections = NUMBERS_22_SECTIONS;
          break;
        case 23:
          sections = NUMBERS_23_SECTIONS;
          break;
        case 24:
          sections = NUMBERS_24_SECTIONS;
          break;
        case 25:
          sections = NUMBERS_25_SECTIONS;
          break;
        case 26:
          sections = NUMBERS_26_SECTIONS;
          break;
        case 27:
          sections = NUMBERS_27_SECTIONS;
          break;
        case 28:
          sections = NUMBERS_28_SECTIONS;
          break;
        case 29:
          sections = NUMBERS_29_SECTIONS;
          break;
        case 30:
          sections = NUMBERS_30_SECTIONS;
          break;
        case 31:
          sections = NUMBERS_31_SECTIONS;
          break;
        case 32:
          sections = NUMBERS_32_SECTIONS;
          break;
        case 33:
          sections = NUMBERS_33_SECTIONS;
          break;
        case 34:
          sections = NUMBERS_34_SECTIONS;
          break;
        case 35:
          sections = NUMBERS_35_SECTIONS;
          break;
        case 36:
          sections = NUMBERS_36_SECTIONS;
          break;
      }
    } else if (actualBook === 'deuteronomy') {
      switch (actualChapter) {
        case 1:
          sections = DEUTERONOMY_1_SECTIONS;
          break;
        case 2:
          sections = DEUTERONOMY_2_SECTIONS;
          break;
        case 3:
          sections = DEUTERONOMY_3_SECTIONS;
          break;
        case 4:
          sections = DEUTERONOMY_4_SECTIONS;
          break;
        case 5:
          sections = DEUTERONOMY_5_SECTIONS;
          break;
        case 6:
          sections = DEUTERONOMY_6_SECTIONS;
          break;
        case 7:
          sections = DEUTERONOMY_7_SECTIONS;
          break;
        case 8:
          sections = DEUTERONOMY_8_SECTIONS;
          break;
        case 9:
          sections = DEUTERONOMY_9_SECTIONS;
          break;
        case 10:
          sections = DEUTERONOMY_10_SECTIONS;
          break;
        case 11:
          sections = DEUTERONOMY_11_SECTIONS;
          break;
        case 12:
          sections = DEUTERONOMY_12_SECTIONS;
          break;
        case 13:
          sections = DEUTERONOMY_13_SECTIONS;
          break;
        case 14:
          sections = DEUTERONOMY_14_SECTIONS;
          break;
        case 15:
          sections = DEUTERONOMY_15_SECTIONS;
          break;
        case 16:
          sections = DEUTERONOMY_16_SECTIONS;
          break;
        case 17:
          sections = DEUTERONOMY_17_SECTIONS;
          break;
        case 18:
          sections = DEUTERONOMY_18_SECTIONS;
          break;
        case 19:
          sections = DEUTERONOMY_19_SECTIONS;
          break;
        case 20:
          sections = DEUTERONOMY_20_SECTIONS;
          break;
        case 21:
          sections = DEUTERONOMY_21_SECTIONS;
          break;
        case 22:
          sections = DEUTERONOMY_22_SECTIONS;
          break;
        case 23:
          sections = DEUTERONOMY_23_SECTIONS;
          break;
        case 24:
          sections = DEUTERONOMY_24_SECTIONS;
          break;
        case 25:
          sections = DEUTERONOMY_25_SECTIONS;
          break;
        case 26:
          sections = DEUTERONOMY_26_SECTIONS;
          break;
        case 27:
          sections = DEUTERONOMY_27_SECTIONS;
          break;
        case 28:
          sections = DEUTERONOMY_28_SECTIONS;
          break;
        case 29:
          sections = DEUTERONOMY_29_SECTIONS;
          break;
        case 30:
          sections = DEUTERONOMY_30_SECTIONS;
          break;
        case 31:
          sections = DEUTERONOMY_31_SECTIONS;
          break;
        case 32:
          sections = DEUTERONOMY_32_SECTIONS;
          break;
        case 33:
          sections = DEUTERONOMY_33_SECTIONS;
          break;
        case 34:
          sections = DEUTERONOMY_34_SECTIONS;
          break;
      }
    } else if (actualBook === 'mark') {
      switch (actualChapter) {
        case 1:
          sections = MARK_1_SECTIONS;
          break;
        case 2:
          sections = MARK_2_SECTIONS;
          break;
        case 3:
          sections = MARK_3_SECTIONS;
          break;
        case 4:
          sections = MARK_4_SECTIONS;
          break;
        case 5:
          sections = MARK_5_SECTIONS;
          break;
        case 6:
          sections = MARK_6_SECTIONS;
          break;
        case 7:
          sections = MARK_7_SECTIONS;
          break;
        case 8:
          sections = MARK_8_SECTIONS;
          break;
        case 9:
          sections = MARK_9_SECTIONS;
          break;
        case 10:
          sections = MARK_10_SECTIONS;
          break;
        case 11:
          sections = MARK_11_SECTIONS;
          break;
        case 12:
          sections = MARK_12_SECTIONS;
          break;
        case 13:
          sections = MARK_13_SECTIONS;
          break;
        case 14:
          sections = MARK_14_SECTIONS;
          break;
        case 15:
          sections = MARK_15_SECTIONS;
          break;
        case 16:
          sections = MARK_16_SECTIONS;
          break;
      }
    } else if (actualBook === 'joshua') {
      switch (actualChapter) {
        case 1:
          sections = JOSHUA_1_SECTIONS;
          break;
        case 2:
          sections = JOSHUA_2_SECTIONS;
          break;
        case 3:
          sections = JOSHUA_3_SECTIONS;
          break;
        case 4:
          sections = JOSHUA_4_SECTIONS;
          break;
        case 5:
          sections = JOSHUA_5_SECTIONS;
          break;
        case 6:
          sections = JOSHUA_6_SECTIONS;
          break;
        case 7:
          sections = JOSHUA_7_SECTIONS;
          break;
        case 8:
          sections = JOSHUA_8_SECTIONS;
          break;
        case 9:
          sections = JOSHUA_9_SECTIONS;
          break;
        case 10:
          sections = JOSHUA_10_SECTIONS;
          break;
        case 11:
          sections = JOSHUA_11_SECTIONS;
          break;
        case 12:
          sections = JOSHUA_12_SECTIONS;
          break;
        case 13:
          sections = JOSHUA_13_SECTIONS;
          break;
        case 14:
          sections = JOSHUA_14_SECTIONS;
          break;
        case 15:
          sections = JOSHUA_15_SECTIONS;
          break;
        case 16:
          sections = JOSHUA_16_SECTIONS;
          break;
        case 17:
          sections = JOSHUA_17_SECTIONS;
          break;
        case 18:
          sections = JOSHUA_18_SECTIONS;
          break;
        case 19:
          sections = JOSHUA_19_SECTIONS;
          break;
        case 20:
          sections = JOSHUA_20_SECTIONS;
          break;
        case 21:
          sections = JOSHUA_21_SECTIONS;
          break;
        case 22:
          sections = JOSHUA_22_SECTIONS;
          break;
        case 23:
          sections = JOSHUA_23_SECTIONS;
          break;
        case 24:
          sections = JOSHUA_24_SECTIONS;
          break;
      }
    } else if (actualBook === 'judges') {
      switch (actualChapter) {
        case 1:
          sections = JUDGES_1_SECTIONS;
          break;
        case 2:
          sections = JUDGES_2_SECTIONS;
          break;
        case 3:
          sections = JUDGES_3_SECTIONS;
          break;
        case 4:
          sections = JUDGES_4_SECTIONS;
          break;
        case 5:
          sections = JUDGES_5_SECTIONS;
          break;
        case 6:
          sections = JUDGES_6_SECTIONS;
          break;
        case 7:
          sections = JUDGES_7_SECTIONS;
          break;
        case 8:
          sections = JUDGES_8_SECTIONS;
          break;
        case 9:
          sections = JUDGES_9_SECTIONS;
          break;
        case 10:
          sections = JUDGES_10_SECTIONS;
          break;
        case 11:
          sections = JUDGES_11_SECTIONS;
          break;
        case 12:
          sections = JUDGES_12_SECTIONS;
          break;
        case 13:
          sections = JUDGES_13_SECTIONS;
          break;
        case 14:
          sections = JUDGES_14_SECTIONS;
          break;
        case 15:
          sections = JUDGES_15_SECTIONS;
          break;
        case 16:
          sections = JUDGES_16_SECTIONS;
          break;
        case 17:
          sections = JUDGES_17_SECTIONS;
          break;
        case 18:
          sections = JUDGES_18_SECTIONS;
          break;
        case 19:
          sections = JUDGES_19_SECTIONS;
          break;
        case 20:
          sections = JUDGES_20_SECTIONS;
          break;
        case 21:
          sections = JUDGES_21_SECTIONS;
          break;
      }
    } else if (actualBook === 'matthew') {
      switch (actualChapter) {
        case 1:
          sections = MATTHEW_1_SECTIONS;
          break;
        case 2:
          sections = MATTHEW_2_SECTIONS;
          break;
        case 3:
          sections = MATTHEW_3_SECTIONS;
          break;
        case 4:
          sections = MATTHEW_4_SECTIONS;
          break;
        case 5:
          sections = MATTHEW_5_SECTIONS;
          break;
        case 6:
          sections = MATTHEW_6_SECTIONS;
          break;
        case 7:
          sections = MATTHEW_7_SECTIONS;
          break;
        case 8:
          sections = MATTHEW_8_SECTIONS;
          break;
        case 9:
          sections = MATTHEW_9_SECTIONS;
          break;
        case 10:
          sections = MATTHEW_10_SECTIONS;
          break;
        case 11:
          sections = MATTHEW_11_SECTIONS;
          break;
        case 12:
          sections = MATTHEW_12_SECTIONS;
          break;
        case 13:
          sections = MATTHEW_13_SECTIONS;
          break;
        case 14:
          sections = MATTHEW_14_SECTIONS;
          break;
        case 15:
          sections = MATTHEW_15_SECTIONS;
          break;
        case 16:
          sections = MATTHEW_16_SECTIONS;
          break;
        case 17:
          sections = MATTHEW_17_SECTIONS;
          break;
        case 18:
          sections = MATTHEW_18_SECTIONS;
          break;
        case 19:
          sections = MATTHEW_19_SECTIONS;
          break;
        case 20:
          sections = MATTHEW_20_SECTIONS;
          break;
        case 21:
          sections = MATTHEW_21_SECTIONS;
          break;
        case 22:
          sections = MATTHEW_22_SECTIONS;
          break;
        case 23:
          sections = MATTHEW_23_SECTIONS;
          break;
        case 24:
          sections = MATTHEW_24_SECTIONS;
          break;
        case 25:
          sections = MATTHEW_25_SECTIONS;
          break;
        case 26:
          sections = MATTHEW_26_SECTIONS;
          break;
        case 27:
          sections = MATTHEW_27_SECTIONS;
          break;
        case 28:
          sections = MATTHEW_28_SECTIONS;
          break;
      }
    } else if (actualBook === 'luke') {
      switch (actualChapter) {
        case 1:
          sections = LUKE_1_SECTIONS;
          break;
        case 2:
          sections = LUKE_2_SECTIONS;
          break;
        case 3:
          sections = LUKE_3_SECTIONS;
          break;
        case 4:
          sections = LUKE_4_SECTIONS;
          break;
        case 5:
          sections = LUKE_5_SECTIONS;
          break;
        case 6:
          sections = LUKE_6_SECTIONS;
          break;
        case 7:
          sections = LUKE_7_SECTIONS;
          break;
        case 8:
          sections = LUKE_8_SECTIONS;
          break;
        case 9:
          sections = LUKE_9_SECTIONS;
          break;
        case 10:
          sections = LUKE_10_SECTIONS;
          break;
        case 11:
          sections = LUKE_11_SECTIONS;
          break;
        case 12:
          sections = LUKE_12_SECTIONS;
          break;
        case 13:
          sections = LUKE_13_SECTIONS;
          break;
        case 14:
          sections = LUKE_14_SECTIONS;
          break;
        case 15:
          sections = LUKE_15_SECTIONS;
          break;
        case 16:
          sections = LUKE_16_SECTIONS;
          break;
        case 17:
          sections = LUKE_17_SECTIONS;
          break;
        case 18:
          sections = LUKE_18_SECTIONS;
          break;
        case 19:
          sections = LUKE_19_SECTIONS;
          break;
        case 20:
          sections = LUKE_20_SECTIONS;
          break;
        case 21:
          sections = LUKE_21_SECTIONS;
          break;
        case 22:
          sections = LUKE_22_SECTIONS;
          break;
        case 23:
          sections = LUKE_23_SECTIONS;
          break;
        case 24:
          sections = LUKE_24_SECTIONS;
          break;
      }
    } else if (actualBook === 'john') {
      switch (actualChapter) {
        case 1:
          sections = JOHN_1_SECTIONS;
          break;
        case 2:
          sections = JOHN_2_SECTIONS;
          break;
        case 3:
          sections = JOHN_3_SECTIONS;
          break;
        case 4:
          sections = JOHN_4_SECTIONS;
          break;
        case 5:
          sections = JOHN_5_SECTIONS;
          break;
        case 6:
          sections = JOHN_6_SECTIONS;
          break;
        case 7:
          sections = JOHN_7_SECTIONS;
          break;
        case 8:
          sections = JOHN_8_SECTIONS;
          break;
        case 9:
          sections = JOHN_9_SECTIONS;
          break;
        case 10:
          sections = JOHN_10_SECTIONS;
          break;
        case 11:
          sections = JOHN_11_SECTIONS;
          break;
        case 12:
          sections = JOHN_12_SECTIONS;
          break;
        case 13:
          sections = JOHN_13_SECTIONS;
          break;
        case 14:
          sections = JOHN_14_SECTIONS;
          break;
        case 15:
          sections = JOHN_15_SECTIONS;
          break;
        case 16:
          sections = JOHN_16_SECTIONS;
          break;
        case 17:
          sections = JOHN_17_SECTIONS;
          break;
        case 18:
          sections = JOHN_18_SECTIONS;
          break;
        case 19:
          sections = JOHN_19_SECTIONS;
          break;
        case 20:
          sections = JOHN_20_SECTIONS;
          break;
        case 21:
          sections = JOHN_21_SECTIONS;
          break;
      }
    } else if (actualBook === 'acts') {
      switch (actualChapter) {
        case 1:
          sections = ACTS_1_SECTIONS;
          break;
        case 2:
          sections = ACTS_2_SECTIONS;
          break;
        case 3:
          sections = ACTS_3_SECTIONS;
          break;
        case 4:
          sections = ACTS_4_SECTIONS;
          break;
        case 5:
          sections = ACTS_5_SECTIONS;
          break;
        case 6:
          sections = ACTS_6_SECTIONS;
          break;
        case 7:
          sections = ACTS_7_SECTIONS;
          break;
        case 8:
          sections = ACTS_8_SECTIONS;
          break;
        case 9:
          sections = ACTS_9_SECTIONS;
          break;
        case 10:
          sections = ACTS_10_SECTIONS;
          break;
        case 11:
          sections = ACTS_11_SECTIONS;
          break;
        case 12:
          sections = ACTS_12_SECTIONS;
          break;
        case 13:
          sections = ACTS_13_SECTIONS;
          break;
        case 14:
          sections = ACTS_14_SECTIONS;
          break;
        case 15:
          sections = ACTS_15_SECTIONS;
          break;
        case 16:
          sections = ACTS_16_SECTIONS;
          break;
        case 17:
          sections = ACTS_17_SECTIONS;
          break;
        case 18:
          sections = ACTS_18_SECTIONS;
          break;
        case 19:
          sections = ACTS_19_SECTIONS;
          break;
        case 20:
          sections = ACTS_20_SECTIONS;
          break;
        case 21:
          sections = ACTS_21_SECTIONS;
          break;
        case 22:
          sections = ACTS_22_SECTIONS;
          break;
        case 23:
          sections = ACTS_23_SECTIONS;
          break;
        case 24:
          sections = ACTS_24_SECTIONS;
          break;
        case 25:
          sections = ACTS_25_SECTIONS;
          break;
        case 26:
          sections = ACTS_26_SECTIONS;
          break;
        case 27:
          sections = ACTS_27_SECTIONS;
          break;
        case 28:
          sections = ACTS_28_SECTIONS;
          break;
      }
    } else if (actualBook === 'romans') {
      switch (actualChapter) {
        case 1:
          sections = ROMANS_1_SECTIONS;
          break;
        case 2:
          sections = ROMANS_2_SECTIONS;
          break;
        case 3:
          sections = ROMANS_3_SECTIONS;
          break;
        case 4:
          sections = ROMANS_4_SECTIONS;
          break;
        case 5:
          sections = ROMANS_5_SECTIONS;
          break;
        case 6:
          sections = ROMANS_6_SECTIONS;
          break;
        case 7:
          sections = ROMANS_7_SECTIONS;
          break;
        case 8:
          sections = ROMANS_8_SECTIONS;
          break;
        case 9:
          sections = ROMANS_9_SECTIONS;
          break;
        case 10:
          sections = ROMANS_10_SECTIONS;
          break;
        case 11:
          sections = ROMANS_11_SECTIONS;
          break;
        case 12:
          sections = ROMANS_12_SECTIONS;
          break;
        case 13:
          sections = ROMANS_13_SECTIONS;
          break;
        case 14:
          sections = ROMANS_14_SECTIONS;
          break;
        case 15:
          sections = ROMANS_15_SECTIONS;
          break;
        case 16:
          sections = ROMANS_16_SECTIONS;
          break;
      }
    } else if (actualBook === '1corinthians') {
      switch (actualChapter) {
        case 1:
          sections = CORINTHIANS_1_1_SECTIONS;
          break;
        case 2:
          sections = CORINTHIANS_1_2_SECTIONS;
          break;
        case 3:
          sections = CORINTHIANS_1_3_SECTIONS;
          break;
        case 4:
          sections = CORINTHIANS_1_4_SECTIONS;
          break;
        case 5:
          sections = CORINTHIANS_1_5_SECTIONS;
          break;
        case 6:
          sections = CORINTHIANS_1_6_SECTIONS;
          break;
        case 7:
          sections = CORINTHIANS_1_7_SECTIONS;
          break;
        case 8:
          sections = CORINTHIANS_1_8_SECTIONS;
          break;
        case 9:
          sections = CORINTHIANS_1_9_SECTIONS;
          break;
        case 10:
          sections = CORINTHIANS_1_10_SECTIONS;
          break;
        case 11:
          sections = CORINTHIANS_1_11_SECTIONS;
          break;
        case 12:
          sections = CORINTHIANS_1_12_SECTIONS;
          break;
        case 13:
          sections = CORINTHIANS_1_13_SECTIONS;
          break;
        case 14:
          sections = CORINTHIANS_1_14_SECTIONS;
          break;
        case 15:
          sections = CORINTHIANS_1_15_SECTIONS;
          break;
        case 16:
          sections = CORINTHIANS_1_16_SECTIONS;
          break;
      }
    } else if (actualBook === '2corinthians') {
      switch (actualChapter) {
        case 1:
          sections = CORINTHIANS_2_1_SECTIONS;
          break;
        case 2:
          sections = CORINTHIANS_2_2_SECTIONS;
          break;
        case 3:
          sections = CORINTHIANS_2_3_SECTIONS;
          break;
        case 4:
          sections = CORINTHIANS_2_4_SECTIONS;
          break;
        case 5:
          sections = CORINTHIANS_2_5_SECTIONS;
          break;
        case 6:
          sections = CORINTHIANS_2_6_SECTIONS;
          break;
        case 7:
          sections = CORINTHIANS_2_7_SECTIONS;
          break;
        case 8:
          sections = CORINTHIANS_2_8_SECTIONS;
          break;
        case 9:
          sections = CORINTHIANS_2_9_SECTIONS;
          break;
        case 10:
          sections = CORINTHIANS_2_10_SECTIONS;
          break;
        case 11:
          sections = CORINTHIANS_2_11_SECTIONS;
          break;
        case 12:
          sections = CORINTHIANS_2_12_SECTIONS;
          break;
        case 13:
          sections = CORINTHIANS_2_13_SECTIONS;
          break;
      }
    } else if (actualBook === 'galatians') {
      switch (actualChapter) {
        case 1:
          sections = GALATIANS_1_SECTIONS;
          break;
        case 2:
          sections = GALATIANS_2_SECTIONS;
          break;
        case 3:
          sections = GALATIANS_3_SECTIONS;
          break;
        case 4:
          sections = GALATIANS_4_SECTIONS;
          break;
        case 5:
          sections = GALATIANS_5_SECTIONS;
          break;
        case 6:
          sections = GALATIANS_6_SECTIONS;
          break;
      }
    } else if (actualBook === 'ephesians') {
      switch (actualChapter) {
        case 1:
          sections = EPHESIANS_1_SECTIONS;
          break;
        case 2:
          sections = EPHESIANS_2_SECTIONS;
          break;
        case 3:
          sections = EPHESIANS_3_SECTIONS;
          break;
        case 4:
          sections = EPHESIANS_4_SECTIONS;
          break;
        case 5:
          sections = EPHESIANS_5_SECTIONS;
          break;
        case 6:
          sections = EPHESIANS_6_SECTIONS;
          break;
      }
    } else if (actualBook === 'philippians') {
      switch (actualChapter) {
        case 1:
          sections = PHILIPPIANS_1_SECTIONS;
          break;
        case 2:
          sections = PHILIPPIANS_2_SECTIONS;
          break;
        case 3:
          sections = PHILIPPIANS_3_SECTIONS;
          break;
        case 4:
          sections = PHILIPPIANS_4_SECTIONS;
          break;
      }
    } else if (actualBook === 'colossians') {
      switch (actualChapter) {
        case 1:
          sections = COLOSSIANS_1_SECTIONS;
          break;
        case 2:
          sections = COLOSSIANS_2_SECTIONS;
          break;
        case 3:
          sections = COLOSSIANS_3_SECTIONS;
          break;
        case 4:
          sections = COLOSSIANS_4_SECTIONS;
          break;
      }
    } else if (actualBook === '1-thessalonians') {
      switch (actualChapter) {
        case 1:
          sections = THESSALONIANS_1_1_SECTIONS;
          break;
        case 2:
          sections = THESSALONIANS_1_2_SECTIONS;
          break;
        case 3:
          sections = THESSALONIANS_1_3_SECTIONS;
          break;
        case 4:
          sections = THESSALONIANS_1_4_SECTIONS;
          break;
        case 5:
          sections = THESSALONIANS_1_5_SECTIONS;
          break;
      }
    } else if (actualBook === '2-thessalonians') {
      switch (actualChapter) {
        case 1:
          sections = THESSALONIANS_2_1_SECTIONS;
          break;
        case 2:
          sections = THESSALONIANS_2_2_SECTIONS;
          break;
        case 3:
          sections = THESSALONIANS_2_3_SECTIONS;
          break;
      }
    } else if (actualBook === '1-timothy') {
      switch (actualChapter) {
        case 1:
          sections = TIMOTHY_1_1_SECTIONS;
          break;
        case 2:
          sections = TIMOTHY_1_2_SECTIONS;
          break;
        case 3:
          sections = TIMOTHY_1_3_SECTIONS;
          break;
        case 4:
          sections = TIMOTHY_1_4_SECTIONS;
          break;
        case 5:
          sections = TIMOTHY_1_5_SECTIONS;
          break;
        case 6:
          sections = TIMOTHY_1_6_SECTIONS;
          break;
      }
    } else if (actualBook === '2-timothy') {
      switch (actualChapter) {
        case 1:
          sections = TIMOTHY_2_1_SECTIONS;
          break;
        case 2:
          sections = TIMOTHY_2_2_SECTIONS;
          break;
        case 3:
          sections = TIMOTHY_2_3_SECTIONS;
          break;
        case 4:
          sections = TIMOTHY_2_4_SECTIONS;
          break;
      }
    } else if (actualBook === 'titus') {
      switch (actualChapter) {
        case 1:
          sections = TITUS_1_SECTIONS;
          break;
        case 2:
          sections = TITUS_2_SECTIONS;
          break;
        case 3:
          sections = TITUS_3_SECTIONS;
          break;
      }
    } else if (actualBook === 'philemon') {
      switch (actualChapter) {
        case 1:
          sections = PHILEMON_1_SECTIONS;
          break;
      }
    } else if (actualBook === 'hebrews') {
      switch (actualChapter) {
        case 1:
          sections = HEBREWS_1_SECTIONS;
          break;
        case 2:
          sections = HEBREWS_2_SECTIONS;
          break;
        case 3:
          sections = HEBREWS_3_SECTIONS;
          break;
        case 4:
          sections = HEBREWS_4_SECTIONS;
          break;
        case 5:
          sections = HEBREWS_5_SECTIONS;
          break;
        case 6:
          sections = HEBREWS_6_SECTIONS;
          break;
        case 7:
          sections = HEBREWS_7_SECTIONS;
          break;
        case 8:
          sections = HEBREWS_8_SECTIONS;
          break;
        case 9:
          sections = HEBREWS_9_SECTIONS;
          break;
        case 10:
          sections = HEBREWS_10_SECTIONS;
          break;
        case 11:
          sections = HEBREWS_11_SECTIONS;
          break;
        case 12:
          sections = HEBREWS_12_SECTIONS;
          break;
        case 13:
          sections = HEBREWS_13_SECTIONS;
          break;
      }
    } else if (actualBook === 'james') {
      switch (actualChapter) {
        case 1:
          sections = JAMES_1_SECTIONS;
          break;
        case 2:
          sections = JAMES_2_SECTIONS;
          break;
        case 3:
          sections = JAMES_3_SECTIONS;
          break;
        case 4:
          sections = JAMES_4_SECTIONS;
          break;
        case 5:
          sections = JAMES_5_SECTIONS;
          break;
      }
    } else if (actualBook === '1-peter') {
      switch (actualChapter) {
        case 1:
          sections = PETER1_1_SECTIONS;
          break;
        case 2:
          sections = PETER1_2_SECTIONS;
          break;
        case 3:
          sections = PETER1_3_SECTIONS;
          break;
        case 4:
          sections = PETER1_4_SECTIONS;
          break;
        case 5:
          sections = PETER1_5_SECTIONS;
          break;
      }
    } else if (actualBook === '2-peter') {
      switch (actualChapter) {
        case 1:
          sections = PETER2_1_SECTIONS;
          break;
        case 2:
          sections = PETER2_2_SECTIONS;
          break;
        case 3:
          sections = PETER2_3_SECTIONS;
          break;
      }
    } else if (actualBook === '1-john') {
      switch (actualChapter) {
        case 1:
          sections = JOHN1_1_SECTIONS;
          break;
        case 2:
          sections = JOHN1_2_SECTIONS;
          break;
        case 3:
          sections = JOHN1_3_SECTIONS;
          break;
        case 4:
          sections = JOHN1_4_SECTIONS;
          break;
        case 5:
          sections = JOHN1_5_SECTIONS;
          break;
      }
    } else if (actualBook === '2-john') {
      switch (actualChapter) {
        case 1:
          sections = JOHN2_1_SECTIONS;
          break;
      }
    } else if (actualBook === '3-john') {
      switch (actualChapter) {
        case 1:
          sections = JOHN3_1_SECTIONS;
          break;
      }
    } else if (actualBook === 'jude') {
      switch (actualChapter) {
        case 1:
          sections = JUDE_1_SECTIONS;
          break;
      }
    } else if (actualBook === 'revelation') {
      switch (actualChapter) {
        case 1:
          sections = REVELATION_1_SECTIONS;
          break;
        case 2:
          sections = REVELATION_2_SECTIONS;
          break;
        case 3:
          sections = REVELATION_3_SECTIONS;
          break;
        case 4:
          sections = REVELATION_4_SECTIONS;
          break;
        case 5:
          sections = REVELATION_5_SECTIONS;
          break;
        case 6:
          sections = REVELATION_6_SECTIONS;
          break;
        case 7:
          sections = REVELATION_7_SECTIONS;
          break;
        case 8:
          sections = REVELATION_8_SECTIONS;
          break;
        case 9:
          sections = REVELATION_9_SECTIONS;
          break;
        case 10:
          sections = REVELATION_10_SECTIONS;
          break;
        case 11:
          sections = REVELATION_11_SECTIONS;
          break;
        case 12:
          sections = REVELATION_12_SECTIONS;
          break;
        case 13:
          sections = REVELATION_13_SECTIONS;
          break;
        case 14:
          sections = REVELATION_14_SECTIONS;
          break;
        case 15:
          sections = REVELATION_15_SECTIONS;
          break;
        case 16:
          sections = REVELATION_16_SECTIONS;
          break;
        case 17:
          sections = REVELATION_17_SECTIONS;
          break;
        case 18:
          sections = REVELATION_18_SECTIONS;
          break;
        case 19:
          sections = REVELATION_19_SECTIONS;
          break;
        case 20:
          sections = REVELATION_20_SECTIONS;
          break;
        case 21:
          sections = REVELATION_21_SECTIONS;
          break;
        case 22:
          sections = REVELATION_22_SECTIONS;
          break;
      }
    }

    return (
      <div className="max-w-[760px] mx-auto">
        <ChapterOutline sections={sections} />
        <div className="space-y-4">
          {sections.map((daySection) => {
            const dayVerses = verses.filter(
              (v) => v.verse >= daySection.verseRange[0] && v.verse <= daySection.verseRange[1]
            );
            return (
              <div
                key={daySection.day}
                id={slugify(daySection.day)}
                className={`rounded-2xl border-l-[3px] p-6 md:p-8 scroll-mt-24 ${daySection.borderColor} ${daySection.color}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <button
                    onClick={() => handleCopySection(daySection.day, dayVerses)}
                    className="font-sans text-sm text-muted hover:text-ink transition-colors cursor-pointer"
                    title="Copy section"
                  >
                    {copiedSection === daySection.day ? '✓' : '⧉'}
                  </button>
                  <h3 className="font-sans text-[12px] tracking-[0.16em] uppercase font-bold text-gold-ink">
                    {daySection.day}
                  </h3>
                </div>
                <div className="font-serif text-ink text-[21px] leading-[1.95]">
                  {dayVerses.map((verse) => (
                    <Verse
                      key={verse.verse}
                      verse={verse}
                      isSelected={selectedVerses.has(verse.verse)}
                      onToggle={toggleVerse}
                      commentary={commentary.get(verse.verse)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Default rendering for other chapters
  return (
    <div className="max-w-[760px] mx-auto">
      <div className="font-serif text-ink text-[21px] leading-[1.95]">
        {verses.map((verse) => (
          <Verse
            key={verse.verse}
            verse={verse}
            isSelected={selectedVerses.has(verse.verse)}
            onToggle={toggleVerse}
            commentary={commentary.get(verse.verse)}
          />
        ))}
      </div>
    </div>
  );
}
