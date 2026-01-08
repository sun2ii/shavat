import { notFound, redirect } from 'next/navigation';
import { getChapter } from '@/lib/psalms';
import { getCollectionById, getCollectionByPsalm } from '@/lib/psalms-collections';
import GenesisReader from '@/components/GenesisReader';
import ChapterNavPsalm from '@/components/ChapterNavPsalm';

interface Props {
  params: {
    slug: string[];
  };
}

export default function PsalmsPage({ params }: Props) {
  const { slug } = params;

  // Handle /psalms/[psalm] (legacy numeric route)
  if (slug.length === 1) {
    const psalmNum = parseInt(slug[0]);

    if (!isNaN(psalmNum) && psalmNum >= 1 && psalmNum <= 150) {
      const collection = getCollectionByPsalm(psalmNum);
      if (collection) {
        redirect(`/psalms/${collection.id}/${psalmNum}`);
      }
    }

    // Check if it's a collection ID (redirect to first psalm)
    const collection = getCollectionById(slug[0]);
    if (collection) {
      redirect(`/psalms/${collection.id}/${collection.psalms[0]}`);
    }

    // Invalid: redirect to library
    redirect('/');
  }

  // Handle /psalms/[collection]/[psalm]
  if (slug.length === 2) {
    const [collectionId, psalmStr] = slug;
    const psalmNum = parseInt(psalmStr);
    const collection = getCollectionById(collectionId);

    // Invalid collection → redirect to library
    if (!collection) {
      redirect('/');
    }

    // Invalid psalm number
    if (isNaN(psalmNum)) {
      redirect(`/psalms/${collectionId}/${collection.psalms[0]}`);
    }

    // Psalm not in this collection → redirect to correct collection
    if (!collection.psalms.includes(psalmNum)) {
      const correctCollection = getCollectionByPsalm(psalmNum);
      if (correctCollection) {
        redirect(`/psalms/${correctCollection.id}/${psalmNum}`);
      }
      redirect('/');
    }

    const verses = getChapter(psalmNum);

    if (!verses) {
      notFound();
    }

    return (
      <main>
        <ChapterNavPsalm
          currentPsalm={psalmNum}
          collection={collection}
        />
        <GenesisReader verses={verses} />
      </main>
    );
  }

  // Too many segments
  redirect('/');
}
