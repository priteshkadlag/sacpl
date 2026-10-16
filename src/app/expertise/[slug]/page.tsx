import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { Reveal } from '@/components/motion/Reveal';
import { JsonLd } from '@/components/seo/JsonLd';
import { FilmPlayer } from '@/components/media/FilmPlayer';
import { film } from '@/content/company';
import { serviceOptions } from '@/lib/forms';
import { getProjectsBySlugs, getService, getServices } from '@/lib/repository';
import { pageMetadata, serviceJsonLd } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getServices()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = await getService((await params).slug);
  if (!s) return {};
  return pageMetadata({ title: `${s.title} Services`, description: s.summary, path: `/expertise/${s.slug}`, image: s.image.src });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();
  const [all, related] = await Promise.all([getServices(), getProjectsBySlugs(service.relatedProjects)]);
  const idx = all.findIndex((s) => s.slug === slug);
  const prev = all[(idx - 1 + all.length) % all.length];
  const next = all[(idx + 1) % all.length];
  const formService = (serviceOptions as readonly string[]).includes(service.title) ? (service.title as (typeof serviceOptions)[number]) : undefined;

  return (
    <>
      <PageHero
        eyebrow={`Expertise ${service.number}`}
        title={service.title}
        intro={<p>{service.summary}</p>}
        crumbs={[
          { name: 'Expertise', path: '/expertise' },
          { name: service.title, path: `/expertise/${service.slug}` },
        ]}
        image={service.image}
        coordinate={`DETAIL ${service.number}`}
      />

      <section aria-labelledby="overview-title" className="bg-blueprint">
        <div className="container-x grid gap-14 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <h2 id="overview-title" className="sr-only">Overview</h2>
            <div className="prose-sacpl max-w-2xl text-lg">
              {service.description.map((p) => (
                <Reveal key={p}>
                  <p>{p}</p>
                </Reveal>
              ))}
            </div>
            <h3 className="mt-14 font-display text-2xl font-semibold">What this covers</h3>
            <ul className="prose-sacpl mt-6 max-w-2xl">
              {service.capabilities.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <aside className="space-y-10 lg:col-span-4 lg:col-start-9" aria-label="Service summary">
            <div className="border border-ink/10 bg-white p-8">
              <h3 className="font-mono text-[11px] tracking-[0.16em] text-steel uppercase">Typical deliverables</h3>
              <ul className="mt-5 space-y-3">
                {service.deliverables.map((d, i) => (
                  <li key={d} className="flex gap-4 border-t border-ink/8 pt-3 text-sm">
                    <span className="font-mono text-[10px] text-accent">{String(i + 1).padStart(2, '0')}</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>
            {service.tools && (
              <div className="border border-ink/10 bg-white p-8">
                <h3 className="font-mono text-[11px] tracking-[0.16em] text-steel uppercase">Software in use</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {service.tools.map((t) => (
                    <li key={t} className="bg-paper-2 px-3 py-1.5 font-mono text-xs">{t}</li>
                  ))}
                </ul>
                {service.toolsSource && <p className="mt-4 text-xs text-steel">{service.toolsSource}</p>}
              </div>
            )}
            <Link href="#enquiry" className="group flex min-h-14 items-center justify-between bg-ink px-6 text-sm font-medium text-white hover:bg-navy">
              Enquire about {service.shortTitle.toLowerCase()} <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </aside>
        </div>
      </section>

      {service.slug === 'bim-digital-engineering' && (
        <section aria-labelledby="film-title" className="bg-ink text-white">
          <div className="container-x py-20 lg:py-24">
            <h2 id="film-title" className="font-display text-3xl font-semibold">In the model: {film.title}</h2>
            <div className="mt-10">
              <FilmPlayer src={film.src} poster={film.poster} title={film.title} description={film.description} />
            </div>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-ink/10">
          <div className="container-x py-20 lg:py-28">
            <SectionHeader id="related-title" eyebrow="Related projects" title={`${service.shortTitle} in practice.`} />
            <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} sizes="(min-width: 1024px) 25vw, 50vw" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section id="enquiry" aria-labelledby="enquiry-title" className="scroll-mt-24 bg-paper-2">
        <div className="container-x grid gap-14 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-4">
            <p className="eyebrow text-steel">Enquiry</p>
            <h2 id="enquiry-title" className="mt-5 font-display text-display-md font-semibold">Tell us about your project.</h2>
            <p className="mt-5 leading-relaxed text-graphite/80">Share the essentials and an SACPL engineer will get back to you.</p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <EnquiryForm defaultService={formService} />
          </div>
        </div>
      </section>

      <nav aria-label="More expertise" className="border-t border-ink/10">
        <div className="container-x grid sm:grid-cols-2">
          <Link href={`/expertise/${prev.slug}`} className="group flex min-h-24 items-center gap-4 py-8 hover:text-navy sm:border-r sm:border-ink/10">
            <ArrowLeft aria-hidden className="size-5 transition-transform group-hover:-translate-x-1" />
            <span>
              <span className="block font-mono text-[10px] tracking-[0.16em] text-steel uppercase">Previous</span>
              <span className="font-display text-lg font-semibold">{prev.title}</span>
            </span>
          </Link>
          <Link href={`/expertise/${next.slug}`} className="group flex min-h-24 items-center justify-end gap-4 py-8 text-right hover:text-navy">
            <span>
              <span className="block font-mono text-[10px] tracking-[0.16em] text-steel uppercase">Next</span>
              <span className="font-display text-lg font-semibold">{next.title}</span>
            </span>
            <ArrowRight aria-hidden className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </nav>
      <JsonLd data={serviceJsonLd(service)} />
    </>
  );
}
