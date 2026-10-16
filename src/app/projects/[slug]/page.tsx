import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ProjectGallery } from '@/components/projects/ProjectGallery';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { CtaBand } from '@/components/sections/CtaBand';
import { DimensionLine } from '@/components/ui/Annotation';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { JsonLd } from '@/components/seo/JsonLd';
import { categoryLabels } from '@/content/categories';
import { articles } from '@/content/articles';
import { recognitions } from '@/content/company';
import { startProjectHref } from '@/content/navigation';
import { getProject, getProjects, getRelatedProjects } from '@/lib/repository';
import { publishable } from '@/lib/verification';
import { pageMetadata, projectJsonLd } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProject((await params).slug);
  if (!p) return {};
  const bits = [categoryLabels[p.category], p.location, p.height, p.area].filter(Boolean).join(' · ');
  return pageMetadata({
    title: `${p.name}${p.location ? `, ${p.location}` : ''} — Structural Engineering`,
    description: `${p.name}: ${bits}. Structural engineering by SACPL${p.client ? ` for ${p.client}` : ''}.`,
    path: `/projects/${p.slug}`,
    image: p.images[0]?.src,
  });
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();
  const related = await getRelatedProjects(project);
  const hero = project.images[0];
  const relatedArticles = articles.filter((a) => a.relatedProjects.includes(project.slug));
  const awards = publishable(recognitions).filter((r) => r.project === project.slug);

  const facts: [string, string | undefined][] = [
    ['Location', project.location],
    ['Country', project.country],
    ['Client', project.client],
    ['Architect', project.architect ?? (project.inHouseArchitecture ? 'SACPL' : undefined)],
    ['Sector', categoryLabels[project.category]],
    ['Height / configuration', project.height],
    ['Area', project.area],
    ['Structural system', project.structuralSystem],
    ['Scope', project.scope],
    ['Status', project.status === 'ongoing' ? 'Under construction' : project.status === 'completed' ? 'Completed' : undefined],
    ['Bid outcome', project.bidOutcome === 'won' ? 'Won' : project.bidOutcome === 'lost' ? 'Not awarded' : undefined],
  ];
  const shown = facts.filter((f): f is [string, string] => !!f[1]);

  return (
    <>
      <article>
        <header className="relative isolate min-h-[78svh] overflow-hidden bg-ink text-white">
          {hero && <Image src={hero.src} alt={hero.alt} fill priority sizes="100vw" className="-z-10 object-cover" />}
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
          <div aria-hidden className="bg-blueprint-dark absolute inset-0 -z-10 opacity-40" />
          <div className="container-x page-enter pt-36 pb-16 lg:pt-[28svh] lg:pb-20">
            <Breadcrumbs
              items={[
                { name: 'Projects', path: '/projects' },
                { name: project.name, path: `/projects/${project.slug}` },
              ]}
            />
            <p className="eyebrow mt-10 flex flex-wrap items-center gap-3 text-white/70">
              <span aria-hidden className="h-px w-8 bg-signal" />
              {categoryLabels[project.category]}
              {project.international && <span className="text-navy-light">· International</span>}
            </p>
            <h1 className="mt-5 max-w-5xl font-display text-display-lg font-semibold">{project.name}</h1>
            {project.location && <p className="mt-4 text-xl text-white/75">{project.location}</p>}
            {(project.height || project.area) && (
              <dl className="mt-10 flex flex-wrap gap-x-12 gap-y-6">
                {project.height && (
                  <div>
                    <dt className="font-mono text-[10px] tracking-[0.18em] text-white/50 uppercase">Height / configuration</dt>
                    <dd className="mt-1 font-display text-2xl font-semibold">{project.height}</dd>
                  </div>
                )}
                {project.area && (
                  <div>
                    <dt className="font-mono text-[10px] tracking-[0.18em] text-white/50 uppercase">Area</dt>
                    <dd className="mt-1 font-display text-2xl font-semibold">{project.area}</dd>
                  </div>
                )}
              </dl>
            )}
          </div>
        </header>

        <section aria-labelledby="overview-title" className="bg-blueprint">
          <div className="container-x grid gap-14 py-20 lg:grid-cols-12 lg:py-28">
            <div className="lg:col-span-7">
              <h2 id="overview-title" className="font-display text-display-md font-semibold">Project overview</h2>
              <DimensionLine className="mt-8 max-w-sm" label="Data sheet" />
              {project.summary ? (
                <Reveal>
                  <div className="prose-sacpl mt-8 max-w-2xl">
                    {project.summary.split('\n').map((l) => (
                      <p key={l}>{l}</p>
                    ))}
                  </div>
                </Reveal>
              ) : (
                <p className="mt-8 max-w-2xl text-lg leading-relaxed text-graphite/80">
                  SACPL provided structural engineering for {project.name}
                  {project.location ? `, ${project.location}` : ''}
                  {project.client ? `, for ${project.client}` : ''}. Contact us to discuss this project or comparable work.
                </p>
              )}
              {project.specs && (
                <div className="mt-10">
                  <h3 className="font-mono text-[11px] tracking-[0.16em] text-steel uppercase">Project figures</h3>
                  <dl className="mt-4 grid max-w-2xl gap-px bg-ink/10 sm:grid-cols-2">
                    {project.specs.map((s) => (
                      <div key={s.label} className="bg-paper p-5">
                        <dt className="text-sm text-steel">{s.label}</dt>
                        <dd className="mt-1 font-display text-xl font-semibold">{s.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
              {project.challenge && (
                <div className="mt-12">
                  <h3 className="font-display text-2xl font-semibold">Engineering challenge</h3>
                  <p className="mt-4 max-w-2xl leading-relaxed text-graphite/85">{project.challenge}</p>
                </div>
              )}
              {project.solution && (
                <div className="mt-10">
                  <h3 className="font-display text-2xl font-semibold">SACPL’s solution</h3>
                  <p className="mt-4 max-w-2xl leading-relaxed text-graphite/85">{project.solution}</p>
                </div>
              )}
              {awards.length > 0 && (
                <div className="mt-12 border-l-2 border-signal pl-6">
                  <h3 className="font-mono text-[11px] tracking-[0.16em] text-steel uppercase">Recognition</h3>
                  <ul className="mt-3 space-y-3">
                    {awards.map((a) => (
                      <li key={a.id}>
                        <p className="font-display text-lg font-semibold">{a.title}</p>
                        <p className="text-sm text-steel">{a.issuer}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <aside className="lg:col-span-4 lg:col-start-9" aria-label="Project data">
              <dl className="border border-ink/10 bg-white">
                {shown.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[9rem_1fr] gap-4 border-b border-ink/8 px-6 py-4 last:border-0">
                    <dt className="font-mono text-[10px] tracking-[0.14em] text-steel uppercase">{k}</dt>
                    <dd className="text-sm text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex flex-col gap-3">
                <Button href={startProjectHref} className="justify-between">Enquire about a similar project</Button>
                <Button href={`/projects?category=${project.category}`} variant="secondary" className="justify-between">
                  More {categoryLabels[project.category].toLowerCase()} projects
                </Button>
              </div>
              {relatedArticles.map((a) => (
                <Link key={a.slug} href={`/insights/${a.slug}`} className="mt-6 block border border-ink/10 bg-paper-2 p-6 hover:bg-white">
                  <span className="font-mono text-[10px] tracking-[0.16em] text-accent uppercase">Insight</span>
                  <span className="mt-2 block font-display text-lg font-semibold">{a.title}</span>
                </Link>
              ))}
            </aside>
          </div>
        </section>

        {project.images.length > 0 && (
          <section aria-labelledby="gallery-title" className="border-t border-ink/10">
            <div className="container-x py-20 lg:py-24">
              <h2 id="gallery-title" className="font-display text-3xl font-semibold">Gallery</h2>
              <div className="mt-10">
                <ProjectGallery images={project.images} title={project.name} />
              </div>
            </div>
          </section>
        )}
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-ink/10 bg-paper-2">
          <div className="container-x py-20 lg:py-28">
            <SectionHeader id="related-title" eyebrow="Related projects" title={`More ${categoryLabels[project.category].toLowerCase()}.`} action={<Button href="/projects" variant="ghost-dark">All projects</Button>} />
            <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <div className="container-x py-8">
        <Link href="/projects" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-navy hover:underline">
          <ArrowLeft aria-hidden className="size-4" /> Back to all projects
        </Link>
      </div>
      <CtaBand />
      <JsonLd data={projectJsonLd(project)} />
    </>
  );
}
