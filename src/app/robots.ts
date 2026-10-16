import type { MetadataRoute } from 'next';
import { siteUrl } from '@/content/company';

export default function robots(): MetadataRoute.Robots {
  // Preview deployments must never be indexed.
  const isProduction = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === 'production' : process.env.NODE_ENV === 'production';
  return isProduction
    ? { rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/login'] }], sitemap: `${siteUrl}/sitemap.xml`, host: siteUrl }
    : { rules: [{ userAgent: '*', disallow: '/' }] };
}
