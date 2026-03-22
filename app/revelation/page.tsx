import Link from 'next/link';
import { getAllDivisions } from '@/lib/book-metadata-utils';

export const metadata = {
  title: 'Shavat | Revelation',
  description: 'Revelation - The unveiling of Jesus Christ and the consummation of all things',
};

export default function RevelationPage() {
  const divisions = getAllDivisions('revelation');

  return (
    <main className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-[rgb(var(--text-primary))] mb-6">
          Revelation
        </h1>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-6">
          Revelation unveils Jesus Christ as the triumphant Lamb who was slain, now reigning and returning to judge the living and the dead. Written to churches facing persecution, this apocalyptic vision assures believers that history is moving toward Christ's victory, the judgment of evil, and the renewal of all things.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Key Themes
        </h2>

        <div className="space-y-4 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The revelation of Jesus Christ
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Revelation is not primarily about the future but about Jesus: the Alpha and Omega, the faithful witness, the Lamb who was slain, the rider on the white horse. Every vision centers on Christ's glory, authority, and victory.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Worship and the throne room
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Heaven is depicted as the throne room where God and the Lamb are worshiped. The church's earthly worship joins the heavenly chorus, and this vision reorients believers under pressure to compromise: only God and the Lamb are worthy of worship.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Judgment on evil
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              The seals, trumpets, and bowls depict God's righteous judgment on a rebellious world. Babylon the great falls, the beast is defeated, and death itself is thrown into the lake of fire. God will vindicate his people and judge their oppressors.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Faithfulness under persecution
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              The seven churches receive commendations and warnings. Believers are called to endure, resist compromise, and overcome through the blood of the Lamb and the word of their testimony, loving not their lives even unto death.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              New creation
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Revelation culminates not in the destruction of creation but its renewal. The new heavens and new earth, the New Jerusalem descending from heaven, God dwelling with his people, and the river of life flowing from the throne complete the biblical story that began in Genesis.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Structure Overview
        </h2>

        <div className="space-y-3 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Prologue and Letters (1–3)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              John's vision of the risen Christ and letters to the seven churches.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              The Throne Room and Seals (4–7)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Heavenly worship, the Lamb takes the scroll, and the opening of the seven seals.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Trumpets and Conflict (8–14)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Seven trumpets, the dragon and the beasts, the mark of the beast, and the harvest of the earth.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Bowls and Judgment (15–20)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Seven bowls of wrath, fall of Babylon, return of Christ, final judgment, and Satan's defeat.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              New Creation (21–22)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              New heavens and new earth, the New Jerusalem, and the invitation to come.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Why read this book?
        </h2>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-8">
          Revelation completes the biblical story, showing how all of Scripture's themes converge in Christ's return and the restoration of creation. Its call to faithful witness and patient endurance remains essential for the church in every age, and its vision of worship reorients our lives around the one who is worthy.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Begin Reading
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {divisions.map((division) => (
            <Link
              key={division.id}
              href={`/revelation/${division.id}/${division.chapters[0]}`}
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
