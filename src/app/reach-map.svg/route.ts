import { countries } from '@/content/company';
import { publishable } from '@/lib/verification';
import { worldMapSvg } from '@/lib/geo';

// Prerendered at build time and served as a cacheable static file.
export const dynamic = 'force-static';

export function GET() {
  const svg = worldMapSvg(new Set(publishable(countries).map((c) => c.iso)));
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'public, max-age=86400' } });
}
