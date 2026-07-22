import Link from 'next/link';
import { getAllDivisions } from '@/lib/book-metadata-utils';

export const metadata = {
  title: 'Shavat | Hebrews',
  description: 'Hebrews - The supremacy of Christ over all things',
};

export default function HebrewsPage() {
  const divisions = getAllDivisions('hebrews');

  return (
    <main className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-[rgb(var(--text-primary))] mb-6">
          Hebrews
        </h1>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-6">
          Hebrews presents Jesus as the final word of God, superior to prophets, angels, Moses, and the Levitical priesthood. Written to Jewish Christians facing pressure to abandon the faith, Hebrews demonstrates that the Old Testament finds its fulfillment and substance in Christ, making any return to the shadows both impossible and foolish.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Key Themes
        </h2>

        <div className="space-y-4 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The supremacy of Christ
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Christ is the radiance of God's glory, superior to angels, greater than Moses, and the high priest after the order of Melchizedek. Every comparison establishes that Jesus is better, final, and sufficient.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The high priesthood of Christ
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Jesus is both the perfect priest who offers and the perfect sacrifice offered. His priesthood is eternal, his sacrifice once-for-all, his intercession effective. The Levitical system pointed forward to him.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The new covenant
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Jeremiah's prophecy of a new covenant is fulfilled in Christ. The old covenant was provisional and shadowy; the new is eternal and substantive. Christ mediates a better covenant on better promises.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Faith and perseverance
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Faith is assurance of things hoped for, conviction of things not seen. Chapter 11's catalog of faithful witnesses demonstrates that faith endures suffering by looking to the promised inheritance. Apostasy means there is no more sacrifice for sins.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Warning and exhortation
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Five warning passages punctuate the argument: do not drift away, do not harden your hearts, do not fall away, do not shrink back, do not refuse the one who speaks from heaven. Perseverance proves genuine faith.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Structure Overview
        </h2>

        <div className="space-y-3 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              The Supremacy of Christ (1–4)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Christ superior to angels and Moses, warning against unbelief, and rest for God's people.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Christ the High Priest (5–10)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Melchizedek, the new covenant, the heavenly tabernacle, and the once-for-all sacrifice of Christ.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Faith and Endurance (11–13)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Examples of faith, looking to Jesus the founder and perfecter of faith, and practical exhortations for Christian living.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Why read this book?
        </h2>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-8">
          Hebrews is essential for understanding how the Old Testament sacrificial system points to Christ and why the church must never return to shadows now that the substance has come. Its warnings against apostasy and its call to persevering faith remain urgent for every generation.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Begin Reading
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {divisions.map((division) => (
            <Link
              key={division.id}
              href={`/nt/hebrews/${division.id}/${division.chapters[0]}`}
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
