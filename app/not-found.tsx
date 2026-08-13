import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[rgb(var(--bg-primary))] px-6">
      <div className="text-center max-w-lg">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/logo.webp"
            alt="Shavat"
            width={80}
            height={80}
            className="mx-auto opacity-60"
          />
        </div>

        {/* 404 Number */}
        <div className="font-playfair text-[120px] leading-none font-semibold text-[rgb(var(--gold))] opacity-30 select-none">
          404
        </div>

        {/* Message */}
        <h1 className="font-playfair text-2xl font-semibold text-[rgb(var(--text-primary))] mt-4 mb-3">
          Page Not Found
        </h1>

        <p className="text-[rgb(var(--text-secondary))] font-cardo text-lg leading-relaxed mb-2">
          "Ask, and it will be given to you; seek, and you will find."
        </p>
        <p className="text-[rgb(var(--text-tertiary))] text-sm mb-8">
          Matthew 7:7
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px w-12 bg-[rgb(var(--border))]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--gold))]" />
          <div className="h-px w-12 bg-[rgb(var(--border))]" />
        </div>

        {/* Action */}
        <p className="text-[rgb(var(--text-tertiary))] text-sm mb-6">
          The page you seek does not exist here.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[rgb(var(--brand))] text-[rgb(var(--bg-primary))] rounded-lg font-medium text-sm hover:bg-[rgb(var(--brand-hover))] transition-colors"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
