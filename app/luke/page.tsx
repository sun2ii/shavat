import Link from 'next/link';
import { getAllDivisions } from '@/lib/book-metadata-utils';

export const metadata = {
  title: 'Shavat | Luke',
  description: 'The Gospel of Luke - Jesus as the Savior of all people',
};

export default function LukePage() {
  const divisions = getAllDivisions('luke');

  return (
    <main className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-[rgb(var(--text-primary))] mb-6">
          Luke
        </h1>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-6">
          Luke presents Jesus as the Savior of all people, emphasizing God's concern for the marginalized, the poor, and the outcast. Written for a Gentile audience, Luke traces Jesus' mission from his birth to his ascension as the fulfillment of God's plan to bring salvation to the ends of the earth.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Key Themes
        </h2>

        <div className="space-y-4 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Universal salvation
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Luke emphasizes that Jesus came to save all people: Jews and Gentiles, rich and poor, men and women, insiders and outcasts. Simeon declares the infant Jesus as "a light for revelation to the Gentiles."
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The Holy Spirit
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              The Spirit is active from the beginning, empowering Jesus' ministry and preparing for Pentecost in Acts. Luke uniquely shows Jesus rejoicing in the Holy Spirit and promising the Spirit to his disciples.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Prayer and worship
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Jesus prays at every turning point: baptism, before choosing the twelve, at the transfiguration, in Gethsemane. Luke includes more prayers, hymns, and scenes of worship than any other gospel.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Reversal and the kingdom
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Mary's Magnificat sets the tone: the proud scattered, the mighty brought down, the humble exalted, the hungry filled. Jesus' ministry embodies this great reversal, where the last become first.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Journey to Jerusalem
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Nearly half of Luke is set on the road to Jerusalem, where Jesus "set his face" to accomplish his exodus. This journey frames parables and teaching unique to Luke, including the Good Samaritan and the Prodigal Son.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Structure Overview
        </h2>

        <div className="space-y-3 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Birth Narratives (1–2)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Parallel stories of John and Jesus, emphasizing God's faithfulness to Israel and the fulfillment of promise.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Galilean Ministry (3–9:50)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Baptism, temptation, teaching, miracles, calling of disciples, and the beginning of opposition.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Journey to Jerusalem (9:51–19:27)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Extended travel narrative with parables, teaching on discipleship, and encounters with the marginalized.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Passion and Resurrection (19:28–24:53)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Jerusalem ministry, Last Supper, crucifixion, resurrection appearances, and ascension.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Why read this book?
        </h2>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-8">
          Luke's emphasis on the marginalized and his careful historical grounding make this gospel essential for understanding Jesus' mission to all people. As the first volume of Luke-Acts, it establishes the foundation for how the gospel spreads from Jerusalem to the ends of the earth.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Begin Reading
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {divisions.map((division) => (
            <Link
              key={division.id}
              href={`/luke/${division.id}/${division.chapters[0]}`}
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
