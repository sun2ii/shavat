import { notFound, redirect } from 'next/navigation';
import { getChapter, getChapterCount } from '@/lib/genesis';
import GenesisReader from '@/components/GenesisReader';
import ChapterNav from '@/components/ChapterNav';

interface Props {
  params: {
    chapter: string;
  };
}

export default function GenesisChapterPage({ params }: Props) {
  const chapterNum = parseInt(params.chapter);

  // Invalid chapter number → redirect to Genesis 1
  if (isNaN(chapterNum) || chapterNum < 1 || chapterNum > 50) {
    redirect('/genesis/1');
  }

  const verses = getChapter(chapterNum);

  // Missing verse data → show error
  if (!verses) {
    notFound();
  }

  return (
    <main>
      <ChapterNav currentChapter={chapterNum} totalChapters={getChapterCount()} />
      <GenesisReader chapter={chapterNum} verses={verses} />
    </main>
  );
}
