'use client';

import Link from 'next/link';
import { MarketingNav } from '@/components/marketing/MarketingNav';

export default function FeaturesPage() {
  return (
    <div className="font-inter bg-paper text-ink">
      {/* HERO - matching home page structure exactly */}
      <section className="relative h-[280px] sm:h-[320px] md:h-[340px]">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/heirloom-farms-2.png)' }} />
        <div className="absolute inset-0 bg-black/0 dark:bg-black/40 transition-colors" />

        <MarketingNav variant="dark" />

        {/* Hero content */}
        <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-11 pt-8 sm:pt-6 md:pt-6 max-w-[560px]">
          <h1 className="font-playfair text-3xl sm:text-[36px] md:text-[42px] leading-tight font-semibold text-white m-0" style={{ textShadow: '0 2px 24px rgba(0,0,0,0.45)' }}>
            Features
          </h1>
          <div className="text-sm sm:text-[15px] leading-relaxed text-white mt-2 sm:mt-2.5" style={{ textShadow: '0 1px 14px rgba(0,0,0,0.55)' }}>
            The core tools you need to stay oriented in Scripture.
          </div>
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gold" strokeWidth="1.2">
                  <path d="M12 6 C10 4.6 7 4.3 4 5 V18 C7 17.3 10 17.6 12 19 C14 17.6 17 17.3 20 18 V5 C17 4.3 14 4.6 12 6 Z M12 6 V19" />
                </svg>
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
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gold" strokeWidth="1.2">
                  <path d="M3 12 H8 M11.5 12 H12.5 M16 12 H21" />
                  <circle cx="9.8" cy="12" r="1.8" />
                  <circle cx="14.2" cy="12" r="1.8" />
                </svg>
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
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gold" strokeWidth="1.2">
                  <path d="M12 4 L20 8.5 L12 13 L4 8.5 Z M4 12 L12 16.5 L20 12 M4 15.5 L12 20 L20 15.5" />
                </svg>
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
            <svg width="32" height="28" viewBox="0 0 54 48" fill="none" stroke="currentColor" className="text-gold flex-none hidden sm:block" strokeWidth="1.4">
              <path d="M8 44 C18 38 30 26 46 8" />
              <path d="M18 34 C16 27 19 22 25 21 C25 28 23 32 18 34 Z M30 22 C28 15 31 10 37 9 C37 16 35 20 30 22 Z M24 40 C29 36 34 36 38 39 C33 43 28 43 24 40 Z" />
            </svg>
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
