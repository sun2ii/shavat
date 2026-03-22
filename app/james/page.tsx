import Link from 'next/link';
import { getAllDivisions } from '@/lib/book-metadata-utils';

export const metadata = {
  title: 'Shavat | James',
  description: 'James - Faith that works',
};

export default function JamesPage() {
  const divisions = getAllDivisions('james');

  return (
    <main className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-[rgb(var(--text-primary))] mb-6">
          James
        </h1>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-6">
          James writes with prophetic urgency, calling believers to faith that produces works. Often called the Proverbs of the New Testament, James addresses practical wisdom for living as God's people: controlling the tongue, caring for the poor, resisting favoritism, and enduring trials with joy.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Key Themes
        </h2>

        <div className="space-y-4 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Faith and works
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Faith without works is dead. Genuine faith produces obedience, just as Abraham's faith was completed by his works. James does not contradict Paul but insists that true faith always bears fruit in action.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Trials and perseverance
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Count it all joy when you meet trials, for testing produces steadfastness. Blessed is the one who remains steadfast under trial, for when tested he will receive the crown of life.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The tongue and wisdom
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              The tongue is a small member yet boasts great things. No human can tame the tongue, a restless evil full of deadly poison. Wisdom from above is first pure, then peaceable, gentle, open to reason, full of mercy and good fruits.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Care for the vulnerable
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Pure religion is to visit orphans and widows in their affliction and to keep oneself unstained from the world. Show no partiality, for God has chosen the poor to be rich in faith and heirs of the kingdom.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Prayer and humility
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              The prayer of a righteous person has great power. Humble yourselves before the Lord, and he will exalt you. Resist the devil, and he will flee from you. Draw near to God, and he will draw near to you.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Structure Overview
        </h2>

        <div className="space-y-3 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Trials, Wisdom, and Temptation (1)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Joy in trials, asking for wisdom, and being doers of the word.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Favoritism and Faith (2)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Show no partiality, love your neighbor, faith without works is dead.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              The Tongue and Wisdom (3)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Taming the tongue and wisdom from above versus earthly wisdom.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Submission and Patience (4–5)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Submit to God, resist the devil, patience in suffering, and prayer for healing.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Why read this book?
        </h2>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-8">
          James provides practical wisdom for Christian living with prophetic directness. Its emphasis on faith that produces works, care for the poor, and the power of prayer makes it essential for understanding how doctrine translates into practice.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Begin Reading
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {divisions.map((division) => (
            <Link
              key={division.id}
              href={`/james/${division.id}/${division.chapters[0]}`}
              className="block p-4 border border-[rgb(var(--border))] rounded hover:border-[rgb(var(--text-secondary))] transition-colors"
            >
              <div className="flex items-baseline justify-between gap-4">
                <div>
                  <h3 className="text-base font-normal text-[rgb(var(--text-primary))] mb-1">
                    {division.title}
                  </h3>
                  <p className="text-sm text-[rgb(var(--text-secondary))] opacity-70">
                    {division.summary}
                  </p>
                </div>
                <span className="text-xs text-[rgb(var(--text-secondary))] opacity-60 whitespace-nowrap">
                  {division.chapters.length} {division.chapters.length === 1 ? 'chapter' : 'chapters'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
