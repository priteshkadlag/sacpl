'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import type { Article } from '@/content/schema';
import { ArticleCard, articleText } from './ArticleCard';
import { cn } from '@/lib/utils';

/** Category filter + full-text search over the (small) article set, client-side. */
export function InsightsBrowser({ articles }: { articles: Article[] }) {
  const [category, setCategory] = useState('All');
  const [q, setQ] = useState('');
  const categories = useMemo(() => ['All', ...Array.from(new Set(articles.map((a) => a.category)))], [articles]);
  const results = articles.filter(
    (a) => (category === 'All' || a.category === category) && (!q.trim() || `${a.title} ${articleText(a)}`.toLowerCase().includes(q.trim().toLowerCase())),
  );

  return (
    <>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={cn('inline-flex min-h-11 items-center px-4 text-sm', category === c ? 'bg-ink text-white' : 'bg-white ring-1 ring-ink/12 ring-inset hover:ring-ink/40')}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="relative flex min-h-11 items-center bg-white ring-1 ring-ink/12 ring-inset focus-within:ring-ink sm:w-72">
          <span className="sr-only">Search insights</span>
          <Search aria-hidden className="ml-3 size-4 text-steel" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search insights…" className="h-11 w-full bg-transparent px-3 text-sm outline-none" />
        </label>
      </div>
      <p role="status" aria-live="polite" className="mt-6 font-mono text-xs tracking-[0.14em] text-steel uppercase">
        {results.length} {results.length === 1 ? 'article' : 'articles'}
      </p>
      {results.length ? (
        <ul className="mt-8 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((a) => (
            <li key={a.slug}>
              <ArticleCard article={a} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="bg-blueprint mt-8 border border-dashed border-ink/20 px-6 py-16 text-center">
          <p className="font-display text-xl font-semibold">No articles match your search.</p>
          <button type="button" onClick={() => { setQ(''); setCategory('All'); }} className="mt-5 inline-flex min-h-11 items-center bg-ink px-5 text-sm text-white">
            Show all articles
          </button>
        </div>
      )}
    </>
  );
}
