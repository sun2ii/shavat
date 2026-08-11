'use client';

import Link from 'next/link';

// Debug: Add red border to highlight manually created SVGs
const svgDebugStyle = { border: '2px solid red' };

const STEPS = [
  { number: 1, title: 'Read', description: 'Read the full text of Scripture.', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C8A248" strokeWidth="1.3" style={svgDebugStyle}><path d="M12 6 C10 4.6 7 4.3 4 5 V18 C7 17.3 10 17.6 12 19 C14 17.6 17 17.3 20 18 V5 C17 4.3 14 4.6 12 6 Z M12 6 V19 M15 8 V12 L16.5 11 L18 12 V7.4" /></svg> },
  { number: 2, title: 'Explore', description: 'Use the Timeline to explore biblical history.', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C8A248" strokeWidth="1.3" style={svgDebugStyle}><path d="M12 3 C13.9 3 15.5 4.6 15.5 6.5 C15.5 9 12 12 12 12 C12 12 8.5 9 8.5 6.5 C8.5 4.6 10.1 3 12 3 Z" /><circle cx="12" cy="6.5" r="1.2" /><path d="M12 12 V15 M12 15 H6.5 V18 M12 15 H17.5 V18" /><circle cx="6.5" cy="19.5" r="1.6" /><circle cx="17.5" cy="19.5" r="1.6" /></svg> },
  { number: 3, title: 'Connect', description: 'Use the Spine to see how books fit together.', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C8A248" strokeWidth="1.3" style={svgDebugStyle}><path d="M12 6 C10 4.6 7 4.3 4 5 V18 C7 17.3 10 17.6 12 19 C14 17.6 17 17.3 20 18 V5 C17 4.3 14 4.6 12 6 Z M12 6 V19 M6.5 9 C8 8.6 9.5 8.7 11 9.3 M13 9.3 C14.5 8.7 16 8.6 17.5 9 M6.5 12 C8 11.6 9.5 11.7 11 12.3 M13 12.3 C14.5 11.7 16 11.6 17.5 12" /></svg> },
  { number: 4, title: 'Grow', description: 'Return to Scripture each day with clarity.', icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C8A248" strokeWidth="1.3" style={svgDebugStyle}><path d="M12 20 V10 M12 13 C12 9 9.5 7 6 7 C6 11 8.5 13 12 13 Z M12 10 C12 6.5 14.5 4.5 18 4.5 C18 8.5 15.5 10.5 12 10.5 Z M5 20 C7.5 18.5 9.5 18 12 18 C14.5 18 16.5 18.5 19 20" /></svg> },
];

export default function HowItWorksPage() {
  return (
      <div className="font-inter" style={{ background: '#F7F5F1', color: '#1F2E24', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* HERO */}
        <section style={{ position: 'relative', height: 340 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/davis.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />

          {/* Top navbar - inside hero */}
          <header style={{ position: 'relative', zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '28px', padding: '20px 32px 0 44px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '30px', fontSize: '12.5px', letterSpacing: '2px', color: 'rgba(255,255,255,0.85)', fontWeight: 500, whiteSpace: 'nowrap' }}>
              <Link href="/">HOME</Link>
              <Link href="/features">FEATURES</Link>
              <Link href="/how-it-works" style={{ color: '#FDFCF9', fontWeight: 700, borderBottom: '2px solid #C8A248', paddingBottom: '6px' }}>HOW IT WORKS</Link>
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

          <div style={{ position: 'relative', zIndex: 2, padding: '40px 0 0 70px', maxWidth: 560 }}>
            <h1 className="font-playfair" style={{ fontSize: 56, fontWeight: 500, color: '#FDFCF9', margin: 0, textShadow: '0 2px 20px rgba(15,22,15,.5)' }}>How It Works</h1>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: '#FDFCF9', margin: '16px 0 0', maxWidth: 440, textShadow: '0 1px 14px rgba(15,22,15,.55)' }}>
              Shavat helps you engage with Scripture in a clear, meaningful, and connected way.
            </p>
          </div>
        </section>

        {/* STEPS */}
        <section style={{ padding: '28px 50px 24px', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 11, letterSpacing: 3, fontWeight: 600, color: '#1F2E24' }}>A SIMPLE 4-STEP PATH</div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 16, position: 'relative' }}>
            {/* Dotted line */}
            <div style={{ position: 'absolute', top: 44, left: '12.5%', right: '12.5%', borderTop: '2px dotted #B0A98F' }} />

            {STEPS.map((step) => (
              <div key={step.number} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span className="font-playfair" style={{ width: 26, height: 26, borderRadius: '50%', background: '#C8A248', color: '#FDFCF9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, marginBottom: 6 }}>{step.number}</span>
                <span style={{ width: 64, height: 64, borderRadius: '50%', background: '#3A4A2E', border: '2px solid #F7F5F1', outline: '1px solid #B0A98F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{step.icon}</span>
                <div className="font-playfair" style={{ fontSize: 20, fontWeight: 500, marginTop: 10 }}>{step.title}</div>
                <div style={{ fontSize: 12, lineHeight: 1.5, color: '#4A4A45', marginTop: 4, maxWidth: 180 }}>{step.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* FREE VERSION BANNER */}
        <section style={{ padding: '8px 50px 28px' }}>
          <div style={{ position: 'relative', background: '#F3F0E8', border: '1px solid #E0DACB', borderRadius: 10, padding: '18px 28px', display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ flex: 'none', width: 56, height: 56, borderRadius: '50%', background: '#3A4A2E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C8A248" strokeWidth="1.3" style={svgDebugStyle}>
                <path d="M4 9 L7.5 12 L12 6.5 L16.5 12 L20 9 L18.5 17 H5.5 Z M5.5 17 H18.5" />
              </svg>
            </span>
            <div style={{ flex: 1 }}>
              <div className="font-playfair" style={{ fontSize: 22, fontWeight: 500, color: '#1F2E24' }}>You are using the Free Version.</div>
              <div style={{ fontSize: 13, lineHeight: 1.5, color: '#4A4A45', marginTop: 4 }}>
                Upgrade to Shavat Premium for deeper insights, devotionals, journaling, highlights, and more.
              </div>
            </div>
            <Link href="/pricing" style={{ flex: 'none', background: '#3A4A2E', color: '#F7F5F1', padding: '12px 26px', borderRadius: 6, fontSize: 11, letterSpacing: 2, fontWeight: 600 }}>
              VIEW PREMIUM
            </Link>
          </div>
        </section>
      </div>
  );
}
