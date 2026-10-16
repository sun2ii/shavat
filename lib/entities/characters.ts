/**
 * Character Entity System
 *
 * Provides tokenization and lookup for biblical characters.
 * Characters have unique IDs that persist across the entire Bible,
 * allowing references to the same person from different books to connect.
 */

export interface Character {
  id: string;
  name: string;
  aliases: string[]; // Alternative names/titles that refer to the same person
  description: string;
  historicalBackground?: string;
  role: string; // Role in the biblical narrative
  references: ScriptureReference[];
  testament: 'old' | 'new' | 'both';
}

export interface ScriptureReference {
  book: string;
  chapter: number;
  verses?: string; // e.g., "1-8" or "1, 3, 5"
  context?: string; // Brief description of what happens in this reference
}

// Character data - starting with Mark 1:1-8 characters
// This will grow as we add more books
const CHARACTERS: Character[] = [
  {
    id: 'jesus-christ',
    name: 'Jesus Christ',
    aliases: ['Jesus', 'Christ', 'Jesus the Messiah', 'the Messiah', 'Son of God', 'the Son of God', 'the Lord'],
    description:
      'The central figure of Christianity, believed to be the Son of God and the Messiah prophesied in the Hebrew Scriptures. His life, teachings, death, and resurrection form the foundation of the Christian faith.',
    historicalBackground:
      'Born in Bethlehem during the reign of Herod the Great, Jesus grew up in Nazareth of Galilee. He began his public ministry around age 30, after being baptized by John the Baptist.',
    role: 'The promised Messiah, Savior, and Son of God whose coming was foretold by the prophets.',
    references: [
      { book: 'mark', chapter: 1, verses: '1', context: 'Introduced as the subject of the good news' },
      { book: 'mark', chapter: 1, verses: '9-11', context: 'Baptized by John in the Jordan' },
      { book: 'matthew', chapter: 1, verses: '1-25', context: 'Genealogy and birth narrative' },
      { book: 'john', chapter: 1, verses: '1-18', context: 'The Word made flesh' },
    ],
    testament: 'new',
  },
  {
    id: 'john-the-baptist',
    name: 'John the Baptist',
    aliases: ['John', 'John the Baptizer', 'the Baptist', 'the Baptizer'],
    description:
      'A Jewish prophet who prepared the way for Jesus by calling people to repentance and baptizing them in the Jordan River. He is considered the last of the Old Testament prophets and the forerunner of the Messiah.',
    historicalBackground:
      'Son of Zechariah the priest and Elizabeth, a relative of Mary. He lived an ascetic life in the wilderness, wearing camel hair and eating locusts and wild honey. He was later imprisoned and executed by Herod Antipas.',
    role: 'The forerunner of Christ, preparing the way for the Messiah through preaching repentance and baptism.',
    references: [
      { book: 'mark', chapter: 1, verses: '2-8', context: 'Ministry of preparation in the wilderness' },
      { book: 'matthew', chapter: 3, verses: '1-17', context: 'Preaching and baptizing Jesus' },
      { book: 'luke', chapter: 1, verses: '5-25, 57-80', context: 'Birth and early life' },
      { book: 'john', chapter: 1, verses: '19-34', context: 'Testimony about Jesus' },
    ],
    testament: 'new',
  },
  {
    id: 'isaiah',
    name: 'Isaiah',
    aliases: ['Isaiah the prophet', 'the prophet Isaiah', 'the prophet'],
    description:
      'One of the major prophets of ancient Israel who ministered during the 8th century BC. His prophecies include messianic predictions that Christians interpret as foretelling Jesus Christ.',
    historicalBackground:
      'Isaiah prophesied during the reigns of Uzziah, Jotham, Ahaz, and Hezekiah, kings of Judah. He witnessed the fall of the Northern Kingdom to Assyria and warned Judah of coming judgment while also proclaiming hope for restoration.',
    role: 'Major prophet whose writings foretold the coming of the Messiah and the ministry of John the Baptist.',
    references: [
      { book: 'mark', chapter: 1, verses: '2-3', context: 'Quoted regarding the messenger preparing the way' },
      { book: 'isaiah', chapter: 40, verses: '3', context: 'Original prophecy of the voice in the wilderness' },
      { book: 'isaiah', chapter: 53, context: 'The suffering servant prophecy' },
      { book: 'matthew', chapter: 4, verses: '14-16', context: 'Fulfilled prophecy of light in Galilee' },
    ],
    testament: 'old',
  },
];

// Build lookup structures
function buildCharacterMaps() {
  const idToCharacter = new Map<string, Character>();
  const nameToId = new Map<string, string>();
  const allNames: string[] = [];

  for (const char of CHARACTERS) {
    idToCharacter.set(char.id, char);

    // Add primary name
    nameToId.set(char.name.toLowerCase(), char.id);
    allNames.push(char.name);

    // Add all aliases
    for (const alias of char.aliases) {
      nameToId.set(alias.toLowerCase(), char.id);
      allNames.push(alias);
    }
  }

  // Sort longest-first for greedy matching
  allNames.sort((a, b) => b.length - a.length);

  return { idToCharacter, nameToId, allNames };
}

const { idToCharacter, nameToId, allNames } = buildCharacterMaps();

// Build regex for character matching
const CHARACTERS_REGEX = new RegExp(
  `\\b(${allNames.map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\b`,
  'gi'
);

export interface CharacterSegment {
  text: string;
  isCharacter: boolean;
  characterId?: string;
}

/**
 * Tokenize text to identify character references.
 * Returns segments where character names are marked for linking.
 */
export function tokenizeCharacters(text: string): CharacterSegment[] {
  const segments: CharacterSegment[] = [];
  let lastIndex = 0;

  CHARACTERS_REGEX.lastIndex = 0;
  let match;

  while ((match = CHARACTERS_REGEX.exec(text)) !== null) {
    // Add preceding text
    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), isCharacter: false });
    }

    const characterId = nameToId.get(match[0].toLowerCase());
    segments.push({ text: match[0], isCharacter: true, characterId });
    lastIndex = CHARACTERS_REGEX.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), isCharacter: false });
  }

  return segments.length > 0 ? segments : [{ text, isCharacter: false }];
}

/**
 * Get a character by their unique ID.
 */
export function getCharacterById(id: string): Character | undefined {
  return idToCharacter.get(id);
}

/**
 * Get all characters.
 */
export function getAllCharacters(): Character[] {
  return [...CHARACTERS].sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Convert a character name to a URL-safe ID.
 */
export function characterNameToId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}
