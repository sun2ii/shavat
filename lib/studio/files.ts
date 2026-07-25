import fs from 'fs';
import path from 'path';

/*
  The studio writes to the working tree, so it runs in `next dev` and nowhere
  else. Vercel's filesystem is read-only; a deployed studio would fail on save
  rather than fail honestly, so it refuses up front instead.

  Same pattern as lib/getWritingContent.ts — paths are relative to the repo root
  and joined against process.cwd().
*/

export const STUDIO_IS_LIVE = process.env.NODE_ENV !== 'production';

export function readRepoFile(relativePath: string): string | null {
  const filePath = path.join(process.cwd(), relativePath);
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, 'utf8');
}

export function writeRepoFile(relativePath: string, content: string): void {
  const filePath = path.join(process.cwd(), relativePath);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, 'utf8');
}
