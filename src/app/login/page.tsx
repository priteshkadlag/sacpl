import type { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { LoginForm } from '@/components/forms/LoginForm';
import { contacts } from '@/content/company';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Client Login',
  description: 'Sign in to the SACPL client portal.',
  path: '/login',
  noindex: true,
});

export default function LoginPage() {
  return (
    <section className="bg-blueprint-dark relative min-h-dvh bg-ink pt-[var(--header-h)]">
      <div className="container-x grid min-h-[calc(100dvh-var(--header-h))] items-center gap-14 py-16 lg:grid-cols-2">
        <div className="hidden text-white lg:block" aria-hidden>
          <p className="eyebrow text-white/50">Client portal</p>
          <p className="mt-5 font-display text-display-lg font-semibold">Welcome back.</p>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">Sign in to access your SACPL project information.</p>
        </div>
        <div className="mx-auto w-full max-w-md bg-paper p-8 shadow-2xl sm:p-10">
          <Logo className="h-9" />
          <h1 className="mt-8 font-display text-2xl font-semibold lg:sr-only">Welcome back</h1>
          <p className="mt-2 text-sm text-steel lg:mt-8">Sign in to your account</p>
          <div className="mt-8">
            <LoginForm />
          </div>
          <p className="mt-8 border-t border-ink/10 pt-6 text-sm text-steel">
            Need access? Contact your SACPL project lead or{' '}
            <a href={`mailto:${contacts.businessEmails[0]}`} className="text-navy underline underline-offset-2">
              {contacts.businessEmails[0]}
            </a>
            . <Link href="/" className="text-navy underline underline-offset-2">Return home</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
