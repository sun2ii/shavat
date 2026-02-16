import Link from 'next/link';
import { TopLevelCategory } from '@/lib/top-level-categories';

interface CategoryCardProps {
  category: TopLevelCategory;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/${category.slug}`}
      className="block p-6 rounded-lg border border-gray-700 bg-gray-800 hover:bg-gray-750 transition-colors"
    >
      <h2 className="text-2xl font-bold mb-2 text-gold">{category.name}</h2>
      <p className="text-gray-300 mb-3">{category.description}</p>
      <p className="text-sm text-gray-400">
        {category.bookCount} {category.bookCount === 1 ? 'book' : 'books'}
      </p>
    </Link>
  );
}
