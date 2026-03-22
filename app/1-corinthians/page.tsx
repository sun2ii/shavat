import Link from 'next/link';
import { getAllDivisions } from '@/lib/book-metadata-utils';

export const metadata = {
  title: 'Shavat | 1 Corinthians',
  description: '1 Corinthians - Gospel wisdom for a divided church',
};

export default function FirstCorinthiansPage() {
  const divisions = getAllDivisions('1-corinthians');

  return (
    <main className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-[rgb(var(--text-primary))] mb-6">
          1 Corinthians
        </h1>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-6">
          Paul addresses a church divided by factions, confused about Christian freedom, and tolerating serious sin. First Corinthians applies gospel wisdom to practical problems: sexuality, marriage, idol food, worship, spiritual gifts, and the resurrection. The letter demonstrates that theology always matters for daily life.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Key Themes
        </h2>

        <div className="space-y-4 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The cross and worldly wisdom
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              The Corinthians prize eloquent wisdom, but Paul preaches Christ crucified, foolishness to the world but God's power and wisdom. The cross exposes worldly values and creates a counterintuitive community.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Church unity and love
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Divisions over leaders betray a misunderstanding of ministry and the church. Believers belong to Christ, not to Paul or Apollos. Love, not knowledge or spiritual prowess, builds up the body.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Sexual ethics and holiness
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Your body is a temple of the Holy Spirit. Sexual immorality violates union with Christ and dishonors God. Christian freedom is not license but liberation to glorify God with our bodies.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Spiritual gifts for edification
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Gifts are given by the same Spirit for the common good, not individual status. The church is one body with many members. Without love, even dramatic gifts are worthless noise.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The resurrection
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              If Christ has not been raised, our faith is futile and we are still in our sins. But Christ has been raised as the firstfruits, guaranteeing our future resurrection and victory over death.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Structure Overview
        </h2>

        <div className="space-y-3 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Divisions and Wisdom (1–4)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Factions in the church, the wisdom of the cross, and the role of apostles.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Moral and Ethical Issues (5–11)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Sexual immorality, lawsuits, marriage, idol food, head coverings, and the Lord's Supper.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Spiritual Gifts (12–14)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              One body with many gifts, the supremacy of love, and orderly worship.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Resurrection and Conclusion (15–16)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              The resurrection of Christ and believers, final instructions, and greetings.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Why read this book?
        </h2>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-8">
          First Corinthians addresses perennial church problems with gospel clarity. Its teaching on love, spiritual gifts, and the resurrection remains foundational for Christian practice and hope. The letter shows how the cross must shape every aspect of life together.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Begin Reading
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {divisions.map((division) => (
            <Link
              key={division.id}
              href={`/1-corinthians/${division.id}/${division.chapters[0]}`}
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
