import Link from 'next/link';
import { getAllDivisions } from '@/lib/book-metadata-utils';

export const metadata = {
  title: 'Shavat | Galatians',
  description: 'Galatians - Freedom in Christ and the gospel of grace',
};

export default function GalatiansPage() {
  const divisions = getAllDivisions('galatians');

  return (
    <main className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-[rgb(var(--text-primary))] mb-6">
          Galatians
        </h1>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-6">
          Paul writes to churches abandoning the gospel of grace for a gospel of works. Galatians defends justification by faith alone, arguing that adding circumcision or law-keeping to Christ nullifies grace and severs one from Christ. This passionate letter became the charter of Christian freedom and fueled the Protestant Reformation.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Key Themes
        </h2>

        <div className="space-y-4 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Justification by faith alone
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              A person is not justified by works of the law but through faith in Jesus Christ. To add any requirement to faith is to preach a different gospel and fall from grace.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Freedom in Christ
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              For freedom Christ has set us free. Believers are no longer under the law's condemnation or slavery to sin. This freedom is not license for the flesh but liberation to walk by the Spirit.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The Spirit versus the flesh
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              The law cannot produce righteousness; only the Spirit can. Those who walk by the Spirit produce the fruit of love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The law's purpose
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              The law was our guardian until Christ came, showing us our sin and our need for a Savior. Now that faith has come, we are no longer under a guardian but are children of God through faith.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              One people in Christ
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              In Christ there is neither Jew nor Greek, slave nor free, male nor female. All who belong to Christ are Abraham's offspring, heirs according to promise, united by faith not ethnicity.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Structure Overview
        </h2>

        <div className="space-y-3 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Personal Defense (1–2)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Paul's apostolic authority and confrontation with Peter over the gospel.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Theological Argument (3–4)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Faith versus works, Abraham's example, the law's purpose, and adoption as sons.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Practical Application (5–6)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Freedom in Christ, walking by the Spirit, and bearing one another's burdens.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Why read this book?
        </h2>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-8">
          Galatians is the clearest defense of justification by faith alone in the New Testament. Its argument against legalism and for Christian freedom remains essential for every generation tempted to add human requirements to God's grace.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Begin Reading
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {divisions.map((division) => (
            <Link
              key={division.id}
              href={`/nt/galatians/${division.id}/${division.chapters[0]}`}
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
