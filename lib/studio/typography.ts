/*
  Every existing memorial is set in typographic punctuation — ’ for apostrophes,
  “ ” for quotation, – between chapter numbers. A draft pasted from anywhere else
  arrives with the straight ASCII forms. These two functions detect that and fix
  it, so the register of the page never depends on where the prose was typed.

  This runs over the whole draft, not over individual fields. The draft's own
  syntax survives it: list markers are a single "- " (never "--"), and the
  key: value lines carry no quotes.
*/

/** True when the draft still holds ASCII punctuation that the page should not. */
export function hasStraightTypography(text: string): boolean {
  return /['"]/.test(text) || /--/.test(text) || /\d-\d/.test(text);
}

/**
 * Straight punctuation to typographic.
 *
 * Apostrophes are unconditional: in this corpus a lone ' is possessive or a
 * contraction ("God's", "don't") essentially every time, and treating the rare
 * single-quoted phrase as a special case costs more than it saves.
 */
export function typographize(text: string): string {
  return text
    // Chapter ranges: Judges 1-2 -> Judges 1–2. Before the em dash rule so a
    // hyphen between numerals is never mistaken for a dash of punctuation.
    .replace(/(\d)\s*-\s*(\d)/g, '$1–$2')
    // A doubled hyphen is always an em dash.
    .replace(/--+/g, '—')
    // Double quotes alternate: opening after start-of-line, whitespace, or an
    // opening bracket; closing everywhere else.
    .replace(/"/g, (_match, offset: number, whole: string) => {
      const before = offset === 0 ? '' : whole[offset - 1];
      return before === '' || /[\s(\[{—–]/.test(before) ? '“' : '”';
    })
    .replace(/'/g, '’');
}
