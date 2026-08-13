'use client';

import Link from 'next/link';
import { MarketingNav } from '@/components/marketing/MarketingNav';
import { NormalizedIcon } from '@/components/ui/NormalizedIcon';

export default function FeaturesPage() {
  return (
    <div className="font-inter bg-paper text-ink">
      {/* HERO - matching home page structure exactly */}
      <section className="relative h-[280px] sm:h-[320px] md:h-[340px]">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/heirloom-farms-2.webp)' }} />
        <div className="absolute inset-0 bg-black/0 dark:bg-black/40 transition-colors" />

        <MarketingNav variant="dark" />

        {/* Hero content */}
        <div className="relative z-10 px-6 sm:px-10 md:px-[70px] pt-6 sm:pt-8 md:pt-10 max-w-[500px]">
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-[56px] font-medium text-white m-0" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>
            Features
          </h1>
          <p className="font-playfair italic font-semibold text-sm sm:text-base md:text-[17px] leading-relaxed text-gold mt-3 sm:mt-4 max-w-[380px]" style={{ textShadow: '0 1px 14px rgba(0,0,0,0.4)' }}>
            The core tools you need to stay oriented in Scripture.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <div className="px-4 sm:px-6 md:px-6 py-4 sm:py-5">
        {/* FREE VERSION */}
        <section className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 sm:w-20 bg-gold" />
            <span className="text-[10px] sm:text-[11px] tracking-[2.5px] font-semibold text-gold">FREE VERSION INCLUDES</span>
            <span className="h-px w-10 sm:w-20 bg-gold" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6 mt-6">
            {/* Bible */}
            <div className="flex flex-col items-center">
              <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-shavat-darkest border-2 border-gold flex items-center justify-center">
                <NormalizedIcon src="/icons/features/bible.webp" alt="Bible" width={32} height={32} />
              </span>
              <div className="font-playfair text-lg sm:text-[22px] font-semibold mt-2.5">Bible</div>
              <span className="h-0.5 w-8 bg-gold my-1.5" />
              <div className="text-[10px] sm:text-[11px] tracking-wider leading-relaxed text-muted font-semibold max-w-[220px]">
                READ THE FULL TEXT OF SCRIPTURE
              </div>
            </div>

            {/* Timeline */}
            <div className="flex flex-col items-center">
              <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-shavat-darkest border-2 border-gold flex items-center justify-center">
                <NormalizedIcon src="/icons/features/timeline.webp" alt="Timeline" width={32} height={32} />
              </span>
              <div className="font-playfair text-lg sm:text-[22px] font-semibold mt-2.5">Timeline</div>
              <span className="h-0.5 w-8 bg-gold my-1.5" />
              <div className="text-[10px] sm:text-[11px] tracking-wider leading-relaxed text-muted font-semibold max-w-[240px]">
                EXPLORE BIBLICAL HISTORY IN CHRONOLOGICAL ORDER
              </div>
            </div>

            {/* Spine */}
            <div className="flex flex-col items-center">
              <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-shavat-darkest border-2 border-gold flex items-center justify-center">
                <NormalizedIcon src="/icons/features/spine.webp" alt="Spine" width={32} height={32} />
              </span>
              <div className="font-playfair text-lg sm:text-[22px] font-semibold mt-2.5">Spine</div>
              <span className="h-0.5 w-8 bg-gold my-1.5" />
              <div className="text-[10px] sm:text-[11px] tracking-wider leading-relaxed text-muted font-semibold max-w-[240px]">
                SEE HOW THE BOOKS FIT TOGETHER AS ONE STORY
              </div>
            </div>
          </div>
        </section>

        {/* PREMIUM BAND */}
        <section className="mt-8">
          <div className="bg-surface border border-hairline rounded-lg flex flex-col sm:flex-row items-center gap-4 sm:gap-5 p-4 sm:p-5 md:px-7">
            <NormalizedIcon src="/icons/general/laurel.webp" alt="" width={32} height={28} className="flex-none hidden sm:block" />
            <div className="flex-1 text-xs sm:text-sm leading-relaxed text-muted text-center sm:text-left">
              More tools and deeper insights are available with <strong className="text-ink">Shavat Premium</strong>. Upgrade anytime to unlock the full experience.
            </div>
            <Link href="/pricing" className="flex-none bg-shavat-darkest text-shavat-cream px-5 sm:px-7 py-2.5 sm:py-3 rounded-md text-[10px] sm:text-[11px] tracking-[2px] font-semibold hover:bg-shavat-dark transition-colors">
              VIEW PREMIUM
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
