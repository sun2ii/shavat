import { ScriptureNavigationDiagram } from './ScriptureNavigationDiagram';

export function Hero() {
  const pillars = [
    {
      title: 'Better Orientation',
      sub: 'Know where you are in the story',
      icon: (
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M15.5 8.5 L13 13 L8.5 15.5 L11 11 Z" />
        </svg>
      ),
    },
    {
      title: 'Clearer Connections',
      sub: 'See how everything fits together',
      icon: (
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 6 C10 4.8 7 4.5 4 5.2 V18 C7 17.3 10 17.6 12 18.8 C14 17.6 17 17.3 20 18 V5.2 C17 4.5 14 4.8 12 6 Z" />
          <line x1="12" y1="6" x2="12" y2="18.8" />
        </svg>
      ),
    },
    {
      title: 'Deeper Understanding',
      sub: 'Context that builds confidence',
      icon: (
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 6 C10 4.8 7 4.5 4 5.2 V18 C7 17.3 10 17.6 12 18.8 C14 17.6 17 17.3 20 18 V5.2 C17 4.5 14 4.8 12 6 Z" />
          <line x1="12" y1="6" x2="12" y2="18.8" />
          <line x1="6.5" y1="9" x2="10" y2="9" />
          <line x1="14" y1="9" x2="17.5" y2="9" />
        </svg>
      ),
    },
    {
      title: 'Stay in the Word',
      sub: 'Return to Scripture with purpose',
      icon: (
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20 C6 15.5 3.5 12.5 3.5 9.3 C3.5 6.8 5.4 5 7.8 5 C9.5 5 11.1 6 12 7.5 C12.9 6 14.5 5 16.2 5 C18.6 5 20.5 6.8 20.5 9.3 C20.5 12.5 18 15.5 12 20 Z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="relative px-6 md:px-12 py-12 grid grid-cols-1 lg:grid-cols-[440px_1fr] gap-8 items-start">
      {/* Left Column */}
      <div className="relative z-[2]">
        <div className="text-[13px] tracking-wide-4 text-shavat-gold font-semibold mb-5">
          A NAVIGATION SYSTEM FOR SCRIPTURE
        </div>

        <h1 className="font-playfair text-[62px] leading-[1.08] font-semibold text-shavat-darkest dark:text-shavat-cream m-0 mb-6 [text-wrap:pretty]">
          Orientation before information.
        </h1>

        <p className="text-[19px] leading-[1.55] text-shavat-charcoal dark:text-shavat-silver m-0 mb-8 max-w-[430px]">
          Shavat helps you know where you are in Scripture, see the bigger story, and keep reading with clarity and confidence.
        </p>

        <div className="flex gap-4 mb-14 whitespace-nowrap">
          <a
            href="/terrain"
            className="inline-flex items-center gap-2.5 bg-shavat-darkest dark:bg-shavat-dark text-shavat-cream px-7 py-4 rounded-lg text-[13px] tracking-wide-2 font-semibold hover:bg-shavat-dark dark:hover:bg-shavat-mid transition-colors"
          >
            START READING
            <svg width="18" height="15" viewBox="0 0 18 15" fill="none" stroke="#F7F5F1" strokeWidth="1.4">
              <path d="M9 2 C7 .8 4 .5 1 1.2 V13 C4 12.3 7 12.6 9 13.8 C11 12.6 14 12.3 17 13 V1.2 C14 .5 11 .8 9 2 Z" />
              <line x1="9" y1="2" x2="9" y2="13.8" />
            </svg>
          </a>

          <a
            href="/library"
            className="inline-flex items-center gap-2.5 border border-shavat-sand dark:border-shavat-border-dark bg-white/55 dark:bg-white/6 text-shavat-dark dark:text-shavat-text-light px-6 py-4 rounded-lg text-[13px] tracking-wide-2 font-semibold hover:bg-shavat-gold hover:text-shavat-darkest dark:hover:text-shavat-cream transition-colors"
          >
            BROWSE LIBRARY
            <svg width="18" height="15" viewBox="0 0 18 15" fill="none" stroke="#C8A248" strokeWidth="1.4">
              <path d="M9 2 C7 .8 4 .5 1 1.2 V13 C4 12.3 7 12.6 9 13.8 C11 12.6 14 12.3 17 13 V1.2 C14 .5 11 .8 9 2 Z" />
              <line x1="9" y1="2" x2="9" y2="13.8" />
            </svg>
          </a>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-[540px]">
          {pillars.map((pillar, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2.5">
              <span className="w-11 h-11 flex items-center justify-center text-shavat-dark dark:text-shavat-text-light">
                {pillar.icon}
              </span>
              <div className="text-[14.5px] font-bold text-shavat-darkest dark:text-shavat-cream">
                {pillar.title}
              </div>
              <div className="text-[13.5px] leading-[1.4] text-shavat-gray dark:text-shavat-text-muted -mt-1">
                {pillar.sub}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Column - Navigation Diagram */}
      <div className="relative flex items-center justify-center min-h-[280px] p-4">
        <ScriptureNavigationDiagram />
      </div>
    </section>
  );
}
