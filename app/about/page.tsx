'use client';

import Link from 'next/link';

// Debug: Add red border to highlight manually created SVGs
const svgDebugStyle = { border: '2px solid red' };
// Debug: Add purple border to highlight links that go nowhere (need to be implemented)
const linkDebugStyle = { border: '2px solid purple' };

export default function AboutPage() {
  return (
      <div className="font-inter" style={{ background: '#F7F5F1', color: '#1F2E24', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* HERO */}
        <section style={{ position: 'relative', height: 340 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/ocean.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #F7F5F1 0%, rgba(247,245,241,0.95) 25%, rgba(247,245,241,0.5) 45%, rgba(247,245,241,0) 60%)', pointerEvents: 'none' }} />

          {/* Top navbar - inside hero */}
          <header style={{ position: 'relative', zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '28px', padding: '20px 32px 0 44px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '30px', fontSize: '12.5px', letterSpacing: '2px', color: '#3A4A3C', fontWeight: 500, whiteSpace: 'nowrap' }}>
              <Link href="/">HOME</Link>
              <Link href="/features">FEATURES</Link>
              <Link href="/how-it-works">HOW IT WORKS</Link>
              <Link href="/about" style={{ color: '#1F2E24', fontWeight: 700, borderBottom: '2px solid #C8A248', paddingBottom: '6px' }}>ABOUT</Link>
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

          <div style={{ position: 'relative', zIndex: 2, padding: '40px 0 0 70px', maxWidth: 480 }}>
            <h1 className="font-playfair" style={{ fontSize: 56, fontWeight: 500, color: '#2E3A28', margin: 0 }}>About Shavat</h1>
            <div className="font-playfair" style={{ fontStyle: 'italic', fontSize: 18, lineHeight: 1.6, color: '#B08A2E', marginTop: 16, maxWidth: 400 }}>
              Helping readers stay oriented in Scripture with clarity, context, and peace.
            </div>
          </div>
        </section>

        {/* THREE PILLARS */}
        <section style={{ padding: '24px 40px 16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ background: '#FBF8F1', border: '1px solid #EAE4D4', borderRadius: 12, display: 'grid', gridTemplateColumns: '1fr 1px 1fr 1px 1fr', padding: '24px 8px' }}>
            {/* Pillar 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: 14, padding: '0 20px', alignItems: 'start' }}>
              <span style={{ width: 52, height: 52, borderRadius: '50%', background: '#EFE9D8', border: '1px solid #DFD6BC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8A6D1F" strokeWidth="1.1" style={svgDebugStyle}>
                  <circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="1" />
                  <path d="M15.5 8.5 L13 11 L11 13 L8.5 15.5 L11 11 Z M15.5 8.5 L13 13 L8.5 15.5 L13 11 Z" />
                </svg>
              </span>
              <div>
                <div className="font-playfair" style={{ fontSize: 18, fontWeight: 500, color: '#2E3A28' }}>Why Shavat Exists</div>
                <div style={{ fontSize: 12, lineHeight: 1.5, color: '#3A4A3C', marginTop: 6 }}>
                  Scripture is a unified story. Shavat helps you stay oriented so every reading connects to the whole.
                </div>
              </div>
            </div>

            <span style={{ background: '#E0DACB' }} />

            {/* Pillar 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: 14, padding: '0 20px', alignItems: 'start' }}>
              <span style={{ width: 52, height: 52, borderRadius: '50%', background: '#EFE9D8', border: '1px solid #DFD6BC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#8A6D1F" strokeWidth="1.1" style={svgDebugStyle}>
                  <path d="M12 6 C10 4.6 7 4.3 4 5 V18 C7 17.3 10 17.6 12 19 C14 17.6 17 17.3 20 18 V5 C17 4.3 14 4.6 12 6 Z M12 6 V19" />
                </svg>
              </span>
              <div>
                <div className="font-playfair" style={{ fontSize: 18, fontWeight: 500, color: '#2E3A28' }}>What Makes It Different</div>
                <div style={{ fontSize: 12, lineHeight: 1.5, color: '#3A4A3C', marginTop: 6 }}>
                  Orientation before information. We show context and connections first so the big picture comes into focus.
                </div>
              </div>
            </div>

            <span style={{ background: '#E0DACB' }} />

            {/* Pillar 3 */}
            <div style={{ display: 'grid', gridTemplateColumns: '56px 1fr', gap: 14, padding: '0 20px', alignItems: 'start' }}>
              <span style={{ width: 52, height: 52, borderRadius: '50%', background: '#EFE9D8', border: '1px solid #DFD6BC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 40 40" fill="none" stroke="#8A6D1F" strokeWidth="1.2" style={svgDebugStyle}>
                  <path d="M10 34 C18 28 24 18 30 6" />
                  <path d="M15 26 C14 21 16 18 20 17 C20 22 19 25 15 26 Z M22 17 C21 12 23 9 27 8 C27 13 26 16 22 17 Z M17 31 C21 28 25 28 28 30 C24 33 20 33 17 31 Z" />
                </svg>
              </span>
              <div>
                <div className="font-playfair" style={{ fontSize: 18, fontWeight: 500, color: '#2E3A28' }}>Built to Serve the Text</div>
                <div style={{ fontSize: 12, lineHeight: 1.5, color: '#3A4A3C', marginTop: 6 }}>
                  Calm, uncluttered, and ad-free. Every feature is designed to serve Scripture, never to distract.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QUOTE ROW */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: 0, padding: '16px 100px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', padding: '0 24px' }}>
            <div className="font-playfair" style={{ fontStyle: 'italic', fontSize: 26, fontWeight: 500, color: '#2E3A28' }}>
              &quot;Know where you are in Scripture.&quot;
            </div>
          </div>
          <span style={{ background: '#D9D1B5', height: 50 }} />
          <div style={{ padding: '0 36px' }}>
            <div className="font-playfair" style={{ fontStyle: 'italic', fontSize: 14, lineHeight: 1.6, color: '#3A4A3C' }}>
              When you know where you are, you read with confidence. When you see the whole, you understand more deeply.
            </div>
          </div>
        </section>

        {/* CTA BAND */}
        <section style={{ padding: '8px 50px 28px' }}>
          <div style={{ background: '#EDE9DC', border: '1px solid #E0DACB', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 24, padding: '18px 32px' }}>
            <svg width="40" height="34" viewBox="0 0 64 52" fill="none" stroke="#8A6D1F" strokeWidth="1.3" style={{ flex: 'none', ...svgDebugStyle }}>
              <path d="M32 12 C27 8 19 7 10 9 V42 C19 40 27 41 32 45 C37 41 45 40 54 42 V9 C45 7 37 8 32 12 Z M32 12 V45" />
              <path d="M32 30 C32 24 29 21 24 21 C24 27 27 30 32 30 Z M32 27 C32 21 35 18 40 18 C40 24 37 27 32 27 Z" />
            </svg>
            <div className="font-playfair" style={{ fontSize: 24, fontWeight: 500, color: '#2E3A28', flex: 'none' }}>Ready to begin?</div>
            <span style={{ background: '#C9C2A8', width: 1, height: 36, flex: 'none' }} />
            <div style={{ flex: 1, fontSize: 14, lineHeight: 1.5, color: '#2E3A30' }}>
              Open Scripture with clarity and peace. Let Shavat guide you through the story.
            </div>
            <a href="#" style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, background: '#3A4A2E', color: '#F7F5F1', padding: '12px 26px', borderRadius: 6, fontSize: 12, letterSpacing: 2, fontWeight: 600, ...linkDebugStyle }}>
              <svg width="14" height="12" viewBox="0 0 40 32" fill="none" stroke="#C8A248" strokeWidth="1.8" style={svgDebugStyle}>
                <path d="M4 28 C14 24 24 16 36 4" />
                <path d="M12 22 C11 17 13 14 17 13 C17 18 16 21 12 22 Z M20 15 C19 10 21 7 25 6 C25 11 24 14 20 15 Z" />
              </svg>
              START READING
            </a>
          </div>
        </section>
      </div>
  );
}
