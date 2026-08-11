export function BottomBand() {
  const trust = [
    {
      label: 'For Individuals\nand Churches',
      border: 'none',
      icon: (
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="7" r="2.6" />
          <path d="M7 18 c0-3 2.2-5 5-5 s5 2 5 5" />
          <circle cx="4.5" cy="9" r="1.8" />
          <circle cx="19.5" cy="9" r="1.8" />
        </svg>
      ),
    },
    {
      label: 'Built with Care\nand Integrity',
      border: '1px solid',
      icon: (
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3 L20 6 V11 C20 16 16.5 19.5 12 21 C7.5 19.5 4 16 4 11 V6 Z" />
          <path d="M8.5 12 l2.4 2.4 L15.5 9.5" />
        </svg>
      ),
    },
    {
      label: 'Your Data is\nAlways Secure',
      border: '1px solid',
      icon: (
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="10" width="14" height="10" rx="2" />
          <path d="M8 10 V7.5 C8 5.3 9.8 3.5 12 3.5 C14.2 3.5 16 5.3 16 7.5 V10" />
          <circle cx="12" cy="15" r="1.4" />
        </svg>
      ),
    },
    {
      label: 'Available on Web,\niOS, and Android',
      border: '1px solid',
      icon: (
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <rect x="7" y="3" width="10" height="18" rx="2.4" />
          <line x1="10.5" y1="18" x2="13.5" y2="18" />
        </svg>
      ),
    },
  ];

  return (
    <section className="grid grid-cols-[380px_1fr_350px] items-stretch bg-shavat-pale dark:bg-shavat-band-dark border-t border-shavat-sand dark:border-[#3A3A38] mt-8">
      {/* Testimonial */}
      <div className="px-10 py-12 flex gap-5 items-start">
        <span className="font-playfair text-[66px] leading-[0.6] text-shavat-gold mt-4">"</span>
        <div>
          <div className="font-playfair text-[19px] leading-[1.45] text-shavat-darkest dark:text-shavat-cream">
            Shavat helped me see where I am in the story and gave me the confidence to keep going."
          </div>
          <div className="text-[13.5px] text-shavat-gray dark:text-shavat-text-muted mt-3">
            – Pastor &amp; Bible Teacher
          </div>
        </div>
      </div>

      {/* Trust Items */}
      <div className="grid grid-cols-4 items-center px-2.5 py-10">
        {trust.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center gap-2.5 px-3.5 text-shavat-dark dark:text-shavat-text-light"
            style={{
              borderLeft: item.border === 'none' ? 'none' : `${item.border} ${i === 0 ? 'transparent' : 'var(--border-color)'}`,
              ['--border-color' as string]: 'rgb(217, 209, 181)',
            }}
          >
            <span className="w-[38px] h-[38px] flex items-center justify-center">{item.icon}</span>
            <div className="text-[13.5px] leading-[1.4] whitespace-pre-line text-shavat-dark dark:text-shavat-text-light">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Card */}
      <div className="bg-shavat-darkest dark:bg-shavat-dark text-shavat-cream px-9 py-12 flex flex-col justify-center gap-5">
        <div className="font-playfair text-[24px] font-semibold">Ready to stay oriented?</div>
        <a
          href="/terrain"
          className="block text-center border border-shavat-gold text-shavat-cream px-2.5 py-3.5 rounded-lg text-[12.5px] tracking-wide-2 font-semibold hover:bg-shavat-gold hover:text-shavat-darkest dark:hover:text-shavat-cream transition-colors"
        >
          START EXPLORING
        </a>
        <div className="text-sm text-shavat-silver dark:text-shavat-silver">Free. No account required.</div>
      </div>
    </section>
  );
}
