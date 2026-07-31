/** Where a division's draft lives — the one writings source of truth. */
export function draftFilePath(bookSlug: string, divisionId: string): string {
  return `lib/writings/${bookSlug}/${divisionId}.draft.md`;
}
