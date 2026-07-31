import { NextRequest, NextResponse } from 'next/server';
import { STUDIO_IS_LIVE, writeRepoFile } from '@/lib/studio/files';
import { parseDraft, serializeDraft } from '@/lib/studio/draftFormat';
import { isBlocked, validate } from '@/lib/studio/validate';
import { draftFilePath } from '@/lib/studio/paths';
import { getDivisionById } from '@/lib/book-metadata-utils';
import { writingPath } from '@/lib/routes';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Write the draft — the single source the writings route renders from. */
export async function POST(request: NextRequest) {
  if (!STUDIO_IS_LIVE) {
    return NextResponse.json({ error: 'The studio only runs in development.' }, { status: 403 });
  }

  let body: { book?: string; division?: string; draft?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Malformed request.' }, { status: 400 });
  }

  const book = body.book ?? '';
  const division = body.division ?? '';
  const text = body.draft ?? '';

  const known = getDivisionById(book, division);
  if (!known) {
    return NextResponse.json({ error: `Unknown division ${book}/${division}.` }, { status: 404 });
  }

  const { memorial } = parseDraft(text);

  if (memorial.bookSlug !== book || memorial.divisionId !== division) {
    return NextResponse.json(
      { error: 'The draft’s book and division do not match the one being saved.' },
      { status: 400 }
    );
  }

  const issues = validate(memorial, known.chapters, text);
  if (isBlocked(issues)) {
    return NextResponse.json({ error: 'The draft has unresolved problems.', issues }, { status: 422 });
  }

  const written = [
    // Re-serialized rather than stored verbatim, so the file on disk is always
    // the canonical form of what was parsed. That is what makes reload lossless.
    { path: draftFilePath(book, division), content: serializeDraft(memorial) },
  ];

  try {
    for (const file of written) {
      writeRepoFile(file.path, file.content);
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Could not write the files.' },
      { status: 500 }
    );
  }

  return NextResponse.json({
    paths: written.map((file) => file.path),
    path: writingPath(book, division),
    issues,
  });
}
