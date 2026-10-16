import Image from 'next/image';
import type { Person } from '@/content/people';
import { PendingBadge } from '@/components/ui/Annotation';
import { cn } from '@/lib/utils';

/** Portrait card for leadership and team listings. `compact` is the dense Expert Team variant. */
export function PersonCard({ person, compact, tone = 'dark', sizes }: { person: Person; compact?: boolean; tone?: 'dark' | 'light'; sizes: string }) {
  const light = tone === 'light';
  return (
    <li className={cn('group flex flex-col', light ? 'bg-navy-deep' : 'bg-paper ring-1 ring-ink/10')}>
      <div className={cn('relative overflow-hidden', compact ? 'aspect-square' : 'aspect-[4/5]', light ? 'bg-navy-ink' : 'bg-navy-tint')}>
        <Image
          src={person.photo.src}
          alt={`Portrait of ${person.name}`}
          fill
          sizes={sizes}
          className="object-cover object-top transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
        <span aria-hidden className="absolute bottom-0 left-0 h-1 w-0 bg-signal transition-all duration-700 group-hover:w-full" />
      </div>
      <div className={cn('flex flex-1 flex-col', compact ? 'p-4' : 'p-6')}>
        <h3 className={cn('font-display font-semibold', compact ? 'text-base leading-snug' : 'text-xl')}>{person.name}</h3>
        <p className={cn('mt-1 font-mono tracking-[0.1em] uppercase', compact ? 'text-[10px] leading-relaxed' : 'text-[11px]', light ? 'text-accent' : 'text-navy')}>{person.role}</p>
        {person.bio && !compact && <p className="mt-3 text-sm leading-relaxed text-graphite/80">{person.bio}</p>}
        {person.verification === 'pending' && <PendingBadge className="mt-3 self-start" />}
      </div>
    </li>
  );
}
