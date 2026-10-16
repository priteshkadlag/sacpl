import type { Metadata } from 'next';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { PendingBadge } from '@/components/ui/Annotation';
import { contacts, offices, socials } from '@/content/company';
import { publishable } from '@/lib/verification';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Contact SACPL — Start a Structural Engineering Project',
  description:
    'Contact SACPL’s Mumbai headquarters: 6th Floor, 106 B-Wing, Brij Bhoomi, Nehru Road, Mumbai 400057. Call +91 98672 00065 or email suresh.shriyan@sacpl.co to start a project.',
  path: '/contact',
});

export default function ContactPage() {
  const hq = offices.find((o) => o.headquarters)!;
  const others = publishable(offices).filter((o) => !o.headquarters);
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${hq.coordinates!.lat},${hq.coordinates!.lng}`;

  const methods = [
    { icon: Phone, label: 'Call us', text: 'Speak directly with our engineering team', value: contacts.primaryPhone.display, href: contacts.primaryPhone.href },
    { icon: Mail, label: 'Email us', text: 'Send your project details and requirements', value: contacts.businessEmails[0], href: `mailto:${contacts.businessEmails[0]}` },
    { icon: MapPin, label: 'Visit the office', text: 'Mumbai headquarters', value: `${hq.addressLines[0]}, ${hq.locality}`, href: directions },
    { icon: Clock, label: 'Working hours', text: 'Indian Standard Time', value: contacts.hours },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Ready to start your next project?"
        intro={<p>Contact our team for consultation and fee proposals — or send your project details using the form below.</p>}
        crumbs={[{ name: 'Contact', path: '/contact' }]}
        coordinate="19.0975° N · 72.8498° E"
        size="md"
      />

      <section aria-labelledby="methods-title" className="border-b border-ink/10">
        <h2 id="methods-title" className="sr-only">Ways to contact SACPL</h2>
        <ul className="container-x grid gap-px bg-ink/10 py-px sm:grid-cols-2 lg:grid-cols-4">
          {methods.map((m) => {
            const body = (
              <>
                <m.icon aria-hidden className="size-5 text-accent" />
                <p className="mt-6 font-mono text-[11px] tracking-[0.16em] text-steel uppercase">{m.label}</p>
                <p className="mt-2 font-display text-lg font-semibold break-words">{m.value}</p>
                <p className="mt-1 text-sm text-steel">{m.text}</p>
              </>
            );
            return (
              <li key={m.label} className="bg-paper">
                {m.href ? (
                  <a href={m.href} {...(m.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="block h-full p-8 transition-colors hover:bg-white">
                    {body}
                  </a>
                ) : (
                  <div className="h-full p-8">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section id="enquiry" aria-labelledby="enquiry-title" className="bg-blueprint scroll-mt-24">
        <div className="container-x grid gap-14 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-4">
            <p className="eyebrow text-steel">Start your project</p>
            <h2 id="enquiry-title" className="mt-5 font-display text-display-md font-semibold">Project enquiry</h2>
            <p className="mt-5 leading-relaxed text-graphite/80">Tell us about the structure, its location and where the design is today. An SACPL engineer will review the details and reply by email.</p>
            <div className="mt-10 space-y-6 border-t border-ink/10 pt-8 text-sm">
              <div>
                <p className="font-mono text-[11px] tracking-[0.16em] text-steel uppercase">Business enquiries</p>
                <p className="mt-2">
                  {contacts.primaryPhone.label} — <a className="link-line inline-flex min-h-7 items-center" href={contacts.primaryPhone.href}>{contacts.primaryPhone.display}</a>
                </p>
                <p>
                  {contacts.secondaryPhone.label} — <a className="link-line inline-flex min-h-7 items-center" href={contacts.secondaryPhone.href}>{contacts.secondaryPhone.display}</a>
                </p>
                {contacts.businessEmails.map((e) => (
                  <p key={e}>
                    <a className="link-line inline-flex min-h-7 items-center" href={`mailto:${e}`}>{e}</a>
                  </p>
                ))}
              </div>
              <div>
                <p className="font-mono text-[11px] tracking-[0.16em] text-steel uppercase">Careers</p>
                <p className="mt-2">
                  <a className="link-line inline-flex min-h-7 items-center" href={`mailto:${contacts.careersEmail}`}>{contacts.careersEmail}</a>
                </p>
              </div>
              <div>
                <p className="font-mono text-[11px] tracking-[0.16em] text-steel uppercase">Follow</p>
                <ul className="mt-2 flex gap-4">
                  {socials.map((s) => (
                    <li key={s.name}>
                      <a className="link-line inline-flex min-h-11 items-center" href={s.href} target="_blank" rel="noopener noreferrer">
                        {s.name}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <EnquiryForm />
          </div>
        </div>
      </section>

      <section aria-labelledby="map-title" className="bg-ink text-white">
        <div className="container-x grid gap-10 py-20 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-4">
            <p className="eyebrow text-white/50">Find our office</p>
            <h2 id="map-title" className="mt-5 font-display text-3xl font-semibold">{hq.name}</h2>
            <address className="mt-5 leading-relaxed text-white/75 not-italic">
              {hq.addressLines.map((l) => (
                <span key={l} className="block">{l}</span>
              ))}
              <span className="block">
                {hq.locality}, {hq.region} {hq.postalCode}
              </span>
              <span className="block">{hq.country}</span>
            </address>
            <a href={directions} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-12 items-center bg-white px-6 text-sm font-medium text-ink hover:bg-paper">
              Get directions<span className="sr-only"> (opens Google Maps in a new tab)</span>
            </a>
            {others.length > 0 && (
              <div className="mt-12 space-y-6 border-t border-white/10 pt-8">
                {others.map((o) => (
                  <div key={o.id}>
                    <p className="flex flex-wrap items-center gap-2 font-medium">
                      {o.name} {o.verification === 'pending' && <PendingBadge note={o.verificationNote} />}
                    </p>
                    <address className="mt-1 text-sm text-white/65 not-italic">
                      {o.addressLines.join(', ')}, {o.locality}, {o.region} {o.postalCode}
                    </address>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="relative aspect-[4/3] bg-graphite lg:col-span-8 lg:aspect-auto lg:min-h-[28rem]">
            <iframe
              src={hq.mapEmbed}
              title="Map showing SACPL’s Mumbai headquarters at Brij Bhoomi, Nehru Road"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full grayscale-[60%]"
            />
          </div>
        </div>
      </section>
    </>
  );
}
