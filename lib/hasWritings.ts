export interface Writing {
  book: string;
  chapter: number;
  division: string;
  divisionIndex: number;
  title: string;
  path: string;
}

const WRITINGS: Writing[] = [
  {
    book: 'john',
    chapter: 1,
    division: 'prologue',
    divisionIndex: 1,
    title: 'The Love of God in John 1',
    path: '/writings/john/prologue',
  },
  {
    book: 'john',
    chapter: 2,
    division: 'discourses',
    divisionIndex: 1,
    title: 'Two Powerful Sides of Jesus',
    path: '/writings/john/discourses-1',
  },
  {
    book: 'john',
    chapter: 3,
    division: 'discourses',
    divisionIndex: 2,
    title: 'The Love of God: Holy, Saving, and Life-Giving',
    path: '/writings/john/discourses-2',
  },
];

export function hasWriting(book: string, chapter: number): boolean {
  return WRITINGS.some(
    (w) => w.book === book && w.chapter === chapter
  );
}

export function getWriting(book: string, chapter: number): Writing | undefined {
  return WRITINGS.find(
    (w) => w.book === book && w.chapter === chapter
  );
}

export function getAllWritings(): Writing[] {
  return WRITINGS;
}

export function getWritingByPath(book: string, divisionPath: string): Writing | undefined {
  return WRITINGS.find(
    (w) => w.book === book && w.path === `/writings/${book}/${divisionPath}`
  );
}

export async function getWritingContent(book: string, chapter: number): Promise<string | null> {
  try {
    const fs = require('fs');
    const path = require('path');
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
