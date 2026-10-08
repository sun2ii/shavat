// A counter any client code can bump while something is in flight. The
// LoadingBar subscribes and shows a top progress bar while count > 0.
// Feeders: same-origin link clicks (LoadingBar itself), translation refresh
// (TranslationToggle), and programmatic chapter navigation (BookReader,
// ChapterNav). Route change resets it, so a stuck start can't linger.

type Listener = (active: boolean) => void;

let count = 0;
const listeners = new Set<Listener>();

function emit() {
  const active = count > 0;
  listeners.forEach((l) => l(active));
}

export const loadingBus = {
  start(): void {
    count += 1;
    emit();
  },
  stop(): void {
    count = Math.max(0, count - 1);
    emit();
  },
  reset(): void {
    count = 0;
    emit();
  },
  subscribe(listener: Listener): () => void {
    listeners.add(listener);
    listener(count > 0);
    return () => {
      listeners.delete(listener);
    };
  },
};
