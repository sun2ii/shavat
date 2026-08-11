export function Features() {
  const features = [
    {
      eyebrow: 'SEE THE BIGGER PICTURE',
      title: 'More than verses. A clear view of Scripture.',
      body: 'Shavat reveals the movement, connections, and direction so you never feel lost again.',
      link: 'LEARN MORE',
      border: 'none',
    },
    {
      eyebrow: 'DESIGNED FOR READERS',
      title: 'Simple, calm, and built to help.',
      body: 'No noise. No pressure. Just the context you need—when you need it.',
      link: 'EXPLORE FEATURES',
      border: '1px solid',
    },
    {
      eyebrow: 'BUILT ON TRUTH',
      title: 'Faithful to Scripture. Honest about limits.',
      body: 'Shavat follows the text, respects its authors, and stays within its boundaries.',
      link: 'OUR PHILOSOPHY',
      border: '1px solid',
    },
  ];

  return (
    <section className="grid grid-cols-3 px-12 py-16 gap-8">
      {features.map((feature, i) => (
        <div
          key={i}
          className="grid grid-cols-[1fr_150px] gap-5 items-start px-6 py-2"
          style={{
            borderLeft: i === 0 ? 'none' : '1px solid var(--border-color)',
            ['--border-color' as string]: 'rgb(217, 209, 181)',
          }}
        >
          <div>
            <div className="text-xs tracking-wide-3 text-shavat-gold font-semibold mb-4">
              {feature.eyebrow}
            </div>
            <h3 className="font-playfair text-[21px] leading-[1.3] font-semibold text-shavat-darkest dark:text-shavat-cream m-0 mb-4 [text-wrap:pretty]">
              {feature.title}
            </h3>
            <p className="text-[14.5px] leading-[1.55] text-shavat-charcoal dark:text-shavat-silver m-0 mb-5">
              {feature.body}
            </p>
            <a href="#" className="text-xs tracking-[2.2px] text-shavat-gold font-semibold hover:opacity-80 transition-opacity">
              {feature.link} →
            </a>
          </div>
          <div className="w-[150px] h-[150px] rounded-lg overflow-hidden bg-shavat-pale dark:bg-shavat-charcoal flex-shrink-0" />
        </div>
      ))}
    </section>
  );
}
