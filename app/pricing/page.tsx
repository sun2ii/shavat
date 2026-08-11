'use client';

import Link from 'next/link';

// Debug: Add red border to highlight manually created SVGs
const svgDebugStyle = { border: '2px solid red' };
// Debug: Add purple border to highlight links that go nowhere (need to be implemented)
const linkDebugStyle = { border: '2px solid purple' };

const FREE_FEATURES = ['Bible / Read', 'Timeline', 'Spine', 'Orientation tools', 'Search', 'Web + mobile'];
const PREMIUM_FEATURES = ['Highlights', 'Bookmarks', 'Journal / notes', 'Daily devotionals', 'Guide questions', 'Reading plans'];

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#C8A248" strokeWidth="1.3" style={{ flex: 'none', ...svgDebugStyle }}>
      <circle cx="8" cy="8" r="7" />
      <path d="M5 8.2 L7.2 10.2 L11 5.8" />
    </svg>
  );
}

export default function PricingPage() {
  return (
      <div className="font-inter" style={{ background: '#F7F5F1', color: '#1F2E24', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* HERO */}
        <section style={{ position: 'relative', height: 340 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/sky.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />

          {/* Top navbar - inside hero */}
          <header style={{ position: 'relative', zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '28px', padding: '20px 32px 0 44px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '30px', fontSize: '12.5px', letterSpacing: '2px', color: 'rgba(255,255,255,0.85)', fontWeight: 500, whiteSpace: 'nowrap' }}>
              <Link href="/">HOME</Link>
              <Link href="/features">FEATURES</Link>
              <Link href="/how-it-works">HOW IT WORKS</Link>
              <Link href="/about">ABOUT</Link>
              <Link href="/pricing" style={{ color: '#FDFCF9', fontWeight: 700, borderBottom: '2px solid #C8A248', paddingBottom: '6px' }}>PRICING</Link>
              <Link href="/resources">RESOURCES</Link>
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', whiteSpace: 'nowrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.92)', border: '1px solid #D9D1B5', borderRadius: '8px', padding: '8px 14px', width: '200px' }}>
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="#4A4A45" strokeWidth="1.6" style={svgDebugStyle}><circle cx="8" cy="8" r="5.5"/><path d="M12 12 L16 16"/></svg>
                <input type="text" placeholder="Search..." style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#1F2E24', width: '100%' }}/>
              </label>
            </div>
          </header>

          <div style={{ position: 'relative', zIndex: 2, padding: '40px 0 0 70px', maxWidth: 500 }}>
            <h1 className="font-playfair" style={{ fontSize: 56, fontWeight: 500, color: '#FDFCF9', margin: 0, textShadow: '0 2px 20px rgba(12,18,10,.5)' }}>Pricing</h1>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: '#FDFCF9', margin: '16px 0 0', maxWidth: 380, textShadow: '0 1px 14px rgba(12,18,10,.55)' }}>
              Choose the path that helps you stay oriented in Scripture.
            </p>
          </div>
        </section>

        {/* PLANS */}
        <section style={{ display: 'flex', justifyContent: 'center', gap: 28, padding: '24px 50px 20px', alignItems: 'flex-start', flex: 1 }}>
          {/* FREE PLAN */}
          <div style={{ width: 280, background: '#F9F6EF', border: '1px solid #E0DACB', borderRadius: 10, padding: '24px 24px 20px', textAlign: 'center' }}>
            <span style={{ width: 48, height: 48, borderRadius: '50%', background: '#3A4A2E', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8A248" strokeWidth="1.3" style={svgDebugStyle}>
                <path d="M12 6 C10 4.6 7 4.3 4 5 V18 C7 17.3 10 17.6 12 19 C14 17.6 17 17.3 20 18 V5 C17 4.3 14 4.6 12 6 Z M12 6 V19" />
              </svg>
            </span>
            <div className="font-playfair" style={{ fontSize: 20, fontWeight: 500, marginTop: 10 }}>Shavat Free</div>
            <div className="font-playfair" style={{ fontSize: 36, fontWeight: 500, marginTop: 8 }}>
              <sup style={{ fontSize: 18, top: -12, position: 'relative' }}>$</sup>0
            </div>
            <div style={{ fontSize: 12, color: '#4A4A45', marginTop: 4 }}>Start reading with clarity.</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px', margin: '14px auto 0', textAlign: 'left' }}>
              {FREE_FEATURES.map((feature) => (
                <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#2E3A30' }}>
                  <CheckIcon />
                  {feature}
                </div>
              ))}
            </div>
            <a href="#" style={{ ...linkDebugStyle, display: 'block', background: '#FDFCF9', border: '1px solid #C9C2A8', color: '#2E3A30', padding: '10px 0', borderRadius: 4, fontSize: 11, letterSpacing: 2, fontWeight: 600, marginTop: 16 }}>
              START FREE
            </a>
          </div>

          {/* PREMIUM PLAN */}
          <div style={{ width: 300 }}>
            <div style={{ background: '#3A4A2E', borderRadius: '8px 8px 0 0', padding: '6px 0', display: 'flex', justifyContent: 'center' }}>
              <span style={{ background: '#C8A248', color: '#1F2E24', fontSize: 10, letterSpacing: 2, fontWeight: 600, padding: '4px 20px' }}>MOST POPULAR</span>
            </div>
            <div style={{ background: '#F9F6EF', border: '1px solid #E0DACB', borderTop: 'none', borderRadius: '0 0 10px 10px', padding: '22px 24px 20px', textAlign: 'center' }}>
              <span style={{ width: 48, height: 48, borderRadius: '50%', background: '#3A4A2E', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8A248" strokeWidth="1.3" style={svgDebugStyle}>
                  <path d="M4 9 L7.5 12 L12 6.5 L16.5 12 L20 9 L18.5 17 H5.5 Z M5.5 17 H18.5" />
                </svg>
              </span>
              <div className="font-playfair" style={{ fontSize: 20, fontWeight: 500, marginTop: 10 }}>Shavat Premium</div>
              <div style={{ marginTop: 8 }}>
                <span className="font-playfair" style={{ fontSize: 32, fontWeight: 500 }}>
                  <sup style={{ fontSize: 16, top: -10, position: 'relative' }}>$</sup>9.99
                </span>
                <span className="font-playfair" style={{ fontSize: 14, color: '#4A4A45' }}> / month</span>
              </div>
              <div style={{ fontSize: 11, color: '#4A4A45', marginTop: 2 }}>or $99 / year</div>
              <div style={{ fontSize: 12, color: '#4A4A45', marginTop: 6 }}>Go deeper with guided reflection.</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 12px', margin: '12px auto 0', textAlign: 'left' }}>
                {PREMIUM_FEATURES.map((feature) => (
                  <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#2E3A30' }}>
                    <CheckIcon />
                    {feature}
                  </div>
                ))}
              </div>
              <a href="#" style={{ display: 'block', background: '#3A4A2E', color: '#F7F5F1', padding: '11px 0', borderRadius: 4, fontSize: 11, letterSpacing: 2, fontWeight: 600, marginTop: 14, ...linkDebugStyle }}>
                CHOOSE PREMIUM
              </a>
            </div>
          </div>
        </section>

        {/* CTA BAND */}
        <section style={{ padding: '8px 50px 28px' }}>
          <div style={{ background: '#EDE9DC', border: '1px solid #E0DACB', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 28, padding: '18px 32px' }}>
            <svg width="48" height="40" viewBox="0 0 150 120" fill="none" stroke="#C8A248" strokeWidth="1.2" style={{ flex: 'none', ...svgDebugStyle }}>
              <path d="M20 116 C48 88 80 52 128 12" />
              <path d="M44 92 C38 76 44 64 60 60 C62 78 56 88 44 92 Z M72 62 C66 46 72 34 88 30 C90 48 84 58 72 62 Z M58 104 C70 94 82 94 92 100 C80 110 68 110 58 104 Z M88 76 C100 66 112 66 122 72 C110 82 98 82 88 76 Z" />
            </svg>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="font-playfair" style={{ fontSize: 26, fontWeight: 500, color: '#1F2E24' }}>Start with clarity. Grow with intention.</div>
              <div style={{ fontSize: 13, color: '#4A4A45', marginTop: 4 }}>Join thousands engaging Scripture with purpose and peace.</div>
            </div>
            <Link href="#" style={{ flex: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, background: '#3A4A2E', color: '#F7F5F1', padding: '12px 24px', borderRadius: 6, fontSize: 11, letterSpacing: 2, fontWeight: 600, ...linkDebugStyle }}>
              <svg width="14" height="14" viewBox="0 0 40 40" fill="none" stroke="#C8A248" strokeWidth="2" style={svgDebugStyle}>
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
