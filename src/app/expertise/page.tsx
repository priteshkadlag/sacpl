import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { CtaBand } from '@/components/sections/CtaBand';
import { LoadPathDiagram } from '@/components/diagrams/LoadPathDiagram';
import { MaskReveal, Reveal } from '@/components/motion/Reveal';
import { JsonLd } from '@/components/seo/JsonLd';
import { getServices } from '@/lib/repository';
import { pageMetadata, serviceJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Expertise — Structural Engineering, Peer Review, BIM & Consulting',
  description:
    'SACPL’s structural engineering services: structural design, design consulting, project management, BIM and digital engineering, cost consulting, peer review, quality assurance and value engineering.',
  path: '/expertise',
});

export default async function ExpertisePage() {
  const services = await getServices();
  return (
    <>
      <PageHero
        eyebrow="Expertise"
        title="One structural team, eight disciplines."
        intro="From the first structural scheme to independent review of the final drawings, SACPL covers the full structural scope of a project."
        crumbs={[{ name: 'Expertise', path: '/expertise' }]}
        coordinate="PLAN — LEVEL 00"
      >
        <nav aria-label="Expertise areas">
          <ul className="flex flex-wrap gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <a href={`#${s.slug}`} className="inline-flex min-h-11 items-center gap-2 px-4 text-sm ring-1 ring-white/25 transition hover:bg-white hover:text-ink">
                  <span className="font-mono text-[10px] text-accent">{s.number}</span>
                  {s.shortTitle}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="divide-y divide-ink/10">
        {services.map((s, i) => (
          <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-title`} className="scroll-mt-24">
            <div className="container-x grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
              <div className={`lg:col-span-5 ${i % 2 ? 'lg:order-2 lg:col-start-8' : ''}`}>
                <MaskReveal className="relative aspect-[4/5] bg-graphite">
                  <Image src={s.image.src} alt={s.image.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
                </MaskReveal>
              </div>
              <div className={`lg:col-span-6 ${i % 2 ? 'lg:order-1' : 'lg:col-start-7'}`}>
                <p className="font-mono text-xs text-accent">{s.number}</p>
                <h2 id={`${s.slug}-title`} className="mt-4 font-display text-display-md font-semibold">{s.title}</h2>
                <Reveal>
                  <p className="mt-6 text-lg leading-relaxed text-graphite">{s.summary}</p>
                </Reveal>
                <div className="mt-10 grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="font-mono text-[11px] tracking-[0.16em] text-steel uppercase">Capabilities</h3>
                    <ul className="prose-sacpl mt-4 text-[0.95rem]">
                      {s.capabilities.slice(0, 4).map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-mono text-[11px] tracking-[0.16em] text-steel uppercase">Typical deliverables</h3>
                    <ul className="prose-sacpl mt-4 text-[0.95rem]">
                      {s.deliverables.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <Link href={`/expertise/${s.slug}`} className="group mt-10 inline-flex min-h-12 items-center gap-3 bg-ink px-6 text-sm font-medium text-white hover:bg-navy">
                  {s.title} in detail <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section aria-labelledby="approach-title" className="bg-blueprint-navy bg-navy-ink text-white">
        <div className="container-x py-24 lg:py-32">
          <SectionHeader id="approach-title" index="—" eyebrow="Approach" tone="light" title="From grid to verified load path." />
          <div className="mt-16">
            <LoadPathDiagram />
          </div>
        </div>
      </section>

      <CtaBand title="Discuss your structure with an SACPL engineer." />
      <JsonLd data={services.map(serviceJsonLd)} />
    </>
  );
}
