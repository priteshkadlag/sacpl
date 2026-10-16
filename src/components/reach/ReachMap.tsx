import { countries } from '@/content/company';
import { publishable } from '@/lib/verification';
import { countryPoint, MAP_H, MAP_W } from '@/lib/geo';
import { ReachOverlay, type Marker } from './ReachOverlay';

/**
 * World map. The base map is a prerendered static SVG (/reach-map.svg) loaded
 * lazily as an image, so ~100 KB of path data stays out of the page HTML and RSC
 * payload. Markers, arcs and the accessible country list render inline.
 */
export function ReachMap() {
  const served = publishable(countries);
  const markers: Marker[] = served.map((c) => {
    const [x, y] = countryPoint(c.iso);
    return { name: c.name, basis: c.basis, x, y, pending: c.verification === 'pending', hq: c.iso === 356 };
  });

  return (
    <div className="relative">
      {/* eslint-disable-next-line @next/next/no-img-element -- static SVG; the optimiser adds nothing */}
      <img
        src="/reach-map.svg"
        width={MAP_W}
        height={MAP_H}
        loading="lazy"
        decoding="async"
        alt={`World map highlighting countries where SACPL has project records: ${served.map((c) => c.name).join(', ')}.`}
        className="h-auto w-full"
      />
      <ReachOverlay markers={markers} width={MAP_W} height={MAP_H} />
    </div>
  );
}
