import Link from 'next/link';
import { ArrowUpRight, FileText } from 'lucide-react';
import { company, contacts, offices, socials } from '@/content/company';
import { mainNav, startProjectHref } from '@/content/navigation';
import { services } from '@/content/services';
import { isPublishable } from '@/lib/verification';
import { Logo } from '@/components/ui/Logo';
import { PendingBadge } from '@/components/ui/Annotation';

export function Footer() {
  const year = new Date().getFullYear();
  const visibleOffices = offices.filter(isPublishable);

  return (
    <footer className="bg-blueprint-dark relative bg-ink text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Site footer</h2>

      <div className="container-x border-b border-white/10 py-16 lg:py-20">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow text-white/50">Start a conversation</p>
            <p className="mt-4 font-display text-display-md font-semibold">Have a structure to engineer? Talk to an SACPL engineer.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={startProjectHref} className="inline-flex min-h-12 items-center gap-2 bg-white px-6 text-sm font-medium text-ink transition-colors hover:bg-paper">
              Start a Project <ArrowUpRight aria-hidden className="size-4" />
            </Link>
            <a href={contacts.primaryPhone.href} className="inline-flex min-h-12 items-center px-6 text-sm font-medium ring-1 ring-white/30 hover:ring-white">
              {contacts.primaryPhone.display}
            </a>
          </div>
        </div>
      </div>

      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/65">{company.legalName}. Structural engineering, design consulting, peer review and BIM services.</p>
          <dl className="mt-6 space-y-1 font-mono text-xs text-white/50">
            <div className="flex gap-2">
              <dt>GSTIN</dt>
              <dd>{company.gstin}</dd>
            </div>
          </dl>
          <a href={company.gstCertificate} className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm text-white/75 hover:text-white" target="_blank" rel="noopener">
            <FileText aria-hidden className="size-4" /> GST registration certificate (PDF)
          </a>
          {company.companyProfilePdf && (
            <a href={company.companyProfilePdf} download className="flex min-h-11 items-center gap-2 text-sm text-white/75 hover:text-white">
              <FileText aria-hidden className="size-4" /> Company profile (PDF)
            </a>
          )}
        </div>

        <nav aria-label="Footer — site" className="lg:col-span-2">
          <p className="eyebrow text-white/45">Company</p>
          <ul className="mt-5 space-y-1">
            {mainNav.map((i) => (
              <li key={i.href}>
                <Link href={i.href} className="link-line inline-flex min-h-9 items-center text-sm text-white/80 hover:text-white">
                  {i.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/login" className="link-line inline-flex min-h-9 items-center text-sm text-white/80 hover:text-white">
                Client Login
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Footer — expertise" className="lg:col-span-3">
          <p className="eyebrow text-white/45">Expertise</p>
          <ul className="mt-5 space-y-1">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/expertise/${s.slug}`} className="link-line inline-flex min-h-9 items-center text-sm text-white/80 hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <p className="eyebrow text-white/45">Offices</p>
          <ul className="mt-5 space-y-6">
            {visibleOffices.map((o) => (
              <li key={o.id}>
                <address className="text-sm leading-relaxed text-white/75 not-italic">
                  <span className="flex flex-wrap items-center gap-2 font-medium text-white">
                    {o.name}
                    {o.verification === 'pending' && <PendingBadge note={o.verificationNote} />}
                  </span>
                  {o.addressLines.map((l) => (
                    <span key={l} className="block">{l}</span>
                  ))}
                  <span className="block">
                    {o.locality}, {o.region} {o.postalCode}
                  </span>
                </address>
              </li>
            ))}
          </ul>
          <div className="mt-8 space-y-1 text-sm">
            <p className="eyebrow mb-3 text-white/45">Business enquiries</p>
            {contacts.businessEmails.map((e) => (
              <a key={e} href={`mailto:${e}`} className="link-line block w-fit py-1 text-white/80 hover:text-white">{e}</a>
            ))}
            <a href={contacts.primaryPhone.href} className="link-line block w-fit py-1 text-white/80 hover:text-white">
              {contacts.primaryPhone.label} — {contacts.primaryPhone.display}
            </a>
            <a href={contacts.secondaryPhone.href} className="link-line block w-fit py-1 text-white/80 hover:text-white">
              {contacts.secondaryPhone.label} — {contacts.secondaryPhone.display}
            </a>
            <p className="eyebrow mt-6 mb-3 text-white/45">Careers</p>
            <a href={`mailto:${contacts.careersEmail}`} className="link-line block w-fit py-1 text-white/80 hover:text-white">{contacts.careersEmail}</a>
          </div>
        </div>
      </div>

      <div className="container-x flex flex-col gap-4 border-t border-white/10 py-8 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
        <p>© {year} {company.legalName}. All rights reserved.</p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2" aria-label="Social and legal">
          {socials.map((s) => (
            <li key={s.name}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 hover:text-white">
                {s.name} <ArrowUpRight aria-hidden className="size-3" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
          <li><Link href="/privacy" className="inline-flex min-h-11 items-center hover:text-white">Privacy Policy</Link></li>
          <li><Link href="/terms" className="inline-flex min-h-11 items-center hover:text-white">Terms of Use</Link></li>
        </ul>
      </div>
    </footer>
  );
}
