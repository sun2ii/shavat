'use client';

import Link from 'next/link';

// Debug: Add red border to highlight manually created SVGs
const svgDebugStyle = { border: '2px solid red' };

export default function FeaturesPage() {
  return (
      <div
        className="font-inter"
        style={{
          background: '#F7F5F1',
          color: '#1F2E24',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* HERO */}
        <section style={{ position: 'relative', height: 340 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/heirloom-farms-2.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />

          {/* Top navbar - inside hero */}
          <header style={{ position: 'relative', zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '28px', padding: '20px 32px 0 44px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '30px', fontSize: '12.5px', letterSpacing: '2px', color: 'rgba(255,255,255,0.85)', fontWeight: 500, whiteSpace: 'nowrap' }}>
              <Link href="/">HOME</Link>
              <Link href="/features" style={{ color: '#FDFCF9', fontWeight: 700, borderBottom: '2px solid #C8A248', paddingBottom: '6px' }}>FEATURES</Link>
              <Link href="/how-it-works">HOW IT WORKS</Link>
              <Link href="/about">ABOUT</Link>
              <Link href="/pricing">PRICING</Link>
              <Link href="/resources">RESOURCES</Link>
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', whiteSpace: 'nowrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.92)', border: '1px solid #D9D1B5', borderRadius: '8px', padding: '8px 14px', width: '200px' }}>
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="#4A4A45" strokeWidth="1.6" style={svgDebugStyle}><circle cx="8" cy="8" r="5.5"/><path d="M12 12 L16 16"/></svg>
                <input type="text" placeholder="Search..." style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#1F2E24', width: '100%' }}/>
              </label>
            </div>
          </header>

          <div style={{ position: 'relative', zIndex: 2, padding: '40px 0 0 70px', maxWidth: 520 }}>
            <h1 className="font-playfair" style={{ fontSize: 56, fontWeight: 600, color: '#FDFCF9', margin: 0, textShadow: '0 2px 20px rgba(15,22,15,.5)' }}>Features</h1>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: '#FDFCF9', margin: '16px 0 0', maxWidth: 380, textShadow: '0 1px 14px rgba(15,22,15,.55)' }}>
              The core tools you need to stay oriented in Scripture.
            </p>
          </div>
        </section>

        {/* FREE VERSION - 3-column grid */}
        <section style={{ padding: '28px 50px 24px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
            <span style={{ height: 1, width: 80, background: '#C8A248' }} />
            <span style={{ fontSize: 11, letterSpacing: 2.5, fontWeight: 600, color: '#C8A248' }}>FREE VERSION INCLUDES</span>
            <span style={{ height: 1, width: 80, background: '#C8A248' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 16 }}>
            {/* Bible */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ width: 64, height: 64, borderRadius: '50%', background: '#2E3A28', border: '2px solid #C8A248', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8A248" strokeWidth="1.2" style={svgDebugStyle}>
                  <path d="M12 6 C10 4.6 7 4.3 4 5 V18 C7 17.3 10 17.6 12 19 C14 17.6 17 17.3 20 18 V5 C17 4.3 14 4.6 12 6 Z M12 6 V19" />
                </svg>
              </span>
              <div className="font-playfair" style={{ fontSize: 22, fontWeight: 600, marginTop: 10 }}>Bible</div>
              <span style={{ height: 2, width: 32, background: '#C8A248', margin: '6px 0 8px' }} />
              <div style={{ fontSize: 11, letterSpacing: 1.2, lineHeight: 1.6, color: '#2E3A30', fontWeight: 600, maxWidth: 220 }}>
                READ THE FULL TEXT OF SCRIPTURE
              </div>
            </div>

            {/* Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ width: 64, height: 64, borderRadius: '50%', background: '#2E3A28', border: '2px solid #C8A248', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#C8A248" strokeWidth="1.2" style={svgDebugStyle}>
                  <path d="M3 12 H8 M11.5 12 H12.5 M16 12 H21" />
                  <circle cx="9.8" cy="12" r="1.8" />
                  <circle cx="14.2" cy="12" r="1.8" />
                </svg>
              </span>
              <div className="font-playfair" style={{ fontSize: 22, fontWeight: 600, marginTop: 10 }}>Timeline</div>
              <span style={{ height: 2, width: 32, background: '#C8A248', margin: '6px 0 8px' }} />
              <div style={{ fontSize: 11, letterSpacing: 1.2, lineHeight: 1.6, color: '#2E3A30', fontWeight: 600, maxWidth: 240 }}>
                EXPLORE BIBLICAL HISTORY IN CHRONOLOGICAL ORDER
              </div>
            </div>

            {/* Spine */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ width: 64, height: 64, borderRadius: '50%', background: '#2E3A28', border: '2px solid #C8A248', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C8A248" strokeWidth="1.2" style={svgDebugStyle}>
                  <path d="M12 4 L20 8.5 L12 13 L4 8.5 Z M4 12 L12 16.5 L20 12 M4 15.5 L12 20 L20 15.5" />
                </svg>
              </span>
              <div className="font-playfair" style={{ fontSize: 22, fontWeight: 600, marginTop: 10 }}>Spine</div>
              <span style={{ height: 2, width: 32, background: '#C8A248', margin: '6px 0 8px' }} />
              <div style={{ fontSize: 11, letterSpacing: 1.2, lineHeight: 1.6, color: '#2E3A30', fontWeight: 600, maxWidth: 240 }}>
                SEE HOW THE BOOKS FIT TOGETHER AS ONE STORY
              </div>
            </div>
          </div>
        </section>

        {/* PREMIUM BAND */}
        <section style={{ padding: '8px 50px 28px' }}>
          <div style={{ background: '#EDE9DC', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 20, padding: '18px 28px' }}>
            <svg width="36" height="32" viewBox="0 0 54 48" fill="none" stroke="#C8A248" strokeWidth="1.4" style={{ flex: 'none', ...svgDebugStyle }}>
              <path d="M8 44 C18 38 30 26 46 8" />
              <path d="M18 34 C16 27 19 22 25 21 C25 28 23 32 18 34 Z M30 22 C28 15 31 10 37 9 C37 16 35 20 30 22 Z M24 40 C29 36 34 36 38 39 C33 43 28 43 24 40 Z" />
            </svg>
            <div style={{ flex: 1, fontSize: 14, lineHeight: 1.5, color: '#2E3A30' }}>
              More tools and deeper insights are available with <strong>Shavat Premium</strong>. Upgrade anytime to unlock the full experience.
            </div>
            <Link href="/pricing" style={{ flex: 'none', background: '#1F2E24', color: '#F7F5F1', padding: '12px 28px', borderRadius: 6, fontSize: 11, letterSpacing: 2, fontWeight: 600 }}>
              VIEW PREMIUM
            </Link>
          </div>
        </section>
      </div>
  );
}
