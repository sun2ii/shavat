import fs from 'fs';
import path from 'path';

export async function getWritingContent(book: string, chapter: number): Promise<string | null> {
  return readWriting(writingFile(book, chapter));
}

/**
 * A division-level writing — the summary of a whole movement, e.g.
 * lib/writings/joshua/joshua-possess-the-land.md
 */
export async function getDivisionWritingContent(
  book: string,
  divisionId: string
): Promise<string | null> {
  return readWriting(divisionWritingFile(book, divisionId));
}

export function writingFile(book: string, chapter: number): string {
  return path.join('lib', 'writings', book, `${book}-${chapter}.md`);
}

export function divisionWritingFile(book: string, divisionId: string): string {
  return path.join('lib', 'writings', book, `${book}-${divisionId}.md`);
}

async function readWriting(relativePath: string): Promise<string | null> {
  try {
    const filePath = path.join(process.cwd(), relativePath);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error('Error reading writing:', error);
    return null;
  }
}
