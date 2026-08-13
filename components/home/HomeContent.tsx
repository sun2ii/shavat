'use client';

import Link from 'next/link';
import { MarketingNav } from '@/components/marketing/MarketingNav';
import { NormalizedIcon } from '@/components/ui/NormalizedIcon';

export function HomeContent() {
  return (
    <main className="min-w-0">
      {/* HERO */}
      <section className="relative h-[280px] sm:h-[320px] md:h-[340px]">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/river.webp)' }} />
        {/* Dark mode overlay for hero image */}
        <div className="absolute inset-0 bg-black/0 dark:bg-black/40 transition-colors" />

        {/* Unified navbar - uses MarketingNav for consistency */}
        <MarketingNav variant="dark" />

        {/* Hero copy */}
        <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-11 pt-8 sm:pt-6 md:pt-6 max-w-[560px]">
          <div className="font-playfair text-lg sm:text-xl md:text-2xl text-gold mb-1">Good morning.</div>
          <h1 className="font-playfair text-3xl sm:text-[36px] md:text-[42px] leading-tight font-semibold text-white m-0" style={{ textShadow: '0 2px 24px rgba(0,0,0,0.45)' }}>
            Welcome to Shavat
            <NormalizedIcon src="/icons/general/laurel.webp" alt="" width={44} height={30} className="hidden sm:inline-block align-baseline ml-1.5" />
          </h1>
          <div className="text-sm sm:text-[15px] leading-relaxed text-white mt-2 sm:mt-2.5" style={{ textShadow: '0 1px 14px rgba(0,0,0,0.55)' }}>Stay oriented in Scripture.<br />See the big picture.<br />Read with confidence.</div>
          <label className="flex items-center gap-3 bg-surface/95 dark:bg-surface-elevated/95 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 w-full sm:w-[300px] mt-4 shadow-lg">
            <NormalizedIcon src="/icons/general/search.webp" alt="Search" width={18} height={18} />
            <input type="text" placeholder="Search Scripture or topics..." className="border-none outline-none bg-transparent font-inter text-sm text-ink w-full"/>
          </label>
        </div>
      </section>

      {/* CONTENT - responsive layout */}
      <div className="px-4 sm:px-6 md:px-6 py-4 sm:py-5">
        {/* EXPLORE SHAVAT */}
        <div className="text-[10px] tracking-[2.4px] font-bold text-muted mb-3">EXPLORE SHAVAT</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
          {[
            { icon: <NormalizedIcon src="/icons/home/orientation.webp" alt="Orientation" width={24} height={24} />, title: 'Orientation View', desc: 'See where you are in the book and the bigger story.', link: '/terrain', linkText: 'OPEN VIEW' },
            { icon: <NormalizedIcon src="/icons/home/read.webp" alt="Read" width={24} height={24} />, title: 'Read Scripture', desc: 'Read and understand Scripture with clarity.', link: '/library', linkText: 'START READING' },
            { icon: <NormalizedIcon src="/icons/home/timeline.webp" alt="Timeline" width={24} height={24} />, title: 'Timeline', desc: 'See events in historical order and context.', link: '/timeline', linkText: 'VIEW TIMELINE' },
            { icon: <NormalizedIcon src="/icons/home/terrain.webp" alt="Terrain" width={24} height={24} />, title: 'Terrain', desc: 'Follow the main storyline of Scripture.', link: '/terrain', linkText: 'VIEW TERRAIN' },
            { icon: <NormalizedIcon src="/icons/general/search.webp" alt="Search" width={24} height={24} />, title: 'Search Scripture', desc: 'Find passages, themes, and topics quickly.', link: '/search', linkText: 'SEARCH' },
          ].map((card, i) => (
            <div key={i} className="bg-surface dark:bg-surface border border-hairline-subtle dark:border-hairline rounded-lg p-3 sm:p-4 flex flex-col items-center text-center">
              <span className="w-10 h-10 sm:w-11 sm:h-11 border border-hairline rounded-full flex items-center justify-center flex-shrink-0">{card.icon}</span>
              <div className="text-xs sm:text-[13px] font-semibold mt-2 sm:mt-2.5">{card.title}</div>
              <div className="text-[10px] sm:text-[11px] leading-snug text-faint mt-1 hidden sm:block">{card.desc}</div>
              <Link href={card.link} className="hover:text-gold text-[9px] sm:text-[10px] tracking-[1.5px] font-bold text-ink mt-auto pt-2 sm:pt-2.5">{card.linkText} →</Link>
            </div>
          ))}
        </div>

        {/* Two-column grid for middle content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-4 mt-4">
          {/* LEFT COLUMN */}
          <div className="space-y-4">
            {/* INSIGHT + PASSAGES - stack on mobile, side by side on tablet+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-surface dark:bg-surface border border-hairline-subtle dark:border-hairline rounded-lg p-4">
                <div className="flex items-center gap-2 text-[10px] tracking-[2px] font-bold text-muted">
                  <NormalizedIcon src="/icons/home/dailyinsight.webp" alt="Daily Insight" width={14} height={14} />
                  DAILY INSIGHT
                </div>
                <div className="text-[13px] leading-relaxed text-muted mt-2.5">In every season, God raises up people who are willing to say yes. He can use you right where you are.</div>
                <Link href="#" className="hover:text-gold inline-block text-[10px] tracking-[1.5px] font-bold text-ink mt-2.5">READ INSIGHT →</Link>
              </div>

              <div className="bg-surface dark:bg-surface border border-hairline-subtle dark:border-hairline rounded-lg p-4">
                <div className="flex items-center gap-2 text-[10px] tracking-[2px] font-bold text-muted">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="stroke-gold" strokeWidth="1.5"><path d="M2 12 L7 7 L10 10 L14 4 M9 4 H14 V9"/></svg>
                  POPULAR PASSAGES
                </div>
                <div className="flex flex-col gap-2 mt-2.5">
                  {[
                    { num: '01', ref: 'Psalm 23:1–4', title: "The Shepherd's Care" },
                    { num: '02', ref: 'Romans 8:28', title: 'God Works for Good' },
                    { num: '03', ref: 'John 15:5', title: 'Abide in Me' },
                  ].map((p) => (
                    <Link key={p.num} href="#" className="hover:text-gold flex items-baseline gap-2 sm:gap-2.5">
                      <span className="text-[10px] text-faint font-semibold">{p.num}</span>
                      <span className="font-playfair text-sm font-semibold whitespace-nowrap">{p.ref}</span>
                      <span className="text-[11px] text-faint hidden sm:inline">{p.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT RAIL - hidden on mobile, shown on lg+ */}
          <div className="hidden lg:flex flex-col gap-3">
            <div className="bg-surface dark:bg-surface border border-hairline-subtle dark:border-hairline rounded-lg p-3.5">
              <div className="text-[10px] tracking-[2px] font-bold text-muted">READING PROGRESS</div>
              <div className="flex items-center gap-3 mt-3">
                <NormalizedIcon src="/icons/home/readingprogress.webp" alt="Reading Progress" width={56} height={56} scale={1} />
                <div>
                  <div className="font-playfair text-base font-semibold">Judges</div>
                  <div className="text-[11px] text-faint leading-snug mt-0.5">6 of 21 chapters</div>
                </div>
              </div>
              <Link href="#" className="hover:text-gold inline-block text-[10px] tracking-[1.5px] font-bold text-ink mt-3">VIEW PLAN →</Link>
            </div>

            <div className="bg-surface dark:bg-surface border border-hairline-subtle dark:border-hairline rounded-lg p-3.5">
              <div className="text-[10px] tracking-[2px] font-bold text-muted mb-1">RECENTLY READ</div>
              <div className="flex flex-col">
                {['Judges 5', 'Judges 4', 'Judges 3'].map((ch, i) => (
                  <Link key={ch} href={`/judges/${5-i}`} className="hover:text-gold flex items-center gap-2.5 py-2 border-b border-hairline-subtle last:border-b-0">
                    <NormalizedIcon src="/icons/home/read.webp" alt="" width={14} height={14} />
                    <span className="flex-1">
                      <span className="block text-xs font-semibold">{ch}</span>
                      <span className="block text-[10px] text-faint mt-0.5">May {14-i}, 2024</span>
                    </span>
                    <span className="text-faint text-xs">›</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-only: Reading Progress compact */}
        <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          <div className="bg-surface dark:bg-surface border border-hairline-subtle dark:border-hairline rounded-lg p-3.5 flex items-center gap-3">
            <NormalizedIcon src="/icons/home/readingprogress.webp" alt="Reading Progress" width={48} height={48} />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] tracking-[2px] font-bold text-muted">READING PROGRESS</div>
              <div className="font-playfair text-sm font-semibold mt-1">Judges</div>
              <div className="text-[10px] text-faint">6 of 21 chapters</div>
            </div>
          </div>

          <div className="bg-surface dark:bg-surface border border-hairline-subtle dark:border-hairline rounded-lg p-3.5">
            <div className="text-[10px] tracking-[2px] font-bold text-muted mb-2">RECENTLY READ</div>
            <div className="flex flex-wrap gap-2">
              {['Judges 5', 'Judges 4', 'Judges 3'].map((ch) => (
                <Link key={ch} href="#" className="text-xs bg-paper-2 px-2.5 py-1.5 rounded">{ch}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* BOTTOM BAND - responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[200px_1fr_300px] gap-3 mt-4">
          {/* Quote */}
          <div className="bg-paper-2 dark:bg-surface border border-hairline-subtle dark:border-hairline rounded-lg p-3.5 flex gap-2.5">
            <span className="font-playfair text-3xl leading-none text-gold mt-1">"</span>
            <div>
              <div className="font-playfair text-[13px] leading-relaxed text-ink">Your word is a lamp to my feet and a light to my path."</div>
              <div className="text-[11px] text-faint mt-1.5">— Psalm 119:105</div>
            </div>
          </div>

          {/* Values - horizontal on desktop, 2x2 grid on mobile */}
          <div className="bg-paper-2 dark:bg-surface border border-hairline-subtle dark:border-hairline rounded-lg p-5 sm:p-6 grid grid-cols-4 items-center">
            {[
              { icon: <NormalizedIcon src="/icons/home/wholestory.webp" alt="Whole story" width={40} height={40} />, text: 'Whole story' },
              { icon: <NormalizedIcon src="/icons/home/growdaily.webp" alt="Grow daily" width={40} height={40} />, text: 'Grow daily' },
              { icon: <NormalizedIcon src="/icons/home/withcare.webp" alt="With care" width={40} height={40} />, text: 'With care' },
              { icon: <NormalizedIcon src="/icons/home/private.webp" alt="Private" width={40} height={40} />, text: 'Private' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-2 px-2 sm:px-4 border-r border-hairline-subtle last:border-r-0">
                {item.icon}
                <div className="text-xs sm:text-sm font-medium text-muted">{item.text}</div>
              </div>
            ))}
          </div>

          {/* Premium CTA */}
          <div className="bg-paper-2 dark:bg-surface border border-hairline-subtle dark:border-hairline rounded-lg p-3.5 sm:p-4 flex items-center gap-3 sm:col-span-2 lg:col-span-1">
            <div className="flex-1 min-w-0">
              <div className="font-playfair text-sm sm:text-[15px] font-semibold">Go deeper with Premium</div>
              <div className="text-[10px] sm:text-[11px] leading-snug text-muted mt-1">Unlock devotionals, journals, and more.</div>
              <Link href="#" className="hover:bg-brand-hover inline-flex items-center gap-1.5 bg-brand text-paper px-3 py-2 rounded text-[9px] sm:text-[10px] tracking-[1.5px] font-semibold mt-2.5 dark:bg-surface-elevated dark:hover:bg-hairline dark:text-ink">PREMIUM →</Link>
            </div>
            <NormalizedIcon src="/icons/general/laurel.webp" alt="" width={50} height={42} className="flex-none hidden sm:block" />
          </div>
        </div>
      </div>
    </main>
  );
}
