'use client';

import { useEffect } from 'react';

/**
 * Optional Lenis smooth scrolling: desktop fine-pointer devices only, never for
 * reduced-motion users, and loaded lazily so it never blocks first paint.
 * Native keyboard scrolling, anchor links and find-in-page keep working.
 */
export function SmoothScroll() {
  useEffect(() => {
    const desktop = window.matchMedia('(pointer: fine) and (min-width: 1024px)').matches;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!desktop || reduce) return;

    let raf = 0;
    let destroy: (() => void) | undefined;
    import('lenis').then(({ default: Lenis }) => {
      const lenis = new Lenis({ lerp: 0.12, anchors: { offset: -80 } });
      (window as unknown as { __lenis?: unknown }).__lenis = lenis;
      const loop = (t: number) => {
        lenis.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      destroy = () => lenis.destroy();
    });
    return () => {
      cancelAnimationFrame(raf);
      destroy?.();
    };
  }, []);
  return null;
}
