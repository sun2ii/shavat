import Link from 'next/link';
import { getAllDivisions } from '@/lib/book-metadata-utils';

export const metadata = {
  title: 'Shavat | Mark',
  description: 'The Gospel of Mark - Jesus as the suffering Servant and Son of God',
};

export default function MarkPage() {
  const divisions = getAllDivisions('mark');

  return (
    <main className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-[rgb(var(--text-primary))] mb-6">
          Mark
        </h1>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-6">
          Mark presents Jesus as the suffering Servant who comes to give his life as a ransom for many. Fast-paced and action-oriented, Mark emphasizes what Jesus did more than what he said, moving quickly from exorcism to healing to conflict, always pressing toward the cross.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Key Themes
        </h2>

        <div className="space-y-4 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The Messianic Secret
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Jesus repeatedly commands silence after miracles and revelations of his identity. The secret is not to hide who he is but to prevent misunderstanding: he is Messiah through suffering, not military triumph.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Authority and power
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Mark opens with Jesus teaching "as one who had authority" and demonstrates this authority over demons, disease, nature, and death. Yet this power culminates not in glory but in the cross.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The way of the cross
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              "The Son of Man came not to be served but to serve, and to give his life as a ransom for many." Discipleship means taking up one's cross and following Jesus in the path of suffering.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Blindness and sight
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              The disciples consistently misunderstand Jesus' mission despite witnessing his works. Two blind men healed in chapters 8 and 10 frame the central section, symbolizing the spiritual sight needed to recognize the suffering Messiah.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Immediate action
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Mark's favorite word is "immediately," appearing over 40 times. The urgent pace reflects both the intensity of Jesus' mission and the call to decisive response.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Structure Overview
        </h2>

        <div className="space-y-3 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Galilee Ministry (1:1–8:26)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Jesus demonstrates authority through miracles and teaching, but the disciples remain blind to his identity.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              The Way to Jerusalem (8:27–10:52)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Peter's confession, three passion predictions, and teaching on discipleship as the way of the cross.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Jerusalem and the Passion (11:1–16:8)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Confrontation in the temple, apocalyptic teaching, betrayal, trial, crucifixion, and the empty tomb.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Why read this book?
        </h2>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-8">
          Mark is likely the earliest gospel and provides the template for Matthew and Luke. Its relentless focus on the cross makes it the most vivid presentation of Jesus as the suffering Servant who calls his followers to the same path of self-denial and sacrifice.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Begin Reading
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {divisions.map((division) => (
            <Link
              key={division.id}
              href={`/mark/${division.id}/${division.chapters[0]}`}
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
