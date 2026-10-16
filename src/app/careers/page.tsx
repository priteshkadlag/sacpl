import type { Metadata } from 'next';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeader } from '@/components/sections/SectionHeader';
import { StatsBand } from '@/components/sections/StatsBand';
import { JobCard } from '@/components/careers/JobCard';
import { ApplicationForm } from '@/components/forms/ApplicationForm';
import { YouTubeEmbed } from '@/components/media/YouTubeEmbed';
import { Stagger, RevealItem } from '@/components/motion/Reveal';
import { contacts, youtubeCultureVideoId } from '@/content/company';
import { getJobs } from '@/lib/repository';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Careers — Structural Engineering Jobs in Mumbai',
  description:
    'Join SACPL. Open roles for structural engineers, design engineers, draughtspersons and business development in Mumbai and across India — with a culture built on learning, growth and computational engineering.',
  path: '/careers',
});

const culture = [
  { title: 'Team bonding & spirit', text: 'We value team bonding and spirit, supporting each other through professional and personal challenges. We actively reject group-ism and discrimination, so that everyone feels included and respected.' },
  { title: 'Professionalism & growth', text: 'We are a professionally managed company where every individual works towards the perpetuity and growth of SACPL. We invest in our people, not just hire them.' },
  { title: 'Computational engineering', text: 'We are embracing computational engineering as a new trait at SACPL, and we expect new members to be excited about this opportunity and the future of engineering.' },
  { title: 'Diversity & inclusion', text: 'Our employee network group strives for gender equality and multicultural retention, and promotes cultural awareness. We welcome staff from all backgrounds and celebrate diversity.' },
  { title: 'Early careers', text: 'We foster and groom the next generation of engineers with a focus on innovation. We don’t simply hire employees — we invest in them.' },
  { title: 'Learning & development', text: 'We encourage like-minded engineers to join us and help young, deserving engineers take on greater responsibility. Continuous learning is supported by our LMS and our core value: “We compete with ourselves and challenge people to grow.”' },
  { title: 'Work-life balance', text: 'We are committed to a workplace where everyone feels valued and respected — because people who are supported do their best engineering.' },
];

export default async function CareersPage() {
  const [open, closed] = await Promise.all([getJobs('open'), getJobs('closed')]);

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Engineer the structures that shape skylines."
        intro={<p>Join a team of structural engineers, modellers and draughtspersons working on tall buildings, institutions, hotels, hospitals and stadia in India and abroad.</p>}
        crumbs={[{ name: 'Careers', path: '/careers' }]}
        coordinate="LEVEL — 01"
      >
        <div className="flex flex-wrap gap-3">
          <a href="#open-positions" className="inline-flex min-h-12 items-center bg-white px-6 text-sm font-medium text-ink hover:bg-paper">
            View open positions
          </a>
          <a href="#culture" className="inline-flex min-h-12 items-center px-6 text-sm font-medium ring-1 ring-white/30 hover:ring-white">
            Our culture
          </a>
        </div>
      </PageHero>

      <section id="open-positions" aria-labelledby="positions-title" className="scroll-mt-24">
        <div className="container-x py-20 lg:py-28">
          <SectionHeader id="positions-title" index="01" eyebrow="Open positions" title={`${open.length} open ${open.length === 1 ? 'role' : 'roles'}.`} intro="Find your next role — or send us a general application below." />
          {open.length ? (
            <div className="mt-12 border-b border-ink/12">
              {open.map((j) => (
                <JobCard key={j.slug} job={j} />
              ))}
            </div>
          ) : (
            <p className="bg-blueprint mt-12 border border-dashed border-ink/20 p-10 text-center text-graphite">
              There are no open positions right now. You are welcome to send a general application below.
            </p>
          )}
          {closed.length > 0 && (
            <details className="mt-10">
              <summary className="inline-flex min-h-11 cursor-pointer items-center font-mono text-xs tracking-[0.14em] text-steel uppercase">Recently closed roles ({closed.length})</summary>
              <div className="mt-4 opacity-70">
                {closed.map((j) => (
                  <JobCard key={j.slug} job={j} />
                ))}
              </div>
            </details>
          )}
        </div>
      </section>

      <section id="culture" aria-labelledby="culture-title" className="scroll-mt-24 bg-ink text-white">
        <div className="container-x py-24 lg:py-32">
          <SectionHeader
            id="culture-title"
            index="02"
            eyebrow="Culture & values"
            tone="light"
            title="A culture of growth, inclusion and continuous learning."
          />
          <div className="mt-14 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <YouTubeEmbed id={youtubeCultureVideoId} title="Experience our culture — life at SACPL" />
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">
                Watch our team in action. Our culture is built on collaboration, innovation and a shared passion for excellence. Captions are requested automatically where YouTube provides them.
              </p>
            </div>
            <div className="lg:col-span-5">
              <StatsBand compact />
            </div>
          </div>
          <Stagger className="mt-16 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {culture.map((c, i) => (
              <RevealItem key={c.title} className="bg-ink p-8">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-5 font-display text-xl font-semibold">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{c.text}</p>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="apply" aria-labelledby="apply-title" className="scroll-mt-24 bg-paper-2">
        <div className="container-x grid gap-14 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-4">
            <p className="eyebrow text-steel">03 — Apply</p>
            <h2 id="apply-title" className="mt-5 font-display text-display-md font-semibold">Send your application.</h2>
            <p className="mt-5 leading-relaxed text-graphite/80">
              Apply for an open role or send a general application. You can also email{' '}
              <a href={`mailto:${contacts.careersEmail}`} className="text-navy underline underline-offset-2">
                {contacts.careersEmail}
              </a>
              .
            </p>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <ApplicationForm positions={[...open.map((j) => j.title), 'General application']} />
          </div>
        </div>
      </section>
    </>
  );
}
