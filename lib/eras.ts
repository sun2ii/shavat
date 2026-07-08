// The 10-act spine — the terrain map of the whole biblical story.
// Acts replace the old shelf-order eras. Every book has a placement:
//   spine  — advances the plot; read these alone and you get the whole arc.
//   voice  — written from inside the story (prophets, psalms, letters);
//            anchored to the act it speaks into.
//   wisdom — floats above the story; anchored where it best fits.
//
// This pass renders the spine only. Slot-ins (voice/wisdom) carry their
// anchor act so a later pass can attach them under each act band.

export interface Era {
  id: string;
  label: string;
  description: string;
}

// Kept as `Era`/`ERAS` so existing imports stay stable; these are the acts.
export const ERAS: Era[] = [
  { id: 'origins', label: 'Act 1 · Origins', description: 'Creation to Joseph — the family the whole story follows' },
  { id: 'out-of-egypt', label: 'Act 2 · Out of Egypt', description: 'Slavery, deliverance, Sinai, and the wilderness road' },
  { id: 'taking-the-land', label: 'Act 3 · Taking the Land', description: 'Conquest, then the downward spiral of the judges' },
  { id: 'kingdom', label: 'Act 4 · The Kingdom', description: 'Saul, David, Solomon — the rise of the monarchy' },
  { id: 'kingdom-falls', label: 'Act 5 · The Kingdom Falls', description: 'Division, decline, and the fall of Jerusalem' },
  { id: 'exile', label: 'Act 6 · Exile', description: 'Babylon — keeping faith in a foreign land' },
  { id: 'return', label: 'Act 7 · The Return', description: 'The long road home and the rebuild' },
  { id: 'jesus', label: 'Act 8 · Jesus', description: 'The life, death, and resurrection of Jesus — three angles' },
  { id: 'church', label: 'Act 9 · The Church', description: 'Luke’s two volumes — from Jesus to the ends of the earth' },
  { id: 'the-end', label: 'Act 10 · The End', description: 'All things made new — the finale of the whole arc' },
];

export function getEraById(id: string): Era | undefined {
  return ERAS.find((e) => e.id === id);
}

export type BookRole = 'story' | 'voice' | 'wisdom';

export interface BookPlacement {
  act: string;      // act id the book belongs to (spine) or anchors to (slot-in)
  spine: boolean;   // true = part of the unbroken storyline
  role: BookRole;
  anchor?: string;  // one line: why it sits here (slot-ins)
  tagline?: string; // one line of narrative weight, shown on book-level map nodes
}

// Every book in the canon gets exactly one placement.
// Genesis movements are all Act 1 (handled in inferEra).
export const BOOK_PLACEMENTS: Record<string, BookPlacement> = {
  genesis: { act: 'origins', spine: true, role: 'story' },
  job: { act: 'origins', spine: false, role: 'wisdom', anchor: 'Set in the patriarch era — the oldest “meanwhile” in the Bible' },

  exodus: { act: 'out-of-egypt', spine: true, role: 'story', tagline: 'Slavery, plagues, the sea, Sinai' },
  numbers: { act: 'out-of-egypt', spine: true, role: 'story', tagline: 'Forty years in the wilderness' },
  leviticus: { act: 'out-of-egypt', spine: false, role: 'voice', anchor: 'The law given while camped at Sinai' },
  deuteronomy: { act: 'out-of-egypt', spine: false, role: 'voice', anchor: 'Moses’ farewell sermon before the story resumes' },

  joshua: { act: 'taking-the-land', spine: true, role: 'story', tagline: 'The land is taken' },
  judges: { act: 'taking-the-land', spine: true, role: 'story', tagline: 'The downward spiral' },
  ruth: { act: 'taking-the-land', spine: false, role: 'story', anchor: 'A short story set “in the days of the judges”' },

  '1-samuel': { act: 'kingdom', spine: true, role: 'story', tagline: 'Samuel, Saul, and the rise of David' },
  '2-samuel': { act: 'kingdom', spine: true, role: 'story', tagline: 'David’s reign — glory and fracture' },
  '1-kings': { act: 'kingdom', spine: true, role: 'story', tagline: 'Solomon’s glory; the kingdom splits' }, // chs 1–11 Solomon; 12+ begins the fall
  psalms: { act: 'kingdom', spine: false, role: 'voice', anchor: 'David’s songs from inside these very chapters' },
  proverbs: { act: 'kingdom', spine: false, role: 'wisdom', anchor: 'Solomon-era wisdom' },
  ecclesiastes: { act: 'kingdom', spine: false, role: 'wisdom', anchor: 'Solomon-era wisdom' },
  'song-of-solomon': { act: 'kingdom', spine: false, role: 'wisdom', anchor: 'Solomon-era wisdom' },

  '2-kings': { act: 'kingdom-falls', spine: true, role: 'story', tagline: 'The long fall to Babylon' },
  amos: { act: 'kingdom-falls', spine: false, role: 'voice', anchor: 'To the northern kingdom before Assyria destroys it' },
  hosea: { act: 'kingdom-falls', spine: false, role: 'voice', anchor: 'To the northern kingdom before Assyria destroys it' },
  jonah: { act: 'kingdom-falls', spine: false, role: 'voice', anchor: 'About Assyria itself' },
  nahum: { act: 'kingdom-falls', spine: false, role: 'voice', anchor: 'About Assyria itself' },
  isaiah: { act: 'kingdom-falls', spine: false, role: 'voice', anchor: 'To Judah during the Assyrian crisis' },
  micah: { act: 'kingdom-falls', spine: false, role: 'voice', anchor: 'To Judah during the Assyrian crisis' },
  zephaniah: { act: 'kingdom-falls', spine: false, role: 'voice', anchor: 'Judah’s final decline' },
  habakkuk: { act: 'kingdom-falls', spine: false, role: 'voice', anchor: 'Judah’s final decline' },
  joel: { act: 'kingdom-falls', spine: false, role: 'voice', anchor: 'A day-of-the-LORD warning; date debated, fits the decline' },
  jeremiah: { act: 'kingdom-falls', spine: false, role: 'voice', anchor: 'Eyewitness to Jerusalem’s fall' },
  lamentations: { act: 'kingdom-falls', spine: false, role: 'voice', anchor: 'The funeral poem — read right after 2 Kings 25' },

  daniel: { act: 'exile', spine: true, role: 'story', tagline: 'Faithful in a foreign empire' }, // chs 1–6 story; 7–12 visions
  ezekiel: { act: 'exile', spine: false, role: 'voice', anchor: 'Voice from among the exiles in Babylon' },
  obadiah: { act: 'exile', spine: false, role: 'voice', anchor: 'Against Edom for gloating over Jerusalem’s fall' },

  ezra: { act: 'return', spine: true, role: 'story', tagline: 'Home to rebuild the temple' },
  nehemiah: { act: 'return', spine: true, role: 'story', tagline: 'The wall in fifty-two days' },
  esther: { act: 'return', spine: true, role: 'story', tagline: 'The queen and the great reversal' },
  haggai: { act: 'return', spine: false, role: 'voice', anchor: 'Preaching during the temple rebuild' },
  zechariah: { act: 'return', spine: false, role: 'voice', anchor: 'Preaching during the temple rebuild' },
  malachi: { act: 'return', spine: false, role: 'voice', anchor: 'The Old Testament’s last word' },
  '1-chronicles': { act: 'return', spine: false, role: 'story', anchor: 'The royal story retold for the returnees — second-pass material' },
  '2-chronicles': { act: 'return', spine: false, role: 'story', anchor: 'The royal story retold for the returnees — second-pass material' },

  matthew: { act: 'jesus', spine: true, role: 'story', tagline: 'Jesus, the promised King' },
  mark: { act: 'jesus', spine: true, role: 'story', tagline: 'Jesus, urgent and unstoppable' },
  john: { act: 'jesus', spine: true, role: 'story', tagline: 'Jesus, the Word made flesh' },

  luke: { act: 'church', spine: true, role: 'story', tagline: 'Volume one — the story of Jesus' },
  acts: { act: 'church', spine: true, role: 'story', tagline: 'Volume two — the story goes to the world' },
  galatians: { act: 'church', spine: false, role: 'voice', anchor: 'Early journeys (Acts 13–17)' },
  '1-thessalonians': { act: 'church', spine: false, role: 'voice', anchor: 'Early journeys (Acts 13–17)' },
  '2-thessalonians': { act: 'church', spine: false, role: 'voice', anchor: 'Early journeys (Acts 13–17)' },
  '1-corinthians': { act: 'church', spine: false, role: 'voice', anchor: 'Third journey (Acts 18–20)' },
  '2-corinthians': { act: 'church', spine: false, role: 'voice', anchor: 'Third journey (Acts 18–20)' },
  romans: { act: 'church', spine: false, role: 'voice', anchor: 'Third journey (Acts 18–20)' },
  ephesians: { act: 'church', spine: false, role: 'voice', anchor: 'Written from the prison where Acts ends' },
  philippians: { act: 'church', spine: false, role: 'voice', anchor: 'Written from the prison where Acts ends' },
  colossians: { act: 'church', spine: false, role: 'voice', anchor: 'Written from the prison where Acts ends' },
  philemon: { act: 'church', spine: false, role: 'voice', anchor: 'Written from the prison where Acts ends' },
  '1-timothy': { act: 'church', spine: false, role: 'voice', anchor: 'After Acts closes' },
  titus: { act: 'church', spine: false, role: 'voice', anchor: 'After Acts closes' },
  '2-timothy': { act: 'church', spine: false, role: 'voice', anchor: 'Paul’s last words' },
  james: { act: 'church', spine: false, role: 'voice', anchor: 'Other voices to the same scattered churches' },
  '1-peter': { act: 'church', spine: false, role: 'voice', anchor: 'Other voices to the same scattered churches' },
  '2-peter': { act: 'church', spine: false, role: 'voice', anchor: 'Other voices to the same scattered churches' },
  hebrews: { act: 'church', spine: false, role: 'voice', anchor: 'Other voices to the same scattered churches' },
  jude: { act: 'church', spine: false, role: 'voice', anchor: 'Other voices to the same scattered churches' },
  '1-john': { act: 'church', spine: false, role: 'voice', anchor: 'Other voices to the same scattered churches' },
  '2-john': { act: 'church', spine: false, role: 'voice', anchor: 'Other voices to the same scattered churches' },
  '3-john': { act: 'church', spine: false, role: 'voice', anchor: 'Other voices to the same scattered churches' },

  revelation: { act: 'the-end', spine: true, role: 'story', tagline: 'All things made new' },
};

export function getPlacement(bookSlug: string): BookPlacement {
  return (
    BOOK_PLACEMENTS[bookSlug] ?? {
      act: 'origins',
      spine: false,
      role: 'wisdom',
    }
  );
}

/**
 * Resolve the act for a movement. An explicit `era` field on the division
 * always wins (pass it as `explicitEra`). Kept as `inferEra` for
 * compatibility with existing callers.
 */
export function inferEra(bookSlug: string, movementId: string, explicitEra?: string): string {
  if (explicitEra && getEraById(explicitEra)) return explicitEra;
  return getPlacement(bookSlug).act;
}
