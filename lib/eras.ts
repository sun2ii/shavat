// Ordered era list — the stable spine of the Story Map.
// Eras follow canon order (Genesis → Revelation). A movement's `era` field
// wins if present; otherwise the era is inferred from its book (and, for
// Genesis, from the movement id, since Genesis spans two eras).

export interface Era {
  id: string;
  label: string;
  description: string;
}

export const ERAS: Era[] = [
  { id: 'primeval', label: 'Primeval', description: 'Creation, fall, flood, and the scattering at Babel' },
  { id: 'patriarchs', label: 'Patriarchs', description: 'Abraham, Isaac, Jacob, and Joseph — promise carried by a family' },
  { id: 'exodus-law', label: 'Exodus & Law', description: 'Deliverance from Egypt and the covenant at Sinai' },
  { id: 'conquest-judges', label: 'Conquest & Judges', description: 'Entering the land and the cycle of rescue and relapse' },
  { id: 'kingdom', label: 'Kingdom', description: 'The rise, division, and fall of the monarchy' },
  { id: 'exile-return', label: 'Exile & Return', description: 'Judgment, captivity, and the long road home' },
  { id: 'wisdom', label: 'Wisdom & Poetry', description: 'Songs, proverbs, and the questions of suffering and meaning' },
  { id: 'prophets', label: 'Prophets', description: 'Voices calling the people back and pointing forward' },
  { id: 'gospels', label: 'Gospels', description: 'The life, death, and resurrection of Jesus' },
  { id: 'church', label: 'The Church', description: 'The Spirit poured out; the message goes to the nations' },
  { id: 'epistles', label: 'Epistles', description: 'Letters forming the scattered churches' },
  { id: 'apocalypse', label: 'Apocalypse', description: 'All things made new' },
];

export function getEraById(id: string): Era | undefined {
  return ERAS.find((e) => e.id === id);
}

// Genesis is the one book that spans two eras; split by movement id.
const GENESIS_MOVEMENT_ERAS: Record<string, string> = {
  creation: 'primeval',
  'adam-and-eve': 'primeval',
  noah: 'primeval',
  abraham: 'patriarchs',
  isaac: 'patriarchs',
  jacob: 'patriarchs',
  joseph: 'patriarchs',
};

// Book slug → era id, for every non-Genesis book.
const BOOK_ERAS: Record<string, string> = {
  exodus: 'exodus-law',
  leviticus: 'exodus-law',
  numbers: 'exodus-law',
  deuteronomy: 'exodus-law',

  joshua: 'conquest-judges',
  judges: 'conquest-judges',
  ruth: 'conquest-judges',

  '1-samuel': 'kingdom',
  '2-samuel': 'kingdom',
  '1-kings': 'kingdom',
  '2-kings': 'kingdom',
  '1-chronicles': 'kingdom',
  '2-chronicles': 'kingdom',

  ezra: 'exile-return',
  nehemiah: 'exile-return',
  esther: 'exile-return',

  job: 'wisdom',
  psalms: 'wisdom',
  proverbs: 'wisdom',
  ecclesiastes: 'wisdom',
  'song-of-solomon': 'wisdom',

  isaiah: 'prophets',
  jeremiah: 'prophets',
  lamentations: 'prophets',
  ezekiel: 'prophets',
  daniel: 'prophets',
  hosea: 'prophets',
  joel: 'prophets',
  amos: 'prophets',
  obadiah: 'prophets',
  jonah: 'prophets',
  micah: 'prophets',
  nahum: 'prophets',
  habakkuk: 'prophets',
  zephaniah: 'prophets',
  haggai: 'prophets',
  zechariah: 'prophets',
  malachi: 'prophets',

  matthew: 'gospels',
  mark: 'gospels',
  luke: 'gospels',
  john: 'gospels',

  acts: 'church',

  romans: 'epistles',
  '1-corinthians': 'epistles',
  '2-corinthians': 'epistles',
  galatians: 'epistles',
  ephesians: 'epistles',
  philippians: 'epistles',
  colossians: 'epistles',
  '1-thessalonians': 'epistles',
  '2-thessalonians': 'epistles',
  '1-timothy': 'epistles',
  '2-timothy': 'epistles',
  titus: 'epistles',
  philemon: 'epistles',
  hebrews: 'epistles',
  james: 'epistles',
  '1-peter': 'epistles',
  '2-peter': 'epistles',
  '1-john': 'epistles',
  '2-john': 'epistles',
  '3-john': 'epistles',
  jude: 'epistles',

  revelation: 'apocalypse',
};

/**
 * Infer the era for a movement. An explicit `era` field on the division
 * always wins (pass it as `explicitEra`).
 */
export function inferEra(bookSlug: string, movementId: string, explicitEra?: string): string {
  if (explicitEra && getEraById(explicitEra)) return explicitEra;
  if (bookSlug === 'genesis') {
    return GENESIS_MOVEMENT_ERAS[movementId] ?? 'primeval';
  }
  return BOOK_ERAS[bookSlug] ?? 'prophets';
}
