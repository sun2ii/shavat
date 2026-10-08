/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lint and type checks run in a local `npm run build` (the pre-push check)
  // but are skipped on Vercel, where they cost 75s of a 2-minute deploy
  // against an 11s compile. VERCEL=1 is set only in Vercel's build env.
  eslint: {
    ignoreDuringBuilds: process.env.VERCEL === '1',
  },
  typescript: {
    ignoreBuildErrors: process.env.VERCEL === '1',
  },
  experimental: {
    // Content read with fs at request time (book text, sections, landing
    // prose, memorial drafts) is opaque to static tracing — declare it so
    // every serverless function bundle carries the files.
    outputFileTracingIncludes: {
      '/**': [
        './lib/*.json',
        './lib/translations/**/*.json',
        './data/**/*.json',
        './lib/writings/**/*.md',
      ],
    },
  },
};

module.exports = nextConfig;
