import Link from 'next/link';

export default function MarketingPage() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-5xl md:text-7xl font-light text-[rgb(var(--text-primary))] tracking-tight">
          Shavat
        </h1>

        <p className="text-xl md:text-2xl text-[rgb(var(--text-secondary))] font-light leading-relaxed">
          A Sabbath for reading scripture with emotional context
        </p>

        <div className="pt-4">
          <Link
            href="/library"
            className="inline-block px-8 py-4 bg-gold text-[rgb(var(--background))] font-medium rounded hover:opacity-90 transition-opacity"
          >
            Explore the Library
          </Link>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="space-y-3">
          <div className="text-blue-400 text-3xl">✦</div>
          <h3 className="text-lg font-medium text-[rgb(var(--text-primary))]">
            Verse Commentary
          </h3>
          <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
            Theological insights and meaning for every verse. Tap any verse to reveal deeper understanding.
          </p>
        </div>

        <div className="space-y-3">
          <div className="text-gold text-3xl">✦</div>
          <h3 className="text-lg font-medium text-[rgb(var(--text-primary))]">
            Thematic Collections
          </h3>
          <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
            Scripture organized by narrative arc and emotional theme, not just chapter divisions.
          </p>
        </div>

        <div className="space-y-3">
          <div className="text-[rgb(var(--text-secondary))] text-3xl">✦</div>
          <h3 className="text-lg font-medium text-[rgb(var(--text-primary))]">
            Complete Bible
          </h3>
          <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
            Torah, Psalms, Old and New Testaments. The entire canon in one focused reading experience.
          </p>
        </div>
      </div>

      {/* Subtle Footer CTA */}
      <div className="mt-24 text-sm text-[rgb(var(--text-secondary))]">
        <Link href="/library" className="hover:text-[rgb(var(--text-primary))] transition-colors">
          Begin reading →
        </Link>
      </div>
    </main>
  );
}
