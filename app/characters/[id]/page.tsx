import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPersonById, getAllPeople } from '@/lib/terrain';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const people = getAllPeople();
  return people.map((person) => ({
    id: person.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const character = getPersonById(id);
  if (!character) {
    return { title: 'Character Not Found | Shavat' };
  }
  return {
    title: `${character.name} | Shavat`,
    description: character.description,
  };
}

export default async function CharacterPage({ params }: Props) {
  const { id } = await params;
  const character = getPersonById(id);

  if (!character) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link
          href="/terrain?era=origins"
          className="inline-flex items-center gap-2 font-sans text-sm text-faint hover:text-ink transition-colors mb-8"
        >
          <span>←</span>
          <span>Back to Origins</span>
        </Link>

        {/* Scripture reference */}
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold mb-2">
          {character.scripture}
        </p>

        {/* Name */}
        <h1 className="font-serif text-4xl font-light text-[rgb(var(--speaker-1))] mb-6">
          {character.name}
        </h1>

        {/* Description */}
        <p className="font-serif text-lg text-ink leading-relaxed mb-10">
          {character.description}
        </p>

        {/* Appears in */}
        {character.backbone && character.backbone.length > 0 && (
          <div className="border-t border-hairline pt-8">
            <h2 className="font-sans text-[10px] uppercase tracking-[0.2em] text-faint mb-4">
              Appears in
            </h2>
            <div className="flex flex-wrap gap-2">
              {character.backbone.map((moment) => (
                <span
                  key={moment}
                  className="inline-block font-serif text-sm text-muted bg-tint px-3 py-1.5 rounded-lg capitalize"
                >
                  {moment}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
