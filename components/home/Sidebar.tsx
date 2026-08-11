'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Debug: Add red border to highlight manually created SVGs
const svgDebugStyle = { border: '2px solid red' };

const navLinks = [
  { href: '/', label: 'Home', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#C8A248" strokeWidth="1.5" style={svgDebugStyle}><path d="M2 8.5 L9 2.5 L16 8.5 M4 7.5 V15.5 H14 V7.5 M7.5 15.5 V11 H10.5 V15.5"/></svg> },
  { href: '/library', label: 'Library', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#C8A248" strokeWidth="1.5" style={svgDebugStyle}><path d="M9 4 C7.2 2.9 4.6 2.6 2 3.2 V14.5 C4.6 13.9 7.2 14.2 9 15.3 C10.8 14.2 13.4 13.9 16 14.5 V3.2 C13.4 2.6 10.8 2.9 9 4 Z M9 4 V15.3"/></svg> },
  { href: '/terrain', label: 'Terrain', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#C8A248" strokeWidth="1.5" style={svgDebugStyle}><path d="M2 6 C4 4 6 4 8 6 C10 8 12 8 14 6 M2 12 C4 10 6 10 8 12 C10 14 12 14 14 12" transform="translate(1 0)"/></svg> },
  { href: '/writings', label: 'Writings', icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#C8A248" strokeWidth="1.5" style={svgDebugStyle}><path d="M3 3 H15 V15 H3 Z M6 6 H12 M6 9 H12 M6 12 H10"/></svg> },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      style={{
        background: '#1F2E24',
        color: '#F7F5F1',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        padding: isOpen ? '36px 20px 28px' : '36px 12px 28px',
        borderRight: '1px solid #33422F',
        transition: 'padding 0.3s ease'
      }}
    >
      {/* Logo */}
      <div style={{ textAlign: 'center', padding: '0 6px' }}>
        <svg
          width={isOpen ? 72 : 40}
          height={isOpen ? 86 : 48}
          viewBox="0 0 72 86"
          fill="none"
          stroke="#C8A248"
          strokeWidth="1.6"
          style={{ display: 'block', margin: '0 auto', transition: 'all 0.3s ease', ...svgDebugStyle }}
        >
          <circle cx="36" cy="6" r="2.4" fill="#C8A248" stroke="none" />
          <path d="M14 82 V38 C14 20 24 12 36 12 C48 12 58 20 58 38 V82" />
          <path d="M36 30 V58 M26 40 H46" />
        </svg>
        {isOpen && (
          <>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '27px', fontWeight: 600, letterSpacing: '7px', marginTop: '14px' }}>SHAVAT</div>
            <div style={{ fontSize: '10px', letterSpacing: '2.4px', color: '#B8C0AE', lineHeight: 1.7, marginTop: '10px' }}>
              KNOW WHERE YOU ARE<br/>IN SCRIPTURE.
            </div>
          </>
        )}
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '36px', fontSize: '14.5px' }}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: isOpen ? '14px' : '0',
                justifyContent: isOpen ? 'flex-start' : 'center',
                background: isActive ? '#F7F5F1' : 'transparent',
                color: isActive ? '#1F2E24' : '#E8E5DC',
                borderRadius: '8px',
                padding: '13px 16px',
                fontWeight: isActive ? 600 : 400
              }}
            >
              {link.icon}
              {isOpen && link.label}
            </Link>
          );
        })}
      </nav>

      {/* Spacer to push bottom items down */}
      <div style={{ flex: 1 }} />

      {/* Bottom controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Settings */}
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: isOpen ? '14px' : '0',
            justifyContent: isOpen ? 'flex-start' : 'center',
            padding: '13px 16px',
            background: 'transparent',
            border: 'none',
            color: '#B8C0AE',
            cursor: 'pointer',
            fontSize: '14.5px'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" style={svgDebugStyle}>
            <circle cx="9" cy="9" r="2.5"/>
            <path d="M9 1.5V4M9 14V16.5M1.5 9H4M14 9H16.5M3.1 3.1L5 5M13 13L14.9 14.9M14.9 3.1L13 5M5 13L3.1 14.9"/>
          </svg>
          {isOpen && 'Settings'}
        </button>

        {/* Toggle sidebar */}
        <button
          onClick={onToggle}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: isOpen ? '14px' : '0',
            justifyContent: isOpen ? 'flex-start' : 'center',
            padding: '13px 16px',
            background: 'transparent',
            border: 'none',
            color: '#B8C0AE',
            cursor: 'pointer',
            fontSize: '14.5px'
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            style={{ transition: 'transform 0.3s ease', transform: isOpen ? 'rotate(0)' : 'rotate(180deg)', ...svgDebugStyle }}
          >
            <path d="M10 4L6 8L10 12"/>
          </svg>
          {isOpen && 'Collapse'}
        </button>
      </div>
    </aside>
  );
}
