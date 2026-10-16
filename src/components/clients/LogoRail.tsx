'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import type { Client } from '@/content/schema';
import { cn } from '@/lib/utils';

/**
 * Slow, CSS-driven logo rail. Pauses on hover/focus and via a visible control
 * (WCAG 2.2.2); reduced-motion users get a static wrapped grid.
 */
export function LogoRail({ clients, label = 'Selected clients' }: { clients: Client[]; label?: string }) {
  const [paused, setPaused] = useState(false);
  const duration = `${clients.length * 3.2}s`;

  return (
    <div className="relative">
      {/* Edge fades are overlays (not a CSS mask) so mix-blend-multiply can knock out white logo backgrounds. */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-paper to-transparent motion-reduce:hidden" />
      <div aria-hidden className="pointer-events-none absolute top-0 right-0 z-10 h-[calc(100%-4rem)] w-16 bg-linear-to-l from-paper to-transparent motion-reduce:hidden" />
      <div className="group overflow-hidden">
        <ul
          aria-label={label}
          className={cn(
            // bg-paper: the transformed list is its own blend group, so it needs an opaque backdrop for multiply
            'flex w-max items-center bg-paper group-focus-within:[animation-play-state:paused] group-hover:[animation-play-state:paused]',
            'animate-marquee motion-reduce:w-full motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center',
            paused && '[animation-play-state:paused]',
          )}
          style={{ ['--marquee-duration' as string]: duration }}
        >
          {[...clients, ...clients].map((c, i) => {
            const dup = i >= clients.length;
            return (
              <li key={`${c.name}-${i}`} aria-hidden={dup || undefined} className={cn('shrink-0 px-6 sm:px-10', dup && 'motion-reduce:hidden')}>
                <Image
                  src={c.logo}
                  alt={dup ? '' : c.name}
                  width={160}
                  height={80}
                  className="h-12 w-auto max-w-[140px] object-contain opacity-60 mix-blend-multiply grayscale transition duration-500 hover:opacity-100 hover:grayscale-0 sm:h-14"
                />
              </li>
            );
          })}
        </ul>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="mt-6 ml-auto flex min-h-11 items-center gap-2 px-3 font-mono text-[11px] tracking-[0.14em] text-steel uppercase hover:text-ink motion-reduce:hidden"
        aria-label={paused ? 'Resume client logo animation' : 'Pause client logo animation'}
      >
        {paused ? <Play aria-hidden className="size-3.5" /> : <Pause aria-hidden className="size-3.5" />}
        {paused ? 'Play' : 'Pause'}
      </button>
    </div>
  );
}
