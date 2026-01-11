import { Verse, BookJSON } from './types';
import bookData from './3-john.json';

const data = bookData as BookJSON;

export function getChapter(chapterNum: number): Verse[] | null {
  if (chapterNum < 1 || chapterNum > data.count) {
    return null;
  }

  const chapterData = data.chapters.find(
    (c) => parseInt(c.chapter) === chapterNum
  );

  if (!chapterData) return null;

  return chapterData.verses.map((v) => ({
    book: '3 John',
    chapter: chapterNum,
    verse: parseInt(v.verse),
    text: v.text,
  }));
}

export function getChapterCount(): number {
  return data.count;
}
