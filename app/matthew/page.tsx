import Link from 'next/link';
import { getAllDivisions } from '@/lib/book-metadata-utils';

export const metadata = {
  title: 'Shavat | Matthew',
  description: 'The Gospel of Matthew - Jesus as the Messiah and King of Israel',
};

export default function MatthewPage() {
  const divisions = getAllDivisions('matthew');

  return (
    <main className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-light text-[rgb(var(--text-primary))] mb-6">
          Matthew
        </h1>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-6">
          Matthew presents Jesus as the promised Messiah and King of Israel, demonstrating how his life, teaching, death, and resurrection fulfill the Hebrew Scriptures. Written with a Jewish audience in view, Matthew shows Jesus as the new Moses who brings the Law to fulfillment and inaugurates the kingdom of heaven.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Key Themes
        </h2>

        <div className="space-y-4 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Fulfillment of Scripture
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Matthew repeatedly shows how Jesus fulfills Old Testament prophecy and typology. The formula "to fulfill what was spoken" appears throughout, establishing Jesus' legitimacy as the long-awaited Messiah.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The kingdom of heaven
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Matthew's distinctive phrase "kingdom of heaven" frames his gospel. Jesus both announces and embodies this kingdom, teaching its ethics, demonstrating its power, and inviting people to enter through repentance and faith.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Jesus as new Moses
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              The five major teaching discourses echo the Pentateuch's structure. Like Moses, Jesus ascends a mountain to teach, but he speaks with direct authority: "You have heard... but I say to you."
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              Righteousness and discipleship
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Matthew emphasizes a righteousness that exceeds the scribes and Pharisees, not through rule-keeping but through heart transformation. Discipleship means following Jesus in obedience, not mere profession.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))] mb-1">
              The church and mission
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Matthew is the only gospel to use the word "church." The Great Commission extends the mission beyond Israel to all nations, with the promise of Jesus' ongoing presence: "I am with you always."
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Structure Overview
        </h2>

        <div className="space-y-3 mb-8">
          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Birth and Preparation (1–4)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Genealogy, birth narrative, baptism, and temptation establish Jesus' identity and mission.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Five Teaching Discourses (5–25)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Sermon on the Mount, mission instructions, parables of the kingdom, community teaching, and end times prophecy.
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-[rgb(var(--text-primary))]">
              Passion and Resurrection (26–28)
            </h3>
            <p className="text-sm text-[rgb(var(--text-secondary))] leading-relaxed">
              Jesus' betrayal, trial, crucifixion, and resurrection, culminating in the Great Commission.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Why read this book?
        </h2>

        <p className="text-base text-[rgb(var(--text-secondary))] leading-relaxed mb-8">
          Matthew provides the most comprehensive portrait of Jesus' teaching ministry and serves as the bridge between the Old and New Testaments. Its focus on Jesus as the fulfillment of Israel's hopes makes it essential for understanding how the entire biblical story coheres in Christ.
        </p>

        <h2 className="text-xl font-light text-[rgb(var(--text-primary))] mb-4 mt-8">
          Begin Reading
        </h2>

        <div className="grid grid-cols-1 gap-3">
          {divisions.map((division) => (
            <Link
              key={division.id}
              href={`/nt/matthew/${division.id}/${division.chapters[0]}`}
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
