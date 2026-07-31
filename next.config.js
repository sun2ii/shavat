/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Content read with fs at request time (book text, sections, landing
    // prose, memorial drafts) is opaque to static tracing — declare it so
    // every serverless function bundle carries the files.
    outputFileTracingIncludes: {
      '/**': [
        './lib/*.json',
        './data/**/*.json',
        './lib/writings/**/*.md',
      ],
    },
  },
};

module.exports = nextConfig;
