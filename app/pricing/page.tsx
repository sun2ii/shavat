'use client';

import Link from 'next/link';
import { MarketingNav } from '@/components/marketing/MarketingNav';

const FREE_FEATURES = ['Bible / Read', 'Timeline', 'Spine', 'Orientation tools', 'Search', 'Web + mobile'];
const PREMIUM_FEATURES = ['Highlights', 'Bookmarks', 'Journal / notes', 'Daily devotionals', 'Guide questions', 'Reading plans'];

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="stroke-gold flex-none" strokeWidth="1.3">
      <circle cx="8" cy="8" r="7" />
      <path d="M5 8.2 L7.2 10.2 L11 5.8" />
    </svg>
  );
}

export default function PricingPage() {
  return (
    <div className="font-inter min-h-screen flex flex-col bg-paper text-ink">
      {/* HERO */}
      <section className="relative h-[240px] sm:h-[280px] md:h-[340px]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/sky.png)' }} />
        <div className="absolute inset-0 bg-black/0 dark:bg-black/40 transition-colors" />

        <MarketingNav variant="dark" />

        <div className="relative z-10 px-6 sm:px-10 md:px-[70px] pt-6 sm:pt-8 md:pt-10 max-w-[500px]">
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-[56px] font-medium text-white m-0" style={{ textShadow: '0 2px 20px rgba(12,18,10,.5)' }}>Pricing</h1>
          <p className="text-sm sm:text-base md:text-[17px] leading-relaxed text-white mt-3 sm:mt-4 max-w-[380px]" style={{ textShadow: '0 1px 14px rgba(12,18,10,.55)' }}>
            Choose the path that helps you stay oriented in Scripture.
          </p>
        </div>
      </section>

      {/* PLANS */}
      <section className="flex flex-col sm:flex-row justify-center gap-5 sm:gap-6 md:gap-7 px-4 sm:px-8 md:px-12 py-6 sm:py-6 items-center sm:items-start flex-1">
        {/* FREE PLAN */}
        <div className="w-full max-w-[300px] sm:w-[260px] md:w-[280px] bg-surface dark:bg-surface border border-hairline rounded-xl p-5 sm:p-6 text-center">
          <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-shavat-darkest inline-flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="stroke-gold" strokeWidth="1.3">
              <path d="M12 6 C10 4.6 7 4.3 4 5 V18 C7 17.3 10 17.6 12 19 C14 17.6 17 17.3 20 18 V5 C17 4.3 14 4.6 12 6 Z M12 6 V19" />
            </svg>
          </span>
          <div className="font-playfair text-lg sm:text-xl font-medium mt-2.5">Shavat Free</div>
          <div className="font-playfair text-3xl sm:text-4xl font-medium mt-2">
            <sup className="text-base sm:text-lg relative -top-2 sm:-top-3">$</sup>0
          </div>
          <div className="text-[11px] sm:text-xs text-muted mt-1">Start reading with clarity.</div>
          <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-4 text-left">
            {FREE_FEATURES.map((feature) => (
              <div key={feature} className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-muted">
                <CheckIcon />
                {feature}
              </div>
            ))}
          </div>
          <a href="#" className="block bg-paper dark:bg-surface-elevated border border-hairline text-ink py-2.5 rounded mt-4 text-[10px] sm:text-[11px] tracking-[2px] font-semibold hover:bg-surface transition-colors">
            START FREE
          </a>
        </div>

        {/* PREMIUM PLAN */}
        <div className="w-full max-w-[320px] sm:w-[280px] md:w-[300px]">
          <div className="bg-shavat-darkest rounded-t-lg py-1.5 flex justify-center">
            <span className="bg-gold text-shavat-darkest text-[9px] sm:text-[10px] tracking-[2px] font-semibold px-4 sm:px-5 py-1">MOST POPULAR</span>
          </div>
          <div className="bg-surface dark:bg-surface border border-hairline border-t-0 rounded-b-xl p-5 sm:p-6 text-center">
            <span className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-shavat-darkest inline-flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="stroke-gold" strokeWidth="1.3">
                <path d="M4 9 L7.5 12 L12 6.5 L16.5 12 L20 9 L18.5 17 H5.5 Z M5.5 17 H18.5" />
              </svg>
            </span>
            <div className="font-playfair text-lg sm:text-xl font-medium mt-2.5">Shavat Premium</div>
            <div className="mt-2">
              <span className="font-playfair text-2xl sm:text-[32px] font-medium">
                <sup className="text-sm sm:text-base relative -top-2">$</sup>9.99
              </span>
              <span className="font-playfair text-xs sm:text-sm text-muted"> / month</span>
            </div>
            <div className="text-[10px] sm:text-[11px] text-muted mt-0.5">or $99 / year</div>
            <div className="text-[11px] sm:text-xs text-muted mt-1.5">Go deeper with guided reflection.</div>
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-3 text-left">
              {PREMIUM_FEATURES.map((feature) => (
                <div key={feature} className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-muted">
                  <CheckIcon />
                  {feature}
                </div>
              ))}
            </div>
            <a href="#" className="block bg-shavat-darkest text-shavat-cream py-2.5 rounded mt-4 text-[10px] sm:text-[11px] tracking-[2px] font-semibold hover:bg-shavat-dark transition-colors">
              CHOOSE PREMIUM
            </a>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="px-4 sm:px-8 md:px-12 pb-6 sm:pb-7">
        <div className="bg-surface dark:bg-surface border border-hairline rounded-lg flex flex-col sm:flex-row items-center gap-4 sm:gap-5 md:gap-7 p-4 sm:p-5 md:px-8">
          <svg width="40" height="34" viewBox="0 0 150 120" fill="none" className="stroke-gold flex-none hidden sm:block" strokeWidth="1.2">
            <path d="M20 116 C48 88 80 52 128 12" />
            <path d="M44 92 C38 76 44 64 60 60 C62 78 56 88 44 92 Z M72 62 C66 46 72 34 88 30 C90 48 84 58 72 62 Z M58 104 C70 94 82 94 92 100 C80 110 68 110 58 104 Z M88 76 C100 66 112 66 122 72 C110 82 98 82 88 76 Z" />
          </svg>
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <div className="font-playfair text-lg sm:text-xl md:text-[26px] font-medium text-ink">Start with clarity. Grow with intention.</div>
            <div className="text-xs sm:text-[13px] text-muted mt-1">Join thousands engaging Scripture with purpose and peace.</div>
          </div>
          <Link href="#" className="flex-none inline-flex items-center gap-2.5 bg-shavat-darkest text-shavat-cream px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-[10px] sm:text-[11px] tracking-[2px] font-semibold hover:bg-shavat-dark transition-colors">
            <svg width="12" height="12" viewBox="0 0 40 40" fill="none" className="stroke-gold" strokeWidth="2">
              <path d="M8 34 C16 28 24 18 32 6" />
              <path d="M14 28 C13 23 15 20 19 19 C19 24 18 27 14 28 Z M21 20 C20 15 22 12 26 11 C26 16 25 19 21 20 Z" />
            </svg>
            BEGIN READING
          </Link>
        </div>
      </section>
    </div>
  );
}
