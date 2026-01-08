import { GenesisBook, GenesisMetadata } from './types';
import genesisMetadata from './genesis-metadata.json';

const metadata = genesisMetadata as GenesisMetadata;

/**
 * Get all Genesis books (collections)
 */
export function getAllBooks(): GenesisBook[] {
  return metadata.books;
}

/**
 * Get a specific book by its slug ID
 */
export function getBookById(id: string): GenesisBook | undefined {
  return metadata.books.find(book => book.id === id);
}

/**
 * Get the book that contains a specific chapter
 */
export function getBookByChapter(chapter: number): GenesisBook | undefined {
  return metadata.books.find(book => book.chapters.includes(chapter));
}

/**
 * Get the first chapter of a book
 */
export function getFirstChapter(bookId: string): number | undefined {
  const book = getBookById(bookId);
  return book?.chapters[0];
}

/**
 * Get the last chapter of a book
 */
export function getLastChapter(bookId: string): number | undefined {
  const book = getBookById(bookId);
  return book?.chapters[book.chapters.length - 1];
}

/**
 * Check if a chapter is the first in its book
 */
export function isFirstChapterInBook(chapter: number): boolean {
  const book = getBookByChapter(chapter);
  return book?.chapters[0] === chapter;
}

/**
 * Check if a chapter is the last in its book
 */
export function isLastChapterInBook(chapter: number): boolean {
  const book = getBookByChapter(chapter);
  return book?.chapters[book.chapters.length - 1] === chapter;
}

/**
 * Get chapter position within its book (1-indexed)
 */
export function getChapterPositionInBook(chapter: number): { position: number; total: number } | undefined {
  const book = getBookByChapter(chapter);
  if (!book) return undefined;
  const position = book.chapters.indexOf(chapter) + 1;
  return { position, total: book.chapters.length };
}
