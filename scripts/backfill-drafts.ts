/**
 * One-time: give the six hand-written Joshua memorials the draft file the
 * studio loads them from, and prove the format round-trips on real content.
 *
 * Run with: npx tsx scripts/backfill-drafts.ts
 *
 * For every memorial it serializes to draft text, parses that text back, and
 * compares the result to the original object. A mismatch means parseDraft and
 * serializeDraft are not inverses, and it prints the offending field instead of
 * writing anything. Nothing is written unless every memorial round-trips.
 */

import { writeFileSync } from 'fs';
import { join } from 'path';
import { DivisionMemorial } from '../lib/types';
import { parseDraft, serializeDraft } from '../lib/studio/draftFormat';
import { FIRST_TESTS } from '../lib/writings/joshua/first-tests';
import { FORMATION } from '../lib/writings/joshua/formation';
import { INHERITANCE } from '../lib/writings/joshua/inheritance';
import { LEGACY } from '../lib/writings/joshua/legacy';
import { POSSESS } from '../lib/writings/joshua/possess';
import { SHILOH } from '../lib/writings/joshua/shiloh';

const MEMORIALS: DivisionMemorial[] = [FORMATION, FIRST_TESTS, POSSESS, INHERITANCE, SHILOH, LEGACY];

/** Report the first field where the round-trip diverged, or null. */
function diff(original: DivisionMemorial, round: DivisionMemorial): string | null {
  const walk = (a: unknown, b: unknown, path: string): string | null => {
    if (Array.isArray(a) || Array.isArray(b)) {
      if (!Array.isArray(a) || !Array.isArray(b)) return `${path}: array on one side only`;
      if (a.length !== b.length) return `${path}: ${a.length} became ${b.length}`;
      for (let i = 0; i < a.length; i += 1) {
        const found = walk(a[i], b[i], `${path}[${i}]`);
        if (found) return found;
      }
      return null;
    }

    if (a && b && typeof a === 'object' && typeof b === 'object') {
      for (const key of Object.keys(a as object)) {
        const found = walk(
          (a as Record<string, unknown>)[key],
          (b as Record<string, unknown>)[key],
          path ? `${path}.${key}` : key
        );
        if (found) return found;
      }
      return null;
    }

    return a === b ? null : `${path}: ${JSON.stringify(a)} became ${JSON.stringify(b)}`;
  };

  return walk(original, round, '');
}

const pending: { path: string; content: string }[] = [];
let failed = false;

for (const memorial of MEMORIALS) {
  const draft = serializeDraft(memorial);
  const { memorial: round } = parseDraft(draft);
  const divergence = diff(memorial, round);

  const label = `${memorial.bookSlug}/${memorial.divisionId}`;

  if (divergence) {
    console.error(`✗ ${label} — ${divergence}`);
    failed = true;
    continue;
  }

  console.log(`✓ ${label}`);
  pending.push({
    path: join('lib', 'writings', memorial.bookSlug, `${memorial.divisionId}.draft.md`),
    content: draft,
  });
}

if (failed) {
  console.error('\nNothing written. Fix the format before backfilling.');
  process.exit(1);
}

for (const file of pending) {
  writeFileSync(join(process.cwd(), file.path), file.content, 'utf8');
  console.log(`wrote ${file.path}`);
}

console.log(`\n${pending.length} drafts written. Commit them and every memorial loads in the studio.`);
