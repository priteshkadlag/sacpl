'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Play } from 'lucide-react';

/**
 * Click-to-load YouTube embed (privacy-enhanced domain). No third-party
 * JavaScript loads until the visitor chooses to play; captions requested on.
 */
export function YouTubeEmbed({ id, title, poster }: { id: string; title: string; poster?: string }) {
  const [active, setActive] = useState(false);
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-ink">
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&cc_load_policy=1&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button type="button" onClick={() => setActive(true)} className="group absolute inset-0 h-full w-full">
          <Image
            src={poster ?? `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover opacity-80 transition duration-700 group-hover:scale-[1.02] group-hover:opacity-95"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" aria-hidden />
          <span className="absolute bottom-6 left-6 flex items-center gap-4 text-left text-white">
            <span className="inline-flex size-16 items-center justify-center bg-signal transition-transform duration-500 group-hover:scale-105">
              <Play aria-hidden className="ml-1 size-6 fill-current" />
            </span>
            <span>
              <span className="block font-mono text-[10px] tracking-[0.18em] text-white/70 uppercase">
                <span aria-hidden>Watch · YouTube</span>
                <span className="sr-only">Play YouTube video:</span>
              </span>
              <span className="block font-display text-lg font-semibold">{title}</span>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
