import { ProverbsTopic, PROVERBS_TOPICS, TOPIC_ORDER, isValidTopic } from './proverbs-topics';
import verseTopicsData from './data/proverbs-verse-topics.json';
import wealthSubtopicsData from './data/wealth-subtopics.json';
import proverbsData from './proverbs.json';

type VerseTopicsMap = Record<string, ProverbsTopic[]>;

const verseTopics: VerseTopicsMap = verseTopicsData as VerseTopicsMap;

export interface Subtopic {
  id: string;
  label: string;
  description: string;
}

export interface TopicVerseWithSubtopic extends TopicVerse {
  subtopic?: string;
}

export interface SubtopicGroup {
  subtopic: Subtopic;
  verses: TopicVerse[];
}

/**
 * Get topics for a specific verse.
 */
export function getVerseTopics(chapter: number, verse: number): ProverbsTopic[] {
  const key = `${chapter}:${verse}`;
  return verseTopics[key] || [];
}

/**
 * Get all topics for an entire chapter.
 * Returns a map of verse number to topics.
 */
export function getChapterTopics(chapter: number): Map<number, ProverbsTopic[]> {
  const result = new Map<number, ProverbsTopic[]>();
  const prefix = `${chapter}:`;

  for (const [key, topics] of Object.entries(verseTopics)) {
    if (key.startsWith(prefix)) {
      const verseNum = parseInt(key.slice(prefix.length), 10);
      result.set(verseNum, topics);
    }
  }

  return result;
}

export interface TopicVerse {
  chapter: number;
  verse: number;
  text: string;
}

/**
 * Get all verses for a given topic, in canonical order.
 */
export function getVersesByTopic(topic: ProverbsTopic): TopicVerse[] {
  if (!isValidTopic(topic)) {
    return [];
  }

  const verses: TopicVerse[] = [];

  for (const [key, topics] of Object.entries(verseTopics)) {
    if (topics.includes(topic)) {
      const [chapterStr, verseStr] = key.split(':');
      const chapter = parseInt(chapterStr, 10);
      const verse = parseInt(verseStr, 10);

      const chapterData = proverbsData.chapters.find(
        (c) => parseInt(c.chapter, 10) === chapter
      );
      const verseData = chapterData?.verses.find(
        (v) => parseInt(v.verse, 10) === verse
      );

      if (verseData) {
        verses.push({
          chapter,
          verse,
          text: verseData.text,
        });
      }
    }
  }

  // Sort by chapter, then verse
  verses.sort((a, b) => {
    if (a.chapter !== b.chapter) return a.chapter - b.chapter;
    return a.verse - b.verse;
  });

  return verses;
}

/**
 * Get count of verses per topic.
 */
export function getTopicCounts(): Record<ProverbsTopic, number> {
  const counts: Record<ProverbsTopic, number> = {} as Record<ProverbsTopic, number>;

  for (const topic of TOPIC_ORDER) {
    counts[topic] = 0;
  }

  for (const topics of Object.values(verseTopics)) {
    for (const topic of topics) {
      if (isValidTopic(topic)) {
        counts[topic]++;
      }
    }
  }

  return counts;
}

/**
 * Get all topics with their counts, sorted by the canonical order.
 */
export function getTopicsWithCounts(): Array<{
  topic: ProverbsTopic;
  label: string;
  color: string;
  count: number;
}> {
  const counts = getTopicCounts();

  return TOPIC_ORDER.map((topic) => ({
    topic,
    label: PROVERBS_TOPICS[topic].label,
    color: PROVERBS_TOPICS[topic].color,
    count: counts[topic],
  }));
}

/**
 * Check if a topic has subtopics defined.
 */
export function hasSubtopics(topic: ProverbsTopic): boolean {
  return topic === 'wealth';
}

/**
 * Get verses grouped by subtopic for topics that have them.
 */
export function getVersesBySubtopic(topic: ProverbsTopic): SubtopicGroup[] | null {
  if (topic !== 'wealth') {
    return null;
  }

  const subtopics = wealthSubtopicsData.subtopics as Subtopic[];
  const verseSubtopicMap = wealthSubtopicsData.verses as Record<string, string>;

  const groups: SubtopicGroup[] = subtopics.map((subtopic) => ({
    subtopic,
    verses: [],
  }));

  const verses = getVersesByTopic(topic);

  for (const verse of verses) {
    const key = `${verse.chapter}:${verse.verse}`;
    const subtopicId = verseSubtopicMap[key];

    if (subtopicId) {
      const group = groups.find((g) => g.subtopic.id === subtopicId);
      if (group) {
        group.verses.push(verse);
      }
    }
  }

  // Filter out empty groups and return
  return groups.filter((g) => g.verses.length > 0);
}
