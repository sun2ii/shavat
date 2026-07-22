import Link from 'next/link';
import { getAllDivisions } from '@/lib/book-metadata-utils';

export const metadata = {
  title: 'Shavat | Philippians',
  description: 'Philippians - Joy in Christ through all circumstances',
};

export default function PhilippiansPage() {
  const divisions = getAllDivisions('philippians');

  return (
    <main className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-[rgb(var(--text-primary))] mb-6">
          Philippians
        </h1>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-6">
          Paul writes from prison with joy, encouraging the Philippians to rejoice in the Lord always. This letter combines personal warmth with profound Christology, presenting Jesus' humiliation and exaltation as the pattern for Christian life and the source of confidence despite suffering.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Key Themes
        </h2>

        <div className="space-y-4 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Joy in suffering
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Paul rejoices in chains because the gospel advances. Circumstances do not determine joy; Christ does. Even facing death, Paul is torn between desire to depart and be with Christ and the need to remain for the church's progress.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The mind of Christ
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Christ Jesus, though in the form of God, did not count equality with God a thing to be grasped, but emptied himself, taking the form of a servant. This hymn grounds Christian humility and service in Christ's own trajectory from glory to cross to exaltation.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Righteousness through faith
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Paul counts everything as loss for the surpassing worth of knowing Christ. His own righteousness from the law is rubbish compared to the righteousness that comes through faith in Christ. This is knowing Christ and the power of his resurrection.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Pressing toward the goal
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Not that Paul has already obtained perfection, but he presses on toward the goal for the prize of the upward call of God in Christ Jesus. Believers live between the already and the not yet, citizenship in heaven while feet remain on earth.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Structure Overview
        </h2>

        <div className="space-y-3 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Thanksgiving and Paul's Situation (1)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Joy in partnership, chains that advance the gospel, and living is Christ, dying is gain.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              The Mind of Christ (2)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Humility, the Christ hymn, Timothy and Epaphroditus as examples of service.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Knowing Christ (3)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Warning against false teachers, counting all as loss for Christ, pressing toward the goal.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Rejoice and Give Thanks (4)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Exhortations to joy, prayer, and contentment in all circumstances.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Why read this book?
        </h2>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-8">
          Philippians is the most joyful of Paul's letters, demonstrating that Christian joy is grounded not in circumstances but in Christ. The Christ hymn in chapter 2 remains central to Christian meditation, and its call to press on toward the goal encourages perseverance in faith.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Begin Reading
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {divisions.map((division) => (
            <Link
              key={division.id}
              href={`/nt/philippians/${division.id}/${division.chapters[0]}`}
              className="block p-4 border border-[rgb(var(--text-secondary))] transition-colors"
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
