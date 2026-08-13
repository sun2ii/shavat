'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MarketingNav } from '@/components/marketing/MarketingNav';

// Icon component for gold icons (no color transformation needed)
function GoldIcon({ src, alt, size = 28, scale = 1.5 }: { src: string; alt: string; size?: number; scale?: number }) {
  return (
    <div className="overflow-hidden flex items-center justify-center" style={{ width: size, height: size }}>
      <Image
        src={src}
        alt={alt}
        width={size * 4}
        height={size * 4}
        style={{ transform: `scale(${scale})` }}
      />
    </div>
  );
}

const CATEGORIES = [
  { title: 'Reading Plans', description: 'Paths through Scripture for steady daily reading.', iconSrc: '/icons/02_bible_read.png' },
  { title: 'Study Guides', description: 'Structured helps for deeper understanding.', iconSrc: '/icons/03_study.png' },
  { title: 'Theme Collections', description: 'Grouped passages connecting the bigger story.', iconSrc: '/icons/12_themes.png' },
  { title: 'Getting Started', description: 'Introductions for new readers.', iconSrc: '/icons/GettingStarted.png' },
];

const FEATURED = [
  { title: 'How to Read with Orientation', description: 'Read Scripture in context and confidence.' },
  { title: 'The Narrative Spine Guide', description: 'See how Scripture unfolds from beginning to end.' },
  { title: 'Where to Begin', description: 'Handpicked starting points for first steps.' },
];

export default function ResourcesPage() {
  return (
    <div className="font-inter min-h-screen flex flex-col bg-paper text-ink">
      {/* HERO */}
      <section className="relative h-[240px] sm:h-[280px] md:h-[340px]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/sunset.png)' }} />
        <div className="absolute inset-0 bg-black/0 dark:bg-black/40 transition-colors" />

        <MarketingNav variant="dark" />

        <div className="relative z-10 px-6 sm:px-10 md:px-[70px] pt-6 sm:pt-8 md:pt-10 max-w-[500px]">
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-[56px] font-medium text-white m-0" style={{ textShadow: '0 2px 20px rgba(15,20,12,.5)' }}>Resources</h1>
          <p className="text-sm sm:text-base md:text-[17px] leading-relaxed text-white mt-3 sm:mt-4 max-w-[380px]" style={{ textShadow: '0 1px 14px rgba(15,20,12,.55)' }}>
            Guides, tools, and curated helps to keep you oriented in Scripture.
          </p>
        </div>
      </section>

      {/* CATEGORY CARDS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-8 md:px-12 py-5 sm:py-6">
        {CATEGORIES.map((cat) => (
          <div key={cat.title} className="bg-surface dark:bg-surface border border-hairline rounded-lg p-3 sm:p-4 flex gap-2.5 sm:gap-3 items-start">
            <span className="flex-none"><GoldIcon src={cat.iconSrc} alt={cat.title} /></span>
            <div>
              <div className="font-playfair text-sm sm:text-base font-medium">{cat.title}</div>
              <div className="text-[10px] sm:text-[11px] leading-snug text-muted mt-1">{cat.description}</div>
            </div>
          </div>
        ))}
      </section>

      {/* FEATURED */}
      <section className="px-4 sm:px-8 md:px-12 py-2 sm:py-4 flex-1">
        <div className="flex flex-col md:flex-row gap-4 md:gap-5">
          <div className="md:w-[180px] lg:w-[200px] pt-2">
            <div className="text-[9px] sm:text-[10px] tracking-[2px] font-bold text-gold">FEATURED</div>
            <h2 className="font-playfair text-xl sm:text-2xl font-medium text-ink mt-2 mb-3">Curated helps</h2>
            <a href="#" className="font-playfair text-xs sm:text-[13px] text-ink border-b border-gold pb-0.5 hover:text-gold transition-colors">
              View All →
            </a>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FEATURED.map((resource) => (
              <div key={resource.title} className="bg-surface dark:bg-surface border border-hairline rounded-lg overflow-hidden">
                <div className="h-16 sm:h-20 md:h-[90px] bg-shavat-darkest flex items-center justify-center">
                  <span className="text-gold text-[9px] sm:text-[10px] tracking-wider">Image</span>
                </div>
                <div className="p-3 sm:p-4">
                  <div className="font-playfair text-sm sm:text-[15px] font-medium">{resource.title}</div>
                  <div className="text-[10px] sm:text-[11px] leading-snug text-muted mt-1">{resource.description}</div>
                  <a href="#" className="font-playfair inline-block text-[11px] sm:text-xs text-ink border-b border-gold pb-0.5 mt-2 hover:text-gold transition-colors">
                    Read →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="px-4 sm:px-8 md:px-12 pb-6 sm:pb-7">
        <div className="bg-surface dark:bg-surface border-t border-hairline rounded-lg flex flex-col sm:flex-row items-center gap-4 sm:gap-5 p-4 sm:p-5 md:px-8">
          <span className="flex-none">
            <GoldIcon src="/icons/StayRooted.png" alt="Stay rooted" size={48} scale={1.6} />
          </span>
          <div className="flex-1 text-center sm:text-left">
            <div className="font-playfair text-lg sm:text-xl md:text-[22px] font-medium text-ink">Stay rooted in the Word.</div>
            <div className="text-[11px] sm:text-xs text-muted mt-0.5">Explore resources that help you read with clarity and peace.</div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <Link href="#" className="font-playfair bg-shavat-darkest text-shavat-cream px-5 sm:px-6 py-2.5 rounded-md text-xs sm:text-sm hover:bg-shavat-dark transition-colors">
              Explore Resources
            </Link>
            <a href="#" className="font-playfair text-xs sm:text-sm text-ink border-b border-gold pb-0.5 hover:text-gold transition-colors">
              Start Reading →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
