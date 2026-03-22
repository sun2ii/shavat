import Link from 'next/link';
import { getAllDivisions } from '@/lib/book-metadata-utils';

export const metadata = {
  title: 'Shavat | John',
  description: 'The Gospel of John - Jesus as the eternal Son of God made flesh',
};

export default function JohnPage() {
  const divisions = getAllDivisions('john');

  return (
    <main className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-[rgb(var(--text-primary))] mb-6">
          John
        </h1>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-6">
          John presents Jesus as the eternal Son of God made flesh, the one who reveals the Father and gives eternal life to those who believe. More explicitly than the Synoptic Gospels, John is written to establish the identity of Jesus and the meaning of faith in him: not mere agreement, but personal trust that leads to life.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Key Themes
        </h2>

        <div className="space-y-4 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The identity of Jesus
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              John is structured around the question of who Jesus is. He is not only the Messiah, but the preexistent Word, the Son sent from the Father, equal with God and the full disclosure of God's glory.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Belief and eternal life
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Belief is central in John, but it is never treated as bare intellectual assent. To believe in Jesus is to receive him, abide in him, and pass from death into life.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Signs and revelation
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              John selects particular miracles as "signs," not merely displays of power. Their function is revelatory: they disclose Jesus' identity and force a response of faith or unbelief.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Glory through the cross
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              In John, Jesus' death is not presented mainly as defeat before vindication, but as the hour of his glorification. The cross, resurrection, and exaltation belong together as the climactic revelation of the Son's obedience and the Father's love.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Witness, truth, and testimony
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              John repeatedly frames the gospel in legal and covenantal terms of testimony. John the Baptist, the works of Jesus, the Scriptures, the Father, and the Spirit all bear witness to Christ, leaving unbelief exposed as moral and spiritual refusal rather than lack of evidence.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Structure Overview
        </h2>

        <div className="space-y-3 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Prologue (1:1–18)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              The Word's eternal identity, incarnation, and revelation of the Father.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Book of Signs (1:19–12:50)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Public ministry, selected signs, and growing division over Jesus' identity.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Book of Glory (13:1–20:31)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Farewell discourse, passion, resurrection, and the meaning of Jesus' "hour."
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Epilogue (21:1–25)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Post-resurrection appearance in Galilee and restoration of Peter.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Why read this book?
        </h2>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-8">
          John is the most theologically explicit Gospel in the New Testament. It gives sustained attention to Christ's divine identity, the inner relation between the Father and the Son, and the meaning of belief, making it especially useful as an orienting text for reading the whole New Testament.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Begin Reading
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {divisions.map((division) => (
            <Link
              key={division.id}
              href={`/john/${division.id}/${division.chapters[0]}`}
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
