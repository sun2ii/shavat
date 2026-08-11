'use client';

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 md:px-12 py-6 gap-6 relative z-10">
      {/* Logo Section */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-3.5">
          <div className="w-[54px] h-[60px] rounded-md overflow-hidden flex-none bg-shavat-pale dark:bg-shavat-charcoal" />
          <div>
            <div className="font-playfair text-[34px] font-semibold tracking-wide-6 text-shavat-darkest dark:text-shavat-cream leading-none">
              SHAVAT
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-px w-7 bg-shavat-gold" />
              <span className="text-xs tracking-wide-5 text-shavat-gold">PREMIUM</span>
              <span className="h-px w-7 bg-shavat-gold" />
            </div>
          </div>
        </div>
        <div className="text-xs sm:text-[13px] tracking-wide-2 text-shavat-charcoal dark:text-shavat-silver">
          KNOW WHERE YOU ARE IN SCRIPTURE.
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-6 text-[12.5px] tracking-wide-1 text-shavat-dark dark:text-shavat-text-light whitespace-nowrap">
        <a href="/" className="text-shavat-darkest dark:text-shavat-cream font-semibold border-b-2 border-shavat-gold pb-1.5">
          HOME
        </a>
        <a href="/writings" className="hover:text-shavat-gold transition-colors">WRITINGS</a>
      </nav>

      {/* Right Section */}
      <div className="flex items-center gap-3.5 whitespace-nowrap">
        {/* Get Started Button */}
        <a
          href="/terrain"
          className="bg-shavat-darkest dark:bg-shavat-dark text-shavat-cream dark:text-shavat-cream px-6 py-3.5 rounded-md text-[12.5px] tracking-wide-1 hover:bg-shavat-dark dark:hover:bg-shavat-mid transition-colors"
        >
          GET STARTED
        </a>
      </div>
    </header>
  );
}
