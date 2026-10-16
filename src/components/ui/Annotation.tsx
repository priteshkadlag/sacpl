import { cn } from '@/lib/utils';

/** Technical eyebrow label, e.g. "02 — Expertise". */
export function Eyebrow({ index, children, className, tone = 'dark' }: { index?: string; children: React.ReactNode; className?: string; tone?: 'dark' | 'light' }) {
  return (
    <p className={cn('eyebrow flex items-center gap-3', tone === 'light' ? 'text-white/65' : 'text-steel', className)}>
      {index && <span className={tone === 'light' ? 'text-accent' : 'text-accent'}>{index}</span>}
      {index && <span aria-hidden className={cn('h-px w-8', tone === 'light' ? 'bg-white/30' : 'bg-ink/25')} />}
      <span>{children}</span>
    </p>
  );
}

/** Horizontal dimension line with end ticks and an optional centred label. Decorative. */
export function DimensionLine({ label, className, tone = 'dark' }: { label?: string; className?: string; tone?: 'dark' | 'light' }) {
  const color = tone === 'light' ? 'border-white/35 text-white/55' : 'border-ink/25 text-steel';
  return (
    <div aria-hidden className={cn('relative flex items-center font-mono text-[10px] tracking-[0.18em] uppercase', color, className)}>
      <span className={cn('h-3 border-l', color)} />
      <span className={cn('h-px flex-1 border-t', color)} />
      {label && <span className="px-3">{label}</span>}
      {label && <span className={cn('h-px flex-1 border-t', color)} />}
      <span className={cn('h-3 border-l', color)} />
    </div>
  );
}

/** Marker shown in development/preview next to content awaiting SACPL confirmation. */
export function PendingBadge({ note, className }: { note?: string; className?: string }) {
  return (
    <span
      className={cn('inline-flex items-center gap-1.5 border border-dashed border-amber-500/70 bg-amber-50 px-2 py-0.5 font-mono text-[10px] tracking-wider text-amber-800 uppercase', className)}
      title={note}
    >
      Pending verification
    </span>
  );
}
