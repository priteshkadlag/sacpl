import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { IntroSequence, introGateScript } from '@/components/home/IntroSequence';
import { HeroSlideshow } from '@/components/home/HeroSlideshow';
import { ExpertiseShowcase } from '@/components/home/ExpertiseShowcase';
import { ProjectMosaic } from '@/components/home/ProjectMosaic';
import { SectorIndex } from '@/components/home/SectorIndex';
import { BrandPeak } from '@/components/brand/BrandPeak';
import { Button } from '@/components/ui/Button';
import { DimensionLine, Eyebrow } from '@/components/ui/Annotation';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { StatsBand } from '@/components/sections/StatsBand';
import { Recognitions } from '@/components/sections/Recognitions';
import { CtaBand } from '@/components/sections/CtaBand';
import { Reveal, MaskReveal } from '@/components/motion/Reveal';
import { LogoRail } from '@/components/clients/LogoRail';
import { ArticleCard, ArticleMeta } from '@/components/insights/ArticleCard';
import { YouTubeEmbed } from '@/components/media/YouTubeEmbed';
import { FilmPlayer } from '@/components/media/FilmPlayer';
import { LoadPathDiagram } from '@/components/diagrams/LoadPathDiagram';
import { ReachMap } from '@/components/reach/ReachMap';
import { company, countries, film, youtubeCultureVideoId } from '@/content/company';
import { startProjectHref } from '@/content/navigation';
import { getArticles, getClients, getFeaturedProjects, getProjects, getServices } from '@/lib/repository';
import { isPublishable, publishable } from '@/lib/verification';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'SACPL — Structural Engineering for Tomorrow’s Landmarks',
  description:
    'Shanghvi and Associates Consultants Private Limited (SACPL) is a Mumbai-based structural engineering consultancy for tall buildings, institutional, hospitality, healthcare, industrial and sports projects in India and abroad.',
  path: '/',
});

const heroSlides = Array.from({ length: 8 }, (_, i) => ({
  src: `/media/hero/hero-${String(i + 1).padStart(2, '0')}.webp`,
  alt: 'Architectural visualisation of a project engineered by SACPL',
}));

const culture = [
  ['Team bonding & mutual support', 'We support each other through professional and personal challenges, and reject group-ism and discrimination.'],
  ['Professional growth', 'A professionally managed company that invests in its people, not just hires them.'],
  ['Computational engineering', 'We are embracing computational engineering — and expect new members to be excited by it.'],
  ['Learning & development', 'Continuous learning supported by our LMS. “We compete with ourselves and challenge people to grow.”'],
] as const;

export default async function HomePage() {
  const [services, featured, clients, articles, allProjects] = await Promise.all([getServices(), getFeaturedProjects(), getClients(), getArticles(), getProjects()]);
  const homeServices = services.filter((s) => s.onHomepage);
  const experienceKnown = isPublishable(company.foundingYear);
  const [leadArticle, ...moreArticles] = articles;
  // Counts are derived from the published records themselves, never from unverified claims.
  const practiceFacts: [string, string, string][] = [
    ['Headquarters', 'Mumbai', 'Maharashtra, India'],
    ['Expertise', String(services.length), 'structural disciplines'],
    ['Portfolio', String(allProjects.length), 'projects published online'],
    ['Reach', String(publishable(countries).length), 'countries with project records'],
  ];
  const railClients = clients.filter((c) => c.featured).concat(clients.filter((c) => !c.featured && c.region === 'national').slice(0, 10));

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: introGateScript }} />
      <IntroSequence />

      {/* 1 — Hero */}
      <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-white">
        <HeroSlideshow slides={heroSlides} />
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-navy-ink/95 via-ink/45 to-ink/45" />
        <div aria-hidden className="absolute inset-0 bg-linear-to-r from-navy-ink/95 via-navy-ink/70 via-45% to-ink/10" />
        <div aria-hidden className="absolute inset-0 bg-ink/55 lg:hidden" />
        <div aria-hidden className="bg-blueprint-dark absolute inset-0 opacity-60" />
        {/* structural annotations */}
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:[@media(min-height:860px)]:block">
          <div className="absolute top-0 bottom-0 left-[8%] w-px bg-white/10" />
          <div className="absolute top-0 right-[22%] bottom-0 w-px bg-white/10" />
          <div className="absolute top-[30%] right-0 left-0 h-px bg-white/10" />
          <span className="absolute top-[calc(30%+0.75rem)] right-[calc(22%+0.75rem)] font-mono text-[10px] tracking-[0.2em] text-white/45">19.0975° N · 72.8498° E — MUMBAI HQ</span>
          <span className="absolute top-[calc(30%-1.75rem)] left-[calc(8%+0.75rem)] font-mono text-[10px] tracking-[0.2em] text-white/45">GRID A / 01</span>
        </div>

        <div className="container-x relative z-10 pt-40 pb-28 lg:pb-32">
          <div className="max-w-5xl">
            <p className="eyebrow flex items-center gap-3 text-white/90 [text-shadow:0_2px_12px_rgb(0_0_0/0.65)]">
              <span aria-hidden className="h-px w-10 bg-signal" />
              Shanghvi and Associates Consultants Pvt. Ltd.
            </p>
            <h1 id="hero-title" className="mt-6 max-w-4xl font-display text-display-xl font-semibold [text-shadow:0_3px_24px_rgb(0_0_0/0.55)]">
              <span className="block overflow-hidden">
                <span className="page-enter block">Structural Engineering</span>
              </span>
              <span className="block overflow-hidden">
                <span className="page-enter block [animation-delay:120ms]">for Tomorrow’s Landmarks.</span>
              </span>
            </h1>
            <p className="page-enter mt-8 max-w-2xl text-lg leading-relaxed text-white/95 [animation-delay:240ms] [text-shadow:0_2px_12px_rgb(0_0_0/0.75)] sm:text-xl">
              Delivering innovative, sustainable and cost-conscious structural solutions for complex engineering challenges across India and beyond.
            </p>
            <div className="page-enter mt-10 flex flex-wrap gap-3 [animation-delay:360ms]">
              <Button href="/projects" variant="signal">
                Explore Projects
              </Button>
              <Button href={startProjectHref} variant="ghost-light">
                Start a Project
              </Button>
              {company.companyProfilePdf && (
                <Button href={company.companyProfilePdf} variant="ghost-light" icon="download" download>
                  Download Company Profile
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <SectorIndex projects={allProjects} />

      {/* 2 — Company introduction */}
      <section aria-labelledby="intro-title" className="relative overflow-hidden bg-paper">
        <BrandPeak variant="outline" className="pointer-events-none absolute top-20 right-[3%] hidden w-[17rem] text-navy/20 lg:block" />
        <div className="container-x relative py-24 lg:py-36">
          <Eyebrow index="01">The practice</Eyebrow>
          <h2 id="intro-title" className="mt-6 max-w-5xl font-display text-display-lg font-semibold">
            Engineers of structure, <span className="text-navy">partners to architects.</span>
          </h2>
          <div className="mt-16 grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <dl className="grid grid-cols-2 gap-px bg-ink/10 ring-1 ring-ink/10">
                {practiceFacts.map(([label, value, note], i) => (
                  <div key={label} className={i === 0 ? 'bg-navy p-6 text-white' : 'bg-paper p-6'}>
                    <dt className={`font-mono text-[10px] tracking-[0.16em] uppercase ${i === 0 ? 'text-white/75' : 'text-steel'}`}>{label}</dt>
                    <dd className="mt-6">
                      <span className="block font-display text-4xl font-semibold tracking-tight">{value}</span>
                      <span className={`mt-1 block text-sm ${i === 0 ? 'text-white/80' : 'text-graphite/80'}`}>{note}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <DimensionLine label="Mumbai · India · International" className="mt-8" />
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-graphite lg:col-span-6 lg:col-start-7">
              <Reveal>
                <p>
                  <strong className="font-semibold text-ink">SACPL — Shanghvi and Associates Consultants Private Limited</strong> is a structural engineering consultancy headquartered in Mumbai.
                  {experienceKnown && ' Since 1973 the practice has grown from a two-person team into a multidisciplinary structural engineering office.'}
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <p>
                  We translate architectural ambition into safe, efficient and buildable structural systems — tall residential and commercial towers, civic and institutional campuses, hotels,
                  hospitals, stadia and industrial facilities.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <blockquote className="border-l-2 border-navy pl-6 text-graphite/85">
                  Our philosophy is simple: address each client’s requirements on their own terms, apply what decades of practice have taught us, and keep pushing the limits of innovation — from early
                  computational design to today’s BIM and computational-engineering workflows.
                </blockquote>
              </Reveal>
              <Reveal delay={0.24} className="flex flex-wrap gap-3 pt-4">
                <Button href="/about">About SACPL</Button>
                {company.companyProfilePdf && (
                  <Button href={company.companyProfilePdf} variant="secondary" icon="download" download>
                    Company Profile
                  </Button>
                )}
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 3 — Expertise */}
      <section aria-labelledby="expertise-title" className="border-t border-ink/10 bg-white">
        <div className="container-x py-24 lg:py-32">
          <SectionHeader
            id="expertise-title"
            index="02"
            eyebrow="Expertise"
            title="Structural thinking across the whole project lifecycle."
            intro="Six disciplines, one team — from the first structural scheme to peer review of the last drawing."
            action={
              <Button href="/expertise" variant="ghost-dark">
                All expertise
              </Button>
            }
          />
          <ExpertiseShowcase
            items={homeServices.map(({ slug, number, title, summary, deliverables, image }) => ({
              slug,
              number,
              title,
              summary,
              deliverables,
              image,
            }))}
          />
        </div>
      </section>

      {/* Engineering story — load path, on blueprint blue */}
      <section aria-labelledby="loadpath-title" className="relative isolate overflow-hidden bg-navy-ink text-white">
        <div aria-hidden className="bg-blueprint-navy absolute inset-0 -z-10" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_0%,rgb(50_71_150/0.55),transparent_55%)]" />
        <div className="container-x py-24 lg:py-32">
          <SectionHeader
            id="loadpath-title"
            index="03"
            eyebrow="How we engineer"
            tone="light"
            title="Every load, traced to the ground."
            intro="The same discipline underpins every SACPL structure — a continuous, verified load path from roof to foundation."
          />
          <div className="mt-16">
            <LoadPathDiagram />
          </div>
        </div>
      </section>

      {/* 5 — Achievements */}
      <section aria-labelledby="achievements-title" className="texture-concrete bg-paper-2">
        <div className="container-x py-24 lg:py-32">
          <SectionHeader
            id="achievements-title"
            index="04"
            eyebrow="Achievements"
            title={
              <>
                Records set <span className="text-navy">in concrete.</span>
              </>
            }
            intro="Recognition for structures engineered by SACPL — each backed by its certificate or award."
          />
          <div className="mt-14">
            <StatsBand tone="dark" />
          </div>
          <div className="mt-14">
            <Recognitions tone="dark" />
          </div>
        </div>
      </section>

      {/* 6 — Featured projects */}
      <section aria-labelledby="featured-title" className="bg-paper">
        <div className="container-x py-24 lg:py-32">
          <SectionHeader
            id="featured-title"
            index="05"
            eyebrow="Featured projects"
            title="Tall structures, engineered."
            intro="A selection of towers from SACPL’s portfolio in India, the Gulf and East Africa."
            action={<Button href="/projects">View all projects</Button>}
          />
          <div className="mt-16">
            <ProjectMosaic projects={featured.slice(0, 8)} total={allProjects.length} />
          </div>

          <div className="relative isolate mt-4 grid gap-10 overflow-hidden bg-navy-ink p-6 text-white sm:p-10 lg:grid-cols-12 lg:items-center lg:p-14">
            <div aria-hidden className="bg-blueprint-navy absolute inset-0 -z-10" />
            <div className="lg:col-span-4">
              <Eyebrow tone="light">In the model</Eyebrow>
              <h3 className="mt-4 font-display text-3xl font-semibold">World Trade Centre, New Delhi — the sky bridge.</h3>
              <p className="mt-4 leading-relaxed text-white/75">
                A walkthrough of the structural model for the sky-bridge restaurant block: long-span steel trusses carried between the towers on balanced cantilevers from the central cores.
              </p>
              <Link href="/projects/world-trade-centre" className="link-line mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-white">
                View project <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
            <MaskReveal className="lg:col-span-8">
              <FilmPlayer src={film.src} poster={film.poster} title={film.title} description={film.description} />
            </MaskReveal>
          </div>
        </div>
      </section>

      {/* 7 — Global reach */}
      <section aria-labelledby="reach-title" className="relative isolate overflow-hidden bg-ink text-white">
        <div aria-hidden className="bg-blueprint-dark absolute inset-0 -z-10" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_60%,rgb(50_71_150/0.35),transparent_60%)]" />
        <div className="container-x py-24 lg:py-32">
          <SectionHeader
            id="reach-title"
            index="06"
            eyebrow="Global reach"
            tone="light"
            title="Building across continents."
            intro="Headquartered in Mumbai, SACPL has engineered structures for clients across India, the Gulf, East Africa, the Indian Ocean and the Caribbean. Countries below are shown where the portfolio records a project."
          />
          <div className="mt-14">
            <ReachMap />
          </div>
        </div>
      </section>

      {/* 8 — Clients */}
      <section aria-labelledby="clients-title" className="bg-paper">
        <div className="container-x py-24 lg:py-28">
          <SectionHeader
            id="clients-title"
            index="07"
            eyebrow="Clients"
            title={
              <>
                Trusted by developers, institutions <span className="text-navy">and public bodies.</span>
              </>
            }
            intro={`${clients.length} organisations in our client directory, in India and abroad.`}
            action={
              <Button href="/clients" variant="ghost-dark">
                Client directory
              </Button>
            }
          />
          <div className="mt-14">
            <LogoRail clients={railClients} />
          </div>
        </div>
      </section>

      {/* 9 — Insights: lead story + list */}
      <section aria-labelledby="insights-title" className="border-t border-ink/10 bg-white">
        <div className="container-x py-24 lg:py-32">
          <SectionHeader
            id="insights-title"
            index="08"
            eyebrow="Insights"
            title="Notes from the drawing board."
            intro="Project stories and engineering detail from SACPL’s recent work."
            action={
              <Button href="/insights" variant="ghost-dark">
                All insights
              </Button>
            }
          />
          {leadArticle && (
            <div className="mt-16 grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <ArticleCard article={leadArticle} large priority={false} />
              </div>
              <ol className="divide-y divide-ink/10 border-y border-ink/10 lg:col-span-5">
                {moreArticles.map((a, i) => (
                  <li key={a.slug} className="group relative flex gap-5 py-6">
                    <span className="font-mono text-xs text-navy">{String(i + 2).padStart(2, '0')}</span>
                    <div className="relative aspect-[4/3] w-28 shrink-0 overflow-hidden bg-graphite sm:w-36">
                      <Image src={a.image.src} alt="" fill sizes="144px" className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105" />
                    </div>
                    <div className="min-w-0">
                      <ArticleMeta article={a} />
                      <h3 className="mt-2 font-display text-lg leading-snug font-semibold">
                        <Link href={`/insights/${a.slug}`} className="after:absolute after:inset-0 group-hover:text-navy">
                          {a.title}
                        </Link>
                      </h3>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </section>

      {/* 10 — Careers */}
      <section aria-labelledby="careers-title" className="relative isolate overflow-hidden bg-navy-deep text-white">
        <div aria-hidden className="bg-blueprint-navy absolute inset-0 -z-10 opacity-70" />
        <div className="container-x grid gap-14 py-24 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-5">
            <Eyebrow index="09" tone="light">
              Careers
            </Eyebrow>
            <h2 id="careers-title" className="mt-5 font-display text-display-md font-semibold">
              We don’t simply hire engineers. We invest in them.
            </h2>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/careers" variant="light">
                Explore Careers
              </Button>
              <Button href="/careers#open-positions" variant="ghost-light">
                Open positions
              </Button>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:self-center">
            <YouTubeEmbed id={youtubeCultureVideoId} title="Life at SACPL — our culture" />
            <p className="mt-3 font-mono text-[11px] tracking-[0.12em] text-white/65 uppercase">Captions are requested automatically where YouTube provides them.</p>
          </div>
          <ul className="grid gap-px bg-white/15 ring-1 ring-white/15 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4">
            {culture.map(([t, d], i) => (
              <li key={t} className="bg-navy-deep p-6 lg:p-8">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                <p className="mt-6 font-display text-lg font-semibold">{t}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 11 — Final CTA */}
      <CtaBand />
    </>
  );
}
