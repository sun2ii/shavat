import { Verse, BookJSON } from './types';
import psalmsData from './psalms-data.json';
import psalmsMetadata from './psalms-metadata.json';

const data = psalmsData as BookJSON;

// Get verses for a specific chapter (1-indexed)
export function getChapter(chapterNum: number): Verse[] | null {
  if (chapterNum < 1 || chapterNum > 150) {
    return null;
  }

  const chapterData = data.chapters.find(
    (c) => parseInt(c.chapter) === chapterNum
  );

  if (!chapterData) return null;

  return chapterData.verses.map((v) => ({
    book: 'Psalms',
    chapter: chapterNum,
    verse: parseInt(v.verse),
    text: v.text,
  }));
}

// Get total chapter count
export function getChapterCount(): number {
  return data.count;
}

// Get psalm metadata by category ID (e.g., "wisdom-1")
export function getPsalmMetadataByCategoryId(categoryId: string) {
  return psalmsMetadata.psalms.find(p => p.category_id === categoryId);
}

// Get verses by category ID
export function getChapterByCategoryId(categoryId: string): Verse[] | null {
  const metadata = getPsalmMetadataByCategoryId(categoryId);
  if (!metadata) return null;
  return getChapter(metadata.number);
}

// Get chapter number from category ID
export function getChapterFromCategoryId(categoryId: string): number | null {
  const metadata = getPsalmMetadataByCategoryId(categoryId);
  return metadata ? metadata.number : null;
}

// Get category ID from chapter number (for redirects)
export function getCategoryIdFromChapter(chapterNum: number): string | null {
  const metadata = psalmsMetadata.psalms.find(p => p.number === chapterNum);
  return metadata ? metadata.category_id : null;
}
