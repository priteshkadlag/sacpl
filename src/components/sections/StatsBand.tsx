import { stats } from '@/content/company';
import { publishable } from '@/lib/verification';
import { Counter } from '@/components/motion/Counter';
import { PendingBadge } from '@/components/ui/Annotation';

/**
 * Achievement figures. Only verified figures render in production; in preview,
 * pending figures are shown with a marker. Each number carries an explanation —
 * never a bare counter.
 */
export function StatsBand({ tone = 'light', compact }: { tone?: 'light' | 'dark'; compact?: boolean }) {
  const items = publishable(stats);
  if (!items.length) return null;
  return (
    <dl className={`grid gap-px sm:grid-cols-2 ${compact ? '' : 'lg:grid-cols-4'} ${tone === 'light' ? 'bg-white/10' : 'bg-ink/10'}`}>
      {items.map((s) => (
        <div key={s.id} className={`relative p-8 ${tone === 'light' ? 'bg-ink' : 'bg-paper'}`}>
          <dt className="sr-only">{s.label}</dt>
          <dd>
            <span aria-hidden className="absolute top-0 left-8 h-6 w-px bg-signal" />
            <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} className="font-display text-5xl font-semibold tracking-tight" />
            <p className="mt-3 font-mono text-[11px] tracking-[0.16em] uppercase opacity-60">{s.label}</p>
            <p className="mt-3 text-sm leading-relaxed opacity-70">{s.explanation}</p>
            {s.verification === 'pending' && <PendingBadge className="mt-4" note={s.source} />}
          </dd>
        </div>
      ))}
    </dl>
  );
}
