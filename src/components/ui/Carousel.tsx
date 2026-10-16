'use client';

import { useId, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Keyboard, Navigation } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn, pad } from '@/lib/utils';
import 'swiper/css';

/**
 * Accessible Swiper carousel: labelled region, real buttons, keyboard support,
 * no autoplay. Slides are passed pre-rendered (server components welcome).
 */
export function Carousel({
  slides,
  label,
  tone = 'dark',
  slideClassName,
  breakpoints = { 0: { slidesPerView: 1.15, spaceBetween: 16 }, 640: { slidesPerView: 2.1, spaceBetween: 20 }, 1024: { slidesPerView: 3, spaceBetween: 28 } },
}: {
  slides: React.ReactNode[];
  label: string;
  tone?: 'dark' | 'light';
  slideClassName?: string;
  breakpoints?: Record<number, { slidesPerView: number; spaceBetween: number }>;
}) {
  const id = useId().replace(/:/g, '');
  const [state, setState] = useState({ index: 0, begin: true, end: false });
  const btn = cn(
    'inline-flex size-12 items-center justify-center transition-colors disabled:opacity-30',
    tone === 'light' ? 'ring-1 ring-white/30 text-white hover:enabled:bg-white hover:enabled:text-ink' : 'ring-1 ring-ink/20 hover:enabled:bg-ink hover:enabled:text-white',
  );

  return (
    <section aria-roledescription="carousel" aria-label={label}>
      <Swiper
        modules={[Navigation, Keyboard, A11y]}
        navigation={{ prevEl: `#prev-${id}`, nextEl: `#next-${id}` }}
        keyboard={{ enabled: true, onlyInViewport: true }}
        a11y={{ enabled: true, slideRole: 'group', itemRoleDescriptionMessage: 'slide', containerRoleDescriptionMessage: 'carousel' }}
        breakpoints={breakpoints}
        watchSlidesProgress
        onSlideChange={(s) => setState({ index: s.activeIndex, begin: s.isBeginning, end: s.isEnd })}
        onAfterInit={(s) => setState({ index: s.activeIndex, begin: s.isBeginning, end: s.isEnd })}
        className="!overflow-visible"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={i} className={cn('!h-auto', slideClassName)}>
            {s}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-10 flex items-center justify-between gap-6">
        <div className={cn('h-px flex-1', tone === 'light' ? 'bg-white/15' : 'bg-ink/10')} aria-hidden>
          <div
            className={cn('h-px transition-all duration-500', tone === 'light' ? 'bg-white' : 'bg-ink')}
            style={{ width: `${((state.index + 1) / slides.length) * 100}%` }}
          />
        </div>
        <p className={cn('font-mono text-xs', tone === 'light' ? 'text-white/60' : 'text-steel')} aria-live="polite">
          {pad(state.index + 1)} / {pad(slides.length)}
        </p>
        <div className="flex gap-2">
          <button id={`prev-${id}`} type="button" className={btn} aria-label="Previous slide" disabled={state.begin}>
            <ArrowLeft aria-hidden className="size-5" />
          </button>
          <button id={`next-${id}`} type="button" className={btn} aria-label="Next slide" disabled={state.end}>
            <ArrowRight aria-hidden className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
