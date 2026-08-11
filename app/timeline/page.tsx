import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shavat | Timeline',
  description: 'The centuries Scripture spans',
  openGraph: {
    title: 'Shavat | Timeline',
    images: ['/shavat.png'],
  },
};

export default function TimelinePage() {
  return (
    <main className="mx-auto max-w-5xl px-4">
      <header className="pb-6 pt-2 text-center md:pb-8 md:pt-4">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.34em] text-gold">
          The centuries it spans
        </p>
        <h1 className="mt-2 font-serif text-3xl font-light tracking-tight text-ink md:text-4xl">
          Timeline
        </h1>
      </header>

      <div className="py-24 text-center">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-gold">
          Coming soon
        </p>
        <p className="mt-4 font-serif italic text-muted">
          A chronological view of biblical history
        </p>
      </div>
    </main>
  );
}
