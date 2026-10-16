'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { PendingBadge } from '@/components/ui/Annotation';

export type Marker = { name: string; basis: string; x: number; y: number; pending: boolean; hq: boolean };

/** Markers + accessible country list. Hover/focus a country to trace its line from Mumbai. */
export function ReachOverlay({ markers, width, height }: { markers: Marker[]; width: number; height: number }) {
  const [active, setActive] = useState<string | null>(null);
  const hq = markers.find((m) => m.hq);

  return (
    <>
      {/* Sits exactly over the server-rendered base map (same viewBox and aspect ratio). */}
      <svg viewBox={`0 0 ${width} ${height}`} className="pointer-events-none absolute top-0 left-0 w-full" style={{ aspectRatio: `${width} / ${height}` }} aria-hidden>
        {hq &&
          markers
            .filter((m) => !m.hq)
            .map((m) => {
              const mx = (hq.x + m.x) / 2;
              const my = Math.min(hq.y, m.y) - Math.abs(hq.x - m.x) * 0.25;
              return (
                <path
                  key={`arc-${m.name}`}
                  d={`M${hq.x} ${hq.y} Q ${mx} ${my} ${m.x} ${m.y}`}
                  fill="none"
                  stroke={active === m.name ? '#ed3c32' : 'rgb(255 255 255 / .22)'}
                  strokeWidth={active === m.name ? 1.6 : 0.8}
                  strokeDasharray={m.pending ? '3 4' : undefined}
                  className="transition-[stroke,stroke-width] duration-300"
                />
              );
            })}
        {markers.map((m) => (
          <g key={m.name} transform={`translate(${m.x} ${m.y})`}>
            <circle r={active === m.name ? 12 : m.hq ? 9 : 6} fill="none" stroke={m.hq ? '#ed3c32' : '#fff'} strokeOpacity={0.5} className="transition-all duration-300" />
            <circle r={m.hq ? 4 : 3} fill={m.hq || active === m.name ? '#ed3c32' : '#fff'} />
          </g>
        ))}
      </svg>

      <ul className="mt-10 grid border-t border-l border-white/10 sm:grid-cols-2 lg:grid-cols-3" aria-label="Countries with SACPL project records">
        {markers.map((m) => (
          <li key={m.name} className="border-r border-b border-white/10">
            <button
              type="button"
              className={cn('flex h-full w-full flex-col items-start gap-1 p-5 text-left transition-colors', active === m.name ? 'bg-graphite-2' : 'hover:bg-graphite')}
              onMouseEnter={() => setActive(m.name)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(m.name)}
              onBlur={() => setActive(null)}
              aria-pressed={active === m.name}
            >
              <span className="flex flex-wrap items-center gap-2 font-display text-base font-semibold text-white">
                {m.name}
                {m.hq && <span className="font-mono text-[10px] font-normal tracking-[0.14em] text-accent uppercase">Headquarters</span>}
                {m.pending && <PendingBadge />}
              </span>
              <span className="text-sm text-white/60">{m.basis}</span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
