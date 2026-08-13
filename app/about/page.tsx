'use client';

import Link from 'next/link';
import { MarketingNav } from '@/components/marketing/MarketingNav';
import { NormalizedIcon } from '@/components/ui/NormalizedIcon';

export default function AboutPage() {
  return (
    <div className="font-inter min-h-screen flex flex-col bg-paper text-ink">
      {/* HERO */}
      <section className="relative h-[240px] sm:h-[280px] md:h-[340px]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/ocean.webp)' }} />
        <div className="absolute inset-0 bg-black/0 dark:bg-black/40 transition-colors" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-paper via-paper/50 to-transparent dark:from-transparent dark:via-transparent" />

        <MarketingNav variant="light" />

        <div className="relative z-10 px-6 sm:px-10 md:px-[70px] pt-6 sm:pt-8 md:pt-10 max-w-[500px]">
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-[56px] font-medium text-white m-0" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>About Shavat</h1>
          <p className="font-playfair italic font-semibold text-sm sm:text-base md:text-[17px] leading-relaxed text-gold mt-3 sm:mt-4 max-w-[380px]" style={{ textShadow: '0 1px 14px rgba(0,0,0,0.4)' }}>
            Helping readers stay oriented in Scripture with clarity, context, and peace.
          </p>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="px-4 sm:px-6 md:px-10 py-5 sm:py-6 flex-1 flex flex-col justify-center">
        <div className="bg-surface dark:bg-surface border border-hairline rounded-xl p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0">
          {/* Pillar 1 */}
          <div className="flex items-center gap-3 sm:gap-4 md:px-4 md:border-r md:border-hairline">
            <span className="flex-none w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-shavat-darkest border border-hairline flex items-center justify-center">
              <NormalizedIcon src="/icons/about/whyshavatexists.webp" alt="Why Shavat Exists" width={24} height={24} />
            </span>
            <div>
              <div className="font-playfair text-base sm:text-lg font-medium text-ink">Why Shavat Exists</div>
              <div className="text-[11px] sm:text-xs leading-relaxed text-muted mt-1.5">
                Scripture is a unified story. Shavat helps you stay oriented so every reading connects to the whole.
              </div>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex items-center gap-3 sm:gap-4 md:px-4 md:border-r md:border-hairline">
            <span className="flex-none w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-shavat-darkest border border-hairline flex items-center justify-center">
              <NormalizedIcon src="/icons/about/whatmakesitdifferent.webp" alt="What Makes It Different" width={24} height={24} />
            </span>
            <div>
              <div className="font-playfair text-base sm:text-lg font-medium text-ink">What Makes It Different</div>
              <div className="text-[11px] sm:text-xs leading-relaxed text-muted mt-1.5">
                Orientation before information. We show context and connections first so the big picture comes into focus.
              </div>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="flex items-center gap-3 sm:gap-4 md:px-4">
            <span className="flex-none w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-shavat-darkest border border-hairline flex items-center justify-center">
              <NormalizedIcon src="/icons/about/builttoservethetext.webp" alt="Built to Serve the Text" width={24} height={24} />
            </span>
            <div>
              <div className="font-playfair text-base sm:text-lg font-medium text-ink">Built to Serve the Text</div>
              <div className="text-[11px] sm:text-xs leading-relaxed text-muted mt-1.5">
                Calm, uncluttered, and ad-free. Every feature is designed to serve Scripture, never to distract.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE ROW */}
      <section className="px-4 sm:px-8 md:px-24 py-4 flex flex-col md:flex-row md:items-center gap-4 md:gap-0">
        <div className="text-center md:text-left md:flex-1 md:pr-6 md:border-r md:border-hairline">
          <div className="font-playfair italic text-xl sm:text-2xl md:text-[26px] font-medium text-ink">
            &quot;Know where you are in Scripture.&quot;
          </div>
        </div>
        <div className="md:flex-1 md:pl-6">
          <div className="font-playfair italic text-xs sm:text-sm leading-relaxed text-muted text-center md:text-left">
            When you know where you are, you read with confidence. When you see the whole, you understand more deeply.
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="px-4 sm:px-8 md:px-12 pb-6 sm:pb-7">
        <div className="bg-surface dark:bg-surface border border-hairline rounded-lg flex flex-col sm:flex-row items-center gap-4 sm:gap-5 p-4 sm:p-5 md:px-8">
          <span className="flex-none hidden sm:block">
            <NormalizedIcon src="/icons/about/readytobegin.webp" alt="Ready to begin" width={32} height={28} />
          </span>
          <div className="font-playfair text-lg sm:text-xl md:text-2xl font-medium text-ink text-center sm:text-left">Ready to begin?</div>
          <span className="hidden sm:block bg-hairline w-px h-9 flex-none" />
          <div className="flex-1 text-xs sm:text-sm leading-relaxed text-muted text-center sm:text-left">
            Open Scripture with clarity and peace. Let Shavat guide you through the story.
          </div>
          <a href="#" className="flex-none inline-flex items-center gap-2.5 bg-shavat-darkest text-shavat-cream px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-[10px] sm:text-xs tracking-[2px] font-semibold hover:bg-shavat-dark transition-colors">
            <NormalizedIcon src="/icons/general/laurel.webp" alt="" width={18} height={16} />
            START READING
          </a>
        </div>
      </section>
    </div>
  );
}
