import { notFound, redirect } from 'next/navigation';
import { getChapterByCategoryId, getCategoryIdFromChapter, getPsalmMetadataByCategoryId } from '@/lib/psalms';
import GenesisReader from '@/components/GenesisReader';
import { getDirectionArrow } from '@/lib/psalms-utils';

interface Props {
  params: {
    slug: string;
  };
}

export default function PsalmsChapterPage({ params }: Props) {
  const { slug } = params;

  // Check if slug is a number (legacy URL)
  const numericSlug = parseInt(slug);
  if (!isNaN(numericSlug) && numericSlug >= 1 && numericSlug <= 150) {
    // Legacy redirect: /psalms/1 → /psalms/wisdom-1
    const categoryId = getCategoryIdFromChapter(numericSlug);
    if (categoryId) {
      redirect(`/psalms/${categoryId}`);
    }
  }

  // Get psalm by category ID
  const verses = getChapterByCategoryId(slug);
  const psalmMeta = getPsalmMetadataByCategoryId(slug);

  // Missing data → show error
  if (!verses || !psalmMeta) {
    notFound();
  }

  return (
    <main>
      {/* Category Header */}
      <div className="text-center mb-6 pb-4 border-b border-[rgb(var(--border))]">
        <div className="text-sm text-[rgb(var(--text-secondary))] mb-2">
          {getDirectionArrow(psalmMeta.directional_movement)} {psalmMeta.emotional_state}
        </div>
        <h1 className="text-3xl font-semibold text-[#D4AF37] mb-1 capitalize">
          {psalmMeta.emotional_state} {psalmMeta.category_number}
        </h1>
        <p className="text-sm text-[rgb(var(--text-secondary))]">
          Psalm {psalmMeta.number}
        </p>
      </div>

      <GenesisReader verses={verses} />

      {/* Back to browse link */}
      <div className="mt-8 text-center">
        <a
          href="/psalms"
          className="text-[#D4AF37] hover:underline text-sm"
        >
          ← Back to Browse
        </a>
      </div>
    </main>
  );
}
