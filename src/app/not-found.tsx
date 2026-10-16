import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <section className="bg-blueprint-dark relative flex min-h-dvh items-center overflow-hidden bg-ink pt-[var(--header-h)] text-white">
      <svg aria-hidden viewBox="0 0 400 300" className="pointer-events-none absolute right-[-10%] bottom-0 w-[70vw] max-w-3xl opacity-20" fill="none" stroke="currentColor">
        {/* a beam with a missing support */}
        <line x1="40" y1="120" x2="360" y2="120" strokeWidth="6" />
        <line x1="60" y1="120" x2="60" y2="280" strokeWidth="4" />
        <line x1="200" y1="120" x2="200" y2="280" strokeWidth="4" strokeDasharray="8 10" stroke="#ed3c32" />
        <line x1="340" y1="120" x2="340" y2="280" strokeWidth="4" />
        <line x1="20" y1="282" x2="380" y2="282" strokeWidth="2" />
      </svg>
      <div className="container-x relative py-24">
        <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase">Error 404 · Support not found</p>
        <h1 className="mt-6 max-w-3xl font-display text-display-lg font-semibold">This page has no load path.</h1>
        <p className="mt-6 max-w-xl text-lg text-white/70">The page you’re looking for may have moved during our website rebuild. Try one of these instead:</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/" variant="signal">Home</Button>
          <Button href="/projects" variant="ghost-light">Projects</Button>
          <Button href="/expertise" variant="ghost-light">Expertise</Button>
          <Button href="/contact" variant="ghost-light">Contact</Button>
        </div>
        <p className="mt-10 text-sm text-white/50">
          Looking for an old blog post or job listing? Visit <Link href="/insights" className="underline">Insights</Link> or <Link href="/careers" className="underline">Careers</Link>.
        </p>
      </div>
    </section>
  );
}
