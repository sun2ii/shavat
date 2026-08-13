'use client';

import Link from 'next/link';
import { MarketingNav } from '@/components/marketing/MarketingNav';
import { NormalizedIcon } from '@/components/ui/NormalizedIcon';

const FREE_FEATURES = ['Bible / Read', 'Timeline', 'Spine', 'Orientation tools', 'Search', 'Web + mobile'];
const PREMIUM_FEATURES = ['Highlights', 'Bookmarks', 'Journal / notes', 'Daily devotionals', 'Guide questions', 'Reading plans'];
const LIFETIME_FEATURES = ['All Premium features', 'Lifetime access', 'Early new features', 'Support development', 'No recurring fees', 'Gift to others'];

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
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/sky.webp)' }} />
        <div className="absolute inset-0 bg-black/0 dark:bg-black/40 transition-colors" />

        <MarketingNav variant="dark" />

        <div className="relative z-10 px-6 sm:px-10 md:px-[70px] pt-6 sm:pt-8 md:pt-10 max-w-[500px]">
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-[56px] font-medium text-white m-0" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.4)' }}>Pricing</h1>
          <p className="font-playfair italic font-semibold text-sm sm:text-base md:text-[17px] leading-relaxed text-gold mt-3 sm:mt-4 max-w-[380px]" style={{ textShadow: '0 1px 14px rgba(0,0,0,0.4)' }}>
            Choose the path that helps you stay oriented in Scripture.
          </p>
        </div>
      </section>

      {/* PLANS */}
      <section className="flex flex-col sm:flex-row justify-center gap-5 sm:gap-6 md:gap-7 px-4 sm:px-8 md:px-12 py-6 sm:py-6 items-center sm:items-stretch flex-1">
        {/* FREE PLAN */}
        <div className="w-full max-w-[300px] sm:w-[260px] md:w-[280px] sm:mt-3 bg-surface dark:bg-surface border border-hairline rounded-xl p-5 sm:p-6 text-center flex flex-col">
          <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-shavat-darkest inline-flex items-center justify-center mt-2 mx-auto">
            <NormalizedIcon src="/icons/pricing/free.webp" alt="Free Plan" width={28} height={28} />
          </span>
          <div className="font-playfair text-lg sm:text-xl font-medium mt-2.5">Shavat Free</div>
          <div className="font-playfair text-3xl sm:text-4xl font-medium mt-2">
            <sup className="text-base sm:text-lg relative -top-2 sm:-top-3">$</sup>0
          </div>
          <div className="text-[11px] sm:text-xs text-muted mt-1">Start reading with clarity.</div>
          <div className="mt-auto pt-4">
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-left">
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
        </div>

        {/* PREMIUM PLAN */}
        <div className="relative w-full max-w-[300px] sm:w-[260px] md:w-[280px] sm:mt-3 bg-surface dark:bg-surface border border-hairline rounded-xl p-5 sm:p-6 text-center flex flex-col">
          {/* Badge overlay */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className="bg-gold text-shavat-darkest text-[9px] sm:text-[10px] tracking-[2px] font-semibold px-4 sm:px-5 py-1 rounded-full shadow-sm">MOST POPULAR</span>
          </div>
          <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-shavat-darkest inline-flex items-center justify-center mt-2 mx-auto">
            <NormalizedIcon src="/icons/pricing/premium.webp" alt="Premium Plan" width={28} height={28} />
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
          <div className="mt-auto pt-4">
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-left">
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

        {/* LIFETIME PLAN */}
        <div className="w-full max-w-[300px] sm:w-[260px] md:w-[280px] sm:mt-3 bg-surface dark:bg-surface border border-hairline rounded-xl p-5 sm:p-6 text-center flex flex-col">
          <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-shavat-darkest inline-flex items-center justify-center mt-2 mx-auto">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gold" strokeWidth="1.3">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </span>
          <div className="font-playfair text-lg sm:text-xl font-medium mt-2.5">Shavat Lifetime</div>
          <div className="font-playfair text-3xl sm:text-4xl font-medium mt-2">
            <sup className="text-base sm:text-lg relative -top-2 sm:-top-3">$</sup>1250
          </div>
          <div className="text-[11px] sm:text-xs text-muted mt-1">One-time payment. Forever access.</div>
          <div className="mt-auto pt-4">
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2 text-left">
              {LIFETIME_FEATURES.map((feature) => (
                <div key={feature} className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-muted">
                  <CheckIcon />
                  {feature}
                </div>
              ))}
            </div>
            <a href="#" className="block bg-shavat-darkest text-shavat-cream py-2.5 rounded mt-4 text-[10px] sm:text-[11px] tracking-[2px] font-semibold hover:bg-shavat-dark transition-colors">
              GET LIFETIME
            </a>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="px-4 sm:px-8 md:px-12 pb-6 sm:pb-7">
        <div className="bg-surface dark:bg-surface border border-hairline rounded-lg flex flex-col sm:flex-row items-center gap-4 sm:gap-5 md:gap-7 p-4 sm:p-5 md:px-8">
          <span className="flex-none hidden sm:block">
            <NormalizedIcon src="/icons/general/laurel.webp" alt="" width={40} height={34} />
          </span>
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <div className="font-playfair text-lg sm:text-xl md:text-[26px] font-medium text-ink">Start with clarity. Grow with intention.</div>
            <div className="text-xs sm:text-[13px] text-muted mt-1">Join thousands engaging Scripture with purpose and peace.</div>
          </div>
          <Link href="#" className="flex-none inline-flex items-center gap-2.5 bg-shavat-darkest text-shavat-cream px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-[10px] sm:text-[11px] tracking-[2px] font-semibold hover:bg-shavat-dark transition-colors">
            <NormalizedIcon src="/icons/general/laurel.webp" alt="" width={18} height={16} />
            BEGIN READING
          </Link>
        </div>
      </section>
    </div>
  );
}
