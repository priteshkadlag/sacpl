import Image from 'next/image';
import Link from 'next/link';
import { recognitions } from '@/content/company';
import { publishable } from '@/lib/verification';
import { PendingBadge } from '@/components/ui/Annotation';
import { Reveal } from '@/components/motion/Reveal';

/** Records and awards evidenced by certificates migrated from the legacy site. */
export function Recognitions({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const items = publishable(recognitions);
  const light = tone === 'light';
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {items.map((r, i) => (
        <Reveal as="li" key={r.id} delay={i * 0.08} className={`flex flex-col border ${light ? 'border-white/10 bg-graphite' : 'border-ink/10 bg-white'}`}>
          {r.image && (
            <div className={`relative aspect-[4/3] overflow-hidden ${light ? 'bg-ink' : 'bg-paper-2'}`}>
              <Image src={r.image.src} alt={r.image.alt} fill sizes="(min-width: 768px) 30vw, 100vw" className="object-contain p-4" />
            </div>
          )}
          <div className="flex flex-1 flex-col p-6">
            <p className={`font-mono text-[10px] tracking-[0.16em] uppercase ${light ? 'text-accent' : 'text-signal-dark'}`}>{r.issuer}</p>
            <h3 className="mt-3 font-display text-xl font-semibold">{r.title}</h3>
            <p className={`mt-3 text-sm leading-relaxed ${light ? 'text-white/65' : 'text-graphite/80'}`}>{r.body}</p>
            {r.verification === 'pending' && <PendingBadge className="mt-4 self-start" />}
            {r.project && (
              <Link href={`/projects/${r.project}`} className={`link-line mt-auto w-fit pt-6 text-sm font-medium ${light ? 'text-white' : 'text-navy'}`}>
                View project
              </Link>
            )}
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
