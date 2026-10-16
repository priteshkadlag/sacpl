'use client';

import { useRef, useState } from 'react';
import { Play } from 'lucide-react';

/**
 * SACPL portfolio film (migrated from the legacy homepage). Deferred: nothing
 * downloads until the visitor presses play; native controls thereafter.
 */
export function FilmPlayer({ src, poster, title, description }: { src: string; poster: string; title: string; description: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  return (
    <figure className="relative aspect-video w-full overflow-hidden bg-ink">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        poster={poster}
        preload="none"
        playsInline
        controls={started}
        aria-label={title}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support embedded video. <a href={src}>Download the film</a>.
      </video>
      {!started && (
        <button
          type="button"
          onClick={() => {
            setStarted(true);
            ref.current?.play().catch(() => {});
          }}
          className="group absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 via-ink/10 to-transparent p-6 text-left text-white"
        >
          <span className="flex items-center gap-4">
            <span className="inline-flex size-16 items-center justify-center bg-white text-ink transition-transform duration-500 group-hover:scale-105">
              <Play aria-hidden className="ml-1 size-6 fill-current" />
            </span>
            <span>
              <span className="block font-mono text-[10px] tracking-[0.18em] text-white/70 uppercase">
                <span aria-hidden>Film · 3 min</span>
                <span className="sr-only">Play film (3 minutes):</span>
              </span>
              <span className="block font-display text-lg font-semibold">{title}</span>
            </span>
          </span>
        </button>
      )}
      <figcaption className="sr-only">{description}</figcaption>
    </figure>
  );
}
