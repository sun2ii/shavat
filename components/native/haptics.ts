/**
 * Haptic feedback for the native shell. The plugin is loaded lazily and only
 * inside the Capacitor app, so the web bundle stays free of @capacitor/*
 * imports (the dynamic import is code-split and never fetched on the web).
 * Failures are silently ignored — haptics are seasoning, never load-bearing.
 */
import { isNativeApp } from './native';

export async function tapTick(): Promise<void> {
  if (!isNativeApp()) return;
  try {
    const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch {
    // Plugin not installed in this build yet, or haptics unavailable.
  }
}
