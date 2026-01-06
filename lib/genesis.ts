import { Verse, GenesisJSON } from './types';
import genesisData from './genesis.json';

const data = genesisData as GenesisJSON;

// Get verses for a specific chapter (1-indexed)
export function getChapter(chapterNum: number): Verse[] | null {
  if (chapterNum < 1 || chapterNum > 50) {
    return null;
  }

  const chapterData = data.chapters.find(
    (c) => parseInt(c.chapter) === chapterNum
  );

  if (!chapterData) return null;

  return chapterData.verses.map((v) => ({
    book: 'Genesis',
    chapter: chapterNum,
    verse: parseInt(v.verse),
    text: v.text,
  }));
}

// Get total chapter count
export function getChapterCount(): number {
  return data.count;
}
