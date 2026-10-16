import 'server-only';
import { geoCentroid, geoNaturalEarth1, geoPath, geoGraticule10 } from 'd3-geo';
import { feature } from 'topojson-client';
import type { FeatureCollection, Geometry } from 'geojson';
import type { Topology } from 'topojson-specification';
import world from 'world-atlas/countries-110m.json';

export const MAP_W = 960;
export const MAP_H = 470;
const ANTARCTICA = 10;
// Small island states are absent from the 110m dataset.
const FALLBACK: Record<number, [number, number]> = { 462: [73.4, 3.2], 212: [-61.37, 15.41] };

const topo = world as unknown as Topology;
const land = feature(topo, topo.objects.countries) as unknown as FeatureCollection<Geometry, { name: string }>;
const projection = geoNaturalEarth1().fitExtent([[8, 8], [MAP_W - 8, MAP_H - 8]], { type: 'Sphere' });
const path = geoPath(projection).digits(0);

/** Static SVG of the world with the given countries (ISO numeric) highlighted. */
export function worldMapSvg(highlight: Set<number>) {
  const on = land.features.filter((f) => highlight.has(Number(f.id)));
  const off = land.features.filter((f) => !highlight.has(Number(f.id)) && Number(f.id) !== ANTARCTICA);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MAP_W} ${MAP_H}">` +
    `<path d="${path(geoGraticule10())}" fill="none" stroke="rgba(255,255,255,.05)" stroke-width=".6"/>` +
    `<path d="${off.map((f) => path(f)).join('')}" fill="rgba(255,255,255,.08)" stroke="#0d1014" stroke-width=".5"/>` +
    `<path d="${on.map((f) => path(f)).join('')}" fill="rgba(50,71,150,.85)" stroke="#0d1014" stroke-width=".5"/>` +
    `</svg>`;
}

/** Projected [x, y] position of a country's centroid in map coordinates. */
export function countryPoint(iso: number): [number, number] {
  const f = land.features.find((x) => Number(x.id) === iso);
  const p = projection(f ? geoCentroid(f) : FALLBACK[iso] ?? [0, 0]) ?? [0, 0];
  return [Math.round(p[0]), Math.round(p[1])];
}
