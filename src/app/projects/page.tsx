import type { Metadata } from 'next';
import { Suspense } from 'react';
import { PageHero } from '@/components/layout/PageHero';
import { ProjectExplorer } from '@/components/projects/ProjectExplorer';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { CtaBand } from '@/components/sections/CtaBand';
import { getProjects } from '@/lib/repository';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Projects — Structural Engineering Portfolio',
  description:
    'Explore SACPL’s structural engineering portfolio: tall structures, residential, commercial, institutional, hospitality, healthcare, industrial, sports and public projects in India and internationally.',
  path: '/projects',
  image: '/media/projects/prince-aga-khan.webp',
});

export default async function ProjectsPage() {
  const all = await getProjects();
  const countries = new Set(all.map((p) => p.country)).size;
  // Send the browser only what cards and filters need (keeps the RSC payload small).
  const projects = all.map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
    status: p.status,
    location: p.location,
    country: p.country,
    international: p.international,
    client: p.client,
    architect: p.architect,
    area: p.area,
    height: p.height,
    images: p.images.slice(0, 1),
  }));

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="A portfolio measured in structures."
        intro={
          <p>
            {projects.length} published projects across {countries} countries — filter by sector or status, or search by name, city or client.
          </p>
        }
        crumbs={[{ name: 'Projects', path: '/projects' }]}
        image={{ src: '/media/projects/prince-aga-khan.webp', alt: 'Prince Aga Khan tower, Mazgaon' }}
        coordinate="ELEVATION — NORTH"
        size="md"
      />
      <section aria-labelledby="portfolio-title" className="pb-24 lg:pb-32">
        <div className="container-x">
          <h2 id="portfolio-title" className="sr-only">
            Project portfolio
          </h2>
          <Suspense
            fallback={
              <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {projects.slice(0, 24).map((p, i) => (
                  <li key={p.slug}>
                    <ProjectCard project={p} priority={i < 3} />
                  </li>
                ))}
              </ul>
            }
          >
            <ProjectExplorer projects={projects} />
          </Suspense>
        </div>
      </section>
      <CtaBand title="Have a structure in mind?" />
    </>
  );
}
