import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { StatsBand } from '@/components/sections/StatsBand';
import { Recognitions } from '@/components/sections/Recognitions';
import { CtaBand } from '@/components/sections/CtaBand';
import { Timeline } from '@/components/diagrams/Timeline';
import { Reveal, Stagger, RevealItem } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { BrandPeak } from '@/components/brand/BrandPeak';
import { PersonCard } from '@/components/people/PersonCard';
import { Eyebrow, PendingBadge } from '@/components/ui/Annotation';
import { awards, company, offices, timeline } from '@/content/company';
import { expertTeam, founder, leadership } from '@/content/people';
import { getServices } from '@/lib/repository';
import { publishable } from '@/lib/verification';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'About SACPL — Structural Engineering Consultancy, Mumbai',
  description:
    'The history, philosophy and capabilities of Shanghvi and Associates Consultants Private Limited (SACPL), a Mumbai-headquartered structural engineering consultancy working across India and internationally.',
  path: '/about',
});

const values = [
  { title: 'Client first', text: 'Client satisfaction is of utmost importance. We address each requirement in a unique and valued manner.' },
  { title: 'Experience applied', text: 'We use our accumulated experience and awareness of current design trends to achieve effective designs.' },
  { title: 'Innovation', text: 'We keep pushing the limits of innovation — in structural systems and in the tools we design with.' },
  { title: 'Growth through challenge', text: '“We compete with ourselves and challenge people to grow.”' },
];

export default async function AboutPage() {
  const services = (await getServices()).filter((s) => ['structural-engineering', 'design-consulting', 'project-management', 'bim-digital-engineering', 'peer-review-compliance'].includes(s.slug));
  const history = publishable(timeline).map((t) => ({ ...t, pending: t.verification === 'pending' }));
  const visibleOffices = publishable(offices);
  const founderStory = publishable(founder.story);
  const founderHighlights = publishable(founder.highlights);
  const leaders = publishable(leadership);
  const team = publishable(expertTeam);
  const visibleAwards = publishable(awards);

  return (
    <>
      <PageHero
        eyebrow="About SACPL"
        title="Designing landmarks, defining skylines."
        intro={
          <p>
            {company.displayName} is a structural engineering consultancy that turns architectural vision into safe, efficient and buildable structures — for developers, architects, institutions and
            public bodies in India and abroad.
          </p>
        }
        crumbs={[{ name: 'About', path: '/about' }]}
        image={{ src: '/media/projects/navi-mumbai-municipal-corporation-hq.webp', alt: 'Navi Mumbai Municipal Corporation Head Office' }}
        coordinate="SECTION A — A"
      />

      <nav aria-label="About page sections" className="sticky top-0 z-30 border-y border-ink/10 bg-paper/95 backdrop-blur">
        <div className="container-x flex gap-7 overflow-x-auto py-4 font-mono text-[11px] tracking-[0.12em] whitespace-nowrap uppercase">
          <a className="transition-colors hover:text-accent" href="#what-we-do">
            What We Do
          </a>
          <a className="transition-colors hover:text-accent" href="#our-founder">
            Our Founder
          </a>
          <a className="transition-colors hover:text-accent" href="#leadership">
            Leadership
          </a>
          <a className="transition-colors hover:text-accent" href="#expert-team">
            Expert Team
          </a>
          <a className="transition-colors hover:text-accent" href="#achievements">
            Achievements
          </a>
        </div>
      </nav>

      {/* Introduction & philosophy */}
      <section aria-labelledby="philosophy-title" className="bg-blueprint">
        <div className="container-x grid gap-14 py-24 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-5">
            <p className="eyebrow text-steel">Engineering philosophy</p>
            <h2 id="philosophy-title" className="mt-5 font-display text-display-md font-semibold">
              Where vision meets precision.
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-graphite lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p>
                Client satisfaction is of utmost importance to us, and we work towards client expectations by addressing each requirement in a unique and valued manner. We use our experience and
                awareness of the latest design trends to achieve effective designs for our clients, while pushing the limits of innovation.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-graphite/80">
                Team SACPL has made its mark across residential, commercial, industrial, retail, institutional, hospitality and healthcare sectors, both in India and internationally.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & values */}
      <section aria-labelledby="values-title" className="border-t border-ink/10">
        <div className="container-x py-24 lg:py-28">
          <SectionHeader id="values-title" index="01" eyebrow="Mission & values" title="How we work." />
          <Stagger className="mt-14 grid gap-px bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <RevealItem key={v.title} className="bg-paper p-8">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-6 font-display text-xl font-semibold">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite/80">{v.text}</p>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* History */}
      {history.length > 0 && (
        <section aria-labelledby="history-title" className="bg-paper-2">
          <div className="container-x py-24 lg:py-32">
            <SectionHeader
              id="history-title"
              index="02"
              eyebrow="History"
              title="Early adopters, by design."
              intro="SACPL has consistently adopted new engineering tools early — from in-house design software to BIM."
            />
            <div className="mt-16 max-w-4xl">
              <Timeline items={history} />
            </div>
          </div>
        </section>
      )}

      {/* Capabilities */}
      <section id="what-we-do" aria-labelledby="capabilities-title" className="scroll-mt-24 border-t border-ink/10">
        <div className="container-x py-24 lg:py-28">
          <SectionHeader
            id="capabilities-title"
            index="03"
            eyebrow="Capabilities"
            title="What we do."
            action={
              <Button href="/expertise" variant="ghost-dark">
                Explore expertise
              </Button>
            }
          />
          <ul className="mt-14 divide-y divide-ink/10 border-y border-ink/10">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/expertise/${s.slug}`} className="group grid gap-2 py-7 transition-colors hover:bg-white sm:grid-cols-12 sm:items-center sm:px-4">
                  <span className="font-mono text-xs text-accent sm:col-span-1">{s.number}</span>
                  <span className="font-display text-2xl font-semibold sm:col-span-4">{s.title}</span>
                  <span className="text-graphite/80 sm:col-span-6">{s.summary}</span>
                  <ArrowUpRight aria-hidden className="hidden size-5 justify-self-end transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 sm:col-span-1 sm:block" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Our Founder */}
      <section id="our-founder" aria-labelledby="founder-title" className="relative scroll-mt-24 overflow-hidden bg-paper-2">
        <BrandPeak variant="outline" className="pointer-events-none absolute -top-10 -left-20 hidden w-[22rem] text-navy/10 lg:block" />
        <div className="container-x relative grid gap-14 py-24 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-4">
            <Eyebrow index="04">Our Founder</Eyebrow>
            <h2 id="founder-title" className="mt-5 font-display text-display-md font-semibold">
              Our visionary <span className="text-navy">founder.</span>
            </h2>
            <figure className="mt-10 max-w-xs lg:sticky lg:top-28">
              <div className="relative">
                <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 bg-navy" />
                <div className="relative aspect-square overflow-hidden bg-navy-tint ring-1 ring-ink/10">
                  <Image src={founder.photo.src} alt={`Portrait of ${founder.name}`} fill sizes="(min-width: 1024px) 20rem, 80vw" className="object-cover object-top" />
                </div>
              </div>
              <figcaption className="mt-8">
                <p className="font-display text-2xl font-semibold">{founder.name}</p>
                <p className="mt-1 font-mono text-[11px] tracking-[0.14em] text-navy uppercase">{founder.role}</p>
              </figcaption>
            </figure>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ol className="divide-y divide-ink/10 border-y border-ink/10">
              {founderStory.map((block, i) => (
                <li key={block.title} className="grid gap-3 py-8 sm:grid-cols-[3rem_1fr]">
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="flex flex-wrap items-center gap-3 font-display text-xl font-semibold">
                      {block.title}
                      {block.verification === 'pending' && <PendingBadge note={'note' in block ? block.note : undefined} />}
                    </h3>
                    <p className="mt-3 leading-relaxed text-graphite/85">{block.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            {founderHighlights.length > 0 && (
              <dl className="mt-10 grid grid-cols-2 gap-px bg-ink/10 ring-1 ring-ink/10 sm:grid-cols-4">
                {founderHighlights.map((h) => (
                  <div key={h.label} className="bg-paper p-5">
                    <dt className="font-mono text-[10px] tracking-[0.16em] text-steel uppercase">{h.label}</dt>
                    <dd className="mt-3 font-display text-3xl font-semibold">{h.value}</dd>
                    {h.verification === 'pending' && <PendingBadge className="mt-3" note={h.note} />}
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" aria-labelledby="leadership-title" className="scroll-mt-24 border-t border-ink/10 bg-white">
        <div className="container-x py-24 lg:py-32">
          <SectionHeader
            id="leadership-title"
            index="05"
            eyebrow="Leadership"
            title={
              <>
                Our visionary <span className="text-navy">leaders.</span>
              </>
            }
            intro="Technical direction, business growth and regional offices — the people who lead SACPL."
          />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {leaders.map((p) => (
              <PersonCard key={p.name} person={p} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 92vw" />
            ))}
          </ul>
        </div>
      </section>

      {/* Expert Team */}
      <section id="expert-team" aria-labelledby="expert-team-title" className="relative isolate scroll-mt-24 overflow-hidden bg-navy-deep text-white">
        <div aria-hidden className="bg-blueprint-navy absolute inset-0 -z-10 opacity-70" />
        <div className="container-x py-24 lg:py-32">
          <SectionHeader
            id="expert-team-title"
            index="06"
            eyebrow="Expert Team"
            tone="light"
            title="Our expert team."
            intro="Design engineers, designers, quality-control and BIM specialists who carry each project from scheme to site."
          />
          <ul className="mt-14 grid grid-cols-2 gap-px bg-white/15 ring-1 ring-white/15 md:grid-cols-4 xl:grid-cols-6">
            {team.map((p) => (
              <PersonCard key={p.name} person={p} compact tone="light" sizes="(min-width: 1280px) 15vw, (min-width: 768px) 23vw, 46vw" />
            ))}
          </ul>
        </div>
      </section>

      {/* Presence */}
      <section aria-labelledby="presence-title" className="bg-blueprint-dark bg-ink text-white">
        <div className="container-x py-24 lg:py-28">
          <SectionHeader
            id="presence-title"
            index="07"
            eyebrow="Geographic presence"
            tone="light"
            title="Headquartered in Mumbai."
            intro="Our projects span India and international locations including the UAE, Qatar, Tanzania, the Maldives, Dominica and Nicaragua."
            action={
              <Button href="/projects?filter=international" variant="ghost-light">
                International projects
              </Button>
            }
          />
          <ul className="mt-14 grid gap-px bg-white/10 md:grid-cols-3">
            {visibleOffices.map((o) => (
              <li key={o.id} className="bg-ink p-8">
                <p className="flex flex-wrap items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-accent uppercase">
                  {o.headquarters ? 'Headquarters' : 'Office'}
                  {o.verification === 'pending' && <PendingBadge note={o.verificationNote} />}
                </p>
                <h3 className="mt-4 font-display text-xl font-semibold">{o.name}</h3>
                <address className="mt-3 text-sm leading-relaxed text-white/70 not-italic">
                  {o.addressLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                  <span className="block">
                    {o.locality}, {o.region} {o.postalCode}
                  </span>
                </address>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Achievements */}
      <section id="achievements" aria-labelledby="achievements-title" className="texture-concrete scroll-mt-24 bg-paper-2">
        <div className="container-x py-24 lg:py-32">
          <SectionHeader
            id="achievements-title"
            index="08"
            eyebrow="Achievements"
            title={
              <>
                Our <span className="text-navy">achievements.</span>
              </>
            }
            intro="Records and awards for structures engineered by SACPL, each shown with its certificate."
          />
          <div className="mt-14">
            <StatsBand tone="dark" />
          </div>
          <h3 className="mt-16 font-mono text-[11px] tracking-[0.16em] text-steel uppercase">Records</h3>
          <div className="mt-6">
            <Recognitions tone="dark" />
          </div>
          {visibleAwards.length > 0 && (
            <>
              <h3 className="mt-20 font-mono text-[11px] tracking-[0.16em] text-steel uppercase">Awards & commendations</h3>
              <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {visibleAwards.map((a) => (
                  <li key={a.id} className="group relative flex flex-col border border-ink/10 bg-white">
                    <a href={a.image.src} target="_blank" rel="noopener noreferrer" className="relative block aspect-[4/3] overflow-hidden bg-navy-tint">
                      <Image
                        src={a.image.src}
                        alt={a.image.alt}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                        className="object-contain p-4 transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                      <span className="sr-only"> — view full certificate (opens in a new tab)</span>
                    </a>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] text-navy uppercase">
                        <span className="bg-navy px-2 py-0.5 text-white">{a.year}</span>
                        {a.issuer}
                      </p>
                      <p className="mt-4 font-display text-xl font-semibold">{a.title}</p>
                      <p className="mt-1 text-sm font-medium text-ink">{a.project}</p>
                      <p className="mt-3 text-sm leading-relaxed text-graphite/80">{a.detail}</p>
                      {a.verification === 'pending' && <PendingBadge className="mt-4 self-start" note="The certificate does not name SACPL — confirm SACPL’s role." />}
                      {a.projectSlug && (
                        <Link href={`/projects/${a.projectSlug}`} className="link-line mt-auto w-fit pt-6 text-sm font-medium text-navy">
                          View project
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
