/*
  EPISTLES REFERENCE
  Each epistle addressed a specific city with its own culture, temptations, and
  spiritual challenges. This maps those ancient contexts to modern cities
  that share similar dynamics — not exact equivalents, but intuition pumps.
*/

export interface EpistleContext {
  slug: string;
  name: string;
  modernCity: string;
  dynamics: string;
  summary: string;
}

const PAULINE_EPISTLES: EpistleContext[] = [
  {
    slug: 'romans',
    name: 'Romans',
    modernCity: 'Tokyo',
    dynamics: 'Power / capital / influence',
    summary: 'Rome was the seat of imperial power. Paul writes his most systematic theology to a church in the city that rules the world. Like Tokyo — ordered, status-conscious — Rome demanded a gospel that could stand before power.',
  },
  {
    slug: '1-corinthians',
    name: '1 Corinthians',
    modernCity: 'Las Vegas',
    dynamics: 'Money / sex / status / excess',
    summary: 'Corinth was the Las Vegas of antiquity: wealthy, sexually permissive, religiously plural. The church brought all that culture inside. Paul addresses divisions, lawsuits, sexual sin, idol feasts, and abuse of gifts.',
  },
  {
    slug: '2-corinthians',
    name: '2 Corinthians',
    modernCity: 'Las Vegas',
    dynamics: 'Money / sex / status / excess',
    summary: 'Same city, but now Paul defends his legitimacy against polished false teachers. In a city obsessed with performance, Paul boasts in weakness.',
  },
  {
    slug: 'galatians',
    name: 'Galatians',
    modernCity: 'Nashville',
    dynamics: 'Religious tradition / rules / belonging',
    summary: 'Judaizers insisted Gentiles must follow Jewish law. Nashville, with its Christian industry and unspoken rules of belonging, captures the dynamic: adding requirements to grace.',
  },
  {
    slug: 'ephesians',
    name: 'Ephesians',
    modernCity: 'New Orleans',
    dynamics: 'Magic / spirituality / commerce',
    summary: 'Ephesus was a center of occult practice and the temple of Artemis. Paul writes of spiritual warfare, the cosmic Christ, and armor of God — for believers surrounded by powers they once served.',
  },
  {
    slug: 'philippians',
    name: 'Philippians',
    modernCity: 'San Diego',
    dynamics: 'Military / civic pride / loyalty',
    summary: 'Philippi was a Roman military colony — fiercely loyal to Caesar, proud of citizenship. Paul writes from prison to citizens of heaven, urging them to stand firm.',
  },
  {
    slug: 'colossians',
    name: 'Colossians',
    modernCity: 'Ubud',
    dynamics: 'Mysticism / spiritual mixing',
    summary: 'Colossae faced syncretistic heresy — mixing Jewish mysticism, angel worship, and asceticism. Like Ubud with its spiritual tourism, the appeal was "Jesus plus something deeper." Paul responds: Christ is the fullness.',
  },
  {
    slug: '1-thessalonians',
    name: '1 Thessalonians',
    modernCity: 'Osaka',
    dynamics: 'Commerce / trade / connected',
    summary: 'Thessalonica was a thriving trade hub. The young church faced persecution. Paul encourages them about Christ\'s return and calls them to holy living while they wait.',
  },
  {
    slug: '2-thessalonians',
    name: '2 Thessalonians',
    modernCity: 'Osaka',
    dynamics: 'Commerce / trade / connected',
    summary: 'Same church, now confused about the Day of the Lord. Some quit working. Paul clarifies: stand firm, and if anyone won\'t work, they shouldn\'t eat.',
  },
  {
    slug: '1-timothy',
    name: '1 Timothy',
    modernCity: 'New Orleans',
    dynamics: 'Magic / spirituality / commerce',
    summary: 'Timothy pastors Ephesus. Paul writes practical counsel: leadership qualifications, false teachers, care for widows. The spiritual marketplace required clear leadership.',
  },
  {
    slug: '2-timothy',
    name: '2 Timothy',
    modernCity: 'New Orleans',
    dynamics: 'Magic / spirituality / commerce',
    summary: 'Paul\'s final letter, from prison awaiting execution. He urges Timothy to preach the word, endure suffering, finish the race. A pastoral testament.',
  },
  {
    slug: 'titus',
    name: 'Titus',
    modernCity: 'Costa Rica',
    dynamics: 'Distinct regional culture / communities needing organization',
    summary: 'Crete had a reputation — their own prophet called Cretans "liars, evil beasts, lazy gluttons." Titus must appoint elders and establish order in rough terrain.',
  },
  {
    slug: 'philemon',
    name: 'Philemon',
    modernCity: 'Ubud',
    dynamics: 'Mysticism / spiritual mixing',
    summary: 'A personal letter. Philemon\'s slave Onesimus ran away, met Paul, became a believer. Paul sends him back as a brother. The gospel transforms relationships.',
  },
];

const GENERAL_EPISTLES: EpistleContext[] = [
  {
    slug: 'hebrews',
    name: 'Hebrews',
    modernCity: 'Jerusalem',
    dynamics: 'Heritage / temptation to return',
    summary: 'Jewish believers tempted to abandon Christ and return to Judaism. The author shows Christ superior to angels, Moses, the priesthood, the sacrifices. Don\'t go back.',
  },
  {
    slug: 'james',
    name: 'James',
    modernCity: 'Everywhere',
    dynamics: 'Faith without action / partiality',
    summary: 'Practical wisdom to scattered believers. Faith without works is dead. The tongue is a fire. Don\'t favor the rich. The Proverbs of the New Testament.',
  },
  {
    slug: '1-peter',
    name: '1 Peter',
    modernCity: 'Scattered minority',
    dynamics: 'Exile / suffering / witness',
    summary: 'To believers scattered across Asia Minor, suffering for faith. They are elect exiles. Peter calls them to holy living, submission as witness, hope in resurrection.',
  },
  {
    slug: '2-peter',
    name: '2 Peter',
    modernCity: 'Scattered minority',
    dynamics: 'False teachers / delay of return',
    summary: 'Against false teachers and those who mock Christ\'s delayed return. Grow in grace. Delay means patience — God wants none to perish.',
  },
  {
    slug: '1-john',
    name: '1 John',
    modernCity: 'Gnostic edge cities',
    dynamics: 'Truth / love / assurance',
    summary: 'Against early gnostic errors: denial that Jesus came in flesh, claims to special knowledge, lack of love. Tests: Do you confess Jesus? Keep commands? Love?',
  },
  {
    slug: '2-john',
    name: '2 John',
    modernCity: 'Small house church',
    dynamics: 'Hospitality and discernment',
    summary: 'Warning about showing hospitality to false teachers. Love walks in truth. Don\'t receive those who deny Christ came in flesh.',
  },
  {
    slug: '3-john',
    name: '3 John',
    modernCity: 'Small house church',
    dynamics: 'Church politics and hospitality',
    summary: 'Commends Gaius for hospitality, condemns Diotrephes who refuses it, commends Demetrius. Character matters in leadership.',
  },
  {
    slug: 'jude',
    name: 'Jude',
    modernCity: 'Under siege',
    dynamics: 'Contend for the faith',
    summary: 'Jude wanted to write about salvation but had to address false teachers who crept in. Contend earnestly for the faith once delivered.',
  },
];

const ALL_EPISTLES = [...PAULINE_EPISTLES, ...GENERAL_EPISTLES];

const EPISTLE_MAP = new Map(ALL_EPISTLES.map(e => [e.slug, e]));

export function getEpistleContext(slug: string): EpistleContext | undefined {
  return EPISTLE_MAP.get(slug);
}

export function isEpistle(slug: string): boolean {
  return EPISTLE_MAP.has(slug);
}

export function getAllPaulineEpistles(): EpistleContext[] {
  return PAULINE_EPISTLES;
}

export function getAllGeneralEpistles(): EpistleContext[] {
  return GENERAL_EPISTLES;
}

export function getAllEpistles(): EpistleContext[] {
  return ALL_EPISTLES;
}
