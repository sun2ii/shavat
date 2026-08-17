import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shavat | Understanding the Epistles',
  description:
    'Every letter was written to real people in a real city with real problems. Modern city parallels help feel the texture of ancient contexts.',
  openGraph: {
    title: 'Shavat | Understanding the Epistles',
    images: ['/shavat.png'],
  },
};

/*
  EPISTLES REFERENCE
  Each epistle addressed a specific city with its own culture, temptations, and
  spiritual challenges. This maps those ancient contexts to modern cities
  that share similar dynamics — not exact equivalents, but intuition pumps.
*/

interface EpistleContext {
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
    summary:
      'Rome was the seat of imperial power. Paul writes his most systematic theology to a church in the city that rules the world. Like Tokyo — ordered, status-conscious — Rome demanded a gospel that could stand before power.',
  },
  {
    slug: '1-corinthians',
    name: '1 Corinthians',
    modernCity: 'Las Vegas',
    dynamics: 'Money / sex / status / excess',
    summary:
      'Corinth was the Las Vegas of antiquity: wealthy, sexually permissive, religiously plural. The church brought all that culture inside. Paul addresses divisions, lawsuits, sexual sin, idol feasts, and abuse of gifts.',
  },
  {
    slug: '2-corinthians',
    name: '2 Corinthians',
    modernCity: 'Las Vegas',
    dynamics: 'Money / sex / status / excess',
    summary:
      'Same city, but now Paul defends his legitimacy against polished false teachers. In a city obsessed with performance, Paul boasts in weakness.',
  },
  {
    slug: 'galatians',
    name: 'Galatians',
    modernCity: 'Nashville',
    dynamics: 'Religious tradition / rules / belonging',
    summary:
      'Judaizers insisted Gentiles must follow Jewish law. Nashville, with its Christian industry and unspoken rules of belonging, captures the dynamic: adding requirements to grace.',
  },
  {
    slug: 'ephesians',
    name: 'Ephesians',
    modernCity: 'New Orleans',
    dynamics: 'Magic / spirituality / commerce',
    summary:
      'Ephesus was a center of occult practice and the temple of Artemis. Paul writes of spiritual warfare, the cosmic Christ, and armor of God — for believers surrounded by powers they once served.',
  },
  {
    slug: 'philippians',
    name: 'Philippians',
    modernCity: 'San Diego',
    dynamics: 'Military / civic pride / loyalty',
    summary:
      'Philippi was a Roman military colony — fiercely loyal to Caesar, proud of citizenship. Paul writes from prison to citizens of heaven, urging them to stand firm.',
  },
  {
    slug: 'colossians',
    name: 'Colossians',
    modernCity: 'Ubud',
    dynamics: 'Mysticism / spiritual mixing',
    summary:
      'Colossae faced syncretistic heresy — mixing Jewish mysticism, angel worship, and asceticism. Like Ubud with its spiritual tourism, the appeal was "Jesus plus something deeper." Paul responds: Christ is the fullness.',
  },
  {
    slug: '1-thessalonians',
    name: '1 Thessalonians',
    modernCity: 'Osaka',
    dynamics: 'Commerce / trade / connected',
    summary:
      "Thessalonica was a thriving trade hub. The young church faced persecution. Paul encourages them about Christ's return and calls them to holy living while they wait.",
  },
  {
    slug: '2-thessalonians',
    name: '2 Thessalonians',
    modernCity: 'Osaka',
    dynamics: 'Commerce / trade / connected',
    summary:
      "Same church, now confused about the Day of the Lord. Some quit working. Paul clarifies: stand firm, and if anyone won't work, they shouldn't eat.",
  },
  {
    slug: '1-timothy',
    name: '1 Timothy',
    modernCity: 'New Orleans',
    dynamics: 'Magic / spirituality / commerce',
    summary:
      'Timothy pastors Ephesus. Paul writes practical counsel: leadership qualifications, false teachers, care for widows. The spiritual marketplace required clear leadership.',
  },
  {
    slug: '2-timothy',
    name: '2 Timothy',
    modernCity: 'New Orleans',
    dynamics: 'Magic / spirituality / commerce',
    summary:
      "Paul's final letter, from prison awaiting execution. He urges Timothy to preach the word, endure suffering, finish the race. A pastoral testament.",
  },
  {
    slug: 'titus',
    name: 'Titus',
    modernCity: 'Costa Rica',
    dynamics: 'Distinct regional culture / communities needing organization',
    summary:
      'Crete had a reputation — their own prophet called Cretans "liars, evil beasts, lazy gluttons." Titus must appoint elders and establish order in rough terrain.',
  },
  {
    slug: 'philemon',
    name: 'Philemon',
    modernCity: 'Ubud',
    dynamics: 'Mysticism / spiritual mixing',
    summary:
      "A personal letter. Philemon's slave Onesimus ran away, met Paul, became a believer. Paul sends him back as a brother. The gospel transforms relationships.",
  },
];

const GENERAL_EPISTLES: EpistleContext[] = [
  {
    slug: 'hebrews',
    name: 'Hebrews',
    modernCity: 'Tokyo',
    dynamics: 'Pressure to return / imperial world',
    summary:
      'Jewish Christians somewhere in the Roman world, tempted to abandon Christ and return to Judaism. The author shows Christ superior to everything they would go back to.',
  },
  {
    slug: 'james',
    name: 'James',
    modernCity: 'Indonesians Abroad',
    dynamics: 'Diaspora faith / identity',
    summary:
      'To the twelve tribes scattered outside their homeland. Practical wisdom for maintaining faith abroad. Works prove faith. The tongue is fire. Don\'t favor the rich.',
  },
  {
    slug: '1-peter',
    name: '1 Peter',
    modernCity: 'California',
    dynamics: 'Scattered minority / exile',
    summary:
      'To believers across multiple regions of Asia Minor, living as religious minorities. Peter calls them elect exiles: holy living, faithful witness, hope in resurrection.',
  },
  {
    slug: '2-peter',
    name: '2 Peter',
    modernCity: 'California',
    dynamics: 'False teachers / delayed return',
    summary:
      'Same broad Asia Minor world. False teachers and mockery about Christ\'s return. Grow in grace. Delay means patience — God wants none to perish.',
  },
  {
    slug: '1-john',
    name: '1 John',
    modernCity: 'New Orleans',
    dynamics: 'Competing beliefs / assurance',
    summary:
      'The Ephesus world, where competing ideas about Jesus circulate. Some deny he came in flesh. John gives tests: confess Jesus, keep commands, love one another.',
  },
  {
    slug: '2-john',
    name: '2 John',
    modernCity: 'New Orleans',
    dynamics: 'Hospitality / discernment',
    summary:
      'Same church network. Traveling teachers spread competing beliefs. Love walks in truth. Don\'t receive those who deny Christ came in flesh.',
  },
  {
    slug: '3-john',
    name: '3 John',
    modernCity: 'New Orleans',
    dynamics: 'Leadership / hospitality',
    summary:
      'Same church network. Gaius shows hospitality; Diotrephes refuses it and expels people. Character matters in leadership. Support those who go out for the Name.',
  },
  {
    slug: 'jude',
    name: 'Jude',
    modernCity: 'Location Unknown',
    dynamics: 'Contend for the faith',
    summary:
      'Destination unknown. Jude planned to write about salvation but had to warn about false teachers who crept in. Contend for the faith once delivered.',
  },
];

function EpistleRow({ epistle }: { epistle: EpistleContext }) {
  return (
    <Link
      href={`/${epistle.slug}/1`}
      className="block rounded-lg border border-hairline bg-surface p-3 transition-colors hover:bg-paper-2"
    >
      <div className="flex items-baseline justify-between gap-2">
        <span className="font-serif text-base font-light text-ink">{epistle.name}</span>
        <span className="font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-purple-400">
          {epistle.modernCity}
        </span>
      </div>
      <p className="mt-1 font-sans text-[11px] font-medium text-muted">{epistle.dynamics}</p>
      <p className="mt-2 font-serif text-[13px] leading-relaxed text-ink/75">{epistle.summary}</p>
    </Link>
  );
}

export default function EpistlesOverviewPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 select-text">
      <header className="mb-10">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
          Reference
        </p>
        <h1 className="mt-2 font-serif text-3xl font-light text-ink">
          Understanding the Epistles
        </h1>
        <p className="mt-3 font-serif italic text-lg text-muted max-w-2xl leading-relaxed">
          Every letter was written to real people in a real city with real problems. Modern city
          parallels help feel the texture of ancient contexts.
        </p>
      </header>

      <div className="space-y-10">
        <section>
          <div className="flex items-baseline gap-3 pb-4">
            <h2 className="font-serif text-2xl font-light text-ink">Pauline Epistles</h2>
            <span className="hidden font-sans text-[11px] text-faint sm:inline">
              13 letters from the apostle
            </span>
            <span aria-hidden className="h-px flex-1 bg-hairline" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {PAULINE_EPISTLES.map((epistle) => (
              <EpistleRow key={epistle.slug} epistle={epistle} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-baseline gap-3 pb-4">
            <h2 className="font-serif text-2xl font-light text-ink">General Epistles</h2>
            <span className="hidden font-sans text-[11px] text-faint sm:inline">
              8 letters from other apostles
            </span>
            <span aria-hidden className="h-px flex-1 bg-hairline" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {GENERAL_EPISTLES.map((epistle) => (
              <EpistleRow key={epistle.slug} epistle={epistle} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
