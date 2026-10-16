'use client';

import { useEffect, useRef } from 'react';
import { PendingBadge } from '@/components/ui/Annotation';

type Item = { year: string; title: string; text: string; pending: boolean };

/** History timeline; the spine draws with scroll (GSAP ScrollTrigger). Static for reduced motion. */
export function Timeline({ items }: { items: Item[] }) {
  const root = useRef<HTMLOListElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !root.current) return;
    let ctx: { revert: () => void } | undefined;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (!root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo('.tl-spine', { scaleY: 0 }, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'bottom 70%', scrub: 0.5 } });
        gsap.utils.toArray<HTMLElement>('.tl-item').forEach((el) => {
          gsap.fromTo(
            el.querySelector('.tl-node'),
            { scale: 0.3, backgroundColor: 'rgba(237,60,50,0)' },
            { scale: 1, backgroundColor: 'rgba(237,60,50,1)', duration: 0.4, scrollTrigger: { trigger: el, start: 'top 70%', toggleActions: 'play none none reverse' } },
          );
        });
      }, root);
    });
    return () => ctx?.revert();
  }, []);

  return (
    <ol ref={root} className="relative ml-2 sm:ml-0">
      <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-ink/10 sm:left-[calc(8rem+5px)]" />
      <span aria-hidden className="tl-spine absolute top-2 bottom-2 left-[5px] w-px origin-top bg-signal sm:left-[calc(8rem+5px)]" />
      {items.map((it) => (
        <li key={`${it.year}-${it.title}`} className="tl-item relative grid gap-2 pb-12 pl-10 last:pb-0 sm:grid-cols-[8rem_1fr] sm:gap-10 sm:pl-0">
          <p className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-right sm:text-4xl">{it.year}</p>
          <div className="relative sm:pl-10">
            <span aria-hidden className="tl-node absolute top-2 -left-10 size-[11px] border-2 border-signal bg-signal" />
            <h3 className="flex flex-wrap items-center gap-3 font-display text-xl font-semibold">
              {it.title}
              {it.pending && <PendingBadge />}
            </h3>
            <p className="mt-2 max-w-xl leading-relaxed text-graphite/80">{it.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
