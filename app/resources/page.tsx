'use client';

import Link from 'next/link';

// Debug: Add red border to highlight manually created SVGs
const svgDebugStyle = { border: '2px solid red' };
// Debug: Add purple border to highlight links that go nowhere (need to be implemented)
const linkDebugStyle = { border: '2px solid purple' };

const CATEGORIES = [
  { title: 'Reading Plans', description: 'Paths through Scripture for steady daily reading.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3A4A2E" strokeWidth="1.1" style={svgDebugStyle}><path d="M12 6 C10 4.6 7 4.3 4 5 V18 C7 17.3 10 17.6 12 19 C14 17.6 17 17.3 20 18 V5 C17 4.3 14 4.6 12 6 Z M12 6 V19 M6.5 8.5 C8 8.1 9.5 8.2 10.5 8.7 M6.5 11 C8 10.6 9.5 10.7 10.5 11.2 M13.5 8.7 C14.5 8.2 16 8.1 17.5 8.5 M13.5 11.2 C14.5 10.7 16 10.6 17.5 11" /></svg> },
  { title: 'Study Guides', description: 'Structured helps for deeper understanding.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3A4A2E" strokeWidth="1.1" style={svgDebugStyle}><rect x="5" y="3.5" width="12" height="17" rx="1.4" /><path d="M5 6.5 H3.8 M5 9.5 H3.8 M5 12.5 H3.8 M5 15.5 H3.8 M8 8 H14 M8 11 H14 M8 14 H12" /><path d="M15.5 20.5 L19.5 12.5 L21 13.3 L17 21.2 L15.2 21.6 Z" /></svg> },
  { title: 'Theme Collections', description: 'Grouped passages connecting the bigger story.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3A4A2E" strokeWidth="1.1" style={svgDebugStyle}><path d="M4 17 L14 15.5 L14.5 18.5 L4.5 20 Z M4.5 13 L14.5 12 L14.8 15 L4.8 16 Z M5 9 L15 8.5 L15.2 11.5 L5.2 12 Z" /><path d="M14 15.5 L18 14 M14.5 12 L18.5 10.8 M15 8.5 L19 7.5" /></svg> },
  { title: 'Getting Started', description: 'Introductions for new readers.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3A4A2E" strokeWidth="1.1" style={svgDebugStyle}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="1.1" /><path d="M12 3.5 V5 M12 19 V20.5 M3.5 12 H5 M19 12 H20.5" /><path d="M15.5 8.5 L13 11 L11 13 L8.5 15.5 L11 13 Z M15.5 8.5 L13 13 L8.5 15.5 L11 11 Z" /></svg> },
];

const FEATURED = [
  { title: 'How to Read with Orientation', description: 'Read Scripture in context and confidence.' },
  { title: 'The Narrative Spine Guide', description: 'See how Scripture unfolds from beginning to end.' },
  { title: 'Where to Begin', description: 'Handpicked starting points for first steps.' },
];

export default function ResourcesPage() {
  return (
    <div className="font-inter min-h-screen flex flex-col" style={{ background: '#F7F5F1', color: '#1F2E24' }}>
      {/* HERO */}
      <section className="relative h-[240px] sm:h-[280px] md:h-[340px]">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/images/sunset.png)' }} />

        {/* Top navbar - inside hero */}
        <header className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6 p-4 sm:px-8 sm:pt-5 md:px-11">
          <nav className="flex flex-wrap items-center gap-3 sm:gap-5 md:gap-7 text-[10px] sm:text-[11px] md:text-[12.5px] tracking-[2px] text-white/85 font-medium">
            <Link href="/">HOME</Link>
            <Link href="/features">FEATURES</Link>
            <Link href="/how-it-works" className="hidden sm:inline">HOW IT WORKS</Link>
            <Link href="/about">ABOUT</Link>
            <Link href="/pricing">PRICING</Link>
            <Link href="/resources" className="text-[#FDFCF9] font-bold border-b-2 border-[#C8A248] pb-1">RESOURCES</Link>
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <label className="flex items-center gap-2.5 bg-white/90 border border-[#D9D1B5] rounded-lg px-3.5 py-2 w-[200px]">
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="#4A4A45" strokeWidth="1.6" style={svgDebugStyle}><circle cx="8" cy="8" r="5.5"/><path d="M12 12 L16 16"/></svg>
              <input type="text" placeholder="Search..." className="border-none outline-none bg-transparent font-inter text-xs text-[#1F2E24] w-full"/>
            </label>
          </div>
        </header>

        <div className="relative z-10 px-6 sm:px-10 md:px-[70px] pt-6 sm:pt-8 md:pt-10 max-w-[500px]">
          <h1 className="font-playfair text-3xl sm:text-4xl md:text-[56px] font-medium text-[#FDFCF9] m-0" style={{ textShadow: '0 2px 20px rgba(15,20,12,.5)' }}>Resources</h1>
          <p className="text-sm sm:text-base md:text-[17px] leading-relaxed text-[#FDFCF9] mt-3 sm:mt-4 max-w-[380px]" style={{ textShadow: '0 1px 14px rgba(15,20,12,.55)' }}>
            Guides, tools, and curated helps to keep you oriented in Scripture.
          </p>
        </div>
      </section>

      {/* CATEGORY CARDS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 px-4 sm:px-8 md:px-12 py-5 sm:py-6">
        {CATEGORIES.map((cat) => (
          <div key={cat.title} className="bg-[#FDFCF9] border border-[#E5E0D3] rounded-lg p-3 sm:p-4 flex gap-2.5 sm:gap-3 items-start">
            <span className="flex-none">{cat.icon}</span>
            <div>
              <div className="font-playfair text-sm sm:text-base font-medium">{cat.title}</div>
              <div className="text-[10px] sm:text-[11px] leading-snug text-[#4A4A45] mt-1">{cat.description}</div>
            </div>
          </div>
        ))}
      </section>

      {/* FEATURED */}
      <section className="px-4 sm:px-8 md:px-12 py-2 sm:py-4 flex-1">
        <div className="flex flex-col md:flex-row gap-4 md:gap-5">
          <div className="md:w-[180px] lg:w-[200px] pt-2">
            <div className="text-[9px] sm:text-[10px] tracking-[2px] font-bold text-[#C8A248]">FEATURED</div>
            <h2 className="font-playfair text-xl sm:text-2xl font-medium text-[#2E3A30] mt-2 mb-3">Curated helps</h2>
            <a href="#" className="font-playfair text-xs sm:text-[13px] text-[#3A4A2E] border-b border-[#C8A248] pb-0.5" style={linkDebugStyle}>
              View All →
            </a>
          </div>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {FEATURED.map((resource) => (
              <div key={resource.title} className="bg-[#FDFCF9] border border-[#E5E0D3] rounded-lg overflow-hidden">
                <div className="h-16 sm:h-20 md:h-[90px] bg-[#3A4A2E] flex items-center justify-center">
                  <span className="text-[#C8A248] text-[9px] sm:text-[10px] tracking-wider">Image</span>
                </div>
                <div className="p-3 sm:p-4">
                  <div className="font-playfair text-sm sm:text-[15px] font-medium">{resource.title}</div>
                  <div className="text-[10px] sm:text-[11px] leading-snug text-[#4A4A45] mt-1">{resource.description}</div>
                  <a href="#" className="font-playfair inline-block text-[11px] sm:text-xs text-[#3A4A2E] border-b border-[#C8A248] pb-0.5 mt-2" style={linkDebugStyle}>
                    Read →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="px-4 sm:px-8 md:px-12 pb-6 sm:pb-7">
        <div className="bg-[#EDEAE0] border-t border-[#E0DACB] rounded-lg flex flex-col sm:flex-row items-center gap-4 sm:gap-5 p-4 sm:p-5 md:px-8">
          <span className="flex-none w-10 h-10 sm:w-12 sm:h-12 border-[1.5px] border-[#C8A248] rounded-full flex items-center justify-center bg-[#F7F5F1]">
            <svg width="18" height="20" viewBox="0 0 34 38" fill="none" stroke="#C8A248" strokeWidth="1.4" style={svgDebugStyle}>
              <path d="M17 36 V14" />
              <path d="M17 20 C17 14 13 11 8 11 C8 17 12 20 17 20 Z M17 16 C17 10 21 7 26 7 C26 13 22 16 17 16 Z" />
            </svg>
          </span>
          <div className="flex-1 text-center sm:text-left">
            <div className="font-playfair text-lg sm:text-xl md:text-[22px] font-medium text-[#1F2E24]">Stay rooted in the Word.</div>
            <div className="text-[11px] sm:text-xs text-[#4A4A45] mt-0.5">Explore resources that help you read with clarity and peace.</div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
            <Link href="#" className="font-playfair bg-[#3A4A2E] text-[#F7F5F1] px-5 sm:px-6 py-2.5 rounded-md text-xs sm:text-sm" style={linkDebugStyle}>
              Explore Resources
            </Link>
            <a href="#" className="font-playfair text-xs sm:text-sm text-[#3A4A2E] border-b border-[#C8A248] pb-0.5" style={linkDebugStyle}>
              Start Reading →
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
