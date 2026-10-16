'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from 'motion/react';
import { Search, X } from 'lucide-react';
import type { Project, ProjectCategory } from '@/content/schema';
import { categoryLabels } from '@/content/categories';
import { ProjectCard } from './ProjectCard';
import { cn } from '@/lib/utils';

const PAGE = 24;
type Flag = 'international' | 'completed' | 'ongoing';
const flagLabels: Record<Flag, string> = { international: 'International', completed: 'Completed', ongoing: 'Ongoing' };

export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const reduce = useReducedMotion();
  const [, startTransition] = useTransition();

  const [category, setCategory] = useState<ProjectCategory | 'all'>((params.get('category') as ProjectCategory) || 'all');
  const [flags, setFlags] = useState<Set<Flag>>(() => new Set((params.get('filter')?.split(',').filter(Boolean) as Flag[]) ?? []));
  const [query, setQuery] = useState(params.get('q') ?? '');
  const [limit, setLimit] = useState(PAGE);

  const categories = useMemo(() => {
    const counts = new Map<ProjectCategory, number>();
    for (const p of projects) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    return (Object.keys(categoryLabels) as ProjectCategory[]).filter((c) => counts.has(c)).map((c) => ({ id: c, count: counts.get(c)! }));
  }, [projects]);

  // Only offer status filters backed by data.
  const availableFlags = useMemo(
    () => (['international', 'completed', 'ongoing'] as Flag[]).filter((f) => projects.some((p) => (f === 'international' ? p.international : p.status === f))),
    [projects],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (flags.has('international') && !p.international) return false;
      if (flags.has('completed') && p.status !== 'completed') return false;
      if (flags.has('ongoing') && p.status !== 'ongoing') return false;
      if (q && ![p.name, p.location, p.client, p.architect, p.country].some((v) => v?.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [projects, category, flags, query]);

  // Keep the URL shareable without adding history entries.
  useEffect(() => {
    const sp = new URLSearchParams();
    if (category !== 'all') sp.set('category', category);
    if (flags.size) sp.set('filter', [...flags].join(','));
    if (query.trim()) sp.set('q', query.trim());
    const next = sp.toString();
    if (next !== params.toString()) startTransition(() => router.replace(`${pathname}${next ? `?${next}` : ''}`, { scroll: false }));
    setLimit(PAGE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, flags, query]);

  const toggle = (f: Flag) =>
    setFlags((prev) => {
      const next = new Set(prev);
      if (next.has(f)) next.delete(f);
      else {
        next.add(f);
        if (f === 'completed') next.delete('ongoing');
        if (f === 'ongoing') next.delete('completed');
      }
      return next;
    });

  const reset = () => {
    setCategory('all');
    setFlags(new Set());
    setQuery('');
  };

  const visible = filtered.slice(0, limit);
  const chip = (active: boolean) =>
    cn(
      'inline-flex min-h-11 items-center gap-2 px-4 text-sm transition-colors',
      active ? 'bg-ink text-white' : 'bg-white text-graphite ring-1 ring-ink/12 ring-inset hover:ring-ink/40',
    );

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="sticky top-[var(--header-h)] z-20 -mx-[clamp(1rem,4vw,3.5rem)] border-b border-ink/10 bg-paper/95 px-[clamp(1rem,4vw,3.5rem)] py-4 backdrop-blur-md">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div role="group" aria-label="Filter by sector" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:thin] lg:flex-wrap lg:overflow-visible">
            <button type="button" aria-pressed={category === 'all'} onClick={() => setCategory('all')} className={cn(chip(category === 'all'), 'shrink-0')}>
              All <span className="font-mono text-[11px] opacity-60">{projects.length}</span>
            </button>
            {categories.map((c) => (
              <button key={c.id} type="button" aria-pressed={category === c.id} onClick={() => setCategory(c.id)} className={cn(chip(category === c.id), 'shrink-0')}>
                {categoryLabels[c.id]} <span className="font-mono text-[11px] opacity-60">{c.count}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div role="group" aria-label="Filter by status" className="flex gap-2">
              {availableFlags.map((f) => (
                <button key={f} type="button" aria-pressed={flags.has(f)} onClick={() => toggle(f)} className={chip(flags.has(f))}>
                  {flagLabels[f]}
                </button>
              ))}
            </div>
            <label className="relative flex min-h-11 flex-1 items-center bg-white ring-1 ring-ink/12 ring-inset focus-within:ring-ink lg:w-64 lg:flex-none">
              <span className="sr-only">Search projects</span>
              <Search aria-hidden className="ml-3 size-4 text-steel" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Name, city, client…"
                className="h-11 w-full bg-transparent px-3 text-sm outline-none placeholder:text-steel"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="font-mono text-xs tracking-[0.14em] text-steel uppercase" role="status" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
          {category !== 'all' && ` · ${categoryLabels[category]}`}
        </p>
        {(category !== 'all' || flags.size > 0 || query) && (
          <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-1 text-sm text-navy hover:underline">
            <X aria-hidden className="size-4" /> Clear filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-blueprint mt-8 flex flex-col items-center border border-dashed border-ink/20 px-6 py-20 text-center">
          <p className="font-display text-xl font-semibold">No projects match these filters.</p>
          <p className="mt-2 max-w-md text-steel">Try a different sector or clear the search. Many SACPL commissions are not yet published online — ask us about comparable work.</p>
          <button type="button" onClick={reset} className="mt-6 inline-flex min-h-11 items-center bg-ink px-5 text-sm text-white">
            Show all projects
          </button>
        </div>
      ) : (
        <ul className="mt-8 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p, i) => (
              <m.li
                key={p.slug}
                layout={!reduce}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: reduce ? 0 : 0.15 } }}
                transition={reduce ? { duration: 0 } : { duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={p} priority={i < 3} />
              </m.li>
            ))}
          </AnimatePresence>
        </ul>
      )}

      {filtered.length > limit && (
        <div className="mt-14 flex flex-col items-center gap-3">
          <p className="font-mono text-xs text-steel">
            Showing {visible.length} of {filtered.length}
          </p>
          <button type="button" onClick={() => setLimit((l) => l + PAGE)} className="inline-flex min-h-12 items-center bg-ink px-8 text-sm font-medium text-white hover:bg-navy">
            Load more projects
          </button>
        </div>
      )}
    </LazyMotion>
  );
}
