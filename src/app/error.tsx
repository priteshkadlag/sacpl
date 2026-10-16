'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="bg-blueprint-dark flex min-h-dvh items-center bg-ink pt-[var(--header-h)] text-white">
      <div className="container-x py-24">
        <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">Unexpected error{error.digest ? ` · ${error.digest}` : ''}</p>
        <h1 className="mt-6 max-w-3xl font-display text-display-lg font-semibold">Something didn’t hold up.</h1>
        <p className="mt-6 max-w-xl text-lg text-white/70">An unexpected error occurred while loading this page. Please try again — if it keeps happening, contact us and we’ll look into it.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button type="button" onClick={reset} className="inline-flex min-h-12 items-center gap-2 bg-signal-dark px-6 text-sm font-medium hover:bg-[#a8231b]">
            <RotateCcw aria-hidden className="size-4" /> Try again
          </button>
          <Link href="/" className="inline-flex min-h-12 items-center px-6 text-sm font-medium ring-1 ring-white/30 hover:ring-white">
            Go to home page
          </Link>
        </div>
      </div>
    </section>
  );
}
