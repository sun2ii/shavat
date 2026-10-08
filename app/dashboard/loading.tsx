// Shown the instant Dashboard is clicked, while the server resolves auth and
// the continue-reading target. The top LoadingBar runs too; this just keeps
// the centre of the page from being empty.
export default function DashboardLoading() {
  return (
    <main className="h-full flex items-center justify-center">
      <span className="h-2.5 w-2.5 rounded-full bg-gold animate-pulse" aria-label="Loading" />
    </main>
  );
}
