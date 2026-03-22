import Link from 'next/link';
import { getAllDivisions } from '@/lib/book-metadata-utils';

export const metadata = {
  title: 'Shavat | Deuteronomy',
  description: 'Deuteronomy - Moses\' final charge to love and obey the Lord',
};

export default function DeuteronomyPage() {
  const divisions = getAllDivisions('deuteronomy');

  return (
    <main className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-[rgb(var(--text-primary))] mb-6">
          Deuteronomy
        </h1>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-6">
          Deuteronomy presents Moses' final sermons to Israel on the edge of the Promised Land, calling the new generation to covenant faithfulness. More than law, Deuteronomy is about loving God with wholehearted devotion, making it the most frequently quoted Old Testament book in the New Testament.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Key Themes
        </h2>

        <div className="space-y-4 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The Shema and exclusive love
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              "Hear, O Israel: The LORD our God, the LORD is one. You shall love the LORD your God with all your heart and with all your soul and with all your might." Covenant relationship is grounded in love, not mere duty.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Covenant renewal
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Deuteronomy renews the Sinai covenant for the next generation, structured like ancient Near Eastern treaty documents. The pattern of law, blessing, curse, and renewal shapes how we read the entire Old Testament.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Remember and teach
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Israel must remember what God has done and teach it to their children. Memory guards against apostasy; forgetting leads to idolatry. The past becomes present through recitation and ritual.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Blessing and curse
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Obedience brings life and blessing in the land; disobedience brings curse and exile. This covenantal framework explains Israel's history and anticipates the one who would bear the curse to bring the blessing.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The prophet like Moses
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Moses promises a future prophet whom God will raise up, one who will speak God's words with authority. The New Testament identifies Jesus as this greater prophet who fulfills and surpasses Moses.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Structure Overview
        </h2>

        <div className="space-y-3 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              First Sermon: Historical Review (1–4)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Moses recounts the wilderness journey and God's faithfulness despite Israel's rebellion.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Second Sermon: The Law (5–26)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              The Ten Commandments repeated, the Shema, laws for life in the land, and worship regulations.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Third Sermon: Covenant Renewal (27–30)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Blessings and curses, prophecy of exile and restoration, and the call to choose life.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Moses' Final Acts (31–34)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Joshua commissioned, Song of Moses, Moses' blessing, and his death on Mount Nebo.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Why read this book?
        </h2>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-8">
          Deuteronomy shapes how Israel understood their identity and calling, and Jesus quotes it more than any other Old Testament book. Its emphasis on loving God wholeheartedly and its covenant framework are essential for reading both testaments.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Begin Reading
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {divisions.map((division) => (
            <Link
              key={division.id}
              href={`/deuteronomy/${division.id}/${division.chapters[0]}`}
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
