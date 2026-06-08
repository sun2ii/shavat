import Link from 'next/link';
import { getAllDivisions } from '@/lib/book-metadata-utils';

export const metadata = {
  title: 'Shavat | Acts',
  description: 'Acts - The spread of the gospel from Jerusalem to Rome',
};

export default function ActsPage() {
  const divisions = getAllDivisions('acts');

  return (
    <main className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-[rgb(var(--text-primary))] mb-6">
          Acts
        </h1>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-6">
          Acts chronicles the explosive growth of the early church from a small band of disciples in Jerusalem to a multiethnic movement reaching Rome itself. Luke presents the continuing work of the risen Christ through the Holy Spirit, demonstrating how the gospel transcends ethnic and social boundaries.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Key Themes
        </h2>

        <div className="space-y-4 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The Holy Spirit's power
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Pentecost inaugurates the age of the Spirit, fulfilling Joel's prophecy. The Spirit empowers witness, guides mission strategy, and manifests Christ's presence in the church. Acts could be titled "The Acts of the Holy Spirit."
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Witness to the ends of the earth
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              "You will be my witnesses in Jerusalem and in all Judea and Samaria, and to the end of the earth." This programmatic verse structures Acts as the gospel spreads geographically and culturally from Jewish Jerusalem to Gentile Rome.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The resurrection and apostolic preaching
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Every sermon in Acts centers on Jesus' death and resurrection as the fulfillment of Scripture and the vindication of his messianic claims. The apostles are witnesses to the resurrection, and this testimony transforms lives.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The church's unity and mission
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              The early church is marked by devotion to the apostles' teaching, fellowship, breaking of bread, and prayer. Unity does not mean uniformity, but Spirit-wrought communion across ethnic and social divisions.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Opposition and suffering
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              The gospel faces constant opposition from religious and political authorities, yet persecution scatters the church and spreads the word. The pattern of suffering and vindication mirrors Jesus' own path.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Structure Overview
        </h2>

        <div className="space-y-3 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Jerusalem (1–7)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Ascension, Pentecost, early preaching, growth of the church, and Stephen's martyrdom.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Judea and Samaria (8–12)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Persecution scatters the church, Philip in Samaria, Saul's conversion, Peter and Cornelius, gospel reaches Antioch.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              To the Ends of the Earth (13–28)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Paul's missionary journeys, Jerusalem Council, churches planted throughout Asia Minor and Greece, arrest in Jerusalem, journey to Rome.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Why read this book?
        </h2>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-8">
          Acts is essential for understanding how the gospel moved from a Jewish sect to a global movement, and how the early church navigated theological and cultural challenges. It provides the historical context for reading Paul's epistles and shows the Spirit's work in forming multiethnic communities united in Christ.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Begin Reading
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {divisions.map((division) => (
            <div key={division.id}>
              <Link
                href={`/acts/${division.id}/${division.chapters[0]}`}
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

              {division.lettersWritten && division.lettersWritten.length > 0 && (
                <div className="mt-2 ml-4 pl-4 border-l border-[rgb(var(--border))]">
                  <p className="text-xs uppercase tracking-widest text-[rgb(var(--text-secondary))] opacity-50 mb-2">
                    Letters written here
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {division.lettersWritten.map((letter) => (
                      <Link
                        key={letter.slug}
                        href={`/${letter.slug}/1`}
                        className="group text-sm text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors"
                      >
                        <span className="font-medium text-[rgb(var(--text-primary))] group-hover:underline">
                          {letter.title}
                        </span>
                        {letter.note && (
                          <span className="opacity-60"> — {letter.note}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Letters written after Acts ends */}
        <div className="mt-6 ml-4 pl-4 border-l border-dashed border-[rgb(var(--border))]">
          <p className="text-xs uppercase tracking-widest text-[rgb(var(--text-secondary))] opacity-50 mb-2">
            After Acts ends
          </p>
          <p className="text-sm text-[rgb(var(--text-secondary))] opacity-70 mb-2">
            Three more letters fall after the book of Acts closes — the Pastoral Epistles, from Paul&apos;s final years:
          </p>
          <div className="flex flex-col gap-1.5">
            <Link href="/1-timothy/1" className="group text-sm text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors">
              <span className="font-medium text-[rgb(var(--text-primary))] group-hover:underline">1 Timothy</span>
              <span className="opacity-60"> — leading a church.</span>
            </Link>
            <Link href="/titus/1" className="group text-sm text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors">
              <span className="font-medium text-[rgb(var(--text-primary))] group-hover:underline">Titus</span>
              <span className="opacity-60"> — order on Crete.</span>
            </Link>
            <Link href="/2-timothy/1" className="group text-sm text-[rgb(var(--text-secondary))] hover:text-[rgb(var(--text-primary))] transition-colors">
              <span className="font-medium text-[rgb(var(--text-primary))] group-hover:underline">2 Timothy</span>
              <span className="opacity-60"> — Paul&apos;s last words.</span>
            </Link>
          </div>
          <p className="text-xs text-[rgb(var(--text-secondary))] opacity-40 mt-3 italic">
            Dates and placements follow the traditional reconstruction; a few are debated by scholars.
          </p>
        </div>
      </div>
    </main>
  );
}
