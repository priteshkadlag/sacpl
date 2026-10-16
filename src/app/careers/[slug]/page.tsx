import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Briefcase, Calendar, Clock, MapPin } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ApplicationForm } from '@/components/forms/ApplicationForm';
import { JobCard } from '@/components/careers/JobCard';
import { JsonLd } from '@/components/seo/JsonLd';
import { contacts } from '@/content/company';
import { getJob, getJobs } from '@/lib/repository';
import { formatDate } from '@/lib/utils';
import { jobPostingJsonLd, pageMetadata } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

const typeLabel = { FULL_TIME: 'Full-time', PART_TIME: 'Part-time', INTERNSHIP: 'Internship', CONTRACTOR: 'Contract' } as const;

export async function generateStaticParams() {
  return (await getJobs()).map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const j = await getJob((await params).slug);
  if (!j) return {};
  return pageMetadata({
    title: `${j.title} — ${j.location}`,
    description: `${j.status === 'closed' ? '[Closed] ' : ''}${j.title} at SACPL (${j.department}), ${j.location}.${j.experience ? ` Experience: ${j.experience}.` : ''} View responsibilities and apply online.`,
    path: `/careers/${j.slug}`,
    noindex: j.status === 'closed',
  });
}

export default async function JobPage({ params }: Props) {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) notFound();
  const open = await getJobs('open');
  const others = open.filter((j) => j.slug !== slug).slice(0, 3);

  const meta = [
    { icon: MapPin, label: 'Location', value: job.location },
    job.workMode && { icon: Briefcase, label: 'Work arrangement', value: job.workMode },
    { icon: Clock, label: 'Employment type', value: typeLabel[job.employmentType] },
    job.experience && { icon: Briefcase, label: 'Experience', value: job.experience },
    { icon: Calendar, label: 'Posted', value: formatDate(job.publishedAt) },
    job.closingDate && { icon: Calendar, label: job.status === 'closed' ? 'Closed' : 'Closing date', value: formatDate(job.closingDate) },
  ].filter(Boolean) as { icon: typeof MapPin; label: string; value: string }[];

  return (
    <>
      <article>
        <header className="bg-blueprint-dark bg-ink pt-36 pb-16 text-white lg:pt-44">
          <div className="container-x page-enter">
            <Breadcrumbs
              items={[
                { name: 'Careers', path: '/careers' },
                { name: job.title, path: `/careers/${job.slug}` },
              ]}
            />
            <p className="eyebrow mt-10 flex items-center gap-3 text-white/60">
              <span aria-hidden className="h-px w-8 bg-signal" />
              {job.department}
            </p>
            <h1 className="mt-5 max-w-4xl font-display text-display-lg font-semibold">{job.title}</h1>
            {job.status === 'closed' && (
              <p role="note" className="mt-6 inline-block bg-signal-dark px-4 py-2 text-sm font-medium">
                This position is closed and no longer accepting applications.
              </p>
            )}
            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-5">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] text-white/60 uppercase">
                    <m.icon aria-hidden className="size-3.5" />
                    {m.label}
                  </dt>
                  <dd className="mt-1 text-[0.95rem]">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <div className="container-x grid gap-14 py-16 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-7">
            {job.summary && <p className="mb-10 text-lg leading-relaxed text-graphite">{job.summary}</p>}
            <h2 className="font-display text-2xl font-semibold">Responsibilities</h2>
            <div className="prose-sacpl mt-6">
              {job.responsibilities.map((section, i) => (
                <div key={i}>
                  {section.heading && <h3>{section.heading}</h3>}
                  <ul>
                    {section.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {job.qualifications.length > 0 && (
              <>
                <h2 className="mt-14 font-display text-2xl font-semibold">Qualifications</h2>
                <ul className="prose-sacpl mt-6">
                  {job.qualifications.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
              </>
            )}
            {job.notes?.map((n) => (
              <p key={n} className="mt-8 text-sm text-steel">
                {n}
              </p>
            ))}
          </div>
          <aside className="lg:col-span-4 lg:col-start-9" aria-label="Role summary">
            <div className="space-y-6 lg:sticky lg:top-28">
              {job.software.length > 0 && (
                <div className="border border-ink/10 bg-white p-6">
                  <h2 className="font-mono text-[11px] tracking-[0.16em] text-steel uppercase">Software skills</h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {job.software.map((s) => (
                      <li key={s} className="bg-paper-2 px-3 py-1.5 font-mono text-xs">{s}</li>
                    ))}
                  </ul>
                </div>
              )}
              {job.status === 'open' ? (
                <a href="#apply" className="flex min-h-14 items-center justify-center bg-ink px-6 text-sm font-medium text-white hover:bg-navy">
                  Apply for this role
                </a>
              ) : (
                <Link href="/careers#open-positions" className="flex min-h-14 items-center justify-center bg-ink px-6 text-sm font-medium text-white hover:bg-navy">
                  See open positions
                </Link>
              )}
              <p className="text-sm text-steel">
                Questions? Email{' '}
                <a href={`mailto:${contacts.careersEmail}`} className="text-navy underline underline-offset-2">
                  {contacts.careersEmail}
                </a>
              </p>
            </div>
          </aside>
        </div>
      </article>

      {job.status === 'open' && (
        <section id="apply" aria-labelledby="apply-title" className="scroll-mt-24 bg-paper-2">
          <div className="container-x grid gap-14 py-20 lg:grid-cols-12 lg:py-24">
            <div className="lg:col-span-4">
              <h2 id="apply-title" className="font-display text-display-md font-semibold">Apply for {job.title}.</h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6">
              <ApplicationForm positions={[...open.map((j) => j.title), 'General application']} defaultPosition={job.title} />
            </div>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section aria-labelledby="other-roles" className="border-t border-ink/10">
          <div className="container-x py-20">
            <h2 id="other-roles" className="font-display text-3xl font-semibold">Other open roles</h2>
            <div className="mt-8 border-b border-ink/12">
              {others.map((j) => (
                <JobCard key={j.slug} job={j} />
              ))}
            </div>
            <Link href="/careers" className="mt-10 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-navy hover:underline">
              <ArrowLeft aria-hidden className="size-4" /> All careers
            </Link>
          </div>
        </section>
      )}
      <JsonLd data={jobPostingJsonLd(job)} />
    </>
  );
}
