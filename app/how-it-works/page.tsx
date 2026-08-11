'use client';

import Link from 'next/link';

// Debug: Add red border to highlight manually created SVGs
const svgDebugStyle = { border: '2px solid red' };

const STEPS = [
  { number: 1, title: 'Read', description: 'Read the full text of Scripture.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8A248" strokeWidth="1.3" style={svgDebugStyle}><path d="M12 6 C10 4.6 7 4.3 4 5 V18 C7 17.3 10 17.6 12 19 C14 17.6 17 17.3 20 18 V5 C17 4.3 14 4.6 12 6 Z M12 6 V19 M15 8 V12 L16.5 11 L18 12 V7.4" /></svg> },
  { number: 2, title: 'Explore', description: 'Use the Timeline to explore biblical history.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8A248" strokeWidth="1.3" style={svgDebugStyle}><path d="M12 3 C13.9 3 15.5 4.6 15.5 6.5 C15.5 9 12 12 12 12 C12 12 8.5 9 8.5 6.5 C8.5 4.6 10.1 3 12 3 Z" /><circle cx="12" cy="6.5" r="1.2" /><path d="M12 12 V15 M12 15 H6.5 V18 M12 15 H17.5 V18" /><circle cx="6.5" cy="19.5" r="1.6" /><circle cx="17.5" cy="19.5" r="1.6" /></svg> },
  { number: 3, title: 'Connect', description: 'Use the Spine to see how books fit together.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8A248" strokeWidth="1.3" style={svgDebugStyle}><path d="M12 6 C10 4.6 7 4.3 4 5 V18 C7 17.3 10 17.6 12 19 C14 17.6 17 17.3 20 18 V5 C17 4.3 14 4.6 12 6 Z M12 6 V19 M6.5 9 C8 8.6 9.5 8.7 11 9.3 M13 9.3 C14.5 8.7 16 8.6 17.5 9 M6.5 12 C8 11.6 9.5 11.7 11 12.3 M13 12.3 C14.5 11.7 16 11.6 17.5 12" /></svg> },
  { number: 4, title: 'Grow', description: 'Return to Scripture each day with clarity.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8A248" strokeWidth="1.3" style={svgDebugStyle}><path d="M12 20 V10 M12 13 C12 9 9.5 7 6 7 C6 11 8.5 13 12 13 Z M12 10 C12 6.5 14.5 4.5 18 4.5 C18 8.5 15.5 10.5 12 10.5 Z M5 20 C7.5 18.5 9.5 18 12 18 C14.5 18 16.5 18.5 19 20" /></svg> },
];

export default function HowItWorksPage() {
  return (
    <div className="font-inter min-h-screen flex flex-col" style={{ background: '#F7F5F1', color: '#1F2E24' }}>
      {/* HERO */}
      <section className="relative h-[240px] sm:h-[280px] md:h-[340px]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/davis.png)' }} />

        {/* Top navbar - inside hero */}
        <header className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6 p-4 sm:px-8 sm:pt-5 md:px-11">
          <nav className="flex flex-wrap items-center gap-3 sm:gap-5 md:gap-7 text-[10px] sm:text-[11px] md:text-[12.5px] tracking-[2px] text-white/85 font-medium">
            <Link href="/">HOME</Link>
            <Link href="/features">FEATURES</Link>
            <Link href="/how-it-works" className="text-[#FDFCF9] font-bold border-b-2 border-[#C8A248] pb-1">HOW IT WORKS</Link>
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

        <div className="relative z-10 px-6 sm:px-10 md:px-[70px] pt-6 sm:pt-8 md:pt-10 max-w-[560px]">
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-[56px] font-medium text-[#FDFCF9] m-0" style={{ textShadow: '0 2px 20px rgba(15,22,15,.5)' }}>How It Works</h1>
          <p className="text-sm sm:text-base md:text-[17px] leading-relaxed text-[#FDFCF9] mt-3 sm:mt-4 max-w-[440px]" style={{ textShadow: '0 1px 14px rgba(15,22,15,.55)' }}>
            Shavat helps you engage with Scripture in a clear, meaningful, and connected way.
          </p>
        </div>
      </section>

      {/* STEPS */}
      <section className="px-4 sm:px-8 md:px-12 py-6 sm:py-7 text-center flex-1 flex flex-col justify-center">
        <div className="text-[10px] sm:text-[11px] tracking-[3px] font-semibold text-[#1F2E24]">A SIMPLE 4-STEP PATH</div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-4 mt-5 relative">
          {/* Dotted line - hidden on mobile */}
          <div className="hidden sm:block absolute top-11 left-[12.5%] right-[12.5%] border-t-2 border-dotted border-[#B0A98F]" />

          {STEPS.map((step) => (
            <div key={step.number} className="relative flex flex-col items-center">
              <span className="font-playfair w-6 h-6 rounded-full bg-[#C8A248] text-[#FDFCF9] flex items-center justify-center text-xs mb-1.5">{step.number}</span>
              <span className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#3A4A2E] border-2 border-[#F7F5F1] outline outline-1 outline-[#B0A98F] flex items-center justify-center">{step.icon}</span>
              <div className="font-playfair text-base sm:text-lg md:text-xl font-medium mt-2.5">{step.title}</div>
              <div className="text-[10px] sm:text-xs leading-relaxed text-[#4A4A45] mt-1 max-w-[160px] sm:max-w-[180px]">{step.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FREE VERSION BANNER */}
      <section className="px-4 sm:px-8 md:px-12 pb-6 sm:pb-7">
        <div className="relative bg-[#F3F0E8] border border-[#E0DACB] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
          <span className="flex-none w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#3A4A2E] flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8A248" strokeWidth="1.3" style={svgDebugStyle}>
              <path d="M4 9 L7.5 12 L12 6.5 L16.5 12 L20 9 L18.5 17 H5.5 Z M5.5 17 H18.5" />
            </svg>
          </span>
          <div className="flex-1 text-center sm:text-left">
            <div className="font-playfair text-lg sm:text-xl md:text-[22px] font-medium text-[#1F2E24]">You are using the Free Version.</div>
            <div className="text-xs sm:text-[13px] leading-relaxed text-[#4A4A45] mt-1">
              Upgrade to Shavat Premium for deeper insights, devotionals, journaling, highlights, and more.
            </div>
          </div>
          <Link href="/pricing" className="flex-none bg-[#3A4A2E] text-[#F7F5F1] px-5 sm:px-6 py-2.5 sm:py-3 rounded-md text-[10px] sm:text-[11px] tracking-[2px] font-semibold">
            VIEW PREMIUM
          </Link>
        </div>
      </section>
    </div>
  );
}
