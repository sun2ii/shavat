import { NextRequest, NextResponse } from 'next/server';
import { STUDIO_IS_LIVE, readRepoFile } from '@/lib/studio/files';
import { draftFilePath, memorialFilePath } from '@/lib/studio/emitTypeScript';
import { getDivisionById } from '@/lib/book-metadata-utils';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * The draft for one division, or null when nothing has been written yet.
 * `written` distinguishes "no draft, but a memorial exists" — one written by
 * hand before the studio — from "nothing at all".
 */
export async function GET(request: NextRequest) {
  if (!STUDIO_IS_LIVE) {
    return NextResponse.json({ error: 'The studio only runs in development.' }, { status: 403 });
  }

  const book = request.nextUrl.searchParams.get('book') ?? '';
  const division = request.nextUrl.searchParams.get('division') ?? '';

  // The division must exist in <book>-metadata.json. That is what turns a pair
  // of query params into a path — an unknown pair never becomes one.
  if (!getDivisionById(book, division)) {
    return NextResponse.json({ error: `Unknown division ${book}/${division}.` }, { status: 404 });
  }

  return NextResponse.json({
    draft: readRepoFile(draftFilePath(book, division)),
    written: readRepoFile(memorialFilePath(book, division)) !== null,
  });
}
