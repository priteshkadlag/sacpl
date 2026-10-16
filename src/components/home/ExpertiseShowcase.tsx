'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Item = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  deliverables: string[];
  image?: { src: string; alt: string };
};

/**
 * Index of disciplines: large rows on the right, and a sticky "viewport" on the left
 * that swaps to the project image of whichever row is hovered or focused.
 * Every row is a plain link, so it works without JavaScript.
 */
export function ExpertiseShowcase({ items }: { items: Item[] }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="mt-16 grid gap-10 lg:grid-cols-12">
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28">
          <div className="relative aspect-[4/5] overflow-hidden bg-navy-ink">
            {items.map((s, i) =>
              s.image ? (
                <Image
                  key={s.slug}
                  src={s.image.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 38vw, 1px"
                  className={cn('object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)]', i === active ? 'scale-100 opacity-100' : 'scale-105 opacity-0')}
                />
              ) : null,
            )}
            <div aria-hidden className="absolute inset-0 bg-linear-to-t from-navy-ink/90 via-navy-ink/10 to-transparent" />
            <div aria-hidden className="bg-blueprint-navy absolute inset-0 opacity-60" />
            {/* corner registration marks */}
            <span aria-hidden className="absolute top-4 left-4 size-5 border-t border-l border-white/60" />
            <span aria-hidden className="absolute top-4 right-4 size-5 border-t border-r border-white/60" />
            <span aria-hidden className="absolute bottom-4 left-4 size-5 border-b border-l border-white/60" />
            <span aria-hidden className="absolute right-4 bottom-4 size-5 border-r border-b border-white/60" />
            <div className="absolute inset-x-0 bottom-0 p-8 text-white" aria-hidden>
              <p className="font-display text-[7rem] leading-none font-semibold text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.7)]">{current.number}</p>
              <p className="mt-4 font-display text-2xl font-semibold">{current.title}</p>
              {current.image && <p className="mt-2 font-mono text-[11px] tracking-[0.16em] text-white/70 uppercase">Shown: {current.image.alt}</p>}
            </div>
          </div>
        </div>
      </div>

      <ol className="border-t border-ink/15 lg:col-span-7">
        {items.map((s, i) => (
          <li key={s.slug} className="border-b border-ink/15">
            <Link
              href={`/expertise/${s.slug}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group relative flex gap-5 px-3 py-8 transition-colors duration-500 hover:bg-navy hover:text-white focus-visible:bg-navy focus-visible:text-white sm:gap-8 sm:px-6 lg:py-10"
            >
              <span className="hidden w-8 shrink-0 pt-1.5 font-mono text-xs text-navy sm:block transition-colors group-hover:text-white/70 group-focus-visible:text-white/70">{s.number}</span>
              {s.image && (
                <span className="relative size-16 shrink-0 overflow-hidden bg-navy-ink lg:hidden">
                  <Image src={s.image.src} alt="" fill sizes="64px" className="object-cover" />
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="block font-display text-2xl font-semibold transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2 lg:text-3xl">{s.title}</span>
                <span className="mt-3 block max-w-xl leading-relaxed text-graphite/80 transition-colors group-hover:text-white/80 group-focus-visible:text-white/80">{s.summary}</span>
                <span className="mt-4 block font-mono text-[11px] tracking-[0.12em] text-steel uppercase transition-colors group-hover:text-white/65 group-focus-visible:text-white/65">
                  {s.deliverables.slice(0, 3).join(' · ')}
                </span>
              </span>
              <span
                aria-hidden
                className="hidden size-12 shrink-0 items-center justify-center ring-1 ring-ink/20 transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-navy group-hover:ring-white sm:inline-flex"
              >
                <ArrowUpRight className="size-5" />
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
