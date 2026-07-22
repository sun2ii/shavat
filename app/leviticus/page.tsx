import Link from 'next/link';
import { getAllDivisions } from '@/lib/book-metadata-utils';

export const metadata = {
  title: 'Shavat | Leviticus',
  description: 'Leviticus - Holiness and worship in the presence of God',
};

export default function LeviticusPage() {
  const divisions = getAllDivisions('leviticus');

  return (
    <main className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-[rgb(var(--text-primary))] mb-6">
          Leviticus
        </h1>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-6">
          Leviticus teaches how a holy God can dwell among a sinful people through the system of sacrifice, priesthood, and purity laws. Often neglected, Leviticus is foundational for understanding the New Testament's presentation of Christ as both priest and sacrifice.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Key Themes
        </h2>

        <div className="space-y-4 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Holiness
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              "You shall be holy, for I the LORD your God am holy." Holiness is not merely moral purity but separation unto God, reflecting his character in every dimension of life: worship, ethics, food, sex, and social relations.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Sacrifice and atonement
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              The sacrificial system teaches that sin requires death but God provides a substitute. The blood of the sacrifice covers sin and makes atonement, pointing forward to Christ's once-for-all sacrifice.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Priesthood and mediation
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              The Aaronic priesthood mediates between God and Israel, offering sacrifices and maintaining the sanctuary. This temporary priesthood foreshadows Christ's eternal priesthood after the order of Melchizedek.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Clean and unclean
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Purity laws distinguish clean from unclean, teaching Israel to make ethical and spiritual distinctions. While fulfilled in Christ, these categories train God's people to discern between holy and profane.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The Day of Atonement
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Leviticus 16 establishes the annual day when the high priest enters the Most Holy Place to make atonement for all Israel's sins. Hebrews interprets this as the pattern for Christ's entry into heaven itself.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Structure Overview
        </h2>

        <div className="space-y-3 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Laws of Sacrifice (1–7)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Five types of offerings and instructions for priests and people.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Priesthood Established (8–10)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Ordination of Aaron and his sons, inauguration of worship, and judgment for unauthorized fire.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Purity Laws (11–15)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Clean and unclean animals, childbirth, skin diseases, and bodily discharges.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Day of Atonement (16)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              The high priest's annual entry into the Most Holy Place to atone for all Israel's sin.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Holiness Code (17–27)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Ethical, ceremonial, and social laws defining holiness in all of life, including festivals, Sabbaths, and covenant blessings.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Why read this book?
        </h2>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-8">
          Leviticus is essential for understanding the logic of substitutionary atonement and the book of Hebrews. Its call to holiness remains binding on God's people, though fulfilled in Christ who is both our sacrifice and our priest.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Begin Reading
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {divisions.map((division) => (
            <Link
              key={division.id}
              href={`/ot/leviticus/${division.id}/${division.chapters[0]}`}
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
