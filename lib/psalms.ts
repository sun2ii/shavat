import { Verse } from './types';
import psalmsMetadata from './psalms-metadata.json';
import { createBookAccessor } from './book-accessor';

// Get psalm metadata by category ID (e.g., "wisdom-1")
export function getPsalmMetadataByCategoryId(categoryId: string) {
  return psalmsMetadata.psalms.find(p => p.category_id === categoryId);
}

// Get verses by category ID
export function getChapterByCategoryId(categoryId: string): Verse[] | null {
  const metadata = getPsalmMetadataByCategoryId(categoryId);
  if (!metadata) return null;
  return createBookAccessor('psalms')!.getChapter(metadata.number);
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
