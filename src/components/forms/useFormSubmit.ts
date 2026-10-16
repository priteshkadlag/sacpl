'use client';

import { useRef, useState } from 'react';
import type { FieldValues, Path, UseFormSetError } from 'react-hook-form';

type State = { status: 'idle' } | { status: 'submitting' } | { status: 'success'; reference: string } | { status: 'error'; message: string };

/** Posts a multipart form to an API route and maps server field errors back into React Hook Form. */
export function useFormSubmit<T extends FieldValues>(endpoint: string, setError: UseFormSetError<T>) {
  const [state, setState] = useState<State>({ status: 'idle' });
  const startedAt = useRef(Date.now());

  async function submit(values: T, files: Record<string, File | null>) {
    setState({ status: 'submitting' });
    const fd = new FormData();
    for (const [k, v] of Object.entries(values)) if (v !== undefined && v !== null) fd.append(k, String(v));
    for (const [k, f] of Object.entries(files)) if (f) fd.append(k, f);
    fd.set('startedAt', String(startedAt.current));
    try {
      const res = await fetch(endpoint, { method: 'POST', body: fd });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok) {
        setState({ status: 'success', reference: body.reference });
        return true;
      }
      if (body.fieldErrors) {
        for (const [field, msgs] of Object.entries(body.fieldErrors as Record<string, string[]>)) {
          setError(field as Path<T>, { type: 'server', message: msgs[0] });
        }
      }
      setState({ status: 'error', message: body.error ?? 'Something went wrong. Please try again.' });
    } catch {
      setState({ status: 'error', message: 'Network error — check your connection and try again.' });
    }
    return false;
  }

  return { state, submit, reset: () => setState({ status: 'idle' }) };
}
