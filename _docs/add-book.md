# Adding a New Book to Readings

## Quick Reference

```
1. Create data files:     lib/readings/{reading-id}/
2. Create app routes:     app/readings/{reading-id}/
3. Update registry:       app/readings/page.tsx
```

## Directory Structure

```
lib/readings/
└─ {reading-id}/
   ├─ metadata.json           # Book structure + metadata
   ├─ {book-slug}-1.json      # Chapter content for book 1
   ├─ {book-slug}-2.json      # Chapter content for book 2
   └─ ...
```

## Step 1: Create metadata.json

```json
{
  "id": "reading-id",
  "title": "Full Book Title",
  "author": "Author Name",
  "translator": "Translator Name (optional)",
  "source": "https://source-url.com (optional)",
  "books": [
    {
      "id": 1,
      "slug": "book-slug-1",
      "title": "Book One Title",
      "chapters": 25
    },
    {
      "id": 2,
      "slug": "book-slug-2",
      "title": "Book Two Title",
      "chapters": 12
    }
  ]
}
```

**Notes:**
- `id` must match the directory name
- `slug` is used for file names and URLs
- `chapters` is the count of chapters in that book

## Step 2: Create Book Content Files

For each book in metadata, create `{book-slug}.json`:

```json
{
  "book": "Book Display Name",
  "slug": "book-slug-1",
  "count": 25,
  "chapters": [
    {
      "chapter": "1",
      "title": "Chapter Title",
      "verses": [
        { "verse": "1", "text": "First sentence or paragraph." },
        { "verse": "2", "text": "Second sentence or paragraph." }
      ]
    },
    {
      "chapter": "2",
      "title": "Second Chapter Title",
      "verses": [
        { "verse": "1", "text": "..." }
      ]
    }
  ]
}
```

**Notes:**
- `verses` are sentences (split on `.!?` boundaries)
- BookReader treats each verse as a selectable unit
- Always split paragraphs into sentences for natural reading flow

## Step 3: Create App Routes

### Book Index Page

Create `app/readings/{reading-id}/page.tsx`:

```tsx
import Link from 'next/link';
import { getReadingMetadata } from '@/lib/readings-accessor';
import { notFound } from 'next/navigation';

export const metadata = {
  title: 'Book Title | Shavat',
};

export default function ReadingPage() {
  const data = getReadingMetadata('reading-id');
  if (!data) return notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-playfair font-semibold mb-2">{data.title}</h1>
      <p className="text-muted mb-8">by {data.author}</p>

      <div className="space-y-8">
        {data.books.map((book) => (
          <div key={book.id}>
            <h2 className="text-xl font-semibold mb-3">
              Book {book.id}: {book.title}
            </h2>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: book.chapters }, (_, i) => i + 1).map((ch) => (
                <Link
                  key={ch}
                  href={`/readings/reading-id/${book.id}/${ch}`}
                  className="w-10 h-10 flex items-center justify-center rounded border border-hairline hover:bg-gold/10 hover:border-gold transition-colors"
                >
                  {ch}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Chapter Reader Page

Create `app/readings/{reading-id}/[book]/[chapter]/page.tsx`:

```tsx
import { notFound, redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getReadingMetadata, createReadingAccessor } from '@/lib/readings-accessor';
import BookReader from '@/components/BookReader';

interface Props {
  params: Promise<{ book: string; chapter: string }>;
}

export default async function ChapterPage({ params }: Props) {
  const { book, chapter } = await params;
  const bookNum = parseInt(book);
  const chapterNum = parseInt(chapter);

  // Validate
  const metadata = getReadingMetadata('reading-id');
  if (!metadata) return notFound();

  const bookMeta = metadata.books.find((b) => b.id === bookNum);
  if (!bookMeta || chapterNum < 1 || chapterNum > bookMeta.chapters) {
    return notFound();
  }

  // Load chapter
  const accessor = createReadingAccessor('reading-id', bookMeta.slug);
  if (!accessor) return notFound();

  const chapterData = accessor.getChapter(chapterNum);
  if (!chapterData) return notFound();

  // Auth check
  const token = (await cookies()).get('auth-token')?.value;
  const isAuthenticated = !!token;

  // Calculate prev/next
  let prevChapter: string | null = null;
  let nextChapter: string | null = null;

  if (chapterNum > 1) {
    prevChapter = `/readings/reading-id/${bookNum}/${chapterNum - 1}`;
  } else if (bookNum > 1) {
    const prevBook = metadata.books.find((b) => b.id === bookNum - 1);
    if (prevBook) {
      prevChapter = `/readings/reading-id/${bookNum - 1}/${prevBook.chapters}`;
    }
  }

  if (chapterNum < bookMeta.chapters) {
    nextChapter = `/readings/reading-id/${bookNum}/${chapterNum + 1}`;
  } else {
    const nextBook = metadata.books.find((b) => b.id === bookNum + 1);
    if (nextBook) {
      nextChapter = `/readings/reading-id/${nextBook.id}/1`;
    }
  }

  return (
    <BookReader
      verses={chapterData.verses}
      book={bookMeta.slug}
      chapter={chapterNum}
      prevChapter={prevChapter}
      nextChapter={nextChapter}
      isAuthenticated={isAuthenticated}
      initialCursor={1}
    />
  );
}
```

## Step 4: Update Readings Registry

Edit `app/readings/page.tsx`:

```tsx
const READINGS = [
  {
    id: 'imitation-of-christ',
    title: 'The Imitation of Christ',
    author: 'Thomas à Kempis',
    description: 'A classic devotional on the spiritual life',
    books: 4,
    chapters: 114,
  },
  // ADD NEW BOOK HERE:
  {
    id: 'reading-id',
    title: 'Book Title',
    author: 'Author Name',
    description: 'Short description',
    books: 2,      // number of books
    chapters: 37,  // total chapters across all books
  },
];
```

## Import Script Template

For converting XHTML/HTML sources to JSON, adapt `scripts/import-imitation-of-christ.mjs`:

```javascript
import fs from 'fs';
import path from 'path';

const READING_ID = 'new-reading';
const BASE_URL = 'https://source.com/path';
const OUTPUT_DIR = `lib/readings/${READING_ID}`;

const BOOKS = [
  { id: 1, slug: 'book-1', title: 'Book One', chapters: 10 },
  { id: 2, slug: 'book-2', title: 'Book Two', chapters: 8 },
];

async function fetchChapter(bookNum, chapterNum) {
  const url = `${BASE_URL}/chapter-${bookNum}-${chapterNum}.html`;
  const res = await fetch(url);
  return res.text();
}

function parseChapter(html) {
  // Extract paragraphs from HTML
  const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map(m => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim())
    .filter(p => p.length > 10);

  // Split into sentences (the standard approach)
  const sentences = paragraphs
    .flatMap(p => p.split(/(?<=[.!?])\s+/))
    .map(s => s.trim())
    .filter(s => s.length > 0);

  return sentences.map((text, idx) => ({
    verse: String(idx + 1),
    text,
  }));
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Write metadata
  const metadata = {
    id: READING_ID,
    title: 'Book Title',
    author: 'Author',
    books: BOOKS.map(b => ({ ...b, chapters: b.chapters })),
  };
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'metadata.json'),
    JSON.stringify(metadata, null, 2)
  );

  // Write each book
  for (const book of BOOKS) {
    const chapters = [];
    for (let ch = 1; ch <= book.chapters; ch++) {
      const html = await fetchChapter(book.id, ch);
      const { title, verses } = parseChapter(html);
      chapters.push({ chapter: String(ch), title, verses });
    }

    const bookData = {
      book: book.title,
      slug: book.slug,
      count: book.chapters,
      chapters,
    };

    fs.writeFileSync(
      path.join(OUTPUT_DIR, `${book.slug}.json`),
      JSON.stringify(bookData, null, 2)
    );
  }
}

main();
```

Run with: `node scripts/import-{reading-id}.mjs`

## Checklist

- [ ] Create `lib/readings/{reading-id}/metadata.json`
- [ ] Create `lib/readings/{reading-id}/{book-slug}.json` for each book
- [ ] Create `app/readings/{reading-id}/page.tsx` (book index)
- [ ] Create `app/readings/{reading-id}/[book]/[chapter]/page.tsx` (reader)
- [ ] Add entry to `READINGS` array in `app/readings/page.tsx`
- [ ] Test navigation: prev/next chapters, cross-book boundaries
- [ ] Test highlights and reading progress (requires auth)

## Key Invariants

| Rule | Why |
|------|-----|
| `metadata.id` = directory name | Accessor lookup |
| `book.slug` = JSON filename (without .json) | File loading |
| Verse numbers are strings | JSON format consistency |
| Chapter numbers are 1-indexed | URL readability |
| Book IDs are sequential integers | Navigation logic |

## Automatic Features

Once data and routes are in place, these work automatically:

- **Highlights**: Stored per book/chapter/verse via `/api/highlights`
- **Reading Progress**: Tracked via `/api/reading-progress`
- **Keyboard Navigation**: Up/down arrows, cursor highlighting
- **BookReader UI**: Verse selection, commentary (if added)
