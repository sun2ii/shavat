import Link from 'next/link';
import { getAllDivisions } from '@/lib/book-metadata-utils';

export const metadata = {
  title: 'Shavat | Romans',
  description: 'Romans - The righteousness of God revealed in the gospel',
};

export default function RomansPage() {
  const divisions = getAllDivisions('romans');

  return (
    <main className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-[rgb(var(--text-primary))] mb-6">
          Romans
        </h1>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-6">
          Romans is Paul's most systematic presentation of the gospel, demonstrating how God's righteousness is revealed in Christ for both Jews and Gentiles. This letter has shaped Christian theology more than any other New Testament book, grounding the church's understanding of sin, justification, sanctification, and God's faithfulness to his promises.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Key Themes
        </h2>

        <div className="space-y-4 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The righteousness of God
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              God's righteousness is both his covenant faithfulness and the status he grants to those who believe. The gospel reveals how God can be both just and the justifier of the ungodly through faith in Christ.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Justification by faith
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              No one is justified by works of the law, for all have sinned. Justification comes through faith in Christ, who died for the ungodly and rose for our justification. Abraham believed God, and it was counted to him as righteousness.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Union with Christ
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Believers are united to Christ in his death and resurrection. This union means death to sin and life to God, freedom from condemnation, and assurance that nothing can separate us from God's love in Christ.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Israel and the Gentiles
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Chapters 9–11 address Israel's unbelief and God's faithfulness to his promises. God has not rejected his people; a remnant is saved by grace, and all Israel will be saved when the fullness of the Gentiles comes in.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The Christian life
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Chapters 12–16 ground ethics in gospel indicatives: present your bodies as living sacrifices, love genuinely, live at peace, welcome the weak, and pursue what builds up the church. Theology always serves doxology and obedience.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Structure Overview
        </h2>

        <div className="space-y-3 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Introduction and Theme (1:1–17)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              The gospel as the power of God for salvation and the revelation of God's righteousness.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Sin and Judgment (1:18–3:20)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              All are under sin, both Gentiles and Jews, and accountable before God.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Justification by Faith (3:21–5:21)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Righteousness through faith in Christ, peace with God, and grace reigning through righteousness.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Sanctification and Assurance (6–8)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Death to sin, life in the Spirit, and the assurance of God's love in Christ.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Israel and God's Plan (9–11)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              God's sovereignty, Israel's unbelief, and the mystery of salvation history.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Christian Living (12–16)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Living sacrifices, love, submission to authorities, welcoming the weak, and Paul's ministry plans.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Why read this book?
        </h2>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-8">
          Romans is foundational for Christian theology and has sparked every major reformation in church history. Its systematic treatment of sin, grace, faith, and the Christian life makes it essential for understanding the gospel and its implications for both doctrine and practice.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Begin Reading
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {divisions.map((division) => (
            <Link
              key={division.id}
              href={`/romans/${division.id}/${division.chapters[0]}`}
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
