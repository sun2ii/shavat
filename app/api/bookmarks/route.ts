import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

interface Bookmark {
  book: string;
  chapter: number;
  verse: number;
}

interface BookmarkStore {
  [clientId: string]: Bookmark;
}

const BOOKMARKS_FILE = path.join(process.cwd(), 'bookmarks.json');

async function readBookmarks(): Promise<BookmarkStore> {
  try {
    const data = await fs.readFile(BOOKMARKS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

async function writeBookmarks(store: BookmarkStore): Promise<void> {
  await fs.writeFile(BOOKMARKS_FILE, JSON.stringify(store, null, 2), 'utf-8');
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const clientId = searchParams.get('clientId');

  if (!clientId) {
    return NextResponse.json({ error: 'clientId required' }, { status: 400 });
  }

  const store = await readBookmarks();
  const bookmark = store[clientId] || null;

  return NextResponse.json({ bookmark });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientId, bookmark } = body;

    if (!clientId || !bookmark) {
      return NextResponse.json(
        { error: 'clientId and bookmark required' },
        { status: 400 }
      );
    }

    const store = await readBookmarks();
    store[clientId] = bookmark;
    await writeBookmarks(store);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving bookmark:', error);
    return NextResponse.json(
      { error: 'Failed to save bookmark' },
      { status: 500 }
    );
  }
}
