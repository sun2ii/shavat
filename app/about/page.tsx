'use client';

import Link from 'next/link';
import { MarketingNav } from '@/components/marketing/MarketingNav';

export default function AboutPage() {
  return (
    <div className="font-inter min-h-screen flex flex-col bg-paper text-ink">
      {/* HERO */}
      <section className="relative h-[240px] sm:h-[280px] md:h-[340px]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/ocean.png)' }} />
        <div className="absolute inset-0 bg-black/0 dark:bg-black/40 transition-colors" />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-paper via-paper/50 to-transparent dark:from-transparent dark:via-transparent" />

        <MarketingNav variant="light" />

        <div className="relative z-10 px-6 sm:px-10 md:px-[70px] pt-6 sm:pt-8 md:pt-10 max-w-[480px]">
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-[56px] font-medium text-ink dark:text-white m-0">About Shavat</h1>
          <div className="font-playfair italic text-sm sm:text-base md:text-lg leading-relaxed text-gold mt-3 sm:mt-4 max-w-[400px]">
            Helping readers stay oriented in Scripture with clarity, context, and peace.
          </div>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="px-4 sm:px-6 md:px-10 py-5 sm:py-6 flex-1 flex flex-col justify-center">
        <div className="bg-surface dark:bg-surface border border-hairline rounded-xl p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0">
          {/* Pillar 1 */}
          <div className="flex gap-3 sm:gap-4 md:px-4 md:border-r md:border-hairline">
            <span className="flex-none w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-shavat-darkest border border-hairline flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="stroke-gold" strokeWidth="1.1">
                <circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="1" />
                <path d="M15.5 8.5 L13 11 L11 13 L8.5 15.5 L11 11 Z M15.5 8.5 L13 13 L8.5 15.5 L13 11 Z" />
              </svg>
            </span>
            <div>
              <div className="font-playfair text-base sm:text-lg font-medium text-ink">Why Shavat Exists</div>
              <div className="text-[11px] sm:text-xs leading-relaxed text-muted mt-1.5">
                Scripture is a unified story. Shavat helps you stay oriented so every reading connects to the whole.
              </div>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="flex gap-3 sm:gap-4 md:px-4 md:border-r md:border-hairline">
            <span className="flex-none w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-shavat-darkest border border-hairline flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="stroke-gold" strokeWidth="1.1">
                <path d="M12 6 C10 4.6 7 4.3 4 5 V18 C7 17.3 10 17.6 12 19 C14 17.6 17 17.3 20 18 V5 C17 4.3 14 4.6 12 6 Z M12 6 V19" />
              </svg>
            </span>
            <div>
              <div className="font-playfair text-base sm:text-lg font-medium text-ink">What Makes It Different</div>
              <div className="text-[11px] sm:text-xs leading-relaxed text-muted mt-1.5">
                Orientation before information. We show context and connections first so the big picture comes into focus.
              </div>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="flex gap-3 sm:gap-4 md:px-4">
            <span className="flex-none w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-shavat-darkest border border-hairline flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 40 40" fill="none" className="stroke-gold" strokeWidth="1.2">
                <path d="M10 34 C18 28 24 18 30 6" />
                <path d="M15 26 C14 21 16 18 20 17 C20 22 19 25 15 26 Z M22 17 C21 12 23 9 27 8 C27 13 26 16 22 17 Z M17 31 C21 28 25 28 28 30 C24 33 20 33 17 31 Z" />
              </svg>
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
          <svg width="32" height="28" viewBox="0 0 64 52" fill="none" className="stroke-gold flex-none hidden sm:block" strokeWidth="1.3">
            <path d="M32 12 C27 8 19 7 10 9 V42 C19 40 27 41 32 45 C37 41 45 40 54 42 V9 C45 7 37 8 32 12 Z M32 12 V45" />
            <path d="M32 30 C32 24 29 21 24 21 C24 27 27 30 32 30 Z M32 27 C32 21 35 18 40 18 C40 24 37 27 32 27 Z" />
          </svg>
          <div className="font-playfair text-lg sm:text-xl md:text-2xl font-medium text-ink text-center sm:text-left">Ready to begin?</div>
          <span className="hidden sm:block bg-hairline w-px h-9 flex-none" />
          <div className="flex-1 text-xs sm:text-sm leading-relaxed text-muted text-center sm:text-left">
            Open Scripture with clarity and peace. Let Shavat guide you through the story.
          </div>
          <a href="#" className="flex-none inline-flex items-center gap-2.5 bg-shavat-darkest text-shavat-cream px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-[10px] sm:text-xs tracking-[2px] font-semibold hover:bg-shavat-dark transition-colors">
            <svg width="12" height="10" viewBox="0 0 40 32" fill="none" className="stroke-gold" strokeWidth="1.8">
              <path d="M4 28 C14 24 24 16 36 4" />
              <path d="M12 22 C11 17 13 14 17 13 C17 18 16 21 12 22 Z M20 15 C19 10 21 7 25 6 C25 11 24 14 20 15 Z" />
            </svg>
            START READING
          </a>
        </div>
      </section>
    </div>
  );
}
