import { getCurrentUser } from '@/lib/auth';
import { sql } from '@/lib/db';
import SavedContent from './SavedContent';

// Saved — everything the reader made with their own hand: highlights (with
// their notes), bookmarks, and reflections. v1 reads localStorage for
// unauthenticated users; authenticated users get account-backed storage.

interface DbBookmark {
  book: string;
  chapter: number;
  verse: number | null;
  created_at: string;
}

async function getBookmarks(userEmail: string): Promise<DbBookmark[]> {
  try {
    const rows = await sql`
      SELECT book, chapter, verse, created_at
      FROM bookmarks
      WHERE user_email = ${userEmail}
      ORDER BY created_at DESC
    `;
    return rows as DbBookmark[];
  } catch {
    return [];
  }
}

export default async function SavedPage() {
  const user = await getCurrentUser();
  const isAuthenticated = !!user;

  // Fetch server-side data for authenticated users
  const serverBookmarks = isAuthenticated ? await getBookmarks(user!.email) : [];

  return (
    <SavedContent
      isAuthenticated={isAuthenticated}
      serverBookmarks={serverBookmarks}
    />
  );
}
