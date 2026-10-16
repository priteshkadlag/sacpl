'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import type { ImageAsset } from '@/content/schema';
import { cn, pad } from '@/lib/utils';

/** Gallery grid + accessible lightbox built on the native <dialog> element. */
export function ProjectGallery({ images, title }: { images: ImageAsset[]; title: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);

  const open = (i: number, el: HTMLButtonElement) => {
    opener.current = el;
    setIndex(i);
    dialog.current?.showModal();
  };
  const close = () => dialog.current?.close();
  const go = useCallback((d: number) => setIndex((i) => (i + d + images.length) % images.length), [images.length]);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onClose = () => opener.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    el.addEventListener('close', onClose);
    el.addEventListener('keydown', onKey);
    return () => {
      el.removeEventListener('close', onClose);
      el.removeEventListener('keydown', onKey);
    };
  }, [go]);

  if (!images.length) return null;
  const many = images.length > 1;

  return (
    <>
      <ul className={cn('grid gap-4', images.length === 1 ? 'grid-cols-1' : 'sm:grid-cols-2')}>
        {images.map((img, i) => (
          <li key={img.src} className={cn(images.length > 2 && i === 0 && 'sm:col-span-2')}>
            <button
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              className="group relative block aspect-[16/10] w-full overflow-hidden bg-graphite"
              aria-label={`View image ${i + 1} of ${images.length} full screen: ${img.alt}`}
            >
              <Image src={img.src} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <span aria-hidden className="absolute right-3 bottom-3 inline-flex size-10 items-center justify-center bg-white/90 text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand className="size-4" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={`${title} — image viewer`}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/97 p-0 text-white backdrop:bg-ink/80"
        onClick={(e) => e.target === dialog.current && close()}
      >
        <div
          className="relative flex h-full flex-col"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between p-4 sm:p-6">
            <p className="font-mono text-xs tracking-[0.18em] text-white/70" aria-live="polite">
              {pad(index + 1)} / {pad(images.length)}
            </p>
            <button type="button" onClick={close} className="inline-flex size-11 items-center justify-center ring-1 ring-white/25 hover:ring-white" aria-label="Close image viewer" autoFocus>
              <X aria-hidden className="size-5" />
            </button>
          </div>
          <figure className="relative mx-4 flex-1 sm:mx-20">
            <Image key={images[index].src} src={images[index].src} alt={images[index].alt} fill sizes="100vw" className="object-contain" />
            <figcaption className="sr-only">{images[index].alt}</figcaption>
          </figure>
          <p className="px-6 py-4 text-center text-sm text-white/70">{images[index].alt}</p>
          {many && (
            <>
              <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="absolute top-1/2 left-2 inline-flex size-12 -translate-y-1/2 items-center justify-center bg-white/10 hover:bg-white/20 sm:left-4">
                <ChevronLeft aria-hidden className="size-6" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next image" className="absolute top-1/2 right-2 inline-flex size-12 -translate-y-1/2 items-center justify-center bg-white/10 hover:bg-white/20 sm:right-4">
                <ChevronRight aria-hidden className="size-6" />
              </button>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
