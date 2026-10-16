import type { NextConfig } from 'next';
import { legacyRedirects } from './src/content/redirects';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Optional separate output folder so a production build/test can run alongside `next dev`.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  // Inline the (small) stylesheet into the HTML to remove render-blocking CSS requests.
  experimental: { inlineCss: true },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2400],
    remotePatterns: [{ protocol: 'https', hostname: 'i.ytimg.com', pathname: '/vi/**' }],
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/media/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    ];
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
