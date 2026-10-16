'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { pad } from '@/lib/utils';

type Slide = { src: string; alt: string };
const HOLD = 6.5; // seconds per slide — deliberately slow

export function HeroSlideshow({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(() => new Set([0]));
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(false);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const prev = useRef(0);
  const gsapRef = useRef<typeof import('gsap').gsap | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    if (mq.matches) setPlaying(false);
    import('gsap').then(({ gsap }) => {
      gsapRef.current = gsap;
      const first = refs.current[0];
      if (first && !mq.matches) gsap.fromTo(first.querySelector('img'), { scale: 1.08 }, { scale: 1, duration: HOLD + 2, ease: 'none' });
    });
  }, []);

  // Pre-mount the next slide so it is decoded before the crossfade.
  useEffect(() => {
    setMounted((m) => new Set(m).add((index + 1) % slides.length));
  }, [index, slides.length]);

  // Advance timer, paused while the tab is hidden.
  useEffect(() => {
    if (!playing) return;
    let t: ReturnType<typeof setTimeout>;
    const schedule = () => {
      t = setTimeout(() => {
        if (document.hidden) return schedule();
        setIndex((i) => (i + 1) % slides.length);
      }, HOLD * 1000);
    };
    schedule();
    return () => clearTimeout(t);
  }, [playing, index, slides.length]);

  // GSAP crossfade + slow settle on the incoming slide.
  useEffect(() => {
    const gsap = gsapRef.current;
    const incoming = refs.current[index];
    const outgoing = refs.current[prev.current];
    if (!incoming || prev.current === index) return;
    if (!gsap || reduced) {
      if (outgoing) outgoing.style.opacity = '0';
      incoming.style.opacity = '1';
    } else {
      gsap.set(incoming, { zIndex: 2 });
      if (outgoing) gsap.set(outgoing, { zIndex: 1 });
      gsap.fromTo(
        incoming,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.6,
          ease: 'power2.inOut',
          onComplete: () => outgoing && gsap.set(outgoing, { opacity: 0 }),
        },
      );
      gsap.fromTo(incoming.querySelector('img'), { scale: 1.08 }, { scale: 1, duration: HOLD + 2, ease: 'none' });
    }
    prev.current = index;
  }, [index, reduced]);

  return (
    <div className="absolute inset-0" aria-roledescription="carousel" aria-label="Project imagery">
      {/* isolate: the crossfade sets z-index on slides; keep that inside this layer so they never rise above the page's scrims */}
      <div className="absolute inset-0 isolate">
        {slides.map((s, i) =>
          mounted.has(i) ? (
            <div
              key={s.src}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="absolute inset-0 overflow-hidden"
              style={{ opacity: i === 0 ? 1 : 0 }}
              aria-hidden={i !== index}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
            >
              <Image src={s.src} alt={s.alt} fill priority={i === 0} fetchPriority={i === 0 ? 'high' : 'low'} sizes="100vw" quality={80} className="object-cover will-change-transform" />
            </div>
          ) : null,
        )}
      </div>

      {/* z-20: must sit above the hero copy layer (z-10) so the pause control stays clickable */}
      <div className="absolute top-[calc(100svh-4.75rem)] right-4 z-20 flex items-center gap-4 border border-white/25 bg-ink/85 px-4 py-3 text-white shadow-[0_10px_30px_rgb(0_0_0/0.45)] backdrop-blur-md sm:right-6 lg:right-14">
        <p className="font-mono text-xs font-medium tracking-[0.2em] text-white/80" aria-live="off">
          <span className="text-white">{pad(index + 1)}</span> / {pad(slides.length)}
        </p>
        <div className="hidden h-px w-24 bg-white/30 sm:block" aria-hidden>
          <div key={`${index}-${playing}`} className="h-px origin-left bg-white" style={playing ? { animation: `hero-progress ${HOLD}s linear forwards` } : { transform: 'scaleX(0)' }} />
        </div>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="inline-flex size-10 items-center justify-center bg-white/10 ring-1 ring-white/40 transition hover:bg-white hover:text-ink hover:ring-white"
          aria-label={playing ? 'Pause slideshow' : 'Play slideshow'}
        >
          {playing ? <Pause aria-hidden className="size-4" /> : <Play aria-hidden className="size-4" />}
        </button>
      </div>
    </div>
  );
}
