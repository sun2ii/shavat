import fs from 'fs';
import path from 'path';

export async function getWritingContent(book: string, chapter: number): Promise<string | null> {
  try {
    const filePath = path.join(process.cwd(), 'lib', 'writings', book, `${book}-${chapter}.md`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    return content;
  } catch (error) {
    console.error('Error reading writing:', error);
    return null;
  }
}
