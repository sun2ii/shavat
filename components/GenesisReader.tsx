'use client';

import { useState, useEffect } from 'react';
import { Verse as VerseType } from '@/lib/types';
import Verse from './Verse';
import { loadCommentary, getCommentary } from '@/lib/getCommentary';

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

export default function GenesisReader({ verses, book, chapter }: Props) {
  const [selectedVerses, setSelectedVerses] = useState<Set<number>>(new Set());
  const [commentary, setCommentary] = useState<Map<number, string>>(new Map());

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

  // Check if this is Genesis 1-50 or Mark 1-16
  const hasStructuredSections =
    (actualBook === 'genesis' && actualChapter >= 1 && actualChapter <= 50) ||
    (actualBook === 'mark' && actualChapter >= 1 && actualChapter <= 16);

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
    }

    return (
      <div className="max-w-none space-y-6">
        {sections.map((daySection) => {
          const dayVerses = verses.filter(
            v => v.verse >= daySection.verseRange[0] && v.verse <= daySection.verseRange[1]
          );

          return (
            <div key={daySection.day} className={`p-6 rounded-lg border-l-4 ${daySection.borderColor} ${daySection.color}`}>
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                {daySection.day}
              </h3>
              <div className="text-[rgb(var(--text-primary))] text-lg leading-relaxed">
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
    );
  }

  // Default rendering for other chapters
  return (
    <div className="max-w-none">
      <div className="text-[rgb(var(--text-primary))] text-lg leading-relaxed">
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
