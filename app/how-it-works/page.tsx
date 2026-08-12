'use client';

import Link from 'next/link';
import { MarketingNav } from '@/components/marketing/MarketingNav';

const STEPS = [
  { number: 1, title: 'Read', description: 'Read the full text of Scripture.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gold" strokeWidth="1.3"><path d="M12 6 C10 4.6 7 4.3 4 5 V18 C7 17.3 10 17.6 12 19 C14 17.6 17 17.3 20 18 V5 C17 4.3 14 4.6 12 6 Z M12 6 V19 M15 8 V12 L16.5 11 L18 12 V7.4" /></svg> },
  { number: 2, title: 'Explore', description: 'Use the Timeline to explore biblical history.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gold" strokeWidth="1.3"><path d="M12 3 C13.9 3 15.5 4.6 15.5 6.5 C15.5 9 12 12 12 12 C12 12 8.5 9 8.5 6.5 C8.5 4.6 10.1 3 12 3 Z" /><circle cx="12" cy="6.5" r="1.2" /><path d="M12 12 V15 M12 15 H6.5 V18 M12 15 H17.5 V18" /><circle cx="6.5" cy="19.5" r="1.6" /><circle cx="17.5" cy="19.5" r="1.6" /></svg> },
  { number: 3, title: 'Connect', description: 'Use the Spine to see how books fit together.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gold" strokeWidth="1.3"><path d="M12 6 C10 4.6 7 4.3 4 5 V18 C7 17.3 10 17.6 12 19 C14 17.6 17 17.3 20 18 V5 C17 4.3 14 4.6 12 6 Z M12 6 V19 M6.5 9 C8 8.6 9.5 8.7 11 9.3 M13 9.3 C14.5 8.7 16 8.6 17.5 9 M6.5 12 C8 11.6 9.5 11.7 11 12.3 M13 12.3 C14.5 11.7 16 11.6 17.5 12" /></svg> },
  { number: 4, title: 'Grow', description: 'Return to Scripture each day with clarity.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gold" strokeWidth="1.3"><path d="M12 20 V10 M12 13 C12 9 9.5 7 6 7 C6 11 8.5 13 12 13 Z M12 10 C12 6.5 14.5 4.5 18 4.5 C18 8.5 15.5 10.5 12 10.5 Z M5 20 C7.5 18.5 9.5 18 12 18 C14.5 18 16.5 18.5 19 20" /></svg> },
];

export default function HowItWorksPage() {
  return (
    <div className="font-inter bg-paper text-ink">
      {/* HERO - matching home page structure exactly */}
      <section className="relative h-[280px] sm:h-[320px] md:h-[340px]">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/davis.png)' }} />
        <div className="absolute inset-0 bg-black/0 dark:bg-black/40 transition-colors" />

        <MarketingNav variant="dark" />

        {/* Hero content */}
        <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-11 pt-8 sm:pt-6 md:pt-6 max-w-[560px]">
          <h1 className="font-playfair text-3xl sm:text-[36px] md:text-[42px] leading-tight font-semibold text-white m-0" style={{ textShadow: '0 2px 24px rgba(0,0,0,0.45)' }}>
            How It Works
          </h1>
          <div className="text-sm sm:text-[15px] leading-relaxed text-white mt-2 sm:mt-2.5" style={{ textShadow: '0 1px 14px rgba(0,0,0,0.55)' }}>
            Shavat helps you engage with Scripture in a clear, meaningful, and connected way.
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <div className="px-4 sm:px-6 md:px-6 py-4 sm:py-5">
        {/* STEPS */}
        <section className="text-center">
          <div className="text-[10px] sm:text-[11px] tracking-[3px] font-semibold text-ink">A SIMPLE 4-STEP PATH</div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-4 mt-5 relative">
            {/* Dotted line */}
            <div className="hidden sm:block absolute top-11 left-[12.5%] right-[12.5%] border-t-2 border-dotted border-hairline" />

            {STEPS.map((step) => (
              <div key={step.number} className="relative flex flex-col items-center">
                <span className="font-playfair w-6 h-6 rounded-full bg-gold text-shavat-cream flex items-center justify-center text-xs mb-1.5">{step.number}</span>
                <span className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-shavat-darkest border-2 border-surface outline outline-1 outline-hairline flex items-center justify-center">{step.icon}</span>
                <div className="font-playfair text-base sm:text-lg md:text-xl font-medium mt-2.5">{step.title}</div>
                <div className="text-[10px] sm:text-xs leading-relaxed text-muted mt-1 max-w-[160px] sm:max-w-[180px]">{step.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FREE VERSION BANNER */}
        <section className="mt-8">
          <div className="relative bg-surface border border-hairline rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
            <span className="flex-none w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-shavat-darkest flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gold" strokeWidth="1.3">
                <path d="M4 9 L7.5 12 L12 6.5 L16.5 12 L20 9 L18.5 17 H5.5 Z M5.5 17 H18.5" />
              </svg>
            </span>
            <div className="flex-1 text-center sm:text-left">
              <div className="font-playfair text-lg sm:text-xl md:text-[22px] font-medium text-ink">You are using the Free Version.</div>
              <div className="text-xs sm:text-[13px] leading-relaxed text-muted mt-1">
                Upgrade to Shavat Premium for deeper insights, devotionals, journaling, highlights, and more.
              </div>
            </div>
            <Link href="/pricing" className="flex-none bg-shavat-darkest text-shavat-cream px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-[10px] sm:text-[11px] tracking-[2px] font-semibold hover:bg-shavat-dark transition-colors">
              VIEW PREMIUM
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
