'use client';

import Link from 'next/link';
import { MarketingNav } from '@/components/marketing/MarketingNav';

export function HomeContent() {
  return (
    <main className="min-w-0">
      {/* HERO */}
      <section className="relative h-[280px] sm:h-[320px] md:h-[340px]">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/river.png)' }} />
        {/* Dark mode overlay for hero image */}
        <div className="absolute inset-0 bg-black/0 dark:bg-black/40 transition-colors" />

        {/* Unified navbar - uses MarketingNav for consistency */}
        <MarketingNav variant="dark" />

        {/* Hero copy */}
        <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-11 pt-8 sm:pt-6 md:pt-6 max-w-[560px]">
          <div className="font-playfair text-lg sm:text-xl md:text-2xl text-gold mb-1">Good morning.</div>
          <h1 className="font-playfair text-3xl sm:text-[36px] md:text-[42px] leading-tight font-semibold text-white m-0" style={{ textShadow: '0 2px 24px rgba(0,0,0,0.45)' }}>
            Welcome to Shavat
            <svg width="44" height="30" viewBox="0 0 64 34" fill="none" className="stroke-gold hidden sm:inline-block align-baseline ml-1.5" strokeWidth="1.4">
              <path d="M6 30 C22 26 40 18 58 4"/>
              <path d="M16 26 C15 21 17 18 21 17 C21 22 20 25 16 26 Z M26 21 C25 16 27 13 31 12 C31 17 30 20 26 21 Z M38 15 C37 10 39 7 43 6 C43 11 42 14 38 15 Z"/>
            </svg>
          </h1>
          <div className="text-sm sm:text-[15px] leading-relaxed text-white mt-2 sm:mt-2.5" style={{ textShadow: '0 1px 14px rgba(0,0,0,0.55)' }}>Stay oriented in Scripture. See the big picture. Read with confidence.</div>
          <label className="flex items-center gap-3 bg-surface/95 dark:bg-surface-elevated/95 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 w-full sm:w-[300px] mt-4 shadow-lg">
            <svg width="17" height="17" viewBox="0 0 18 18" fill="none" className="stroke-muted" strokeWidth="1.6"><circle cx="8" cy="8" r="5.5"/><path d="M12 12 L16 16"/></svg>
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
            { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="stroke-ink" strokeWidth="1.4"><path d="M12 3 C7 8 7 16 12 21 C17 16 17 8 12 3 Z M12 3 V21"/></svg>, title: 'Orientation View', desc: 'See where you are in the book and the bigger story.', link: '/terrain', linkText: 'OPEN VIEW' },
            { icon: <svg width="24" height="24" viewBox="0 0 18 18" fill="none" className="stroke-ink" strokeWidth="1.3"><path d="M9 4 C7.2 2.9 4.6 2.6 2 3.2 V14.5 C4.6 13.9 7.2 14.2 9 15.3 C10.8 14.2 13.4 13.9 16 14.5 V3.2 C13.4 2.6 10.8 2.9 9 4 Z M9 4 V15.3"/></svg>, title: 'Read Scripture', desc: 'Read and understand Scripture with clarity.', link: '/library', linkText: 'START READING' },
            { icon: <svg width="24" height="24" viewBox="0 0 18 18" fill="none" className="stroke-ink" strokeWidth="1.3"><circle cx="9" cy="9" r="7"/><path d="M9 5 V9 L12 11"/></svg>, title: 'Timeline', desc: 'See events in historical order and context.', link: '/timeline', linkText: 'VIEW TIMELINE' },
            { icon: <svg width="24" height="24" viewBox="0 0 18 18" fill="none" className="stroke-ink" strokeWidth="1.3"><path d="M2 6.5 C4 4.5 6 4.5 8 6.5 C10 8.5 12 8.5 14 6.5 M2 11.5 C4 9.5 6 9.5 8 11.5 C10 13.5 12 13.5 14 11.5" transform="translate(1 0)"/></svg>, title: 'Terrain', desc: 'Follow the main storyline of Scripture.', link: '/terrain', linkText: 'VIEW TERRAIN' },
            { icon: <svg width="24" height="24" viewBox="0 0 18 18" fill="none" className="stroke-ink" strokeWidth="1.3"><circle cx="8" cy="8" r="5.5"/><path d="M12 12 L16 16"/></svg>, title: 'Search Scripture', desc: 'Find passages, themes, and topics quickly.', link: '/search', linkText: 'SEARCH' },
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
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="stroke-gold" strokeWidth="1.4"><path d="M8 1 V2.5 M8 13.5 V15 M1 8 H2.5 M13.5 8 H15 M3 3 L4 4 M12 12 L13 13 M13 3 L12 4"/><circle cx="8" cy="8" r="3.4"/></svg>
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
                <svg width="56" height="56" viewBox="0 0 76 76">
                  <circle cx="38" cy="38" r="32" fill="none" className="stroke-hairline" strokeWidth="5"/>
                  <circle cx="38" cy="38" r="32" fill="none" className="stroke-ink" strokeWidth="5" strokeLinecap="round" strokeDasharray="56.3 144.8" transform="rotate(-90 38 38)"/>
                  <text x="38" y="43" textAnchor="middle" className="fill-ink" style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 600 }}>28%</text>
                </svg>
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
                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none" className="stroke-ink" strokeWidth="1.3"><path d="M9 4 C7.2 2.9 4.6 2.6 2 3.2 V14.5 C4.6 13.9 7.2 14.2 9 15.3 C10.8 14.2 13.4 13.9 16 14.5 V3.2 C13.4 2.6 10.8 2.9 9 4 Z M9 4 V15.3"/></svg>
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
            <svg width="48" height="48" viewBox="0 0 76 76">
              <circle cx="38" cy="38" r="32" fill="none" className="stroke-hairline" strokeWidth="5"/>
              <circle cx="38" cy="38" r="32" fill="none" className="stroke-ink" strokeWidth="5" strokeLinecap="round" strokeDasharray="56.3 144.8" transform="rotate(-90 38 38)"/>
              <text x="38" y="43" textAnchor="middle" className="fill-ink" style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 600 }}>28%</text>
            </svg>
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
          <div className="bg-paper-2 dark:bg-surface border border-hairline-subtle dark:border-hairline rounded-lg p-3 grid grid-cols-4 items-center">
            {[
              { icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="stroke-ink" strokeWidth="1.2"><path d="M9 4 C7.2 2.9 4.6 2.6 2 3.2 V14.5 C4.6 13.9 7.2 14.2 9 15.3 C10.8 14.2 13.4 13.9 16 14.5 V3.2 C13.4 2.6 10.8 2.9 9 4 Z M9 4 V15.3"/></svg>, text: 'Whole story' },
              { icon: <svg width="18" height="18" viewBox="0 0 20 18" fill="none" className="stroke-ink" strokeWidth="1.2"><path d="M10 16 C4 12 1.5 8.5 1.5 5.6 C1.5 3.3 3.3 1.5 5.6 1.5 C7.4 1.5 9.1 2.6 10 4.2 C10.9 2.6 12.6 1.5 14.4 1.5 C16.7 1.5 18.5 3.3 18.5 5.6 C18.5 8.5 16 12 10 16 Z"/></svg>, text: 'Grow daily' },
              { icon: <svg width="18" height="18" viewBox="0 0 18 20" fill="none" className="stroke-ink" strokeWidth="1.2"><path d="M9 1 L16.5 4 V9 C16.5 14 13.5 17.5 9 19 C4.5 17.5 1.5 14 1.5 9 V4 Z M5.8 9.6 L8.2 12 L12.4 7.4"/></svg>, text: 'With care' },
              { icon: <svg width="18" height="18" viewBox="0 0 18 20" fill="none" className="stroke-ink" strokeWidth="1.2"><rect x="2.5" y="8.5" width="13" height="9.5" rx="1.6"/><path d="M5.5 8.5 V5.5 C5.5 3.6 7 2 9 2 C11 2 12.5 3.6 12.5 5.5 V8.5 M9 12.5 V14.5"/></svg>, text: 'Private' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-1 px-1 sm:px-2 border-r border-hairline-subtle last:border-r-0">
                {item.icon}
                <div className="text-[9px] sm:text-[10px] leading-tight text-muted">{item.text}</div>
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
            <svg width="50" height="42" viewBox="0 0 88 72" fill="none" className="stroke-blue-ref flex-none hidden sm:block" strokeWidth="1.3">
              <path d="M10 66 C34 56 58 36 80 8"/>
              <path d="M24 58 C22 50 25 45 32 43 C33 51 30 56 24 58 Z M40 46 C38 38 41 33 48 31 C49 39 46 44 40 46 Z M58 30 C56 22 59 17 66 15 C67 23 64 28 58 30 Z M32 63 C39 59 45 59 50 63 C43 67 37 67 32 63 Z M50 51 C57 47 63 47 68 51 C61 55 55 55 50 51 Z M66 35 C73 31 79 31 84 35 C77 39 71 39 66 35 Z" className="fill-paper-2 dark:fill-surface"/>
            </svg>
          </div>
        </div>
      </div>
    </main>
  );
}
