// Terrain — the landscape view of Scripture.
//
// Primitives:
//   Dimension — a way of looking at the landscape (Story, People, Places,
//               Timeline). Only Story is live; the rest are placeholders
//               that already exist architecturally.
//   Era       — a historical period in the biblical narrative. The primary
//               organizational unit for the Old Testament story spine.
//   Stop      — a destination on the journey: an Era or Collection of books.
//   Branch    — a stop connected sideways rather than forward (Chronicles:
//               a parallel retelling, not the next stop).
//   Gap       — a stretch of the path where the story goes silent
//               (the 400 years between the testaments).
//   Layer     — future overlays on the Story terrain (prophets, wisdom,
//               themes, geography, cross references, journeys). Declared
//               here so the terrain's shape never changes when they land.
//
// The journey composes as an ordered list of segments (stop | gap).
// Books resolve against the canonical BIBLE_INDEX; nothing here duplicates
// book data.

import { getBookBySlug } from './bible-index';

// ---------------------------------------------------------------------------
// Dimensions
// ---------------------------------------------------------------------------

export type DimensionId = 'story' | 'characters' | 'places' | 'timeline';

export interface Dimension {
  id: DimensionId;
  label: string;
  status: 'live' | 'coming-soon';
  tagline: string;
}

export const DIMENSIONS: Dimension[] = [
  { id: 'story', label: 'Story', status: 'live', tagline: 'One storyline, beginning to end' },
  { id: 'characters', label: 'Characters', status: 'live', tagline: 'The lives the story follows' },
  { id: 'places', label: 'Places', status: 'live', tagline: 'The ground it happened on' },
  { id: 'timeline', label: 'Timeline', status: 'coming-soon', tagline: 'The centuries it spans' },
];

// ---------------------------------------------------------------------------
// Layers (architectural placeholder — no UI yet)
// ---------------------------------------------------------------------------

export type LayerId =
  | 'prophets'
  | 'wisdom'
  | 'themes'
  | 'geography'
  | 'cross-references'
  | 'journeys';

export interface TerrainLayer {
  id: LayerId;
  label: string;
}

// Empty until layers ship. The Story terrain below must never change shape
// to accommodate a layer — layers attach to stops, they don't reroute the path.
export const LAYERS: TerrainLayer[] = [];

// ---------------------------------------------------------------------------
// Biblical Eras — the historical spine of the Old Testament
// ---------------------------------------------------------------------------

export type EraId =
  | 'origins'
  | 'patriarchs'
  | 'exodus'
  | 'tribes'
  | 'kingdom'
  | 'exile'
  | 'return';

/**
 * A prophet's ministry may span multiple eras. The `eras` array captures this.
 * `note` can indicate uncertainty or special context.
 */
export interface ProphetMapping {
  slug: string;
  eras: EraId[];
  context?: 'israel' | 'judah' | 'transition' | 'uncertain';
  note?: string;
}

/**
 * A wisdom book's placement may be uncertain (Job's patriarchal setting).
 */
export interface WisdomMapping {
  slug: string;
  era: EraId;
  uncertain?: boolean;
  note?: string;
}

/**
 * A historical era in the biblical narrative.
 *
 * Primary books tell the history directly.
 * Prophets spoke during this era.
 * Wisdom/poetry was composed during or associated with this era.
 * Parallel books retell the same history (Chronicles).
 */
export interface BiblicalEra {
  id: EraId;
  name: string;
  description?: string;
  // Books that directly narrate this era's history
  primaryBooks: string[];
  // Note for partial books (e.g., "Genesis 1–11" for Origins)
  bookNote?: string;
}

// ---------------------------------------------------------------------------
// Era Content — rich modal content for each era
// ---------------------------------------------------------------------------

/**
 * A place associated with a backbone moment.
 * Precision indicates geographic certainty level.
 */
export interface EraPlace {
  id: string;
  name: string;
  precision?: 'exact' | 'region' | 'traditional' | 'uncertain';
}

/**
 * A place with full description for display in the era Places section.
 */
export interface EraPlaceFull {
  id: string;
  name: string;
  scripture: string;
  description: string;
  precision?: 'exact' | 'region' | 'traditional' | 'uncertain';
}

/**
 * A person reference within a backbone moment.
 * Links to the canonical EraPerson by id.
 */
export interface EraPersonRef {
  id: string;
  name: string;
}

export interface EraMovement {
  number: string;
  title: string;
  scripture: string;
  body: string[];
  keyMovement?: string;
  closingInsight?: string;
  /** People associated with this specific backbone moment */
  people?: EraPersonRef[];
  /** Places where this backbone moment occurs */
  places?: EraPlace[];
}

export interface EraPattern {
  steps: string[];
  examples: string[];
  closing: string;
}

export interface EraReadingLens {
  title: string;
  body: string[];
}

export interface EraTransition {
  question: string;
  scripture?: string;
  scriptureText?: string;
  explanation: string[];
  visualProgression?: string[];
  closing: string;
}

/**
 * A person or group who carries a portion of an era's story.
 * Used for the "People" orientation layer in era modals.
 */
export interface EraPerson {
  id: string;
  name: string;
  scripture: string;
  /** Which backbone moments this person is associated with (lowercase titles) */
  backbone: string[];
  description: string;
  /** For genealogical display: 'root' | 'child' | 'generation-gap' | 'branch' */
  relation?: 'root' | 'child' | 'generation-gap' | 'branch';
  /** For branching (e.g., Noah's three sons) */
  branches?: string[];
}

export interface EraContent {
  id: EraId;
  tagline: string;
  introduction: string[];
  questions?: string[];
  movements: EraMovement[];
  people?: EraPerson[];
  places?: EraPlaceFull[];
  pattern?: EraPattern;
  readingLenses?: EraReadingLens[];
  transition?: EraTransition;
  nextEra?: {
    id: EraId;
    name: string;
    bookNote: string;
  };
}

export const ORIGINS_CONTENT: EraContent = {
  id: 'origins',
  tagline: 'The world as God intended it—and how it became the world we know.',
  introduction: [],
  movements: [
    {
      number: '01',
      title: 'Creation',
      scripture: 'Genesis 1–2',
      people: [
        { id: 'adam-eve', name: 'Adam · Eve' },
      ],
      places: [
        { id: 'eden', name: 'Eden', precision: 'traditional' },
      ],
      body: [
        'God brings order from chaos and creates a world He calls good.',
        'Human beings are made in the image of God and given responsibility within creation.',
      ],
      closingInsight: 'The Bible begins not with humanity escaping the world, but with God dwelling with humanity in a good world.',
    },
    {
      number: '02',
      title: 'The Fall',
      scripture: 'Genesis 3',
      people: [
        { id: 'adam-eve', name: 'Adam · Eve' },
        { id: 'serpent', name: 'Serpent' },
      ],
      places: [
        { id: 'eden', name: 'Eden', precision: 'traditional' },
      ],
      body: [
        'Humanity distrusts God\'s wisdom and reaches for the right to determine good and evil for itself.',
        'Shame enters. Blame enters. Relationships fracture. Humanity is driven from Eden.',
      ],
      closingInsight: 'Human beings stop trusting God to define what is good.',
    },
    {
      number: '03',
      title: 'The Spread',
      scripture: 'Genesis 4–5',
      people: [
        { id: 'cain-abel', name: 'Cain · Abel' },
      ],
      places: [
        { id: 'east-of-eden', name: 'East of Eden', precision: 'traditional' },
        { id: 'land-of-nod', name: 'Land of Nod', precision: 'traditional' },
      ],
      body: [
        'Sin does not remain contained within Adam and Eve.',
        'Cain kills Abel. Violence grows. Human relationships deteriorate.',
      ],
      closingInsight: 'The fracture introduced in Genesis 3 begins spreading outward.',
    },
    {
      number: '04',
      title: 'The Flood',
      scripture: 'Genesis 6–9',
      people: [
        { id: 'noah', name: 'Noah' },
        { id: 'noahs-sons', name: 'Shem · Ham · Japheth' },
      ],
      places: [
        { id: 'ararat-region', name: 'Ararat Region', precision: 'region' },
      ],
      body: [
        'Human violence and corruption become pervasive.',
        'The Flood functions almost like an undoing of creation—the ordered world returns to waters.',
        'Noah and his family are preserved, and God establishes His covenant with Noah and creation.',
      ],
      closingInsight: 'A new environment does not create a new human heart.',
    },
    {
      number: '05',
      title: 'Babel',
      scripture: 'Genesis 10–11',
      people: [
        { id: 'noahs-sons', name: 'Shem · Ham · Japheth' },
        { id: 'nations', name: 'The Nations' },
      ],
      places: [
        { id: 'shinar', name: 'Shinar', precision: 'region' },
        { id: 'babel', name: 'Babel', precision: 'traditional' },
      ],
      body: [
        'Humanity gathers and builds a city, a tower, and a name for themselves.',
        'Humanity seeks security and greatness on its own terms.',
        'God scatters the nations and confuses their language.',
      ],
      closingInsight: 'Humanity is alive—but divided. Multiplying—but scattered. Capable—but estranged from God.',
    },
  ],
  people: [
    {
      id: 'adam-eve',
      name: 'Adam · Eve',
      scripture: 'Genesis 1–4',
      backbone: ['creation', 'the fall'],
      description: 'The first humans, made in the image of God and placed in Eden. Their distrust and disobedience lead to exile from the garden and introduce the fracture that shapes the human story.',
      relation: 'root',
    },
    {
      id: 'serpent',
      name: 'Serpent',
      scripture: 'Genesis 3',
      backbone: ['the fall'],
      description: 'The deceiver who tempts Eve to doubt God\'s word and reach for the knowledge of good and evil. More cunning than any beast of the field.',
      relation: 'child',
    },
    {
      id: 'cain-abel',
      name: 'Cain · Abel',
      scripture: 'Genesis 4',
      backbone: ['the spread'],
      description: 'The first brothers. Cain\'s murder of Abel shows that the fracture introduced in Eden has already entered the human family.',
      relation: 'child',
    },
    {
      id: 'noah',
      name: 'Noah',
      scripture: 'Genesis 5–9',
      backbone: ['the flood'],
      description: 'Preserved with his family through the Flood. Afterward, God establishes His covenant with Noah and with creation.',
      relation: 'generation-gap',
    },
    {
      id: 'noahs-sons',
      name: 'Shem · Ham · Japheth',
      scripture: 'Genesis 9–11',
      backbone: ['the flood', 'babel'],
      description: 'Noah\'s sons. Genesis traces the nations of the post-Flood world through their families before humanity gathers at Babel.',
      relation: 'branch',
    },
    {
      id: 'nations',
      name: 'The Nations',
      scripture: 'Genesis 10–11',
      backbone: ['babel'],
      description: 'The seventy nations descended from Noah\'s sons. United in language and ambition at Babel, they are scattered by God across the face of the earth.',
      relation: 'branch',
    },
  ],
  places: [
    {
      id: 'eden',
      name: 'Eden',
      scripture: 'Genesis 2–3',
      description: 'The garden where God placed Adam and Eve. A place of abundance, presence, and order. Humanity\'s exile from Eden marks the beginning of the long journey back.',
      precision: 'traditional',
    },
    {
      id: 'nod',
      name: 'Land of Nod',
      scripture: 'Genesis 4:16',
      description: 'East of Eden, where Cain went after his exile. The name means "wandering." The direction away from Eden becomes the direction of human dispersion.',
      precision: 'uncertain',
    },
    {
      id: 'ararat',
      name: 'Ararat',
      scripture: 'Genesis 8:4',
      description: 'The mountains where the ark came to rest after the Flood. A high point where renewal begins, as Noah\'s family steps out to replenish the earth.',
      precision: 'region',
    },
    {
      id: 'shinar',
      name: 'Shinar',
      scripture: 'Genesis 10–11',
      description: 'The plain where humanity gathers after the Flood. Here they build the city and tower of Babel, seeking to make a name for themselves and avoid being scattered.',
      precision: 'region',
    },
    {
      id: 'babel',
      name: 'Babel',
      scripture: 'Genesis 11:1–9',
      description: 'The city and tower built by humanity in defiance. God confuses their language here, scattering the nations. The name echoes "confusion."',
      precision: 'traditional',
    },
  ],
  transition: {
    question: 'How will God restore what humanity has fractured?',
    scripture: 'Genesis 12',
    scriptureText: '"The LORD had said to Abram..."',
    explanation: [],
    closing: '',
  },
  nextEra: {
    id: 'patriarchs',
    name: 'Patriarchs',
    bookNote: 'Genesis 12–50',
  },
};

export const PATRIARCHS_CONTENT: EraContent = {
  id: 'patriarchs',
  tagline: "God's answer to a scattered world begins with one family.",
  introduction: [],
  movements: [
    {
      number: '01',
      title: 'The Call',
      scripture: 'Genesis 12–14',
      people: [
        { id: 'abraham', name: 'Abraham' },
        { id: 'sarah', name: 'Sarah' },
        { id: 'lot', name: 'Lot' },
      ],
      places: [
        { id: 'haran', name: 'Haran', precision: 'region' },
        { id: 'canaan', name: 'Canaan', precision: 'region' },
      ],
      body: [
        "God calls Abram to leave his country for a land He will show him, promising to make him a great nation and bring blessing to all peoples.",
      ],
      closingInsight: "God's response to the nations begins with one family.",
    },
    {
      number: '02',
      title: 'The Promise',
      scripture: 'Genesis 15–24',
      people: [
        { id: 'abraham', name: 'Abraham' },
        { id: 'sarah', name: 'Sarah' },
        { id: 'hagar', name: 'Hagar' },
        { id: 'ishmael', name: 'Ishmael' },
        { id: 'isaac', name: 'Isaac' },
      ],
      places: [
        { id: 'canaan', name: 'Canaan', precision: 'region' },
        { id: 'hebron', name: 'Hebron', precision: 'exact' },
        { id: 'moriah', name: 'Moriah', precision: 'traditional' },
      ],
      body: [
        "God formalizes His covenant, promising descendants and land. Isaac is born to Sarah; Abraham is tested; the covenant line continues.",
      ],
      closingInsight: "The promise depends on God's faithfulness, not human ability to manufacture its fulfillment.",
    },
    {
      number: '03',
      title: 'Israel',
      scripture: 'Genesis 25–36',
      people: [
        { id: 'isaac', name: 'Isaac' },
        { id: 'rebekah', name: 'Rebekah' },
        { id: 'jacob', name: 'Jacob' },
        { id: 'esau', name: 'Esau' },
        { id: 'rachel', name: 'Rachel' },
        { id: 'leah', name: 'Leah' },
      ],
      places: [
        { id: 'beersheba', name: 'Beersheba', precision: 'exact' },
        { id: 'bethel', name: 'Bethel', precision: 'exact' },
        { id: 'haran', name: 'Haran', precision: 'region' },
        { id: 'peniel', name: 'Peniel', precision: 'traditional' },
      ],
      body: [
        "Jacob takes Esau's birthright, flees to Haran, and returns to wrestle with God. He receives a new name: Israel. His twelve sons become the twelve tribes.",
      ],
      closingInsight: "Israel was a person before Israel became a people.",
    },
    {
      number: '04',
      title: 'Joseph',
      scripture: 'Genesis 37–47',
      people: [
        { id: 'joseph', name: 'Joseph' },
        { id: 'jacob', name: 'Jacob' },
        { id: 'judah', name: 'Judah' },
        { id: 'josephs-brothers', name: "Joseph's Brothers" },
        { id: 'pharaoh-genesis', name: 'Pharaoh' },
      ],
      places: [
        { id: 'canaan', name: 'Canaan', precision: 'region' },
        { id: 'egypt', name: 'Egypt', precision: 'region' },
      ],
      body: [
        "Joseph is sold by his brothers into Egypt, where he rises from slave to ruler. When famine strikes, his suffering becomes the means of his family's preservation.",
      ],
      closingInsight: "What appears to threaten the promise becomes part of how the family is preserved.",
    },
    {
      number: '05',
      title: 'Egypt',
      scripture: 'Genesis 48–50',
      people: [
        { id: 'jacob', name: 'Jacob' },
        { id: 'joseph', name: 'Joseph' },
        { id: 'judah', name: 'Judah' },
        { id: 'ephraim', name: 'Ephraim' },
        { id: 'manasseh', name: 'Manasseh' },
      ],
      places: [
        { id: 'egypt', name: 'Egypt', precision: 'region' },
        { id: 'canaan', name: 'Canaan', precision: 'region' },
      ],
      body: [
        "Jacob blesses his sons before his death. Judah receives a royal promise; Ephraim and Manasseh are adopted into the tribes.",
        "Genesis ends with the family greatly enlarged but living outside the promised land.",
      ],
      closingInsight: "The family has become a people, but the promise is still unfinished.",
    },
  ],
  people: [
    {
      id: 'abraham',
      name: 'Abraham',
      scripture: 'Genesis 12–25',
      backbone: ['the call', 'the promise'],
      description: "Called by God to leave his homeland and become the father of a great nation. God's covenant with Abraham establishes the promise of land, descendants, and blessing to all nations.",
      relation: 'root',
    },
    {
      id: 'sarah',
      name: 'Sarah',
      scripture: 'Genesis 12–23',
      backbone: ['the call', 'the promise'],
      description: "Abraham's wife, through whom the covenant promise continues. Despite years of barrenness, she bears Isaac in her old age.",
      relation: 'root',
    },
    {
      id: 'lot',
      name: 'Lot',
      scripture: 'Genesis 12–19',
      backbone: ['the call'],
      description: "Abraham's nephew who travels with him to Canaan. Lot chooses the well-watered plain near Sodom, separating his path from Abraham's.",
      relation: 'branch',
    },
    {
      id: 'hagar',
      name: 'Hagar',
      scripture: 'Genesis 16, 21',
      backbone: ['the promise'],
      description: "Sarah's Egyptian servant, given to Abraham as a wife. She bears Ishmael, but the covenant line continues through Isaac.",
      relation: 'branch',
    },
    {
      id: 'ishmael',
      name: 'Ishmael',
      scripture: 'Genesis 16–25',
      backbone: ['the promise'],
      description: "Abraham's firstborn son through Hagar. Though not the child of promise, God blesses him and he becomes the father of twelve princes.",
      relation: 'branch',
    },
    {
      id: 'isaac',
      name: 'Isaac',
      scripture: 'Genesis 21–35',
      backbone: ['the promise', 'israel'],
      description: "The son of promise, born to Abraham and Sarah in their old age. Through Isaac the covenant continues to the next generation.",
      relation: 'child',
    },
    {
      id: 'rebekah',
      name: 'Rebekah',
      scripture: 'Genesis 24–27',
      backbone: ['israel'],
      description: "Isaac's wife, brought from Abraham's relatives in Haran. Mother of Esau and Jacob, she favors Jacob and helps secure his blessing.",
      relation: 'child',
    },
    {
      id: 'jacob',
      name: 'Jacob',
      scripture: 'Genesis 25–50',
      backbone: ['israel', 'joseph', 'egypt'],
      description: "Renamed Israel after wrestling with God. Father of twelve sons who become the twelve tribes of Israel. His family's journey to Egypt sets the stage for Exodus.",
      relation: 'child',
    },
    {
      id: 'esau',
      name: 'Esau',
      scripture: 'Genesis 25–36',
      backbone: ['israel'],
      description: "Jacob's twin brother, firstborn but sells his birthright. Father of the Edomites, his line diverges from the covenant family.",
      relation: 'branch',
    },
    {
      id: 'rachel',
      name: 'Rachel',
      scripture: 'Genesis 29–35',
      backbone: ['israel'],
      description: "Jacob's beloved wife, mother of Joseph and Benjamin. Her death in childbirth marks a turning point in the family's story.",
      relation: 'child',
    },
    {
      id: 'leah',
      name: 'Leah',
      scripture: 'Genesis 29–35',
      backbone: ['israel'],
      description: "Jacob's first wife, mother of six sons including Judah and Levi. Though less loved, her line carries the royal and priestly promises.",
      relation: 'child',
    },
    {
      id: 'joseph',
      name: 'Joseph',
      scripture: 'Genesis 37–50',
      backbone: ['joseph', 'egypt'],
      description: "Jacob's favored son, sold into slavery by his brothers. His rise to power in Egypt becomes the means of preserving the family through famine.",
      relation: 'child',
    },
    {
      id: 'judah',
      name: 'Judah',
      scripture: 'Genesis 38, 43–49',
      backbone: ['joseph', 'egypt'],
      description: "Fourth son of Jacob and Leah. Genesis 49 speaks of the scepter not departing from Judah—a royal trajectory that leads to David and ultimately to the Messiah.",
      relation: 'child',
    },
    {
      id: 'josephs-brothers',
      name: "The Twelve Brothers",
      scripture: 'Genesis 37–50',
      backbone: ['joseph'],
      description: "The sons of Jacob who sell Joseph into slavery and later journey to Egypt for grain. Their reconciliation with Joseph restores the family.",
      relation: 'child',
    },
    {
      id: 'ephraim',
      name: 'Ephraim',
      scripture: 'Genesis 48',
      backbone: ['egypt'],
      description: "Joseph's younger son, blessed by Jacob with the greater blessing. His tribe will become prominent in the northern kingdom.",
      relation: 'child',
    },
    {
      id: 'manasseh',
      name: 'Manasseh',
      scripture: 'Genesis 48',
      backbone: ['egypt'],
      description: "Joseph's firstborn son, blessed by Jacob but given second place to Ephraim. His tribe receives territory on both sides of the Jordan.",
      relation: 'child',
    },
  ],
  places: [
    {
      id: 'haran',
      name: 'Haran',
      scripture: 'Genesis 12, 27–31',
      description: "The city where Abraham's family settled after leaving Ur. Abraham departs from here at God's call; later, Jacob flees here and builds his family.",
      precision: 'region',
    },
    {
      id: 'canaan',
      name: 'Canaan',
      scripture: 'Genesis 12–50',
      description: "The land God promises to Abraham and his descendants. Throughout Genesis, the patriarchs live as sojourners in this land they do not yet possess.",
      precision: 'region',
    },
    {
      id: 'hebron',
      name: 'Hebron',
      scripture: 'Genesis 13, 23, 35',
      description: "Where Abraham settles and purchases the cave of Machpelah as a burial site. Sarah, Abraham, Isaac, Rebekah, Leah, and Jacob are all buried here.",
      precision: 'exact',
    },
    {
      id: 'moriah',
      name: 'Moriah',
      scripture: 'Genesis 22',
      description: "The mountain where Abraham is tested with Isaac. Later tradition identifies this with the site of Solomon's temple in Jerusalem.",
      precision: 'traditional',
    },
    {
      id: 'beersheba',
      name: 'Beersheba',
      scripture: 'Genesis 21–28',
      description: "A well and settlement in the southern part of Canaan. Abraham and Isaac both make covenants here; Jacob departs from here for Haran.",
      precision: 'exact',
    },
    {
      id: 'bethel',
      name: 'Bethel',
      scripture: 'Genesis 12, 28, 35',
      description: "Where Jacob dreams of the ladder to heaven and vows to serve God. The name means 'house of God.' Jacob returns here after wrestling with God.",
      precision: 'exact',
    },
    {
      id: 'peniel',
      name: 'Peniel',
      scripture: 'Genesis 32',
      description: "Where Jacob wrestles with God and receives the name Israel. The name means 'face of God'—for Jacob says, 'I have seen God face to face.'",
      precision: 'traditional',
    },
    {
      id: 'egypt',
      name: 'Egypt',
      scripture: 'Genesis 12, 37–50',
      description: "Abraham visits during famine; Joseph is sold here as a slave. The family eventually settles in Egypt, setting the stage for the Exodus narrative.",
      precision: 'region',
    },
  ],
  transition: {
    question: 'How does a family in Egypt become a nation?',
    scripture: 'Exodus 1',
    scriptureText: '"A new king, to whom Joseph meant nothing, came to power in Egypt."',
    explanation: [],
    closing: '',
  },
  nextEra: {
    id: 'exodus',
    name: 'Exodus',
    bookNote: 'Exodus–Deuteronomy',
  },
};

export const EXODUS_CONTENT: EraContent = {
  id: 'exodus',
  tagline: "A family becomes a nation through deliverance and covenant.",
  introduction: [],
  movements: [
    {
      number: '01',
      title: 'Oppression',
      scripture: 'Exodus 1–6',
      people: [
        { id: 'moses', name: 'Moses' },
        { id: 'aaron', name: 'Aaron' },
        { id: 'pharaoh-exodus', name: 'Pharaoh' },
      ],
      places: [
        { id: 'egypt', name: 'Egypt', precision: 'region' },
        { id: 'midian', name: 'Midian', precision: 'region' },
      ],
      body: [
        "A new king arises who did not know Joseph. Israel multiplies but is enslaved.",
        "Moses is born, preserved, and eventually called by God at the burning bush to deliver His people.",
      ],
      closingInsight: "God hears the groaning of His people and remembers His covenant.",
    },
    {
      number: '02',
      title: 'Deliverance',
      scripture: 'Exodus 7–15',
      people: [
        { id: 'moses', name: 'Moses' },
        { id: 'aaron', name: 'Aaron' },
        { id: 'pharaoh-exodus', name: 'Pharaoh' },
      ],
      places: [
        { id: 'egypt', name: 'Egypt', precision: 'region' },
        { id: 'red-sea', name: 'Red Sea', precision: 'traditional' },
      ],
      body: [
        "Ten plagues expose Egypt's gods as powerless. The final plague brings death to every firstborn, but Israel is passed over.",
        "Pharaoh relents, then pursues. God parts the sea, and Israel walks through on dry ground.",
      ],
      closingInsight: "The Lord fights for His people; they need only be still.",
    },
    {
      number: '03',
      title: 'Sinai',
      scripture: 'Exodus 16–40',
      people: [
        { id: 'moses', name: 'Moses' },
        { id: 'aaron', name: 'Aaron' },
      ],
      places: [
        { id: 'sinai', name: 'Sinai', precision: 'traditional' },
      ],
      body: [
        "At Sinai, God gives the Law and establishes Israel as a covenant people. The tabernacle provides a way for God to dwell among them.",
        "Yet even here, Israel fashions a golden calf. The pattern of rebellion begins.",
      ],
      closingInsight: "God gives not just freedom from slavery but a way to live as His people.",
    },
    {
      number: '04',
      title: 'Wilderness',
      scripture: 'Leviticus–Numbers',
      people: [
        { id: 'moses', name: 'Moses' },
        { id: 'aaron', name: 'Aaron' },
        { id: 'miriam', name: 'Miriam' },
        { id: 'joshua', name: 'Joshua' },
        { id: 'caleb', name: 'Caleb' },
      ],
      places: [
        { id: 'wilderness', name: 'Wilderness', precision: 'region' },
        { id: 'kadesh', name: 'Kadesh', precision: 'traditional' },
      ],
      body: [
        "Leviticus establishes holiness: how a sinful people can approach a holy God. Numbers records the journey and the repeated failures.",
        "At Kadesh, Israel refuses to enter the land. An entire generation will die in the wilderness.",
      ],
      closingInsight: "The journey that should take weeks stretches to forty years.",
    },
    {
      number: '05',
      title: 'The Edge',
      scripture: 'Deuteronomy',
      people: [
        { id: 'moses', name: 'Moses' },
        { id: 'joshua', name: 'Joshua' },
      ],
      places: [
        { id: 'moab', name: 'Moab', precision: 'region' },
      ],
      body: [
        "On the plains of Moab, Moses delivers his final sermons. He rehearses the Law, calls Israel to choose life, and warns of the consequences of disobedience.",
        "Moses sees the land from afar but does not enter. Joshua will lead the next generation.",
      ],
      closingInsight: "The old generation passes; the promise remains.",
    },
  ],
  people: [
    {
      id: 'moses',
      name: 'Moses',
      scripture: 'Exodus–Deuteronomy',
      backbone: ['oppression', 'deliverance', 'sinai', 'wilderness', 'the edge'],
      description: "Called by God to lead Israel out of Egypt. Mediator of the covenant at Sinai and the greatest prophet until Christ.",
      relation: 'root',
    },
    {
      id: 'aaron',
      name: 'Aaron',
      scripture: 'Exodus–Numbers',
      backbone: ['oppression', 'deliverance', 'sinai', 'wilderness'],
      description: "Moses' brother and the first high priest of Israel. Spokesman before Pharaoh, but also the maker of the golden calf.",
      relation: 'child',
    },
    {
      id: 'miriam',
      name: 'Miriam',
      scripture: 'Exodus 2, 15; Numbers 12, 20',
      backbone: ['wilderness'],
      description: "Sister of Moses and Aaron. Led Israel in worship after the Red Sea crossing. Died before entering the land.",
      relation: 'child',
    },
    {
      id: 'pharaoh-exodus',
      name: 'Pharaoh',
      scripture: 'Exodus 1–14',
      backbone: ['oppression', 'deliverance'],
      description: "The king who enslaved Israel and whose hardened heart brought judgment on Egypt through the ten plagues.",
      relation: 'branch',
    },
    {
      id: 'joshua',
      name: 'Joshua',
      scripture: 'Exodus 17; Numbers 13–14; Deuteronomy 31',
      backbone: ['wilderness', 'the edge'],
      description: "Moses' assistant and one of two faithful spies. Chosen to lead Israel into the promised land after Moses' death.",
      relation: 'child',
    },
    {
      id: 'caleb',
      name: 'Caleb',
      scripture: 'Numbers 13–14',
      backbone: ['wilderness'],
      description: "One of the twelve spies, he and Joshua alone trusted God's promise. He will receive his inheritance in the land.",
      relation: 'child',
    },
  ],
  places: [
    {
      id: 'midian',
      name: 'Midian',
      scripture: 'Exodus 2–4',
      description: "Where Moses fled after killing the Egyptian. He encountered God at the burning bush and received his call.",
      precision: 'region',
    },
    {
      id: 'red-sea',
      name: 'Red Sea',
      scripture: 'Exodus 14–15',
      description: "The sea God parted so Israel could escape Egypt. Pharaoh's army was destroyed when the waters returned.",
      precision: 'traditional',
    },
    {
      id: 'sinai',
      name: 'Sinai',
      scripture: 'Exodus 19–40',
      description: "The mountain where God gave the Law and established His covenant with Israel. Here the tabernacle was constructed.",
      precision: 'traditional',
    },
    {
      id: 'wilderness',
      name: 'Wilderness',
      scripture: 'Numbers',
      description: "The desert region where Israel wandered for forty years due to unbelief. A place of testing, failure, and provision.",
      precision: 'region',
    },
    {
      id: 'kadesh',
      name: 'Kadesh',
      scripture: 'Numbers 13–14, 20',
      description: "Where the spies returned with their report. Israel's refusal to enter the land here condemned a generation to the wilderness.",
      precision: 'traditional',
    },
    {
      id: 'moab',
      name: 'Moab',
      scripture: 'Numbers 22–36; Deuteronomy',
      description: "The plains east of the Jordan where Israel camped before entering the land. Moses delivered his final addresses here.",
      precision: 'region',
    },
  ],
  transition: {
    question: 'How does a delivered nation take possession of the land?',
    scripture: 'Joshua 1',
    scriptureText: '"Moses my servant is dead. Now then, you and all these people, get ready to cross the Jordan..."',
    explanation: [],
    closing: '',
  },
  nextEra: {
    id: 'tribes',
    name: 'Tribes',
    bookNote: 'Joshua–Ruth',
  },
};

export const TRIBES_CONTENT: EraContent = {
  id: 'tribes',
  tagline: "The land is given, but must be possessed and held.",
  introduction: [],
  movements: [
    {
      number: '01',
      title: 'Conquest',
      scripture: 'Joshua 1–12',
      people: [
        { id: 'joshua', name: 'Joshua' },
        { id: 'rahab', name: 'Rahab' },
      ],
      places: [
        { id: 'jordan-river', name: 'Jordan', precision: 'exact' },
        { id: 'jericho', name: 'Jericho', precision: 'exact' },
      ],
      body: [
        "Israel crosses the Jordan and enters the promised land. Jericho falls, Ai is taken, and the major campaigns secure the land.",
        "God fights for Israel, but Achan's sin shows that covenant faithfulness matters.",
      ],
      closingInsight: "The land is gift, but obedience determines whether Israel will keep it.",
    },
    {
      number: '02',
      title: 'Inheritance',
      scripture: 'Joshua 13–24',
      people: [
        { id: 'joshua', name: 'Joshua' },
        { id: 'caleb', name: 'Caleb' },
      ],
      places: [
        { id: 'shiloh', name: 'Shiloh', precision: 'exact' },
        { id: 'shechem', name: 'Shechem', precision: 'exact' },
      ],
      body: [
        "The land is divided among the tribes. Caleb claims his mountain. Cities of refuge are established.",
        "At Shechem, Joshua challenges Israel: choose this day whom you will serve.",
      ],
      closingInsight: "Each tribe receives its portion; now faithfulness will determine their future.",
    },
    {
      number: '03',
      title: 'Cycles',
      scripture: 'Judges 1–16',
      people: [
        { id: 'deborah', name: 'Deborah' },
        { id: 'gideon', name: 'Gideon' },
        { id: 'samson', name: 'Samson' },
      ],
      places: [
        { id: 'canaan', name: 'Canaan', precision: 'region' },
      ],
      body: [
        "Israel falls into a repeated pattern: sin, oppression, crying out, deliverance, rest, then sin again.",
        "Judges rise to deliver Israel, but each cycle seems to spiral deeper into unfaithfulness.",
      ],
      closingInsight: "Deliverance without transformation leads only to the next failure.",
    },
    {
      number: '04',
      title: 'Chaos',
      scripture: 'Judges 17–21',
      people: [
        { id: 'levite', name: 'The Levite' },
      ],
      places: [
        { id: 'gibeah', name: 'Gibeah', precision: 'exact' },
      ],
      body: [
        "The final chapters show Israel in moral freefall. Idolatry, sexual violence, and civil war reveal a people without direction.",
        "The refrain repeats: In those days Israel had no king; everyone did as they saw fit.",
      ],
      closingInsight: "Without leadership, the people of God become indistinguishable from the nations.",
    },
    {
      number: '05',
      title: 'Faithfulness',
      scripture: 'Ruth',
      people: [
        { id: 'ruth', name: 'Ruth' },
        { id: 'boaz', name: 'Boaz' },
        { id: 'naomi', name: 'Naomi' },
      ],
      places: [
        { id: 'bethlehem', name: 'Bethlehem', precision: 'exact' },
        { id: 'moab', name: 'Moab', precision: 'region' },
      ],
      body: [
        "In the midst of the judges, a quiet story of loyal love. Ruth, a Moabite, clings to Naomi and finds redemption through Boaz.",
        "Their son Obed becomes the grandfather of David. Even in dark times, God preserves the line.",
      ],
      closingInsight: "Faithful love endures when institutions fail.",
    },
  ],
  people: [
    {
      id: 'rahab',
      name: 'Rahab',
      scripture: 'Joshua 2, 6',
      backbone: ['conquest'],
      description: "A Canaanite woman who hid the Israelite spies. She and her family were spared, and she appears in the genealogy of Christ.",
      relation: 'branch',
    },
    {
      id: 'deborah',
      name: 'Deborah',
      scripture: 'Judges 4–5',
      backbone: ['cycles'],
      description: "Prophetess and judge who led Israel to victory over Sisera. The only female judge recorded.",
      relation: 'child',
    },
    {
      id: 'gideon',
      name: 'Gideon',
      scripture: 'Judges 6–8',
      backbone: ['cycles'],
      description: "Called while hiding from Midianites. With 300 men, God gave him victory, but his later years brought compromise.",
      relation: 'child',
    },
    {
      id: 'samson',
      name: 'Samson',
      scripture: 'Judges 13–16',
      backbone: ['cycles'],
      description: "Nazirite with supernatural strength. His life of compromise ended in captivity, but his death defeated the Philistines.",
      relation: 'child',
    },
    {
      id: 'levite',
      name: 'The Levite',
      scripture: 'Judges 19–21',
      backbone: ['chaos'],
      description: "An unnamed Levite whose actions trigger civil war. His story shows how far Israel has fallen.",
      relation: 'branch',
    },
    {
      id: 'ruth',
      name: 'Ruth',
      scripture: 'Ruth 1–4',
      backbone: ['faithfulness'],
      description: "A Moabite widow who chose Israel's God and people. Her faithful love led her to Boaz and into the line of David.",
      relation: 'root',
    },
    {
      id: 'boaz',
      name: 'Boaz',
      scripture: 'Ruth 2–4',
      backbone: ['faithfulness'],
      description: "A man of Bethlehem who acted as kinsman-redeemer for Ruth. Ancestor of David and of Christ.",
      relation: 'child',
    },
    {
      id: 'naomi',
      name: 'Naomi',
      scripture: 'Ruth 1–4',
      backbone: ['faithfulness'],
      description: "Ruth's mother-in-law who lost everything in Moab but found restoration through Ruth's faithfulness.",
      relation: 'root',
    },
  ],
  places: [
    {
      id: 'jordan-river',
      name: 'Jordan River',
      scripture: 'Joshua 3–4',
      description: "The river Israel crossed to enter the promised land. God stopped its waters as He had the Red Sea.",
      precision: 'exact',
    },
    {
      id: 'jericho',
      name: 'Jericho',
      scripture: 'Joshua 6',
      description: "The first city conquered in Canaan. Its walls fell after Israel marched around it for seven days.",
      precision: 'exact',
    },
    {
      id: 'shiloh',
      name: 'Shiloh',
      scripture: 'Joshua 18; Judges 21; 1 Samuel 1–4',
      description: "Where the tabernacle was set up after the conquest. The central sanctuary until the ark was captured.",
      precision: 'exact',
    },
    {
      id: 'shechem',
      name: 'Shechem',
      scripture: 'Joshua 24',
      description: "Where Joshua renewed the covenant. Abraham had built an altar here; Jacob had buried foreign gods here.",
      precision: 'exact',
    },
    {
      id: 'gibeah',
      name: 'Gibeah',
      scripture: 'Judges 19–20',
      description: "The Benjamite city where the Levite's concubine was violated, triggering civil war. Later, Saul's hometown.",
      precision: 'exact',
    },
    {
      id: 'bethlehem',
      name: 'Bethlehem',
      scripture: 'Ruth; 1 Samuel 16',
      description: "Town in Judah where Ruth settled with Boaz. Birthplace of David and, centuries later, of Christ.",
      precision: 'exact',
    },
  ],
  transition: {
    question: 'Can a king unite what the judges could not?',
    scripture: '1 Samuel 8',
    scriptureText: '"Give us a king to judge us like all the nations."',
    explanation: [],
    closing: '',
  },
  nextEra: {
    id: 'kingdom',
    name: 'Kingdom',
    bookNote: '1 Samuel–2 Kings',
  },
};

export const KINGDOM_CONTENT: EraContent = {
  id: 'kingdom',
  tagline: "Israel rises to glory, then tears itself apart.",
  introduction: [],
  movements: [
    {
      number: '01',
      title: 'Transition',
      scripture: '1 Samuel',
      people: [
        { id: 'samuel', name: 'Samuel' },
        { id: 'saul', name: 'Saul' },
        { id: 'david', name: 'David' },
      ],
      places: [
        { id: 'shiloh', name: 'Shiloh', precision: 'exact' },
        { id: 'gibeah', name: 'Gibeah', precision: 'exact' },
      ],
      body: [
        "Samuel, the last judge, anoints Saul as Israel's first king. But Saul's disobedience leads to his rejection.",
        "God chooses David, a shepherd boy, to replace him. The kingdom is in transition.",
      ],
      closingInsight: "God looks at the heart, not the outward appearance.",
    },
    {
      number: '02',
      title: 'David',
      scripture: '2 Samuel',
      people: [
        { id: 'david', name: 'David' },
        { id: 'nathan', name: 'Nathan' },
        { id: 'absalom', name: 'Absalom' },
      ],
      places: [
        { id: 'jerusalem', name: 'Jerusalem', precision: 'exact' },
        { id: 'hebron', name: 'Hebron', precision: 'exact' },
      ],
      body: [
        "David unites the tribes, captures Jerusalem, and brings the ark to the city. God promises that David's house will endure forever.",
        "Yet David's sin with Bathsheba brings consequences that haunt his family. His reign ends in turmoil.",
      ],
      closingInsight: "The man after God's own heart is still a man who needs grace.",
    },
    {
      number: '03',
      title: 'Solomon',
      scripture: '1 Kings 1–11',
      people: [
        { id: 'solomon', name: 'Solomon' },
      ],
      places: [
        { id: 'jerusalem', name: 'Jerusalem', precision: 'exact' },
      ],
      body: [
        "Solomon builds the temple and brings Israel to the height of its power and wisdom. Kings come to hear him; wealth flows in.",
        "But Solomon's foreign wives turn his heart. The seeds of division are sown.",
      ],
      closingInsight: "Wisdom without faithfulness leads to ruin.",
    },
    {
      number: '04',
      title: 'Division',
      scripture: '1 Kings 12–2 Kings 17',
      people: [
        { id: 'elijah', name: 'Elijah' },
        { id: 'elisha', name: 'Elisha' },
        { id: 'jeroboam', name: 'Jeroboam' },
      ],
      places: [
        { id: 'jerusalem', name: 'Jerusalem', precision: 'exact' },
        { id: 'samaria', name: 'Samaria', precision: 'exact' },
      ],
      body: [
        "The kingdom splits. The north (Israel) follows Jeroboam into idolatry; the south (Judah) retains David's line but wavers.",
        "Prophets like Elijah and Elisha call the north to repentance. In 722 BC, Assyria destroys Israel.",
      ],
      closingInsight: "A kingdom divided against itself cannot stand.",
    },
    {
      number: '05',
      title: 'Judah Alone',
      scripture: '2 Kings 18–25',
      people: [
        { id: 'hezekiah', name: 'Hezekiah' },
        { id: 'josiah', name: 'Josiah' },
      ],
      places: [
        { id: 'jerusalem', name: 'Jerusalem', precision: 'exact' },
        { id: 'babylon', name: 'Babylon', precision: 'exact' },
      ],
      body: [
        "Judah survives Assyria but descends toward judgment. Brief revivals under Hezekiah and Josiah delay but cannot prevent the end.",
        "In 586 BC, Babylon destroys Jerusalem and the temple. The people are exiled.",
      ],
      closingInsight: "The nation that began with promise ends in ashes and chains.",
    },
  ],
  people: [
    {
      id: 'samuel',
      name: 'Samuel',
      scripture: '1 Samuel 1–25',
      backbone: ['transition'],
      description: "The last judge and first kingmaker. He anointed both Saul and David and spoke God's word to the nation.",
      relation: 'root',
    },
    {
      id: 'saul',
      name: 'Saul',
      scripture: '1 Samuel 9–31',
      backbone: ['transition'],
      description: "Israel's first king, chosen for his appearance. His disobedience and jealousy led to his rejection and tragic end.",
      relation: 'child',
    },
    {
      id: 'david',
      name: 'David',
      scripture: '1 Samuel 16–1 Kings 2',
      backbone: ['transition', 'david'],
      description: "The shepherd king, a man after God's own heart. Established Jerusalem as the capital and received the eternal covenant.",
      relation: 'root',
    },
    {
      id: 'nathan',
      name: 'Nathan',
      scripture: '2 Samuel 7, 12',
      backbone: ['david'],
      description: "The prophet who delivered both God's covenant promise to David and the rebuke after Bathsheba.",
      relation: 'child',
    },
    {
      id: 'absalom',
      name: 'Absalom',
      scripture: '2 Samuel 13–18',
      backbone: ['david'],
      description: "David's son who rebelled and tried to seize the throne. His death broke David's heart.",
      relation: 'child',
    },
    {
      id: 'solomon',
      name: 'Solomon',
      scripture: '1 Kings 1–11',
      backbone: ['solomon'],
      description: "David's son who built the temple and brought Israel to its greatest glory. His compromises divided the kingdom.",
      relation: 'child',
    },
    {
      id: 'jeroboam',
      name: 'Jeroboam',
      scripture: '1 Kings 11–14',
      backbone: ['division'],
      description: "First king of the northern kingdom. Set up golden calves at Dan and Bethel, leading Israel into sin.",
      relation: 'branch',
    },
    {
      id: 'elijah',
      name: 'Elijah',
      scripture: '1 Kings 17–2 Kings 2',
      backbone: ['division'],
      description: "Prophet who confronted Ahab and the prophets of Baal. Taken to heaven in a chariot of fire.",
      relation: 'root',
    },
    {
      id: 'elisha',
      name: 'Elisha',
      scripture: '2 Kings 2–13',
      backbone: ['division'],
      description: "Elijah's successor who received a double portion of his spirit. Known for many miracles throughout Israel.",
      relation: 'child',
    },
    {
      id: 'hezekiah',
      name: 'Hezekiah',
      scripture: '2 Kings 18–20',
      backbone: ['judah alone'],
      description: "Judah's reforming king who trusted God when Assyria threatened. Jerusalem was miraculously spared.",
      relation: 'child',
    },
    {
      id: 'josiah',
      name: 'Josiah',
      scripture: '2 Kings 22–23',
      backbone: ['judah alone'],
      description: "The last good king of Judah. Found the Book of the Law and led the greatest reform. Killed at Megiddo.",
      relation: 'child',
    },
  ],
  places: [
    {
      id: 'jerusalem',
      name: 'Jerusalem',
      scripture: '2 Samuel 5; 1 Kings 6; 2 Kings 25',
      description: "David's city and the site of Solomon's temple. The center of Israel's worship until its destruction in 586 BC.",
      precision: 'exact',
    },
    {
      id: 'samaria',
      name: 'Samaria',
      scripture: '1 Kings 16; 2 Kings 17',
      description: "Capital of the northern kingdom built by Omri. Fell to Assyria in 722 BC, ending the kingdom of Israel.",
      precision: 'exact',
    },
    {
      id: 'babylon',
      name: 'Babylon',
      scripture: '2 Kings 24–25',
      description: "The empire that conquered Judah and destroyed Jerusalem. The place of exile for God's people.",
      precision: 'exact',
    },
  ],
  transition: {
    question: 'Is this the end of the promise?',
    scripture: '2 Kings 25',
    scriptureText: '"So Judah went into captivity, away from her land."',
    explanation: [],
    closing: '',
  },
  nextEra: {
    id: 'exile',
    name: 'Exile',
    bookNote: 'Lamentations, Ezekiel, Daniel',
  },
};

export const EXILE_CONTENT: EraContent = {
  id: 'exile',
  tagline: "In the ruins, God's people learn to hope again.",
  introduction: [],
  movements: [
    {
      number: '01',
      title: 'Destruction',
      scripture: 'Lamentations',
      people: [],
      places: [
        { id: 'jerusalem', name: 'Jerusalem', precision: 'exact' },
      ],
      body: [
        "Jerusalem lies in ruins. The temple is destroyed, the walls broken down, the people scattered or slain.",
        "Lamentations voices the raw grief of a people who have lost everything they thought defined them.",
      ],
      closingInsight: "Before hope can be rebuilt, grief must be named.",
    },
    {
      number: '02',
      title: 'Judgment',
      scripture: 'Ezekiel 1–24',
      people: [
        { id: 'ezekiel', name: 'Ezekiel' },
      ],
      places: [
        { id: 'babylon', name: 'Babylon', precision: 'exact' },
        { id: 'chebar', name: 'Chebar', precision: 'traditional' },
      ],
      body: [
        "Ezekiel sees God's glory depart from the temple even before its destruction. The exile is judgment, not accident.",
        "Through dramatic signs and oracles, he makes clear why this has happened: Israel abandoned their God.",
      ],
      closingInsight: "The glory departs because the people departed first.",
    },
    {
      number: '03',
      title: 'Nations',
      scripture: 'Ezekiel 25–32',
      people: [],
      places: [
        { id: 'tyre', name: 'Tyre', precision: 'exact' },
        { id: 'egypt', name: 'Egypt', precision: 'region' },
      ],
      body: [
        "God's judgment extends beyond Israel. The nations that mocked Jerusalem will themselves face reckoning.",
        "Tyre, Egypt, and others receive oracles of doom. God is sovereign over all peoples, not just Israel.",
      ],
      closingInsight: "No nation is beyond judgment; no empire is permanent.",
    },
    {
      number: '04',
      title: 'Restoration',
      scripture: 'Ezekiel 33–48',
      people: [
        { id: 'ezekiel', name: 'Ezekiel' },
      ],
      places: [
        { id: 'jerusalem', name: 'Jerusalem', precision: 'exact' },
      ],
      body: [
        "The valley of dry bones lives again. God promises to gather His people, cleanse them, and give them a new heart.",
        "Ezekiel's final vision shows a new temple with God's glory returning. The story is not over.",
      ],
      closingInsight: "What looks like death is not beyond resurrection.",
    },
    {
      number: '05',
      title: 'Faithfulness',
      scripture: 'Daniel',
      people: [
        { id: 'daniel', name: 'Daniel' },
        { id: 'three-friends', name: 'Shadrach, Meshach, Abednego' },
        { id: 'nebuchadnezzar', name: 'Nebuchadnezzar' },
      ],
      places: [
        { id: 'babylon', name: 'Babylon', precision: 'exact' },
      ],
      body: [
        "Daniel and his friends show that faithful life is possible even in exile. They refuse to compromise and God vindicates them.",
        "Daniel's visions reveal that empires rise and fall, but God's kingdom will endure forever.",
      ],
      closingInsight: "Empires pass; the kingdom of God remains.",
    },
  ],
  people: [
    {
      id: 'ezekiel',
      name: 'Ezekiel',
      scripture: 'Ezekiel',
      backbone: ['judgment', 'restoration'],
      description: "Priest and prophet among the exiles in Babylon. Received spectacular visions and performed dramatic signs.",
      relation: 'root',
    },
    {
      id: 'daniel',
      name: 'Daniel',
      scripture: 'Daniel',
      backbone: ['faithfulness'],
      description: "Taken to Babylon as a youth and rose to serve kings. Faithful through every trial, he received visions of the end.",
      relation: 'root',
    },
    {
      id: 'three-friends',
      name: 'Shadrach, Meshach, Abednego',
      scripture: 'Daniel 1–3',
      backbone: ['faithfulness'],
      description: "Daniel's companions who refused to bow to Nebuchadnezzar's image. God delivered them from the fiery furnace.",
      relation: 'child',
    },
    {
      id: 'nebuchadnezzar',
      name: 'Nebuchadnezzar',
      scripture: 'Daniel 1–4',
      backbone: ['faithfulness'],
      description: "King of Babylon who destroyed Jerusalem. Eventually humbled, he acknowledged that God's kingdom is everlasting.",
      relation: 'branch',
    },
  ],
  places: [
    {
      id: 'chebar',
      name: 'Chebar River',
      scripture: 'Ezekiel 1',
      description: "A canal in Babylon where Ezekiel was among the exiles when he received his first vision of God's glory.",
      precision: 'traditional',
    },
    {
      id: 'tyre',
      name: 'Tyre',
      scripture: 'Ezekiel 26–28',
      description: "A wealthy Phoenician trading city that rejoiced at Jerusalem's fall. Received extensive oracles of judgment.",
      precision: 'exact',
    },
  ],
  transition: {
    question: 'Will God bring His people home?',
    scripture: 'Ezra 1',
    scriptureText: '"The LORD moved the heart of Cyrus king of Persia..."',
    explanation: [],
    closing: '',
  },
  nextEra: {
    id: 'return',
    name: 'Return',
    bookNote: 'Ezra, Nehemiah, Esther',
  },
};

export const RETURN_CONTENT: EraContent = {
  id: 'return',
  tagline: "A remnant returns, but the glory has not.",
  introduction: [],
  movements: [
    {
      number: '01',
      title: 'Return',
      scripture: 'Ezra 1–6',
      people: [
        { id: 'zerubbabel', name: 'Zerubbabel' },
        { id: 'cyrus', name: 'Cyrus' },
      ],
      places: [
        { id: 'jerusalem', name: 'Jerusalem', precision: 'exact' },
        { id: 'persia', name: 'Persia', precision: 'region' },
      ],
      body: [
        "Cyrus of Persia allows the Jews to return. A remnant goes back to Jerusalem under Zerubbabel.",
        "The temple is rebuilt, but those who remember Solomon's temple weep. The glory has not returned.",
      ],
      closingInsight: "The return is real, but incomplete.",
    },
    {
      number: '02',
      title: 'Reform',
      scripture: 'Ezra 7–10',
      people: [
        { id: 'ezra', name: 'Ezra' },
      ],
      places: [
        { id: 'jerusalem', name: 'Jerusalem', precision: 'exact' },
      ],
      body: [
        "Decades later, Ezra the scribe arrives with a second wave. He finds intermarriage threatening the community's identity.",
        "Ezra leads painful reforms to preserve the covenant people. The Law must be followed.",
      ],
      closingInsight: "Returning to the land is not the same as returning to God.",
    },
    {
      number: '03',
      title: 'Walls',
      scripture: 'Nehemiah 1–7',
      people: [
        { id: 'nehemiah', name: 'Nehemiah' },
      ],
      places: [
        { id: 'jerusalem', name: 'Jerusalem', precision: 'exact' },
      ],
      body: [
        "Nehemiah, cupbearer to the Persian king, receives permission to rebuild Jerusalem's walls.",
        "Despite opposition and mockery, the walls rise in fifty-two days. The city has protection again.",
      ],
      closingInsight: "Walls can be rebuilt; the question is what happens inside them.",
    },
    {
      number: '04',
      title: 'Renewal',
      scripture: 'Nehemiah 8–13',
      people: [
        { id: 'nehemiah', name: 'Nehemiah' },
        { id: 'ezra', name: 'Ezra' },
      ],
      places: [
        { id: 'jerusalem', name: 'Jerusalem', precision: 'exact' },
      ],
      body: [
        "Ezra reads the Law; the people weep and then celebrate. A covenant is renewed.",
        "Yet Nehemiah's final chapters show continuing struggles. The people need more than walls and laws.",
      ],
      closingInsight: "Renewal comes, but deeper transformation remains elusive.",
    },
    {
      number: '05',
      title: 'Preservation',
      scripture: 'Esther',
      people: [
        { id: 'esther', name: 'Esther' },
        { id: 'mordecai', name: 'Mordecai' },
        { id: 'haman', name: 'Haman' },
      ],
      places: [
        { id: 'persia', name: 'Persia', precision: 'region' },
        { id: 'susa', name: 'Susa', precision: 'exact' },
      ],
      body: [
        "In Persia, Haman plots genocide against the Jews. Esther risks her life to intervene.",
        "God's name is never mentioned, but His providence is everywhere. The people are preserved.",
      ],
      closingInsight: "Even when God seems silent, He is not absent.",
    },
  ],
  people: [
    {
      id: 'zerubbabel',
      name: 'Zerubbabel',
      scripture: 'Ezra 1–6; Haggai; Zechariah',
      backbone: ['return'],
      description: "Descendant of David who led the first wave of returnees. Oversaw the rebuilding of the temple.",
      relation: 'root',
    },
    {
      id: 'cyrus',
      name: 'Cyrus',
      scripture: 'Ezra 1',
      backbone: ['return'],
      description: "Persian king who conquered Babylon and allowed the Jews to return. Called God's shepherd in Isaiah.",
      relation: 'branch',
    },
    {
      id: 'ezra',
      name: 'Ezra',
      scripture: 'Ezra 7–10; Nehemiah 8',
      backbone: ['reform', 'renewal'],
      description: "Priest and scribe devoted to the Law. Led reforms and read Scripture publicly to the returned exiles.",
      relation: 'root',
    },
    {
      id: 'nehemiah',
      name: 'Nehemiah',
      scripture: 'Nehemiah',
      backbone: ['walls', 'renewal'],
      description: "Persian court official who rebuilt Jerusalem's walls. Governed with prayer, action, and persistence.",
      relation: 'root',
    },
    {
      id: 'esther',
      name: 'Esther',
      scripture: 'Esther',
      backbone: ['preservation'],
      description: "Jewish queen of Persia who risked her life to save her people from Haman's plot.",
      relation: 'root',
    },
    {
      id: 'mordecai',
      name: 'Mordecai',
      scripture: 'Esther',
      backbone: ['preservation'],
      description: "Esther's cousin who raised her and refused to bow to Haman. Discerned that she was called for such a time.",
      relation: 'child',
    },
    {
      id: 'haman',
      name: 'Haman',
      scripture: 'Esther',
      backbone: ['preservation'],
      description: "Persian official who plotted to destroy all Jews. Hanged on the gallows he prepared for Mordecai.",
      relation: 'branch',
    },
  ],
  places: [
    {
      id: 'persia',
      name: 'Persia',
      scripture: 'Ezra; Nehemiah; Esther',
      description: "The empire that conquered Babylon and allowed the Jews to return. Ruled from Susa and Persepolis.",
      precision: 'region',
    },
    {
      id: 'susa',
      name: 'Susa',
      scripture: 'Esther; Nehemiah 1',
      description: "Persian capital where Esther became queen and Nehemiah served as cupbearer.",
      precision: 'exact',
    },
  ],
  transition: {
    question: 'When will the true King come?',
    scripture: 'Malachi 3',
    scriptureText: '"See, I will send my messenger, who will prepare the way before me..."',
    explanation: [],
    closing: '',
  },
  nextEra: undefined, // Return is the last OT era; next is 400 years of silence
};

export function getEraContent(eraId: EraId): EraContent | undefined {
  if (eraId === 'origins') return ORIGINS_CONTENT;
  if (eraId === 'patriarchs') return PATRIARCHS_CONTENT;
  if (eraId === 'exodus') return EXODUS_CONTENT;
  if (eraId === 'tribes') return TRIBES_CONTENT;
  if (eraId === 'kingdom') return KINGDOM_CONTENT;
  if (eraId === 'exile') return EXILE_CONTENT;
  if (eraId === 'return') return RETURN_CONTENT;
  return undefined;
}

/**
 * Get all people across all eras.
 */
export function getAllPeople(): EraPerson[] {
  const allPeople = [
    ...(ORIGINS_CONTENT.people || []),
    ...(PATRIARCHS_CONTENT.people || []),
    ...(EXODUS_CONTENT.people || []),
    ...(TRIBES_CONTENT.people || []),
    ...(KINGDOM_CONTENT.people || []),
    ...(EXILE_CONTENT.people || []),
    ...(RETURN_CONTENT.people || []),
  ];
  // Dedupe by id (in case any people appear in multiple eras)
  const seen = new Set<string>();
  const result: EraPerson[] = [];
  for (const person of allPeople) {
    if (!seen.has(person.id)) {
      seen.add(person.id);
      result.push(person);
    }
  }
  return result;
}

/**
 * Get a person by their id.
 */
export function getPersonById(id: string): EraPerson | undefined {
  return getAllPeople().find(p => p.id === id);
}

/**
 * Get all places across all eras.
 */
export function getAllPlaces(): EraPlaceFull[] {
  const allPlaces = [
    ...(ORIGINS_CONTENT.places || []),
    ...(PATRIARCHS_CONTENT.places || []),
    ...(EXODUS_CONTENT.places || []),
    ...(TRIBES_CONTENT.places || []),
    ...(KINGDOM_CONTENT.places || []),
    ...(EXILE_CONTENT.places || []),
    ...(RETURN_CONTENT.places || []),
  ];
  // Dedupe by id (in case any places appear in multiple eras)
  const seen = new Set<string>();
  const result: EraPlaceFull[] = [];
  for (const place of allPlaces) {
    if (!seen.has(place.id)) {
      seen.add(place.id);
      result.push(place);
    }
  }
  return result;
}

/**
 * Get a place by its id.
 */
export function getPlaceById(id: string): EraPlaceFull | undefined {
  return getAllPlaces().find(p => p.id === id);
}

/**
 * The seven eras of the Old Testament historical spine.
 * These are the primary timeline nodes; prophets, wisdom, and parallel
 * books attach to these eras as secondary layers.
 */
export const OT_ERAS: BiblicalEra[] = [
  {
    id: 'origins',
    name: 'Origins',
    description: 'Creation, fall, flood, and Babel',
    primaryBooks: ['genesis'],
    bookNote: 'Genesis 1–11',
  },
  {
    id: 'patriarchs',
    name: 'Patriarchs',
    description: 'Abraham, Isaac, Jacob, and Joseph',
    primaryBooks: ['genesis'],
    bookNote: 'Genesis 12–50',
  },
  {
    id: 'exodus',
    name: 'Exodus',
    description: 'Deliverance from Egypt and the giving of the Law',
    primaryBooks: ['exodus', 'leviticus', 'numbers', 'deuteronomy'],
  },
  {
    id: 'tribes',
    name: 'Tribes',
    description: 'Conquest, judges, and tribal federation',
    primaryBooks: ['joshua', 'judges', 'ruth'],
  },
  {
    id: 'kingdom',
    name: 'Kingdom',
    description: 'United and divided monarchy',
    primaryBooks: ['1-samuel', '2-samuel', '1-kings', '2-kings'],
  },
  {
    id: 'exile',
    name: 'Exile',
    description: 'Babylonian captivity',
    primaryBooks: ['daniel', 'ezekiel', 'lamentations'],
  },
  {
    id: 'return',
    name: 'Return',
    description: 'Persian period and restoration',
    primaryBooks: ['ezra', 'nehemiah', 'esther'],
  },
];

/**
 * Prophets mapped to their historical eras.
 * Some prophets span multiple eras (Jeremiah: Kingdom → Exile).
 * Context indicates Northern/Southern kingdom or special circumstances.
 */
export const PROPHET_MAPPINGS: ProphetMapping[] = [
  // Kingdom era — Northern Kingdom (Israel)
  { slug: 'jonah', eras: ['kingdom'], context: 'israel' },
  { slug: 'amos', eras: ['kingdom'], context: 'israel' },
  { slug: 'hosea', eras: ['kingdom'], context: 'israel' },
  // Kingdom era — Southern Kingdom (Judah)
  { slug: 'isaiah', eras: ['kingdom'], context: 'judah' },
  { slug: 'micah', eras: ['kingdom'], context: 'judah' },
  { slug: 'nahum', eras: ['kingdom'], context: 'judah' },
  { slug: 'zephaniah', eras: ['kingdom'], context: 'judah' },
  { slug: 'habakkuk', eras: ['kingdom'], context: 'judah' },
  // Jeremiah spans Kingdom → Exile
  { slug: 'jeremiah', eras: ['kingdom', 'exile'], context: 'transition', note: 'Witnessed the fall of Jerusalem' },
  // Exile era — Ezekiel/Daniel already shown as primary books, Obadiah is the additional prophetic voice
  { slug: 'obadiah', eras: ['exile'], context: 'uncertain', note: 'Dating disputed' },
  // Return era
  { slug: 'haggai', eras: ['return'] },
  { slug: 'zechariah', eras: ['return'] },
  { slug: 'malachi', eras: ['return'] },
];

/**
 * Wisdom and poetry books mapped to their associated eras.
 * Most are associated with the Kingdom (Davidic/Solomonic authorship).
 * Job's setting is traditionally patriarchal but dating is uncertain.
 */
export const WISDOM_MAPPINGS: WisdomMapping[] = [
  { slug: 'job', era: 'patriarchs', uncertain: true, note: 'Setting suggests patriarchal era; dating uncertain' },
  { slug: 'psalms', era: 'kingdom' },
  { slug: 'proverbs', era: 'kingdom' },
  { slug: 'ecclesiastes', era: 'kingdom' },
  { slug: 'song-of-solomon', era: 'kingdom' },
];

/**
 * Chronicles retells the Kingdom history from a post-exilic perspective.
 */
export const PARALLEL_BOOKS = {
  kingdom: {
    books: ['1-chronicles', '2-chronicles'],
    relation: 'A parallel retelling',
    note: 'The monarchy retold from a later theological perspective',
  },
};

// Helper functions to query era data
export function getProphetsForEra(eraId: EraId): ProphetMapping[] {
  return PROPHET_MAPPINGS.filter((p) => p.eras.includes(eraId));
}

export function getWisdomForEra(eraId: EraId): WisdomMapping[] {
  return WISDOM_MAPPINGS.filter((w) => w.era === eraId);
}

export function getParallelBooksForEra(eraId: EraId): typeof PARALLEL_BOOKS.kingdom | undefined {
  if (eraId === 'kingdom') return PARALLEL_BOOKS.kingdom;
  return undefined;
}

// ---------------------------------------------------------------------------
// The Story journey
// ---------------------------------------------------------------------------

export interface TerrainBook {
  slug: string;
  name: string;
  chapterCount: number;
  href: string;
}

export interface TerrainBranch {
  id: string;
  title: string;
  relation: string; // why it sits beside, not after — "A parallel retelling"
  bookSlugs: string[];
}

export interface TerrainStopDef {
  id: string;
  title: string;
  bookSlugs: string[];
  // For era-based stops: supplementary info shown on expansion
  bookNote?: string;
  branch?: TerrainBranch;
  // Era-specific data for progressive disclosure
  eraId?: EraId;
}

export type TerrainSegmentDef =
  | { kind: 'stop'; stop: TerrainStopDef }
  | { kind: 'gap'; id: string; label: string; note: string };

/*
  The Old Testament story spine: seven historical eras.
  Each era is a stop on the journey. Prophets, wisdom, and parallel books
  attach as secondary layers accessible through progressive disclosure.
*/
const OT_JOURNEY: TerrainSegmentDef[] = OT_ERAS.map((era) => ({
  kind: 'stop' as const,
  stop: {
    id: era.id,
    title: era.name,
    bookSlugs: era.primaryBooks,
    bookNote: era.bookNote,
    eraId: era.id,
    // Chronicles branch attaches to Kingdom
    branch:
      era.id === 'kingdom'
        ? {
            id: 'chronicles',
            title: 'Chronicles',
            relation: 'A parallel retelling',
            bookSlugs: PARALLEL_BOOKS.kingdom.books,
          }
        : undefined,
  },
}));

/*
  The New Testament journey remains unchanged: Gospels → Acts → Letters → Revelation.
*/
const NT_JOURNEY: TerrainSegmentDef[] = [
  {
    kind: 'stop',
    stop: {
      id: 'gospels',
      title: 'Gospels',
      bookSlugs: ['matthew', 'mark', 'luke', 'john'],
    },
  },
  {
    kind: 'stop',
    stop: {
      id: 'acts',
      title: 'Acts',
      bookSlugs: ['acts'],
    },
  },
  {
    kind: 'stop',
    stop: {
      id: 'letters',
      title: 'Letters',
      bookSlugs: [
        'romans',
        '1-corinthians',
        '2-corinthians',
        'galatians',
        'ephesians',
        'philippians',
        'colossians',
        '1-thessalonians',
        '2-thessalonians',
        '1-timothy',
        '2-timothy',
        'titus',
        'philemon',
        'hebrews',
        'james',
        '1-peter',
        '2-peter',
        '1-john',
        '2-john',
        '3-john',
        'jude',
      ],
    },
  },
  {
    kind: 'stop',
    stop: {
      id: 'revelation',
      title: 'Revelation',
      bookSlugs: ['revelation'],
    },
  },
];

const STORY_JOURNEY: TerrainSegmentDef[] = [
  ...OT_JOURNEY,
  {
    kind: 'gap',
    id: 'four-hundred-years',
    label: '400 Years',
    note: 'Four centuries of silence between the testaments',
  },
  ...NT_JOURNEY,
];

// ---------------------------------------------------------------------------
// Resolution — serializable shapes the client components render directly
// ---------------------------------------------------------------------------

export interface ResolvedBranch {
  id: string;
  title: string;
  relation: string;
  books: TerrainBook[];
}

/**
 * Resolved prophetic voice for rendering.
 */
export interface ResolvedProphet {
  slug: string;
  name: string;
  chapterCount: number;
  href: string;
  context?: 'israel' | 'judah' | 'transition' | 'uncertain';
  note?: string;
  spansEras?: boolean; // true if this prophet appears in multiple eras (e.g., Jeremiah)
}

/**
 * Resolved wisdom book for rendering.
 */
export interface ResolvedWisdom {
  slug: string;
  name: string;
  chapterCount: number;
  href: string;
  uncertain?: boolean;
  note?: string;
}

/**
 * Era-specific context shown on expansion.
 */
export interface ResolvedEraContext {
  prophets?: {
    israel?: ResolvedProphet[];
    judah?: ResolvedProphet[];
    general?: ResolvedProphet[];
  };
  wisdom?: ResolvedWisdom[];
  parallel?: ResolvedBranch;
}

export interface ResolvedStop {
  id: string;
  title: string;
  books: TerrainBook[];
  bookNote?: string;
  branch?: ResolvedBranch;
  // Era-specific context for progressive disclosure
  eraId?: EraId;
  eraContext?: ResolvedEraContext;
}

export type ResolvedSegment =
  | { kind: 'stop'; stop: ResolvedStop }
  | { kind: 'gap'; id: string; label: string; note: string };

/** Books with dedicated experiences keep their own entry points. */
function bookHref(slug: string): string {
  if (slug === 'genesis') return '/genesis';
  if (slug === 'psalms') return '/psalms';
  return `/${slug}`;
}

function resolveBooks(slugs: string[]): TerrainBook[] {
  return slugs.flatMap((slug) => {
    const book = getBookBySlug(slug);
    if (!book) return [];
    return [
      {
        slug: book.slug,
        name: book.name,
        chapterCount: book.chapterCount,
        href: bookHref(book.slug),
      },
    ];
  });
}

/**
 * Resolve prophets for an era, grouped by context (Israel/Judah/general).
 */
function resolveEraContext(eraId: EraId): ResolvedEraContext | undefined {
  const prophets = getProphetsForEra(eraId);
  const wisdom = getWisdomForEra(eraId);
  const parallel = getParallelBooksForEra(eraId);

  if (prophets.length === 0 && wisdom.length === 0 && !parallel) {
    return undefined;
  }

  const result: ResolvedEraContext = {};

  if (prophets.length > 0) {
    const israel: ResolvedProphet[] = [];
    const judah: ResolvedProphet[] = [];
    const general: ResolvedProphet[] = [];

    for (const p of prophets) {
      const book = getBookBySlug(p.slug);
      if (!book) continue;
      const resolved: ResolvedProphet = {
        slug: book.slug,
        name: book.name,
        chapterCount: book.chapterCount,
        href: bookHref(book.slug),
        context: p.context,
        note: p.note,
        spansEras: p.eras.length > 1,
      };
      if (p.context === 'israel') israel.push(resolved);
      else if (p.context === 'judah') judah.push(resolved);
      else general.push(resolved);
    }

    result.prophets = {};
    if (israel.length > 0) result.prophets.israel = israel;
    if (judah.length > 0) result.prophets.judah = judah;
    if (general.length > 0) result.prophets.general = general;
  }

  if (wisdom.length > 0) {
    result.wisdom = wisdom.flatMap((w) => {
      const book = getBookBySlug(w.slug);
      if (!book) return [];
      return [
        {
          slug: book.slug,
          name: book.name,
          chapterCount: book.chapterCount,
          href: bookHref(book.slug),
          uncertain: w.uncertain,
          note: w.note,
        },
      ];
    });
  }

  if (parallel) {
    result.parallel = {
      id: `${eraId}-parallel`,
      title: 'Chronicles',
      relation: parallel.relation,
      books: resolveBooks(parallel.books),
    };
  }

  return result;
}

/** The Story dimension's journey, resolved and ready to render. */
export function getStoryTerrain(): ResolvedSegment[] {
  return STORY_JOURNEY.map((segment) => {
    if (segment.kind === 'gap') return segment;
    const { stop } = segment;
    return {
      kind: 'stop' as const,
      stop: {
        id: stop.id,
        title: stop.title,
        books: resolveBooks(stop.bookSlugs),
        bookNote: stop.bookNote,
        branch: stop.branch
          ? {
              id: stop.branch.id,
              title: stop.branch.title,
              relation: stop.branch.relation,
              books: resolveBooks(stop.branch.bookSlugs),
            }
          : undefined,
        eraId: stop.eraId,
        eraContext: stop.eraId ? resolveEraContext(stop.eraId) : undefined,
      },
    };
  });
}
