'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Info, Loader2, Lock } from 'lucide-react';
import { loginSchema, type LoginInput } from '@/lib/forms';
import { TextField } from './fields';
import { ErrorSummary } from './FormStatus';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const PORTAL_URL = process.env.NEXT_PUBLIC_CLIENT_PORTAL_URL;
/** The portal is only "live" when a real auth backend AND a destination are configured. */
export const PORTAL_CONFIGURED = Boolean(SUPABASE_URL && SUPABASE_ANON && PORTAL_URL);

async function client() {
  const { createClient } = await import('@supabase/supabase-js');
  return createClient(SUPABASE_URL!, SUPABASE_ANON!);
}

export function LoginForm() {
  const [show, setShow] = useState(false);
  const [status, setStatus] = useState<{ kind: 'idle' | 'loading' | 'error' | 'info'; message?: string }>({ kind: 'idle' });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, submitCount },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema), mode: 'onTouched' });

  const onSubmit = handleSubmit(async ({ email, password }) => {
    if (!PORTAL_CONFIGURED) {
      setStatus({ kind: 'info', message: 'The SACPL client portal is not yet available online. Please contact your SACPL project lead for project documents.' });
      return;
    }
    setStatus({ kind: 'loading' });
    try {
      const sb = await client();
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) {
        setStatus({ kind: 'error', message: error.status === 400 ? 'The email or password is incorrect.' : 'Sign-in failed. Please try again.' });
        return;
      }
      window.location.assign(PORTAL_URL!);
    } catch {
      setStatus({ kind: 'error', message: 'We could not reach the sign-in service. Please try again shortly.' });
    }
  });

  const forgot = async () => {
    const email = getValues('email');
    if (!PORTAL_CONFIGURED) {
      setStatus({ kind: 'info', message: 'Password reset will be available once the client portal is live. Contact your SACPL project lead in the meantime.' });
      return;
    }
    if (!loginSchema.shape.email.safeParse(email).success) {
      setStatus({ kind: 'error', message: 'Enter your account email above, then choose “Forgot password?” again.' });
      return;
    }
    setStatus({ kind: 'loading' });
    const sb = await client();
    await sb.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/login` });
    setStatus({ kind: 'info', message: 'If an account exists for that email, a reset link is on its way.' });
  };

  const summary = Object.entries(errors).map(([name, e]) => ({ name, label: name === 'email' ? 'Email' : 'Password', message: e?.message }));

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-6">
      {!PORTAL_CONFIGURED && (
        <div className="flex gap-3 border border-dashed border-ink/25 bg-paper-2 p-4 text-sm text-graphite">
          <Info aria-hidden className="mt-0.5 size-4 shrink-0 text-navy" />
          <p>
            <strong className="font-medium">Client portal coming soon.</strong> Sign-in is not yet connected to an SACPL account service, so no credentials are checked or stored here.
          </p>
        </div>
      )}
      {submitCount > 0 && status.kind !== 'info' && <ErrorSummary errors={summary} message={status.kind === 'error' ? status.message : undefined} />}
      {status.kind === 'info' && (
        <p role="status" className="border-l-2 border-navy bg-navy/5 p-4 text-sm text-graphite">
          {status.message}
        </p>
      )}

      <TextField label="Email" type="email" required autoComplete="username" error={errors.email?.message} {...register('email')} />

      <div className="relative">
        <TextField label="Password" type={show ? 'text' : 'password'} required autoComplete="current-password" style={{ paddingRight: '3rem' }} error={errors.password?.message} {...register('password')} />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute top-8 right-1 inline-flex size-11 items-center justify-center text-steel hover:text-ink"
          aria-label={show ? 'Hide password' : 'Show password'}
          aria-pressed={show}
        >
          {show ? <EyeOff aria-hidden className="size-4" /> : <Eye aria-hidden className="size-4" />}
        </button>
      </div>

      <div className="flex items-center justify-between">
        <button type="button" onClick={forgot} className="inline-flex min-h-11 items-center text-sm text-navy underline-offset-4 hover:underline">
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={status.kind === 'loading'}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-ink px-6 text-sm font-medium text-white transition-colors hover:bg-navy disabled:cursor-wait disabled:opacity-70"
      >
        {status.kind === 'loading' ? <Loader2 aria-hidden className="size-4 animate-spin" /> : <Lock aria-hidden className="size-4" />}
        {status.kind === 'loading' ? 'Signing in…' : 'Secure sign-in'}
      </button>
    </form>
  );
}
