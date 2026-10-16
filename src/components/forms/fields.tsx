'use client';

import { forwardRef, useId } from 'react';
import { AlertCircle, Paperclip } from 'lucide-react';
import { cn } from '@/lib/utils';

const control =
  'block w-full bg-white px-4 py-3 text-[0.95rem] text-ink ring-1 ring-ink/15 ring-inset transition-shadow outline-none placeholder:text-steel/70 focus:ring-2 focus:ring-navy aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-signal';

type BaseProps = { label: string; error?: string; hint?: string; required?: boolean; className?: string };

function FieldShell({ id, label, error, hint, required, className, children }: BaseProps & { id: string; children: React.ReactNode }) {
  return (
    <div className={cn('flex flex-col', className)}>
      <label htmlFor={id} className="mb-2 text-sm font-medium text-graphite">
        {label}
        {required ? <span className="text-accent" aria-hidden> *</span> : <span className="ml-1 font-normal text-steel">(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-steel">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm text-signal-dark">
          <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

function describedBy(id: string, error?: string, hint?: string) {
  return error ? `${id}-error` : hint ? `${id}-hint` : undefined;
}

export const TextField = forwardRef<HTMLInputElement, BaseProps & React.InputHTMLAttributes<HTMLInputElement>>(function TextField(
  { label, error, hint, required, className, ...props },
  ref,
) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <input ref={ref} id={id} aria-invalid={!!error} aria-required={required} aria-describedby={describedBy(id, error, hint)} className={cn(control, 'min-h-12')} {...props} />
    </FieldShell>
  );
});

export const TextArea = forwardRef<HTMLTextAreaElement, BaseProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>>(function TextArea(
  { label, error, hint, required, className, ...props },
  ref,
) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} required={required} className={className}>
      <textarea ref={ref} id={id} rows={6} aria-invalid={!!error} aria-required={required} aria-describedby={describedBy(id, error, hint)} className={cn(control, 'resize-y')} {...props} />
    </FieldShell>
  );
});

export const SelectField = forwardRef<HTMLSelectElement, BaseProps & React.SelectHTMLAttributes<HTMLSelectElement> & { options: readonly string[]; placeholder?: string }>(
  function SelectField({ label, error, hint, required, className, options, placeholder = 'Select…', ...props }, ref) {
    const id = useId();
    return (
      <FieldShell id={id} label={label} error={error} hint={hint} required={required} className={className}>
        <select
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-required={required}
          aria-describedby={describedBy(id, error, hint)}
          className={cn(control, 'min-h-12 appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%2712%27%20height%3D%278%27%3E%3Cpath%20d%3D%27M1%201l5%205%205-5%27%20stroke%3D%27%230d1014%27%20fill%3D%27none%27/%3E%3C/svg%3E")] bg-[position:right_1rem_center] bg-no-repeat pr-10')}
          defaultValue=""
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </FieldShell>
    );
  },
);

export function FileField({
  label,
  error,
  hint,
  required,
  accept,
  name,
  fileName,
  onFile,
}: BaseProps & { accept: string; name: string; fileName?: string; onFile: (f: File | null) => void }) {
  const id = useId();
  return (
    <FieldShell id={id} label={label} error={error} hint={hint} required={required}>
      <div className={cn('relative flex min-h-14 items-center gap-3 border border-dashed bg-white px-4 py-3', error ? 'border-signal' : 'border-ink/25 focus-within:border-navy')}>
        <Paperclip aria-hidden className="size-4 shrink-0 text-steel" />
        <span className="truncate text-sm text-graphite">{fileName ?? 'Choose a file…'}</span>
        <input
          id={id}
          name={name}
          type="file"
          accept={accept}
          aria-invalid={!!error}
          aria-required={required}
          aria-describedby={describedBy(id, error, hint)}
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
      </div>
    </FieldShell>
  );
}

export const Consent = forwardRef<HTMLInputElement, { error?: string; children: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>>(function Consent(
  { error, children, ...props },
  ref,
) {
  const id = useId();
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-5 shrink-0 accent-navy"
          {...props}
        />
        <label htmlFor={id} className="text-sm leading-relaxed text-graphite">
          {children}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 ml-8 flex items-start gap-1.5 text-sm text-signal-dark">
          <AlertCircle aria-hidden className="mt-0.5 size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
});

/** Off-screen honeypot. Real visitors never see or fill it. */
export function Honeypot({ register }: { register: React.InputHTMLAttributes<HTMLInputElement> }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" tabIndex={-1} autoComplete="off" {...register} />
      </label>
    </div>
  );
}
