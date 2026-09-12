/**
 * Proverbs Topic Taxonomy
 *
 * 12 thematic categories for organizing Proverbs verses.
 * Each verse can belong to 1-2 topics.
 */

export const PROVERBS_TOPICS = {
  wisdom: { label: 'Wisdom & Foolishness', color: 'amber' },
  speech: { label: 'Speech & Listening', color: 'blue' },
  anger: { label: 'Anger & Patience', color: 'red' },
  friendship: { label: 'Friendship & Loyalty', color: 'emerald' },
  family: { label: 'Marriage & Family', color: 'rose' },
  work: { label: 'Work & Diligence', color: 'orange' },
  wealth: { label: 'Wealth & Generosity', color: 'yellow' },
  justice: { label: 'Justice & Fairness', color: 'indigo' },
  leadership: { label: 'Leadership & Power', color: 'purple' },
  discipline: { label: 'Discipline & Teachability', color: 'teal' },
  desire: { label: 'Desire & Self-Control', color: 'pink' },
  'fear-of-lord': { label: 'Fear of the Lord', color: 'sky' },
} as const;

export type ProverbsTopic = keyof typeof PROVERBS_TOPICS;

export const TOPIC_ORDER: ProverbsTopic[] = [
  'wisdom',
  'speech',
  'anger',
  'friendship',
  'family',
  'work',
  'wealth',
  'justice',
  'leadership',
  'discipline',
  'desire',
  'fear-of-lord',
];

export function isValidTopic(topic: string): topic is ProverbsTopic {
  return topic in PROVERBS_TOPICS;
}

export function getTopicLabel(topic: ProverbsTopic): string {
  return PROVERBS_TOPICS[topic].label;
}

export function getTopicColor(topic: ProverbsTopic): string {
  return PROVERBS_TOPICS[topic].color;
}
