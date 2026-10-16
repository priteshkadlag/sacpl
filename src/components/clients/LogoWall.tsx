import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { Client } from '@/content/schema';

/** Client directory grid. Monochrome until hover/focus; external sites open in a new tab. */
export function LogoWall({ clients }: { clients: Client[] }) {
  return (
    <ul className="grid grid-cols-2 gap-px border border-ink/10 bg-ink/10 sm:grid-cols-3 lg:grid-cols-5">
      {clients.map((c) => {
        const body = (
          <>
            <div className="relative h-20 w-full">
              <Image
                src={c.logo}
                alt=""
                fill
                sizes="(min-width: 1024px) 15vw, 40vw"
                className="object-contain opacity-70 mix-blend-multiply grayscale transition duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-focus-visible:opacity-100 group-focus-visible:grayscale-0"
              />
            </div>
            <span className="mt-4 flex items-center justify-between gap-2 text-left">
              <span className="text-sm font-medium text-graphite">{c.name}</span>
              {c.website && <ArrowUpRight aria-hidden className="size-4 shrink-0 text-steel transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
            </span>
            {c.sector && <span className="mt-1 block font-mono text-[10px] tracking-[0.14em] text-steel uppercase">{c.sector}</span>}
          </>
        );
        return (
          <li key={c.name} className="bg-paper">
            {c.website ? (
              <a href={c.website} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col p-6 transition-colors hover:bg-white">
                {body}
                <span className="sr-only"> — visit website (opens in a new tab)</span>
              </a>
            ) : (
              <div className="group flex h-full flex-col p-6">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
