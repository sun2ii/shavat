/**
 * Detection helper for the Capacitor iOS shell.
 *
 * The native WebView injects `window.Capacitor` at runtime; the web bundle
 * never imports @capacitor/core. This check is the ONLY coupling between the
 * web codebase and the native shell — in a normal browser it is always false,
 * so everything under components/native/ is invisible on the web.
 */
export function isNativeApp(): boolean {
  if (typeof window === 'undefined') return false;
  const cap = (
    window as unknown as {
      Capacitor?: { isNativePlatform?: () => boolean };
    }
  ).Capacitor;
  return !!cap?.isNativePlatform?.();
}
