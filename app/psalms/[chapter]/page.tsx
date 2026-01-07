import { notFound, redirect } from 'next/navigation';
import { getChapter, getChapterCount } from '@/lib/psalms';
import GenesisReader from '@/components/GenesisReader';
import ChapterNav from '@/components/ChapterNav';
import psalmsMetadata from '@/lib/psalms-metadata.json';
import { getDirectionArrow } from '@/lib/psalms-utils';

interface Props {
  params: {
    chapter: string;
  };
}

export default function PsalmsChapterPage({ params }: Props) {
  const chapterNum = parseInt(params.chapter);

  // Invalid chapter number → redirect to Psalm 1
  if (isNaN(chapterNum) || chapterNum < 1 || chapterNum > 150) {
    redirect('/psalms/1');
  }

  const verses = getChapter(chapterNum);

  // Missing verse data → show error
  if (!verses) {
    notFound();
  }

  // Get psalm metadata
  const psalmMeta = psalmsMetadata.psalms.find(p => p.number === chapterNum);

  return (
    <main>
      <ChapterNav
        currentChapter={chapterNum}
        totalChapters={getChapterCount()}
        bookName="Psalms"
        bookRoute="psalms"
      />

      {/* Psalm metadata */}
      {psalmMeta && (
        <div className="text-center mb-6 pb-4 border-b border-[rgb(var(--border))]">
          <div className="text-sm text-[rgb(var(--text-secondary))]">
            {getDirectionArrow(psalmMeta.directional_movement)} {psalmMeta.emotional_state}
          </div>
        </div>
      )}

      <GenesisReader verses={verses} />
    </main>
  );
}
