'use client';

import { useState } from 'react';
import { Check, Link2 } from 'lucide-react';

export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  const links = [
    { name: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { name: 'X', href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}` },
    { name: 'WhatsApp', href: `https://wa.me/?text=${enc(`${title} ${url}`)}` },
    { name: 'Email', href: `mailto:?subject=${enc(title)}&body=${enc(url)}` },
  ];
  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.16em] text-steel uppercase">Share</p>
      <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col">
        {links.map((l) => (
          <li key={l.name}>
            <a
              href={l.href}
              target={l.name === 'Email' ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center px-3 text-sm ring-1 ring-ink/15 hover:ring-ink"
            >
              {l.name}
              {l.name !== 'Email' && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          </li>
        ))}
        <li>
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(url);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="inline-flex min-h-11 items-center gap-2 px-3 text-sm ring-1 ring-ink/15 hover:ring-ink"
          >
            {copied ? <Check aria-hidden className="size-4" /> : <Link2 aria-hidden className="size-4" />}
            <span aria-live="polite">{copied ? 'Copied' : 'Copy link'}</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
