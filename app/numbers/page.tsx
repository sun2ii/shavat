import Link from 'next/link';
import { getAllDivisions } from '@/lib/book-metadata-utils';

export const metadata = {
  title: 'Shavat | Numbers',
  description: 'Numbers - Wilderness wanderings and covenant faithfulness',
};

export default function NumbersPage() {
  const divisions = getAllDivisions('numbers');

  return (
    <main className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-[rgb(var(--text-primary))] mb-6">
          Numbers
        </h1>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-6">
          Numbers chronicles Israel's journey from Sinai to the border of the Promised Land, marked by repeated rebellion and God's patient discipline. The book demonstrates that entering God's rest requires faith and obedience, not mere deliverance from slavery.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Key Themes
        </h2>

        <div className="space-y-4 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Rebellion and unbelief
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Israel repeatedly rebels against God and Moses: complaining about food, rejecting the Promised Land, challenging Moses' authority. These rebellions reveal the human heart's tendency to doubt God's goodness despite his proven faithfulness.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Judgment and grace
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              God judges the exodus generation, condemning them to die in the wilderness. Yet he remains faithful to his covenant, preserving a remnant to enter the land and sustaining the people through forty years of wandering.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The holiness of God
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              The tabernacle at the center of the camp symbolizes God's presence among his people. But holiness requires reverence: Nadab and Abihu die for unauthorized worship, Korah's rebellion ends in judgment, and even Moses is barred from Canaan for dishonoring God.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Priestly mediation
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              The Levites serve as mediators between the holy God and the people, bearing the tabernacle and offering sacrifices. Aaron's budding staff confirms God's choice of the priestly line and the necessity of appointed mediation.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The wilderness as testing
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              The wilderness becomes the proving ground where Israel's faith is tested. Paul and Hebrews both use these narratives as warnings: those who began the journey did not enter God's rest because of unbelief.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Structure Overview
        </h2>

        <div className="space-y-3 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Preparation at Sinai (1–10)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Census, camp arrangement, Levitical duties, and departure from Sinai.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Journey to Kadesh (11–14)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Complaints, spies sent to Canaan, Israel's refusal to enter, and God's judgment.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Wilderness Wanderings (15–19)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Additional laws, Korah's rebellion, Aaron's staff, and the red heifer.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Journey to Moab (20–25)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Moses' sin at Meribah, death of Aaron, bronze serpent, Balaam's oracles, and apostasy at Peor.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Preparation for Conquest (26–36)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              New census, inheritance laws, Joshua commissioned, and final instructions.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Why read this book?
        </h2>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-8">
          Numbers serves as a sobering reminder that salvation is by grace through faith, and unbelief has consequences. The New Testament repeatedly uses these wilderness narratives to warn against apostasy and encourage perseverance in the faith.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Begin Reading
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {divisions.map((division) => (
            <Link
              key={division.id}
              href={`/numbers/${division.id}/${division.chapters[0]}`}
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
