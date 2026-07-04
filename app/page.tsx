import Link from 'next/link';

const FEATURES = [
  {
    n: '01',
    title: 'Verse Commentary',
    body: 'Theological insight and meaning for every verse. Tap any verse to reveal deeper understanding without leaving the page.',
  },
  {
    n: '02',
    title: 'Thematic Collections',
    body: 'Scripture organized by narrative arc and emotional theme — Genesis as seven books, not fifty flat chapters.',
  },
  {
    n: '03',
    title: 'The Complete Canon',
    body: 'Torah, Psalms, Old and New Testaments — the entire Bible in one focused, restful reading experience.',
  },
];

export default function MarketingPage() {
  return (
    <main>
      {/* Hero */}
      <section className="text-center pt-16 md:pt-24 pb-6 px-4">
        <p className="font-sans text-xs tracking-[0.34em] uppercase text-gold font-semibold">
          שבת · A Sabbath for the Word
        </p>
        <h1 className="font-serif font-bold text-ink text-6xl md:text-8xl leading-[0.95] tracking-tight mt-4">
          Shavat
        </h1>
        <p className="font-serif italic text-xl md:text-2xl text-muted max-w-xl mx-auto mt-5 leading-snug">
          A Sabbath for reading scripture with emotional context.
        </p>
        <div className="flex flex-col sm:flex-row gap-3.5 justify-center mt-9">
          <Link
            href="/library"
            className="px-8 py-3.5 rounded-full bg-brand text-white font-sans text-[15px] font-semibold hover:opacity-90 transition-opacity"
          >
            Enter the Library
          </Link>
          <Link
            href="/genesis/creation/1"
            className="px-6 py-3.5 rounded-full border border-hairline text-ink font-sans text-[15px] font-medium hover:border-muted transition-colors inline-flex items-center justify-center gap-2"
          >
            Continue in Genesis <span className="text-gold">→</span>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-y-10 md:gap-y-0 max-w-5xl mx-auto mt-20 md:mt-28 pb-16">
        {FEATURES.map((f, i) => (
          <div
            key={f.n}
            className={`px-0 md:px-8 ${i < FEATURES.length - 1 ? 'md:border-r border-hairline' : ''}`}
          >
            <div className="font-serif font-bold text-xl text-gold mb-3.5">{f.n}</div>
            <h3 className="font-serif font-bold text-2xl text-ink mb-2">{f.title}</h3>
            <p className="font-sans text-sm leading-relaxed text-muted">{f.body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
