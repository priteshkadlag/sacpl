import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/content/schema';
import { categoryLabels } from '@/content/categories';
import { cn } from '@/lib/utils';

/**
 * Editorial project grid: one lead project at 2×2, the rest as square tiles,
 * closed by a navy "view all" tile. Text sits on the image, so every tile is one link.
 */
export function ProjectMosaic({ projects, total }: { projects: Project[]; total: number }) {
  const [lead, ...rest] = projects;
  return (
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      {[lead, ...rest].map((p, i) => {
        const big = i === 0;
        const img = p.images[0];
        return (
          <li key={p.slug} className={cn('group relative aspect-square overflow-hidden bg-navy-ink', big && 'col-span-2 lg:row-span-2')}>
            {img && (
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={big ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'}
                className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
              />
            )}
            <div aria-hidden className="absolute inset-0 bg-linear-to-t from-navy-ink/95 via-navy-ink/25 to-transparent" />
            <div aria-hidden className="absolute inset-0 bg-navy/0 mix-blend-multiply transition-colors duration-500 group-hover:bg-navy/45" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-5 lg:p-6">
              <p className="font-mono text-[10px] tracking-[0.16em] text-white/75 uppercase">
                {categoryLabels[p.category]}
                {p.international && ' · International'}
              </p>
              <h3 className={cn('mt-2 font-display leading-tight font-semibold', big ? 'text-2xl sm:text-4xl' : 'text-base sm:text-lg')}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="after:absolute after:inset-0 focus-visible:outline-none after:focus-visible:outline-2 after:focus-visible:-outline-offset-4 after:focus-visible:outline-white"
                >
                  {p.name}
                </Link>
              </h3>
              {p.location && <p className={cn('mt-1 text-white/75', big ? 'text-base' : 'hidden text-sm sm:block')}>{p.location}</p>}
              {big && p.height && <p className="mt-4 inline-block border border-white/30 px-2 py-1 font-mono text-[11px] tracking-[0.12em] uppercase">Height · {p.height}</p>}
            </div>
            <span
              aria-hidden
              className="absolute top-3 right-3 inline-flex size-9 items-center justify-center bg-white text-navy opacity-0 transition-all duration-500 group-hover:opacity-100 sm:size-10"
            >
              <ArrowUpRight className="size-4" />
            </span>
          </li>
        );
      })}
      <li className="group relative aspect-square bg-navy text-white">
        <Link href="/projects" className="flex h-full flex-col justify-between p-4 transition-colors duration-500 hover:bg-navy-deep sm:p-6">
          <span className="font-mono text-[10px] tracking-[0.16em] text-white/75 uppercase">Portfolio</span>
          <span>
            <span className="block font-display text-4xl font-semibold sm:text-6xl">{total}</span>
            <span className="mt-1 block text-sm text-white/85 sm:text-base">projects in the online portfolio</span>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium">
              View all <ArrowRight aria-hidden className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </span>
          </span>
        </Link>
      </li>
    </ul>
  );
}
