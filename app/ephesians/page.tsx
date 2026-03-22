import Link from 'next/link';
import { getAllDivisions } from '@/lib/book-metadata-utils';

export const metadata = {
  title: 'Shavat | Ephesians',
  description: 'Ephesians - The church as the fullness of Christ',
};

export default function EphesiansPage() {
  const divisions = getAllDivisions('ephesians');

  return (
    <main className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-[rgb(var(--text-primary))] mb-6">
          Ephesians
        </h1>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-6">
          Ephesians unfolds God's eternal purpose to unite all things in Christ through the church. Paul presents the highest vision of the church in the New Testament: chosen before the foundation of the world, reconciled across ethnic divisions, and equipped to display God's wisdom to cosmic powers.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Key Themes
        </h2>

        <div className="space-y-4 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              God's eternal purpose
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Before the foundation of the world, God chose us in Christ to be holy and blameless. The mystery hidden for ages is now revealed: to unite all things in Christ, making the church the fullness of him who fills all in all.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              By grace through faith
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              We were dead in trespasses and sins, but God made us alive together with Christ. Salvation is by grace through faith, not of works, so that no one may boast. We are his workmanship, created in Christ Jesus for good works.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Unity in Christ
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Christ has broken down the dividing wall of hostility between Jew and Gentile, creating one new man in place of two. The church is called to maintain the unity of the Spirit in the bond of peace.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The church and spiritual gifts
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Christ gave gifts to equip the saints for ministry, building up the body until we all attain to the unity of the faith and the knowledge of the Son of God, to mature manhood, to the measure of the fullness of Christ.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Spiritual warfare
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Our struggle is not against flesh and blood but against the spiritual forces of evil. We must put on the full armor of God, standing firm with truth, righteousness, faith, and the sword of the Spirit.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Structure Overview
        </h2>

        <div className="space-y-3 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              God's Purpose and Grace (1–3)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Spiritual blessings in Christ, salvation by grace, and the mystery of the church.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Walking Worthy (4–6)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Unity and maturity, putting off the old self, marriage and family, and spiritual armor.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Why read this book?
        </h2>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-8">
          Ephesians presents the most comprehensive vision of the church's identity and calling. Its teaching on God's eternal purpose, salvation by grace, and practical Christian living makes it essential for understanding what it means to be the people of God in Christ.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Begin Reading
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {divisions.map((division) => (
            <Link
              key={division.id}
              href={`/ephesians/${division.id}/${division.chapters[0]}`}
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
