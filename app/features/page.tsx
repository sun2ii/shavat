'use client';

import Link from 'next/link';

// Debug: Add red border to highlight manually created SVGs
const svgDebugStyle = { border: '2px solid red' };

export default function FeaturesPage() {
  return (
    <div className="font-inter min-h-screen flex flex-col" style={{ background: '#F7F5F1', color: '#1F2E24' }}>
      {/* HERO */}
      <section className="relative h-[240px] sm:h-[280px] md:h-[340px]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/heirloom-farms-2.png)' }} />

        {/* Top navbar - inside hero */}
        <header className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6 p-4 sm:px-8 sm:pt-5 md:px-11">
          <nav className="flex flex-wrap items-center gap-3 sm:gap-5 md:gap-7 text-[10px] sm:text-[11px] md:text-[12.5px] tracking-[2px] text-white/85 font-medium">
            <Link href="/">HOME</Link>
            <Link href="/features" className="text-[#FDFCF9] font-bold border-b-2 border-[#C8A248] pb-1">FEATURES</Link>
            <Link href="/how-it-works" className="hidden sm:inline">HOW IT WORKS</Link>
            <Link href="/about">ABOUT</Link>
            <Link href="/pricing">PRICING</Link>
            <Link href="/resources" className="hidden sm:inline">RESOURCES</Link>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <label className="flex items-center gap-2.5 bg-white/90 border border-[#D9D1B5] rounded-lg px-3.5 py-2 w-[200px]">
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="#4A4A45" strokeWidth="1.6" style={svgDebugStyle}><circle cx="8" cy="8" r="5.5"/><path d="M12 12 L16 16"/></svg>
              <input type="text" placeholder="Search..." className="border-none outline-none bg-transparent font-inter text-xs text-[#1F2E24] w-full"/>
            </label>
          </div>
        </header>

        <div className="relative z-10 px-6 sm:px-10 md:px-[70px] pt-6 sm:pt-8 md:pt-10 max-w-[520px]">
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-[56px] font-semibold text-[#FDFCF9] m-0" style={{ textShadow: '0 2px 20px rgba(15,22,15,.5)' }}>Features</h1>
          <p className="text-sm sm:text-base md:text-[17px] leading-relaxed text-[#FDFCF9] mt-3 sm:mt-4 max-w-[380px]" style={{ textShadow: '0 1px 14px rgba(15,22,15,.55)' }}>
            The core tools you need to stay oriented in Scripture.
          </p>
        </div>
      </section>

      {/* FREE VERSION - responsive grid */}
      <section className="px-4 sm:px-8 md:px-12 py-6 sm:py-7 text-center flex-1 flex flex-col justify-center">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-10 sm:w-20 bg-[#C8A248]" />
          <span className="text-[10px] sm:text-[11px] tracking-[2.5px] font-semibold text-[#C8A248]">FREE VERSION INCLUDES</span>
          <span className="h-px w-10 sm:w-20 bg-[#C8A248]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6 mt-6">
          {/* Bible */}
          <div className="flex flex-col items-center">
            <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#2E3A28] border-2 border-[#C8A248] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8A248" strokeWidth="1.2" style={svgDebugStyle}>
                <path d="M12 6 C10 4.6 7 4.3 4 5 V18 C7 17.3 10 17.6 12 19 C14 17.6 17 17.3 20 18 V5 C17 4.3 14 4.6 12 6 Z M12 6 V19" />
              </svg>
            </span>
            <div className="font-playfair text-lg sm:text-[22px] font-semibold mt-2.5">Bible</div>
            <span className="h-0.5 w-8 bg-[#C8A248] my-1.5" />
            <div className="text-[10px] sm:text-[11px] tracking-wider leading-relaxed text-[#2E3A30] font-semibold max-w-[220px]">
              READ THE FULL TEXT OF SCRIPTURE
            </div>
          </div>

          {/* Timeline */}
          <div className="flex flex-col items-center">
            <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#2E3A28] border-2 border-[#C8A248] flex items-center justify-center">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C8A248" strokeWidth="1.2" style={svgDebugStyle}>
                <path d="M3 12 H8 M11.5 12 H12.5 M16 12 H21" />
                <circle cx="9.8" cy="12" r="1.8" />
                <circle cx="14.2" cy="12" r="1.8" />
              </svg>
            </span>
            <div className="font-playfair text-lg sm:text-[22px] font-semibold mt-2.5">Timeline</div>
            <span className="h-0.5 w-8 bg-[#C8A248] my-1.5" />
            <div className="text-[10px] sm:text-[11px] tracking-wider leading-relaxed text-[#2E3A30] font-semibold max-w-[240px]">
              EXPLORE BIBLICAL HISTORY IN CHRONOLOGICAL ORDER
            </div>
          </div>

          {/* Spine */}
          <div className="flex flex-col items-center">
            <span className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#2E3A28] border-2 border-[#C8A248] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8A248" strokeWidth="1.2" style={svgDebugStyle}>
                <path d="M12 4 L20 8.5 L12 13 L4 8.5 Z M4 12 L12 16.5 L20 12 M4 15.5 L12 20 L20 15.5" />
              </svg>
            </span>
            <div className="font-playfair text-lg sm:text-[22px] font-semibold mt-2.5">Spine</div>
            <span className="h-0.5 w-8 bg-[#C8A248] my-1.5" />
            <div className="text-[10px] sm:text-[11px] tracking-wider leading-relaxed text-[#2E3A30] font-semibold max-w-[240px]">
              SEE HOW THE BOOKS FIT TOGETHER AS ONE STORY
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM BAND */}
      <section className="px-4 sm:px-8 md:px-12 pb-6 sm:pb-7">
        <div className="bg-[#EDE9DC] rounded-lg flex flex-col sm:flex-row items-center gap-4 sm:gap-5 p-4 sm:p-5 md:px-7">
          <svg width="32" height="28" viewBox="0 0 54 48" fill="none" stroke="#C8A248" strokeWidth="1.4" className="flex-none hidden sm:block" style={svgDebugStyle}>
            <path d="M8 44 C18 38 30 26 46 8" />
            <path d="M18 34 C16 27 19 22 25 21 C25 28 23 32 18 34 Z M30 22 C28 15 31 10 37 9 C37 16 35 20 30 22 Z M24 40 C29 36 34 36 38 39 C33 43 28 43 24 40 Z" />
          </svg>
          <div className="flex-1 text-xs sm:text-sm leading-relaxed text-[#2E3A30] text-center sm:text-left">
            More tools and deeper insights are available with <strong>Shavat Premium</strong>. Upgrade anytime to unlock the full experience.
          </div>
          <Link href="/pricing" className="flex-none bg-[#1F2E24] text-[#F7F5F1] px-5 sm:px-7 py-2.5 sm:py-3 rounded-md text-[10px] sm:text-[11px] tracking-[2px] font-semibold">
            VIEW PREMIUM
          </Link>
        </div>
      </section>
    </div>
  );
}
