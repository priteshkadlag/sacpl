import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project, ProjectCategory } from '@/content/schema';
import { categoryLabels } from '@/content/categories';

/** Navy band under the hero: every sector in the portfolio with its project count, each a filtered link. */
export function SectorIndex({ projects }: { projects: Project[] }) {
  const counts = new Map<ProjectCategory, number>();
  for (const p of projects) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  const sectors = [...counts.entries()].sort((a, b) => b[1] - a[1]);

  return (
    <nav aria-label="Projects by sector" className="relative bg-navy text-white">
      <div className="container-x flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:gap-8">
        <p className="shrink-0 font-mono text-[11px] tracking-[0.16em] text-white/80 uppercase">Sectors we engineer</p>
        <ul className="-mx-1 flex gap-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] lg:flex-wrap lg:overflow-visible lg:pb-0">
          {sectors.map(([cat, n]) => (
            <li key={cat} className="shrink-0">
              <Link
                href={`/projects?category=${cat}`}
                className="group inline-flex min-h-11 items-center gap-2 px-3 text-sm whitespace-nowrap ring-1 ring-white/20 transition-colors hover:bg-white hover:text-navy-deep"
              >
                {categoryLabels[cat]}
                <span className="font-mono text-[11px] text-white/70 group-hover:text-navy">{String(n).padStart(2, '0')}</span>
                <ArrowUpRight aria-hidden className="size-3.5 opacity-60" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
