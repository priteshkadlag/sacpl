import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ImageOff } from 'lucide-react';
import type { Project } from '@/content/schema';
import { categoryLabels } from '@/content/categories';
import { cn } from '@/lib/utils';

export function ProjectFacts({ project, compact }: { project: Project; compact?: boolean }) {
  const rows = [
    ['Height', project.height],
    ['Area', project.area],
    ...(compact ? [] : ([['Client', project.client], ['Architect', project.architect]] as const)),
  ].filter((r): r is [string, string] => !!r[1]);
  if (!rows.length) return null;
  return (
    <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-ink/10 pt-3">
      {rows.map(([k, v]) => (
        <div key={k} className="min-w-0">
          <dt className="font-mono text-[10px] tracking-[0.14em] text-steel uppercase">{k}</dt>
          <dd className="truncate text-sm text-graphite" title={v}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ProjectCard({
  project,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  aspect = 'aspect-[4/5]',
  headingLevel: H = 'h3',
  className,
  priority,
}: {
  project: Project;
  sizes?: string;
  aspect?: string;
  headingLevel?: 'h2' | 'h3';
  className?: string;
  priority?: boolean;
}) {
  const img = project.images[0];
  return (
    <article className={cn('group relative', className)}>
      <div className={cn('relative overflow-hidden bg-graphite', aspect)}>
        {img ? (
          <Image
            src={img.src}
            alt={img.alt}
            fill
            priority={priority}
            sizes={sizes}
            className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
          />
        ) : (
          <div className="bg-blueprint-dark flex h-full flex-col items-center justify-center gap-2 text-white/40">
            <ImageOff aria-hidden className="size-6" />
            <span className="font-mono text-[10px] tracking-widest uppercase">Image pending</span>
          </div>
        )}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute top-0 left-0 flex flex-wrap gap-1.5 p-3">
          <span className="bg-paper/95 px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-ink uppercase">{categoryLabels[project.category]}</span>
          {project.international && <span className="bg-navy px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-white uppercase">International</span>}
          {project.status === 'ongoing' && <span className="bg-signal-dark px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-white uppercase">Ongoing</span>}
        </div>
        <span aria-hidden className="absolute right-3 bottom-3 inline-flex size-10 translate-y-2 items-center justify-center bg-white text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
      <div className="pt-4">
        <H className="font-display text-lg leading-snug font-semibold">
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none after:focus-visible:outline-2 after:focus-visible:outline-signal">
            {project.name}
          </Link>
        </H>
        {project.location && <p className="mt-1 text-sm text-steel">{project.location}</p>}
        <ProjectFacts project={project} compact />
      </div>
    </article>
  );
}
