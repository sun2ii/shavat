/**
 * The one page-header recipe, shared by the app's top-level surfaces
 * (Read, Map, Saved — and any future tab). Centered everywhere:
 * gold wide-tracked kicker, light serif title, optional italic subtitle.
 * Change it here and every screen follows — headers cannot drift apart.
 */
export default function PageHeader({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="pb-6 pt-2 text-center md:pb-8 md:pt-4">
      <p className="font-sans text-[10px] font-semibold uppercase tracking-[0.34em] text-gold">
        {kicker}
      </p>
      <h1 className="mt-2 font-serif text-3xl font-light tracking-tight text-ink md:text-4xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mx-auto mt-1.5 max-w-md font-serif text-sm italic text-muted">
          {subtitle}
        </p>
      )}
    </header>
  );
}
