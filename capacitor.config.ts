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
    // Production deployment. Root URL; app handles redirect to /dashboard.
    url: 'https://www.shavat.app/',
  },
};

export default config;
