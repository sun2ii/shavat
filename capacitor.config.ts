import type { CapacitorConfig } from '@capacitor/cli';

// Shavat is a server-backed Next.js app (API routes, Postgres, auth), so the
// iOS app is a thin native shell that loads a running Shavat instance rather
// than a static export. ios-shell/ is a required placeholder webDir; the real
// content comes from server.url.
const config: CapacitorConfig = {
  appId: 'com.binary1702.shavat',
  appName: 'Shavat',
  webDir: 'ios-shell',
  server: {
    // Dev server on the Mac's Wi-Fi address, reachable from both the iOS
    // Simulator and a physical iPhone on the same network. Requires
    // `npm run dev` to be running. If the Mac's IP changes (new network,
    // DHCP), update it here (`ipconfig getifaddr en0`) and re-run
    // `npm run ios:sync`. To point at a deployed instance later, replace
    // this URL with the https URL and remove the NSAppTransportSecurity
    // block from ios/App/App/Info.plist.
    //
    // The path is /today on purpose: the app opens straight at its front
    // door. Opening at '/' rendered the marketing home for ~0.5s before the
    // client-side native redirect kicked in — an ugly flash on every launch.
    url: 'http://10.0.0.235:3000/today',
    cleartext: true,
  },
};

export default config;
