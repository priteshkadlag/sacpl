'use client';

import { useEffect, useRef } from 'react';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export function ErrorSummary({ errors, message }: { errors: { name: string; label: string; message?: string }[]; message?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const shown = errors.filter((e) => e.message);
  useEffect(() => {
    if (shown.length || message) ref.current?.focus();
  }, [shown.length, message]);
  if (!shown.length && !message) return null;
  return (
    <div ref={ref} tabIndex={-1} role="alert" className="border-l-2 border-signal bg-signal/5 p-5 outline-none">
      <p className="flex items-center gap-2 font-medium text-signal-dark">
        <AlertTriangle aria-hidden className="size-5" />
        {message ?? `Please correct ${shown.length} ${shown.length === 1 ? 'field' : 'fields'}`}
      </p>
      {shown.length > 0 && (
        <ul className="mt-3 space-y-1 pl-7 text-sm">
          {shown.map((e) => (
            <li key={e.name}>
              <a
                href={`#${e.name}`}
                onClick={(ev) => {
                  ev.preventDefault();
                  document.querySelector<HTMLElement>(`[name="${e.name}"]`)?.focus();
                }}
                className="text-signal-dark underline underline-offset-2"
              >
                {e.label}: {e.message}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function SuccessPanel({ title, reference, children, onReset, resetLabel }: { title: string; reference: string; children: React.ReactNode; onReset: () => void; resetLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);
  return (
    <div ref={ref} tabIndex={-1} role="status" className="bg-blueprint border border-ink/10 bg-white p-8 outline-none sm:p-12">
      <CheckCircle2 aria-hidden className="size-10 text-navy" />
      <h3 className="mt-6 font-display text-2xl font-semibold">{title}</h3>
      <div className="mt-3 max-w-lg leading-relaxed text-graphite">{children}</div>
      <p className="mt-6 font-mono text-xs tracking-[0.14em] text-steel uppercase">
        Reference <span className="text-ink">{reference}</span>
      </p>
      <button type="button" onClick={onReset} className="mt-8 inline-flex min-h-11 items-center text-sm font-medium text-navy underline underline-offset-4">
        {resetLabel}
      </button>
    </div>
  );
}
