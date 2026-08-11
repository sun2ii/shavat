'use client';

import Link from 'next/link';

// Debug: Add red border to highlight manually created SVGs
const svgDebugStyle = { border: '2px solid red' };
// Debug: Add purple border to highlight links that go nowhere (need to be implemented)
const linkDebugStyle = { border: '2px solid purple' };

const CATEGORIES = [
  { title: 'Reading Plans', description: 'Paths through Scripture for steady daily reading.', icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3A4A2E" strokeWidth="1.1" style={svgDebugStyle}><path d="M12 6 C10 4.6 7 4.3 4 5 V18 C7 17.3 10 17.6 12 19 C14 17.6 17 17.3 20 18 V5 C17 4.3 14 4.6 12 6 Z M12 6 V19 M6.5 8.5 C8 8.1 9.5 8.2 10.5 8.7 M6.5 11 C8 10.6 9.5 10.7 10.5 11.2 M13.5 8.7 C14.5 8.2 16 8.1 17.5 8.5 M13.5 11.2 C14.5 10.7 16 10.6 17.5 11" /></svg> },
  { title: 'Study Guides', description: 'Structured helps for deeper understanding.', icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3A4A2E" strokeWidth="1.1" style={svgDebugStyle}><rect x="5" y="3.5" width="12" height="17" rx="1.4" /><path d="M5 6.5 H3.8 M5 9.5 H3.8 M5 12.5 H3.8 M5 15.5 H3.8 M8 8 H14 M8 11 H14 M8 14 H12" /><path d="M15.5 20.5 L19.5 12.5 L21 13.3 L17 21.2 L15.2 21.6 Z" /></svg> },
  { title: 'Theme Collections', description: 'Grouped passages connecting the bigger story.', icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3A4A2E" strokeWidth="1.1" style={svgDebugStyle}><path d="M4 17 L14 15.5 L14.5 18.5 L4.5 20 Z M4.5 13 L14.5 12 L14.8 15 L4.8 16 Z M5 9 L15 8.5 L15.2 11.5 L5.2 12 Z" /><path d="M14 15.5 L18 14 M14.5 12 L18.5 10.8 M15 8.5 L19 7.5" /></svg> },
  { title: 'Getting Started', description: 'Introductions for new readers.', icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#3A4A2E" strokeWidth="1.1" style={svgDebugStyle}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="1.1" /><path d="M12 3.5 V5 M12 19 V20.5 M3.5 12 H5 M19 12 H20.5" /><path d="M15.5 8.5 L13 11 L11 13 L8.5 15.5 L11 13 Z M15.5 8.5 L13 13 L8.5 15.5 L11 11 Z" /></svg> },
];

const FEATURED = [
  { title: 'How to Read with Orientation', description: 'Read Scripture in context and confidence.' },
  { title: 'The Narrative Spine Guide', description: 'See how Scripture unfolds from beginning to end.' },
  { title: 'Where to Begin', description: 'Handpicked starting points for first steps.' },
];

export default function ResourcesPage() {
  return (
      <div className="font-inter" style={{ background: '#F7F5F1', color: '#1F2E24', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* HERO */}
        <section style={{ position: 'relative', height: 340 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/images/sunset.png)', backgroundSize: 'cover', backgroundPosition: 'center' }} />

          {/* Top navbar - inside hero */}
          <header style={{ position: 'relative', zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '28px', padding: '20px 32px 0 44px' }}>
            <nav style={{ display: 'flex', alignItems: 'center', gap: '30px', fontSize: '12.5px', letterSpacing: '2px', color: 'rgba(255,255,255,0.85)', fontWeight: 500, whiteSpace: 'nowrap' }}>
              <Link href="/">HOME</Link>
              <Link href="/features">FEATURES</Link>
              <Link href="/how-it-works">HOW IT WORKS</Link>
              <Link href="/about">ABOUT</Link>
              <Link href="/pricing">PRICING</Link>
              <Link href="/resources" style={{ color: '#FDFCF9', fontWeight: 700, borderBottom: '2px solid #C8A248', paddingBottom: '6px' }}>RESOURCES</Link>
            </nav>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', whiteSpace: 'nowrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.92)', border: '1px solid #D9D1B5', borderRadius: '8px', padding: '8px 14px', width: '200px' }}>
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="#4A4A45" strokeWidth="1.6" style={svgDebugStyle}><circle cx="8" cy="8" r="5.5"/><path d="M12 12 L16 16"/></svg>
                <input type="text" placeholder="Search..." style={{ border: 'none', outline: 'none', background: 'transparent', fontFamily: "'Inter', sans-serif", fontSize: '12px', color: '#1F2E24', width: '100%' }}/>
              </label>
            </div>
          </header>

          <div style={{ position: 'relative', zIndex: 2, padding: '40px 0 0 70px', maxWidth: 500 }}>
            <h1 className="font-playfair" style={{ fontSize: 56, fontWeight: 500, color: '#FDFCF9', margin: 0, textShadow: '0 2px 20px rgba(15,20,12,.5)' }}>Resources</h1>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: '#FDFCF9', margin: '16px 0 0', maxWidth: 380, textShadow: '0 1px 14px rgba(15,20,12,.55)' }}>
              Guides, tools, and curated helps to keep you oriented in Scripture.
            </p>
          </div>
        </section>

        {/* CATEGORY CARDS */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, padding: '24px 50px 16px' }}>
          {CATEGORIES.map((cat) => (
            <div key={cat.title} style={{ background: '#FDFCF9', border: '1px solid #E5E0D3', borderRadius: 8, padding: '16px 14px', display: 'flex', gap: 12, alignItems: 'start' }}>
              <span style={{ flex: 'none' }}>{cat.icon}</span>
              <div>
                <div className="font-playfair" style={{ fontSize: 16, fontWeight: 500 }}>{cat.title}</div>
                <div style={{ fontSize: 11, lineHeight: 1.4, color: '#4A4A45', marginTop: 4 }}>{cat.description}</div>
              </div>
            </div>
          ))}
        </section>

        {/* FEATURED */}
        <section style={{ display: 'grid', gridTemplateColumns: '200px 1fr 1fr 1fr', gap: 16, padding: '8px 50px 16px', alignItems: 'start', flex: 1 }}>
          <div style={{ paddingTop: 10 }}>
            <div style={{ fontSize: 10, letterSpacing: 2, fontWeight: 700, color: '#C8A248' }}>FEATURED</div>
            <h2 className="font-playfair" style={{ fontSize: 24, lineHeight: 1.2, fontWeight: 500, color: '#2E3A30', margin: '8px 0 12px' }}>Curated helps</h2>
            <a href="#" className="font-playfair" style={{ fontSize: 13, color: '#3A4A2E', borderBottom: '1px solid #C8A248', paddingBottom: 2, ...linkDebugStyle }}>
              View All →
            </a>
          </div>
          {FEATURED.map((resource) => (
            <div key={resource.title} style={{ background: '#FDFCF9', border: '1px solid #E5E0D3', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ height: 90, background: '#3A4A2E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#C8A248', fontSize: 10, letterSpacing: 1 }}>Image</span>
              </div>
              <div style={{ padding: '12px 14px 14px' }}>
                <div className="font-playfair" style={{ fontSize: 15, fontWeight: 500 }}>{resource.title}</div>
                <div style={{ fontSize: 11, lineHeight: 1.4, color: '#4A4A45', marginTop: 4 }}>{resource.description}</div>
                <a href="#" className="font-playfair" style={{ display: 'inline-block', fontSize: 12, color: '#3A4A2E', borderBottom: '1px solid #C8A248', paddingBottom: 1, marginTop: 8, ...linkDebugStyle }}>
                  Read →
                </a>
              </div>
            </div>
          ))}
        </section>

        {/* CTA BAND */}
        <section style={{ padding: '8px 50px 28px' }}>
          <div style={{ background: '#EDEAE0', borderTop: '1px solid #E0DACB', display: 'flex', alignItems: 'center', gap: 20, padding: '16px 32px', borderRadius: 8 }}>
            <span style={{ flex: 'none', width: 52, height: 52, border: '1.5px solid #C8A248', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F7F5F1' }}>
              <svg width="22" height="24" viewBox="0 0 34 38" fill="none" stroke="#C8A248" strokeWidth="1.4" style={svgDebugStyle}>
                <path d="M17 36 V14" />
                <path d="M17 20 C17 14 13 11 8 11 C8 17 12 20 17 20 Z M17 16 C17 10 21 7 26 7 C26 13 22 16 17 16 Z" />
              </svg>
            </span>
            <div style={{ flex: 1 }}>
              <div className="font-playfair" style={{ fontSize: 22, fontWeight: 500, color: '#1F2E24' }}>Stay rooted in the Word.</div>
              <div style={{ fontSize: 12, color: '#4A4A45', marginTop: 2 }}>Explore resources that help you read with clarity and peace.</div>
            </div>
            <Link href="#" className="font-playfair" style={{ background: '#3A4A2E', color: '#F7F5F1', padding: '12px 22px', borderRadius: 6, fontSize: 14, ...linkDebugStyle }}>
              Explore Resources
            </Link>
            <a href="#" className="font-playfair" style={{ fontSize: 14, color: '#3A4A2E', borderBottom: '1px solid #C8A248', paddingBottom: 2, ...linkDebugStyle }}>
              Start Reading →
            </a>
          </div>
        </section>
      </div>
  );
}
