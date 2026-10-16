import Image from 'next/image';
import { Breadcrumbs, type Crumb } from './Breadcrumbs';
import { cn } from '@/lib/utils';

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  crumbs: Crumb[];
  image?: { src: string; alt: string };
  children?: React.ReactNode;
  coordinate?: string;
  size?: 'lg' | 'md';
};

/**
 * Dark inner-page hero with blueprint grid, structural axis lines and an
 * optional photographic panel. Server-rendered; entrance via CSS only.
 */
export function PageHero({ eyebrow, title, intro, crumbs, image, children, coordinate, size = 'lg' }: Props) {
  return (
    <section className={cn('bg-blueprint-dark relative overflow-hidden bg-ink text-white', size === 'lg' ? 'pt-36 pb-20 lg:pt-44 lg:pb-28' : 'pt-32 pb-14 lg:pt-40 lg:pb-20')}>
      {image && (
        <div className="absolute inset-y-0 right-0 hidden w-[42%] lg:block">
          <Image src={image.src} alt={image.alt} fill priority sizes="42vw" className="object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/50 to-transparent" />
        </div>
      )}
      {/* structural axes */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 bottom-0 left-[8%] w-px bg-white/8" />
        <div className="absolute right-0 bottom-16 left-0 h-px bg-white/8" />
        <span className="absolute bottom-[4.4rem] left-[calc(8%+0.75rem)] font-mono text-[10px] tracking-[0.2em] text-white/55">
          {coordinate ?? 'A — 01'}
        </span>
      </div>

      <div className="container-x page-enter relative">
        <Breadcrumbs items={crumbs} />
        <p className="eyebrow mt-10 flex items-center gap-3 text-white/60">
          <span className="h-px w-8 bg-signal" aria-hidden />
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-display-lg font-semibold">{title}</h1>
        {intro && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">{intro}</div>}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
