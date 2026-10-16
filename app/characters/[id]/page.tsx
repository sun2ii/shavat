import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPersonById, getAllPeople } from '@/lib/terrain';
import {
  getCharacterById,
  getAllCharacters,
  type Character,
  type ScriptureReference,
} from '@/lib/entities/characters';
import { getBookBySlug } from '@/lib/bible-index';

interface Props {
  params: Promise<{ id: string }>;
}

// Combine characters from both sources for static generation
export async function generateStaticParams() {
  const terrainPeople = getAllPeople();
  const entityCharacters = getAllCharacters();

  const allIds = new Set<string>();
  terrainPeople.forEach((p) => allIds.add(p.id));
  entityCharacters.forEach((c) => allIds.add(c.id));

  return Array.from(allIds).map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  // Try new entity system first
  const entityChar = getCharacterById(id);
  if (entityChar) {
    return {
      title: `${entityChar.name} | Shavat`,
      description: entityChar.description,
    };
  }

  // Fall back to terrain
  const terrainChar = getPersonById(id);
  if (terrainChar) {
    return {
      title: `${terrainChar.name} | Shavat`,
      description: terrainChar.description,
    };
  }

  return { title: 'Character Not Found | Shavat' };
}

function formatBookName(slug: string): string {
  const book = getBookBySlug(slug);
  return book?.name ?? slug.charAt(0).toUpperCase() + slug.slice(1);
}

function ScriptureReferenceLink({ reference }: { reference: ScriptureReference }) {
  const bookName = formatBookName(reference.book);
  const verseText = reference.verses ? `:${reference.verses}` : '';
  const label = `${bookName} ${reference.chapter}${verseText}`;
  const href = `/${reference.book}/${reference.chapter}`;

  return (
    <Link
      href={href}
      className="group block py-3 border-b border-hairline last:border-b-0 hover:bg-surface/50 -mx-3 px-3 rounded transition-colors"
    >
      <span className="font-sans text-sm font-medium text-blue-700 dark:text-blue-400 group-hover:underline">
        {label}
      </span>
      {reference.context && (
        <span className="block font-serif text-sm text-muted mt-0.5">{reference.context}</span>
      )}
    </Link>
  );
}

function EntityCharacterPage({ character }: { character: Character }) {
  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link
          href="javascript:history.back()"
          className="inline-flex items-center gap-2 font-sans text-sm text-faint hover:text-ink transition-colors mb-8"
        >
          <span>&larr;</span>
          <span>Back</span>
        </Link>

        {/* Testament badge */}
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold mb-2">
          {character.testament === 'old'
            ? 'Old Testament'
            : character.testament === 'new'
              ? 'New Testament'
              : 'Old & New Testament'}
        </p>

        {/* Name */}
        <h1 className="font-serif text-4xl font-light text-blue-700 dark:text-blue-400 mb-4">
          {character.name}
        </h1>

        {/* Role */}
        <p className="font-sans text-sm text-muted italic mb-6">{character.role}</p>

        {/* Description */}
        <p className="font-serif text-lg text-ink leading-relaxed mb-6">{character.description}</p>

        {/* Historical Background */}
        {character.historicalBackground && (
          <div className="mb-10">
            <h2 className="font-sans text-[10px] uppercase tracking-[0.2em] text-faint mb-3">
              Historical Background
            </h2>
            <p className="font-serif text-base text-muted leading-relaxed">
              {character.historicalBackground}
            </p>
          </div>
        )}

        {/* Scripture References */}
        {character.references.length > 0 && (
          <div className="border-t border-hairline pt-8">
            <h2 className="font-sans text-[10px] uppercase tracking-[0.2em] text-faint mb-4">
              Scripture References
            </h2>
            <div className="divide-y divide-hairline">
              {character.references.map((reference, i) => (
                <ScriptureReferenceLink key={i} reference={reference} />
              ))}
            </div>
          </div>
        )}

        {/* Aliases */}
        {character.aliases.length > 0 && (
          <div className="border-t border-hairline pt-8 mt-8">
            <h2 className="font-sans text-[10px] uppercase tracking-[0.2em] text-faint mb-4">
              Also Known As
            </h2>
            <div className="flex flex-wrap gap-2">
              {character.aliases.map((alias) => (
                <span
                  key={alias}
                  className="inline-block font-serif text-sm text-muted bg-surface px-3 py-1.5 rounded-lg"
                >
                  {alias}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TerrainCharacterPage({
  character,
}: {
  character: ReturnType<typeof getPersonById>;
}) {
  if (!character) return null;

  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Back link */}
        <Link
          href="javascript:history.back()"
          className="inline-flex items-center gap-2 font-sans text-sm text-faint hover:text-ink transition-colors mb-8"
        >
          <span>&larr;</span>
          <span>Back</span>
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

export default async function CharacterPage({ params }: Props) {
  const { id } = await params;

  // Try new entity system first (richer data)
  const entityChar = getCharacterById(id);
  if (entityChar) {
    return <EntityCharacterPage character={entityChar} />;
  }

  // Fall back to terrain data
  const terrainChar = getPersonById(id);
  if (terrainChar) {
    return <TerrainCharacterPage character={terrainChar} />;
  }

  notFound();
}
