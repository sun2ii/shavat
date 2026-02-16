interface VerseCommentary {
  verse: number;
  commentary: string;
}

interface CommentaryData {
  book: string;
  chapter: number;
  verses: VerseCommentary[];
}

const commentaryCache = new Map<string, CommentaryData>();

export async function loadCommentary(book: string, chapter: number): Promise<CommentaryData | null> {
  const key = `${book}-${chapter}`;

  if (commentaryCache.has(key)) {
    return commentaryCache.get(key)!;
  }

  try {
    // Try new directory structure first (mark/mark-1.json)
    let data;
    try {
      data = await import(`./commentary/${book}/${book}-${chapter}.json`);
    } catch {
      // Fall back to old structure (genesis-1.json)
      data = await import(`./commentary/${book}-${chapter}.json`);
    }
    const commentaryData = data.default as CommentaryData;
    commentaryCache.set(key, commentaryData);
    return commentaryData;
  } catch (error) {
    return null;
  }
}

export function getCommentary(book: string, chapter: number): Map<number, string> {
  const key = `${book}-${chapter}`;
  const cached = commentaryCache.get(key);

  if (!cached) {
    return new Map();
  }

  const map = new Map<number, string>();
  for (const verse of cached.verses) {
    map.set(verse.verse, verse.commentary);
  }

  return map;
}
