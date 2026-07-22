import Link from 'next/link';
import { getAllDivisions } from '@/lib/book-metadata-utils';

export const metadata = {
  title: 'Shavat | Exodus',
  description: 'Exodus - Deliverance from Egypt and covenant at Sinai',
};

export default function ExodusPage() {
  const divisions = getAllDivisions('exodus');

  return (
    <main className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-[rgb(var(--text-primary))] mb-6">
          Exodus
        </h1>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-6">
          Exodus narrates Israel's deliverance from slavery in Egypt and the establishment of the covenant at Sinai. This foundational act of redemption becomes the pattern for understanding God's saving work throughout Scripture, pointing forward to the greater exodus accomplished in Christ.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Key Themes
        </h2>

        <div className="space-y-4 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Redemption and deliverance
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              God's deliverance of Israel from Egypt establishes the paradigm for all biblical salvation: grace precedes law, redemption before obedience. The Passover and Red Sea crossing reveal God as the one who saves by blood and power.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The name and glory of God
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              God reveals himself by name as YHWH, "I AM WHO I AM," the covenant-keeping God of promise. His glory fills the tabernacle, making his presence visible and dwelling among his people.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Covenant and law
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              The Sinai covenant establishes Israel as God's treasured possession, a kingdom of priests and a holy nation. The Ten Commandments and the Book of the Covenant define covenant life under God's rule.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The tabernacle
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Nearly half of Exodus details the tabernacle's design and construction. This portable sanctuary enables God to dwell among his people, foreshadowing the incarnation and the ultimate temple of Christ's body.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Mediation and intercession
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Moses stands between God and the people as mediator, foreshadowing the greater mediator to come. His intercession after the golden calf incident reveals the logic of substitutionary atonement.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Structure Overview
        </h2>

        <div className="space-y-3 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Slavery and Deliverance (1–18)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Israel's oppression in Egypt, Moses' call, ten plagues, Passover, Red Sea crossing, and journey to Sinai.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Covenant at Sinai (19–24)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Theophany at Sinai, Ten Commandments, Book of the Covenant, and covenant ratification.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Tabernacle Instructions (25–31)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Detailed plans for the tabernacle, priesthood, and worship.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Golden Calf and Renewal (32–34)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Israel's idolatry, Moses' intercession, covenant renewal, and revelation of God's character.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Tabernacle Construction (35–40)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              The people build the tabernacle according to the divine pattern, and God's glory fills it.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Why read this book?
        </h2>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-8">
          Exodus establishes the vocabulary of redemption that echoes through the entire Bible. Understanding the exodus is essential for reading the prophets, the Psalms, and the New Testament's presentation of Jesus as the paschal lamb who accomplishes the true and final exodus.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Begin Reading
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {divisions.map((division) => (
            <Link
              key={division.id}
              href={`/ot/exodus/${division.id}/${division.chapters[0]}`}
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
