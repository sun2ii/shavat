/**
 * The one page-header recipe, shared by the app's top-level surfaces
 * (Read, Map, Saved — and any future tab). Centered everywhere:
 * gold wide-tracked kicker, light serif title, optional italic subtitle.
 * Change it here and every screen follows — headers cannot drift apart.
 *
 * Supports an optional rightSlot for inline controls (tabs, progress, etc.)
 */
export default function PageHeader({
  kicker,
  title,
  subtitle,
  rightSlot,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
}) {
  return (
    <header className="pb-4 pt-2 md:pb-5 md:pt-3">
      {/* Mobile: stacked layout */}
      <div className="md:hidden text-center">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.34em] text-gold">
          {kicker}
        </p>
        <h1 className="mt-1.5 font-serif text-2xl font-light tracking-tight text-ink">
          {title}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-1 max-w-md font-serif text-sm italic text-muted">
            {subtitle}
          </p>
        )}
        {rightSlot && <div className="mt-3">{rightSlot}</div>}
      </div>

      {/* Desktop: title left, controls right */}
      <div className="hidden md:flex md:items-center md:justify-between md:gap-6">
        <div className="min-w-0">
          <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.34em] text-gold">
            {kicker}
          </p>
          <h1 className="mt-1 font-serif text-3xl font-light tracking-tight text-ink">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-0.5 font-serif text-sm italic text-muted">
              {subtitle}
            </p>
          )}
        </div>
        {rightSlot && <div className="flex-shrink-0">{rightSlot}</div>}
      </div>
    </header>
  );
}

/**
 * Multi-column header with clickable titles that act as tabs.
 * Each column shows kicker, title, subtitle. Active column is highlighted.
 */
export type TabColumn = {
  id: string;
  kicker: string;
  title: string;
  subtitle: string;
  href: string;
};

export function TabbedPageHeader({
  tabs,
  activeId,
  rightSlot,
  mobileSlot,
}: {
  tabs: TabColumn[];
  activeId: string;
  rightSlot?: React.ReactNode;
  mobileSlot?: React.ReactNode;
}) {
  return (
    <header className="pb-4 pt-2 md:pb-5 md:pt-3">
      {/* Mobile: show active tab title + custom mobile controls */}
      <div className="md:hidden text-center">
        {tabs.filter(t => t.id === activeId).map((tab) => (
          <div key={tab.id}>
            <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.34em] text-gold">
              {tab.kicker}
            </p>
            <h1 className="mt-1.5 font-serif text-2xl font-light tracking-tight text-ink">
              {tab.title}
            </h1>
            <p className="mx-auto mt-1 max-w-md font-serif text-sm italic text-muted">
              {tab.subtitle}
            </p>
          </div>
        ))}
        {mobileSlot && <div className="mt-3">{mobileSlot}</div>}
      </div>

      {/* Desktop: 3 balanced columns */}
      <div className="hidden md:block">
        <div className="grid grid-cols-3 gap-4">
          {tabs.map((tab) => {
            const isActive = tab.id === activeId;
            return (
              <a
                key={tab.id}
                href={tab.href}
                className={`block transition-opacity ${
                  isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'
                }`}
              >
                <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.34em] text-gold">
                  {tab.kicker}
                </p>
                <h2 className={`mt-1 font-serif text-2xl font-light tracking-tight ${
                  isActive ? 'text-ink' : 'text-muted'
                }`}>
                  {tab.title}
                </h2>
                <p className="mt-0.5 font-serif text-xs italic text-muted line-clamp-1">
                  {tab.subtitle}
                </p>
              </a>
            );
          })}
        </div>
        {rightSlot && (
          <div className="mt-2 text-right">{rightSlot}</div>
        )}
      </div>
    </header>
  );
}
