import Link from 'next/link';
import { getAllDivisions } from '@/lib/book-metadata-utils';

export const metadata = {
  title: 'Shavat | Isaiah',
  description: 'Isaiah - The Holy One of Israel and the Suffering Servant',
};

export default function IsaiahPage() {
  const divisions = getAllDivisions('isaiah');

  return (
    <main className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-[rgb(var(--text-primary))] mb-6">
          Isaiah
        </h1>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-6">
          Isaiah presents the most comprehensive vision of God's holiness, judgment, and redemption in the Old Testament. From the temple vision of the Holy One to the Suffering Servant songs to the new heavens and new earth, Isaiah shapes how the New Testament understands Christ's person and work.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Key Themes
        </h2>

        <div className="space-y-4 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The Holy One of Israel
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Isaiah's temple vision reveals God enthroned in unapproachable holiness: "Holy, holy, holy is the LORD of hosts." This holiness exposes sin, demands judgment, and yet provides cleansing through substitutionary atonement symbolized by the live coal.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Judgment and salvation
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Judah faces judgment for covenant unfaithfulness, but a remnant will return. God will judge all nations, but he will also save a people for himself from every tongue and nation. Judgment clears the way for new creation.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The Suffering Servant
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Isaiah 53 presents the Servant who was pierced for our transgressions, crushed for our iniquities. He bore the sin of many and makes intercession for transgressors. The New Testament identifies Jesus as this Servant who accomplishes salvation through suffering.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Trust in God alone
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Judah is tempted to trust in political alliances rather than God. Isaiah calls them to faith: those who trust in the LORD will not be put to shame. The nations are like a drop from a bucket compared to Israel's God.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              New creation
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Isaiah concludes with the vision of new heavens and new earth where former things are not remembered. The wolf and lamb will feed together, and Jerusalem will be a joy. This vision frames the New Testament's hope and climaxes in Revelation.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Structure Overview
        </h2>

        <div className="space-y-3 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Judgment and Hope (1–39)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Oracles of judgment on Judah and the nations, the Assyrian crisis, and promises of a coming king.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Comfort and the Servant (40–55)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Comfort for exiled Israel, the incomparability of God, the Servant songs, and salvation offered freely.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Restoration and New Creation (56–66)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              True fasting and Sabbath-keeping, the Redeemer who comes to Zion, and the vision of new heavens and new earth.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Why read this book?
        </h2>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-8">
          Isaiah is quoted more frequently in the New Testament than any other prophet. Its vision of God's holiness, the Suffering Servant, and new creation provides the theological framework for understanding Jesus' identity and mission. No other book so comprehensively presents both judgment and salvation.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Begin Reading
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {divisions.map((division) => (
            <Link
              key={division.id}
              href={`/ot/isaiah/${division.id}/${division.chapters[0]}`}
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
