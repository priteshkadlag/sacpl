import Link from 'next/link';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';
import { cn } from '@/lib/utils';

export type Crumb = { name: string; path: string };

/** Visible breadcrumb trail plus matching BreadcrumbList structured data. */
export function Breadcrumbs({ items, tone = 'light', className }: { items: Crumb[]; tone?: 'light' | 'dark'; className?: string }) {
  const all = [{ name: 'Home', path: '/' }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className={cn('font-mono text-[11px] tracking-[0.14em] uppercase', className)}>
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className={tone === 'light' ? 'text-white' : 'text-ink'}>{c.name}</span>
                ) : (
                  <Link href={c.path} className={cn('inline-flex min-h-8 items-center hover:underline', tone === 'light' ? 'text-white/60' : 'text-steel')}>
                    {c.name}
                  </Link>
                )}
                {!last && <span aria-hidden className={tone === 'light' ? 'text-white/35' : 'text-ink/30'}>/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbJsonLd(all)} />
    </>
  );
}
