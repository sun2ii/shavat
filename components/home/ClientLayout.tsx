'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sidebar } from './Sidebar';

// Debug: Add red border to highlight manually created SVGs
const svgDebugStyle = { border: '2px solid red' };
// Debug: Add purple border to highlight links that go nowhere (need to be implemented)
const linkDebugStyle = { border: '2px solid purple' };
// Links that lead to 404 pages
const brokenLinks = ['#', '/timeline', '/search'];
const isBrokenLink = (href: string) => brokenLinks.includes(href);

export function ClientLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div
      className="min-h-screen"
      style={{
        display: 'grid',
        gridTemplateColumns: sidebarOpen ? '222px 1fr' : '64px 1fr',
        background: '#F7F5F1',
        fontFamily: "'Inter', system-ui, sans-serif",
        color: '#1F2E24',
        WebkitFontSmoothing: 'antialiased',
        transition: 'grid-template-columns 0.3s ease'
      }}
    >
      {/* SIDEBAR */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* MAIN */}
      <main style={{ minWidth: 0 }}>
        {/* HERO */}
        <section style={{ position: 'relative', height: '340px' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/river.png)', backgroundSize: '120%', backgroundPosition: 'center 40%' }} />

          {/* Top bar */}
          <header style={{ position: 'relative', zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '28px', padding: '20px 32px 0 44px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '30px', fontSize: '12.5px', letterSpacing: '2px', color: 'rgba(255,255,255,0.85)', fontWeight: 500, whiteSpace: 'nowrap' }}>
              <Link href="/" style={{ color: '#FDFCF9', fontWeight: 700, borderBottom: '2px solid #C8A248', paddingBottom: '6px' }}>HOME</Link>
              <Link href="/features" className="hover:text-[#C8A248]">FEATURES</Link>
              <Link href="/how-it-works" className="hover:text-[#C8A248]">HOW IT WORKS</Link>
              <Link href="/about" className="hover:text-[#C8A248]">ABOUT</Link>
              <Link href="/pricing" className="hover:text-[#C8A248]">PRICING</Link>
              <Link href="/resources" className="hover:text-[#C8A248]">RESOURCES</Link>
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', whiteSpace: 'nowrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.92)', border: '1px solid #D9D1B5', borderRadius: '8px', padding: '11px 16px', width: '220px' }}>
                <svg width="15" height="15" viewBox="0 0 18 18" fill="none" stroke="#4A4A45" strokeWidth="1.6" style={svgDebugStyle}><circle cx="8" cy="8" r="5.5"/><path d="M12 12 L16 16"/></svg>
                <input type="text" placeholder="Search Scripture or topics..." style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: "'Inter', sans-serif", fontSize: '13px', color: '#1F2E24', width: '100%' }}/>
              </label>
            </div>
          </header>

          {/* Hero copy */}
          <div style={{ position: 'relative', zIndex: 2, padding: '24px 0 0 46px', maxWidth: '560px' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', color: '#C8A248', marginBottom: '4px' }}>Good morning.</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '42px', lineHeight: 1.1, fontWeight: 600, color: '#FDFCF9', margin: 0, textShadow: '0 2px 24px rgba(20,30,20,0.45)' }}>
              Welcome to Shavat
              <svg width="44" height="30" viewBox="0 0 64 34" fill="none" stroke="#C8A248" strokeWidth="1.4" style={{ display: 'inline-block', verticalAlign: 'baseline', marginLeft: '6px', ...svgDebugStyle }}>
                <path d="M6 30 C22 26 40 18 58 4"/>
                <path d="M16 26 C15 21 17 18 21 17 C21 22 20 25 16 26 Z M26 21 C25 16 27 13 31 12 C31 17 30 20 26 21 Z M38 15 C37 10 39 7 43 6 C43 11 42 14 38 15 Z"/>
              </svg>
            </h1>
            <div style={{ fontSize: '15px', lineHeight: 1.5, color: '#FDFCF9', marginTop: '10px', textShadow: '0 1px 14px rgba(20,30,20,0.55)' }}>Stay oriented in Scripture. See the big picture. Read with confidence.</div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.95)', borderRadius: '10px', padding: '12px 16px', width: '300px', marginTop: '16px', boxShadow: '0 10px 30px rgba(20,30,20,0.25)' }}>
              <svg width="17" height="17" viewBox="0 0 18 18" fill="none" stroke="#4A4A45" strokeWidth="1.6" style={svgDebugStyle}><circle cx="8" cy="8" r="5.5"/><path d="M12 12 L16 16"/></svg>
              <input type="text" placeholder="Search Scripture or topics..." style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: "'Inter', sans-serif", fontSize: '14px', color: '#1F2E24', width: '100%' }}/>
            </label>
          </div>
        </section>

        {/* CONTENT GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '18px', padding: '18px 24px 0 24px', alignItems: 'start' }}>
          {/* LEFT COLUMN */}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: '10px', letterSpacing: '2.4px', fontWeight: 700, color: '#4A4A45', margin: '0 0 10px' }}>EXPLORE SHAVAT</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', alignItems: 'stretch' }}>
              {[
                { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1F2E24" strokeWidth="1.4" style={svgDebugStyle}><path d="M12 3 C7 8 7 16 12 21 C17 16 17 8 12 3 Z M12 3 V21"/></svg>, title: 'Orientation View', desc: 'See where you are in the book and the bigger story.', link: '/terrain', linkText: 'OPEN VIEW' },
                { icon: <svg width="24" height="24" viewBox="0 0 18 18" fill="none" stroke="#1F2E24" strokeWidth="1.3" style={svgDebugStyle}><path d="M9 4 C7.2 2.9 4.6 2.6 2 3.2 V14.5 C4.6 13.9 7.2 14.2 9 15.3 C10.8 14.2 13.4 13.9 16 14.5 V3.2 C13.4 2.6 10.8 2.9 9 4 Z M9 4 V15.3"/></svg>, title: 'Read Scripture', desc: 'Read and understand Scripture with clarity.', link: '/library', linkText: 'START READING' },
                { icon: <svg width="24" height="24" viewBox="0 0 18 18" fill="none" stroke="#1F2E24" strokeWidth="1.3" style={svgDebugStyle}><circle cx="9" cy="9" r="7"/><path d="M9 5 V9 L12 11"/></svg>, title: 'Timeline', desc: 'See events in historical order and context.', link: '/timeline', linkText: 'VIEW TIMELINE' },
                { icon: <svg width="24" height="24" viewBox="0 0 18 18" fill="none" stroke="#1F2E24" strokeWidth="1.3" style={svgDebugStyle}><path d="M2 6.5 C4 4.5 6 4.5 8 6.5 C10 8.5 12 8.5 14 6.5 M2 11.5 C4 9.5 6 9.5 8 11.5 C10 13.5 12 13.5 14 11.5" transform="translate(1 0)"/></svg>, title: 'Terrain', desc: 'Follow the main storyline of Scripture.', link: '/terrain', linkText: 'VIEW TERRAIN' },
                { icon: <svg width="24" height="24" viewBox="0 0 18 18" fill="none" stroke="#1F2E24" strokeWidth="1.3" style={svgDebugStyle}><circle cx="8" cy="8" r="5.5"/><path d="M12 12 L16 16"/></svg>, title: 'Search Scripture', desc: 'Find passages, themes, and topics quickly.', link: '/search', linkText: 'SEARCH' },
              ].map((card, i) => (
                <div key={i} style={{ background: '#FDFCF9', border: '1px solid #E5E0D3', borderRadius: '8px', padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%' }}>
                  <span style={{ width: '44px', height: '44px', border: '1px solid #D9D1B5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{card.icon}</span>
                  <div style={{ fontSize: '13px', fontWeight: 600, marginTop: '10px' }}>{card.title}</div>
                  <div style={{ fontSize: '11px', lineHeight: 1.4, color: '#7A7A74', marginTop: '6px' }}>{card.desc}</div>
                  <Link href={card.link} className="hover:text-[#C8A248]" style={{ fontSize: '10px', letterSpacing: '1.5px', fontWeight: 700, color: '#1F2E24', marginTop: 'auto', paddingTop: '10px', ...(isBrokenLink(card.link) ? linkDebugStyle : {}) }}>{card.linkText} →</Link>
                </div>
              ))}
            </div>

            {/* INSIGHT + PASSAGES */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '14px' }}>
              <div style={{ background: '#FDFCF9', border: '1px solid #E5E0D3', borderRadius: '8px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', letterSpacing: '2px', fontWeight: 700, color: '#4A4A45' }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#C8A248" strokeWidth="1.4" style={svgDebugStyle}><path d="M8 1 V2.5 M8 13.5 V15 M1 8 H2.5 M13.5 8 H15 M3 3 L4 4 M12 12 L13 13 M13 3 L12 4"/><circle cx="8" cy="8" r="3.4"/></svg>
                  DAILY INSIGHT
                </div>
                <div style={{ fontSize: '13px', lineHeight: 1.5, color: '#2E3A30', marginTop: '10px' }}>In every season, God raises up people who are willing to say yes. He can use you right where you are.</div>
                <Link href="#" className="hover:text-[#C8A248]" style={{ display: 'inline-block', fontSize: '10px', letterSpacing: '1.5px', fontWeight: 700, color: '#1F2E24', marginTop: '10px', ...linkDebugStyle }}>READ INSIGHT →</Link>
              </div>

              <div style={{ background: '#FDFCF9', border: '1px solid #E5E0D3', borderRadius: '8px', padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', letterSpacing: '2px', fontWeight: 700, color: '#4A4A45' }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#C8A248" strokeWidth="1.5" style={svgDebugStyle}><path d="M2 12 L7 7 L10 10 L14 4 M9 4 H14 V9"/></svg>
                  POPULAR PASSAGES
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                  {[
                    { num: '01', ref: 'Psalm 23:1–4', title: "The Shepherd's Care" },
                    { num: '02', ref: 'Romans 8:28', title: 'God Works for Good' },
                    { num: '03', ref: 'John 15:5', title: 'Abide in Me' },
                  ].map((p) => (
                    <Link key={p.num} href="#" className="hover:text-[#C8A248]" style={{ display: 'flex', alignItems: 'baseline', gap: '10px', ...linkDebugStyle }}>
                      <span style={{ fontSize: '10px', color: '#B0A98F', fontWeight: 600 }}>{p.num}</span>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '14px', fontWeight: 600, whiteSpace: 'nowrap' }}>{p.ref}</span>
                      <span style={{ fontSize: '11px', color: '#7A7A74' }}>{p.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT RAIL */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: '#FDFCF9', border: '1px solid #E5E0D3', borderRadius: '8px', padding: '14px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '2px', fontWeight: 700, color: '#4A4A45' }}>READING PROGRESS</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '12px' }}>
                <svg width="56" height="56" viewBox="0 0 76 76" style={svgDebugStyle}>
                  <circle cx="38" cy="38" r="32" fill="none" stroke="#E5E0D3" strokeWidth="5"/>
                  <circle cx="38" cy="38" r="32" fill="none" stroke="#1F2E24" strokeWidth="5" strokeLinecap="round" strokeDasharray="56.3 144.8" transform="rotate(-90 38 38)"/>
                  <text x="38" y="43" textAnchor="middle" style={{ fontFamily: "'Inter', sans-serif", fontSize: '15px', fontWeight: 600, fill: '#1F2E24' }}>28%</text>
                </svg>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: 600 }}>Judges</div>
                  <div style={{ fontSize: '11px', color: '#7A7A74', lineHeight: 1.4, marginTop: '2px' }}>6 of 21 chapters</div>
                </div>
              </div>
              <Link href="#" className="hover:text-[#C8A248]" style={{ display: 'inline-block', fontSize: '10px', letterSpacing: '1.5px', fontWeight: 700, color: '#1F2E24', marginTop: '12px', ...linkDebugStyle }}>VIEW PLAN →</Link>
            </div>

            <div style={{ background: '#FDFCF9', border: '1px solid #E5E0D3', borderRadius: '8px', padding: '14px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '2px', fontWeight: 700, color: '#4A4A45', marginBottom: '4px' }}>RECENTLY READ</div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {['Judges 5', 'Judges 4', 'Judges 3'].map((ch, i) => (
                  <Link key={ch} href={`/judges/${5-i}`} className="hover:text-[#C8A248]" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: i < 2 ? '1px solid #EFEAE0' : 'none' }}>
                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="#1F2E24" strokeWidth="1.3" style={svgDebugStyle}><path d="M9 4 C7.2 2.9 4.6 2.6 2 3.2 V14.5 C4.6 13.9 7.2 14.2 9 15.3 C10.8 14.2 13.4 13.9 16 14.5 V3.2 C13.4 2.6 10.8 2.9 9 4 Z M9 4 V15.3"/></svg>
                    <span style={{ flex: 1 }}>
                      <span style={{ display: 'block', fontSize: '12px', fontWeight: 600 }}>{ch}</span>
                      <span style={{ display: 'block', fontSize: '10px', color: '#7A7A74', marginTop: '1px' }}>May {14-i}, 2024</span>
                    </span>
                    <span style={{ color: '#B0A98F', fontSize: '12px' }}>›</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAND */}
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 340px', gap: '14px', padding: '14px 24px 20px', alignItems: 'stretch' }}>
          <div style={{ background: '#F3F0E8', border: '1px solid #E5E0D3', borderRadius: '8px', padding: '14px', display: 'flex', gap: '10px' }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', lineHeight: 0.7, color: '#C8A248', marginTop: '6px' }}>"</span>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '13px', lineHeight: 1.5, color: '#1F2E24' }}>Your word is a lamp to my feet and a light to my path."</div>
              <div style={{ fontSize: '11px', color: '#7A7A74', marginTop: '6px' }}>— Psalm 119:105</div>
            </div>
          </div>

          <div style={{ background: '#F3F0E8', border: '1px solid #E5E0D3', borderRadius: '8px', padding: '14px 8px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', alignItems: 'center' }}>
            {[
              { icon: <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="#1F2E24" strokeWidth="1.2" style={svgDebugStyle}><path d="M9 4 C7.2 2.9 4.6 2.6 2 3.2 V14.5 C4.6 13.9 7.2 14.2 9 15.3 C10.8 14.2 13.4 13.9 16 14.5 V3.2 C13.4 2.6 10.8 2.9 9 4 Z M9 4 V15.3"/></svg>, text: 'Whole story' },
              { icon: <svg width="20" height="20" viewBox="0 0 20 18" fill="none" stroke="#1F2E24" strokeWidth="1.2" style={svgDebugStyle}><path d="M10 16 C4 12 1.5 8.5 1.5 5.6 C1.5 3.3 3.3 1.5 5.6 1.5 C7.4 1.5 9.1 2.6 10 4.2 C10.9 2.6 12.6 1.5 14.4 1.5 C16.7 1.5 18.5 3.3 18.5 5.6 C18.5 8.5 16 12 10 16 Z"/></svg>, text: 'Grow daily' },
              { icon: <svg width="20" height="20" viewBox="0 0 18 20" fill="none" stroke="#1F2E24" strokeWidth="1.2" style={svgDebugStyle}><path d="M9 1 L16.5 4 V9 C16.5 14 13.5 17.5 9 19 C4.5 17.5 1.5 14 1.5 9 V4 Z M5.8 9.6 L8.2 12 L12.4 7.4"/></svg>, text: 'With care' },
              { icon: <svg width="20" height="20" viewBox="0 0 18 20" fill="none" stroke="#1F2E24" strokeWidth="1.2" style={svgDebugStyle}><rect x="2.5" y="8.5" width="13" height="9.5" rx="1.6"/><path d="M5.5 8.5 V5.5 C5.5 3.6 7 2 9 2 C11 2 12.5 3.6 12.5 5.5 V8.5 M9 12.5 V14.5"/></svg>, text: 'Private' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '6px', padding: '0 8px', borderRight: i < 3 ? '1px solid #E0DACB' : 'none' }}>
                {item.icon}
                <div style={{ fontSize: '10px', lineHeight: 1.3, color: '#4A4A45' }}>{item.text}</div>
              </div>
            ))}
          </div>

          <div style={{ background: '#F3F0E8', border: '1px solid #E5E0D3', borderRadius: '8px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '15px', fontWeight: 600 }}>Go deeper with Premium</div>
              <div style={{ fontSize: '11px', lineHeight: 1.4, color: '#4A4A45', marginTop: '4px' }}>Unlock devotionals, journals, and more.</div>
              <Link href="#" className="hover:bg-[#3A4A3C]" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#1F2E24', color: '#F7F5F1', padding: '8px 14px', borderRadius: '5px', fontSize: '10px', letterSpacing: '1.5px', fontWeight: 600, marginTop: '10px', ...linkDebugStyle }}>PREMIUM →</Link>
            </div>
            <svg width="60" height="50" viewBox="0 0 88 72" fill="none" stroke="#8A9B6E" strokeWidth="1.3" style={{ flex: 'none', ...svgDebugStyle }}>
              <path d="M10 66 C34 56 58 36 80 8"/>
              <path d="M24 58 C22 50 25 45 32 43 C33 51 30 56 24 58 Z M40 46 C38 38 41 33 48 31 C49 39 46 44 40 46 Z M58 30 C56 22 59 17 66 15 C67 23 64 28 58 30 Z M32 63 C39 59 45 59 50 63 C43 67 37 67 32 63 Z M50 51 C57 47 63 47 68 51 C61 55 55 55 50 51 Z M66 35 C73 31 79 31 84 35 C77 39 71 39 66 35 Z" fill="#F3F0E8"/>
            </svg>
          </div>
        </div>
      </main>
    </div>
  );
}
